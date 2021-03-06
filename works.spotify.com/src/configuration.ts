var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { PropValues, RCProperties, } from '@spotify-internal/remote-config-properties';
import { EventEmitter } from 'events';
import { Event } from './constants';
var Configuration = /** @class */ (function (_super) {
    __extends(Configuration, _super);
    function Configuration(activeProperties) {
        if (activeProperties === void 0) { activeProperties = null; }
        var _this = _super.call(this) || this;
        _this.activeProperties = activeProperties;
        _this.activationPromise = activeProperties
            ? Promise.resolve()
            : new Promise(function (resolve) {
                _this.once(Event.CHANGE, resolve);
            });
        return _this;
    }
    Configuration.withOverride = function (properties, override) {
        var propertySet = RCProperties.toPropertySet(properties);
        var Impl = /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super.call(this, override ? propertySet.override(override) : null) || this;
            }
            class_1.prototype.override = function (values) {
                if (values === void 0) { values = null; }
                this.setActive(values ? propertySet.override(values) : null);
            };
            return class_1;
        }(Configuration));
        return new Impl();
    };
    Configuration.prototype.setActive = function (values) {
        if (values === void 0) { values = null; }
        if (this.activeProperties === values)
            return;
        if (this.activeProperties !== null &&
            values !== null &&
            PropValues.equal(values, this.activeProperties))
            return;
        this.activeProperties = values;
        this.emit(Event.CHANGE);
    };
    Configuration.prototype.getBool = function (name) {
        return this.get('bool', name);
    };
    Configuration.prototype.getInt = function (name) {
        return this.get('int', name);
    };
    Configuration.prototype.getEnum = function (name) {
        return this.get('enum', name);
    };
    Configuration.prototype.getPropertiesAsObject = function () {
        var activeProps = this.activeProperties;
        if (!activeProps) {
            throw new Error('Active properties are not yet available. Did you call resolver.load() and wait for it to complete?');
        }
        return PropValues.entries(activeProps).reduce(function (ob, _a) {
            var name = _a[0], value = _a[1].value;
            ob[name] = value;
            return ob;
        }, {});
    };
    Object.defineProperty(Configuration.prototype, "isActive", {
        get: function () {
            return this.activeProperties !== null;
        },
        enumerable: false,
        configurable: true
    });
    Configuration.prototype.getValue = function (ref) {
        if (!this.activeProperties) {
            throw new SuspenseError('You must activate a config before getting values.', this.activationPromise);
        }
        var prop = this.activeProperties[ref];
        if (!prop) {
            throw new Error("Property \"" + name + "\" could not be found. Did you forget to define it in properties.yaml?");
        }
        return prop.value;
    };
    Configuration.prototype.get = function (type, name) {
        if (!this.activeProperties) {
            throw new SuspenseError('You must activate a config before getting values.', this.activationPromise);
        }
        var prop = this.activeProperties[name];
        if (!prop) {
            throw new Error("Property \"" + name + "\" could not be found. Did you forget to define it in properties.yaml?");
        }
        if (prop.type !== type) {
            throw new Error("Property \"" + name + "\" of type " + prop.type + " was accessed as " + type);
        }
        return prop.value;
    };
    return Configuration;
}(EventEmitter));
var SuspenseError = /** @class */ (function (_super) {
    __extends(SuspenseError, _super);
    function SuspenseError(message, promise) {
        var _this = _super.call(this, message) || this;
        _this.then = promise.then.bind(promise);
        return _this;
    }
    return SuspenseError;
}(Error));
export default Configuration;
//# sourceMappingURL=configuration.js.map