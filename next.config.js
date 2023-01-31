const env = require('./env-config.js')

module.exports = {
  // Generate /dashboard/ instead of /dashboard.html
  trailingSlash: true,
  env,
  webpack: (config, ) => {
    // Fixes npm packages that depend on `fs` module
    config.resolve.fallback = {
      fs: false,
      crypto: false,
      stream: false,
      path: false,
      os: false,
    };
    return config
  }
}
