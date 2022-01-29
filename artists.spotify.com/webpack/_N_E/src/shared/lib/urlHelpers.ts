// ignore-string-externalization

/* Converts Spotify URI to Artist Link */
export function spotifyOpenLink(value) {
  return value.replace(/:/g, '/').replace(/^spotify\//i, 'https://open.spotify.com/');
}
/**
 * Match Spotify URIs and open links
 * @todo untangle this because it's a mess
 */

export function matchUri(rawUri) {
  var uri = rawUri.trim();
  /*
    Open website links
  */

  var matchOpenUri = /(?:open|play)\.spotify\.com\/(.*)\/(.*)\/?/.exec(uri);

  if (matchOpenUri) {
    var typeParts = matchOpenUri[1].split('/');
    var matchId = matchOpenUri[2].split('?')[0];
    /*
      Playlist V1 url
      e.g. https://open.spotify.com/user/spotify/playlist/2SSEozHbLRKueJBM7LAlAo
    */

    if (typeParts[0] === 'user' && typeParts[2] === 'playlist') {
      return {
        type: 'playlist',
        username: typeParts[1],
        playlistId: matchId,
        uri: uri
      };
    }
    /*
      Playlist V2 url
      e.g. https://open.spotify.com/playlist/37i9dQZF1DX17dmzi8A5FV
    */


    if (matchOpenUri[1] === 'playlist') {
      return {
        type: 'playlist',
        v2: true,
        playlistId: matchId,
        uri: uri
      };
    } // Default case


    return {
      type: matchOpenUri[1],
      id: matchId,
      uri: uri
    };
  }
  /*
    Non-playlist entity URIs
  */


  var matchEntity = /^spotify:(artist|album|track|show|episode):(.*)$/.exec(uri);

  if (matchEntity) {
    return {
      type: matchEntity[1],
      id: matchEntity[2],
      uri: uri
    };
  }
  /*
    Playlists!
  */


  var matchPlaylist = /^spotify:(?:user:(.*):)?playlist:(.*)$/.exec(uri); // V1: Both username and playlistId compose the URI

  if (matchPlaylist && !!matchPlaylist[1]) {
    return {
      type: 'playlist',
      username: matchPlaylist[1],
      playlistId: matchPlaylist[2],
      uri: uri
    };
  } // V2: playlist entity URI


  if (matchPlaylist) {
    return {
      type: 'playlist',
      v2: true,
      playlistId: matchPlaylist[2],
      uri: uri
    };
  }
  /*
    No match
  */


  return null;
}
/* Checks wether or not a hostname is a spotify.com (sub)domain */

export function isSpotifyDomain(hostname) {
  return /(?:^|\.)spotify\.com$/.test(hostname);
}