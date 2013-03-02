var Class = (function () {

    var constructor = function (options) {
        if (options.extends) {
            var parent = options.extends.prototype;
        }

        var constructor = options.hasOwnProperty('constructor') ?
            options.constructor : (parent ? function () {
            parent.constructor.apply(this, arguments);
        } : function () {
        });

        if (parent) {
            var fn = function () {
            };
            fn.prototype = parent;
            constructor.prototype = new fn();
            constructor.prototype.constructor = constructor;
        }

        if (options.static) {
            for (var i in options.static)
                constructor[i] = options.static[i];
        }

        for (var i in options)
            if (i != 'static' && i != 'constructor' && i != 'extends')
                constructor.prototype[i] = options[i];

        constructor.extend = function (options) {
            options.extends = this;
            return new Class(options);
        }

        return constructor;
    }

    var prototype = constructor.prototype;
    return constructor;
})();

module.exports = Class;