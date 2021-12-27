import {
  CAMPAIGN_CSV_EXPORT,
  CREATIVE_CSV_EXPORT,
  FLIGHT_CSV_EXPORT,
  HIERARCHY_DOWNLOAD_CANCEL,
  HIERARCHY_DOWNLOAD_ERROR,
  HIERARCHY_EXPORT_ERROR,
  HIERARCHY_EXPORT_SUCCESS,
  HierarchyExportAction,
  RESET_HIERARCHY_EXPORT,
} from './types';

export interface HiearchyExportState {
  isExporting: boolean;
  isPollingForCsv: boolean;
  downloadCancelled: boolean;
  downloadError: boolean;
  exportError: boolean;
  exportUrl?: string;
}

export const initialState: HiearchyExportState = {
  isExporting: false,
  isPollingForCsv: false,
  downloadCancelled: false,
  downloadError: false,
  exportError: false,
};

export default function hierarchyExportReducer(
  state: HiearchyExportState = initialState,
  action: HierarchyExportAction,
) {
  switch (action.type) {
    case CAMPAIGN_CSV_EXPORT:
    case CREATIVE_CSV_EXPORT:
    case FLIGHT_CSV_EXPORT:
      return {
        ...state,
        isExporting: true,
        isPollingForCsv: false,
        downloadCancelled: false,
        exportError: false,
        exportUrl: undefined,
      };

    case HIERARCHY_EXPORT_SUCCESS:
      return {
        ...state,
        isExporting: false,
        isPollingForCsv: true,
        downloadCancelled: false,
        exportError: false,
        exportUrl: action.payload.downloadUrl,
      };

    case HIERARCHY_EXPORT_ERROR:
      return {
        ...state,
        isExporting: false,
        isPollingForCsv: false,
        downloadCancelled: false,
        exportError: true,
      };

    case HIERARCHY_DOWNLOAD_ERROR:
      return {
        ...state,
        isExporting: false,
        isPollingForCsv: false,
        downloadCancelled: false,
        downloadError: true,
      };

    case HIERARCHY_DOWNLOAD_CANCEL:
      return {
        ...state,
        isExporting: false,
        isPollingForCsv: false,
        downloadCancelled: true,
        downloadError: false,
      };

    case RESET_HIERARCHY_EXPORT:
      return { ...initialState };
  }

  return state;
}
