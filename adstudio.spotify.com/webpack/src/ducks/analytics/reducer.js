import { combineReducers } from 'redux';

import * as types from 'ducks/analytics/types';

const initialState = {
  partnerId: null,
  error: false,
};

function googleAnalytics(state = initialState, action) {
  switch (action.type) {
    case types.GA_PARTNER_ID_RECEIVED:
      return {
        ...state,
        ...action.payload,
      };

    case types.GA_PARTNER_ID_FETCH_FAILED:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
}

function qualaroo(state = initialState, action) {
  switch (action.type) {
    case types.QUALAROO_PARTNER_ID_RECEIVED:
      return {
        ...state,
        ...action.payload,
      };

    case types.QUALAROO_PARTNER_ID_FETCH_FAILED:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
}

function qualtrics(state = initialState, action) {
  switch (action.type) {
    case types.QUALTRICS_PARTNER_ID_RECEIVED:
      return {
        ...state,
        ...action.payload,
      };

    case types.QUALTRICS_PARTNER_ID_FETCH_FAILED:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
}

export default combineReducers({
  googleAnalytics,
  qualaroo,
  qualtrics,
});
