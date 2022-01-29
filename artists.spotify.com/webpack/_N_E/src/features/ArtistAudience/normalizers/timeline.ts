import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import { parseYearMonthDay } from '@mrkt/features/date-helpers';
export function normalize(_ref) {
  var data = _ref.data,
      artistIdToType = _ref.artistIdToType,
      _ref$artistList = _ref.artistList,
      artistList = _ref$artistList === void 0 ? [] : _ref$artistList;
  var chartData = {};
  Object.entries(data).forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];

    var artist = artistList.find(function (d) {
      return d.id === key;
    });

    if (!artist || !(value instanceof Object)) {
      /**
       * If the key is not in the artist list OR
       * if the value is not an Object, return;
       */
      return;
    }

    var timelineDataArray = Array.isArray(value.timelinePoint) ? value.timelinePoint : [];
    var sortedTimelineData = timelineDataArray.map(function (item) {
      return {
        x: parseYearMonthDay(item.date),
        y: parseInt(item.num, 10)
      };
    }).sort(function (a, b) {
      return a.x.valueOf() - b.x.valueOf();
    });
    chartData[key] = {
      name: artist.name,
      type: artistIdToType(key),
      timelineData: sortedTimelineData
    };
  });
  return chartData;
}