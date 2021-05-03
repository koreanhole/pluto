const path = require("path");

const config = {
  node: {
    net: "empty",
    tls: "empty",
    dns: "empty",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
};

module.exports = config;
