// ignore-string-externalization
/**
 * isPersonalizedPlaylist
 *
 * @param  {String} title
 * @return {Boolean}
 */
export const isPersonalizedPlaylist = (title: $TSFixMe) =>
  [
    'Discover Weekly',
    'Radio',
    'Release Radar',
    'The Ones That Got Away',
    'Your Daily Mix',
    'Your Summer Rewind',
    'Your Top Songs 2017',
    'Home Mix',
    'Your Top Songs 2018',
    'Tastebreakers',
  ].includes(title);

/**
 * assignPlaylistOwner
 *
 * @param  {String} title
 * @param  {String} author
 * @return {String}
 */
// Only referenced in test
export const assignPlaylistOwner = (title: $TSFixMe, author: $TSFixMe) =>
  isPersonalizedPlaylist(title) ? 'Spotify' : author;

/**
 * isPlaylistLinkable
 *
 * @param  {String} uri
 * @param  {String} title
 * @param  {Boolean} isMobile
 * @return {Boolean}
 */
export const isPlaylistLinkable = (
  uri: $TSFixMe,
  title: $TSFixMe,
  isMobile: $TSFixMe,
) => uri && !isPersonalizedPlaylist(title) && !isMobile;

/**
 *
 * @param {String} uri
 */

export const generateOpenLink = (uri: $TSFixMe) =>
  uri.replace(/:/g, '/').replace(/^spotify\//i, 'https://open.spotify.com/');

/**
 *
 * @param {String} uri
 */
export const goToPlaylist = (uri: $TSFixMe) => {
  const spotifyOpenLink = generateOpenLink(uri);
  window.open(spotifyOpenLink, '_blank');
};
