///<reference path='../../typings/quazars.d.ts'/>
var express = require('express');
var IOC = require('../IOC');
var Router = (function () {
    function Router(share) {
        this.router = express.Router();
        this.ioc = IOC;
        this.route(share);
    }
    Router.prototype.route = function (share) {
        /*
         Use Route Here
         */
    };
    Router.prototype.get = function () {
        return this.router;
    };
    return Router;
})();
module.exports = Router;
//# sourceMappingURL=Router.js.map