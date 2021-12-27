import { SELECTED_LOCALE } from 'ducks/account/constants';

import * as types from './types';

export default (
  state = {},
  action: types.ChangeLanguageAction | types.ChangeLanguageSuccessAction,
) => {
  switch (action.type) {
    case types.CHANGE_LANGUAGE_SUCCESS:
      return {
        ...state,
        [SELECTED_LOCALE]: action.payload.lang,
        langLastChanged: action.payload.timestamp,
      };
    default:
      return state;
  }
};
