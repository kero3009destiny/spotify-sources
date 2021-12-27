import i18n from 'i18next';
import { EventChannel } from 'redux-saga';
import { all, call, put, select, take, takeLatest } from 'redux-saga/effects';

import * as BulksheetActions from './actions';
import { getAccountId } from 'ducks/account/selectors';

import { getAdsCSVExportData } from 'api/ads';
import * as BulksheetsApi from 'api/bulksheets';

import { wait } from 'utils/asyncHelpers';
import {
  exportCSVDownload,
  formatDateAndTimeLocal,
} from 'utils/flightStatsCsvHelper';
import { uploadFileToStorage } from 'utils/uploadFileToStorage';

import {
  DOWNLOAD_BULK_CSV,
  DownloadBulkCSVStartAction,
  SUBMIT_BULK_CSV,
  SubmitBulkCSVStartAction,
  VALIDATE_BULK_CSV,
  ValidateBulkCSVStartAction,
} from './types';
import { ValidationException } from 'types/common/state/api/bff';
import {
  BulkValidationResponse,
  DownloadUrlResponse,
  PdfEntityResponse,
  ResultSheetResponse,
} from 'types/common/state/api/bulksheets';
import {
  GcsChannelEvent,
  UploadProgressEvent,
} from 'types/common/state/api/upload';

// copied values from 1:1:1 csv export
export const RETRIES = {
  tryWait: 500, // ms
  maxTries: 10, // A reasonable number of retry attempts
  multiplier: 2,
};

export function* validateBulkCSV(action: ValidateBulkCSVStartAction) {
  try {
    const validateResponse: BulkValidationResponse = yield call(
      BulksheetsApi.validateCsv,
      action.payload,
    );

    if (validateResponse.error) {
      yield put(
        BulksheetActions.validateBulkCSVFailed(validateResponse.error!),
      );
    } else {
      yield put(
        BulksheetActions.validateBulkCSVSucceeded(
          validateResponse.success!.changeLogs,
        ),
      );
    }
  } catch (e) {
    let requestErrors;

    if (e instanceof Response && e.status === 400) {
      const responseJson: {
        message: string;
        originalResponse: ValidationException;
      } = yield e.json();
      requestErrors = responseJson.originalResponse.custom.validationErrors.errors.map(
        ve => ve.message,
      );
    } else {
      requestErrors = [i18n.t('I18N_AN_ERROR_OCCURRED', 'An error occurred')];
    }

    yield put(BulksheetActions.validateBulkCSVRequestFailed(requestErrors));
  }
}

export function* submitBulkCSV(action: SubmitBulkCSVStartAction) {
  try {
    // get signed url for pdf receipt
    const signedUrlResponse: PdfEntityResponse = yield call(
      BulksheetsApi.getPdfSignedUrl,
      action.payload.bulksheetRequestPayload,
    );

    // upload pdf receipt to gcs
    const gcsChannel: EventChannel<GcsChannelEvent> = yield call(
      // @ts-ignore
      uploadFileToStorage,
      {
        bucket: 'gcs',
        file: new File(
          [action.payload.pdfBlob],
          `${action.payload.bulksheetRequestPayload.bulkSheetId}.pdf`,
          { type: 'application/pdf' },
        ),
        url: signedUrlResponse.signedUrl,
      },
    );
    let gcsResponse: GcsChannelEvent = yield take(gcsChannel);
    while (!(gcsResponse as UploadProgressEvent).done) {
      gcsResponse = yield take(gcsChannel);
    }

    // submit bulk changes
    const submitResponse: ResultSheetResponse = yield call(
      BulksheetsApi.submitBulkSheet,
      action.payload.bulksheetRequestPayload,
    );
    yield put(BulksheetActions.submitBulkCSVSucceeded(submitResponse));
  } catch (e) {
    yield put(BulksheetActions.submitBulkCSVFailed(e));
  }
}

export function* downloadBulkCSV(action: DownloadBulkCSVStartAction) {
  try {
    const adAccountId: string = yield select(getAccountId);
    const downloadResponse: DownloadUrlResponse = yield call(
      BulksheetsApi.getBulkCSVDownloadUrl,
      adAccountId,
      action.payload,
    );
    let attempts = 0;

    while (attempts < RETRIES.maxTries) {
      attempts += 1;

      try {
        const fileContent: string = yield call(
          getAdsCSVExportData,
          downloadResponse.signedUrl!,
        );
        yield call(
          exportCSVDownload,
          fileContent,
          `${formatDateAndTimeLocal().replace(/\s/g, '-')}.csv`,
        );
        yield put(
          BulksheetActions.downloadBulkCSVSucceeded(
            downloadResponse.signedUrl!,
          ),
        );
        break;
      } catch (res) {
        if (res && res.status === 404 && res.url) {
          const exponentialBackoff =
            RETRIES.tryWait * Math.pow(RETRIES.multiplier, attempts);
          yield call(wait, exponentialBackoff);
        } else {
          yield put(BulksheetActions.downloadBulkCSVFailed(res));
        }
      }
    }
  } catch (e) {
    yield put(BulksheetActions.downloadBulkCSVFailed(e));
  }
}

function* watchDownloadBulkCSV() {
  yield takeLatest(DOWNLOAD_BULK_CSV, downloadBulkCSV);
}

function* watchValidBulkCSV() {
  yield takeLatest(VALIDATE_BULK_CSV, validateBulkCSV);
}

function* watchSubmitBulkCSV() {
  yield takeLatest(SUBMIT_BULK_CSV, submitBulkCSV);
}

export default function* uploadBulkCSVSaga() {
  yield all([
    watchDownloadBulkCSV(),
    watchValidBulkCSV(),
    watchSubmitBulkCSV(),
  ]);
}
