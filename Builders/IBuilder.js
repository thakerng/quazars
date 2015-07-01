///<reference path='../typings/quazars.d.ts'/>
var _ = require('lodash');
var IBuilder = (function () {
    function IBuilder(from, config) {
        if (config === void 0) { config = {}; }
        this.from = from;
        this.before();
        _.merge(this.config, quazars.config.get(this.name + '.default') || {}, config);
        this.build();
        return this;
    }
    IBuilder.prototype.before = function () {
        /**
         * Do Before Configuration Merging
         */
    };
    IBuilder.prototype.build = function () {
        /**
         * Building Method
         */
        return this;
    };
    IBuilder.prototype.make = function (callback, error) {
        /**
         * Make Method Here
         */
    };
    IBuilder.prototype.setConfig = function (cfg) {
        _.merge(this.config, cfg);
        return this;
    };
    IBuilder.prototype.getConfig = function () {
        return this.config;
    };
    return IBuilder;
})();
module.exports = IBuilder;
//# sourceMappingURL=IBuilder.js.map