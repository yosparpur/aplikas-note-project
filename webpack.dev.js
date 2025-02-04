const path = require('path');
const common = require('./webpack.common.js');

module.exports = {
    ...common,
    mode: 'development',
    devtool: 'source-map', // Enable source map in development mode
    devServer: {
        static: path.join(__dirname, 'dist'), // Serve files from the dist directory
        compress: true,
        port: 8080, // Ensure the server runs on port 8080
        open: true,
        historyApiFallback: true, // Handle 404 errors by redirecting to index.html
    },
};