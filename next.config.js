// next.config.js
const withTM = require("next-transpile-modules")(["ticker-symbol-search", "request"]);

module.exports = withTM();
