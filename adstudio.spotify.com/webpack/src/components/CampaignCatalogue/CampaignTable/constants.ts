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
  CampaignColumns,
  CampaignState,
} from 'types/common/state/api/campaigns';

export const defaultColumns: ColumnSelection = {
  [CampaignColumns.NAME]: true,
  [CampaignColumns.STATUS]: true,
  [CampaignColumns.ISSUES]: true,
  [CampaignColumns.IMPRESSIONS]: true,
  [CampaignColumns.CLICK]: true,
  [CampaignColumns.FREQUENCY]: true,
  [CampaignColumns.REACH]: true,
};

export const defaultScmColumns: ColumnSelection = {
  [CampaignColumns.NAME]: true,
  [CampaignColumns.STATUS]: true,
  [CampaignColumns.ISSUES]: true,
  [CampaignColumns.IMPRESSIONS]: true,
  [CampaignColumns.CLICK]: true,
  [CampaignColumns.LISTENERS]: true,
  [CampaignColumns.NEW_LISTENERS]: true,
  [CampaignColumns.REACH]: true,
};

export const defaultActiveAudioColumns: ColumnSelection = {
  [CampaignColumns.NAME]: true,
  [CampaignColumns.STATUS]: true,
  [CampaignColumns.ISSUES]: true,
  [CampaignColumns.AD_LISTENS]: true,
  [CampaignColumns.AD_LISTEN_RATE]: true,
  [CampaignColumns.FREQUENCY_OF_LISTENS]: true,
  [CampaignColumns.REACH]: true,
};

export const defaultScmActiveAudioColumns: ColumnSelection = {
  [CampaignColumns.NAME]: true,
  [CampaignColumns.STATUS]: true,
  [CampaignColumns.ISSUES]: true,
  [CampaignColumns.AD_LISTENS]: true,
  [CampaignColumns.AD_LISTEN_RATE]: true,
  [CampaignColumns.LISTENERS]: true,
  [CampaignColumns.NEW_LISTENERS]: true,
  [CampaignColumns.FREQUENCY]: true,
  [CampaignColumns.FREQUENCY_OF_LISTENS]: true,
  [CampaignColumns.REACH]: true,
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
  ISSUES_HEADER: 'ISSUES_HEADER',
  CLICKS_CELL: 'CLICKS_CELL',
  CLICKS_HEADER: 'CLICKS_HEADER',
  ISSUES_CELL: 'ISSUES_CELL',
  LISTENERS_CELL: 'LISTENERS_CELL',
  LISTENERS_HEADER: 'LISTENERS_HEADER',
  SECONDARY_ACTION_EDIT: 'CAMPAIGN_ACTION_EDIT',
  NAME_CELL: 'campaign-table-row-name-cell',
};

export const CAMPAIGN_STATUS_MAP: Option[] = [
  { key: CampaignState.ACTIVE, value: STATUS_TEXT_MAP[CampaignState.ACTIVE] },
  {
    key: CampaignState.STOPPED,
    value: STATUS_TEXT_MAP[CampaignState.STOPPED],
  },
  { key: CampaignState.PAUSED, value: STATUS_TEXT_MAP[CampaignState.PAUSED] },
];
