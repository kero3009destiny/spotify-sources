// ignore-string-externalization
import { utcFormat } from 'd3-time-format';
import invariant from 'invariant';
import capitalize from 'lodash/capitalize';
import { useDateTimeFormatter, useNumberFormatter } from '@mrkt/features/i18n';
import { EM_DASH, intlDateFormatOptions, formatDateToString, formatNumberWithFallback } from '@mrkt/features/stats-components/utils';
var dateTitleFormatter = utcFormat('%A, %B %e, %Y');

var formatTitleDate = function formatTitleDate(date) {
  return date === null ? '' : dateTitleFormatter(date);
};

export var useReleasesNormalizer = function useReleasesNormalizer() {
  var numberFormatter = useNumberFormatter();
  var dateFormatter = useDateTimeFormatter(intlDateFormatOptions);
  return function normalizer() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    invariant(Array.isArray(data), 'The argument "data" must an Array');
    var normalized = data.map(function (item) {
      var _item$releaseDate, _item$releaseYear, _item$recordingStats;

      var output = {
        albumName: item.albumName,
        albumUri: item.albumUri,
        releaseDate: (_item$releaseDate = item === null || item === void 0 ? void 0 : item.releaseDate) !== null && _item$releaseDate !== void 0 ? _item$releaseDate : EM_DASH,
        releaseYear: (_item$releaseYear = item === null || item === void 0 ? void 0 : item.releaseYear) !== null && _item$releaseYear !== void 0 ? _item$releaseYear : EM_DASH,
        imageUri: item.imageUri,
        isDisabled: item.isDisabled,
        showSplitRightsBadge: item.showSplitRightsBadge,
        formatted: {
          totalStreams: item !== null && item !== void 0 && item.numStreams ? formatNumberWithFallback(item.numStreams, numberFormatter) : EM_DASH,
          releaseType: item.releaseType === 'EP' ? item.releaseType : capitalize(item.releaseType.toLowerCase())
        }
      };

      if ((item === null || item === void 0 ? void 0 : (_item$recordingStats = item.recordingStats) === null || _item$recordingStats === void 0 ? void 0 : _item$recordingStats.length) > 0) {
        var recordingStats = item.recordingStats.map(function (track) {
          var hasReleaseDate = track === null || track === void 0 ? void 0 : track.releaseDate;
          var trackReleaseDate = hasReleaseDate ? formatDateToString(new Date(track.releaseDate), dateFormatter) : EM_DASH;
          var trackReleaseDateTitle = hasReleaseDate ? formatTitleDate(new Date(track.releaseDate)) : EM_DASH;
          var hasTrackListeners = track === null || track === void 0 ? void 0 : track.numListeners;
          var hasTrackSavers = track === null || track === void 0 ? void 0 : track.numSavers;
          var hasTrackStreams = track === null || track === void 0 ? void 0 : track.numStreams;
          var hasTrackViews = track === null || track === void 0 ? void 0 : track.numCanvasViews;
          var statsOutput = {
            releaseDate: trackReleaseDate,
            releaseDateTitle: trackReleaseDateTitle,
            listeners: hasTrackListeners ? formatNumberWithFallback(track.numListeners, numberFormatter) : EM_DASH,
            savers: hasTrackSavers ? formatNumberWithFallback(track.numSavers, numberFormatter) : EM_DASH,
            streams: hasTrackStreams ? formatNumberWithFallback(track.numStreams, numberFormatter) : EM_DASH,
            views: hasTrackViews ? formatNumberWithFallback(track.numCanvasViews, numberFormatter) : EM_DASH,
            trackName: track.trackName,
            trackUri: track.trackUri,
            isrc: track.isrc,
            isDisabled: track.isDisabled,
            showSplitRightsBadge: track.showSplitRightsBadge
          };
          return statsOutput;
        }); // @ts-ignore

        output.formatted.recordingStats = recordingStats;
      }

      return output;
    });
    return normalized;
  };
};