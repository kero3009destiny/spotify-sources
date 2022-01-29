// ignore-string-externalization
import { getHash, getVersion } from '@mrkt/features/env';
import { accessTokenManager } from '@mrkt/features/auth';
import { mapAcceptLanguage } from '@mrkt/features/i18n/hooks/useAcceptLanguage';

export const defaultWebgateHeaders = {
  accept: 'application/json',
  'content-type': 'application/json',
  'spotify-app-version': `${getVersion()}.${getHash()}`.trim(),
  'app-platform': 'Browser',
  // default to document lang. without this default the browser will set the lang.
  'accept-language': mapAcceptLanguage(
    (typeof document === 'object' && document.documentElement.lang) || 'en',
  ),
};

export const WEBGATE_DOMAIN = `https://generic.wg.spotify.com`;

export { accessTokenManager };

export async function webgateFetch(
  input: RequestInfo,
  init?: RequestInit,
  omitHeaders?: string[],
) {
  const req = new Request(input, init);
  const token = await accessTokenManager.get();
  const filteredDefaultWebgateHeaders = filterKeys(
    defaultWebgateHeaders,
    omitHeaders || [],
  );

  for (const [key, value] of Object.entries(filteredDefaultWebgateHeaders)) {
    if (!req.headers.has(key)) req.headers.set(key, value);
  }

  if (token) {
    req.headers.set('authorization', `Bearer ${token}`);
  } else {
    req.headers.delete('authorization');
  }

  return fetch(req);
}

/**
 * Convenience method that calls webgateFetch, verifies an
 * OK response was returned and extracts JSON from the body.
 */
export async function webgateFetchJson(
  input: RequestInfo,
  init?: RequestInit,
  omitHeaders?: string[],
) {
  const response = await webgateFetch(input, init, omitHeaders);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.url}`);
  }

  return await response.json();
}

function filterKeys(
  unfiltered: { [k: string]: string },
  keysToFilter: string[],
) {
  return Object.keys(unfiltered).reduce((filtered, key) => {
    if (!keysToFilter.includes(key)) {
      filtered[key] = unfiltered[key];
    }
    return filtered;
  }, {} as { [k: string]: string });
}
