import {
  CHECKBOX_CHANGE,
  GET_SUBMISSION_FIELDS,
  TEXTFIELD_DID_CHANGE,
} from './types';

/**
 * Handles actions on the submission form
 * for submitting a certification report.
 * */

/**
 A checkbox value has changed.
 {<checkboxId>: {checked: true|false}}
 */
export const checkboxChange = (checkbox) => dispatch => {
  dispatch({
    type: CHECKBOX_CHANGE,
    payload: checkbox,
  });
};

/**
 * Handles actions on the submission form
 * for submitting a certification report.
 * */

/**
 Gets all form fields for the submission,
 including all checkboxes and text fields to display, and their current status.
 */
export const getSubmissionFields = () => dispatch => {
  dispatch({
    type: GET_SUBMISSION_FIELDS,
  });
};

/**
 A textfield input changed.
 {<checkboxId>: {checked: true|false}}
 */
export const textfieldDidChange = (id, value) => dispatch => {
  dispatch({
    type: TEXTFIELD_DID_CHANGE,
    id: id,
    value: value,
  });
};
