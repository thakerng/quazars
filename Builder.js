///<reference path='typings/quazars.d.ts'/>
var WebpackBuilder = require('./Builders/WebpackBuilder');
var JsonBuilder = require('./Builders/JsonBuilder');
var Builder = (function () {
    function Builder() {
    }
    Builder.build = function (builder, from, config) {
        switch (builder) {
            case "webpack":
                return this.webpack(from, config);
                break;
            case "json":
                return this.json(from, config);
                break;
            default:
                break;
        }
    };
    Builder.json = function (from, config) {
        return (new JsonBuilder(from, config));
    };
    Builder.webpack = function (from, config) {
        return (new WebpackBuilder(from, config));
    };
    /**
     * Ignore building method use to ignore building without removing entire callee code
     * just put x in front of method's name
     * @param builder
     * @param from
     * @param config
     */
    Builder.xbuild = function (builder, from, config) {
        /**
         * no operation
         */
    };
    return Builder;
})();
module.exports = Builder;
//# sourceMappingURL=Builder.js.map