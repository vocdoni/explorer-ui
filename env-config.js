// This file is evaluated when exporting the frontend application
// The environment variabled need to be set locally on in the CI/CD console

const LANG = process.env.APP_LANG || 'en';
const DEVELOPMENT = process.env.NODE_ENV !== 'production';
const COMMIT_SHA = process.env.COMMIT_SHA || 'development';
const VOCDONI_ENVIRONMENT = process.env.VOCDONI_ENVIRONMENT || 'stg';

const isTrueEnv = (env) => env === 'true' || env === true;

const VERIFY_SINGLE_PAGE = isTrueEnv(process.env.VERIFY_SINGLE_PAGE) || false;

let plaza;
switch (VOCDONI_ENVIRONMENT) {
  case 'stg':
    plaza = `https://app-stg.vocdoni.io`;
    break;
  case 'prod':
    plaza = `https://onvote.app`;
    break;
  default:
    plaza = `https://app-dev.vocdoni.io`;
    break;
}

module.exports = {
  COMMIT_SHA,
  LANG,
  DEVELOPMENT,
  VOCDONI_ENVIRONMENT,
  APP_TITLE: 'Vocdoni Explorer',
  APP_DESCRIPTION:
    'A graphical tool to explore the Vocdoni Blockchain, from organizations, processes and votes to discover lasts blocks, transactions, information about the state of the Blockchain and verify your vote.',
  APP_TAGS: 'vocdoni, blockchain, explorer, organizations, processes, blocks, transactions, vote, votes',
  VERIFY_SINGLE_PAGE,

  // GATEWAYS
  PLAZA_URL: process.env.PLAZA_URL || plaza,
};

console.log('Building the frontend with ENV:', module.exports);
