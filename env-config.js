// This file is evaluated when exporting the frontend application
// The environment variabled need to be set locally on in the CI/CD console

const LANG = process.env.APP_LANG || 'en'
const DEVELOPMENT = process.env.NODE_ENV !== 'production'
const COMMIT_SHA = process.env.COMMIT_SHA || 'development'
// const VOCDONI_ENVIRONMENT = process.env.VOCDONI_ENVIRONMENT || 'dev'
const VOCDONI_ENVIRONMENT = process.env.VOCDONI_ENVIRONMENT || 'prod'
// let bootnodes = 'https://bootnodes.vocdoni.net/gateways.json'
let bootnodes = 'https://raw.githubusercontent.com/vocdoni/bootnodes/main/content/gateways.azeno.json'


switch (VOCDONI_ENVIRONMENT) {
  case 'dev':
    plaza = `https://plaza.${VOCDONI_ENVIRONMENT}.vocdoni.net`
    break
  case 'prod':
    plaza = `https://vocdoni.app`
}

if (VOCDONI_ENVIRONMENT !== 'prod') {
  bootnodes = bootnodes.replace('.json', `.${VOCDONI_ENVIRONMENT}.json`)
}

module.exports = {
  COMMIT_SHA,
  LANG,
  DEVELOPMENT,
  VOCDONI_ENVIRONMENT,
  APP_TITLE: 'Explorer',

  // BLOCKCHAIN
  // ETH_NETWORK_ID: process.env.ETH_NETWORK_ID || 'rinkeby',
  ETH_NETWORK_ID: process.env.ETH_NETWORK_ID || 'mainnet',

  // VOCHAIN
  BLOCK_TIME: process.env.BLOCK_TIME || '12',

  // GATEWAYS
  BOOTNODES_URL: process.env.BOOTNODES_URL || bootnodes,
  DISCOVERY_TIMEOUT: process.env.DISCOVERY_TIMEOUT || 3000,// in milliseconds
  DISCOVERY_POOL_SIZE: process.env.DISCOVERY_POOL_SIZE || 1,
  PLAZA_URL: process.env.PLAZA_URL || plaza,

  // HELPSCOUT
  HELPSCOUT_PROJECT_ID: '' // TODO: 
}

console.log('Building the frontend with ENV:', module.exports)
