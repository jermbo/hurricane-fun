require("dotenv").config();

const { series, parallel } = require("gulp");
const { serve } = require("./gulp/browser-sync");
const { default: watcher } = require("./gulp/watcher");
const { default: html } = require("./gulp/html");
const { default: redirects } = require("./gulp/redirects");
const { default: styles } = require("./gulp/styles");
const { default: scripts, bundle } = require("./gulp/scripts");
const { cleanAll, cleanTmp } = require("./gulp/clean");
const { default: images } = require("./gulp/images");

exports.clean = cleanAll;

exports.default = series(cleanAll, parallel(html, redirects, styles, scripts, images), cleanTmp, serve, watcher);
exports.build = series(cleanAll, parallel(html, redirects, styles, scripts, images), cleanTmp);

exports.js = series(cleanAll, bundle);
