import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import compact from 'lodash/compact';

import { validationNames } from 'utils/form-validation';
import { useFormState, useField } from 'components/molecules/form/FormContext';
import { MODIFIERS } from 'components/molecules/country-field/CountryField.styled';
import { CountryField } from 'components/molecules';
import LOCALE_COUNTRIES from 'constants/localeCountries';

import * as Styled from './Field.styled';

const FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  CHECKBOX: 'checkbox',
  COUNTRY: 'country',
  STATE: 'state',
  SUBMIT: 'submit',
};

const FIELD_NAMES = {
  COUNTRY: 'Country',
  STATE: 'State',
};

/**
 * TextField component
 * @param {string|null} className - The component class name.
 * @param {string} fieldName - Field name
 * @param {string} label - Field label
 * @param {string} type - Field type
 * @param {string} required - Whether required or not
 * @param {string} placeHolderColor - The placeholder color
 * @returns {ReactElement}
 */
const TextField = ({
  fieldName,
  label,
  type,
  required,
  className = null,
  placeHolderColor = '',
}) => {
  const { values, errors, dirty, textColor } = useFormState();
  const { setFieldValue, setFieldError, setFieldDirty } = useField({
    fieldName,
    defaultValue: '',
    required,
  });
  const validations = useMemo(
    () =>
      compact([
        required && validationNames.required,
        type === FIELD_TYPES.EMAIL && validationNames.email,
      ]),
    [required, type],
  );

  const onChange = useCallback(
    event => setFieldValue(event.currentTarget.value),
    [],
  );

  const onValidate = useCallback(({ valid }) => {
    setFieldError(!valid);
  }, []);

  const onBlur = useCallback(() => {
    if (!dirty[fieldName]) {
      setFieldDirty();
    }
  }, [dirty[fieldName]]);

  return (
    <Styled.Input
      className={className}
      value={values[fieldName]}
      onChange={onChange}
      onBlur={onBlur}
      aria-invalid={errors[fieldName]}
      valid={dirty[fieldName] ? !errors[fieldName] : null}
      name={fieldName}
      onValidate={onValidate}
      validations={validations}
      aria-label={label}
      placeholder={label}
      type={type}
      required={required}
      color={textColor}
      placeHolderColor={placeHolderColor}
    />
  );
};

/**
 * CheckboxField component
 * @param {string|null} className - The component class name.
 * @param {string} fieldName - Field name
 * @param {string} label - Field label
 * @returns {ReactElement}
 */
const CheckboxField = ({ fieldName, label, className = null }) => {
  const { values, textColor } = useFormState();
  const { setFieldValue } = useField({ fieldName, defaultValue: false });

  const onChange = useCallback(
    event => setFieldValue(event.currentTarget.checked),
    [],
  );

  return (
    <Styled.Checkbox
      key={fieldName}
      checked={values[fieldName]}
      text={label}
      onChange={onChange}
      value={fieldName}
      className={className}
      color={textColor}
    />
  );
};

/**
 * Submit component
 * @param {string|null} className - The component class name.
 * @param {string} label - Field label
 * @returns {ReactElement}
 */
const Submit = ({ label, className }) => {
  const { errors, submitting } = useFormState();

  const disabled = useMemo(() => {
    // If no errors
    return !!compact(Object.values(errors)).length;
  }, [errors]);

  return (
    <Styled.Submit disabled={submitting || disabled} className={className}>
      {label}
    </Styled.Submit>
  );
};

/**
 * Country component
 * @param {boolean} required - Whether required or not
 * @returns {ReactElement}
 */
const Country = ({ required }) => {
  const { values } = useFormState();
  const {
    setFieldValue: setCountry,
    setFieldError: setCountryError,
  } = useField({
    fieldName: FIELD_NAMES.COUNTRY,
    required,
  });
  const { setFieldValue: setState, setFieldError: setStateError } = useField({
    fieldName: FIELD_NAMES.STATE,
    required,
  });

  const onChange = useCallback(event => {
    const { name, value } = event.currentTarget;

    if (name === FIELD_NAMES.COUNTRY) {
      if (value !== LOCALE_COUNTRIES.UNITED_STATES) {
        setState('');
        setStateError(false);
      } else if (required) setStateError(true);

      return setCountry(event.currentTarget.value);
    }

    return setState(event.currentTarget.value);
  }, []);

  const onValidate = useCallback(({ name: fieldName, valid }) => {
    if (!required) return;
    if (fieldName === FIELD_NAMES.COUNTRY) {
      setCountryError(!valid);
    } else {
      setStateError(!valid);
    }
  }, []);

  return (
    <CountryField
      valueCountry={values[FIELD_NAMES.COUNTRY]}
      onChangeField={onChange}
      onValidation={onValidate}
      valueState={values[FIELD_NAMES.STATE]}
      required={required}
      modifier={MODIFIERS.inlineForm}
    />
  );
};

Country.propTypes = {
  /**
   * Whether required or not
   */
  required: PropTypes.bool,
};

const FIELD_COMPONENTS = {
  [FIELD_TYPES.TEXT]: TextField,
  [FIELD_TYPES.EMAIL]: TextField,
  [FIELD_TYPES.CHECKBOX]: CheckboxField,
  [FIELD_TYPES.COUNTRY]: Country,
  [FIELD_TYPES.SUBMIT]: Submit,
};

/**
 * Field component
 * @param {string} fieldName - Field name
 * @param {string} label - Field label
 * @param {string} type - Field type
 * @param {string} required - Whether required or not
 * @param {string|null} className - The component class name.
 * @param {string} placeHolderColor - The placeholder color
 * @returns {ReactElement}
 */
const Field = ({
  fieldName = '',
  label,
  type,
  required = false,
  className = null,
  placeHolderColor = '',
}) => {
  const FieldComponent = FIELD_COMPONENTS[type] || TextField;

  return (
    <FieldComponent
      type={type}
      fieldName={fieldName}
      label={label}
      required={required}
      className={className}
      placeHolderColor={placeHolderColor}
    />
  );
};

Field.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * Field name
   */
  fieldName: PropTypes.string,
  /**
   * Field label
   */
  label: PropTypes.string.isRequired,
  /**
   * Field type
   */
  type: PropTypes.string.isRequired,
  /**
   * Whether required or not
   */
  required: PropTypes.bool,
  /**
   * The place holder color
   */
  placeHolderColor: PropTypes.string,
};

export default Field;
