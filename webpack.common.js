const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/client/index.js',
  },
  plugins: [
    new CleanWebpackPlugin(['assets']),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/client/index.html'),
      inject: 'body',
      favicon: './data/images/favicon.ico',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react', 'es2015', 'stage-0'],
        },
      },
      {
        test: /\.(png|jpg)$/, loader: 'file-loader?limit=20000', // name=/src/images/[name].[ext]'
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'assets'),
  },
};
