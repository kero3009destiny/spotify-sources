import { TableState } from '@spotify-internal/adstudio-shared/lib/components/TSTableBrowser/types';

import {
  BulkCreativesState,
  CreativeDetailsState,
  CreativesCatalogueState,
  CreativesState,
  CreativeStatsState,
} from './reducer';

import {
  CreativeBreadcrumb,
  CreativeDetails,
} from 'types/common/state/api/creative';

export const getCreativesState = (state: TSFixMe): CreativesState => {
  return state.creatives;
};

export const getCreativesForRotationTables = (
  state: TSFixMe,
): CreativesCatalogueState => {
  const creatives = getCreativesState(state).allCreatives;
  creatives.items = creatives.items.filter(creative => creative.flightLink);
  return creatives;
};

export const getCreativesTableState = (state: TSFixMe): TableState => {
  const { creativesCatalogue } = getCreativesState(state);

  return {
    rows: creativesCatalogue.items,
    loading: creativesCatalogue.loading,
    empty: creativesCatalogue.items.length === 0 && !creativesCatalogue.loading,
    paging: creativesCatalogue.paging,
  };
};

export const canLoadNextPage = (state: TSFixMe) => {
  const { rows, paging } = getCreativesTableState(state);
  return rows.length > 0 && !!paging.total && rows.length < paging.total;
};

export const getCreativeDetails = (state: TSFixMe): CreativeDetailsState => {
  return getCreativesState(state).creative;
};

export const getFetchingCreative = (state: TSFixMe): boolean => {
  return getCreativesState(state).fetchingCreative;
};

export const getFetchCreativeSuccess = (state: TSFixMe): boolean => {
  return getCreativesState(state).fetchCreativeSuccess;
};

export const getFetchCreativeError = (state: TSFixMe): boolean | string => {
  return getCreativesState(state).fetchCreativeError;
};

export const getCreativeStats = (state: TSFixMe): CreativeStatsState => {
  return getCreativesState(state).creativeStats;
};

export const getFetchingCreativeStats = (state: TSFixMe): boolean => {
  return getCreativesState(state).fetchingCreativeStats;
};

export const getFetchCreativeStatsSuccess = (state: TSFixMe): boolean => {
  return getCreativesState(state).fetchCreativeStatsSuccess;
};

export const getFetchCreativeStatsError = (
  state: TSFixMe,
): boolean | string => {
  return getCreativesState(state).fetchCreativeStatsError;
};

export const getBuildCreativeBreadcrumbSuccess = (state: TSFixMe): boolean => {
  return getCreativesState(state).buildCreativeBreadcrumbSuccess;
};

export const getCreativeBreadcrumb = (state: TSFixMe): CreativeBreadcrumb => {
  return getCreativesState(state).creativeBreadcrumb;
};

export const getCreativeCatalogueServerError = (state: TSFixMe): boolean => {
  const { creativesCatalogue } = getCreativesState(state);

  if (
    creativesCatalogue.error &&
    (creativesCatalogue.error as Response).status &&
    (creativesCatalogue.error as Response).status !== 404
  ) {
    return true;
  }

  return false;
};

export const getBulkCreativesState = (state: TSFixMe): BulkCreativesState => {
  return getCreativesState(state).bulkCreatives;
};

export const getBulkCreatives = (state: TSFixMe): CreativeDetails[] => {
  return getBulkCreativesState(state).items;
};
