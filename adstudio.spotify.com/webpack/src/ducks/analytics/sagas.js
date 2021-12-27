import FacebookPixel from 'react-facebook-pixel';
import { event, pageview, set } from 'react-ga';
import { LOCATION_CHANGE } from 'react-router-redux/lib/reducer';
import delay from '@redux-saga/delay-p';
import debug from 'debug';
import { Gtagger } from 'gtagger';
import { all, call, put, select, take, takeEvery } from 'redux-saga/effects';

import { sendMetric } from '@spotify-internal/semantic-metrics';

import * as accountTypes from 'ducks/account/types';
import * as authTypes from 'ducks/auth/types';
import {
  fetchGAPartnerIdFailed,
  fetchQualarooPartnerIdFailed,
  fetchQualtricsPartnerIdFailed,
  setGAPartnerId,
  setQualarooPartnerId,
  setQualtricsPartnerId,
} from 'ducks/analytics/actions';
import {
  getGAPartnerId,
  getQualarooPartnerId,
  getQualtricsPartnerId,
} from './selectors';
import { getAccountCountry, isAccountFetching } from 'ducks/account/selectors';

import { getPartnerId } from 'api/user';

import { getEnvironmentConfig } from 'config/environment';
import { PARTNERS } from 'config/partners';

import * as types from './types';

const log = debug('sagas:analytics');

export function* handleLocationChange({ payload: { pathname } }) {
  yield call(pageview, pathname);
  yield call(FacebookPixel.pageView);
}

export function* handleLogUserAction({ payload: { category, label, params } }) {
  let eventLabel;

  if (params && typeof params === 'string') {
    eventLabel = params;
  } else if (params) {
    eventLabel = JSON.stringify(params);
  }

  yield call(event, {
    category,
    action: label,
    label: eventLabel,
  });
}

export function* handleLogFBAction({
  payload: { eventName, data, custom = false },
}) {
  yield call(
    custom ? FacebookPixel.trackCustom : FacebookPixel.track,
    eventName,
    data,
  );
}

export function* handleLogTaggableAction(action) {
  log('received taggable action');

  const loading = yield select(isAccountFetching);
  if (loading) {
    log('account is still loading... ');
    yield take([
      authTypes.AUTHORIZED_SESSION_ACTIVE,
      authTypes.AUTHORIZED_SESSION_INACTIVE,
      authTypes.SSO_SESSION_ACTIVE,
      authTypes.SSO_SESSION_INACTIVE,
      accountTypes.SET_USER_ACCOUNT,
      accountTypes.FETCH_USER_ACCOUNT_FAILED,
    ]);

    yield call(handleLogTaggableAction, action);
    return;
  }

  const {
    payload: { eventId, params },
  } = action;

  const gtmId = yield call(getEnvironmentConfig, 'gtmId');
  if (gtmId) {
    log('logging GTM event');
    const country = yield select(getAccountCountry);
    yield call(Gtagger.run, 'event', 'conversion', {
      allow_custom_scripts: true,
      send_to: `${gtmId}/${eventId}`,
      u1: country,
      ...params,
    });
  } else {
    log('swallowing GTM event', eventId, params);
  }
}

export function* handleConversionAction({ payload: eventType }) {
  try {
    yield call(window.spotAds.conv.sdk, 'track', eventType);
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.error('Something went wrong tracking a conversion action', e);
  }
}

export function* handleSemanticMetricAction({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  payload: { metric_type, what, tags, value = 1 },
}) {
  log('received semantic metric action');
  yield call(sendMetric, {
    metric_type,
    value,
    what,
    tags,
  });
}

function* watchConversionAction() {
  yield takeEvery(types.TRACK_CONVERSION_ACTION, handleConversionAction);
}

