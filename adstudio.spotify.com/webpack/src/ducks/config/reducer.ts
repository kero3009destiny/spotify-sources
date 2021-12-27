import {
  AD_STUDIO_CONFIG_SUCCESS,
  ConfigAction,
  ConfigEntry,
} from 'ducks/config/types';
import { SET_USER_DATA } from 'ducks/user/types';

import { mapConfig } from './mappers';

import { CONFIG_ENTRIES } from 'config/config';

export default function config(
  state: ConfigEntry[] = [],
  action: ConfigAction,
) {
  switch (action.type) {
    case SET_USER_DATA:
      return [...state, ...CONFIG_ENTRIES];
    case AD_STUDIO_CONFIG_SUCCESS:
      return action.payload ? [...state, ...mapConfig(action.payload)] : state;
    default:
      return state;
  }
}
