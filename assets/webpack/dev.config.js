/*jslint node: true */
"use strict";
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CONFIG = require('./configs');
const path = require('path');

module.exports = {
    target: 'web',
    mode: 'development',
    devtool: 'eval-source-map',
    watch: false,
    output: {
        publicPath: '/'
    },
    devServer: {
        publicPath: '/',
        port: 3000,
        hot: true,
        contentBase: CONFIG.OUTPUT,
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 600,
            poll: 2000
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'vue-style-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'vue-style-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin({
            reportFilename: path.join(CONFIG.OUTPUT, 'report.html'),
            analyzerMode: 'static',
            openAnalyzer: false
        }),
        new HtmlWebpackPlugin({
            template: path.join(CONFIG.NPM_CONTEXT, 'dev.index.ejs'),
            minify: false
        }),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: true
        }),
    ]
};
