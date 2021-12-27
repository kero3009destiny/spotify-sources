import {
  ColumnOptionType,
  ColumnSelection,
  ColumnState,
  INITIALIZE_COLUMNS_SELECTION,
  InitializeColumnsSelectionAction,
  UPDATE_COLUMNS_SELECTION,
  UpdateColumnsSelectionAction,
} from './types';

// Called as a side effect of SELECT_ACCOUNT_ID action. Hydrates column state
// with defaults for the chosen account or saved preferences
export function initializeColumnsSelection(
  columnState: ColumnState,
): InitializeColumnsSelectionAction {
  return {
    type: INITIALIZE_COLUMNS_SELECTION,
    payload: columnState,
  };
}

// Called by the modal and explicitly saves the column selection via accountPreferences
export function updateColumnsSelection(
  selection: ColumnSelection,
  columnOptionType: ColumnOptionType,
): UpdateColumnsSelectionAction {
  return {
    type: UPDATE_COLUMNS_SELECTION,
    payload: { selection, columnOptionType },
  };
}
