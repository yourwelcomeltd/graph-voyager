const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "cheap-source-map",

  performance: {
    hints: false,
  },
  devServer: {
    open: "chrome",
    contentBase: path.join(__dirname, "."),
    watchContentBase: true,
    port: 9090,
    stats: "errors-only",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js", ".json", ".css", ".svg"],
    alias: {
      // fix "duplicated react" issue when using npm link
      react: require.resolve("react"),
    },
  },
  entry: ["./index.tsx"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
    sourceMapFilename: "[file].map",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/env", "@babel/react"],
        },
      },
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new CopyWebpackPlugin([
      { from: "./node_modules/graphql-voyager/dist/voyager.worker.js" },
    ]),
  ],
};
