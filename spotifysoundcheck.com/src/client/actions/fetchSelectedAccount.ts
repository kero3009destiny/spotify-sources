import store from 'store';
export const FETCH_SELECT_ACCOUNT_BEGIN = 'FETCH_SELECT_ACCOUNT_BEGIN';
export const FETCH_SELECT_ACCOUNT_SUCCESS = 'FETCH_SELECT_ACCOUNT_SUCCESS';
export const FETCH_SELECT_ACCOUNT_FAILURE = 'FETCH_SELECT_ACCOUNT_FAILURE';
import { setLoadingBegin, setLoadingFinished } from './contentLoadingAction';

// get lessons data from the api
export function fetchSelectedAccount(id: number) {
  return (dispatch: any) => {
    dispatch(fetchSelectedAccountBegin());
    dispatch(setLoadingBegin());
    return fetch(`/api/user/${id}`)
      .then(res => res.json())
      .then(account_details => {
        dispatch(setLoadingFinished());
        dispatch(fetchSelectedAccountSuccess(account_details.user));
      })
      .catch(err => {
        dispatch(setLoadingFinished());
        dispatch(fetchSelectedAccountError(err));
      });
  };
}

export const fetchSelectedAccountBegin = () => ({
  type: FETCH_SELECT_ACCOUNT_BEGIN
});

export const fetchSelectedAccountSuccess = (user: any) => ({
  type: FETCH_SELECT_ACCOUNT_SUCCESS,
  payload: {
    user
  }
});

export const fetchSelectedAccountError = (error: any) => ({
  type: FETCH_SELECT_ACCOUNT_FAILURE,
  payload: {
    error
  }
});
