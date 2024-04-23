<p align="center" width="100%">
    <img src="https://developer.vocdoni.io/img/vocdoni_logotype_full_white.svg" />
</p>

<p align="center" width="100%">
    <a href="https://github.com/vocdoni/explorer-ui/commits/main/"><img src="https://img.shields.io/github/commit-activity/m/vocdoni/explorer-ui" /></a>
    <a href="https://github.com/vocdoni/explorer-ui/issues"><img src="https://img.shields.io/github/issues/vocdoni/explorer-ui" /></a>
    <a href="https://github.com/vocdoni/explorer-ui/actions/workflows/main.yml/"><img src="https://github.com/vocdoni/explorer-ui/actions/workflows/main.yml/badge.svg" /></a>
    <a href="https://discord.gg/xFTh8Np2ga"><img src="https://img.shields.io/badge/discord-join%20chat-blue.svg" /></a>
    <a href="https://twitter.com/vocdoni"><img src="https://img.shields.io/twitter/follow/vocdoni.svg?style=social&label=Follow" /></a>
</p>

  <div align="center">
    Vocdoni is the first universally verifiable, censorship-resistant, anonymous, and self-sovereign governance protocol. <br />
    Our main aim is a trustless voting system where anyone can speak their voice and where everything is auditable. <br />
    We are engineering building blocks for a permissionless, private and censorship resistant democracy.
    <br />
    <a href="https://developer.vocdoni.io/"><strong>Explore the developer portal »</strong></a>
    <br />
    <h3>More About Us</h3>
    <a href="https://vocdoni.io">Vocdoni Website</a>
    |
    <a href="https://vocdoni.app">Web Application</a>
    |
    <a href="https://explorer.vote/">Blockchain Explorer</a>
    |
    <a href="https://law.mit.edu/pub/remotevotingintheageofcryptography/release/1">MIT Law Publication</a>
    |
    <a href="https://chat.vocdoni.io">Contact Us</a>
    <br />
    <h3>Key Repositories</h3>
    <a href="https://github.com/vocdoni/vocdoni-node">Vocdoni Node</a>
    |
    <a href="https://github.com/vocdoni/vocdoni-sdk/">Vocdoni SDK</a>
    |
    <a href="https://github.com/vocdoni/ui-components">UI Components</a>
    |
    <a href="https://github.com/vocdoni/ui-scaffold">Application UI</a>
    |
    <a href="https://github.com/vocdoni/census3">Census3</a>
  </div>

# explorer-ui

This repository contains the frontend web application that acts as an 'explorer' for the Vocdoni voting blockchain. This explorer allows you to see elections, organizations, and individual votes, as well as raw blocks on the blockchain. 
It is a react application available to the public at https://explorer.vote/. 

### Table of Contents
- [Getting Started](#getting-started)
- [Preview](#preview)
- [Contributing](#contributing)
- [License](#license)


## Getting Started

### Docker Builds

There are two types of docker images: bootstrap generated and fully static. The type of image selected depends on the Dockerfile used:

-   `Dockerfile`: By default, the image includes all NodeJS dependencies, and generates the static site at bootstrap based on the env vars provided. Hence, the initial run of the image takes few minutes to start since it has to build itself. This image is for testing and/or development purposes.

-   `Dockerfile.static`: This image generates the static site at build time, and serves the content with nginx, so once it's built no parameters can be configured at runtime. It starts instantly as you would expect. This is a final image, to be used in production environments.

### Docker compose deployment

To deploy using [Docker Compose](https://docs.docker.com/compose) follow these instructions.

#### Prerequisites

-   GNU/Linux based operating system
-   Docker engine (version 19.03 or above) [Installation](https://docs.docker.com/engine/install/#server)
-   Docker compose (version 1.24 or above) [Installation](https://docs.docker.com/compose/install)
-   A DNS domain

#### Environment Variables

Configure a `.env` file with the following variables:

-   `API_URL` Api url for the Vocdoni API
-   `VOCDONI_UI_TAG` Docker tag of the image (master, stg, release)
-   `VOCDONI_ENVIRONMENT` Environment type (dev, stg, prod)
-   `ETH_NETWORK_ID` Ethereum network ID (xdai, goerli...)
-   `DOMAIN` Domain name to be served. Used by Traefik to fetch SSL certificates from Let's Encrypt
-   `LE_EMAIL` Email associated to the domain. Used by Traefik to fetch SSL certificates from Let's Encrypt

Optional:
-   `COMMIT_SHA` Git commit hash to be used as an html tag
-   `VERIFY_SINGLE_PAGE` Use a single-page layout for the frontend
-   `BLOCK_TIME` Estimated time for each Vocdoni blockchain block
-   `PLAZA_URL` Vocdoni application URL for organization profile links
-   `NODE_ENV` If 'development', deploy the site in development mode. This does not set the vocdoni environment
-   `APP_TITLE` 
-   `APP_DESCRIPTION`
-   `APP_TAGS`


#### Deployment

Pull the images

`docker-compose pull`

Deploy all services

`docker-compose up -d`

After a while, the UI should be ready at https://\<yourdomain\>

#### Github actions

Github actions are configured to build the Docker image and push it to the registry. The deployment is done using docker-compose.

The changes pushed to `ghcr.io` are for the branches `master`, `stg` and any starting with `release`.


## Preview

The explorer is deployed for multiple environments:
- `production`: https://explorer.vote/
- `stage`: https://stg.explorer.vote/
- `development`: https://dev.explorer.vote/

## Contributing 

While we welcome contributions from the community, we do not track all of our issues on Github and we may not have the resources to onboard developers and review complex pull requests. That being said, there are multiple ways you can get involved with the project. 

Please review our [development guidelines](https://developer.vocdoni.io/development-guidelines).

## License

This repository is licensed under the [GNU Affero General Public License v3.0.](./LICENSE)

    Vocdoni Explorer UI
    Copyright (C) 2021 Aragon Labs AG

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](code-of-conduct.md) 
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)