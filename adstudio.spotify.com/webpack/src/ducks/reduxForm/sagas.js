import { get } from 'lodash';
import { actionTypes, getFormSyncErrors } from 'redux-form';
import { all, put, select, takeEvery } from 'redux-saga/effects';

import { logUserAction } from 'ducks/analytics/actions';

export function* handleFormSubmitFailed(action) {
  const formName = get(action, 'meta.form', null);
  const submitErrors = yield select(getFormSyncErrors(formName));

  // do not submit errors if the error message is empty
  if (Object.keys(submitErrors).length) {
    yield put(
      logUserAction({
        category: 'create_ad_flow',
        label: 'next_button_failed',
        params: {
          formName: formName,
          error: submitErrors,
        },
      }),
    );
  }
}

export function* watchForSubmitFormFailure() {
  yield takeEvery(actionTypes.SET_SUBMIT_FAILED, handleFormSubmitFailed);
}

export default function* reduxFormSaga() {
  yield all([watchForSubmitFormFailure()]);
}
