{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    systems.url = "github:nix-systems/default";
    flocken = {
      url = "github:mirkolenz/flocken/v2";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };
  outputs =
    inputs@{
      flake-parts,
      systems,
      flocken,
      self,
      ...
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = import systems;
      perSystem =
        {
          pkgs,
          lib,
          self',
          system,
          ...
        }:
        let
          npmDeps = pkgs.importNpmLock {
            npmRoot = ./.;
          };
          rewrites = lib.mapAttrsToList (
            source: target: "redir ${source} ${target} permanent"
          ) (import ./rewrites.nix);
          caddyport = "8080";
          caddyfile = pkgs.writeText "caddyfile" ''
            {
              admin off
              auto_https off
              persist_config off
            }
            :${caddyport} {
              root * ${self'.packages.default}
              encode gzip
              ${lib.concatLines rewrites}
              try_files {path} {path}/ /404/
              file_server {
                index index.html
              }
            }
          '';
        in
        {
          _module.args.pkgs = import inputs.nixpkgs {
            inherit system;
            overlays = [
              (final: prev: {
                nodejs = final.nodejs_18;
              })
            ];
          };
          apps.docker-manifest.program = flocken.legacyPackages.${system}.mkDockerManifest {
            github = {
              enable = true;
              token = "$GH_TOKEN";
            };
            images = with self.packages; [ x86_64-linux.docker ];
          };
          devShells.default = pkgs.mkShell {
            shellHook = ''
              ${lib.getExe' pkgs.nodejs "npm"} install
            '';
            packages = [ pkgs.nodejs ];
          };
          packages = {
            default = pkgs.buildNpmPackage {
              inherit npmDeps;
              inherit (npmDeps) pname version;
              inherit (pkgs.importNpmLock) npmConfigHook;
              src = ./.;
              npmFlags = [ "--legacy-peer-deps" ];
              installPhase = ''
                runHook preInstall

                mkdir -p "$out"
                cp -r "public/." "$out"

                runHook postInstall
              '';
              buildInputs = with pkgs; [ vips ];
              nativeBuildInputs = with pkgs; [
                pkg-config
                nodejs.passthru.python
              ];
            };
            server = pkgs.writeShellApplication {
              name = "server";
              text = ''
                ${lib.getExe pkgs.caddy} run --config ${caddyfile} --adapter caddyfile
              '';
            };
            docker = pkgs.dockerTools.buildLayeredImage {
              name = "recap-website";
              tag = "latest";
              created = "now";
              contents = with pkgs; [
                dockerTools.fakeNss
                cacert
                tzdata
              ];
              extraCommands = ''
                mkdir -m 1777 tmp
              '';
              config = {
                Entrypoint = [ (lib.getExe self'.packages.server) ];
                ExposedPorts = {
                  "${caddyport}/tcp" = { };
                };
                User = "nobody:nobody";
                Env = [
                  "XDG_CONFIG_HOME=/config"
                  "XDG_DATA_HOME=/data"
                  "HOME=/root"
                ];
                WorkingDir = "/srv";
              };
            };
          };
        };
    };
}
