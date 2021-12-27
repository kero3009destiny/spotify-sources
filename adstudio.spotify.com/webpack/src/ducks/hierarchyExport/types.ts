import { BffSortDirection, DateFilterParams } from 'types/common/state/api';
import { BffCampaignState } from 'types/common/state/api/campaigns';
import { BffCreativeState } from 'types/common/state/api/creatives';
import { BffFlightState } from 'types/common/state/api/flights';
import { BffHierarchyColumns } from 'types/common/state/api/hierarchycolumns';

export const CAMPAIGN_CSV_EXPORT = 'CAMPAIGN_CSV_EXPORT';
export const FLIGHT_CSV_EXPORT = 'FLIGHT_HIERARCHY_EXPORT';
export const CREATIVE_CSV_EXPORT = 'CREATIVE_CSV_EXPORT';
export const HIERARCHY_EXPORT_SUCCESS = 'HIERARCHY_EXPORT_SUCCESS';
export const HIERARCHY_EXPORT_ERROR = 'HIERARCHY_EXPORT_ERROR';
export const HIERARCHY_DOWNLOAD_ERROR = 'HIERARCHY_DOWNLOAD_ERROR';
export const HIERARCHY_DOWNLOAD_CANCEL = 'HIERARCHY_DOWNLOAD_CANCEL';
export const RESET_HIERARCHY_EXPORT = 'RESET_HIERARCHY_EXPORT';

// Base payload interface for Dunder requests
export interface HierarchyExportPayload {
  adAccountId: string;
  columns: BffHierarchyColumns[];
  sortCriteria: BffHierarchyColumns;
  sortDirection: BffSortDirection;
  searchWord?: string;
  dateFilterParams?: DateFilterParams;
  locale: string;
  analyticsCategory: string;
}

export interface CampaignExportPayload extends HierarchyExportPayload {
  campaignState: BffCampaignState;
}

export interface FlightExportPayload extends HierarchyExportPayload {
  flightState: BffFlightState;
  campaignId?: string;
  creativeId?: string;
}

export interface CreativeExportPayload extends HierarchyExportPayload {
  creativeState: BffCreativeState;
  flightId?: string;
  campaignId?: string;
}

export interface CampaignCSVExportStartAction {
  type: typeof CAMPAIGN_CSV_EXPORT;
  payload: CampaignExportPayload;
}

export interface FlightCSVExportStartAction {
  type: typeof FLIGHT_CSV_EXPORT;
  payload: FlightExportPayload;
}

export interface CreativeCSVExportStartAction {
  type: typeof CREATIVE_CSV_EXPORT;
  payload: CreativeExportPayload;
}

// Action for a successful Dunder request. Begin polling GCS for
// the specified CSV.
export interface HierarchyExportSuccessAction {
  type: typeof HIERARCHY_EXPORT_SUCCESS;
  payload: {
    downloadUrl: string;
    analyticsCategory: string;
  };
}

// Action for an error returned from Dunder. Most likely for
// a super user attempting to request CSV for an org-wide report.
export interface HierarchyExportErrorAction {
  type: typeof HIERARCHY_EXPORT_ERROR;
}

// Action for a failed CSV download from GCS.
export interface HierarchyDownloadErrorAction {
  type: typeof HIERARCHY_DOWNLOAD_ERROR;
}

// Action for a user cancelling the polling for ready CSVs from GCS
export interface HierarchyDownloadCancelAction {
  type: typeof HIERARCHY_DOWNLOAD_CANCEL;
}

// Action to reset the export state which will in turn hide notifications
export interface ResetHierarchyExportAction {
  type: typeof RESET_HIERARCHY_EXPORT;
}

export type HierarchyExportAction =
  | FlightCSVExportStartAction
  | HierarchyExportSuccessAction
  | HierarchyExportErrorAction
  | HierarchyDownloadErrorAction
  | HierarchyDownloadCancelAction
  | ResetHierarchyExportAction
  | CampaignCSVExportStartAction
  | CreativeCSVExportStartAction;
