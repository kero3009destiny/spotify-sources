import * as Sentry from '@sentry/react';
import { window } from 'global';
import reduxCatch from 'redux-catch';

export const errorHandler = error => {
  // directly log the error to the console in ALL cases,
  // not just via a debug log. this will help us debug
  // production errors for users.
  if (window.console && window.console.error) {
    window.console.error(error);
  }

  // dispatch the error to Sentry, sending the current
  // redux state and the action that failed as we go.
  // mark error as fatal since this is an unhandled exception
  Sentry.withScope(scope => {
    scope.setExtra('level', 'fatal');
    Sentry.captureException(error);
  });
};

export default reduxCatch(errorHandler);
