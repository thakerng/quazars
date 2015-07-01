///<reference path='../typings/quazars.d.ts'/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var webpack = require('webpack');
var _ = require('lodash');
var path = require('path');
var serialize = require('serialize-javascript');
var IBuilder = require('./IBuilder');
var WebpackBuilder = (function (_super) {
    __extends(WebpackBuilder, _super);
    function WebpackBuilder() {
        _super.apply(this, arguments);
    }
    WebpackBuilder.prototype.before = function () {
        this.name = "webpack";
        var APP_PATH = quazars.config.get('appPath');
        this.config = {
            context: path.resolve(APP_PATH, this.from),
            entry: "./app/main.js",
            output: {
                path: path.resolve(APP_PATH, this.from + '/public'),
                filename: "bundle.js"
            }
        };
    };
    WebpackBuilder.prototype.entry = function (ep) {
        _.merge(this.config, { entry: ep });
        return this;
    };
    WebpackBuilder.prototype.external = function (exts) {
        _.merge(this.config, { externals: exts });
        return this;
    };
    WebpackBuilder.prototype.to = function (fn, pth) {
        if (fn === void 0) { fn = "bundle.js"; }
        _.merge(this.config, {
            output: {
                filename: fn,
                path: pth
            }
        });
        return this;
    };
    WebpackBuilder.prototype.define = function (obj, raw) {
        if (raw === void 0) { raw = false; }
        var newObj = {};
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                var j = obj[i];
                newObj[i] = (typeof j !== 'boolean' && typeof j !== 'function' && !raw) ? serialize(j) : j;
            }
        }
        _.merge(this.config, {
            plugins: [
                new webpack.DefinePlugin(newObj)
            ]
        });
        return this;
    };
    WebpackBuilder.prototype.make = function (callback, error) {
        webpack(this.config, function (err) {
            if (err) {
                if (typeof error === 'function')
                    error();
                return;
            }
            if (typeof callback === 'function')
                callback();
        });
    };
    return WebpackBuilder;
})(IBuilder);
module.exports = WebpackBuilder;
//# sourceMappingURL=WebpackBuilder.js.map