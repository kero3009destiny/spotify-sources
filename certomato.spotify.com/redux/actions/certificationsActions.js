import {
  GET_CERTIFICATIONS,
  GET_CERTIFICATION_REPORT,
  API_ERROR,
  GET_CERTIFICATION_QUESTIONS,
} from './types';
import * as api from '../../api/api';
import Utils from '../../utils/Utils';
import { CERTIFICATION_FILTERS } from '../../utils/Constants';

/**
 Loads certifications that the current user has access to.
 */

export const getCertifications = (search, status, onlyCurrentUser = false) => dispatch => {
  api.getCertifications(search, status, onlyCurrentUser).then((payload) => {
    // onlyCurrentUser is currently only used for status TESTING
    const filter = onlyCurrentUser ? CERTIFICATION_FILTERS.TESTING_CURRENT_USER : status;
    if (payload !== undefined && !(payload.data.constructor === Object && Object.entries(payload.data).length === 0)) {
      dispatch({
        type: GET_CERTIFICATIONS,
        payload: {
          certifications: payload.data.certification,
          filter,
        },
      });
    } else {
      dispatch({
        type: GET_CERTIFICATIONS,
        payload: {
          certifications: [],
          filter,
        },
      });
    }
  }).catch(error => {
    if (Utils.exists(error.response)) {
      dispatch({
        type: API_ERROR,
        payload: error.response,
      });
    }
  });
};

/**
 Loads the full report of a single certification.
 */
export const getCertificationReport = (certificationId) => dispatch => {
  api.getCertificationReport(certificationId).then((payload) => {
    if (payload !== undefined) {
      dispatch({
        type: GET_CERTIFICATION_REPORT,
        payload: payload.data,
      });
    }
  }).catch(error => {
    if (Utils.exists(error.response)) {
      dispatch({
        type: API_ERROR,
        payload: error.response,
      });
    }
  });
};

/**
 Loads questions for Certification creation
 */
export const getQuestions = () => (dispatch) => {
  api.getQuestions().then((payload) => {
    if (payload !== undefined) {
      dispatch({
        type: GET_CERTIFICATION_QUESTIONS,
        payload: payload.data.certificationQuestions,
      });
    }
  }).catch(error => {
    if (Utils.exists(error.response)) {
      dispatch({
        type: API_ERROR,
        payload: error.response,
      });
    }
  });
};
