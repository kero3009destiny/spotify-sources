import {
  FlightDuplicationOptions,
  FlightDuplicationOptionValues,
} from './types';

export const FORM_ID = 'duplication-form-modal';
export const FIELD_NAME = 'duplicationOption';
export const initialValues: FlightDuplicationOptionValues = {
  [FIELD_NAME]: FlightDuplicationOptions.DUPLICATE_WITH_CREATIVES,
};
export const podcastInitialValues: FlightDuplicationOptionValues = {
  [FIELD_NAME]: FlightDuplicationOptions.DUPLICATE_WITHOUT_CREATIVES,
};
export const MODAL_TEST_ID = 'flight-duplication-modal';
