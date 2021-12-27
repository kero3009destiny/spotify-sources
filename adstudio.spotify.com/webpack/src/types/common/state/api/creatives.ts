import {
  ApiQueryParams,
  Paging,
  BffSortDirection,
  DateFilterParams,
} from './index';
import { com as CreativeStateRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CreativeState';
import { Stats } from './flush';
import { com as FlightLinkStateRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/FlightLinkState';
import { FormatType } from './format';
import {
  BffHierarchyColumns,
  HierarchyColumns,
  BffCreativeSort,
} from './hierarchycolumns';
import { FlightLink } from './flightLink';
import { CreativeDetails } from 'types/common/state/api/creative';

export type FlightLinkStateStatusType = FlightLinkStateRoot.spotify.adstudiobff.proto.FlightLinkState.Status;

export const FlightLinkState: Record<
  FlightLinkStateStatusType,
  FlightLinkStateStatusType
> = {
  UNKNOWN: 'UNKNOWN',
  ACTIVE: 'ACTIVE',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  PAUSED: 'PAUSED',
  REJECTED: 'REJECTED',
  ARCHIVED: 'ARCHIVED',
};

export type BffCreativeState = CreativeStateRoot.spotify.adstudiobff.proto.CreativeState.Status;

export const CreativeState: Record<BffCreativeState, BffCreativeState> = {
  ACTIVE: 'ACTIVE',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  PROCESSING: 'PROCESSING',
  STOPPED: 'STOPPED',
  UNKNOWN: 'UNKNOWN',
};

export enum CreativeColumns {
  NAME = 'NAME', // Details
  STATUS = 'STATUS', // Details
  FORMAT = 'FORMAT', // Details
  IMPRESSIONS = 'IMPRESSIONS', // Delivery
  BUDGET_SPENT = 'BUDGET_SPENT', // Delivery
  FREQUENCY = 'FREQUENCY', // Delivery
  FREQUENCY_OF_LISTENS = 'FREQUENCY_OF_LISTENS', // Delivery
  REACH = 'REACH', // Delivery
  LISTENS_REACH = 'LISTENS_REACH', // Delivery (active audio)
  CLICK = 'CLICK', // Performance
  CTR = 'CTR', // Performance
  COMPLETION_RATE = 'COMPLETION_RATE', // Performance
  AD_LISTENS = 'AD_LISTENS', // Performance
  AD_LISTEN_RATE = 'AD_LISTEN_RATE', // Performance
  LISTENERS = 'LISTENERS', // Artist Results
  NEW_LISTENERS = 'NEW_LISTENERS', // Artist Results
  INTENT_RATE = 'INTENT_RATE', // Artist Results
  FIRST_QUARTILE = 'FIRST_QUARTILE', // Quartiles Performance
  SECOND_QUARTILE = 'SECOND_QUARTILE', // Quartiles Performance
  THIRD_QUARTILE = 'THIRD_QUARTILE', // Quartiles Performance
  FOURTH_QUARTILE = 'FOURTH_QUARTILE', // Quartiles Performance
  EXTERNAL_IMPRESSIONS = 'EXTERNAL_IMPRESSIONS', // Delivery
}

export const ExportColumns: Record<
  CreativeColumns,
  BffHierarchyColumns | undefined
> = {
  [CreativeColumns.NAME]: HierarchyColumns.CREATIVE_NAME,
  [CreativeColumns.STATUS]: HierarchyColumns.CREATIVE_STATUS,
  [CreativeColumns.FORMAT]: HierarchyColumns.FORMAT,
  [CreativeColumns.IMPRESSIONS]: HierarchyColumns.ADS_SERVED,
  [CreativeColumns.EXTERNAL_IMPRESSIONS]: HierarchyColumns.EXTERNAL_IMPRESSIONS,
  [CreativeColumns.BUDGET_SPENT]: HierarchyColumns.SPEND,
  [CreativeColumns.FREQUENCY]: HierarchyColumns.ADS_SERVED_AVERAGE_FREQUENCY,
  [CreativeColumns.FREQUENCY_OF_LISTENS]:
    HierarchyColumns.LISTENS_AVERAGE_FREQUENCY,
  [CreativeColumns.REACH]: HierarchyColumns.ADS_SERVED_REACH,
  [CreativeColumns.LISTENS_REACH]: HierarchyColumns.LISTENS_REACH,
  [CreativeColumns.CLICK]: HierarchyColumns.CLICKS,
  [CreativeColumns.CTR]: HierarchyColumns.CTR,
  [CreativeColumns.COMPLETION_RATE]: HierarchyColumns.COMPLETION_RATE,
  [CreativeColumns.AD_LISTENS]: HierarchyColumns.LISTENS,
  [CreativeColumns.AD_LISTEN_RATE]: HierarchyColumns.LISTENS_RATE,
  [CreativeColumns.LISTENERS]: HierarchyColumns.LISTENERS,
  [CreativeColumns.NEW_LISTENERS]: HierarchyColumns.NEW_LISTENERS,
  [CreativeColumns.INTENT_RATE]: HierarchyColumns.INTENT_RATE,
  [CreativeColumns.FIRST_QUARTILE]: HierarchyColumns.FIRST_QUARTILES,
  [CreativeColumns.SECOND_QUARTILE]: HierarchyColumns.MIDPOINTS,
  [CreativeColumns.THIRD_QUARTILE]: HierarchyColumns.THIRD_QUARTILES,
  [CreativeColumns.FOURTH_QUARTILE]: HierarchyColumns.COMPLETES,
};

export interface CreativesQueryParams extends ApiQueryParams, DateFilterParams {
  sortDirection?: BffSortDirection;
  sortCriteria?: BffCreativeSort;
  adAccountId: string;
  searchWord?: string;
  creativeState?: BffCreativeState;
  flightId?: string;
  flightIds?: string[];
  forceRefresh?: string;
  useNewFlush?: string;
  campaignId?: string;
  campaignIds?: string[];
  creativeIds?: string[];
}

export interface CreativesApiResponse {
  items: CreativesCatalogueEntity[];
  paging: Paging;
}

export interface CreativesCatalogueEntity {
  creativeId: string;
  adAccountId: string;
  name: string;
  creativeState: BffCreativeState;
  flightLinkStatus?: FlightLinkStateStatusType;
  flightLink?: FlightLink;
  stats: Stats;
  imageUrl: string;
  format: FormatType;
  isActiveAudio: boolean;
  isAdgen: boolean;
  aspectRatio: number;
  ctaText?: string;
}

export interface BulkGetCreativesRequestParams {
  adAccountId: string;
  flightId: string;
  creativeIds?: string[];
}

export interface BulkGetCreativesResponse {
  creatives: CreativeDetails[];
}
