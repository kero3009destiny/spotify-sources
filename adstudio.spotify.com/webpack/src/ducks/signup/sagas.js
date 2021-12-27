import { push } from 'react-router-redux';
import { stringify } from 'query-string';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { mapAccountRequest } from 'ducks/account/mappers';
import { setLanguagePreference } from 'ducks/i18n/sagas';
import * as actions from './actions';

import { userSignUp } from 'api/signup';

import { pixelVariableGenerator } from 'utils/signupHelpers';

import { routes } from 'config/routes';

import * as types from './types';

export function* handleAddAccount(action) {
  const { account } = action.payload;
  try {
    yield setLanguagePreference();
    let signupStatus = yield call(userSignUp, mapAccountRequest(account));
    if (typeof signupStatus !== 'string') {
      signupStatus = signupStatus.status || signupStatus.signUpStatus;
    }

    const { country, businessName } = account;
    const accountDetails = {
      businessName,
      country,
      signupStatus,
    };

    const url = `${routes.ADSTUDIO_SIGNUP}${
      routes.NEW_SIGNUP_CONFIRMATION_PAGE
    }?${stringify(accountDetails)}`;
    const VIQPixelVariable = pixelVariableGenerator();
    yield put(actions.addAccountSucceeded(signupStatus, VIQPixelVariable));
    yield put(push(url));
  } catch (error) {
    yield put(actions.addAccountFailure(error));
  }
}

function* watchForAddAccount() {
  yield takeEvery(types.CREATE_ACCOUNT_REQUESTED, handleAddAccount);
}

export default function* addAccountSaga() {
  yield all([watchForAddAccount()]);
}
