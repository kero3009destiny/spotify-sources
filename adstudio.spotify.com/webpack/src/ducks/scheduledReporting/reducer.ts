import {
  GET_SCHEDULED_REPORTS,
  GET_SCHEDULED_REPORTS_FAILED,
  GET_SCHEDULED_REPORTS_SUCCEEDED,
  ScheduledReportingState,
  ScheduledReportsAction,
} from './types';

export const scheduledReportsDefaultState: ScheduledReportingState = {
  schedules: null,
  loading: false,
  currentIamDomain: '',
};

export default function getScheduledReportingReducer(
  state: ScheduledReportingState = scheduledReportsDefaultState,
  // TODO - prevents linter from removing return state at the end of reducer
  action: ScheduledReportsAction | { type: string; payload: any },
): ScheduledReportingState {
  switch (action.type) {
    case GET_SCHEDULED_REPORTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_SCHEDULED_REPORTS:
      return {
        ...state,
        loading: true,
        currentIamDomain: action.payload.iamDomain,
      };

    case GET_SCHEDULED_REPORTS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        schedules: action.payload.schedules,
        error: undefined,
      };
  }

  return state;
}
