// ignore-string-externalization
import * as semanticMetrics from './semanticMetrics';
import * as sentry from './sentry';

function init() {
  sentry.initialize();
}

function logError(name: string, error: Error) {
  sentry.logError(error, { logger: name });
  semanticMetrics.logError(name);
}

function logSuccess(name: string) {
  semanticMetrics.logSuccess(name);
}

export const Logger = {
  init,
  logError,
  logSuccess,
  logCount: semanticMetrics.logCount,
};
