import { get, isEmpty, isEqual } from 'lodash';
import {
  getFormSyncErrors,
  getFormValues,
  isDirty,
  isInvalid,
} from 'redux-form';

export const hasFormMounted = (state, formName) =>
  !isEmpty(get(state, `form.${formName}.fields`)) ||
  !isEmpty(get(state, `form.${formName}.registeredFields`));

export const doesReduxFormHaveErrors = (state, formName) => {
  // Check for errors on mounted & unmounted fields
  // isInvalid returns false always for unmounted fields
  return (
    isInvalid(formName)(state) ||
    !isEqual(getFormSyncErrors(formName)(state), {})
  );
};

// combines all redux forms currently into the store into a map by name
export const getReduxFormValues = state =>
  Object.keys(state.form).reduce(
    (result, formName) => ({
      ...result,
      [formName]: getFormValues(formName)(state),
    }),

    {},
  );

// returns a validation object matching the old style for a given form name
export const getValidationForReduxForm = (state, formName) => ({
  touched: isDirty(formName)(state),
  isValid: !doesReduxFormHaveErrors(state, formName),
});
