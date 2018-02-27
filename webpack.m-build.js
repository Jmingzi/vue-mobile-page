const webpack = require('webpack')
const path = require('path')
const vueLoaderConfig = require('./build/vue-loader.conf')

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
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      }
    ]
  },
  devtool: '#source-map',
}
