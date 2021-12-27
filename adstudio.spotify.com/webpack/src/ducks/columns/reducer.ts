import {
  SELECTED_CAMPAIGN_COLUMNS,
  SELECTED_CREATIVE_COLUMNS,
  SELECTED_FLIGHT_COLUMNS,
} from './constants';

import {
  ColumnState,
  INITIALIZE_COLUMNS_SELECTION,
  InitializeColumnsSelectionAction,
  UPDATE_COLUMNS_SELECTION,
  UpdateColumnsSelectionAction,
} from './types';

export const defaultColumnState: ColumnState = {
  [SELECTED_CAMPAIGN_COLUMNS]: {},
  [SELECTED_FLIGHT_COLUMNS]: {},
  [SELECTED_CREATIVE_COLUMNS]: {},
};

export default function columns(
  state: ColumnState = defaultColumnState,
  action: InitializeColumnsSelectionAction | UpdateColumnsSelectionAction,
): ColumnState {
  switch (action.type) {
    case INITIALIZE_COLUMNS_SELECTION:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_COLUMNS_SELECTION:
      return {
        ...state,
        [action.payload.columnOptionType]: action.payload.selection,
      };

    default:
      return state;
  }
}
