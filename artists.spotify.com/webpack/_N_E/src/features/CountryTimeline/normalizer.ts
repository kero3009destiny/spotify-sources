import _defineProperty from "/var/jenkins_home/workspace/tingle.cd962a55-a742-407f-a437-251a69d63f52/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { parseYearMonthDay } from '@mrkt/features/date-helpers';
import isArray from 'lodash/isArray';
import invariant from 'invariant';
export function normalize(data) {
  invariant(isArray(data.countryTimelines), 'Function expects an array as an argument');
  return data.countryTimelines.map(function (d) {
    invariant(isArray(d.timelinePoint), 'Function expects an array as an argument');
    return _objectSpread(_objectSpread({}, d), {}, {
      // ensure d.timeline is array
      timeline: d.timelinePoint.map(function (el) {
        return {
          date: parseYearMonthDay(el.date),
          num: parseInt(el.num, 10)
        };
      }).sort(function (a, b) {
        return a.date - b.date;
      })
    });
  });
}