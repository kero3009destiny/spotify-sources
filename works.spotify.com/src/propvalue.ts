export var PropValue;
(function (PropValue) {
    function equal(pv1, pv2) {
        if (!pv1 || !pv2)
            return false;
        if (pv1.type !== pv2.type)
            return false;
        if (pv1.value !== pv2.value)
            return false;
        return true;
    }
    PropValue.equal = equal;
})(PropValue || (PropValue = {}));
export var PropValues;
(function (PropValues) {
    function equal(values1, values2) {
        var keys = Object.keys(values1);
        if (keys.length !== Object.keys(values2).length)
            return false;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!PropValue.equal(values1[key], values2[key]))
                return false;
        }
        return true;
    }
    PropValues.equal = equal;
    function entries(values) {
        return Object.entries(values);
    }
    PropValues.entries = entries;
})(PropValues || (PropValues = {}));
//# sourceMappingURL=propvalue.js.map