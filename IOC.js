///<reference path='typings/quazars.d.ts'/>
var IOC = (function () {
    function IOC() {
    }
    IOC.bind = function (id, service) {
        return this.services[id] = service;
    };
    IOC.singleton = function (id, service) {
        if (this.services[id])
            return this.service(id);
        this.bind(id, service);
        return this.service(id);
    };
    IOC.service = function (id) {
        return this.services[id];
    };
    IOC.list = function () {
        return Object.keys(this.services);
    };
    IOC.services = [];
    return IOC;
})();
module.exports = IOC;
//# sourceMappingURL=IOC.js.map