import get from 'lodash/get';

import { CHANGE_ACCOUNT } from 'ducks/account/types';
import {
  RECEIVE_ALL_USER_PREFERENCES,
  ReceiveAllUserPreferenceAction,
} from 'ducks/userPreferences/types';
import { ChangeAccountAction } from 'ducks/account/actions';

import { mapAccountAccesses, mapAccountChange } from './mappers';

import {
  AccountManagementEvents,
  AccountManagementTypes,
  UserInfo,
} from './types';

export const createAccountDefaultState = {
  createAccountInProgress: false,
  createAccountSuccess: false,
  createAccountNewId: '',
  createAccountError: false,
  createAccountErrorMessage: '',
};

export interface IAccountManagementState {
  requestingUsers: boolean;
  users: UserInfo[];
  changeRequest: boolean;
  accessedAccounts: object;
}

export const defaultAccountManagementState = {
  requestingUsers: false,
  users: [],
  changeRequest: true,
  accessedAccounts: {},
  ...createAccountDefaultState,
};

export default (
  state: IAccountManagementState = defaultAccountManagementState,
  action:
    | AccountManagementTypes
    | ReceiveAllUserPreferenceAction
    | ChangeAccountAction,
) => {
  switch (action.type) {
    case AccountManagementEvents.GET_ACCOUNT_MEMBERS:
      return { ...state, requestingUsers: true };
    case AccountManagementEvents.GET_ACCOUNT_MEMBERS_SUCCESS:
      return { ...state, requestingUsers: true, users: action.payload.users };
    case AccountManagementEvents.GET_ACCOUNT_MEMBERS_ERROR:
      return { ...state, requestingUsers: false };

    case AccountManagementEvents.ADD_ACCOUNT_MEMBER_SUCCESS:
    case AccountManagementEvents.REMOVE_ACCOUNT_MEMBER_SUCCESS:
    case AccountManagementEvents.CHANGE_ACCOUNT_OWNER_SUCCESS:
    case AccountManagementEvents.UPDATE_ACCOUNT_MEMBER_SUCCESS:
      return { ...state, changeRequest: true };

    case AccountManagementEvents.ADD_ACCOUNT_MEMBER_ERROR:
    case AccountManagementEvents.REMOVE_ACCOUNT_MEMBER_ERROR:
    case AccountManagementEvents.CHANGE_ACCOUNT_OWNER_ERROR:
    case AccountManagementEvents.UPDATE_ACCOUNT_MEMBER_ERROR:
      return { ...state, changeRequest: false };

    // Every time we change an ad account, increment the count for that ad account
    case CHANGE_ACCOUNT:
      return {
        ...state,
        accessedAccounts: mapAccountChange(state, get(action, 'payload', '')),
      };

    // Initialize our count of accessed ad accounts from the user preference
    case RECEIVE_ALL_USER_PREFERENCES:
      return {
        ...state,
        // Merge whatever we got from the b/e into the current object
        accessedAccounts: mapAccountAccesses(
          state,
          get(action, 'payload', { preferences: [] }),
        ),
      };

    case AccountManagementEvents.CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_IN_PROGRESS:
      return { ...state, createAccountInProgress: true };

    case AccountManagementEvents.CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_SUCCESS:
      return {
        ...state,
        createAccountInProgress: false,
        createAccountSuccess: true,
        createAccountNewId: get(action, 'payload.adAccountId', ''),
      };

    case AccountManagementEvents.CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_ERROR:
      return {
        ...state,
        createAccountInProgress: false,
        createAccountSuccess: false,
        createAccountError: true,
        createAccountErrorMessage: action.payload,
      };

    case AccountManagementEvents.CREATE_NEW_AD_ACCOUNT_WITH_EXISTING_USER_RESET:
      return {
        ...state,
        ...createAccountDefaultState,
      };

    default:
      return state;
  }
};
