import * as Sentry from '@sentry/react';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as Actions from './actions';

import { fetchCampaign } from 'api/campaigns';
import * as Api from 'api/creatives';
import { fetchFlights } from 'api/flights';

import * as Types from './types';
import { GetCampaignResponse } from 'types/common/state/api/campaign';
import {
  BulkGetCreativesResponse,
  CreativesApiResponse,
  CreativesQueryParams,
} from 'types/common/state/api/creatives';
import { FlightsApiResponse } from 'types/common/state/api/flights';

const TOTAL_EXCEEDS_100_ERROR =
  'The total number of creatives on this flight is greater than 100 and we cannot handle that in a single request.  In practicality we did not expect this to happen very often.  Notify operators for help with this issue.';

export function* fetchCreatives(action: Types.FetchCreativesStartAction) {
  try {
    const creatives = yield call(
      Api.fetchCreatives,
      action.payload.queryParams,
    );
    yield put(
      Actions.getCreativesSuccess(creatives, action.payload.paginationType),
    );
  } catch (e) {
    yield put(Actions.getCreativesFailed(e));
  }
}

export function* fetchAllCreatives(action: Types.FetchAllCreativesStartAction) {
  try {
    const creatives: CreativesApiResponse = yield call(
      Api.fetchCreatives,
      action.payload,
    );
    if (creatives.paging.total! > 100) {
      Sentry.captureException(TOTAL_EXCEEDS_100_ERROR);
      throw new Error(TOTAL_EXCEEDS_100_ERROR);
    }
    yield put(Actions.getAllCreativesSuccess(creatives));
  } catch (e) {
    yield put(Actions.getAllCreativesFailed(e));
  }
}

export function* fetchBulkCreatives(
  action: Types.FetchBulkCreativesStartAction,
) {
  try {
    const creatives: BulkGetCreativesResponse = yield call(
      Api.fetchBulkCreatives,
      action.payload,
    );
    yield put(Actions.getBulkCreativesSuccess(creatives));
  } catch (e) {
    yield put(Actions.getBulkCreativesFailed(e));
  }
}

export function* fetchCreative(action: Types.FetchCreativeStartAction) {
  try {
    const creative = yield call(
      Api.fetchCreative,
      action.payload.adAccountId,
      action.payload.creativeId,
    );
    yield put(Actions.getCreativeSuccess(creative));
  } catch (e) {
    yield put(Actions.getCreativeFailed(e));
  }
}

export function* fetchCreativeStats(
  action: Types.FetchCreativeStatsStartAction,
) {
  try {
    const payload: CreativesQueryParams = {
      adAccountId: action.payload.adAccountId,
      searchWord: action.payload.creativeId,
      limit: '1',
      offset: '0',
    };
    const creatives = yield call(Api.fetchCreatives, payload);
    yield put(Actions.getCreativeStatsSuccess(creatives));
  } catch (e) {
    yield put(Actions.getCreativeStatsFailed(e));
  }
}

export function* buildCreativeBreadcrumb(
  action: Types.BuildCreativeBreadcrumbStartAction,
) {
  try {
    const flights: FlightsApiResponse = yield call(fetchFlights, {
      adAccountId: action.payload.adAccountId,
      creativeId: action.payload.creativeId,
      limit: '1',
      offset: '0',
    });
    const flight = flights.items[0];

    if (flight) {
      const campaign: GetCampaignResponse = yield call(
        fetchCampaign,
        flight.campaignId,
        action.payload.adAccountId,
      );

      yield put(
        Actions.buildCreativeBreadcrumbSuccess({
          flightId: flight.flightId,
          flightName: flight.name,
          campaignId: campaign.campaignId!,
          campaignName: campaign.name!,
        }),
      );
    } else {
      yield put(
        Actions.buildCreativeBreadcrumbFailed({
          name: 'CreativeBreadcrumbFailure',
          message: 'No associated flight found.',
        }),
      );
    }
  } catch (e) {
    yield put(Actions.buildCreativeBreadcrumbFailed(e));
  }
}

function* watchForGetCreatives() {
  yield takeLatest(Types.FETCH_CREATIVES, fetchCreatives);
}

function* watchForGetAllCreatives() {
  yield takeLatest(Types.FETCH_ALL_CREATIVES, fetchAllCreatives);
}

function* watchForGetBulkCreatives() {
  yield takeLatest(Types.FETCH_BULK_CREATIVES, fetchBulkCreatives);
}

function* watchForGetCreative() {
  yield takeLatest(Types.FETCH_CREATIVE_START, fetchCreative);
}

function* watchForGetCreativeStats() {
  yield takeLatest(Types.FETCH_CREATIVE_STATS_START, fetchCreativeStats);
}

function* watchForBuildCreativeBreadcrumb() {
  yield takeLatest(
    Types.BUILD_CREATIVE_BREADCRUMB_START,
    buildCreativeBreadcrumb,
  );
}

export default function* getCreativesSaga() {
  yield all([
    watchForGetCreatives(),
    watchForGetAllCreatives(),
    watchForGetBulkCreatives(),
    watchForGetCreative(),
    watchForGetCreativeStats(),
    watchForBuildCreativeBreadcrumb(),
  ]);
}
