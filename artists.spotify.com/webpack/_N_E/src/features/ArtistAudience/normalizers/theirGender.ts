import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import { useNumberFormatter } from '@mrkt/features/i18n';
import { useGenderColorSpecs } from '../constants/genders';
import { distributeObjectFractals } from '../../../shared/lib/distributeObjectFractals';
export function useTheirGenderNormalizer(data) {
  var normalized = [];
  var genderColorSpecs = useGenderColorSpecs();
  var numberFormatter = useNumberFormatter();
  var percentFormatter = useNumberFormatter({
    style: 'percent'
  }); // sum up total

  var total = 0;
  Object.values(data).forEach(function (value) {
    return total += parseInt(value, 10);
  }); // turn data into percentage based values

  var genderObj = {};
  Object.entries(data).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    genderObj[key] = Number(value) / (total || 1) * 100;
  });

  if (total > 0) {
    genderObj = distributeObjectFractals(genderObj, 100);
  } // build genders arrays


  Object.entries(genderColorSpecs).forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    var cachedKey = key;

    if (genderObj[cachedKey] !== undefined) {
      var dataKey = data[cachedKey];
      var percentageRaw = parseInt(dataKey, 10) / total * 100;
      normalized.push({
        color_hex: value.color_hex,
        message: value.message,
        percentage_formatted: percentFormatter.format(Number(genderObj[cachedKey]) / 100),
        // here we make sure that smaller numbers are padded so they appear on the pie chart
        percentage_raw: percentageRaw > 0 && percentageRaw < 1 ? 0.75 : percentageRaw,
        value: genderObj[cachedKey],
        value_raw: parseInt(dataKey, 10),
        value_formatted: numberFormatter.format(Number(dataKey))
      });
    }
  });
  return normalized;
}