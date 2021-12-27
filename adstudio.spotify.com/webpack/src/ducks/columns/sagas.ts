import { get } from 'lodash';
import { all, put, select, takeEvery } from 'redux-saga/effects';

import { SELECT_ACCOUNT_ID } from 'ducks/account/types';
import { AccountPreferences } from 'ducks/accounts/types';
import { initializeColumnsSelection as initializeColumnsSelectionAC } from './actions';
import { setAccountPreference } from 'ducks/account/actions';
import {
  canTargetActiveAudio,
  getAccount,
  getAccountPreferences,
  getHasSCMCampaign,
} from 'ducks/account/selectors';

import { defaultColumnVariants as defaultCampaignColumnVariants } from 'components/CampaignCatalogue/CampaignTable/constants';
import { defaultColumnVariants as defaultCreativeColumnVariants } from 'components/CreativeCatalogue/CreativeTable/constants';
import { defaultColumnVariants as defaultFlightColumnVariants } from 'components/FlightCatalogue/FlightTable/constants';

import {
  ACCOUNT_COLUMNS_ACTIVE_AUDIO,
  ACCOUNT_COLUMNS_BASE,
  ACCOUNT_COLUMNS_SCM,
  ACCOUNT_COLUMNS_SCM_ACTIVE_AUDIO,
  SELECTED_CAMPAIGN_COLUMNS,
  SELECTED_CREATIVE_COLUMNS,
  SELECTED_FLIGHT_COLUMNS,
} from './constants';

import * as types from './types';

export function* setColumnSelection(
  action: types.UpdateColumnsSelectionAction,
) {
  const selection = action.payload.selection;
  const columnOptionType = action.payload.columnOptionType;

  const account = yield select(getAccount);
  const accountId = get(account, 'id');

  if (accountId && selection) {
    yield put(setAccountPreference(accountId, columnOptionType, selection));
  }
}

export function* getAccountColumnVariant() {
  const hasScm = yield select(getHasSCMCampaign);
  const hasActiveAudio = yield select(canTargetActiveAudio);

  if (hasScm && hasActiveAudio) {
    return ACCOUNT_COLUMNS_SCM_ACTIVE_AUDIO;
  }

  if (hasScm) {
    return ACCOUNT_COLUMNS_SCM;
  }

  if (hasActiveAudio) {
    return ACCOUNT_COLUMNS_ACTIVE_AUDIO;
  }

  return ACCOUNT_COLUMNS_BASE;
}

export function* initializeColumnSelections() {
  const preferences: AccountPreferences | undefined = yield select(
    getAccountPreferences,
  );
  const accountColumnVariant: types.AccountColumnVariant = yield getAccountColumnVariant();
  defaultFlightColumnVariants[accountColumnVariant].PLACEMENT = true;

  const initialState: types.ColumnState = {
    [SELECTED_CAMPAIGN_COLUMNS]:
      preferences && preferences[SELECTED_CAMPAIGN_COLUMNS]
        ? preferences[SELECTED_CAMPAIGN_COLUMNS]!
        : defaultCampaignColumnVariants[accountColumnVariant],
    [SELECTED_FLIGHT_COLUMNS]:
      preferences && preferences[SELECTED_FLIGHT_COLUMNS]
        ? preferences[SELECTED_FLIGHT_COLUMNS]!
        : defaultFlightColumnVariants[accountColumnVariant],
    [SELECTED_CREATIVE_COLUMNS]:
      preferences && preferences[SELECTED_CREATIVE_COLUMNS]
        ? preferences[SELECTED_CREATIVE_COLUMNS]!
        : defaultCreativeColumnVariants[accountColumnVariant],
  };

  yield put(initializeColumnsSelectionAC(initialState));
}

function* watchForSetColumnSelection() {
  yield takeEvery(types.UPDATE_COLUMNS_SELECTION, setColumnSelection);
}

function* watchForSetUserAccount() {
  yield takeEvery(SELECT_ACCOUNT_ID, initializeColumnSelections);
}

export default function* columnsSaga() {
  yield all([watchForSetColumnSelection(), watchForSetUserAccount()]);
}
