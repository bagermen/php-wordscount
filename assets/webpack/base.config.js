/*jslint node: true */
"use strict";
const path = require('path');
const webpack = require('webpack');
const CONFIG = require('./configs');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = 'src';

module.exports = {
    stats: {
        errorDetails: true
    },
    target: ['web', 'es5'],
    mode: `${process.env.NODE_ENV}`,
    context: CONFIG.NPM_CONTEXT,
    entry: {
        words: path.join(CONFIG.NPM_CONTEXT, rootPath, 'main.ts')
    },
    output: {
        path: CONFIG.OUTPUT,
        filename:  `${CONFIG.JS_BUILD_FOLDER}/${CONFIG.JS_TEMPLATE_NAME}`,
        assetModuleFilename: CONFIG.RESOURCE_TEMPLATE_NAME,
        publicPath: CONFIG.SERVER_BASE
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.vue', 'json'],
        alias: {
            'vue$': 'vue/dist/vue.esm-bundler.js',
            '@': path.join(CONFIG.NPM_CONTEXT, 'src')
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: `${CONFIG.CSS_BUILD_FOLDER}/${CONFIG.CSS_TEMPLATE_NAME}`
        }),
        new CleanWebpackPlugin({
            dry: false,
            verbose: false,
            cleanStaleWebpackAssets: true,
            cleanOnceBeforeBuildPatterns: `${CONFIG.BUILD_FOLDER}/**/*`
        }),
        new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: `"${process.env.NODE_ENV}"`,
            API_URL: `"${CONFIG.API_URL}"`
        }
        }),
        new LodashModuleReplacementPlugin()
    ],
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'ts-loader',
                options: {
                    configFile: path.join(CONFIG.NPM_CONTEXT, CONFIG.TS_CONFIG_FILE),
                    appendTsSuffixTo: [/\.vue$/]
                }
            }],
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    js: [
                        {
                            loader: 'babel-loader',
                            options: {
                                babelrc: true,
                                extends: path.join(CONFIG.NPM_CONTEXT, '.babelrc')
                            }
                        }
                    ]
                }
            }
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "babel-loader",
                    options: {
                        babelrc: true,
                        extends: path.join(CONFIG.NPM_CONTEXT, '.babelrc')
                    }
                }
            ]
        }, {
            test: /\.css$/,
            use: [
                // {
                    // loader: 'vue-style-loader'
                // },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        importLoaders: 2
                    }
                },
                {
                    loader: "resolve-url-loader",
                    options: {
                        removeCR: true,
                        sourceMap: true
                    }
                },
                {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true,
                        postcssOptions: {
                            path: CONFIG.NPM_CONTEXT
                        }
                    }
                }
            ]
        },
        {
            test: /\.scss$/,
            use: [
            // {
                // loader: 'vue-style-loader'
            // },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    importLoaders: 3
                },
            },
            {
                loader: "postcss-loader",
                options: {
                    sourceMap: true,
                    postcssOptions: {
                        path: CONFIG.NPM_CONTEXT
                    }
                }
            },
            {
                loader: "resolve-url-loader",
                options: {
                    sourceMap: true
                }
            },
            {
                loader: "sass-loader",
                options: {
                    sourceMap: true,
                    sassOptions: {
                        includePaths: [
                            path.resolve(CONFIG.NPM_CONTEXT, "./node_modules/compass-mixins/lib")
                        ]
                    }
                }
            }
            ]
        },
        {
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
            type: "asset/resource"
        }
        ]
    },

    optimization: {
        moduleIds: 'named',
        emitOnErrors: true,
        runtimeChunk: {
            name: 'manifest'
        },
        nodeEnv: process.env.NODE_ENV,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        splitChunks: { // SplitChunksPlugin see https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
            name: false,
            // DEFAULT OPTIONS for cacheGroups
            chunks: 'all', // chunks are generated for async dependencies (requires(), import() etc..) and static imports
            maxInitialRequests: Infinity, // Maximum number of parallel requests at an entrypoint.
            minSize: 0, // min chunk size to be generated
            minChunks: 1, // Minimum number of chunks that must share a module before splitting
            maxAsyncRequests: 5, // Maximum number of parallel requests when on-demand loading.
            automaticNameDelimiter: '~', // By default webpack will generate names using cacheGroup and module name (e.g. vendors~main.js).
            // CACHE GROUPS - rules that combine modules to chunks
            cacheGroups: {
                default: false, // disable default cacheGroup
                defaultVendors: { // this will be default rule for libraries that loaded initially
                    reuseExistingChunk: true,
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor'
                }
            }
        }
    },

    performance: {
        hints: false
    }
};