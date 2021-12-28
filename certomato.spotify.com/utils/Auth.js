import * as api from '../api/api';

/**
 Class handling user authorization (accesstokens)
 */
const Auth = (function Auth() {
  const ACCESSTOKEN_OBJECT_KEY = 'accessTokenObject';
  const TOKEN_REQUEST_STATUS_KEY = 'tokenRequestStatus';
  const APPTOKEN = 'e7c00caeb2a545189c5084551626e64a';
  const REDIRECT_URI = encodeURIComponent(`${window.location.protocol}//${window.location.host}/`);
  const SCOPES = encodeURIComponent(
    'user-read-playback-state,user-read-private,streaming,user-read-birthdate,user-read-email',
  );
  const LOGIN_LINK = `${window.location.hostname.endsWith('spotify.net') ? 'https://accounts.spotify.net' : 'https://accounts.spotify.com'}/authorize?client_id=${APPTOKEN}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=code`;
  const tokenRequestStatus = localStorage.getItem(TOKEN_REQUEST_STATUS_KEY);
  const tokenRequestInProgressOrDone = tokenRequestStatus === 'DONE' || tokenRequestStatus === 'IN_PROGRESS';

  const fetchAccessToken = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const currectTokenObject = JSON.parse(localStorage.getItem(ACCESSTOKEN_OBJECT_KEY));
    const now = new Date();
    if (code && !tokenRequestInProgressOrDone && !currectTokenObject) {
      localStorage.setItem(TOKEN_REQUEST_STATUS_KEY, 'IN_PROGRESS');
      return api.exchangeCodeForToken(code, REDIRECT_URI)
        .then(res => {
          const tokenObject = res.data;
          let time = new Date();
          time = new Date(time.getTime() + 1000 * parseInt(tokenObject.expires_in, 10));
          tokenObject.expires_at = time;
          localStorage.setItem(ACCESSTOKEN_OBJECT_KEY, JSON.stringify(tokenObject));
          localStorage.setItem(TOKEN_REQUEST_STATUS_KEY, 'DONE');
          return tokenObject.access_token;
        });
    } else if (currectTokenObject && currectTokenObject.expires_at) {
      const expiresAt = new Date(currectTokenObject.expires_at);
      if (now >= expiresAt) {
        return api.exchangeRefreshTokenForToken(currectTokenObject.refresh_token)
          .then(res => {
            const tokenObject = res.data;
            let time = new Date();
            time = new Date(time.getTime() + 1000 * parseInt(tokenObject.expires_in, 10));
            currectTokenObject.expires_at = time;
            currectTokenObject.access_token = tokenObject.access_token;
            localStorage.setItem(ACCESSTOKEN_OBJECT_KEY, JSON.stringify(currectTokenObject));
            return currectTokenObject.access_token;
          });
      }
    }
    if (currectTokenObject && currectTokenObject.access_token) {
      // Remove the token from the returned URL, so it's not visible in the browser
      window.location.hash = '';
      // eslint-disable-next-line no-undef
      return Promise.resolve(currectTokenObject.access_token);
    }
    localStorage.removeItem(ACCESSTOKEN_OBJECT_KEY);
    // eslint-disable-next-line no-undef
    return Promise.resolve('');
  };

  /**
  Deletes accessToken from local storage.
  */
  const clearAccessToken = () => {
    localStorage.removeItem(ACCESSTOKEN_OBJECT_KEY);
    localStorage.removeItem(TOKEN_REQUEST_STATUS_KEY);
  };

  /**
  Returns a login link to use for authorization.
  */
  const getLoginLink = () => {
    return LOGIN_LINK;
  };

  return {
    clearAccessToken: clearAccessToken,
    getLoginLink: getLoginLink,
    fetchAccessToken: fetchAccessToken,
  };
})();

export default Auth;
