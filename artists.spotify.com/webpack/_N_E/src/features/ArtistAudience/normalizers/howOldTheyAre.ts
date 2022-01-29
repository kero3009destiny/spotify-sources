import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
// TODO rename to clarify GenderByAge breakdowns
import { useNumberFormatter } from '@mrkt/features/i18n';
import invariant from 'invariant';
import { distributeObjectFractals } from '../../../shared/lib/distributeObjectFractals';
import { useGetStringLegacy } from '../../../shared/messages/strings';
import { useGenderColorSpecs } from '../constants/genders';
export function useHowOldTheyAreNormalizer(data) {
  invariant(data instanceof Object, 'The argument "data" must an Object');
  var genderColorSpecs = useGenderColorSpecs();
  var strings = useGetStringLegacy();
  var numberFormatter = useNumberFormatter();
  var percentFormatter = useNumberFormatter({
    style: 'percent'
  }); // filter out absolute values

  var ageGenderBuckets = Object.entries(data).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        val = _ref2[1];

    return typeof val === 'object';
  });
  var overallSum = 0; // genders per age

  var age = ageGenderBuckets.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        genderObj = _ref4[1];

    var genders = {}; // strip _gender from keys first

    var labelKey = key.replace('_gender', '').replace('_', '').replace('_', 'To'); // @ts-ignore

    var message = strings[labelKey]; // sum up total

    var total = 0;
    Object.values(genderObj).forEach(function (value) {
      return total += parseInt(value, 10);
    });
    var listeners = total;
    overallSum += message ? listeners : 0; // build genders arrays

    Object.keys(genderColorSpecs).forEach(function (k) {
      if (genderObj[k] == null) return;
      genders["".concat(k, "_value_formatted")] = numberFormatter.format(Number(genderObj[k]));
      genders["".concat(k, "_value")] = parseInt(genderObj[k], 10);
    });
    return _objectSpread(_objectSpread({
      message: message
    }, genders), {}, {
      listeners: listeners,
      listeners_formatted: numberFormatter.format(listeners)
    });
  }).filter(function (d) {
    return !!d.message;
  });
  var origAgeObj = {};
  age.forEach(function (d) {
    origAgeObj[d.message.id] = d.listeners / (overallSum || 1) * 100;
  });

  var ageObj = _objectSpread({}, origAgeObj);

  if (overallSum > 0) {
    ageObj = distributeObjectFractals(origAgeObj, 100);
  }

  return age.map(function (d) {
    var percentage = {};
    Object.keys(genderColorSpecs).forEach(function (k) {
      if (d["".concat(k, "_value")] == null) return;
      var raw = d["".concat(k, "_value")] / (overallSum || 1);
      percentage[k] = d["".concat(k, "_value")] > 0 && raw < 0.002 ? 0 : raw;
    });
    return _objectSpread(_objectSpread(_objectSpread({}, d), percentage), {}, {
      percentage_raw: origAgeObj[d.message.id] / 100,
      percentage: percentFormatter.format(ageObj[d.message.id] / 100),
      percentage_formatted: "".concat(ageObj[d.message.id], "%")
    });
  });
}