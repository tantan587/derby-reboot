/* eslint-disable */
var webpack = require("webpack")
var path = require("path")
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/client/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
    //context: __dirname + "/app",
  
    entry: 
    {
      javascript: "./src/client/index.js",
    },
    output: {
        path: path.join(__dirname, 'assets'),
        filename: "bundle.js",
        sourceMapFilename: "bundle.map"
        //publicPath: path.join(__dirname, 'assets')
        //publicPath: "http://localhost:3000/"
    },
    // resolve: {
    //     extensions: ['.js', '.jsx', '.json'],
    //     root: path.resolve(__dirname, "./src/common/components/App.js"),
    //     //root: path.resolve(__dirname, './app/js'),
    //   },
    
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ["react-hot-loader/webpack", "babel-loader"],
          },
        ],
      },

      plugins: [HTMLWebpackPluginConfig]
    }