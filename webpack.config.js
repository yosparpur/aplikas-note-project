const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: ['file-loader'],
            },
        ],
    },
    devServer: {
        static: path.join(__dirname, 'dist'), // Serve files from the dist directory
        compress: true,
        port: 8080, // Ensure the server runs on port 8080
        open: true,
        historyApiFallback: true, // Handle 404 errors by redirecting to index.html
    },
    resolve: {
        fallback: {
          "assert": require.resolve("assert/"),
          "child_process": false,
          "fs": false,
          "os": require.resolve("os-browserify/browser"),
          "path": require.resolve("path-browserify"),
          "stream": require.resolve("stream-browserify"),
          "util": require.resolve("util/")
        }
      }
};