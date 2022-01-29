// ignore-string-externalization
/* eslint-disable @spotify/best-practices/no-discouraged-words */

import { withScope, captureException, init } from '@sentry/browser';
import { getHash } from '@mrkt/features/env';

const dsn = process.env.REACT_APP_SENTRY_DSN_TOKEN;

const release = getHash();

const sampleRate = 0.2;

const whitelistUrls = [
  /artists\.spotify\.com/, // production
  /mrkt-web\.scdn\.co/, // cdn
];

type Options = {
  logger?: string;
};

export function logError(error: Error, options: Options = {}) {
  const { logger = 'javascript' } = options;

  withScope(scope => {
    // https://github.com/getsentry/sentry-javascript/issues/1851#issuecomment-457145145
    scope.addEventProcessor(event => {
      event.logger = logger;
      return event;
    });

    captureException(error);
  });
}

export function logErrorV2(error: Error, tags: { [key: string]: string } = {}) {
  withScope(scope => {
    scope.setTags(tags);
    captureException(error);
  });
}

export function initialize() {
  if (process.env.NODE_ENV === 'production') {
    init({
      dsn,
      release,
      sampleRate,
      whitelistUrls,
    });
  }
}
