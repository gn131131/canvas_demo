const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "index"),
  watch: false,
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "main.js",
    chunkFilename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: [path.resolve(__dirname, "app")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
        query: {
          presets: [
            [
              "@babel/env",
              {
                targets: {
                  browsers: "last 2 chrome versions"
                }
              }
            ]
          ]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".json", ".js", ".jsx"]
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    inline: true,
    host: "localhost",
    port: 8001,
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
