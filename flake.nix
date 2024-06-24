{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    systems.url = "github:nix-systems/default";
    npmlock2nix = {
      url = "github:nix-community/npmlock2nix";
      flake = false;
    };
    flocken = {
      url = "github:mirkolenz/flocken/v1";
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
          nodejs = pkgs.nodejs_18;
          npmlock2nix = import inputs.npmlock2nix { inherit pkgs; };
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
          apps.dockerManifest = {
            type = "app";
            program = lib.getExe (
              flocken.legacyPackages.${system}.mkDockerManifest {
                branch = builtins.getEnv "GITHUB_REF_NAME";
                name = "ghcr.io/" + builtins.getEnv "GITHUB_REPOSITORY";
                version = builtins.getEnv "VERSION";
                images = with self.packages; [ x86_64-linux.docker ];
              }
            );
          };
          devShells.default = pkgs.mkShell {
            shellHook = ''
              ${lib.getExe' nodejs "npm"} install
            '';
            packages = [ nodejs ];
          };
          packages = {
            default = npmlock2nix.v2.build {
              src = ./.;
              installPhase = "cp -r public/. $out";
              HOME = "$(${pkgs.coreutils}/bin/mktemp -d)";
              buildCommands = [ "npm run build" ];
              # https://github.com/gatsbyjs/gatsby/issues/19555
              node_modules_mode = "copy";
              node_modules_attrs = {
                inherit nodejs;
                # https://github.com/nix-community/npmlock2nix/issues/185
                buildInputs = with pkgs; [ vips ];
                nativeBuildInputs = with pkgs; [
                  pkg-config
                  python3
                ];
              };
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
              contents = [ pkgs.dockerTools.fakeNss ];
              config = {
                entrypoint = [ (lib.getExe self'.packages.server) ];
                exposedPorts = {
                  "${caddyport}/tcp" = { };
                };
                user = "nobody:nobody";
              };
            };
          };
        };
    };
}
