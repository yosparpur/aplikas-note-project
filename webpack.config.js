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
        contentBase: path.join(__dirname), // Melayani dari root proyek
        compress: true,
        port: 8080,
        open: true,
        historyApiFallback: true, // Mengatasi masalah 404 dengan mengarahkan kembali ke index.html
    },
};