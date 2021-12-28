import store from 'store';
export const FETCH_SELECT_COMPANY_BEGIN = 'FETCH_SELECT_COMPANY_BEGIN';
export const FETCH_SELECT_COMPANY_SUCCESS = 'FETCH_SELECT_COMPANY_SUCCESS';
export const FETCH_SELECT_COMPANY_FAILURE = 'FETCH_SELECT_COMPANY_FAILURE';
import {setLoadingBegin, setLoadingFinished} from './contentLoadingAction';

// get lessons data from the api
export function fetchSelectedCompany(id:number) {
  return (dispatch:any) => {
    dispatch(fetchSelectedCompanyBegin());
    dispatch(setLoadingBegin());
    // if account is not is LS fetch it
    if (typeof store.get('selected_company') === 'undefined') {
      return fetch(`/api/company/${id}`)
      .then(res => res.json())
      .then(company_details => {
        store.set('selected_company', company_details[0]);
        dispatch(setLoadingFinished())
        dispatch(fetchSelectedCompanySuccess(company_details[0]));
      })
      .catch(err => {
        dispatch(setLoadingFinished())
        dispatch(fetchSelectedCompanyError(err))
      });
    } else {
      // if account IS in LS and the requested ID is different fetch it
      if (store.get('selected_company').id !== id) {
        return fetch(`/api/company/${id}`)
        .then(res => res.json())
        .then(company_details => {
          store.set('selected_company', company_details[0]);
          dispatch(setLoadingFinished())
          dispatch(fetchSelectedCompanySuccess(company_details[0]));
        })
        .catch(err => {
          dispatch(setLoadingFinished())
          dispatch(fetchSelectedCompanyError(err))
        });
      } else {
        // otherwise just use the LS data as state
        dispatch(setLoadingFinished())
        dispatch(fetchSelectedCompanySuccess(store.get('selected_company')));
      }
    }
  };
}

export const fetchSelectedCompanyBegin = () => ({
  type: FETCH_SELECT_COMPANY_BEGIN
});

export const fetchSelectedCompanySuccess = (company:any) => ({
  type: FETCH_SELECT_COMPANY_SUCCESS,
  payload: {
    company
  }
});

export const fetchSelectedCompanyError = (error:any) => ({
  type: FETCH_SELECT_COMPANY_FAILURE,
  payload: {
    error
  }
});
