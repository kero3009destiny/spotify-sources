import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import { formatMonthDayOfMonthYear } from '@mrkt/features/date-helpers';
import { ascending } from 'd3-array';
import { numberSuffixFormatter } from '../../../shared/lib/numberHelpers';
import { EntityType } from './types';
export var getOffsetPos = function getOffsetPos(e, node) {
  // implementation of d3.mouse => https://github.com/d3/d3-selection/blob/master/src/point.js
  var svg = node.ownerSVGElement || node;
  var screenCTM = node.getScreenCTM();

  if (svg.createSVGPoint && screenCTM) {
    var point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    point = point.matrixTransform(screenCTM.inverse());
    return [point.x, point.y];
  }

  var rect = node.getBoundingClientRect();
  var parentElement = node.parentElement;
  var parentRect = parentElement.getBoundingClientRect();
  var clientLeft = rect.left - parentRect.left;
  var clientTop = rect.top - parentRect.top;
  return [e.clientX - rect.left - clientLeft, e.clientY - rect.top - clientTop];
};
export var sortArtistData = function sortArtistData(data) {
  return Object.entries(data).sort(function (_ref, _ref2) {
    var _ref3 = _slicedToArray(_ref, 2),
        _key1 = _ref3[0],
        a = _ref3[1];

    var _ref4 = _slicedToArray(_ref2, 2),
        _key2 = _ref4[0],
        b = _ref4[1];

    // always put primary artist ahead of compared artists
    if (a.type === EntityType.PRIMARY) {
      return -1;
    }

    if (b.type === EntityType.PRIMARY) {
      return 1;
    }

    return ascending(a.type, b.type);
  });
};
export var xAccessor = function xAccessor(d) {
  return d.x;
};
export var yAccessor = function yAccessor(d) {
  return d.y;
};
export var getAriaLabelStrings = function getAriaLabelStrings(frameIndex, date, sortedArtistData, annotations, t) {
  var dateString = formatMonthDayOfMonthYear(date);
  var artistLabels = sortedArtistData.filter(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        _ = _ref6[0],
        val = _ref6[1];

    return val.type === EntityType.PRIMARY;
  }) // filter out compared artists
  .map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        _ = _ref8[0],
        val = _ref8[1];

    if (frameIndex === 0) {
      return "".concat(val.name, " ").concat(numberSuffixFormatter(yAccessor(val.timelineData[frameIndex])));
    }

    return numberSuffixFormatter(yAccessor(val.timelineData[frameIndex]));
  });
  var dataString = "".concat(dateString, ", ").concat(artistLabels.join(', '), ".");
  var annIndex = annotations.findIndex(function (val) {
    return val.date.valueOf() === date.valueOf();
  });
  var annotationString;

  if (annIndex > -1) {
    var links = annotations[annIndex].metadata.map(function (m) {
      return m.name;
    }).join(', ');
    annotationString = t('TIMELINE_ARIA_LABEL_fc4766', 'link to {links}.', 'Annotations on the timeline chart that link to Spotify playlists.', {
      links: links
    });
  }

  var navigationString;

  if (frameIndex === 0) {
    navigationString = t('TIMELINE_ARIA_LABEL_688526', 'If there is a link, press enter to navigate to the playlists section.', '');
  }

  return {
    dataString: dataString,
    annotationString: annotationString,
    navigationString: navigationString
  };
};