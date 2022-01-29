// ignore-string-externalization

/**
 * Match Spotify URIs and open links
 * @param {String} uri
 * @return {Object} type, id
 */
export var matchUri = function matchUri(uri) {
  var matchOpenUri = /(?:open|play)\.spotify\.com\/(.*)\/(.*)\/?/.exec(uri);

  if (matchOpenUri) {
    var typeParts = matchOpenUri[1].split('/');
    var isUserPlaylist = typeParts[0] === 'user' && typeParts[2] === 'playlist';
    return isUserPlaylist ? {
      type: 'playlist',
      username: typeParts[1],
      playlistId: matchOpenUri[2],
      uri: uri
    } : {
      type: matchOpenUri[1],
      id: matchOpenUri[2].split('?')[0],
      uri: uri
    };
  }

  var matchEntity = /^spotify:(artist|album|track|show|episode):(.*)$/.exec(uri);

  if (matchEntity) {
    return {
      type: matchEntity[1],
      id: matchEntity[2],
      uri: uri
    };
  }

  var matchPlaylist = /^spotify:(?:user:.*:)?playlist:(.*)$/.exec(uri);

  if (matchPlaylist) {
    return {
      type: 'playlist',
      playlistId: matchPlaylist[1],
      uri: uri
    };
  }

  return null;
};