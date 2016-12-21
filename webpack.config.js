"use strict";

const path = require('path');
const webpack = require('webpack');

const srcDir = path.join(__dirname, './src');

module.exports = {
    debug: true,
    devtool: "inline-source-map",

    entry: `${srcDir}/public/main.jsx`,

    output: {
        path: path.join(__dirname, './public'),
        filename: 'js/bundle.js'
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [{
            loader: 'babel-loader',
            test: /\.jsx?$/,
            include: srcDir
        }]
    }
};
