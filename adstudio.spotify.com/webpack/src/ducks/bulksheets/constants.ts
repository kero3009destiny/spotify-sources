import {
  DownloadBulkCSVState,
  SubmitBulkCSVState,
  UploadBulkCSVState,
  ValidateBulkCSVState,
} from './types';

export const initialUploadBulkCSVState: UploadBulkCSVState = {
  succeeded: false,
  failed: false,
  bulkSheetId: null,
};

export const initialDownloadBulkCSVState: DownloadBulkCSVState = {
  started: false,
  succeeded: false,
  failed: false,
  downloadUrl: null,
};

export const initialValidateBulkCSVState: ValidateBulkCSVState = {
  started: false,
  succeeded: false,
  failed: false,
};

export const initialSubmitBulkCSVState: SubmitBulkCSVState = {
  started: false,
  succeeded: false,
  failed: false,
};
