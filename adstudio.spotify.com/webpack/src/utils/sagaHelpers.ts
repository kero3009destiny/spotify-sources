import delay from '@redux-saga/delay-p';
import debug from 'debug';
import { window } from 'global';
import { call } from 'redux-saga/effects';

import { LoggedOutError } from 'api/webgate';

import { routes } from 'config/routes';

const log = debug('utils:sagaHelpers');

export const MAX_POLL_TIME_SECONDS = 30;
// Note: if you want to increase/decrease how often we poll, change this value
export const POLL_INTERVAL_SECONDS = 5;

interface PollOptions {
  debugName?: string;
  methodArgs?: any[];
  maxPollTimeSeconds?: number;
  pollIntervalSeconds?: number;
}

export function* _poll(method: Function, options: PollOptions = {}) {
  let currErr;

  const {
    debugName = '', // helps in sentry errors within minified code
    methodArgs = [],
    maxPollTimeSeconds = MAX_POLL_TIME_SECONDS,
    pollIntervalSeconds = POLL_INTERVAL_SECONDS,
  } = options;
  const methodName = method.name || 'DAMN YOU IE';
  log(`initiating poll to backend, ${debugName || methodName}`);
  const maxPollAttempts = maxPollTimeSeconds / pollIntervalSeconds;
  log('MAX polling attempts: ', maxPollAttempts);

  for (let i = 0; i < maxPollAttempts; i++) {
    try {
      // @ts-ignore
      const result = yield call(method, ...methodArgs);
      log(`${debugName || methodName} call succeeded.`);
      return result;
    } catch (e) {
      // If this is a loggedOutError, the user's token has expired and we need to clear
      // their cookies and force them to log back into Spotify/Ad Studio
      if (i > 0 && e instanceof LoggedOutError) {
        window.location.replace(routes.LOGOUT);
      }

      currErr = e;
      log(
        `awaiting response for ${debugName || methodName}; should retry: ${
          e.message
        }`,
      );

      // No need to delay on the last failed iteration
      if (i !== maxPollAttempts - 1) {
        yield call(delay, pollIntervalSeconds * 1000);
      }
    }
  }

  log(
    `exceeded the maximum number of ${debugName || methodName} poll attempts`,
  );

  let currErrMsg = currErr;
  if (currErr instanceof Error) {
    currErrMsg = `last underlying error: ${currErr?.name}: ${currErr?.message}
     - ${currErr?.stack}`;
  } else if (currErr?.status || currErr.statusText) {
    currErrMsg = `error thrown from response: ${currErr?.status}: ${currErr?.statusText}`;
  }

  throw new Error(
    `exceeded the maximum number of ${debugName || methodName} poll attempts:
      ${currErrMsg}`,
  );
}

// Note: allows us to do yield poll(...args) instead of yield call(poll, ...args);
export function poll(method: Function, options: PollOptions = {}) {
  return call(_poll, method, options);
}
