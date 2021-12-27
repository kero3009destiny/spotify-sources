import { get } from 'lodash';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  getPreferenceFailed,
  receiveUserPreference,
  receiveUserPreferences,
  setPreferenceFailed,
  setPreferenceSuccess,
} from './actions';

import * as api from 'api/account';

import { NULL_ID } from 'config/userPreferences';

import {
  GET_ALL_USER_PREFERENCES,
  GET_USER_PREFERENCE,
  GetUserPreferenceAction,
  SET_USER_PREFERENCE,
  SetUserPreferenceAction,
  UserPreference,
  UserPreferences,
} from './types';

const messageBuilder = (preference: UserPreference) => ({
  preference: {
    key: get(preference, 'key.adAccountId', '')
      ? preference.key
      : {
          key: preference.key,
        },
    value: JSON.stringify(preference.value),
  },
});

const messageParser = (preference: UserPreference) => {
  const adAccountId = get(preference, 'key.adAccountId');
  // Make sure this is a user-wide pref and not an account-level.
  if ((!adAccountId || adAccountId === NULL_ID) && preference.value) {
    return {
      key: get(preference, 'key.key'),
      value: JSON.parse(preference.value),
    };
  }
  return preference;
};

function* setUserPreference(action: SetUserPreferenceAction) {
  const preference: UserPreference = action.payload.preference;
  try {
    yield api.setAccountsPreferences(messageBuilder(preference));
    yield put(receiveUserPreference(preference));
    yield put(setPreferenceSuccess());
  } catch (error) {
    yield put(setPreferenceFailed(error));
  }
}

function* getUserPreference(action: GetUserPreferenceAction) {
  const key: string = action.payload.key;
  const preference: UserPreference = yield call(api.getAccountsPreference, {
    key,
  });
  const parsedPreference = messageParser(preference);
  if (parsedPreference) {
    yield put(receiveUserPreference(parsedPreference));
  }
}

function* getAllUserPreferences() {
  try {
    const { preferences }: { preferences: UserPreferences } = yield call(
      api.getAccountsPreferences,
    );
    // @ts-ignore
    const parsedPreferences: UserPreferences = preferences
      .map((preference: UserPreference) => messageParser(preference))
      .filter(preference => preference !== null && preference.key);
    yield put(receiveUserPreferences(parsedPreferences));
  } catch (error) {
    yield put(getPreferenceFailed(error));
  }
}

function* watchForSetUserPreferences() {
  yield takeLatest(SET_USER_PREFERENCE, setUserPreference);
  yield takeLatest(GET_USER_PREFERENCE, getUserPreference);
  yield takeLatest(GET_ALL_USER_PREFERENCES, getAllUserPreferences);
}

export { setUserPreference };

export default function* userPreferences() {
  yield all([watchForSetUserPreferences()]);
}
