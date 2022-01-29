// ignore-string-externalization
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { spotifyOpenLink } from '../../shared/lib/urlHelpers';
/**
 * assignPlaylistOwner
 *
 * @param  {String} author
 * @param  {String} isPersonalized
 * @return {String}
 */

export var assignPlaylistOwner = function assignPlaylistOwner(author, isPersonalized) {
  return isPersonalized ? 'Spotify' : author;
};
/**
 * isPlaylistLinkable
 *
 * @param  {String} uri
 * @param  {Boolean} isPersonalized
 * @param  {Boolean} isMobile
 * @return {Boolean}
 */

export var isPlaylistLinkable = function isPlaylistLinkable(_ref) {
  var uri = _ref.uri,
      isPersonalized = _ref.isPersonalized,
      isMobile = _ref.isMobile,
      hasTitle = _ref.hasTitle;
  return uri && !isPersonalized && !isMobile && hasTitle;
};
/**
 * goToPlaylist
 */

export var goToPlaylist = function goToPlaylist(_ref2) {
  var uri = _ref2.uri,
      title = _ref2.title;
  window.open(spotifyOpenLink(uri), '_blank');
  sendEvent({
    eventCategory: 'Playlist',
    eventAction: 'playlist:open',
    eventLabel: title
  });
};