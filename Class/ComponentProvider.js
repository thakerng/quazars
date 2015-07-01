///<reference path='../typings/quazars.d.ts'/>
var Quazars = require('../Kernel');
var IOC = require('../IOC');
var ComponentProvider = (function () {
    function ComponentProvider(config) {
        this.app = Quazars.app();
        this.ioc = IOC;
        this.config = config;
        this.build();
    }
    ComponentProvider.prototype.build = function () {
        /*
         * Do after created. the sequence ordered by config.json along with constructor
         * can be run once when codebase change eg.[Webpack Builder,Transfer file] should no require any providers
         */
    };
    ComponentProvider.prototype.register = function () {
        /*
         * Do after building ,the component object has been living in system
         * register should contain the execution that involves other component and system eg.[ioc Binding,Singleton]
         * the sequence will be ordered by topology sorting algorithm depend on dependency
         */
    };
    ComponentProvider.prototype.boot = function (meta) {
        /*
         * Do when running has been trigger,
         * boot should contain execution method from living object or service
         */
    };
    return ComponentProvider;
})();
module.exports = ComponentProvider;
//# sourceMappingURL=ComponentProvider.js.map