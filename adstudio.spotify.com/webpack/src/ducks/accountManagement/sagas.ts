import i18n from 'i18next';
import { get } from 'lodash';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { NewAdAccountCreationResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adaccountservice/service/NewAdAccountCreationResponse';

import { CHANGE_ACCOUNT } from 'ducks/account/types';
import { AdAccountMetadata, AdAccountNickname } from 'ducks/accounts/types';
import { setLanguagePreference } from 'ducks/i18n/sagas';
import {
  addMemberFailed,
  addMemberSucceed,
  changeAccountOwnerFailed,
  changeAccountOwnerSucceed,
  createNewAdAccountWithExistingUserError,
  createNewAdAccountWithExistingUserInProgress,
  createNewAdAccountWithExistingUserSuccess,
  getMembers,
  getMembersFailed,
  getMembersSucceed,
  removeMemberFailed,
  removeMemberSucceed,
  updatedMembersRoleSuccess,
  updateMembersRoleError,
} from './actions';
import {
  fetchUserAccounts,
  fetchUserAccountsSuccess,
} from 'ducks/accounts/actions';
import { logUserAction } from 'ducks/analytics/actions';
import {
  DEFAULT_DISPLAY_TIME,
  displayNotification,
} from 'ducks/notifications/actions';
import { setPreference } from 'ducks/userPreferences/actions';
import { getAccessedAccounts } from './selectors';
import { getAccounts } from 'ducks/accounts/selectors';
import { getUtm } from 'ducks/utm/selectors';

import MemberUpdateFailedBannerContent from 'components/AccountManagement/AccountDetails/MemberUpdateFailedBannerContent';

import * as api from 'api/account';

import { ACCESSED_ACCOUNTS_KEY } from './constants';

import {
  AccountManagementEvents,
  AddMemberToAccountAction,
  ChangeAccountOwnerAction,
  CreateNewAdAccountWithExistingUser,
  GetAccountMembersAction,
  NICKNAMES_KEY,
  RemoveMemberFromAccountAction,
  SetAccountNickname,
  UpdateMemberRoleAction,
  UserInfo,
} from './types';

const ACCOUNT_MANAGEMENT = 'Account_management';

function createMemberUpdatedBanner() {
  return displayNotification(
    i18n.t(
      'I18N_ACC_HIERARCHY_BANNER_ACCOUNT_UPDATED',
      `You've successfully updated members on this ad account`,
    ),
    'positive',
    DEFAULT_DISPLAY_TIME,
  );
}

function memberUpdatedBannerFailed() {
  return displayNotification(
    MemberUpdateFailedBannerContent,
    'negative',
    DEFAULT_DISPLAY_TIME,
  );
}

function accountOwnerUpdatedBanner() {
  return displayNotification(
    i18n.t(
      'I18N_ACC_HIERARCHY_BANNER_ACCOUNT_OWNER_CHANGED',
      `You’ve successfully changed the owner of this ad account.`,
    ),
    'positive',
    DEFAULT_DISPLAY_TIME,
  );
}

function* getAccountMembers(action: GetAccountMembersAction) {
  try {
    const { accountId } = action.payload;
    const response: api.UserAccounts = yield api.getUsersFromAccount(accountId);
    const users: UserInfo[] = get(response, 'userMetadatas', []);
    yield put(getMembersSucceed(users));
  } catch (e) {
    yield put(getMembersFailed(e));
  }
}

function* updateMemberRole(action: UpdateMemberRoleAction) {
  const { externalUserId, role, prevRole, accountId } = action.payload;
  try {
    yield api.changeMemberRoleInAccount(
      accountId,
      role,
      externalUserId,
      prevRole,
    );
    yield put(getMembers(accountId));
    yield put(updatedMembersRoleSuccess());
    yield put(createMemberUpdatedBanner());
  } catch (e) {
    yield put(memberUpdatedBannerFailed());
    yield put(updateMembersRoleError(e));
  }
}

function* removeMemberFromAccount(action: RemoveMemberFromAccountAction) {
  const { externalUserId, role, accountId } = action.payload;
  try {
    yield api.removeMemberInAccount(accountId, role, externalUserId);
    yield put(getMembers(accountId));
    yield put(removeMemberSucceed());
    yield put(fetchUserAccounts());
    yield put(createMemberUpdatedBanner());
    yield put(
      logUserAction({
        category: ACCOUNT_MANAGEMENT,
        label: 'Remove_member_success',
        params: {
          accountId,
          role,
          externalUserId,
        },
      }),
    );
  } catch (e) {
    yield put(removeMemberFailed(e));
    yield put(memberUpdatedBannerFailed());
    yield put(
      logUserAction({
        category: ACCOUNT_MANAGEMENT,
        label: 'Remove_member_failed',
        params: {
          accountId,
          role,
          externalUserId,
        },
      }),
    );
  }
}

function* changeAccountOwner(action: ChangeAccountOwnerAction) {
  const { externalUserId, accountId } = action.payload;
  try {
    yield api.changeAdAccountOwner(accountId, externalUserId);
    yield put(getMembers(accountId));
    yield put(changeAccountOwnerSucceed());
    yield put(fetchUserAccounts());
    yield put(accountOwnerUpdatedBanner());
    yield put(
      logUserAction({
        category: ACCOUNT_MANAGEMENT,
        label: 'Change_account_owner_success',
        params: {
          accountId,
          externalUserId,
        },
      }),
    );
  } catch (e) {
    yield put(changeAccountOwnerFailed(e));
    yield put(memberUpdatedBannerFailed());
    yield put(
      logUserAction({
        category: ACCOUNT_MANAGEMENT,
        label: 'Change_account_owner_failed',
        params: {
          accountId,
          externalUserId,
        },
      }),
    );
  }
}

function* addMemberToAccount(action: AddMemberToAccountAction) {
  const { externalUserId, role, accountId } = action.payload;
  try {
    yield api.addMemberInAccount(accountId, role, externalUserId);
    yield put(getMembers(accountId));
    yield put(addMemberSucceed());
    yield put(fetchUserAccounts());
    yield put(createMemberUpdatedBanner());
    yield put(
      logUserAction({
        category: ACCOUNT_MANAGEMENT,
        label: 'Add_member_success',
        params: {
          accountId,
          role,
          externalUserId,
        },
      }),
    );
  } catch (e) {
    yield put(addMemberFailed(e));
    yield put(memberUpdatedBannerFailed());
    yield put(
      logUserAction({
        category: ACCOUNT_MANAGEMENT,
        label: 'Add_member_failed',
        params: {
          accountId,
          role,
          externalUserId,
        },
      }),
    );
  }
}

function* saveAccessedAccounts(action: TSFixMe) {
  // We have been notified of an account change, so the reducer should have incremented the
  // access count so we should re-save to psyduck
  const { payload: adAccountId } = action;
  const accessedAccounts = yield select(getAccessedAccounts);
  if (accessedAccounts[adAccountId]) {
    yield put(
      setPreference({
        key: { adAccountId, key: ACCESSED_ACCOUNTS_KEY },
        value: accessedAccounts[adAccountId],
      }),
    );
  }
}

function* watchAddMemberToAccount() {
  yield takeLatest(
    AccountManagementEvents.ADD_ACCOUNT_MEMBER,
    addMemberToAccount,
  );
}

function* setAccountNickname(action: SetAccountNickname) {
  const { accountId, nickname } = action.payload;

  const accounts: AdAccountMetadata[] = yield select(getAccounts);

  // this swaps the name and nickname keys if there's a nickname? how weird!
  const nicknames = accounts.reduce((nicknamesObject, currentAccount) => {
    if (currentAccount.nickname) {
      nicknamesObject[currentAccount.adAccountId] =
        currentAccount.adAccountName;
    }
    // updating accounts object;
    if (currentAccount.adAccountId === accountId) {
      currentAccount.nickname = currentAccount.nickname
        ? currentAccount.nickname
        : currentAccount.adAccountName;
      currentAccount.adAccountName = nickname;
    }
    return nicknamesObject;
  }, {} as AdAccountNickname);

  if (nickname && nickname.trim() !== '') {
    const toWrite = { ...nicknames, [accountId]: nickname };
    yield put(setPreference({ key: NICKNAMES_KEY, value: toWrite }));
  } else {
    const [accountToRestore] = accounts.filter(
      accountToClear => accountToClear.adAccountId === accountId,
    );
    if (accountToRestore && accountToRestore.nickname) {
      accountToRestore.adAccountName = accountToRestore.nickname;
      delete accountToRestore.nickname;
    }
    delete nicknames[accountId];
    yield put(setPreference({ key: NICKNAMES_KEY, value: nicknames }));
  }

  yield put(fetchUserAccountsSuccess(accounts));
}

function* watchGetAccountMembers() {
  yield takeLatest(
    AccountManagementEvents.GET_ACCOUNT_MEMBERS,
    getAccountMembers,
  );
}

function* watchRemoveMembersFromAccount() {
  yield takeLatest(
    AccountManagementEvents.REMOVE_ACCOUNT_MEMBER,
    removeMemberFromAccount,
  );
}

function* watchChangeAccountOwner() {
  yield takeLatest(
    AccountManagementEvents.CHANGE_ACCOUNT_OWNER,
    changeAccountOwner,
  );
}

function* watchUpdateMemberRoles() {
  yield takeLatest(
    AccountManagementEvents.UPDATE_ACCOUNT_MEMBER,
    updateMemberRole,
  );
}

function* watchChangeAccount() {
  yield takeLatest(CHANGE_ACCOUNT, saveAccessedAccounts);
}

function* watchSetAccountNickname() {
  yield takeLatest(
    AccountManagementEvents.SET_ACCOUNT_NICKNAME,
    setAccountNickname,
  );
}

export function* createNewAdAccountWithExistingUser(
  action: CreateNewAdAccountWithExistingUser,
) {
  try {
    yield put(createNewAdAccountWithExistingUserInProgress());
    const utm: string = yield select(getUtm);
    const newPayload = {
      utm,
      ...action.payload,
    };
    yield setLanguagePreference();
    const signupStatus: InstanceType<typeof NewAdAccountCreationResponse> = yield call(
      api.createNewAdAccountWithExistingUser,
      newPayload,
    );

    yield put(fetchUserAccounts()); // Update accounts list
    yield put(createNewAdAccountWithExistingUserSuccess(signupStatus));
  } catch (error) {
    yield put(createNewAdAccountWithExistingUserError(error));
  }
}

function* watchCreateNewAdAccountWithExistingUser() {
  yield takeLatest(
    AccountManagementEvents.CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER,
    createNewAdAccountWithExistingUser,
  );
}

export default function* AccountManagement() {
  yield all([
    watchGetAccountMembers(),
    watchRemoveMembersFromAccount(),
    watchChangeAccountOwner(),
    watchUpdateMemberRoles(),
    watchAddMemberToAccount(),
    watchChangeAccount(),
    watchSetAccountNickname(),
    watchCreateNewAdAccountWithExistingUser(),
  ]);
}
