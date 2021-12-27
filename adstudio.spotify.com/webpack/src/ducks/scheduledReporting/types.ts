import { Action } from 'redux';

import { FetchErrorAction, SagaFetchError } from 'utils/asyncDucksHelpers';

import { ScheduledReportingResponse } from 'types/common/state/api/scheduledReporting';

export const GET_SCHEDULED_REPORTS = 'GET_SCHEDULED_REPORTS';
export const GET_SCHEDULED_REPORTS_SUCCEEDED =
  'GET_SCHEDULED_REPORTS_SUCCEEDED';
export const GET_SCHEDULED_REPORTS_FAILED = 'GET_SCHEDULED_REPORTS_FAILED';

export interface DunderErrorResponse extends Response {
  errorDetails?: {
    code?: number;
    message?: string;
    details?: {
      errorMessageCode: string;
      errorValues: string[];
    }[];
  };
}

export type DunderFetchError = DunderErrorResponse | SagaFetchError;

export interface GetScheduledReportsStartAction extends Action {
  type: typeof GET_SCHEDULED_REPORTS;
  payload: {
    iamDomain: string;
  };
}

export interface GetScheduledReportsSuccessAction extends Action {
  type: typeof GET_SCHEDULED_REPORTS_SUCCEEDED;
  payload: ScheduledReportingResponse;
}

export interface GetScheduledReportsErrorAction extends FetchErrorAction {
  type: typeof GET_SCHEDULED_REPORTS_FAILED;
}

export type ScheduledReportsAction =
  | GetScheduledReportsStartAction
  | GetScheduledReportsSuccessAction
  | GetScheduledReportsErrorAction;

export interface ScheduledReportingState extends ScheduledReportingResponse {
  loading: boolean;
  error?: DunderFetchError;
  currentIamDomain: string;
}
