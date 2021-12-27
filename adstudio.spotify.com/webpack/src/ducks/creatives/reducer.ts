import keyBy from 'lodash/keyBy';
import { combineReducers, Reducer } from 'redux';

import { createAsyncReducers } from 'utils/asyncDucksHelpers';
import { mapPaginationResponse } from 'utils/campaignHierarchy/paginationHelpers';
import {
  bulkMapI18nCtaToTargetedLocales,
  mapI18nCtaToTargetedLocales,
} from 'utils/localizedCtaUtils/localizedCtaMapper';

import {
  EDIT_FLIGHT_LINKS_SUCCEEDED,
  EditFlightLinksSuccessAction,
  FlightLinkParameters,
  PAUSE_RESUME_FLIGHT_LINK_FAILED,
  PAUSE_RESUME_FLIGHT_LINK_START,
} from '../flightlinks/types';
import {
  BUILD_CREATIVE_BREADCRUMB_FAILED,
  BUILD_CREATIVE_BREADCRUMB_START,
  BUILD_CREATIVE_BREADCRUMB_SUCCEEDED,
  BuildCreativeBreadcrumbAction,
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
  FetchAllCreativesAction,
  FetchBulkCreativesAction,
  FetchCreativeAction,
  FetchCreativeErrorAction,
  FetchCreativesAction,
  FetchCreativeStartAction,
  FetchCreativeStatsAction,
  FetchCreativeStatsErrorAction,
  FetchCreativeStatsStartAction,
  FetchCreativeStatsSuccessAction,
  FetchCreativeSuccessAction,
} from './types';
import { PaginationType } from 'types/common/pagination';
import { Paging } from 'types/common/state/api';
import { Objective } from 'types/common/state/api/campaign';
import {
  CreativeBreadcrumb,
  CreativeDetails,
} from 'types/common/state/api/creative';
import {
  CreativesCatalogueEntity,
  FlightLinkState,
} from 'types/common/state/api/creatives';
import { FlightLinkPauseResumeAction } from 'types/common/state/api/flightLink';
import { emptyStats, Stats } from 'types/common/state/api/flush';

export interface CreativesCatalogueState {
  items: CreativesCatalogueEntity[];
  loading: boolean;
  paging: Paging;
  error?: Response | Error; // should be Response unless an Error was unintentionally thrown from saga
}

export interface CreativeDetailsState extends CreativeDetails {}

export interface CreativeStatsState extends Stats {
  isActiveAudio?: boolean;
}

export interface BulkCreativesState {
  items: CreativeDetails[];
  fetchingBulkCreatives: boolean;
  fetchBulkCreativesSuccess: boolean;
  fetchBulkCreativesError?: Error;
}

export interface CreativesState {
  creativesCatalogue: CreativesCatalogueState;
  allCreatives: CreativesCatalogueState;
  creative: CreativeDetailsState;
  bulkCreatives: BulkCreativesState;
  fetchingCreative: boolean;
  fetchCreativeSuccess: boolean;
  fetchCreativeError: string | boolean;

  creativeStats: CreativeStatsState;
  fetchingCreativeStats: boolean;
  fetchCreativeStatsSuccess: boolean;
  fetchCreativeStatsError: string | boolean;

  creativeBreadcrumb: CreativeBreadcrumb;
  buildingCreativeBreadcrumb: boolean;
  buildCreativeBreadcrumbSuccess: boolean;
  buildCreativeBreadcrumbError: boolean;
}

export const creativesDefaultState: CreativesCatalogueState = {
  items: [],
  loading: false,
  paging: {
    limit: 20,
    offset: 0,
    total: 0,
  },
};

export const bulkCreativesDefaultState: BulkCreativesState = {
  items: [],
  fetchingBulkCreatives: false,
  fetchBulkCreativesSuccess: false,
  fetchBulkCreativesError: undefined,
};

