import { all, call, put, select, takeLatest } from '@redux-saga/core/effects';

import { getAudiencesFailed, getAudiencesSuccess } from './actions';
import { getAccountId } from 'ducks/account/selectors';

import { getAudiences } from 'api/audiences';

import { Audience, FETCH_AUDIENCES } from './types';

export function* fetchAudiences() {
  const accountId: string = yield select(getAccountId);
  try {
    const { audiences }: { audiences: Audience[] } = yield call(
      getAudiences,
      accountId,
    );
    yield put(getAudiencesSuccess(audiences));
  } catch (e) {
    yield put(getAudiencesFailed(e));
  }
}
function* watchForFetchAudiences() {
  yield takeLatest(FETCH_AUDIENCES, fetchAudiences);
}

export default function* getAudiencesSaga() {
  yield all([watchForFetchAudiences()]);
}
