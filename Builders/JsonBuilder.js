var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by thakerng on 6/27/2015 AD.
 */
///<reference path='../typings/quazars.d.ts'/>
var _ = require('lodash');
var path = require('path');
var serialize = require('serialize-javascript');
var fs = require('fs');
var IBuilder = require('./IBuilder');
var JsonBuilder = (function (_super) {
    __extends(JsonBuilder, _super);
    function JsonBuilder() {
        _super.apply(this, arguments);
    }
    JsonBuilder.prototype.before = function () {
        this.name = "json";
        var APP_PATH = quazars.config.get('appPath');
        this.path = path.resolve(APP_PATH, this.from, './app/share.js');
        this.config = {};
    };
    JsonBuilder.prototype.to = function (to) {
        var APP_PATH = quazars.config.get('appPath');
        this.path = path.resolve(APP_PATH, this.from, to || './app/share.js');
        return this;
    };
    JsonBuilder.prototype.define = function (config) {
        _.merge(this.config, config);
        return this;
    };
    JsonBuilder.prototype.make = function (callback, error) {
        var serialized;
        try {
            serialized = serialize(this.config);
        }
        catch (err) {
            if (error)
                return error(err);
        }
        var str = "module.exports = " + serialized + ";";
        fs.writeFile(this.path, str, function (err) {
            if (err && typeof error === 'function') {
                return error(err);
            }
            if (typeof callback === 'function')
                callback();
        });
    };
    return JsonBuilder;
})(IBuilder);
module.exports = JsonBuilder;
//# sourceMappingURL=JsonBuilder.js.map