export const creativesReducer = (
  state = creativesDefaultState,
  action: FetchCreativesAction,
) => {
  let updatedItems: CreativesCatalogueEntity[];
  switch (action.type) {
    case PAUSE_RESUME_FLIGHT_LINK_START:
      updatedItems = state.items.map(item => {
        if (item.creativeId === action.payload.creativeId) {
          item.flightLinkStatus =
            action.payload.action === FlightLinkPauseResumeAction.RESUME
              ? FlightLinkState.ACTIVE
              : FlightLinkState.PAUSED;
        }
        return item;
      });
      return {
        ...state,
        items: [...updatedItems],
      };
    case PAUSE_RESUME_FLIGHT_LINK_FAILED:
      updatedItems = state.items.map(item => {
        if (item.creativeId === action.meta.creativeId) {
          item.flightLinkStatus =
            action.meta.action === FlightLinkPauseResumeAction.RESUME
              ? FlightLinkState.PAUSED
              : FlightLinkState.ACTIVE;
        }
        return item;
      });
      return {
        ...state,
        items: [...updatedItems],
      };
    case FETCH_CREATIVES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_CREATIVES:
      return {
        ...state,
        loading: true,
      };

    case FETCH_CREATIVES_SUCCEEDED:
      return {
        ...state,
        loading: false,
        items:
          action.payload.paginationType === PaginationType.INFINITE_SCROLL
            ? bulkMapI18nCtaToTargetedLocales([
                ...state.items,
                ...action.payload.response.items,
              ])
            : bulkMapI18nCtaToTargetedLocales(action.payload.response.items),
        paging: mapPaginationResponse(action.payload.response.paging),
      };

    default:
      return state;
  }
};

export const allCreativesReducer = (
  state = creativesDefaultState,
  action: FetchAllCreativesAction,
) => {
  let updatedItems: CreativesCatalogueEntity[];
  let flightLinksMap: Record<string, FlightLinkParameters>;
  switch (action.type) {
    case FETCH_ALL_CREATIVES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_ALL_CREATIVES:
      return {
        ...state,
        loading: true,
      };

    case FETCH_ALL_CREATIVES_SUCCEEDED:
      return {
        ...state,
        loading: false,
        items: action.payload.items,
        paging: mapPaginationResponse(action.payload.paging),
      };

    case EDIT_FLIGHT_LINKS_SUCCEEDED:
      flightLinksMap = keyBy(
        (action as EditFlightLinksSuccessAction).payload.flightLinks,
        flightLink => {
          return flightLink.flightLinkId;
        },
      );
      updatedItems = state.items.map(item => {
        const flightLinkId = item.flightLink!.id || '';
        return {
          ...item,
          flightLink: {
            ...item.flightLink,
            creativeRotationParameters:
              flightLinksMap[flightLinkId].creativeRotationParameters,
          },
        };
      });
      return {
        ...state,
        items: updatedItems,
      };

    default:
      return state;
  }
};

const creativeDefaultState: CreativeDetailsState = {};

const creativeReducer = (
  state: CreativeDetailsState = creativeDefaultState,
  action: FetchCreativeAction,
): CreativeDetailsState => {
  let castAction;
  let mappedCreative;
  switch (action.type) {
    case FETCH_CREATIVE_START:
    case FETCH_CREATIVE_FAILED:
      return creativeDefaultState;
    case FETCH_CREATIVE_SUCCEEDED:
      castAction = action as FetchCreativeSuccessAction;
      mappedCreative = mapI18nCtaToTargetedLocales(
        castAction.payload as CreativeDetails,
      );

      return {
        creativeId: mappedCreative.creativeId!,
        adAccountId: mappedCreative.adAccountId!,
        name: mappedCreative.name!,
        creativeState: mappedCreative.creativeState!,
        spotifyPreviewUri: mappedCreative.spotifyPreviewUri!,
        clickthroughUrl: mappedCreative.clickthroughUrl!,
        brandName: mappedCreative.brandName!,
        tagLine: mappedCreative.tagLine!,
        audio: mappedCreative.audio,
        bg: mappedCreative.bg,
        image: mappedCreative.image,
        voiceover: mappedCreative.voiceover,
        ctaText: mappedCreative.ctaText!,
        artistId: mappedCreative.artistId!,
        creativesAreStillProcessing: mappedCreative.creativesAreStillProcessing!,
        format: mappedCreative.format,
        objective: mappedCreative.objective as Objective,
        video: mappedCreative.video,
        isAdgen: mappedCreative.isAdgen!,
        targetedLocale: mappedCreative.targetedLocale!,
        moatEnabled: mappedCreative.moatEnabled,
        iasPixel: mappedCreative.iasPixel,
        trackingPixel: mappedCreative.trackingPixel,
      };
    default:
      return state;
  }
};

