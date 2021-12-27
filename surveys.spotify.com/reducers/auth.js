import ActionTypes from '../actions/ActionTypes';

export default function auth(state = {}, action) {
  switch (action.type) {
    case ActionTypes.OAUTH_TOKEN_ACQUIRED: {
      const tokenInfo = { ...action.payload };
      Object.defineProperty(tokenInfo, 'expired', {
        get() {
          return tokenInfo.expiresAt && tokenInfo.expiresAt <= new Date();
        },
      });
      return tokenInfo;
    }
    default:
      return state;
  }
}



// WEBPACK FOOTER //
// ./src/reducers/auth.js