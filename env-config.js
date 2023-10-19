// This file is evaluated when exporting the frontend application
// The environment variabled need to be set locally on in the CI/CD console

const LANG = process.env.APP_LANG || 'en'
const DEVELOPMENT = process.env.NODE_ENV !== 'production'
const COMMIT_SHA = process.env.COMMIT_SHA || 'development'
const VOCDONI_ENVIRONMENT = process.env.VOCDONI_ENVIRONMENT || 'dev'
let bootnodes = 'https://bootnodes.vocdoni.net/gateways.json'

const isTrueEnv = (env) => env === 'true' || env === true

const VERIFY_SINGLE_PAGE = isTrueEnv(process.env.VERIFY_SINGLE_PAGE) || false

let plaza, apiUrl;
switch (VOCDONI_ENVIRONMENT) {
  case 'stg':
    plaza = `https://stg.vocdoni.app`
    apiUrl = `https://gw1.stg.vocdoni.net/v2`
    break
  case 'prod':
    plaza = `https://vocdoni.app`
    apiUrl = `https://gw1.stg.vocdoni.net/v2`
    break
  default:
    plaza = `https://dev.vocdoni.app`
    apiUrl = `https://api-dev.vocdoni.net/v2`
    break
}

if (VOCDONI_ENVIRONMENT !== 'prod') {
  bootnodes = bootnodes.replace('.json', `.${VOCDONI_ENVIRONMENT}.json`)
} else {
  bootnodes = bootnodes.replace('.json', `.azeno.json`)
}

module.exports = {
  COMMIT_SHA,
  LANG,
  DEVELOPMENT,
  VOCDONI_ENVIRONMENT,
  APP_TITLE: 'Vocdoni Explorer',
  APP_DESCRIPTION: 'A graphical tool to explore the Vocdoni Blockchain, from organizations, processes and votes to discover lasts blocks, transactions, information about the state of the Blockchain and verify your vote.',
  APP_TAGS: 'vocdoni, blockchain, explorer, organizations, processes, blocks, transactions, vote, votes',
  VERIFY_SINGLE_PAGE,

  // BLOCKCHAIN
  ETH_NETWORK_ID: process.env.ETH_NETWORK_ID || 'goerli',

  // VOCHAIN
  BLOCK_TIME: process.env.BLOCK_TIME || '12',

  // GATEWAYS
  PLAZA_URL: process.env.PLAZA_URL || plaza, // Deprecated see https://github.com/vocdoni/explorer-ui/issues/163
  API_URL: process.env.API_URL || apiUrl,

  // HELPSCOUT
  HELPSCOUT_PROJECT_ID: '', // TODO:
}

console.log('Building the frontend with ENV:', module.exports)
