const common = require('./webpack.common.js');

module.exports = {
    ...common,
    mode: 'production',
    devtool: false, // Nonaktifkan source map di mode production
};