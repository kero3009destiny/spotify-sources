import {
  GET_ALL_USER_PREFERENCES,
  GET_USER_PREFERENCE,
  GET_USER_PREFERENCE_FAILED,
  GET_USER_PREFERENCE_SUCCESS,
  GetUserPreferenceActions,
  RECEIVE_ALL_USER_PREFERENCES,
  RECEIVE_USER_PREFERENCE,
  SET_USER_PREFERENCE,
  SET_USER_PREFERENCE_FAILED,
  SET_USER_PREFERENCE_SUCCESS,
  SetUserPreferenceActions,
  UserPreference,
} from './types';

export interface UserPreferenceState {
  setUserPreferenceValid: boolean;
  getUserPreferenceValid: boolean;
  preferences: TSFixMe;
}

export const defaultUserPreferenceState = {
  setUserPreferenceValid: false,
  getUserPreferenceValid: false,
  preferences: {},
};

export default (
  state: UserPreferenceState = defaultUserPreferenceState,
  action: SetUserPreferenceActions | GetUserPreferenceActions,
) => {
  switch (action.type) {
    case SET_USER_PREFERENCE:
    case SET_USER_PREFERENCE_SUCCESS:
      return {
        ...state,
        setUserPreferenceValid: true,
      };
    case SET_USER_PREFERENCE_FAILED:
      return {
        ...state,
        setUserPreferenceValid: false,
      };

    case GET_USER_PREFERENCE:
    case GET_ALL_USER_PREFERENCES:
    case GET_USER_PREFERENCE_SUCCESS:
      return {
        ...state,
        getUserPreferenceValid: true,
      };
    case GET_USER_PREFERENCE_FAILED:
      return {
        ...state,
        getUserPreferenceValid: false,
      };

    case RECEIVE_ALL_USER_PREFERENCES: {
      const preferencesArray: UserPreference[] = action.payload.preferences;
      const { preferences: currentPreferences } = state;

      const preferences: UserPreference = preferencesArray.reduce(
        (
          newPreferences: UserPreference,
          current: UserPreference,
        ): UserPreference => {
          // @ts-ignore
          newPreferences[current.key] = current.value;
          return newPreferences;
        },
        currentPreferences,
      );
      return {
        ...state,
        preferences,
      };
    }
    case RECEIVE_USER_PREFERENCE: {
      const preference: UserPreference = action.payload.preference;
      const statePreferences: UserPreference = state.preferences;
      // @ts-ignore
      statePreferences[preference.key] = preference.value;
      return {
        ...state,
        preferences: statePreferences,
      };
    }
    default:
      return state;
  }
};
