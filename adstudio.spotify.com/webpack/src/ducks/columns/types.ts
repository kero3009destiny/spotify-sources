import {
  ACCOUNT_COLUMNS_ACTIVE_AUDIO,
  ACCOUNT_COLUMNS_BASE,
  ACCOUNT_COLUMNS_SCM,
  ACCOUNT_COLUMNS_SCM_ACTIVE_AUDIO,
  SELECTED_CAMPAIGN_COLUMNS,
  SELECTED_CREATIVE_COLUMNS,
  SELECTED_FLIGHT_COLUMNS,
} from './constants';

export const INITIALIZE_COLUMNS_SELECTION = 'INITIALIZE_COLUMNS_SELECTION';
export const UPDATE_COLUMNS_SELECTION = 'UPDATE_COLUMNS_SELECTION';

export interface ColumnState {
  [SELECTED_CAMPAIGN_COLUMNS]: ColumnSelection;
  [SELECTED_FLIGHT_COLUMNS]: ColumnSelection;
  [SELECTED_CREATIVE_COLUMNS]: ColumnSelection;
}

export interface ColumnSelection {
  LISTENS?: boolean;
  LISTENS_RATE?: boolean;
  LISTENS_AVERAGE_FREQUENCY?: boolean;
  ADS_SERVED?: boolean;
  ADS_SERVED_REACH?: boolean;
  ADS_SERVED_AVERAGE_FREQUENCY?: boolean;
  CLICKS?: boolean;
  COST_MODEL?: boolean;
  NAME?: boolean;
  STATUS?: boolean;
  START_DATE?: boolean;
  END_DATE?: boolean;
  BUDGET?: boolean;
  IMPRESSIONS?: boolean;
  BUDGET_SPENT?: boolean;
  PACING?: boolean;
  FREQUENCY?: boolean;
  FREQUENCY_OF_LISTENS?: boolean;
  REACH?: boolean;
  LISTENS_REACH?: boolean;
  CLICK?: boolean;
  CTR?: boolean;
  COMPLETION_RATE?: boolean;
  AD_LISTENS?: boolean;
  AD_LISTEN_RATE?: boolean;
  LISTENERS?: boolean;
  NEW_LISTENERS?: boolean;
  INTENT_RATE?: boolean;
  NEW_LISTENER_CONVERSION_RATE?: boolean;
  LISTENER_CONVERSION_RATE?: boolean;
  AVERAGE_STREAMS_PER_LISTENER?: boolean;
  AVERAGE_STREAMS_PER_NEW_LISTENER?: boolean;
  ISSUES?: boolean;
  FORMAT?: boolean;
  FIRST_QUARTILE?: boolean;
  SECOND_QUARTILE?: boolean;
  THIRD_QUARTILE?: boolean;
  FOURTH_QUARTILE?: boolean;
  PLACEMENT?: boolean;
  EXTERNAL_IMPRESSIONS?: boolean;
}

export type ColumnOptionType =
  | typeof SELECTED_CAMPAIGN_COLUMNS
  | typeof SELECTED_FLIGHT_COLUMNS
  | typeof SELECTED_CREATIVE_COLUMNS;

export type AccountColumnVariant =
  | typeof ACCOUNT_COLUMNS_BASE
  | typeof ACCOUNT_COLUMNS_SCM
  | typeof ACCOUNT_COLUMNS_ACTIVE_AUDIO
  | typeof ACCOUNT_COLUMNS_SCM_ACTIVE_AUDIO;

export interface SelectedColumns {
  columnOptionType: ColumnOptionType;
  selection: ColumnSelection;
}

export interface InitializeColumnsSelectionAction {
  type: typeof INITIALIZE_COLUMNS_SELECTION;
  payload: ColumnState;
}

export interface UpdateColumnsSelectionAction {
  type: typeof UPDATE_COLUMNS_SELECTION;
  payload: SelectedColumns;
}
