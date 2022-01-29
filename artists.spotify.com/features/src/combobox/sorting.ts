// ignore-string-externalization
/**
 * Sorts an array of Spotify albums/artists/playlists/tracks by `popularity`
 * but exact `name` matches for the searched value take precedent over that
 * @param  {Array} items         An array of objects, based on the Web API Object Model (https://developer.spotify.com/web-api/object-model/)
 * @param  {String} searchValue) (optional) Value to compare with for an exact `name` match
 * @return {Array}               Sorted `items`
 */
export const sortByMatchAndPopularity = (items: $TSFixMe, searchValue = '') =>
  items.sort((a: $TSFixMe, b: $TSFixMe) => {
    const valueLowercase = searchValue.toLowerCase();
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    const aPop = a.popularity;
    const bPop = b.popularity;

    // exact matches for query get priority
    if (aName === valueLowercase || bName === valueLowercase) {
      if (aName === valueLowercase && bName !== valueLowercase) {
        return -1;
      }
      if (bName === valueLowercase && aName !== valueLowercase) {
        return 1;
      }
    }

    // resume with popularity sort otherwise
    if (aPop === bPop) {
      return 0;
    }
    return aPop < bPop ? 1 : -1;
  });
