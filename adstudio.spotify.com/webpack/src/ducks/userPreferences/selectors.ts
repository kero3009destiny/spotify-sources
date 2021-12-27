import get from 'lodash/get';

import * as types from './types';

export const getAllUserPreferences = (
  state: types.UserPreferenceState,
): types.UserPreference[] => get(state, 'userPreferences.preferences');

export const getUserPreference = (
  state: types.UserPreferenceState,
  key: string,
): any => get(getAllUserPreferences(state), key);
