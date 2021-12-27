// LIB
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

// ACTIONS
import {
  downloadHierarchyError,
  exportHierarchyError,
  exportHierarchySuccess,
  resetHierarchyExport,
} from './actions';
import { logUserAction } from 'ducks/analytics/actions';
// SELECTORS
import { getCSVDownloadCancelledState } from 'ducks/hierarchyExport/selectors';

// API
import { getAdsCSVExportData } from 'api/ads';
import {
  exportCampaignCSV,
  exportCreativeCSV,
  exportFlightCSV,
} from 'api/csvExport';

// UTILS
import { wait } from 'utils/asyncHelpers';
import {
  exportCSVDownload,
  formatDateAndTimeLocal,
} from 'utils/flightStatsCsvHelper';

// TYPES
import {
  CAMPAIGN_CSV_EXPORT,
  CampaignCSVExportStartAction,
  CREATIVE_CSV_EXPORT,
  CreativeCSVExportStartAction,
  FLIGHT_CSV_EXPORT,
  FlightCSVExportStartAction,
  HIERARCHY_EXPORT_SUCCESS,
  HierarchyExportSuccessAction,
} from './types';
import { ExportResponse } from 'types/common/state/api/hierarchycolumns';

// copied values from 1:1:1 csv export
export const RETRIES = {
  tryWait: 500, // ms
  maxTries: 10, // A reasonable number of retry attempts
  multiplier: 2,
};

export const REQUESTED_LABEL = 'user_requested_csv_download';
export const SUCCESS_LABEL = 'csv_download_successful';
export const DUNDER_EXPORT_ERROR_LABEL = 'error_generating_data_csv_download';
export const DOWNLOAD_ERROR_LABEL = 'error_generating_data_url_download';
export const DOWNLOAD_CANCELLED_LABEL =
  'user_requested_cancellation_csv_download';

export function* flightExport(action: FlightCSVExportStartAction) {
  try {
    yield put(
      logUserAction({
        category: action.payload.analyticsCategory,
        label: REQUESTED_LABEL,
      }),
    );

    const response: ExportResponse = yield call(
      exportFlightCSV,
      action.payload,
    );

    yield put(
      exportHierarchySuccess(
        response.downloadUrl!,
        action.payload.analyticsCategory,
      ),
    );
  } catch (e) {
    yield put(exportHierarchyError());
    yield put(
      logUserAction({
        category: action.payload.analyticsCategory,
        label: DUNDER_EXPORT_ERROR_LABEL,
      }),
    );
  }
}

export function* creativeExport(action: CreativeCSVExportStartAction) {
  try {
    yield put(
      logUserAction({
        category: action.payload.analyticsCategory,
        label: REQUESTED_LABEL,
      }),
    );

    const response: ExportResponse = yield call(
      exportCreativeCSV,
      action.payload,
    );

    yield put(
      exportHierarchySuccess(
        response.downloadUrl!,
        action.payload.analyticsCategory,
      ),
    );
  } catch (e) {
    yield put(exportHierarchyError());
    yield put(
      logUserAction({
        category: action.payload.analyticsCategory,
        label: DUNDER_EXPORT_ERROR_LABEL,
      }),
    );
  }
}

export function* campaignExport(action: CampaignCSVExportStartAction) {
  try {
    yield put(
      logUserAction({
        category: action.payload.analyticsCategory,
        label: REQUESTED_LABEL,
      }),
    );

    const response: ExportResponse = yield call(
      exportCampaignCSV,
      action.payload,
    );

    yield put(
      exportHierarchySuccess(
        response.downloadUrl!,
        action.payload.analyticsCategory,
      ),
    );
  } catch (e) {
    yield put(exportHierarchyError());
    yield put(
      logUserAction({
        category: action.payload.analyticsCategory,
        label: DUNDER_EXPORT_ERROR_LABEL,
      }),
    );
  }
}

export function* downloadCSV(action: HierarchyExportSuccessAction) {
  const downloadUrl = action.payload.downloadUrl;
  const analyticsCategory = action.payload.analyticsCategory;
  let attempts = 0;

  while (attempts < RETRIES.maxTries) {
    const cancelled = yield select(getCSVDownloadCancelledState);

    if (cancelled) {
      yield put(resetHierarchyExport());
      yield put(
        logUserAction({
          category: analyticsCategory,
          label: DOWNLOAD_CANCELLED_LABEL,
        }),
      );
      break;
    }

    try {
      attempts += 1;
      const response = yield call(getAdsCSVExportData, downloadUrl);
      yield call(
        exportCSVDownload,
        response,
        `${formatDateAndTimeLocal().replace(/\s/g, '-')}.csv`,
      );
      yield put(resetHierarchyExport());
      yield put(
        logUserAction({
          category: analyticsCategory,
          label: SUCCESS_LABEL,
        }),
      );
      break;
    } catch (res) {
      if (res && res.status === 404 && res.url) {
        const exponentialBackoff =
          RETRIES.tryWait * Math.pow(RETRIES.multiplier, attempts);
        yield call(wait, exponentialBackoff);
      } else {
        yield put(downloadHierarchyError());
        yield put(
          logUserAction({
            category: analyticsCategory,
            label: DOWNLOAD_ERROR_LABEL,
          }),
        );
        break;
      }
    }
  }
}

function* watchCampaignExport() {
  yield takeLatest(CAMPAIGN_CSV_EXPORT, campaignExport);
}

function* watchFlightExport() {
  yield takeLatest(FLIGHT_CSV_EXPORT, flightExport);
}

function* watchCreativeExport() {
  yield takeLatest(CREATIVE_CSV_EXPORT, creativeExport);
}

function* watchHierarchyExportSuccess() {
  yield takeLatest(HIERARCHY_EXPORT_SUCCESS, downloadCSV);
}

export default function* hierarchyExportSaga() {
  yield all([
    watchCampaignExport(),
    watchFlightExport(),
    watchCreativeExport(),
    watchHierarchyExportSuccess(),
  ]);
}
