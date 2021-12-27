import { Action } from 'redux';

import { FetchErrorAction } from 'utils/asyncDucksHelpers';

import {
  BulkSheetPayload,
  ChangeLog,
  DownloadBulkCSVPayload,
  ResultSheetResponse,
  ValidationErrors,
} from 'types/common/state/api/bulksheets';

// State Types
export interface UploadBulkCSVState {
  succeeded: boolean;
  failed: boolean;
  bulkSheetId: string | null;
}

export interface DownloadBulkCSVState {
  started: boolean;
  succeeded: boolean;
  failed: boolean;
  downloadUrl: string | null;
}

export interface ValidateBulkCSVState {
  started: boolean;
  succeeded: boolean;
  failed: boolean;
  validationErrors?: ValidationErrors;
  requestErrors?: string[];
  changeLog?: ChangeLog;
}

export interface SubmitBulkCSVState {
  started: boolean;
  succeeded: boolean;
  failed: boolean;
  requestError?: Response;
}

export interface BulksheetsState {
  uploadCsv: UploadBulkCSVState;
  downloadCsv: DownloadBulkCSVState;
  validateCsv: ValidateBulkCSVState;
  submitCsv: SubmitBulkCSVState;
}

// Action Types
export const RESET_BULK_SHEETS = 'RESET_BULK_SHEETS';

export interface ResetBulkSheetsAction extends Action {
  type: typeof RESET_BULK_SHEETS;
}

export const UPLOAD_BULK_CSV_SUCCEEDED = 'UPLOAD_BULK_CSV_SUCCEEDED';
export const UPLOAD_BULK_CSV_FAILED = 'UPLOAD_BULK_CSV_FAILED';

export interface UploadBulkCSVSucceededAction extends Action {
  type: typeof UPLOAD_BULK_CSV_SUCCEEDED;
  payload: {
    bulkSheetId: string;
  };
}

export interface UploadBulkCSVFailedAction extends FetchErrorAction {
  type: typeof UPLOAD_BULK_CSV_FAILED;
}

export type UploadBulkCSVAction =
  | UploadBulkCSVSucceededAction
  | UploadBulkCSVFailedAction
  | ValidateBulkCSVStartAction
  | ResetBulkSheetsAction;

export const DOWNLOAD_BULK_CSV = 'DOWNLOAD_BULK_CSV';
export const DOWNLOAD_BULK_CSV_SUCCEEDED = 'DOWNLOAD_BULK_CSV_SUCCEEDED';
export const DOWNLOAD_BULK_CSV_FAILED = 'DOWNLOAD_BULK_CSV_FAILED';

export interface DownloadBulkCSVStartAction extends Action {
  type: typeof DOWNLOAD_BULK_CSV;
  payload: DownloadBulkCSVPayload;
}

export interface DownloadBulkCSVSucceededAction extends Action {
  type: typeof DOWNLOAD_BULK_CSV_SUCCEEDED;
  payload: {
    downloadUrl: string;
  };
}

export interface DownloadBulkCSVFailedAction extends FetchErrorAction {
  type: typeof DOWNLOAD_BULK_CSV_FAILED;
}

export type DownloadBulkCSVAction =
  | DownloadBulkCSVStartAction
  | DownloadBulkCSVSucceededAction
  | DownloadBulkCSVFailedAction
  | ResetBulkSheetsAction;

export const VALIDATE_BULK_CSV = 'VALIDATE_BULK_CSV';
export const VALIDATE_BULK_CSV_SUCCEEDED = 'VALIDATE_BULK_CSV_SUCCEEDED';
export const VALIDATE_BULK_CSV_REQUEST_FAILED =
  'VALIDATE_BULK_CSV_REQUEST_FAILED';
export const VALIDATE_BULK_CSV_FAILED = 'VALIDATE_BULK_CSV_FAILED';

export interface ValidateBulkCSVStartAction extends Action {
  type: typeof VALIDATE_BULK_CSV;
  payload: BulkSheetPayload;
}

export interface ValidateBulkCSVSucceededAction extends Action {
  type: typeof VALIDATE_BULK_CSV_SUCCEEDED;
  payload: ChangeLog;
}

// Indicates validation errors within the body of the bulksheet itself
export interface ValidateBulkCSVFailedAction extends Action {
  type: typeof VALIDATE_BULK_CSV_FAILED;
  payload: ValidationErrors;
}

// Indicates a bad CSV or otherwise invalid request
export interface ValidateBulkCSVRequestFailedAction extends Action {
  type: typeof VALIDATE_BULK_CSV_REQUEST_FAILED;
  payload: string[];
}

export type ValidateBulkCSVAction =
  | ValidateBulkCSVStartAction
  | ValidateBulkCSVSucceededAction
  | ValidateBulkCSVFailedAction
  | ValidateBulkCSVRequestFailedAction
  | SubmitBulkCSVStartAction
  | ResetBulkSheetsAction;

export const SUBMIT_BULK_CSV = 'SUBMIT_BULK_CSV';
export const SUBMIT_BULK_CSV_SUCCEEDED = 'SUBMIT_BULK_CSV_SUCCEEDED';
export const SUBMIT_BULK_CSV_FAILED = 'SUBMIT_BULK_CSV_FAILED';

export interface SubmitBulkCSVStartAction extends Action {
  type: typeof SUBMIT_BULK_CSV;
  payload: {
    bulksheetRequestPayload: BulkSheetPayload;
    pdfBlob: Blob;
  };
}

export interface SubmitBulkCSVSucceededAction extends Action {
  type: typeof SUBMIT_BULK_CSV_SUCCEEDED;
  payload: ResultSheetResponse;
}

export interface SubmitBulkCSVFailedAction extends FetchErrorAction {
  type: typeof SUBMIT_BULK_CSV_FAILED;
}

export type SubmitBulkCSVAction =
  | SubmitBulkCSVStartAction
  | SubmitBulkCSVSucceededAction
  | SubmitBulkCSVFailedAction
  | ResetBulkSheetsAction;
