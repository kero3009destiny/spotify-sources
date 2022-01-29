// ignore-string-externalization
/* Converts Spotify URI to Artist Link */
export function spotifyOpenLink(value: string): string {
  return value
    .replace(/:/g, '/')
    .replace(/^spotify\//i, 'https://open.spotify.com/');
}

/**
 * Match Spotify URIs and open links
 * @todo untangle this because it's a mess
 */
export function matchUri(rawUri: string): any {
  const uri = rawUri.trim();

  /*
    Open website links
  */
  const matchOpenUri = /(?:open|play)\.spotify\.com\/(.*)\/(.*)\/?/.exec(uri);
  if (matchOpenUri) {
    const typeParts = matchOpenUri[1].split('/');
    const matchId = matchOpenUri[2].split('?')[0];

    /*
      Playlist V1 url
      e.g. https://open.spotify.com/user/spotify/playlist/2SSEozHbLRKueJBM7LAlAo
    */
    if (typeParts[0] === 'user' && typeParts[2] === 'playlist') {
      return {
        type: 'playlist',
        username: typeParts[1],
        playlistId: matchId,
        uri,
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
        uri,
      };
    }

    // Default case
    return { type: matchOpenUri[1], id: matchId, uri };
  }

  /*
    Non-playlist entity URIs
  */
  const matchEntity = /^spotify:(artist|album|track|show|episode):(.*)$/.exec(
    uri,
  );
  if (matchEntity) {
    return { type: matchEntity[1], id: matchEntity[2], uri };
  }

  /*
    Playlists!
  */
  const matchPlaylist = /^spotify:(?:user:(.*):)?playlist:(.*)$/.exec(uri);

  // V1: Both username and playlistId compose the URI
  if (matchPlaylist && !!matchPlaylist[1]) {
    return {
      type: 'playlist',
      username: matchPlaylist[1],
      playlistId: matchPlaylist[2],
      uri,
    };
  }

  // V2: playlist entity URI
  if (matchPlaylist) {
    return {
      type: 'playlist',
      v2: true,
      playlistId: matchPlaylist[2],
      uri,
    };
  }

  /*
    No match
  */
  return null;
}

/* Checks wether or not a hostname is a spotify.com (sub)domain */
export function isSpotifyDomain(hostname: string): boolean {
  return /(?:^|\.)spotify\.com$/.test(hostname);
}
