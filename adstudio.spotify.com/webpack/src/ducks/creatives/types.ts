import { Action } from 'redux';

import {
  EditFlightLinksSuccessAction,
  PauseResumeFlightLinkErrorAction,
  PauseResumeFlightLinkStartAction,
  PauseResumeFlightLinkSuccessAction,
} from '../flightlinks/types';
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

export const FETCH_CREATIVES = 'FETCH_CREATIVES';
export const FETCH_CREATIVES_SUCCEEDED = 'FETCH_CREATIVES_SUCCEEDED';
export const FETCH_CREATIVES_FAILED = 'FETCH_CREATIVES_FAILED';

export const FETCH_ALL_CREATIVES = 'FETCH_ALL_CREATIVES';
export const FETCH_ALL_CREATIVES_SUCCEEDED = 'FETCH_ALL_CREATIVES_SUCCEEDED';
export const FETCH_ALL_CREATIVES_FAILED = 'FETCH_ALL_CREATIVES_FAILED';

export const FETCH_BULK_CREATIVES = 'FETCH_BULK_CREATIVES';
export const FETCH_BULK_CREATIVES_SUCCEEDED = 'FETCH_BULK_CREATIVES_SUCCEEDED';
export const FETCH_BULK_CREATIVES_FAILED = 'FETCH_BULK_CREATIVES_FAILED';

export const FETCH_CREATIVE_START = 'FETCH_CREATIVE_START';
export const FETCH_CREATIVE_SUCCEEDED = 'FETCH_CREATIVE_SUCCEEDED';
export const FETCH_CREATIVE_FAILED = 'FETCH_CREATIVE_FAILED';

export const FETCH_CREATIVE_STATS_START = 'FETCH_CREATIVE_STATS_START';
export const FETCH_CREATIVE_STATS_SUCCEEDED = 'FETCH_CREATIVE_STATS_SUCCEEDED';
export const FETCH_CREATIVE_STATS_FAILED = 'FETCH_CREATIVE_STATS_FAILED';

export const BUILD_CREATIVE_BREADCRUMB_START =
  'BUILD_CREATIVE_BREADCRUMB_START';
export const BUILD_CREATIVE_BREADCRUMB_SUCCEEDED =
  'BUILD_CREATIVE_BREADCRUMB_SUCCEEDED';
export const BUILD_CREATIVE_BREADCRUMB_FAILED =
  'BUILD_CREATIVE_BREADCRUMB_FAILED';

export interface FetchCreativesStartAction {
  type: typeof FETCH_CREATIVES;
  payload: {
    queryParams: CreativesQueryParams;
    paginationType: PaginationType;
  };
}

export interface FetchCreativesSuccessAction {
  type: typeof FETCH_CREATIVES_SUCCEEDED;
  payload: {
    response: CreativesApiResponse;
    paginationType: PaginationType;
  };
}

export interface FetchCreativesErrorAction {
  type: typeof FETCH_CREATIVES_FAILED;
  payload: Error | Response;
}

export interface FetchAllCreativesStartAction {
  type: typeof FETCH_ALL_CREATIVES;
  payload: CreativesQueryParams;
}

export interface FetchAllCreativesSuccessAction {
  type: typeof FETCH_ALL_CREATIVES_SUCCEEDED;
  payload: CreativesApiResponse;
}

export interface FetchAllCreativesErrorAction {
  type: typeof FETCH_ALL_CREATIVES_FAILED;
  payload: Error | Response;
}

export interface FetchBulkCreativesStartAction {
  type: typeof FETCH_BULK_CREATIVES;
  payload: BulkGetCreativesRequestParams;
}

export interface FetchBulkCreativesSuccessAction {
  type: typeof FETCH_BULK_CREATIVES_SUCCEEDED;
  payload: BulkGetCreativesResponse;
}

export interface FetchBulkCreativesErrorAction {
  type: typeof FETCH_BULK_CREATIVES_FAILED;
  error: Error;
}

export interface FetchCreativeStartAction extends Action {
  type: typeof FETCH_CREATIVE_START;
  payload: {
    creativeId: string;
    adAccountId: string;
  };
}

export interface FetchCreativeSuccessAction extends Action {
  type: typeof FETCH_CREATIVE_SUCCEEDED;
  payload: GetCreativeResponse;
}

export interface FetchCreativeErrorAction extends Action {
  type: typeof FETCH_CREATIVE_FAILED;
  payload: Error;
  error: Error;
}

export interface FetchCreativeStatsStartAction extends Action {
  type: typeof FETCH_CREATIVE_STATS_START;
  payload: {
    creativeId: string;
    adAccountId: string;
  };
}

export interface FetchCreativeStatsSuccessAction extends Action {
  type: typeof FETCH_CREATIVE_STATS_SUCCEEDED;
  payload: CreativesApiResponse;
}

export interface FetchCreativeStatsErrorAction extends Action {
  type: typeof FETCH_CREATIVE_STATS_FAILED;
  payload: Error;
  error: Error;
}

export interface BuildCreativeBreadcrumbStartAction extends Action {
  type: typeof BUILD_CREATIVE_BREADCRUMB_START;
  payload: {
    creativeId: string;
    adAccountId: string;
  };
}

export interface BuildCreativeBreadcrumbSuccessAction extends Action {
  type: typeof BUILD_CREATIVE_BREADCRUMB_SUCCEEDED;
  payload: CreativeBreadcrumb;
}

export interface BuildCreativeBreadcrumbErrorAction extends Action {
  type: typeof BUILD_CREATIVE_BREADCRUMB_FAILED;
  payload: Error;
  error: Error;
}

export type FetchCreativeAction =
  | FetchCreativeStartAction
  | FetchCreativeSuccessAction
  | FetchCreativeErrorAction;

export type FetchCreativesAction =
  | PauseResumeFlightLinkStartAction
  | PauseResumeFlightLinkSuccessAction
  | PauseResumeFlightLinkErrorAction
  | FetchCreativesStartAction
  | FetchCreativesSuccessAction
  | FetchCreativesErrorAction;

export type FetchAllCreativesAction =
  | FetchAllCreativesStartAction
  | FetchAllCreativesSuccessAction
  | FetchAllCreativesErrorAction
  | EditFlightLinksSuccessAction;

export type FetchCreativeStatsAction =
  | FetchCreativeStatsStartAction
  | FetchCreativeStatsSuccessAction
  | FetchCreativeStatsErrorAction;

export type BuildCreativeBreadcrumbAction =
  | BuildCreativeBreadcrumbStartAction
  | BuildCreativeBreadcrumbSuccessAction
  | BuildCreativeBreadcrumbErrorAction;

export type FetchBulkCreativesAction =
  | FetchBulkCreativesStartAction
  | FetchBulkCreativesSuccessAction
  | FetchBulkCreativesErrorAction;
