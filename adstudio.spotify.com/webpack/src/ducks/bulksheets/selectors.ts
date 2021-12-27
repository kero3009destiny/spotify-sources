import {
  getSelectedCampaigns,
  getSelectedCreatives,
  getSelectedFlights,
} from 'ducks/dashboard/selectors';

import {
  BulksheetsState,
  SubmitBulkCSVState,
  UploadBulkCSVState,
  ValidateBulkCSVState,
} from './types';
import {
  ChangeLog,
  DownloadBulkCSVPayload,
  EntityType,
  ErrorRow,
} from 'types/common/state/api/bulksheets';

export const getBulksheetState = (state: TSFixMe): BulksheetsState => {
  return state.bulksheets;
};

export const getCSVUploadState = (state: TSFixMe): UploadBulkCSVState => {
  return getBulksheetState(state).uploadCsv;
};

export const getCSVSubmissionState = (state: TSFixMe): SubmitBulkCSVState => {
  return getBulksheetState(state).submitCsv;
};

export const getCSVValidationState = (state: TSFixMe): ValidateBulkCSVState => {
  return getBulksheetState(state).validateCsv;
};

export const getCSVUploadCompleted = (state: TSFixMe): boolean => {
  return getCSVUploadState(state).succeeded;
};

export const getCSVUploadFailed = (state: TSFixMe): boolean => {
  return getCSVUploadState(state).failed;
};

export const getCurrentBulkSheetId = (state: TSFixMe): string | null => {
  return getCSVUploadState(state).bulkSheetId;
};

export const getCSVDownloadInProgress = (state: TSFixMe): boolean => {
  return getBulksheetState(state).downloadCsv.started;
};

export const getCSVValidationInProgress = (state: TSFixMe): boolean => {
  return getCSVValidationState(state).started;
};

export const getCSVValidationSucceeded = (state: TSFixMe): boolean => {
  return getCSVValidationState(state).succeeded;
};

export const getCSVValidationFailed = (state: TSFixMe): boolean => {
  return getCSVValidationState(state).failed;
};

export const getCSVValidationRequestErrorMessages = (
  state: TSFixMe,
): string[] | undefined => {
  return getCSVValidationState(state).requestErrors;
};

export const getCSVValidationErrorRows = (
  state: TSFixMe,
): ErrorRow[] | undefined => {
  return getCSVValidationState(state).validationErrors?.errors;
};

export const getCSVSubmissionStarted = (state: TSFixMe): boolean => {
  return getCSVSubmissionState(state).started;
};

export const getCSVSubmissionSucceeded = (state: TSFixMe): boolean => {
  return getCSVSubmissionState(state).succeeded;
};

export const getCSVSubmissionFailed = (state: TSFixMe): boolean => {
  return getCSVSubmissionState(state).failed;
};

export const getShouldShowReviewScreen = (state: TSFixMe): boolean => {
  return (
    getCSVValidationSucceeded(state) ||
    getCSVSubmissionStarted(state) ||
    getCSVSubmissionSucceeded(state) ||
    getCSVSubmissionFailed(state)
  );
};

export const getBulksheetChangeLog = (
  state: TSFixMe,
): ChangeLog | undefined => {
  return getCSVValidationState(state).changeLog;
};

const getImportedEntityCount = (
  state: TSFixMe,
  entityType: EntityType,
): number => {
  const changeLog = getBulksheetChangeLog(state);

  if (changeLog) {
    return changeLog.diffMessages.filter(diff => diff.entityType === entityType)
      .length;
  }

  return 0;
};

export const getImportedCampaignCount = (state: TSFixMe): number => {
  return getImportedEntityCount(state, 'CAMPAIGN');
};

export const getImportedFlightCount = (state: TSFixMe): number => {
  return getImportedEntityCount(state, 'AD_SET');
};

export const getImportedCreativeCount = (state: TSFixMe): number => {
  return getImportedEntityCount(state, 'AD');
};

export const getBulksheetEntityIds = (
  state: TSFixMe,
  entityType: EntityType,
): DownloadBulkCSVPayload => {
  const campaignIds = getSelectedCampaigns(state);
  const flightIds = getSelectedFlights(state);
  const creativeIds = getSelectedCreatives(state);

  return {
    campaignIds: entityType === 'CAMPAIGN' ? campaignIds : [],
    flightIds: entityType === 'AD_SET' ? flightIds : [],
    creativeIds: entityType === 'AD' ? creativeIds : [],
  };
};
