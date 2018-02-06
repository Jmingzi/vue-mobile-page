const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    mPage: './src/mixins/page.js'
  },
  output: {
    path: path.resolve(__dirname, './m-dist'),
    filename: '[name].js',
    library: 'mPage',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, './src/mixins')]
      }
    ]
  },
  devtool: '#source-map',
}
