import ls from 'local-storage';

export const FETCH_ADDRESS_BEGIN   = 'FETCH_ADDRESS_BEGIN';
export const FETCH_ADDRESS_SUCCESS = 'FETCH_ADDRESS_SUCCESS';
export const FETCH_ADDRESS_FAILURE = 'FETCH_ADDRESS_FAILURE';

// get address countries data from the api or 
// use local storage if it exists. 
// if it doesn't exist in LS, put it there.
export function getAddressCountries() {
  return dispatch => {
    dispatch(fetchAddressBegin())
    if (!ls('countries')) {
      return fetch('/api/address/countries')
        .then(res => res.json())
        .then(countries => {
          dispatch(fetchAddressCountriesSuccess(countries))
          ls('countries', JSON.stringify(countries));
          return countries;
        })
        .catch(err => dispatch(fetchAddressError(err)))
    } else {
      return dispatch(
        fetchAddressCountriesSuccess(
          JSON.parse(ls('countries'))
        )
      )
    }
  }
}


// get address states data from the api or 
// use local storage if it exists. 
// if it doesn't exist in LS, put it there.
export function getAddressStates(id) {
  return dispatch => {
    dispatch(fetchAddressBegin())
    if (!ls('states')) {
      return fetch(`/api/address/country/${id}/states`)
        .then(res => res.json())
        .then(states => {
          dispatch(fetchAddressStatesSuccess(states));
          ls('states', JSON.stringify(states));
          return json;
        })
        .catch(err => dispatch(fetchAddressError(err)))
    } else {
      return dispatch(
        fetchAddressStatesSuccess(
          JSON.parse(ls('states'))
        )
      )
    }
  }
}

export const fetchAddressBegin = () => ({
  type: FETCH_ADDRESS_BEGIN
});

export const fetchAddressCountriesSuccess = countries => ({
  type: FETCH_ADDRESS_SUCCESS,
  payload: {countries: countries}
});

export const fetchAddressStatesSuccess = states => ({
  type: FETCH_ADDRESS_SUCCESS,
  payload: {states: states}
});

export const fetchAddressError = error => ({
  type: FETCH_ADDRESS_FAILURE,
  payload: { error }
});