// ignore-string-externalization
import { parseYearMonthDay } from '@mrkt/features/date-helpers';
export function normalize(_ref) {
  var annotations = _ref.annotations;
  var annotationData = Array.isArray(annotations.annotationsByDate) ? annotations.annotationsByDate : [];
  var output = annotationData.map(function (d) {
    return {
      date: parseYearMonthDay(d.date),
      count: parseInt(d.count, 10),
      type: d.annotationTypeId,
      metadata: Array.isArray(d.metadata) ? d.metadata.map(function (meta) {
        return {
          uri: meta.id,
          name: meta.name
        };
      }) : [],
      hideLink: d.annotationTypeId === 'MANUAL_ANNOTATION'
    };
  }).filter(function (d) {
    return !!d.metadata;
  });
  return output;
}