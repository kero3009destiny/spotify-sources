import {
  ApiQueryParams,
  Paging,
  BffSortDirection,
  DateFilterParams,
} from './index';
import { Money, Stats } from './flush';

import { com as FlightStateRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/FlightState';
import { com as PacingInfoRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/PacingInfo';
import { FormatType } from './format';
import {
  BffHierarchyColumns,
  HierarchyColumns,
  BffFlightSort,
} from './hierarchycolumns';

export type BffFlightState =
  | FlightStateRoot.spotify.adstudiobff.proto.FlightState.Status
  | 'PAUSED';

export const FlightState: Record<BffFlightState, BffFlightState> = {
  ACTIVE: 'ACTIVE',
  READY: 'READY',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  COMPLETED: 'COMPLETED',
  STOPPED: 'STOPPED',
  REJECTED: 'REJECTED',
  UNKNOWN: 'UNKNOWN',
  PAUSED: 'PAUSED',
};

export type PacingInfo = PacingInfoRoot.spotify.adstudiobff.proto.IPacingInfo;

export enum CostType {
  UNSET = 'UNSET',
  CPM = 'CPM',
  CPCL = 'CPCL',
  CPC = 'CPC',
  CPCV = 'CPCV',
}

export enum FlightColumns {
  NAME = 'NAME', // Details
  STATUS = 'STATUS', // Details
  PLACEMENT = 'PLACEMENT', // Details
  FORMAT = 'FORMAT', // Details
  START_DATE = 'START_DATE', // Details
  END_DATE = 'END_DATE', // Details
  BUDGET = 'BUDGET', // Details
  IMPRESSIONS = 'IMPRESSIONS', // Delivery
  BUDGET_SPENT = 'BUDGET_SPENT', // Delivery
  PACING = 'PACING', // Delivery
  FREQUENCY = 'FREQUENCY', // Delivery
  FREQUENCY_OF_LISTENS = 'FREQUENCY_OF_LISTENS', // Delivery
  REACH = 'REACH', // Delivery
  LISTENS_REACH = 'LISTENS_REACH', // Delivery (active audio)
  CLICK = 'CLICK', // Performance
  CTR = 'CTR', // Performance
  COST_MODEL = 'COST_MODEL', // Details
  COMPLETION_RATE = 'COMPLETION_RATE', // Performance
  AD_LISTENS = 'AD_LISTENS', // Performance
  AD_LISTEN_RATE = 'AD_LISTEN_RATE', // Performance
  LISTENERS = 'LISTENERS', // Artist Results
  NEW_LISTENERS = 'NEW_LISTENERS', // Artist Results
  INTENT_RATE = 'INTENT_RATE', // Artist Results
  NEW_LISTENER_CONVERSION_RATE = 'NEW_LISTENER_CONVERSION_RATE', // Artist Results
  LISTENER_CONVERSION_RATE = 'LISTENER_CONVERSION_RATE', // Artist Results
  AVERAGE_STREAMS_PER_LISTENER = 'AVERAGE_STREAMS_PER_LISTENER', // Artist Results
  AVERAGE_STREAMS_PER_NEW_LISTENER = 'AVERAGE_STREAMS_PER_NEW_LISTENER', // Artist Results
  FIRST_QUARTILE = 'FIRST_QUARTILE',
  SECOND_QUARTILE = 'SECOND_QUARTILE',
  THIRD_QUARTILE = 'THIRD_QUARTILE',
  FOURTH_QUARTILE = 'FOURTH_QUARTILE',
  EXTERNAL_IMPRESSIONS = 'EXTERNAL_IMPRESSIONS', // Delivery
}

export const ExportColumns: Record<
  FlightColumns,
  BffHierarchyColumns | undefined
> = {
  [FlightColumns.NAME]: HierarchyColumns.FLIGHT_NAME,
  [FlightColumns.STATUS]: HierarchyColumns.FLIGHT_STATUS,
  [FlightColumns.PLACEMENT]: HierarchyColumns.PLACEMENT,
  [FlightColumns.FORMAT]: HierarchyColumns.FORMAT,
  [FlightColumns.COST_MODEL]: HierarchyColumns.FLIGHT_COST_MODEL,
  [FlightColumns.START_DATE]: HierarchyColumns.FLIGHT_START_DATE,
  [FlightColumns.END_DATE]: HierarchyColumns.FLIGHT_END_DATE,
  [FlightColumns.BUDGET]: HierarchyColumns.FLIGHT_BUDGET,
  [FlightColumns.IMPRESSIONS]: HierarchyColumns.ADS_SERVED,
  [FlightColumns.EXTERNAL_IMPRESSIONS]: HierarchyColumns.EXTERNAL_IMPRESSIONS,
  [FlightColumns.BUDGET_SPENT]: HierarchyColumns.SPEND,
  [FlightColumns.PACING]: undefined,
  [FlightColumns.FREQUENCY]: HierarchyColumns.ADS_SERVED_AVERAGE_FREQUENCY,
  [FlightColumns.FREQUENCY_OF_LISTENS]:
    HierarchyColumns.LISTENS_AVERAGE_FREQUENCY,
  [FlightColumns.REACH]: HierarchyColumns.ADS_SERVED_REACH,
  [FlightColumns.LISTENS_REACH]: HierarchyColumns.LISTENS_REACH,
  [FlightColumns.CLICK]: HierarchyColumns.CLICKS,
  [FlightColumns.CTR]: HierarchyColumns.CTR,
  [FlightColumns.COMPLETION_RATE]: HierarchyColumns.COMPLETION_RATE,
  [FlightColumns.AD_LISTENS]: HierarchyColumns.LISTENS,
  [FlightColumns.AD_LISTEN_RATE]: HierarchyColumns.LISTENS_RATE,
  [FlightColumns.LISTENERS]: HierarchyColumns.LISTENERS,
  [FlightColumns.NEW_LISTENERS]: HierarchyColumns.NEW_LISTENERS,
  [FlightColumns.INTENT_RATE]: HierarchyColumns.INTENT_RATE,
  [FlightColumns.NEW_LISTENER_CONVERSION_RATE]:
    HierarchyColumns.NEW_LISTENER_CONVERSION_RATE,
  [FlightColumns.LISTENER_CONVERSION_RATE]:
    HierarchyColumns.LISTENER_CONVERSION_RATE,
  [FlightColumns.AVERAGE_STREAMS_PER_LISTENER]:
    HierarchyColumns.AVERAGE_STREAMS_PER_LISTENER,
  [FlightColumns.AVERAGE_STREAMS_PER_NEW_LISTENER]:
    HierarchyColumns.AVERAGE_STREAMS_PER_NEW_LISTENER,
  [FlightColumns.AVERAGE_STREAMS_PER_LISTENER]:
    HierarchyColumns.AVERAGE_STREAMS_PER_LISTENER,
  [FlightColumns.AVERAGE_STREAMS_PER_NEW_LISTENER]:
    HierarchyColumns.AVERAGE_STREAMS_PER_NEW_LISTENER,
  [FlightColumns.FIRST_QUARTILE]: HierarchyColumns.FIRST_QUARTILES,
  [FlightColumns.SECOND_QUARTILE]: HierarchyColumns.MIDPOINTS,
  [FlightColumns.THIRD_QUARTILE]: HierarchyColumns.THIRD_QUARTILES,
  [FlightColumns.FOURTH_QUARTILE]: HierarchyColumns.COMPLETES,
};

export interface FlightsQueryParams extends ApiQueryParams, DateFilterParams {
  sortDirection?: BffSortDirection;
  sortCriteria?: BffFlightSort;
  adAccountId?: string;
  searchWord?: string;
  flightState?: BffFlightState;
  campaignId?: string;
  campaignIds?: string[];
  creativeId?: string;
  forceRefresh?: string;
  useNewFlush?: string;
  flightIds?: string[];
}

export interface FlightsApiResponse {
  items: FlightsCatalogueEntity[];
  paging: Paging;
}

export interface FlightsCatalogueEntity {
  flightId: string;
  adAccountId: string;
  name: string;
  dateBegin: string;
  dateEnd: string;
  totalBudget: Money;
  flightState: BffFlightState;
  stats: Stats;
  pacing?: PacingInfo;
  isActive: boolean;
  format: FormatType;
  pricingModel: CostType;
  campaignId: string;
}
