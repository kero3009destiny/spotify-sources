export var TimeUnit;
(function (TimeUnit) {
    TimeUnit[TimeUnit["MILLISECOND"] = 1] = "MILLISECOND";
    TimeUnit[TimeUnit["SECOND"] = 1000] = "SECOND";
    TimeUnit[TimeUnit["MINUTE"] = 60000] = "MINUTE";
    TimeUnit[TimeUnit["HOUR"] = 3600000] = "HOUR";
})(TimeUnit || (TimeUnit = {}));
(function (TimeUnit) {
    function stringifyUnit(quantity, unit) {
        var s = quantity !== 1 ? 's' : '';
        switch (unit) {
            case TimeUnit.HOUR:
                return quantity + " hour" + s;
            case TimeUnit.MINUTE:
                return quantity + " minute" + s;
            case TimeUnit.SECOND:
                return quantity + " second" + s;
            case TimeUnit.MILLISECOND:
                return quantity + " millisecond" + s;
            default:
                throw new TypeError("Unknown TimeUnit " + unit);
        }
    }
    TimeUnit.stringifyUnit = stringifyUnit;
    function stringify(quantity, units) {
        if (units === void 0) { units = [TimeUnit.HOUR, TimeUnit.MINUTE, TimeUnit.SECOND]; }
        var remaining = quantity;
        var parts = [];
        for (var _i = 0, units_1 = units; _i < units_1.length; _i++) {
            var unit = units_1[_i];
            var q = Math.floor(remaining / unit);
            if (q > 0) {
                parts.push(stringifyUnit(q, unit));
                remaining -= q * unit;
            }
        }
        if (remaining > 0) {
            parts.push(stringifyUnit(remaining, TimeUnit.MILLISECOND));
        }
        if (parts.length >= 2) {
            var last = parts.pop();
            parts.push(parts.pop() + " and " + last);
        }
        return parts.join(', ');
    }
    TimeUnit.stringify = stringify;
})(TimeUnit || (TimeUnit = {}));
//# sourceMappingURL=timeunit.js.map