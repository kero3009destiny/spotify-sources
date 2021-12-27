import { NewAdAccountCreationResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adaccountservice/service/NewAdAccountCreationResponse';

import {
  AccountManagementEvents,
  AddMemberToAccountAction,
  AddMemberToAccountErrorAction,
  AddMemberToAccountSuccessAction,
  ChangeAccountOwnerAction,
  ChangeAccountOwnerErrorAction,
  ChangeAccountOwnerSucceedAction,
  CreateNewAdAccountWithExistingUser,
  CreateNewAdAccountWithExistingUserError,
  CreateNewAdAccountWithExistingUserInProgress,
  CreateNewAdAccountWithExistingUserReset,
  CreateNewAdAccountWithExistingUserSuccess,
  GetAccountMembersAction,
  GetAccountMembersErrorAction,
  GetAccountMembersSucceedAction,
  RemoveMemberFromAccountAction,
  RemoveMemberFromAccountErrorAction,
  RemoveMemberFromAccountSucceedAction,
  SetAccountNickname,
  UpdateMemberRoleAction,
  UpdateMemberRoleErrorAction,
  UpdateMemberRoleSuccessAction,
  UserInfo,
  UserRoles,
} from './types';

export const getMembers = (accountId: string): GetAccountMembersAction => ({
  type: AccountManagementEvents.GET_ACCOUNT_MEMBERS,
  payload: {
    accountId,
  },
});

export const getMembersSucceed = (
  users: UserInfo[],
): GetAccountMembersSucceedAction => ({
  type: AccountManagementEvents.GET_ACCOUNT_MEMBERS_SUCCESS,
  payload: {
    users,
  },
});

export const getMembersFailed = (
  response: Response,
): GetAccountMembersErrorAction => ({
  type: AccountManagementEvents.GET_ACCOUNT_MEMBERS_ERROR,
  error: response,
  meta: {
    response,
  },
});

export const removeMember = (
  externalUserId: string,
  role: UserRoles,
  accountId: string,
): RemoveMemberFromAccountAction => ({
  type: AccountManagementEvents.REMOVE_ACCOUNT_MEMBER,
  payload: {
    externalUserId,
    role,
    accountId,
  },
});

export const removeMemberSucceed = (): RemoveMemberFromAccountSucceedAction => ({
  type: AccountManagementEvents.REMOVE_ACCOUNT_MEMBER_SUCCESS,
});

export const removeMemberFailed = (
  response: Response,
): RemoveMemberFromAccountErrorAction => ({
  type: AccountManagementEvents.REMOVE_ACCOUNT_MEMBER_ERROR,
  error: response,
  meta: {
    response,
  },
});

export const changeAccountOwner = (
  externalUserId: string,
  accountId: string,
): ChangeAccountOwnerAction => ({
  type: AccountManagementEvents.CHANGE_ACCOUNT_OWNER,
  payload: {
    externalUserId,
    accountId,
  },
});

export const changeAccountOwnerSucceed = (): ChangeAccountOwnerSucceedAction => ({
  type: AccountManagementEvents.CHANGE_ACCOUNT_OWNER_SUCCESS,
});

export const changeAccountOwnerFailed = (
  response: Response,
): ChangeAccountOwnerErrorAction => ({
  type: AccountManagementEvents.CHANGE_ACCOUNT_OWNER_ERROR,
  error: response,
  meta: {
    response,
  },
});

export const addMember = (
  externalUserId: string,
  role: UserRoles,
  accountId: string,
): AddMemberToAccountAction => ({
  type: AccountManagementEvents.ADD_ACCOUNT_MEMBER,
  payload: {
    externalUserId,
    role,
    accountId,
  },
});

export const addMemberSucceed = (): AddMemberToAccountSuccessAction => ({
  type: AccountManagementEvents.ADD_ACCOUNT_MEMBER_SUCCESS,
});

export const addMemberFailed = (
  response: Response,
): AddMemberToAccountErrorAction => ({
  type: AccountManagementEvents.ADD_ACCOUNT_MEMBER_ERROR,
  error: response,
  meta: {
    response,
  },
});

export const updateMembersRole = (
  externalUserId: string,
  role: UserRoles,
  prevRole: UserRoles,
  accountId: string,
): UpdateMemberRoleAction => ({
  type: AccountManagementEvents.UPDATE_ACCOUNT_MEMBER,
  payload: {
    externalUserId,
    role,
    prevRole,
    accountId,
  },
});

export const updatedMembersRoleSuccess = (): UpdateMemberRoleSuccessAction => ({
  type: AccountManagementEvents.UPDATE_ACCOUNT_MEMBER_SUCCESS,
});

export const updateMembersRoleError = (
  response: Response,
): UpdateMemberRoleErrorAction => ({
  type: AccountManagementEvents.UPDATE_ACCOUNT_MEMBER_ERROR,
  error: response,
  meta: {
    response,
  },
});

export const setAccountNickname = (
  accountId: string,
  nickname: string,
): SetAccountNickname => ({
  type: AccountManagementEvents.SET_ACCOUNT_NICKNAME,
  payload: {
    accountId,
    nickname,
  },
});

export const createNewAdAccountWithExistingUser = (payload: {
  businessName: string;
  businessType: string;
  industry: string;
  country: string;
}): CreateNewAdAccountWithExistingUser => ({
  type: AccountManagementEvents.CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER,
  payload,
});

export const createNewAdAccountWithExistingUserInProgress = (): CreateNewAdAccountWithExistingUserInProgress => ({
  type:
    AccountManagementEvents.CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_IN_PROGRESS,
});

export const createNewAdAccountWithExistingUserSuccess = (
  payload: InstanceType<typeof NewAdAccountCreationResponse>,
): CreateNewAdAccountWithExistingUserSuccess => ({
  type:
    AccountManagementEvents.CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_SUCCESS,
  payload,
});

export const createNewAdAccountWithExistingUserError = (
  response: Response,
): CreateNewAdAccountWithExistingUserError => ({
  type: AccountManagementEvents.CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_ERROR,
  error: response,
  meta: {
    response,
  },
});

export const createNewAdAccountWithExistingUserReset = (): CreateNewAdAccountWithExistingUserReset => ({
  type: AccountManagementEvents.CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_RESET,
});
