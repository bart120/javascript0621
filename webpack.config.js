const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/index/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    mode: 'development',
    devtool: 'source-map'
};
