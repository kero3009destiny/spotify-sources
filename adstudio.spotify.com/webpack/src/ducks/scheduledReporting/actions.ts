import { buildFetchErrorAction } from 'utils/asyncDucksHelpers';

import * as types from './types';
import {
  DunderFetchError,
  GetScheduledReportsErrorAction,
  GetScheduledReportsStartAction,
  GetScheduledReportsSuccessAction,
} from './types';
import { ScheduledReportingResponse } from 'types/common/state/api/scheduledReporting';

export function getScheduledReports(
  iamDomain: string,
): GetScheduledReportsStartAction {
  return {
    type: types.GET_SCHEDULED_REPORTS,
    payload: {
      iamDomain,
    },
  };
}

export function getScheduledReportsSucceeded(
  payload: ScheduledReportingResponse,
): GetScheduledReportsSuccessAction {
  return {
    type: types.GET_SCHEDULED_REPORTS_SUCCEEDED,
    payload,
  };
}

export function getScheduledReportsFailed(
  err: DunderFetchError,
): GetScheduledReportsErrorAction {
  return buildFetchErrorAction(types.GET_SCHEDULED_REPORTS_FAILED, err);
}
