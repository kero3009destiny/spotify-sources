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
var PropDefinition = /** @class */ (function () {
    function PropDefinition(spec) {
        this.spec = spec;
    }
    Object.defineProperty(PropDefinition.prototype, "type", {
        get: function () {
            return this.spec.type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PropDefinition.prototype, "default", {
        get: function () {
            var _a = this.spec, type = _a.type, value = _a.default;
            return { type: type, value: value };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PropDefinition.prototype, "description", {
        get: function () {
            return this.spec.description;
        },
        enumerable: false,
        configurable: true
    });
    PropDefinition.prototype.isValid = function (valueObj) {
        if (typeof valueObj !== 'object' || valueObj === null)
            return false;
        if (valueObj.type !== this.spec.type)
            return false;
        return this.isValidValue(valueObj.value);
    };
    PropDefinition.prototype.match = function (cases) {
        var fn = (cases[this.type] || cases.default);
        return fn(this);
    };
    // The lint rules needs to be ignore cause they contradict TS
    // eslint-disable-next-line consistent-return
    PropDefinition.fromSpec = function (spec) {
        // eslint-disable-next-line default-case
        switch (spec.type) {
            case 'bool':
                return new BoolDef(spec);
            case 'int':
                return new IntDef(spec);
            case 'enum':
                return new EnumDef(spec);
        }
    };
    return PropDefinition;
}());
export { PropDefinition };
var BoolDef = /** @class */ (function (_super) {
    __extends(BoolDef, _super);
    function BoolDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoolDef.prototype.isValidValue = function (value) {
        if (typeof value !== 'boolean')
            return false;
        return true;
    };
    return BoolDef;
}(PropDefinition));
var IntDef = /** @class */ (function (_super) {
    __extends(IntDef, _super);
    function IntDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntDef.prototype.isValidValue = function (value) {
        if (!Number.isInteger(value))
            return false;
        if (value < this.spec.lower)
            return false;
        if (value > this.spec.upper)
            return false;
        return true;
    };
    return IntDef;
}(PropDefinition));
var EnumDef = /** @class */ (function (_super) {
    __extends(EnumDef, _super);
    function EnumDef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnumDef.prototype.isValidValue = function (value) {
        if (typeof value !== 'string')
            return false;
        if (this.spec.values.indexOf(value) < 0)
            return false;
        return true;
    };
    return EnumDef;
}(PropDefinition));
//# sourceMappingURL=propdef.js.map