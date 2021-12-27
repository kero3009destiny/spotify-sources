import ActionTypes from './ActionTypes';
import { createAction } from 'redux-actions';

export const externalRedirect = createAction(
  ActionTypes.REDIRECT_TO_EXTERNAL_URL,
  url => url
);

export const oauthTokenAcquired = createAction(
  ActionTypes.OAUTH_TOKEN_ACQUIRED,
  token => token
);

export const oauthTokenAquireError = createAction(
  ActionTypes.OAUTH_TOKEN_ACQUIRE_FAILED,
  error => error
);

export const dismissError = createAction(ActionTypes.DISMISS_ERROR);



// WEBPACK FOOTER //
// ./src/actions/AppActions.js