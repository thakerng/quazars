///<reference path='typings/quazars.d.ts'/>
var _ = require('lodash');
var Configuration = (function () {
    function Configuration() {
    }
    Configuration.set = function (key, value) {
        this.map[key] = value;
    };
    Configuration.setMany = function (array) {
        this.map = _.merge(this.map, array);
    };
    Configuration.get = function (key) {
        return this.map[key];
    };
    Configuration.fetch = function () {
        return this.map;
    };
    Configuration.map = {};
    return Configuration;
})();
module.exports = Configuration;
//# sourceMappingURL=Configuration.js.map