import {GET_CERTIFICATION_QUESTIONS, GET_CERTIFICATION_REPORT, GET_CERTIFICATIONS} from '../actions/types';
import { CERTIFICATION_FILTERS } from '../../utils/Constants';

const initialState = {
  certifications: {},
  filters: {
    [CERTIFICATION_FILTERS.ALL]: null,
    [CERTIFICATION_FILTERS.TESTING]: null,
    [CERTIFICATION_FILTERS.SUBMITTED]: null,
    [CERTIFICATION_FILTERS.PASSED]: null,
    [CERTIFICATION_FILTERS.FAILED]: null,
    [CERTIFICATION_FILTERS.TESTING_CURRENT_USER]: null,
  },
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case GET_CERTIFICATIONS: {
      return {
        ...state,
        certifications: payload.certifications.reduce((certificationsObject, certification) => ({
          ...certificationsObject,
          [certification.certificationId]: certification,
        }), state.certifications),
        filters: {
          ...state.filters,
          [payload.filter]: payload.certifications.map(cert => cert.certificationId),
        },
      };
    }
    case GET_CERTIFICATION_REPORT: {
      return {
        ...state,
        certificationReport: payload,
      };
    }
    case GET_CERTIFICATION_QUESTIONS: {
      return {
        ...state,
        questions: payload,
      };
    }
    default:
      return state;
  }
}
