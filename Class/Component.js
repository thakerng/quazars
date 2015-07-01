var Component = (function () {
    function Component(id, provider) {
        this.id = id;
        this.provider = provider;
    }
    Component.prototype.getProvider = function () {
        return this.provider;
    };
    Component.prototype.getID = function () {
        return this.id;
    };
    return Component;
})();
module.exports = Component;
//# sourceMappingURL=Component.js.map