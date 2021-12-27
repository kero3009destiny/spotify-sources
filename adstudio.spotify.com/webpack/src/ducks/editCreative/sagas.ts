import { all, put, select, takeLatest } from 'redux-saga/effects';

import { Account } from 'ducks/account/types';
// ACTIONS
import { editCreativeFailed, editCreativeSuccess } from './actions';
// SELECTORS
import { getAccount } from 'ducks/account/selectors';

// API
import { editCreative as editCreativeApi } from 'api/creatives';

// UTILS
import { withRetries } from 'utils/withRetries';

// MAPPERS
import { mapFormValuesToEditCreativePayload } from './mappers';

// TYPES
import { EDIT_CREATIVE, EditCreativeStartAction } from './types';

export function* editCreative(action: EditCreativeStartAction) {
  const { creative } = action.payload;
  try {
    const account = yield select(getAccount);
    const request = mapFormValuesToEditCreativePayload(
      creative,
      account as Account,
    );
    yield* withRetries(request, editCreativeApi);
    yield put(editCreativeSuccess());
  } catch (error) {
    yield put(editCreativeFailed(error));
  }
}

function* watchForEditCreative() {
  yield takeLatest(EDIT_CREATIVE, editCreative);
}

export default function* editCreativeSaga() {
  yield all([watchForEditCreative()]);
}
