import PAGE_HOME_QUERY from 'queries/page-home';
import PAGE_LANDING_QUERY from 'queries/page-landing';
import PAGE_DETAIL_QUERY from 'queries/page-detail';
import PAGE_DYNAMIC_LANDING from 'queries/page-dynamic-landing';
import { QUERY_TYPES, DYNAMIC_COLLECTION_KEY } from 'constants/query';

export const DYNAMIC_COLLECTIONS = {
  [QUERY_TYPES.PAGE_HOME_QUERY]: `pageHome${DYNAMIC_COLLECTION_KEY}Collection`,
  [QUERY_TYPES.PAGE_LANDING_QUERY]: `pageLanding${DYNAMIC_COLLECTION_KEY}Collection`,
  [QUERY_TYPES.PAGE_DETAIL_QUERY]: `pageDetail${DYNAMIC_COLLECTION_KEY}Collection`,
  [QUERY_TYPES.PAGE_DYNAMIC_LANDING]: `pageDynamicLanding${DYNAMIC_COLLECTION_KEY}Collection`,
};

/**
 * Each query takes two arguments:
 * @param {string} collectionName A collection name (eg. PageLandingFrFr)
 * @param {string} locale A field-formatted locale name (eg. FrFr)
 */
export const QUERIES = {
  [QUERY_TYPES.PAGE_HOME_QUERY]: PAGE_HOME_QUERY,
  [QUERY_TYPES.PAGE_LANDING_QUERY]: PAGE_LANDING_QUERY,
  [QUERY_TYPES.PAGE_DETAIL_QUERY]: PAGE_DETAIL_QUERY,
  [QUERY_TYPES.PAGE_DYNAMIC_LANDING]: PAGE_DYNAMIC_LANDING,
};
