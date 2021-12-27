import { AccountColumnVariant, ColumnSelection } from 'ducks/columns/types';

import { Option } from 'components/common/CampaignHierarchy/Filters/StatusDropdown';
import { STATUS_TEXT_MAP } from 'components/common/CampaignHierarchy/StatusIndicator/constants';

import {
  ACCOUNT_COLUMNS_ACTIVE_AUDIO,
  ACCOUNT_COLUMNS_BASE,
  ACCOUNT_COLUMNS_SCM,
  ACCOUNT_COLUMNS_SCM_ACTIVE_AUDIO,
} from 'ducks/columns/constants';

import {
  CreativeColumns,
  CreativeState,
  FlightLinkState,
} from 'types/common/state/api/creatives';

export const defaultColumns: ColumnSelection = {
  [CreativeColumns.NAME]: true,
  [CreativeColumns.STATUS]: true,
  [CreativeColumns.FORMAT]: true,
  [CreativeColumns.IMPRESSIONS]: true,
  [CreativeColumns.CLICK]: true,
  [CreativeColumns.CTR]: true,
  [CreativeColumns.COMPLETION_RATE]: true,
  [CreativeColumns.FREQUENCY]: true,
  [CreativeColumns.REACH]: true,
  [CreativeColumns.FIRST_QUARTILE]: true,
  [CreativeColumns.SECOND_QUARTILE]: true,
  [CreativeColumns.THIRD_QUARTILE]: true,
  [CreativeColumns.FOURTH_QUARTILE]: true,
};

export const defaultScmColumns: ColumnSelection = {
  [CreativeColumns.NAME]: true,
  [CreativeColumns.STATUS]: true,
  [CreativeColumns.FORMAT]: true,
  [CreativeColumns.IMPRESSIONS]: true,
  [CreativeColumns.CLICK]: true,
  [CreativeColumns.CTR]: true,
  [CreativeColumns.COMPLETION_RATE]: true,
  [CreativeColumns.LISTENERS]: true,
  [CreativeColumns.NEW_LISTENERS]: true,
  [CreativeColumns.FREQUENCY]: true,
  [CreativeColumns.REACH]: true,
  [CreativeColumns.FIRST_QUARTILE]: true,
  [CreativeColumns.SECOND_QUARTILE]: true,
  [CreativeColumns.THIRD_QUARTILE]: true,
  [CreativeColumns.FOURTH_QUARTILE]: true,
};

export const defaultActiveAudioColumns: ColumnSelection = {
  [CreativeColumns.NAME]: true,
  [CreativeColumns.STATUS]: true,
  [CreativeColumns.FORMAT]: true,
  [CreativeColumns.CLICK]: true,
  [CreativeColumns.CTR]: true,
  [CreativeColumns.AD_LISTENS]: true,
  [CreativeColumns.AD_LISTEN_RATE]: true,
  [CreativeColumns.REACH]: true,
  [CreativeColumns.FREQUENCY_OF_LISTENS]: true,
};

export const defaultScmActiveAudioColumns: ColumnSelection = {
  [CreativeColumns.NAME]: true,
  [CreativeColumns.STATUS]: true,
  [CreativeColumns.FORMAT]: true,
  [CreativeColumns.CLICK]: true,
  [CreativeColumns.CTR]: true,
  [CreativeColumns.AD_LISTENS]: true,
  [CreativeColumns.AD_LISTEN_RATE]: true,
  [CreativeColumns.LISTENERS]: true,
  [CreativeColumns.NEW_LISTENERS]: true,
  [CreativeColumns.FREQUENCY]: true,
  [CreativeColumns.FREQUENCY_OF_LISTENS]: true,
  [CreativeColumns.REACH]: true,
  [CreativeColumns.LISTENS_REACH]: true,
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
  ASSOCIATION_CELL: 'ASSOCIATION_CELL',
  STATUS_HEADER: 'STATUS_HEADER',
  CLICKS_CELL: 'CLICKS_CELL',
  CLICKS_HEADER: 'CLICKS_HEADER',
  BUDGET_SPENT_CELL: 'BUDGET_SPENT_CELL',
  BUDGET_SPENT_HEADER: 'BUDGET_SPENT_HEADER',
  LISTENERS_CELL: 'LISTENERS_CELL',
  LISTENERS_HEADER: 'LISTENERS_HEADER',
  QUARTILE_CELL: 'QUARTILE_CELL',
  QUARTILE_HEADER: 'QUARTILE_HEADER',
  COMPLETION_RATE_CELL: 'COMPLETION_RATE_CELL',
  COMPLETION_RATE_HEADER: 'COMPLETION_RATE_HEADER',
  LISTEN_RATE_CELL: 'LISTEN_RATE_CELL',
  LISTEN_RATE_HEADER: 'LISTEN_RATE_HEADER',
};

export const CREATIVE_STATUS_MAP: Option[] = [
  { key: CreativeState.ACTIVE, value: STATUS_TEXT_MAP[CreativeState.ACTIVE] },
  {
    key: CreativeState.STOPPED,
    value: STATUS_TEXT_MAP[CreativeState.STOPPED],
  },
  {
    key: CreativeState.PROCESSING,
    value: STATUS_TEXT_MAP[CreativeState.PROCESSING],
  },
  {
    key: CreativeState.PENDING_APPROVAL,
    value: STATUS_TEXT_MAP[CreativeState.PENDING_APPROVAL],
  },
  {
    key: CreativeState.APPROVED,
    value: STATUS_TEXT_MAP[CreativeState.APPROVED],
  },
  {
    key: CreativeState.REJECTED,
    value: STATUS_TEXT_MAP[CreativeState.REJECTED],
  },
];

export const FLIGHT_LINK_TOGGLE_STATUSES = [
  FlightLinkState.ACTIVE,
  FlightLinkState.PAUSED,
];
