import { isExternalLink } from 'utils/is-external-link';
import { isInPageAnchor } from 'utils/is-in-page-anchor';
import { isQueryLink } from 'utils/is-query-link';

const HOME_PAGE_URL = '/';

/**
 * getUrl - Handles some possible URI values
 * @param {string} uri - HTTP-based URL
 * @returns {string} url
 */
const getUrl = uri => {
  const url = typeof uri === 'string' ? uri : '/';

  return url || HOME_PAGE_URL;
};

/**
 * @typedef LinkProps
 * @property {string} href - The path inside pages directory
 * @property {string} asLink - The path that will be rendered in the browser URL bar
 */

/**
 * getLinkProps - Gets the Link component props from the uri data
 * @param {string} uri - HTTP-based URL
 * @param {string} locale - Current locale. Used to add the locale in case of Navigation tag, which doesn't have the locale on the URL
 * @returns {LinkProps}
 */
const getLinkProps = (uri, locale) => {
  const url = getUrl(uri);
  if (
    isExternalLink(url) ||
    isInPageAnchor(url) ||
    isQueryLink(url) ||
    url === HOME_PAGE_URL
  ) {
    return { href: url };
  }

  const localizedUrl = locale ? `/${locale}/${url.replace('/', '')}` : url;
  // eslint-disable-next-line no-sparse-arrays
  const [, tidyUrl] = localizedUrl.match(/^\/?(.+)/) || [, ''];
  const [, tag, slug] = tidyUrl.split(/\/(?!#)/);

  return {
    href: [
      '/[locale]',
      ...(tag ? ['[tag]'] : []),
      ...(slug ? ['[slug]'] : []),
    ].join('/'),
    asLink: `/${tidyUrl}`,
  };
};

export default getLinkProps;
