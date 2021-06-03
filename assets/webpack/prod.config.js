/*jslint node: true */
"use strict";
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CONFIG = require('./configs');
const path = require('path');

module.exports = {
    mode: 'production',
    devtool: false,
    plugins: [
        new HtmlWebpackPlugin({
            filename: `${CONFIG.TEMPLATE_FILE}`,
            template: path.join(CONFIG.NPM_CONTEXT, 'macros.ejs'),
            publicPath: 'build',
            inject: false,
            minify: false
        }),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: false,
            __VUE_PROD_DEVTOOLS__: false
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // publicPath: '../../'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // publicPath: '../../'
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        portableRecords: true,
        minimizer: [
        new TerserPlugin({
            parallel: true,
            exclude: [],
            extractComments: false,
            terserOptions: {
                warnings: false,
                output: {
                    comments: false
                }
            }
        }),
        new CssMinimizerPlugin({
            minimizerOptions: {
                map: {
                    inline: false,
                    annotation: true
                }
            }
        })
        ]
    }
};
