// next.config.js
const withTM = require("next-transpile-modules")(["request"]);
const isProd = process.env.NODE_ENV === 'production'

module.exports = withTM({
  assetPrefix: isProd ? '/prod' : ''
});