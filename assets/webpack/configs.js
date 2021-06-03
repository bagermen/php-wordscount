/*jslint node: true */
"use strict";
const ENV = process.env;
const path = require('path');
const NPM_CONTEXT = path.dirname(__dirname);

const CONTEXT = ENV.PROJECT_CONTEXT ? path.resolve(NPM_CONTEXT, ENV.PROJECT_CONTEXT) : NPM_CONTEXT
const SERVER_BASE = ENV.PROJECT_SERVER_BASE || '';

const BUILD_FOLDER = ENV.PROJECT_OUTPUT_PATH || '';

const TEMPLATE_FILE = ENV.PROJECT_TEMPLATE_FILE
    ? path.resolve(CONTEXT, ENV.PROJECT_TEMPLATE_FILE)
    : path.join(CONTEXT, 'public', 'index.html');

const JS_BUILD_FOLDER = ENV.PROJECT_JS_BUILD_FOLDER || '' // JS build directory
const CSS_BUILD_FOLDER = ENV.PROJECT_CSS_BUILD_FOLDER || 'css'; // Style build directory

const JS_TEMPLATE_NAME = '[name].js?[fullhash]'; // js build path
const CSS_TEMPLATE_NAME = `[name].css?[fullhash]`;
const RESOURCE_TEMPLATE_NAME = '[path][name][ext]?[contenthash]';

module.exports = {
    SERVER_BASE,
    CONTEXT,
    NPM_CONTEXT,
    OUTPUT: path.resolve(CONTEXT, BUILD_FOLDER),
    BUILD_FOLDER,
    JS_BUILD_FOLDER,
    CSS_BUILD_FOLDER,
    JS_TEMPLATE_NAME,
    CSS_TEMPLATE_NAME,
    RESOURCE_TEMPLATE_NAME,
    TEMPLATE_FILE,
    API_URL: ENV.PROJECT_API_URL,
    TS_CONFIG_FILE: ENV.NODE_ENV == 'production' ? 'tsconfig.prod.json' : 'tsconfig.json'
};