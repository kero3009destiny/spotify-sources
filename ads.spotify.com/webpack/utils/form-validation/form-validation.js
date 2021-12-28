export const validationNames = { required: 'required', email: 'email' };

export const formValidations = {
  [validationNames.required]: {
    message: 'formError.required',
    validation: value => !!value,
  },
  [validationNames.email]: {
    message: 'formError.email',
    validation: value => {
      /*
       * Taken from https://emailregex.com/
       */
      const emailRegex = RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );

      return emailRegex.test(value);
    },
  },
};

/**
 * Validates an input value using one or many validation functions
 *
 * @param {String} input the input's value
 * @param {Array} validationsArray Array of validation names, must be existing validations
 * name inside the validations array
 */
export const validate = (input, validationsArray = []) => {
  const value = typeof input === 'string' ? input.trim() : input;
  // If the field is empty and it is not required, accept it as valid
  if (value === '' && !validationsArray.includes(validationNames.required)) {
    return { isValid: true };
  }

  const firstValidationToFail = validationsArray.find(
    validation => !formValidations[validation].validation(value),
  );

  return firstValidationToFail
    ? {
        isValid: false,
        message: formValidations[firstValidationToFail].message,
      }
    : { isValid: true };
};
