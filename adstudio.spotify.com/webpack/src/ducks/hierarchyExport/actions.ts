import {
  CAMPAIGN_CSV_EXPORT,
  CampaignCSVExportStartAction,
  CampaignExportPayload,
  CREATIVE_CSV_EXPORT,
  CreativeCSVExportStartAction,
  CreativeExportPayload,
  FLIGHT_CSV_EXPORT,
  FlightCSVExportStartAction,
  FlightExportPayload,
  HIERARCHY_DOWNLOAD_CANCEL,
  HIERARCHY_DOWNLOAD_ERROR,
  HIERARCHY_EXPORT_ERROR,
  HIERARCHY_EXPORT_SUCCESS,
  HierarchyDownloadCancelAction,
  HierarchyDownloadErrorAction,
  HierarchyExportErrorAction,
  HierarchyExportSuccessAction,
  RESET_HIERARCHY_EXPORT,
  ResetHierarchyExportAction,
} from './types';

export const exportCampaignCSV = (
  payload: CampaignExportPayload,
): CampaignCSVExportStartAction => ({
  type: CAMPAIGN_CSV_EXPORT,
  payload,
});

export const exportFlightCSV = (
  payload: FlightExportPayload,
): FlightCSVExportStartAction => ({
  type: FLIGHT_CSV_EXPORT,
  payload,
});

export const exportCreativeCSV = (
  payload: CreativeExportPayload,
): CreativeCSVExportStartAction => ({
  type: CREATIVE_CSV_EXPORT,
  payload,
});

export const exportHierarchySuccess = (
  downloadUrl: string,
  analyticsCategory: string,
): HierarchyExportSuccessAction => ({
  type: HIERARCHY_EXPORT_SUCCESS,
  payload: {
    downloadUrl,
    analyticsCategory,
  },
});

export const exportHierarchyError = (): HierarchyExportErrorAction => ({
  type: HIERARCHY_EXPORT_ERROR,
});

export const downloadHierarchyError = (): HierarchyDownloadErrorAction => ({
  type: HIERARCHY_DOWNLOAD_ERROR,
});

export const cancelHierarchyDownload = (): HierarchyDownloadCancelAction => ({
  type: HIERARCHY_DOWNLOAD_CANCEL,
});

export const resetHierarchyExport = (): ResetHierarchyExportAction => ({
  type: RESET_HIERARCHY_EXPORT,
});
