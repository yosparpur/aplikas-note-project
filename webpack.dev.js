const common = require('./webpack.common.js');

module.exports = {
    ...common,
    mode: 'development',
    devtool: 'source-map', // Mengaktifkan source map di mode development
};