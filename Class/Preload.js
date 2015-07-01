/**
 * Created by thakerng on 6/24/2015 AD.
 */
///<reference path='../typings/quazars.d.ts'/>
var Configuration = require('../Configuration');
var Preload = (function () {
    function Preload() {
        this.configuration = Configuration;
    }
    Preload.prototype.setup = function () {
        /**
         * Set up process is defined here
         */
    };
    return Preload;
})();
exports.Preload = Preload;
//# sourceMappingURL=Preload.js.map