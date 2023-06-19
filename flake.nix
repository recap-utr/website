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
  outputs = inputs @ {
    nixpkgs,
    flake-parts,
    systems,
    flocken,
    self,
    ...
  }:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = import systems;
      perSystem = {
        pkgs,
        lib,
        self',
        system,
        ...
      }: let
        npmlock2nix = import inputs.npmlock2nix {inherit pkgs;};
        dockerPort = "8080";
        rewrites = import ./rewrites.nix;
        mkRewrite = source: target: "rewrite ${source} ${target} permanent;";
        nginxConf = pkgs.writeText "nginx.conf" ''
          user nobody nobody;
          daemon off;
          error_log /dev/stdout info;
          pid /dev/null;
          events {}
          http {
            access_log /dev/stdout;
            include ${pkgs.nginx}/conf/mime.types;
            default_type application/octet-stream;
            port_in_redirect off;
            absolute_redirect off;
            # optimisation
            sendfile on;
            tcp_nopush on;
            tcp_nodelay on;
            keepalive_timeout 65;
            server {
              server_name localhost;
              listen ${dockerPort};
              root ${self'.packages.default};
              error_page 404 /404/;
              try_files $uri $uri/ =404;
              ${lib.concatLines (lib.mapAttrsToList mkRewrite rewrites)}
            }
          }
        '';
      in {
        apps.dockerManifest = {
          type = "app";
          program = lib.getExe (flocken.legacyPackages.${system}.mkDockerManifest {
            branch = builtins.getEnv "GITHUB_REF_NAME";
            name = "ghcr.io/" + builtins.getEnv "GITHUB_REPOSITORY";
            version = builtins.getEnv "VERSION";
            images = with self.packages; [x86_64-linux.docker aarch64-linux.docker];
          });
        };
        devShells.default = pkgs.mkShell {
          shellhook = "npm install";
          packages = with pkgs; [nodejs-18_x];
        };
        packages = {
          default = npmlock2nix.v2.build {
            src = ./.;
            installPhase = "cp -r public/. $out";
            HOME = "$(${pkgs.coreutils}/bin/mktemp -d)";
            buildCommands = [
              "npm run build"
            ];
            # https://github.com/gatsbyjs/gatsby/issues/19555
            node_modules_mode = "copy";
            node_modules_attrs = {
              nodejs = pkgs.nodejs-18_x;
              # https://github.com/nix-community/npmlock2nix/issues/185
              buildInputs = with pkgs; [vips];
              nativeBuildInputs = with pkgs; [pkg-config python3];
            };
          };
          docker = pkgs.dockerTools.buildLayeredImage {
            name = "recap-website";
            tag = "latest";
            created = "now";
            contents = [
              pkgs.dockerTools.fakeNss
            ];
            extraCommands = ''
              mkdir -p tmp
              mkdir -p var/log/nginx
              mkdir -p var/cache/nginx
            '';
            config = {
              cmd = [(lib.getExe pkgs.nginx) "-c" nginxConf];
              exposedPorts = {
                "${dockerPort}/tcp" = {};
              };
            };
          };
        };
      };
    };
}
