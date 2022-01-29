// ignore-string-externalization
export function getSpotifyClientId() {
  if (process.env.USE_TEST_ACCOUNTS) {
    return (
      process.env.REACT_APP_SPOTIFY_CLIENT_ID_TESTING ||
      '93d3475bf1bf48e08bc6d1de47a970e7'
    );
  }

  return (
    process.env.SPOTIFY_CLIENT_ID ||
    process.env.REACT_APP_SPOTIFY_CLIENT_ID ||
    '93d3475bf1bf48e08bc6d1de47a970e7'
  );
}

export function getHash() {
  return process.env.REACT_APP_HASH || process.env.NODE_ENV;
}

export function getVersion() {
  return process.env.REACT_APP_VERSION || '0.0.0';
}