export const bulkCreativesReducer = (
  state: BulkCreativesState = bulkCreativesDefaultState,
  action: FetchBulkCreativesAction,
): BulkCreativesState => {
  switch (action.type) {
    case FETCH_BULK_CREATIVES:
      return {
        ...state,
        fetchingBulkCreatives: true,
        fetchBulkCreativesSuccess: false,
        fetchBulkCreativesError: undefined,
      };

    case FETCH_BULK_CREATIVES_SUCCEEDED:
      return {
        ...state,
        items: bulkMapI18nCtaToTargetedLocales(action.payload.creatives),
        fetchingBulkCreatives: false,
        fetchBulkCreativesSuccess: true,
        fetchBulkCreativesError: undefined,
      };

    case FETCH_BULK_CREATIVES_FAILED:
      return {
        ...state,
        fetchingBulkCreatives: false,
        fetchBulkCreativesSuccess: false,
        fetchBulkCreativesError: action.error,
      };

    default:
      return state;
  }
};

const fetchingCreative = 'fetchingCreative';
const fetchCreativeSuccess = 'fetchCreativeSuccess';
const fetchCreativeError = 'fetchCreativeError';

const creativeReducers = createAsyncReducers<
  FetchCreativeStartAction,
  FetchCreativeSuccessAction,
  FetchCreativeErrorAction
>(
  fetchingCreative,
  FETCH_CREATIVE_START,
  fetchCreativeSuccess,
  FETCH_CREATIVE_SUCCEEDED,
  fetchCreativeError,
  FETCH_CREATIVE_FAILED,
);

const creativeStatsDefaultState: CreativeStatsState = {};

const creativeStatsReducer = (
  state: CreativeStatsState = creativeStatsDefaultState,
  action: FetchCreativeStatsAction,
): CreativeStatsState => {
  let castAction;
  let creative: CreativesCatalogueEntity;
  let stats: Stats;
  switch (action.type) {
    case FETCH_CREATIVE_STATS_START:
    case FETCH_CREATIVE_STATS_FAILED:
      return creativeStatsDefaultState;
    case FETCH_CREATIVE_STATS_SUCCEEDED:
      castAction = action as FetchCreativeStatsSuccessAction;
      creative = castAction.payload.items[0];
      stats = creative ? creative.stats : emptyStats;
      return {
        adsServed: stats.adsServed,
        reach: stats.reach,
        frequency: stats.frequency,
        paidListens: stats.paidListens,
        reachPaidListens: stats.reachPaidListens,
        frequencyPaidListens: stats.frequencyPaidListens,
        clicks: stats.clicks,
        ctr: stats.ctr,
        completionRate: stats.completionRate,
        budgetConsumed: stats.budgetConsumed,
        listeners: stats.listeners,
        newListeners: stats.newListeners,
        intentRate: stats.intentRate,
        listenerConversionRate: stats.listenerConversionRate,
        newListenerConversionRate: stats.newListenerConversionRate,
        averageStreamsPerListener: stats.averageStreamsPerListener,
        averageStreamsPerNewListener: stats.averageStreamsPerNewListener,
        streams: stats.streams,
        newListenerStreams: stats.newListenerStreams,
        // not really a stat but this will be removed once Ad Serving creates a new ACR property
        // so we won't need to distinguish based on cost model
        isActiveAudio: creative?.isActiveAudio,
        externalImpressions: stats.externalImpressions,
      };
    default:
      return state;
  }
};

const fetchingCreativeStats = 'fetchingCreativeStats';
const fetchCreativeStatsSuccess = 'fetchCreativeStatsSuccess';
const fetchCreativeStatsError = 'fetchCreativeStatsError';

