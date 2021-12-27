// NPM package imports
import { goBack } from 'react-router-redux';
import debug from 'debug';
import i18n from 'i18next';
import { get, isEmpty } from 'lodash';
import {
  all,
  call,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

// @spotify-internal imports
import { roles } from '@spotify-internal/adstudio-shared/lib/config/permissions';

import { UserRoles } from 'ducks/accountManagement/types';
import {
  AdAccountMetadata,
  FETCH_USER_ACCOUNTS_SUCCESS,
} from 'ducks/accounts/types';
import { AUTHORIZED_SESSION_ACTIVE } from 'ducks/auth/types';
import { SET_USER_DATA } from 'ducks/user/types';
// Imports from this duck
import {
  AcceptAPITermsAction,
  accountSelected,
  ChangeAccountAction,
  fetchAccountPreferencesSuccess,
  fetchSuperUserRolesFailed,
  fetchSuperUserRolesSuccess,
  fetchUserAccountFailed,
  SelectAccountIdAction,
  setAccountComplianceAlertStatus,
  setAccountComplianceStatus,
  SetAccountPreferenceAction,
  setExternalId,
  setShouldReturnToReviewScreen,
  setUserAccount,
  SetUserAccountAction,
  UpdateAccountBusinessAddressAction,
  updateActiveAccountBusinessAddress,
} from './actions';
import { fetchUserAccountsPreferencesSuccess } from 'ducks/accounts/actions';
import { displayNotification } from 'ducks/notifications/actions';
import {
  accountNeedsVAT,
  getAccount,
  getAccountId,
  getAccountPreferences as selectAccountPreferences,
  getRole,
} from './selectors';
import { getAccountById, getAccounts } from 'ducks/accounts/selectors';
import { getCountriesByCountryCode } from 'ducks/config/selectors';
import { getUserId } from 'ducks/user/selectors';

// Voltron api, config, (other) ducks, types, utils etc imports
import * as api from 'api/account';
import * as userApi from 'api/user';

import { poll } from 'utils/sagaHelpers';
import {
  getLocalStorage,
  getStorage,
  jsonParse,
  jsonStringify,
  setStorage,
} from 'utils/storageHelpers';

import { ACCOUNT_PREFERENCES } from './constants';
import { DEVICE_HAS_AUTHENTICATED_WITH_AD_ACCOUNT } from 'config/account';

import {
  ACCEPT_API_TERMS,
  Account,
  CHANGE_ACCOUNT,
  SELECT_ACCOUNT_ID,
  SET_ACCOUNT_PREFERENCE,
  SET_USER_ACCOUNT,
  UPDATE_ACCOUNT_BUSINESS,
} from './types';
import {
  BffGetUserPreferencesResponse,
  BffUserPreference,
} from 'types/common/state/api/accounts';

const LAST_USER_ACCOUNT = 'last_viewed_account';
export const COMPLIANCE_MESSAGE = 'complianceMessage';

const log = debug('sagas:account');

export function* fetchIsSuperAdmin() {
  try {
    const result = yield call(userApi.getSuperUser);
    yield put(fetchSuperUserRolesSuccess(result));
  } catch (e) {
    yield put(fetchSuperUserRolesFailed(e));
  }
}

export function* fetchExternalId() {
  try {
    const userId = yield select(getUserId);
    const accountId = yield select(getAccountId);
    const {
      spotifyUserExternalId: externalId,
    } = yield api.getUserInfoFromSpotifyUser(userId, accountId);

    log('externalID', externalId);
    yield put(setExternalId(externalId));
  } catch (e) {
    log('Error fetching external user id');
  }
}

export function* setAccountToStorage(
  action: ChangeAccountAction | SelectAccountIdAction,
) {
  const { payload } = action;
  yield call(setStorage, getLocalStorage(), LAST_USER_ACCOUNT, payload);
}

export function* getAccountFromStorageOrServer(
  accounts: Array<AdAccountMetadata>,
) {
  // if ad account is stored in browser and matches one of the user's accounts, use that one
  // otherwise, use always first user's account
  let selectedAccountId;
  const lastAccountFromStorage = yield call(
    getStorage,
    getLocalStorage(),
    LAST_USER_ACCOUNT,
  );

  const accountFound = accounts.find(
    item => item.adAccountId === lastAccountFromStorage,
  );

  if (accountFound) {
    log('user account found in local storage');
    selectedAccountId = lastAccountFromStorage;
  } else {
    log(
      "user account not found in storage, saving user's admin or first account.",
    );

    const adminAdAccountId = get(
      accounts.find(account => account.role === 'admin'),
      'adAccountId',
    );

    selectedAccountId = adminAdAccountId || accounts[0].adAccountId;
  }
  yield call(
    setStorage,
    getLocalStorage(),
    LAST_USER_ACCOUNT,
    selectedAccountId,
  );
  return selectedAccountId;
}

export function* authenticateDevice(account: Account) {
  // if users has logged in with Spotify account in with ad account before on the device
  // we won't force them through /signup/notice step again and redirect to spotify login instead
  if (account) {
    yield call(
      setStorage,
      getLocalStorage(),
      DEVICE_HAS_AUTHENTICATED_WITH_AD_ACCOUNT,
      true,
    );
  }
}

export function* selectAccountId(
  action: ChangeAccountAction | SelectAccountIdAction,
) {
  const hasSelectedAccountPrior = yield call(
    getStorage,
    getLocalStorage(),
    LAST_USER_ACCOUNT,
  );
  if (!action.payload) {
    const accounts: Array<AdAccountMetadata> = yield select(getAccounts);
    yield getAccountFromStorageOrServer(accounts);
  } else {
    yield setAccountToStorage(action);
  }
  let account = yield select(getAccount);

  if (!!action.payload && action.payload !== get(account, 'id')) {
    yield fetchAccountDetails(action);
    account = yield select(getAccount);
    if (!!hasSelectedAccountPrior) {
      yield put(
        displayNotification(
          i18n.t(
            'I18N_YOUR_SELECTED_AD_ACCOUNT',
            'Your selected ad account has been changed',
          ),
          'announcement',
        ),
      );
    }
  }
  yield put(accountSelected());
  yield call(getAccountPreferencesFromStorageAndServer, action.payload);
}

export function* fetchAccountDetails(
  action?: ChangeAccountAction | SelectAccountIdAction,
) {
  log('attempting to fetch ad account details');

  try {
    let account: Account | null = null;
    const accountId = action && action.payload;
    const accounts = yield select(getAccounts);
    if (accounts && accounts.length > 0) {
      let selectedAccountId = accountId;
      if (accountId) {
        yield call(
          setStorage,
          getLocalStorage(),
          LAST_USER_ACCOUNT,
          selectedAccountId,
        );
      } else {
        selectedAccountId = yield getAccountFromStorageOrServer(accounts);
      }
      log(`selected user account: ${selectedAccountId}`);
      account = yield poll(api.getAccountDetailsById, {
        methodArgs: [selectedAccountId],
        debugName: 'getAccountDetailsById:fetchAccountDetails',
      });
      log('account details fetched; storing');
      yield call(getAccountPreferencesFromStorageAndServer, selectedAccountId!);
      yield authenticateDevice(account!);
    }
    const countriesByCountryCode = yield select(getCountriesByCountryCode);
    yield put(setUserAccount(account!, countriesByCountryCode));
  } catch (e) {
    yield put(fetchUserAccountFailed(e));
    log('failed to fetch account details', e);
  }
}

const formatAccountPreferencesKey = (accountId: string) =>
  `${ACCOUNT_PREFERENCES}::account-${accountId}`;

export function* fetchAccountPreferencesFromServer(accountId: string) {
  const activeAccountState = yield select(getAccountById, accountId);

  const remoteAccountPreferences = get(
    activeAccountState,
    'adAccountPreferences',
  );

  if (!remoteAccountPreferences) {
    const fetchedAccountsPreferences: BffGetUserPreferencesResponse | null = yield call(
      api.getAccountsPreferences,
      accountId,
    );
    const flattenedAccountsPreferences = [fetchedAccountsPreferences].reduce(
      (
        accum: BffUserPreference[],
        currentVal: BffGetUserPreferencesResponse | null,
      ) => {
        // pull the preferences out of the response and flatten into flattenedAccountsPreferences array
        return accum.concat(currentVal?.preferences || []);
      },
      [],
    );

    yield put(
      fetchUserAccountsPreferencesSuccess(
        flattenedAccountsPreferences,
        accountId,
      ),
    );
    return flattenedAccountsPreferences;
  }
  return remoteAccountPreferences;
}

export function* getAccountPreferencesFromStorageAndServer(accountId: string) {
  const key = formatAccountPreferencesKey(accountId);

  // Start with local storage
  let localAccountPreferences = yield call(getStorage, getLocalStorage(), key);
  localAccountPreferences = jsonParse(localAccountPreferences);

  // Then in the b/e
  const remoteAccountPreferences = yield fetchAccountPreferencesFromServer(
    accountId,
  );

  // Merge local and remote giving priority to remote
  const accountPreferences = {
    ...localAccountPreferences,
    ...remoteAccountPreferences,
  };

  // Remove extra properties caused by a previous bug which sent nested key/value string to backend
  // See https://ghe.spotify.net/ads/voltron-ui/issues/4323
  delete accountPreferences.key;
  delete accountPreferences.value;

  if (accountPreferences && !isEmpty(accountPreferences)) {
    yield put(fetchAccountPreferencesSuccess(accountPreferences));
  } else {
    log('No account preferences found.');
  }
}

export function* setAccountPreference(action: SetAccountPreferenceAction) {
  const { accountId, preferenceName, accountPreference } = action.payload;
  if (accountPreference) {
    const key = formatAccountPreferencesKey(accountId);
    let accountPreferences = yield select(selectAccountPreferences) || {};
    if (!accountPreferences) {
      accountPreferences = {};
    }
    accountPreferences[preferenceName] = accountPreference;
    const stringifiedAccountPreferences = jsonStringify(accountPreferences);

    const payload = {
      preference: {
        key: {
          adAccountId: accountId,
          key: ACCOUNT_PREFERENCES,
        },
        value: stringifiedAccountPreferences,
      },
    };

    try {
      yield all([
        call(setStorage, getLocalStorage(), key, stringifiedAccountPreferences),
        call(api.setAccountsPreferences, payload),
      ]);
    } catch (ex) {
      log(`Error saving account preferences`);
    }
    yield call(getAccountPreferencesFromStorageAndServer, accountId);
  }
}

export function* acceptAPITerms(action: AcceptAPITermsAction) {
  const { accountId, organizationId } = action.payload;
  if (accountId && organizationId) {
    try {
      yield call(api.logAPITermsAcceptance, accountId, organizationId);
    } catch (ex) {
      log(`Error logging API terms acceptance: ${ex}`);
    }
  }
}

export function* validateAccount(action: SetUserAccountAction) {
  if (action.payload) {
    const { businessAddress, vat = '', id } = action.payload;
    const alertKey = `COMPLIANCE_MESSAGE-${id}`;
    const role: UserRoles = yield select(getRole);
    const shouldHaveVAT: boolean = yield select(accountNeedsVAT);
    const alertAttempts: number = JSON.parse(
      localStorage.getItem(alertKey) || '0',
    );
    if (businessAddress) {
      const { street, city } = businessAddress;
      const invalidVat = shouldHaveVAT && vat.trim() === '';
      const invalidAddress = street.trim() === '' || city.trim() === '';

      if (role !== roles.viewer && (invalidAddress || invalidVat)) {
        log('Account not in compliance');

        yield put(setAccountComplianceAlertStatus(alertAttempts));
        localStorage.setItem(alertKey, JSON.stringify(alertAttempts + 1));
        yield put(setAccountComplianceStatus(false));
      } else {
        localStorage.removeItem(alertKey);
        yield put(setAccountComplianceStatus(true));
      }
    }
  }
}

function* saveBusinessAccount(action: UpdateAccountBusinessAddressAction) {
  const {
    accountId,
    accountAddress,
    businessType,
    industry,
    taxId,
  } = action.payload;

  if (accountId && accountAddress) {
    try {
      yield call(
        api.updateAdAccount,
        accountId,
        accountAddress,
        industry,
        businessType,
        taxId,
      );
      if (taxId) {
        accountAddress.taxId = taxId;
      }
      const currentAccount: string = yield select(getAccountId);
      if (accountId === currentAccount) {
        // If modified account is active account, run validation.
        yield put(updateActiveAccountBusinessAddress(accountAddress));
        const setUserAccountAction = setUserAccount(
          {
            businessAddress: accountAddress,
            vat: taxId,
          } as Account,
          {},
        );
        yield validateAccount(setUserAccountAction);
      }
      yield put(setShouldReturnToReviewScreen(true));
      yield put(goBack());
    } catch (error) {
      log(`Error updating account business ${error}`);
    }
  }
}

function* watchForAccountBusinessAddressChange() {
  yield takeEvery(UPDATE_ACCOUNT_BUSINESS, saveBusinessAccount);
}

function* watchAdAccountsFetched() {
  log(
    'waiting for ad accounts list being fetched before getting account details',
  );

  yield take(FETCH_USER_ACCOUNTS_SUCCESS);
  yield call(fetchAccountDetails);
}

function* watchAuthorizedSessionForFetchAccountDetails() {
  // fetchExternalId needs the user data to be populated, so wait for that action to be dispatched (from fetchSpotifyAccountData)
  yield all([take(AUTHORIZED_SESSION_ACTIVE), take(SET_USER_DATA)]);
  yield call(fetchIsSuperAdmin);
  yield call(fetchExternalId);
}

function* watchForAccountId() {
  yield takeLatest(CHANGE_ACCOUNT, selectAccountId);
  yield takeLatest(SELECT_ACCOUNT_ID, selectAccountId);
}

function* watchForSetAccountPreference() {
  yield takeEvery(SET_ACCOUNT_PREFERENCE, setAccountPreference);
}

function* watchForAcceptAPITerms() {
  yield takeEvery(ACCEPT_API_TERMS, acceptAPITerms);
}

function* watchForUserAccount() {
  yield takeLatest(SET_USER_ACCOUNT, validateAccount);
}

export default function* accountSagas() {
  yield all([
    watchForUserAccount(),
    watchForAccountBusinessAddressChange(),
    watchAuthorizedSessionForFetchAccountDetails(),
    watchAdAccountsFetched(),
    watchForAccountId(),
    watchForSetAccountPreference(),
    watchForAcceptAPITerms(),
  ]);
}
