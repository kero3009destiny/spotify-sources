import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';
import mergeWith from 'lodash/mergeWith';
import { isExternalLink } from 'utils/is-external-link';
import { useTranslation } from 'i18n/nexti18n';

// TODO: Add approved default meta. SB2B-742
const defaultMeta = {
  canonicalUrl: '',
  keywords: '',
  metaDescription: '',
  metaTitle: 'Spotify Advertising',
  image: {
    url: '/images/spotify-advertising.jpg',
  },
  twitterSite: '@SpotifyBrands',
};

/**
 * Resolves assignments for null/undefined values.
 * @param {*} objVal The value of the destination object.
 * @param {*} srcVal The value of the source object.
 * @returns {string|object} The resolved value.
 */
const metaResolver = (objVal, srcVal) => objVal || srcVal;

/**
 * Renders meta tags for a page.
 * @param {Object} meta Meta tags object.
 * @param {string} meta.metaTitle Title meta tag.
 * @param {string} meta.metaDescription Description meta tag.
 * @param {string} meta.keywords Keywords meta tag.
 * @param {string} meta.canonicalUrl Canonical meta tag.
 * @param {string} meta.image.url Image url for open graph and twitter cards.
 * @param {Object} appUrl A URL object.
 * @param {string} appUrl.hostName A URL host name.
 * @param {string} appUrl.pathName A URL path name.
 * @param {string} locale Current page locale.
 * @param {string} showHreflang Flag to show the hreflang tags.
 * @param {string} noIndex Tag to index or not the page.
 * @returns {ReactElement}
 */
const MetaTags = ({ meta, appUrl, locale, showHreflang = true, noIndex }) => {
  const { t } = useTranslation();
  const mergedMeta = mergeWith(
    meta,
    { ...defaultMeta, metaTitle: t('spotifyAdvertising') },
    metaResolver,
  );
  const fullURL = `https://ads.spotify.com${appUrl.pathName}`;
  const fullImageURL = isExternalLink(mergedMeta.image.url)
    ? mergedMeta.image.optimizedUrl
    : `${appUrl.hostName}${mergedMeta.image.url}`;
  const hreflangs = get(mergedMeta, 'hreflangsCollection.items', []);
  const hasHreflangs = !!hreflangs.length;

  return (
    <Head>
      <title>{mergedMeta.metaTitle}</title>
      <meta name="description" content={mergedMeta.metaDescription} />
      <meta name="keywords" content={mergedMeta.keywords} />
      {noIndex && <meta name="robots" content="noindex" />}

      {/* OG */}
      <meta property="og:title" content={mergedMeta.metaTitle} />
      <meta property="og:description" content={mergedMeta.metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullURL} />
      <meta property="og:image" content={fullImageURL} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={mergedMeta.metaTitle} />
      <meta name="twitter:description" content={mergedMeta.metaDescription} />
      <meta name="twitter:image" content={fullImageURL} />
      <meta name="twitter:site" content={mergedMeta.twitterSite} />

      {/* Hreflang */}
      {showHreflang && (
        <>
          {hasHreflangs && (
            <link rel="alternate" hrefLang={locale} href={fullURL} />
          )}
          {hreflangs.map(({ url, localeId }) => (
            <link
              key={kebabCase(`${url} ${localeId}`)}
              rel="alternate"
              hrefLang={localeId}
              href={url}
            />
          ))}
          <link rel="canonical" href={mergedMeta.canonicalUrl || fullURL} />
        </>
      )}
    </Head>
  );
};

MetaTags.propTypes = {
  /**
   * Meta tags object
   */
  meta: PropTypes.shape({
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
    keywords: PropTypes.string,
    canonicalUrl: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string,
      webpUrl: PropTypes.string,
      optimizedUrl: PropTypes.string,
    }),
  }).isRequired,
  /**
   * The URL object
   */
  appUrl: PropTypes.shape({
    hostName: PropTypes.string.isRequired,
    pathName: PropTypes.string.isRequired,
  }).isRequired,
  /**
   * Current page locale.
   */
  locale: PropTypes.string.isRequired,
  /**
   * Flag to show the hreflang tags.
   */
  showHreflang: PropTypes.bool,
};

export default MetaTags;
