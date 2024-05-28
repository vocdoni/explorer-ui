const env = require('./env-config.js');
const { i18n } = require('./next-i18next.config')

module.exports = {
  // Generate /dashboard/ instead of /dashboard.html
  trailingSlash: true,
  env,
  i18n,
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.resolve.fallback = {
      fs: false,
      crypto: false,
      stream: false,
      path: false,
      os: false,
      readline: false,
    };
    return config;
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};
