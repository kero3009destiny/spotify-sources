import { AccountColumnVariant, ColumnSelection } from 'ducks/columns/types';

import { Option } from 'components/common/CampaignHierarchy/Filters/StatusDropdown';
import { getStatusText } from 'components/common/CampaignHierarchy/StatusIndicator/constants';

import {
  ACCOUNT_COLUMNS_ACTIVE_AUDIO,
  ACCOUNT_COLUMNS_BASE,
  ACCOUNT_COLUMNS_SCM,
  ACCOUNT_COLUMNS_SCM_ACTIVE_AUDIO,
} from 'ducks/columns/constants';

import {
  CostType,
  FlightColumns,
  FlightState,
} from 'types/common/state/api/flights';
import { Format, FormatType } from 'types/common/state/api/format';

export const defaultColumns: ColumnSelection = {
  [FlightColumns.NAME]: true,
  [FlightColumns.STATUS]: true,
  [FlightColumns.FORMAT]: true,
  [FlightColumns.COST_MODEL]: true,
  [FlightColumns.IMPRESSIONS]: true,
  [FlightColumns.CLICK]: true,
  [FlightColumns.CTR]: true,
  [FlightColumns.COMPLETION_RATE]: true,
  [FlightColumns.START_DATE]: true,
  [FlightColumns.END_DATE]: true,
  [FlightColumns.PACING]: true,
  [FlightColumns.FREQUENCY]: true,
  [FlightColumns.REACH]: true,
  [FlightColumns.BUDGET]: true,
  [FlightColumns.BUDGET_SPENT]: true,
};

export const defaultScmColumns: ColumnSelection = {
  [FlightColumns.NAME]: true,
  [FlightColumns.STATUS]: true,
  [FlightColumns.FORMAT]: true,
  [FlightColumns.COST_MODEL]: true,
  [FlightColumns.IMPRESSIONS]: true,
  [FlightColumns.CLICK]: true,
  [FlightColumns.CTR]: true,
  [FlightColumns.COMPLETION_RATE]: true,
  [FlightColumns.LISTENERS]: true,
  [FlightColumns.NEW_LISTENERS]: true,
  [FlightColumns.START_DATE]: true,
  [FlightColumns.END_DATE]: true,
  [FlightColumns.PACING]: true,
  [FlightColumns.FREQUENCY]: true,
  [FlightColumns.REACH]: true,
  [FlightColumns.BUDGET]: true,
  [FlightColumns.INTENT_RATE]: true,
  [FlightColumns.BUDGET_SPENT]: true,
  [FlightColumns.NEW_LISTENER_CONVERSION_RATE]: true,
  [FlightColumns.LISTENER_CONVERSION_RATE]: true,
  [FlightColumns.AVERAGE_STREAMS_PER_LISTENER]: true,
  [FlightColumns.AVERAGE_STREAMS_PER_NEW_LISTENER]: true,
};

export const defaultActiveAudioColumns: ColumnSelection = {
  [FlightColumns.NAME]: true,
  [FlightColumns.STATUS]: true,
  [FlightColumns.FORMAT]: true,
  [FlightColumns.COST_MODEL]: true,
  [FlightColumns.CLICK]: true,
  [FlightColumns.CTR]: true,
  [FlightColumns.AD_LISTENS]: true,
  [FlightColumns.AD_LISTEN_RATE]: true,
  [FlightColumns.START_DATE]: true,
  [FlightColumns.END_DATE]: true,
  [FlightColumns.PACING]: true,
  [FlightColumns.FREQUENCY]: true,
  [FlightColumns.REACH]: true,
  [FlightColumns.LISTENS_REACH]: true,
  [FlightColumns.BUDGET]: true,
  [FlightColumns.BUDGET_SPENT]: true,
};

