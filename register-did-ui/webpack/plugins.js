const { resolve, join } = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";

const dist = "dist";
const root = resolve(__dirname);

const cleanOptions = {
  root,
  exclude: [`${dist}/.gitignore`],
  verbose: true,
  cleanStaleWebpackAssets: true,
  cleanOnceBeforeBuildPatterns: [`${dist}/*.*`],
  dry: false,
};

const NODE_ENV = process.env.NODE_ENV;
const API_URL = process.env.API_URL;
console.log("NODE_ENV->", NODE_ENV, ": API_URL->", API_URL);

const dotenv = require("dotenv");
const dotEnvVars = dotenv.config();
const configPath = join(root, "config", `${NODE_ENV}.config.js`);
const environmentEnv = dotenv.config({
  path: configPath,
  silent: true,
});
const envVariables = Object.assign({}, dotEnvVars, environmentEnv)["parsed"];
const defines = Object.keys(envVariables).reduce(
  (memo, key) => {
    const val = JSON.stringify(envVariables[key]);
    memo[`__${key.toUpperCase()}__`] = val;
    return memo;
  },
  {
    __NODE_ENV__: JSON.stringify(NODE_ENV),
    __API_URL__: JSON.stringify(API_URL),
  }
);

const plugins = [
  new webpack.EnvironmentPlugin({ NODE_ENV }),
  new HtmlWebpackPlugin({
    template: join("client", "index.html"),
    favicon: join("client", "favicon.ico"),
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.DefinePlugin(defines),
];
if (isProduction) {
  plugins.push(new CleanWebpackPlugin(cleanOptions));
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}
module.exports = plugins;
