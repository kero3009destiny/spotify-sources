import { Action } from 'redux';

import { NewAdAccountCreationResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adaccountservice/service/NewAdAccountCreationResponse';

import { AdAccountNickname } from 'ducks/accounts/types';

import { FetchErrorAction } from 'utils/asyncDucksHelpers';

export const NICKNAMES_KEY = 'NICKNAMES';

export enum AccountManagementEvents {
  GET_ACCOUNT_MEMBERS = 'GET_ACCOUNT_MEMBERS',
  GET_ACCOUNT_MEMBERS_ERROR = 'GET_ACCOUNT_MEMBERS_ERROR',
  GET_ACCOUNT_MEMBERS_SUCCESS = 'GET_ACCOUNT_MEMBERS_SUCCESS',
  ADD_ACCOUNT_MEMBER = 'ADD_ACCOUNT_MEMBER',
  ADD_ACCOUNT_MEMBER_ERROR = 'ADD_ACCOUNT_MEMBER_ERROR',
  ADD_ACCOUNT_MEMBER_SUCCESS = 'ADD_ACCOUNT_MEMBER_SUCCESS',
  UPDATE_ACCOUNT_MEMBER = 'UPDATE_ACCOUNT_MEMBER',
  UPDATE_ACCOUNT_MEMBER_ERROR = 'UPDATE_ACCOUNT_MEMBER',
  UPDATE_ACCOUNT_MEMBER_SUCCESS = 'UPDATE_ACCOUNT_MEMBER_SUCCESS',
  REMOVE_ACCOUNT_MEMBER = 'REMOVE_ACCOUNT_MEMBER',
  REMOVE_ACCOUNT_MEMBER_ERROR = 'REMOVE_ACCOUNT_MEMBER_ERROR',
  REMOVE_ACCOUNT_MEMBER_SUCCESS = 'REMOVE_ACCOUNT_MEMBER_SUCCESS',
  SET_ACCOUNT_NICKNAME = 'SET_ACCOUNT_NICKNAME',
  GET_ACCOUNTS_NICKNAMES = 'GET_ACCOUNTS_NICKNAMES',
  CHANGE_ACCOUNT_OWNER = 'CHANGE_ACCOUNT_OWNER',
  CHANGE_ACCOUNT_OWNER_ERROR = 'CHANGE_ACCOUNT_OWNER_ERROR',
  CHANGE_ACCOUNT_OWNER_SUCCESS = 'CHANGE_ACCOUNT_OWNER_SUCCESS',
  CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER = 'CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER',
  CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_IN_PROGRESS = 'CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_IN_PROGRESS',
  CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_SUCCESS = 'CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_SUCCESS',
  CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_ERROR = 'CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_ERROR',
  CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_RESET = 'CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_RESET',
}

export enum UserRoles {
  admin = 'admin',
  contributor = 'contributor',
  viewer = 'viewer',
  all = 'all',
}

export type UserInfo = {
  firstName: string;
  externalUserId: string;
  isOwner?: boolean;
  lastName: string;
  role: UserRoles;
};

// Retrieve
export interface GetAccountMembersAction extends Action {
  type: typeof AccountManagementEvents.GET_ACCOUNT_MEMBERS;
  payload: {
    accountId: string;
  };
}

export interface GetAccountMembersSucceedAction extends Action {
  type: typeof AccountManagementEvents.GET_ACCOUNT_MEMBERS_SUCCESS;
  payload: {
    users: UserInfo[];
  };
}
export interface GetAccountMembersErrorAction extends FetchErrorAction {
  type: typeof AccountManagementEvents.GET_ACCOUNT_MEMBERS_ERROR;
}

// Update Member Role

export interface UpdateMemberRoleAction extends Action {
  type: AccountManagementEvents.UPDATE_ACCOUNT_MEMBER;
  payload: {
    externalUserId: UserInfo['externalUserId'];
    role: UserRoles;
    prevRole: UserRoles;
    accountId: string;
  };
}
export interface UpdateMemberRoleSuccessAction extends Action {
  type: AccountManagementEvents.UPDATE_ACCOUNT_MEMBER_SUCCESS;
}
export interface UpdateMemberRoleErrorAction extends FetchErrorAction {
  type: AccountManagementEvents.UPDATE_ACCOUNT_MEMBER_ERROR;
}

// Add & Search for

export interface AddMemberToAccountAction extends Action {
  type: AccountManagementEvents.ADD_ACCOUNT_MEMBER;
  payload: {
    externalUserId: UserInfo['externalUserId'];
    role: UserRoles;
    accountId: string;
  };
}
export interface AddMemberToAccountSuccessAction extends Action {
  type: AccountManagementEvents.ADD_ACCOUNT_MEMBER_SUCCESS;
}
export interface AddMemberToAccountErrorAction extends FetchErrorAction {
  type: AccountManagementEvents.ADD_ACCOUNT_MEMBER_ERROR;
}

// Remove

export interface RemoveMemberFromAccountAction extends Action {
  type: AccountManagementEvents.REMOVE_ACCOUNT_MEMBER;
  payload: {
    externalUserId: UserInfo['externalUserId'];
    role: UserRoles;
    accountId: string;
  };
}
export interface RemoveMemberFromAccountSucceedAction extends Action {
  type: AccountManagementEvents.REMOVE_ACCOUNT_MEMBER_SUCCESS;
}
export interface RemoveMemberFromAccountErrorAction extends FetchErrorAction {
  type: AccountManagementEvents.REMOVE_ACCOUNT_MEMBER_ERROR;
}

// Change ownership

export interface ChangeAccountOwnerAction extends Action {
  type: AccountManagementEvents.CHANGE_ACCOUNT_OWNER;
  payload: {
    externalUserId: UserInfo['externalUserId'];
    accountId: string;
  };
}
export interface ChangeAccountOwnerSucceedAction extends Action {
  type: AccountManagementEvents.CHANGE_ACCOUNT_OWNER_SUCCESS;
}
export interface ChangeAccountOwnerErrorAction extends FetchErrorAction {
  type: AccountManagementEvents.CHANGE_ACCOUNT_OWNER_ERROR;
}

// Nicknames

export interface SetAccountNickname extends Action {
  type: AccountManagementEvents.SET_ACCOUNT_NICKNAME;
  payload: {
    accountId: string;
    nickname: string;
  };
}

export interface GetAccountNicknames extends Action {
  type: AccountManagementEvents.GET_ACCOUNTS_NICKNAMES;
  payload: AdAccountNickname[];
}

export interface CreateNewAdAccountWithExistingUser extends Action {
  type: AccountManagementEvents.CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER;
  payload: {
    businessName: string;
    businessType: string;
    industry: string;
    country: string;
  };
}
export interface CreateNewAdAccountWithExistingUserInProgress extends Action {
  type: AccountManagementEvents.CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_IN_PROGRESS;
}
export interface CreateNewAdAccountWithExistingUserSuccess extends Action {
  type: AccountManagementEvents.CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_SUCCESS;
  payload: InstanceType<typeof NewAdAccountCreationResponse>;
}
export interface CreateNewAdAccountWithExistingUserError
  extends FetchErrorAction {
  type: AccountManagementEvents.CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_ERROR;
}
export interface CreateNewAdAccountWithExistingUserReset extends Action {
  type: AccountManagementEvents.CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_RESET;
}

export type AccountNicknameType = GetAccountNicknames | SetAccountNickname;

export type GetAccountMembersType =
  | GetAccountMembersAction
  | GetAccountMembersSucceedAction
  | GetAccountMembersErrorAction;

export type RemoveMemberFromAccountType =
  | RemoveMemberFromAccountAction
  | RemoveMemberFromAccountSucceedAction
  | RemoveMemberFromAccountErrorAction;

export type ChangeAccountOwnerType =
  | ChangeAccountOwnerAction
  | ChangeAccountOwnerSucceedAction
  | ChangeAccountOwnerErrorAction;

export type AddMemberToAccountType =
  | AddMemberToAccountAction
  | AddMemberToAccountSuccessAction
  | AddMemberToAccountErrorAction;

export type UpdateMemberRoleType =
  | UpdateMemberRoleAction
  | UpdateMemberRoleSuccessAction
  | UpdateMemberRoleErrorAction;

export type AccountManagementTypes =
  | GetAccountMembersType
  | UpdateMemberRoleType
  | RemoveMemberFromAccountType
  | ChangeAccountOwnerType
  | AddMemberToAccountType
  | AccountNicknameType
  | CreateNewAdAccountWithExistingUser
  | CreateNewAdAccountWithExistingUserInProgress
  | CreateNewAdAccountWithExistingUserSuccess
  | CreateNewAdAccountWithExistingUserError
  | CreateNewAdAccountWithExistingUserReset;
