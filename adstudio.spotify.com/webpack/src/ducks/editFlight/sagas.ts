import { all, put, select, takeLatest } from 'redux-saga/effects';

import { Account } from 'ducks/account/types';
// ACTIONS
import { editFlightFailed, editFlightSuccess } from './actions';
// SELECTORS
import { getAccount } from 'ducks/account/selectors';

// API
import { editFlight as editFlightApi } from 'api/flights';

// UTILS
import { withRetries } from 'utils/withRetries';

// MAPPERS
import { mapFormValuesToEditFlightPayload } from './mappers';

// TYPES
import { EDIT_FLIGHT, EditFlightStartAction } from './types';

export function* editFlight(action: EditFlightStartAction) {
  const { flight } = action.payload;
  try {
    const account = yield select(getAccount);
    const request = mapFormValuesToEditFlightPayload(
      flight,
      account as Account,
    );
    yield* withRetries(request, editFlightApi);
    yield put(editFlightSuccess());
  } catch (error) {
    yield put(editFlightFailed(error));
  }
}

function* watchForEditFlight() {
  yield takeLatest(EDIT_FLIGHT, editFlight);
}

export default function* editFlightSaga() {
  yield all([watchForEditFlight()]);
}
