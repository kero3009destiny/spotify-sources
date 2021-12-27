import { call } from 'redux-saga/effects';

import { wait } from './asyncHelpers';

interface withRetriesOptions {
  maxRetries: number;
  delay: number;
  multiplier: number;
}

const EXPONENTIAL_BACKOFF_DEFAULT_CONFIG = {
  maxRetries: 3,
  delay: 1500,
  multiplier: 2,
};

export function* withRetries<T>(
  payload: T,
  fn: (args: T) => any,
  options: withRetriesOptions = EXPONENTIAL_BACKOFF_DEFAULT_CONFIG,
) {
  let attempts = 0;
  let error = null;
  while (attempts < options.maxRetries) {
    try {
      const response = yield call(fn, payload);
      return response;
    } catch (e) {
      error = e;
      if (error instanceof Response && error.status >= 500) {
        const delay = options.delay * Math.pow(options.multiplier, attempts);
        attempts++;
        yield call(wait, delay);
      } else {
        throw error;
      }
    }
  }
  throw error;
}
