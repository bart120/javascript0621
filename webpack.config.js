const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/index/index.js',
        game: './src/game/game.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true
    },
    mode: 'production',
    devtool: 'source-map'

};
