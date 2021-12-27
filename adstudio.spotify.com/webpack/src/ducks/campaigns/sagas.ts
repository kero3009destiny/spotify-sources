import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  getCampaignFailed,
  getCampaignsFailed,
  getCampaignsSuccess,
  getCampaignSuccess,
} from './actions';

import { fetchArtist } from 'api/artist';
import {
  fetchCampaign as fetchCampaignApi,
  fetchCampaigns as fetchCampaignsApi,
} from 'api/campaigns';

import {
  FETCH_CAMPAIGN_START,
  FETCH_CAMPAIGNS,
  FetchCampaignsStartAction,
  FetchCampaignStartAction,
} from './types';
import { GetCampaignResponse } from 'types/common/state/api/campaign';

export function* fetchCampaigns(action: FetchCampaignsStartAction) {
  try {
    const flights = yield call(fetchCampaignsApi, action.payload);
    yield put(getCampaignsSuccess(flights));
  } catch (e) {
    yield put(getCampaignsFailed(e));
  }
}

export function* fetchCampaign(action: FetchCampaignStartAction) {
  try {
    let artistInfo: Pick<SpotifyApi.Artist, 'name'> | undefined;
    const campaign: GetCampaignResponse = yield call(
      fetchCampaignApi,
      action.payload.campaignId,
      action.payload.adAccountId,
    );

    if (campaign.artistId) {
      artistInfo = yield call(fetchArtist, campaign.artistId);
    }

    yield put(getCampaignSuccess({ campaign, artistInfo }));
  } catch (e) {
    yield put(getCampaignFailed(e));
  }
}

function* watchForGetCampaigns() {
  yield takeLatest(FETCH_CAMPAIGNS, fetchCampaigns);
}

function* watchForGetCampaign() {
  yield takeLatest(FETCH_CAMPAIGN_START, fetchCampaign);
}

export default function* getCampaignsSaga() {
  yield all([watchForGetCampaigns(), watchForGetCampaign()]);
}
