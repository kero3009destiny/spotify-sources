import { parseYearMonthDay } from '@mrkt/features/date-helpers';
import { useDateTimeFormatter, useRelativeTimeFormatter, useT } from '@mrkt/features/i18n';
export function useGetReleaseString(dateStr, releasingState) {
  var t = useT();
  var relativeTimeFormatter = useRelativeTimeFormatter({
    numeric: 'auto'
  });
  var dateFormatter = useDateTimeFormatter({
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  var date = parseYearMonthDay(dateStr);
  var correctReleasingState = releasingState && releasingState.released_countries_count > 0 && {
    totalCountriesCount: releasingState.total_countries_count,
    releasedCountriesCount: releasingState.released_countries_count
  };
  var tooFarAwayDate = dateFormatter.format(date); // convert everything to local time...then take the diff.

  var numDays = Math.ceil((date.getTime() - Date.now()) / 86400000);

  if (correctReleasingState) {
    return t('URP-releasing-state', 'Releasing · {releasedCountriesCount} of {totalCountriesCount} countries', 'Shows how many countries this release is live in out of the total Spotify is launched in', {
      releasedCountriesCount: correctReleasingState.releasedCountriesCount,
      totalCountriesCount: correctReleasingState.totalCountriesCount
    });
  }

  if (numDays <= 7) {
    return t('URP-releases-in-days', 'Releases {inNumDays}', '', {
      inNumDays: relativeTimeFormatter.format(numDays, 'days')
    });
  }

  return t('URP-releases-date', 'Releases {releaseDate}', 'The release date of the album', {
    releaseDate: tooFarAwayDate
  });
}
export var daysToRelease = function daysToRelease(releaseTimeInMillis) {
  return Math.ceil((releaseTimeInMillis - Date.now()) / 86400000);
};
export function useReleaseDateFormatter(releaseDate) {
  var dateFormatter = useDateTimeFormatter({
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  if (!releaseDate) return '-';
  var date = parseYearMonthDay(releaseDate);
  if (!date) return '-';
  return dateFormatter.format(date);
}