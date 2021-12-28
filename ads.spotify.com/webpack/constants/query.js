import getConfig from 'next/config';

const {
  publicRuntimeConfig: { CONTENTFUL_PREVIEW, CONTENTFUL_ENVIRONMENT },
} = getConfig();
/**
 * A flag to allow Contentful 'Content Preview' URLs to resolve properly,
 * conditionally querying against the navigationTag `sys.id`, as linked
 * entry content can not be referenced:
 * https://www.contentfulcommunity.com/t/content-preview-urls-get-field-value-of-linked-model/2941
 *
 */
export const USE_CONTENT_PREVIEW_FILTER =
  CONTENTFUL_PREVIEW === 'true' && CONTENTFUL_ENVIRONMENT === 'master';

export const QUERY_TYPES = {
  PAGE_HOME_QUERY: 'PAGE_HOME_QUERY',
  PAGE_LANDING_QUERY: 'PAGE_LANDING_QUERY',
  PAGE_DETAIL_QUERY: 'PAGE_DETAIL_QUERY',
  PAGE_DYNAMIC_LANDING: 'PAGE_DYNAMIC_LANDING',
};

export const DEFAULT_LOCALIZED_FIELD = 'EnUs';

export const DYNAMIC_COLLECTION_KEY = '[locale]';
