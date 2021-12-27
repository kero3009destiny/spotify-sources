import {
  ApiQueryParams,
  Paging,
  BffSortDirection,
  DateFilterParams,
} from './index';
import { com as CampaignStateRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CampaignState';
import { Stats } from './flush';
import { BffFlightState } from 'types/common/state/api/flights';
import {
  BffHierarchyColumns,
  HierarchyColumns,
  BffCampaignSort,
} from './hierarchycolumns';

export type BffCampaignState = CampaignStateRoot.spotify.adstudiobff.proto.CampaignState.Status;

export const CampaignState: Record<BffCampaignState, BffCampaignState> = {
  ACTIVE: 'ACTIVE',
  STOPPED: 'STOPPED',
  PAUSED: 'PAUSED',
  UNKNOWN: 'UNKNOWN',
};

export enum CampaignColumns {
  NAME = 'NAME', // Details
  STATUS = 'STATUS', // Details
  ISSUES = 'ISSUES', // Details
  IMPRESSIONS = 'IMPRESSIONS', // Delivery
  FREQUENCY = 'FREQUENCY', // Delivery
  FREQUENCY_OF_LISTENS = 'FREQUENCY_OF_LISTENS', // Delivery
  REACH = 'REACH', // Delivery
  CLICK = 'CLICK', // Performance
  CTR = 'CTR', // Performance
  AD_LISTENS = 'AD_LISTENS', // Performance
  AD_LISTEN_RATE = 'AD_LISTEN_RATE', // Performance
  LISTENERS = 'LISTENERS', // Artist Results
  NEW_LISTENERS = 'NEW_LISTENERS', // Artist Results
  INTENT_RATE = 'INTENT_RATE', // Artist Results
  EXTERNAL_IMPRESSIONS = 'EXTERNAL_IMPRESSIONS', // Delivery
}

export const ExportColumns: Record<
  CampaignColumns,
  BffHierarchyColumns | undefined
> = {
  [CampaignColumns.NAME]: HierarchyColumns.CAMPAIGN_NAME,
  [CampaignColumns.STATUS]: undefined,
  [CampaignColumns.ISSUES]: undefined,
  [CampaignColumns.IMPRESSIONS]: HierarchyColumns.ADS_SERVED,
  [CampaignColumns.EXTERNAL_IMPRESSIONS]: HierarchyColumns.EXTERNAL_IMPRESSIONS,
  [CampaignColumns.FREQUENCY]: HierarchyColumns.ADS_SERVED_AVERAGE_FREQUENCY,
  [CampaignColumns.FREQUENCY_OF_LISTENS]:
    HierarchyColumns.LISTENS_AVERAGE_FREQUENCY,
  [CampaignColumns.REACH]: HierarchyColumns.ADS_SERVED_REACH,
  [CampaignColumns.CLICK]: HierarchyColumns.CLICKS,
  [CampaignColumns.CTR]: HierarchyColumns.CTR,
  [CampaignColumns.AD_LISTENS]: HierarchyColumns.LISTENS,
  [CampaignColumns.AD_LISTEN_RATE]: HierarchyColumns.LISTENS_RATE,
  [CampaignColumns.LISTENERS]: HierarchyColumns.LISTENERS,
  [CampaignColumns.NEW_LISTENERS]: HierarchyColumns.NEW_LISTENERS,
  [CampaignColumns.INTENT_RATE]: HierarchyColumns.INTENT_RATE,
};

export interface CampaignsQueryParams extends ApiQueryParams, DateFilterParams {
  sortDirection?: BffSortDirection;
  sortCriteria?: BffCampaignSort;
  adAccountId?: string;
  searchWord?: string;
  campaignState?: BffCampaignState;
  useNewFlush?: string;
  campaignIds?: string[];
}

export interface CampaignsApiResponse {
  items: CampaignsCatalogueEntity[];
  paging: Paging;
}

type FlightState = {
  flightState: BffFlightState;
  count: string;
};

export interface FlightStateGroup {
  flightStatuses: FlightState[];
  pausedCount?: number;
}
export interface CampaignsCatalogueEntity {
  // TODO update with new columns as proto models update
  campaignId: string;
  adAccountId: string;
  name: string;
  campaignState: BffCampaignState;
  stats: Stats;
  flightStateGroup: FlightStateGroup;
  hasServeOnMegaphoneFlight: boolean;
}
