import { combineReducers } from 'redux';

import {
  initialDownloadBulkCSVState,
  initialSubmitBulkCSVState,
  initialUploadBulkCSVState,
  initialValidateBulkCSVState,
} from './constants';

import {
  BulksheetsState,
  DOWNLOAD_BULK_CSV,
  DOWNLOAD_BULK_CSV_FAILED,
  DOWNLOAD_BULK_CSV_SUCCEEDED,
  DownloadBulkCSVAction,
  DownloadBulkCSVState,
  RESET_BULK_SHEETS,
  SUBMIT_BULK_CSV,
  SUBMIT_BULK_CSV_FAILED,
  SUBMIT_BULK_CSV_SUCCEEDED,
  SubmitBulkCSVAction,
  SubmitBulkCSVState,
  UPLOAD_BULK_CSV_FAILED,
  UPLOAD_BULK_CSV_SUCCEEDED,
  UploadBulkCSVAction,
  UploadBulkCSVState,
  VALIDATE_BULK_CSV,
  VALIDATE_BULK_CSV_FAILED,
  VALIDATE_BULK_CSV_REQUEST_FAILED,
  VALIDATE_BULK_CSV_SUCCEEDED,
  ValidateBulkCSVAction,
  ValidateBulkCSVState,
} from './types';

export const uploadBulkCSVReducer = (
  state = initialUploadBulkCSVState,
  action: UploadBulkCSVAction,
): UploadBulkCSVState => {
  switch (action.type) {
    case UPLOAD_BULK_CSV_SUCCEEDED:
      return {
        succeeded: true,
        failed: false,
        bulkSheetId: action.payload.bulkSheetId,
      };
    case UPLOAD_BULK_CSV_FAILED:
      return {
        succeeded: false,
        failed: true,
        bulkSheetId: null,
      };
    case VALIDATE_BULK_CSV:
      return {
        ...state,
        succeeded: false,
        failed: false,
      };
    case RESET_BULK_SHEETS:
      return {
        ...initialUploadBulkCSVState,
      };
    default:
      return state;
  }
};

export const downloadBulkCSVReducer = (
  state = initialDownloadBulkCSVState,
  action: DownloadBulkCSVAction,
): DownloadBulkCSVState => {
  switch (action.type) {
    case DOWNLOAD_BULK_CSV:
      return {
        started: true,
        succeeded: false,
        failed: false,
        downloadUrl: null,
      };
    case DOWNLOAD_BULK_CSV_SUCCEEDED:
      return {
        started: false,
        succeeded: true,
        failed: false,
        downloadUrl: action.payload.downloadUrl,
      };
    case DOWNLOAD_BULK_CSV_FAILED:
      return {
        started: false,
        succeeded: false,
        failed: true,
        downloadUrl: null,
      };
    case RESET_BULK_SHEETS:
      return {
        ...initialDownloadBulkCSVState,
      };
    default:
      return state;
  }
};

export const validateBulkCSVReducer = (
  state = initialValidateBulkCSVState,
  action: ValidateBulkCSVAction,
): ValidateBulkCSVState => {
  switch (action.type) {
    case VALIDATE_BULK_CSV:
      return {
        started: true,
        succeeded: false,
        failed: false,
        validationErrors: undefined,
        requestErrors: undefined,
        changeLog: undefined,
      };
    case VALIDATE_BULK_CSV_SUCCEEDED:
      return {
        started: false,
        succeeded: true,
        failed: false,
        validationErrors: undefined,
        requestErrors: undefined,
        changeLog: action.payload,
      };
    case VALIDATE_BULK_CSV_FAILED:
      return {
        started: false,
        succeeded: false,
        failed: true,
        validationErrors: action.payload,
        requestErrors: undefined,
        changeLog: undefined,
      };
    case VALIDATE_BULK_CSV_REQUEST_FAILED:
      return {
        started: false,
        succeeded: false,
        failed: true,
        validationErrors: undefined,
        requestErrors: action.payload,
        changeLog: undefined,
      };
    case SUBMIT_BULK_CSV:
      return {
        ...state,
        started: false,
        succeeded: false,
        failed: false,
      };
    case RESET_BULK_SHEETS:
      return {
        ...initialValidateBulkCSVState,
      };
    default:
      return state;
  }
};

export const submitBulkCSVReducer = (
  state = initialSubmitBulkCSVState,
  action: SubmitBulkCSVAction,
): SubmitBulkCSVState => {
  switch (action.type) {
    case SUBMIT_BULK_CSV:
      return {
        started: true,
        succeeded: false,
        failed: false,
        requestError: undefined,
      };
    case SUBMIT_BULK_CSV_SUCCEEDED:
      return {
        started: false,
        succeeded: true,
        failed: false,
        requestError: undefined,
      };
    case SUBMIT_BULK_CSV_FAILED:
      return {
        started: false,
        succeeded: false,
        failed: true,
        requestError: action.error as Response,
      };
    case RESET_BULK_SHEETS:
      return {
        ...initialSubmitBulkCSVState,
      };
    default:
      return state;
  }
};

// in anticipation of there being more reducers
export default combineReducers<BulksheetsState>({
  uploadCsv: uploadBulkCSVReducer,
  downloadCsv: downloadBulkCSVReducer,
  validateCsv: validateBulkCSVReducer,
  submitCsv: submitBulkCSVReducer,
});
