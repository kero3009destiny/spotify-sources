// ignore-string-externalization
import memoize from 'lodash/memoize';
import { getSilentAuthToken } from './silentAuth';
import { getTestAuthToken } from './testAuth';

async function getAccessToken() {
  if (process.env.NODE_ENV === 'test') {
    return getTestAuthToken();
  }

  return getSilentAuthToken();
}

let memoizedGetAccessToken = createGetAccessToken();

export const accessTokenManager = {
  get() {
    return memoizedGetAccessToken();
  },

  clear() {
    // clear state by creating new memoized function
    memoizedGetAccessToken = createGetAccessToken();
  },
};

function createGetAccessToken() {
  const cacheKey = 'token';

  const memoized = memoize(
    async () => {
      const [token, expiresIn] = await getAccessToken();
      const expiresInMs = expiresIn * 1000 * 0.9;

      // invalidate cache after expired
      if (expiresInMs < Infinity) {
        setTimeout(() => {
          memoized.cache.delete(cacheKey);
        }, expiresInMs);
      }

      return token;
    },
    () => cacheKey,
  );

  return memoized;
}
