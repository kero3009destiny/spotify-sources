import LRUCache from 'lru-cache';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig() || {};

export const CACHE_ENABLED =
  typeof window === 'undefined' && publicRuntimeConfig.CACHE_ENABLED === 'true';

const cache = CACHE_ENABLED
  ? new LRUCache({
      max: 100,
      maxAge: 1000 * 60 * 15, // 15 minutes
    })
  : null;

export const has = key => {
  if (!CACHE_ENABLED) return false;

  return cache.has(key);
};

export const set = (key, value) => {
  if (!CACHE_ENABLED) return;

  /* eslint-disable-next-line no-console */
  console.log('[cache] set cache: ', key);

  cache.set(key, value);
};

export const get = key => {
  if (!CACHE_ENABLED || !cache.has(key)) return undefined;

  /* eslint-disable-next-line no-console */
  console.log('[cache] cache hit: ', key);

  return cache.get(key);
};
