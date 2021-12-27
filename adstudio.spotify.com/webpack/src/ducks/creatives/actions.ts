import {
  BUILD_CREATIVE_BREADCRUMB_FAILED,
  BUILD_CREATIVE_BREADCRUMB_START,
  BUILD_CREATIVE_BREADCRUMB_SUCCEEDED,
  BuildCreativeBreadcrumbErrorAction,
  BuildCreativeBreadcrumbStartAction,
  BuildCreativeBreadcrumbSuccessAction,
  FETCH_ALL_CREATIVES,
  FETCH_ALL_CREATIVES_FAILED,
  FETCH_ALL_CREATIVES_SUCCEEDED,
  FETCH_BULK_CREATIVES,
  FETCH_BULK_CREATIVES_FAILED,
  FETCH_BULK_CREATIVES_SUCCEEDED,
  FETCH_CREATIVE_FAILED,
  FETCH_CREATIVE_START,
  FETCH_CREATIVE_STATS_FAILED,
  FETCH_CREATIVE_STATS_START,
  FETCH_CREATIVE_STATS_SUCCEEDED,
  FETCH_CREATIVE_SUCCEEDED,
  FETCH_CREATIVES,
  FETCH_CREATIVES_FAILED,
  FETCH_CREATIVES_SUCCEEDED,
  FetchAllCreativesErrorAction,
  FetchAllCreativesStartAction,
  FetchAllCreativesSuccessAction,
  FetchBulkCreativesErrorAction,
  FetchBulkCreativesStartAction,
  FetchBulkCreativesSuccessAction,
  FetchCreativeErrorAction,
  FetchCreativesErrorAction,
  FetchCreativesStartAction,
  FetchCreativesSuccessAction,
  FetchCreativeStartAction,
  FetchCreativeStatsErrorAction,
  FetchCreativeStatsStartAction,
  FetchCreativeStatsSuccessAction,
  FetchCreativeSuccessAction,
} from './types';
import { PaginationType } from 'types/common/pagination';
import {
  CreativeBreadcrumb,
  GetCreativeResponse,
} from 'types/common/state/api/creative';
import {
  BulkGetCreativesRequestParams,
  BulkGetCreativesResponse,
  CreativesApiResponse,
  CreativesQueryParams,
} from 'types/common/state/api/creatives';

export const getCreatives = (
  queryParams: CreativesQueryParams,
  paginationType: PaginationType,
): FetchCreativesStartAction => ({
  type: FETCH_CREATIVES,
  payload: { queryParams, paginationType },
});

export const getCreativesSuccess = (
  response: CreativesApiResponse,
  paginationType: PaginationType,
): FetchCreativesSuccessAction => ({
  type: FETCH_CREATIVES_SUCCEEDED,
  payload: { response, paginationType },
});

export const getCreativesFailed = (
  payload: Error | Response,
): FetchCreativesErrorAction => ({
  type: FETCH_CREATIVES_FAILED,
  payload,
});

export const getAllCreatives = (payload: {
  adAccountId: string;
  flightId: string;
}): FetchAllCreativesStartAction => ({
  type: FETCH_ALL_CREATIVES,
  payload: {
    ...payload,
    searchWord: '',
    limit: '100', // NOTE: This is the limit we can use without getting a server error.
    offset: '0',
  },
});

export const getAllCreativesSuccess = (
  payload: CreativesApiResponse,
): FetchAllCreativesSuccessAction => ({
  type: FETCH_ALL_CREATIVES_SUCCEEDED,
  payload,
});

export const getAllCreativesFailed = (
  payload: Error | Response,
): FetchAllCreativesErrorAction => ({
  type: FETCH_ALL_CREATIVES_FAILED,
  payload,
});

export const getCreative = (payload: {
  adAccountId: string;
  creativeId: string;
}): FetchCreativeStartAction => ({
  type: FETCH_CREATIVE_START,
  payload,
});

export const getCreativeSuccess = (
  payload: GetCreativeResponse,
): FetchCreativeSuccessAction => ({
  type: FETCH_CREATIVE_SUCCEEDED,
  payload,
});

export const getCreativeFailed = (error: Error): FetchCreativeErrorAction => ({
  type: FETCH_CREATIVE_FAILED,
  payload: error,
  error,
});

export const getCreativeStats = (payload: {
  adAccountId: string;
  creativeId: string;
}): FetchCreativeStatsStartAction => ({
  type: FETCH_CREATIVE_STATS_START,
  payload,
});

export const getCreativeStatsSuccess = (
  payload: CreativesApiResponse,
): FetchCreativeStatsSuccessAction => ({
  type: FETCH_CREATIVE_STATS_SUCCEEDED,
  payload,
});

export const getCreativeStatsFailed = (
  payload: Error,
): FetchCreativeStatsErrorAction => ({
  type: FETCH_CREATIVE_STATS_FAILED,
  payload,
  error: payload,
});

export const buildCreativeBreadcrumb = (payload: {
  adAccountId: string;
  creativeId: string;
}): BuildCreativeBreadcrumbStartAction => ({
  type: BUILD_CREATIVE_BREADCRUMB_START,
  payload,
});

export const buildCreativeBreadcrumbSuccess = (
  payload: CreativeBreadcrumb,
): BuildCreativeBreadcrumbSuccessAction => ({
  type: BUILD_CREATIVE_BREADCRUMB_SUCCEEDED,
  payload,
});

export const buildCreativeBreadcrumbFailed = (
  payload: Error,
): BuildCreativeBreadcrumbErrorAction => ({
  type: BUILD_CREATIVE_BREADCRUMB_FAILED,
  payload,
  error: payload,
});

export const getBulkCreatives = (
  payload: BulkGetCreativesRequestParams,
): FetchBulkCreativesStartAction => ({
  type: FETCH_BULK_CREATIVES,
  payload,
});

export const getBulkCreativesSuccess = (
  payload: BulkGetCreativesResponse,
): FetchBulkCreativesSuccessAction => ({
  type: FETCH_BULK_CREATIVES_SUCCEEDED,
  payload,
});

export const getBulkCreativesFailed = (
  error: Error,
): FetchBulkCreativesErrorAction => ({
  type: FETCH_BULK_CREATIVES_FAILED,
  error,
});
