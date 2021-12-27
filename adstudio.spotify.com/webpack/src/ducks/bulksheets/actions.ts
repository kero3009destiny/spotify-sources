import {
  DOWNLOAD_BULK_CSV,
  DOWNLOAD_BULK_CSV_FAILED,
  DOWNLOAD_BULK_CSV_SUCCEEDED,
  DownloadBulkCSVFailedAction,
  DownloadBulkCSVStartAction,
  DownloadBulkCSVSucceededAction,
  RESET_BULK_SHEETS,
  ResetBulkSheetsAction,
  SUBMIT_BULK_CSV,
  SUBMIT_BULK_CSV_FAILED,
  SUBMIT_BULK_CSV_SUCCEEDED,
  SubmitBulkCSVFailedAction,
  SubmitBulkCSVStartAction,
  SubmitBulkCSVSucceededAction,
  UPLOAD_BULK_CSV_FAILED,
  UPLOAD_BULK_CSV_SUCCEEDED,
  UploadBulkCSVFailedAction,
  UploadBulkCSVSucceededAction,
  VALIDATE_BULK_CSV,
  VALIDATE_BULK_CSV_FAILED,
  VALIDATE_BULK_CSV_REQUEST_FAILED,
  VALIDATE_BULK_CSV_SUCCEEDED,
  ValidateBulkCSVFailedAction,
  ValidateBulkCSVRequestFailedAction,
  ValidateBulkCSVStartAction,
  ValidateBulkCSVSucceededAction,
} from './types';
import {
  BulkSheetPayload,
  ChangeLog,
  DownloadBulkCSVPayload,
  ResultSheetResponse,
  ValidationErrors,
} from 'types/common/state/api/bulksheets';

export const uploadBulkCSVSucceeded = (
  bulkSheetId: string,
): UploadBulkCSVSucceededAction => {
  return {
    type: UPLOAD_BULK_CSV_SUCCEEDED,
    payload: { bulkSheetId },
  };
};

export const uploadBulkCSVFailed = (
  response: Response,
): UploadBulkCSVFailedAction => {
  return {
    type: UPLOAD_BULK_CSV_FAILED,
    error: response,
    meta: {
      response,
    },
  };
};

export const downloadBulkCSV = (
  payload: DownloadBulkCSVPayload,
): DownloadBulkCSVStartAction => {
  return {
    type: DOWNLOAD_BULK_CSV,
    payload,
  };
};

export const downloadBulkCSVSucceeded = (
  downloadUrl: string,
): DownloadBulkCSVSucceededAction => {
  return {
    type: DOWNLOAD_BULK_CSV_SUCCEEDED,
    payload: { downloadUrl },
  };
};

export const downloadBulkCSVFailed = (
  response: Response,
): DownloadBulkCSVFailedAction => {
  return {
    type: DOWNLOAD_BULK_CSV_FAILED,
    error: response,
    meta: {
      response,
    },
  };
};

export const validateBulkCSV = (
  payload: BulkSheetPayload,
): ValidateBulkCSVStartAction => {
  return {
    type: VALIDATE_BULK_CSV,
    payload,
  };
};

export const validateBulkCSVSucceeded = (
  payload: ChangeLog,
): ValidateBulkCSVSucceededAction => {
  return {
    type: VALIDATE_BULK_CSV_SUCCEEDED,
    payload,
  };
};

export const validateBulkCSVFailed = (
  payload: ValidationErrors,
): ValidateBulkCSVFailedAction => {
  return {
    type: VALIDATE_BULK_CSV_FAILED,
    payload,
  };
};

export const validateBulkCSVRequestFailed = (
  requestErrors: string[],
): ValidateBulkCSVRequestFailedAction => {
  return {
    type: VALIDATE_BULK_CSV_REQUEST_FAILED,
    payload: requestErrors,
  };
};

export const submitBulkCSV = (
  bulksheetRequestPayload: BulkSheetPayload,
  pdfBlob: Blob,
): SubmitBulkCSVStartAction => {
  return {
    type: SUBMIT_BULK_CSV,
    payload: {
      bulksheetRequestPayload,
      pdfBlob,
    },
  };
};

export const submitBulkCSVSucceeded = (
  payload: ResultSheetResponse,
): SubmitBulkCSVSucceededAction => {
  return {
    type: SUBMIT_BULK_CSV_SUCCEEDED,
    payload,
  };
};

export const submitBulkCSVFailed = (
  response: Response,
): SubmitBulkCSVFailedAction => {
  return {
    type: SUBMIT_BULK_CSV_FAILED,
    error: response,
    meta: {
      response,
    },
  };
};

export const resetBulksheets = (): ResetBulkSheetsAction => ({
  type: RESET_BULK_SHEETS,
});
