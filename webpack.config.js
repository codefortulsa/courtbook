"use strict";

const path = require('path');
const webpack = require('webpack');

const dotEnvVars = require("./loadEnv")();

const srcDir = path.join(__dirname, './src');

const envConfig = () => {
    return Object.keys(dotEnvVars)
        .reduce((memo, key) => {
            memo[`__${key.toUpperCase()}__`] = JSON.stringify(dotEnvVars[key]);
            return memo;
        }, {
            __IS_PROD__: process.env.NODE_ENV === 'production',
            __BYPASS_AUTH__: process.env.BYPASS_AUTH === 'true',
            __AUTH0_DOMAIN__: JSON.stringify(process.env.AUTH0_DOMAIN),
            __AUTH0_COURTBOOK_UI_CLIENT_ID__: JSON.stringify(process.env.AUTH0_COURTBOOK_UI_CLIENT_ID)
        });
};

module.exports = {
    devtool: "inline-source-map",

    entry: `${srcDir}/client/main.js`,

    output: {
        path: path.join(__dirname, './public'),
        filename: 'js/bundle.js',
        publicPath: "/public/"
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: srcDir
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        },{
            test: /\.less/,
            loader: "style-loader!css-loader!less-loader"
        }, {
            test: /\.png$/,
            loader: "url-loader?limit=100000"
        }, {
            test: /\.jpg$/,
            loader: "file-loader"
        }, {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader'
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
        }]
    },

    plugins: [
        new webpack.DefinePlugin(envConfig())
    ]
};