export const RETRY_PARTNER_USERID_MAX_ATTEMPTS = 5;
export const RETRY_PARTNER_USERID_DELAY_BASE_VALUE = 2000;
export const RETRY_PARTNER_USERID_DELAY_BACKOFF_INTERVAL = 2;
export function* fetchPartnerId(partnerType) {
  let setPartnerFn;
  let fetchFailedPartnerFn;
  let partnerSelector;

  switch (partnerType) {
    case PARTNERS.GA:
      yield take(authTypes.SSO_SESSION_ACTIVE);
      setPartnerFn = setGAPartnerId;
      fetchFailedPartnerFn = fetchGAPartnerIdFailed;
      partnerSelector = getGAPartnerId;
      break;
    case PARTNERS.QUALAROO:
      setPartnerFn = setQualarooPartnerId;
      fetchFailedPartnerFn = fetchQualarooPartnerIdFailed;
      partnerSelector = getQualarooPartnerId;
      break;
    case PARTNERS.QUALTRICS:
      setPartnerFn = setQualtricsPartnerId;
      fetchFailedPartnerFn = fetchQualtricsPartnerIdFailed;
      partnerSelector = getQualtricsPartnerId;
      break;
    default:
      throw new Error(
        `Unable to retrieve partner id for unknown partner service of type "${partnerType}"`,
      );
  }

  let partnerId = yield select(partnerSelector);
  if (partnerId) {
    return partnerId;
  }
  let attempts = 0;
  let finalErr;

  while (attempts < RETRY_PARTNER_USERID_MAX_ATTEMPTS) {
    attempts++;

    try {
      partnerId = yield call(getPartnerId, partnerType);
      yield put(setPartnerFn(partnerId));
      return partnerId;
    } catch (e) {
      finalErr = e;
      const backoff = Math.pow(
        RETRY_PARTNER_USERID_DELAY_BACKOFF_INTERVAL,
        attempts - 1,
      );

      const waitMs = backoff * RETRY_PARTNER_USERID_DELAY_BASE_VALUE;
      log('Failed to fetch partner id: %s', e.message);
      log('delaying then retrying after %s ms', waitMs);
      yield call(delay, waitMs);
    }
  }

  yield put(fetchFailedPartnerFn(finalErr));
}

export function* handleGAPartnerIdReceived({ payload: { partnerId } }) {
  yield call(set, {
    userId: partnerId,
    dimension1: partnerId,
  });
}

function* watchLocationChange() {
  yield takeEvery(LOCATION_CHANGE, handleLocationChange);
}

function* watchLogUserAction() {
  yield takeEvery(types.LOG_USER_ACTION, handleLogUserAction);
}

function* watchLogFBAction() {
  yield takeEvery(types.LOG_FB_ACTION, handleLogFBAction);
}

function* watchLogTaggableAction() {
  yield takeEvery(types.LOG_TAGGABLE_ACTION, handleLogTaggableAction);
}

function* fetchGAPartnerId() {
  yield call(fetchPartnerId, PARTNERS.GA);
}

function* watchGAPartnerIdReceived() {
  yield takeEvery(types.GA_PARTNER_ID_RECEIVED, handleGAPartnerIdReceived);
}

function* watchFetchQualarooPartnerId() {
  yield takeEvery(
    types.FETCH_QUALAROO_PARTNER_ID,
    fetchPartnerId,
    PARTNERS.QUALAROO,
  );
}

function* watchFetchQualtricsPartnerId() {
  yield takeEvery(
    types.FETCH_QUALTRICS_PARTNER_ID,
    fetchPartnerId,
    PARTNERS.QUALTRICS,
  );
}

function* watchSemanticMetrics() {
  yield takeEvery(types.SEND_SEMANTIC_METRIC, handleSemanticMetricAction);
}

export default function* analyticsSaga() {
  yield all([
    fetchGAPartnerId(),
    watchLocationChange(),
    watchLogUserAction(),
    watchConversionAction(),
    watchLogFBAction(),
    watchLogTaggableAction(),
    watchGAPartnerIdReceived(),
    watchFetchQualarooPartnerId(),
    watchFetchQualtricsPartnerId(),
    watchSemanticMetrics(),
  ]);
}
