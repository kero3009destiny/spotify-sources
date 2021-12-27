import {
  buildAuthorizationUrl,
  getLocalAuth,
  storeOauthToken,
} from '../lib/auth';
import { externalRedirect, oauthTokenAcquired } from '../actions/AppActions';

import ActionTypes from '../actions/ActionTypes';
import { combineEpics } from 'redux-observable';
import { compose } from 'redux';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { interval } from 'rxjs/observable/interval';
import { never } from 'rxjs/observable/never';
import { push } from 'react-router-redux';
import { surveyUrl } from '../lib/urls';

const oauthRedirect = compose(
  externalRedirect,
  buildAuthorizationUrl,
  surveyUrl
);

const startSurveyEpic = (actions$, store) =>
  actions$
    .ofType(ActionTypes.START_SURVEY)
    .map(({ payload: surveyId }) => {
      const { auth } = store.getState();
      const isLoggedIn = auth.accessToken && !auth.expired;

      if (isLoggedIn) {
        return push(surveyUrl(surveyId));
      }

      return oauthRedirect(surveyId);
    })
    .filter(action => action !== null);

const setInitialAuthEpic = () =>
  fromPromise(getLocalAuth()).map(oauthTokenAcquired).catch(() => never());

const setAuthEpic = action$ =>
  action$
    .ofType(ActionTypes.OAUTH_TOKEN_ACQUIRED)
    .pluck('payload')
    .do(storeOauthToken)
    .switchMap(tokenInfo => {
      const now = new Date();
      const delta = tokenInfo.expiresAt - now;

      return interval(delta)
        .take(1)
        .map(() =>
          externalRedirect(buildAuthorizationUrl(window.location.pathname))
        );
    });

export default combineEpics(setInitialAuthEpic, startSurveyEpic, setAuthEpic);



// WEBPACK FOOTER //
// ./src/epics/authEpic.js