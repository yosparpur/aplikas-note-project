const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // Added source map support
  devServer: {
    static: './dist', // Updated from contentBase to static
    hot: true // Enable Hot Module Replacement
  }
});
