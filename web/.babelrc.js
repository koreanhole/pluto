const env = process.env.BABEL_ENV || process.env.NODE_ENV || "development";
const isProd = env === "production";

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "~": "./src",
        },
      },
    ],
    [
      "babel-plugin-styled-components",
      {
        ssr: true,
        displayName: !isProd,
        minify: isProd,
      },
    ],
  ],
};
