import _defineProperty from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import has from 'lodash/has';
import { distributeObjectFractals } from '../../../shared/lib/distributeObjectFractals';
import { useGetStringLegacy } from '../../../shared/messages/strings';

var buildMessage = function buildMessage(key) {
  return {
    id: "messages.metric.".concat(key),
    defaultMessage: key
  };
};

export function useSourcesOfStreamsNormalizer() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var ORDERED_KEYS = ['catalog', 'user', 'network', 'editorial', 'personalized', 'other'];
  var normalized = [];
  var legacyStrings = useGetStringLegacy(); // sum up total

  var total = 0;
  Object.values(data).forEach(function (value) {
    return total += parseInt(value, 10);
  }); // turn data into percentage based values

  var groupObj = {};
  Object.entries(data).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return groupObj[key] = parseInt(value, 10) / (total || 1) * 100;
  });

  if (total > 0) {
    groupObj = distributeObjectFractals(groupObj, 100);
  }

  var strings = _objectSpread({}, legacyStrings);

  Object.entries(groupObj).sort(function (_ref3, _ref4) {
    var _ref5 = _slicedToArray(_ref3, 1),
        a = _ref5[0];

    var _ref6 = _slicedToArray(_ref4, 1),
        b = _ref6[0];

    return ORDERED_KEYS.indexOf(a) - ORDERED_KEYS.indexOf(b);
  }).forEach(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        key = _ref8[0],
        value = _ref8[1];

    var labelKey = "streamSources_".concat(key);
    var label = has(strings, labelKey) ? strings[labelKey] : buildMessage(labelKey);
    var tooltipKey = "streamSources_".concat(key, "Tooltip");
    var tooltip = has(strings, tooltipKey) ? strings[tooltipKey] : buildMessage(tooltipKey);
    normalized.push({
      message: label,
      tooltip: tooltip,
      value: value
    });
  });
  return normalized;
}