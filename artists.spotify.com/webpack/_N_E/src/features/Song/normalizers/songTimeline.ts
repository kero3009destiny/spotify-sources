// ignore-string-externalization
import { parseYearMonthDay } from '@mrkt/features/date-helpers';
export var parseDate = function parseDate(dateString) {
  return parseYearMonthDay(dateString);
};
export function normalize(data, song) {
  var chartData = {};
  chartData[song.id] = {
    name: song.name,
    type: 'primary',
    timelineData: data ? data.timelinePoint.map(function (item) {
      return {
        x: parseDate(item.date),
        y: parseInt(item.num, 10) || 0
      };
    }).sort(function (a, b) {
      return Number(a.x) - Number(b.x);
    }) : []
  };
  return chartData;
}