export const defaultScmActiveAudioColumns: ColumnSelection = {
  [FlightColumns.NAME]: true,
  [FlightColumns.STATUS]: true,
  [FlightColumns.FORMAT]: true,
  [FlightColumns.COST_MODEL]: true,
  [FlightColumns.CLICK]: true,
  [FlightColumns.CTR]: true,
  [FlightColumns.AD_LISTENS]: true,
  [FlightColumns.AD_LISTEN_RATE]: true,
  [FlightColumns.LISTENERS]: true,
  [FlightColumns.NEW_LISTENERS]: true,
  [FlightColumns.START_DATE]: true,
  [FlightColumns.END_DATE]: true,
  [FlightColumns.PACING]: true,
  [FlightColumns.REACH]: true,
  [FlightColumns.BUDGET]: true,
  [FlightColumns.INTENT_RATE]: true,
  [FlightColumns.BUDGET_SPENT]: true,
  [FlightColumns.LISTENS_REACH]: true,
  [FlightColumns.NEW_LISTENER_CONVERSION_RATE]: true,
  [FlightColumns.LISTENER_CONVERSION_RATE]: true,
  [FlightColumns.AVERAGE_STREAMS_PER_LISTENER]: true,
  [FlightColumns.AVERAGE_STREAMS_PER_NEW_LISTENER]: true,
};

export const defaultColumnVariants: Record<
  AccountColumnVariant,
  ColumnSelection
> = {
  [ACCOUNT_COLUMNS_BASE]: defaultColumns,
  [ACCOUNT_COLUMNS_SCM]: defaultScmColumns,
  [ACCOUNT_COLUMNS_ACTIVE_AUDIO]: defaultActiveAudioColumns,
  [ACCOUNT_COLUMNS_SCM_ACTIVE_AUDIO]: defaultScmActiveAudioColumns,
};

export const TEST_IDS: Record<string, string> = {
  STATUS_CELL: 'STATUS_CELL',
  STATUS_HEADER: 'STATUS_HEADER',
  CLICKS_CELL: 'CLICKS_CELL',
  CLICKS_HEADER: 'CLICKS_HEADER',
  BUDGET_CELL: 'BUDGET_CELL',
  BUDGET_HEADER: 'BUDGET_HEADER',
  START_DATE_CELL: 'START_DATE_CELL',
  START_DATE_HEADER: 'START_DATE_HEADER',
  END_DATE_CELL: 'END_DATE_CELL',
  END_DATE_HEADER: 'END_DATE_HEADER',
  FIRST_QUARTILE_CELL: 'FIRST_QUARTILE_CELL',
  FIRST_QUARTILE_HEADER: 'FIRST_QUARTILE_HEADER',
  COMPLETION_RATE_CELL: 'COMPLETION_RATE_CELL',
  COMPLETION_RATE_HEADER: 'COMPLETION_RATE_HEADER',
  LISTEN_RATE_CELL: 'LISTEN_RATE_CELL',
  LISTEN_RATE_HEADER: 'LISTEN_RATE_HEADER',
  LISTENER_CONVERSION_RATE_HEADER: 'LISTENER_CONVERSION_RATE_HEADER',
  NEW_LISTENER_CONVERSION_RATE_HEADER: 'NEW_LISTENER_CONVERSION_RATE_HEADER',
  LISTENER_CONVERSION_RATE_CELL: 'LISTENER_CONVERSION_RATE_CELL',
  NEW_LISTENER_CONVERSION_RATE_CELL: 'NEW_LISTENER_CONVERSION_RATE_CELL',
  FREQUENCY_OF_LISTENS_HEADER: 'FREQUENCY_OF_LISTENS_HEADER',
  FREQUENCY_OF_LISTENS_CELL: 'FREQUENCY_OF_LISTENS_CELL',
  PLACEMENT_HEADER: 'PLACEMENT_HEADER',
  PLACEMENT_CELL: 'PLACEMENT_CELL',
  COST_MODEL_HEADER: 'COST_MODEL_HEADER',
  COST_MODEL_CELL: 'COST_MODEL_CELL',
};

export const FLIGHT_STATUS_MAP: Option[] = [
  {
    key: FlightState.ACTIVE,
    value: getStatusText(FlightState.ACTIVE),
  },
  {
    key: FlightState.READY,
    value: getStatusText(FlightState.READY),
  },
  {
    key: FlightState.COMPLETED,
    value: getStatusText(FlightState.COMPLETED),
  },
  {
    key: FlightState.STOPPED,
    value: getStatusText(FlightState.STOPPED),
  },
  {
    key: FlightState.PENDING_APPROVAL,
    value: getStatusText(FlightState.PENDING_APPROVAL),
  },
  {
    key: FlightState.REJECTED,
    value: getStatusText(FlightState.REJECTED),
  },
];

export const getCostModel = (costType: CostType, format: FormatType) => {
  return format === Format.VIDEO && costType === CostType.CPCL
    ? CostType.CPCV
    : costType;
};