const creativeStatsReducers = createAsyncReducers<
  FetchCreativeStatsStartAction,
  FetchCreativeStatsSuccessAction,
  FetchCreativeStatsErrorAction
>(
  fetchingCreativeStats,
  FETCH_CREATIVE_STATS_START,
  fetchCreativeStatsSuccess,
  FETCH_CREATIVE_STATS_SUCCEEDED,
  fetchCreativeStatsError,
  FETCH_CREATIVE_STATS_FAILED,
);

const defaultCreativeBreadcrumbState: CreativeBreadcrumb = {
  flightName: '',
  flightId: '',
  campaignName: '',
  campaignId: '',
};

const creativeBreadcrumbReducer = (
  state: CreativeBreadcrumb = defaultCreativeBreadcrumbState,
  action: BuildCreativeBreadcrumbAction,
) => {
  switch (action.type) {
    case BUILD_CREATIVE_BREADCRUMB_START:
    case BUILD_CREATIVE_BREADCRUMB_FAILED:
      return defaultCreativeBreadcrumbState;
    case BUILD_CREATIVE_BREADCRUMB_SUCCEEDED:
      return action.payload;
    default:
      return state;
  }
};

const buildingCreativeBreadcrumb = 'buildingCreativeBreadcrumb';
const buildCreativeBreadcrumbSuccess = 'buildCreativeBreadcrumbSuccess';
const buildCreativeBreadcrumbError = 'buildCreativeBreadcrumbError';

const creativeBreadcrumbReducers = createAsyncReducers<
  BuildCreativeBreadcrumbStartAction,
  BuildCreativeBreadcrumbSuccessAction,
  BuildCreativeBreadcrumbErrorAction
>(
  buildingCreativeBreadcrumb,
  BUILD_CREATIVE_BREADCRUMB_START,
  buildCreativeBreadcrumbSuccess,
  BUILD_CREATIVE_BREADCRUMB_SUCCEEDED,
  buildCreativeBreadcrumbError,
  BUILD_CREATIVE_BREADCRUMB_FAILED,
);

export default combineReducers<CreativesState>({
  creativesCatalogue: creativesReducer,
  allCreatives: allCreativesReducer,
  creative: creativeReducer,
  bulkCreatives: bulkCreativesReducer,
  fetchingCreative: creativeReducers[fetchingCreative] as Reducer<
    boolean,
    FetchCreativeStartAction
  >,
  fetchCreativeSuccess: creativeReducers[fetchCreativeSuccess] as Reducer<
    boolean,
    FetchCreativeSuccessAction
  >,
  fetchCreativeError: creativeReducers[fetchCreativeError] as Reducer<
    string | boolean,
    FetchCreativeErrorAction
  >,

  creativeStats: creativeStatsReducer,
  fetchingCreativeStats: creativeStatsReducers[
    fetchingCreativeStats
  ] as Reducer<boolean, FetchCreativeStatsStartAction>,
  fetchCreativeStatsSuccess: creativeStatsReducers[
    fetchCreativeStatsSuccess
  ] as Reducer<boolean, FetchCreativeStatsSuccessAction>,
  fetchCreativeStatsError: creativeStatsReducers[
    fetchCreativeStatsError
  ] as Reducer<string | boolean, FetchCreativeStatsErrorAction>,

  creativeBreadcrumb: creativeBreadcrumbReducer,
  buildingCreativeBreadcrumb: creativeBreadcrumbReducers[
    buildingCreativeBreadcrumb
  ] as Reducer<boolean, BuildCreativeBreadcrumbStartAction>,
  buildCreativeBreadcrumbSuccess: creativeBreadcrumbReducers[
    buildCreativeBreadcrumbSuccess
  ] as Reducer<boolean, BuildCreativeBreadcrumbSuccessAction>,
  buildCreativeBreadcrumbError: creativeBreadcrumbReducers[
    buildCreativeBreadcrumbError
  ] as Reducer<boolean, BuildCreativeBreadcrumbErrorAction>,
});
