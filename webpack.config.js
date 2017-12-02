/* eslint-disable */
var webpack = require("webpack")
var path = require("path")

process.noDeprecation = true

// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: __dirname + '/src/server/index.js',
//   filename: 'index.js',
//   inject: 'body'
// })

module.exports = {
    //context: __dirname + "/app",
  
    entry:  "./src/client/index.js",
    output: {
        path: path.join(__dirname, 'assets'),
        filename: "bundle.js",
        sourceMapFilename: "bundle.map",
        publicPath: '/js/'
        //publicPath: path.join(__dirname, 'assets')
        //publicPath: "http://localhost:3000/"
    },
     resolve: {
         extensions: ['.js', '.jsx', '.json'],
    //     root: path.resolve(__dirname, "./src/common/components/App.js"),
    //     //root: path.resolve(__dirname, './app/js'),
       },
    
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ["react-hot-loader/webpack", "babel-loader"],
          },
        ],
        // rules: [
        //   {
        //       test: /\.js$/,
        //       exclude: /(node_modules)/,
        //       loader: 'babel-loader',
        //       query: {
        //           presets: ['env', 'react', "es2015", 'stage-0']
        //       }
        //   },
        //   {
        //       test: /\.(png|jpg)$/, loader: 'file-loader?limit=20000'//name=/src/images/[name].[ext]'
        //   }
        // ]
      },

      plugins: [
        //HTMLWebpackPluginConfig
        new webpack.DefinePlugin({
          "process.env": {
              NODE_ENV: JSON.stringify("production")
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          warnings: false,
          mangle: false
        }),
        new webpack.LoaderOptionsPlugin({
          debug: true
        })
      ]
    }