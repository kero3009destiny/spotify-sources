import { Action, Reducer } from 'redux';

export interface ErrorAction extends Action {
  error: TSFixMe;
  payload?: TSFixMe;
}

export interface MetaResponse {
  response?: Response;
}

export interface FetchErrorAction extends ErrorAction {
  // TODO(joshz) change error to just true, make payload required, refactor uses
  error: true | Error | Response;
  payload?: Error | Response;
  meta: MetaResponse;
}

// The error object in saga catch blocks may be a Response object from a
// failed API call, or may be an Error type due to a different exception
export type SagaFetchError = Response | Error;

export function createAsyncReducers<
  FetchActionType extends Action,
  SuccessActionType extends Action,
  ErrorActionType extends ErrorAction
>(
  fetchName: string,
  fetchType: string,
  successName: string,
  successType: string,
  errorName: string,
  errorType: string,
  resetType?: string,
): Record<
  string,
  | Reducer<boolean, FetchActionType>
  | Reducer<boolean, SuccessActionType>
  | Reducer<Error | string | boolean, ErrorActionType>
> {
  const fetchReducer: Reducer<boolean, FetchActionType> = (
    state: boolean = false,
    action: FetchActionType,
  ): boolean => {
    switch (action.type) {
      case errorType:
      case successType:
        return false;

      case fetchType:
        return true;

      case resetType:
        return false;
      default:
        return state;
    }
  };

  const successReducer: Reducer<boolean, SuccessActionType> = (
    state: boolean = false,
    action: SuccessActionType,
  ): boolean => {
    switch (action.type) {
      case successType:
        return true;

      case errorType:
      case fetchType:
        return false;

      case resetType:
        return false;
      default:
        return state;
    }
  };

  const errorReducer: Reducer<Error | string | boolean, ErrorActionType> = (
    state: Error | string | boolean = false,
    action: ErrorActionType,
  ): Error | string | boolean => {
    switch (action.type) {
      case successType:
      case fetchType:
        return false;

      case errorType:
        return action.error || 'Failed to fetch.';

      case resetType:
        return false;
      default:
        return state;
    }
  };

  return {
    [fetchName]: fetchReducer,
    [successName]: successReducer,
    [errorName]: errorReducer,
  };
}

export function responseOrUndefined(error: SagaFetchError) {
  return error instanceof Response ? error : undefined;
}

// Transform error from saga into FetchErrorAction type
export function buildFetchErrorAction(
  type: any,
  error: SagaFetchError,
): FetchErrorAction {
  return {
    type,
    error: true,
    payload: error,
    meta: {
      response: responseOrUndefined(error),
    },
  };
}

export function getErrorMessageString(error: SagaFetchError) {
  return error instanceof Response ? error.statusText : error.toString();
}
