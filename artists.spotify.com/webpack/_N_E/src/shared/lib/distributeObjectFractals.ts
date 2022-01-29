import _defineProperty from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/*
 * distributeObjectFractals
 *
 * Modifies values in an object so they together have a sum that equals the amount of target
 */
export function distributeObjectFractals(values, target) {
  // turn object into array and store its original order
  var valuesArray = Object.entries(values).map(function (_ref, index) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return {
      key: key,
      value: value,
      index: index
    };
  }); // sum up all fractal values

  var remainder = target - valuesArray.reduce(function (previous, current) {
    return previous + Math.round(current.value);
  }, 0);
  var resultArray = valuesArray // order by their fractal value
  .sort(function (a, b) {
    return Math.round(a.value) - a.value - (Math.round(b.value) - b.value);
  }) // distribute remainder from biggest to smallest original fractal value
  .map(function (item, index) {
    return _objectSpread(_objectSpread({}, item), {}, {
      value: // @ts-ignore - TS is right. Numbers should not be getting added to boolean. Leaving for now, for future cleanup
      Math.round(item.value) + (remainder > index) - (index >= valuesArray.length + remainder)
    });
  }) // restore original order
  .sort(function (a, b) {
    return a.index - b.index;
  }); // put back in original object format

  var result = {};
  resultArray.forEach(function (item) {
    return result[item.key] = item.value;
  });
  return result;
}