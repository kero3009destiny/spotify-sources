import { utcDay } from 'd3-time';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { spotifyOpenLink } from '../../shared/lib/urlHelpers';
var IN_APP_URL = 'artists.spotify.com/c/';
export var lastSevenDays = function lastSevenDays(latestDate, dateFormat) {
  var latestDay = new Date(latestDate);
  var lastWeekDay = utcDay.offset(latestDay, -6);
  return "".concat(dateFormat(lastWeekDay), " \u2013 ").concat(dateFormat(latestDay));
};
export var numFollowersFormatting = function numFollowersFormatting(numFollowers, t, numberFormatter) {
  if (numFollowers === -1) {
    return "-";
  }

  return "".concat(t('S4A_LOGGED_IN_HOME_c4f5f5', "{formattedNum, plural,\n        one {{formattedNum} Follower }\n        other {{formattedNum} Followers }\n    }", 'Tells the user how many followers they have', {
    formattedNum: numberFormatter.format(parseInt(numFollowers, 10))
  }));
};
export var numFormatting = function numFormatting(num, numberFormatter) {
  return numberFormatter.format(num ? parseInt(num, 10) : 0);
};
export var playlistLinksOut = function playlistLinksOut(uri, isPersonalized) {
  return uri && !isPersonalized;
};
export var goToPlaylist = function goToPlaylist(uri) {
  window.open(spotifyOpenLink(uri), '_blank');
  sendEvent({
    eventCategory: 'Outbound',
    eventAction: 'playlists',
    eventLabel: uri
  });
};
export var isInternalUrl = function isInternalUrl(url) {
  return url.includes(IN_APP_URL);
};
export var getRelativeUrl = function getRelativeUrl(internalUrl) {
  var endOfInAppPrefix = internalUrl.indexOf(IN_APP_URL) + IN_APP_URL.length;
  return internalUrl.substring(endOfInAppPrefix - 1, internalUrl.length);
};