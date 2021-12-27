import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  getScheduledReportsFailed,
  getScheduledReportsSucceeded,
} from './actions';

import { getScheduledReports } from 'api/scheduledReporting';

import { GET_SCHEDULED_REPORTS, GetScheduledReportsStartAction } from './types';
import { ScheduledReportingResponse } from 'types/common/state/api/scheduledReporting';

export function* fetchScheduledReports(action: GetScheduledReportsStartAction) {
  try {
    const response: ScheduledReportingResponse = yield call(
      getScheduledReports,
      action.payload.iamDomain,
    );
    yield put(getScheduledReportsSucceeded(response));
  } catch (e) {
    yield put(getScheduledReportsFailed(e));
  }
}

function* watchFetchScheduledReports() {
  yield takeLatest(GET_SCHEDULED_REPORTS, fetchScheduledReports);
}

export default function* getScheduledReportingSaga() {
  yield all([watchFetchScheduledReports()]);
}
