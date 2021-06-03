"use strict";
/* jslint node: true*/
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const { mergeWithRules } = require("webpack-merge");
const baseConfig = require('./webpack/base.config');
const prodConfig = require('./webpack/prod.config');
const devConfig = require('./webpack/dev.config');
const mergeRules = {
    module: {
        rules: {
            test: "match",
            use: "prepend"
        }
    }
};

let config;

if (process.env.NODE_ENV === 'production') {
    config = mergeWithRules(mergeRules)(baseConfig, prodConfig);
} else {
    config = mergeWithRules(mergeRules)(baseConfig, devConfig);
}

module.exports = config;