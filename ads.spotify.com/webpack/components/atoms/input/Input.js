import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import { ICONS } from 'constants/icons';
import { colors } from 'styles/variables';
import { validationNames, validate } from 'utils/form-validation';

import * as Styled from './Input.styled';

/**
 * Renders an Input component
 *
 * @param {String} className custom className
 * @param {String} name input name
 * @param {String} placeholder input placeholder
 * @param {String} value input value
 * @param {Boolean|null} valid flag for input validations
 * @param {Array} validations Validation rules array
 * @param {Function} onChange function to call when the change event is triggered
 * @param {Function} onValidate function to call when the blur event is triggered
 * validations are checked when the input blur event is triggered
 */
const Input = ({
  className = null,
  name = '',
  placeholder = '',
  value = '',
  valid = null,
  validations = [],
  onChange,
  onBlur = () => {},
  onValidate = () => true,
  ...props
}) => {
  const isFirstRun = useRef(true);

  /**
   * Validates the input and runs the onValidate prop
   */
  const validateInput = () => {
    const { isValid, message = '' } = validate(value, validations);

    onValidate({ name, valid: isValid, message });
  };

  const onInputBlur = () => {
    onBlur();
    validateInput();
  };

  useEffect(() => {
    // Avoid input validation on the first render
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    validateInput();
  }, [value]);

  return (
    <Styled.Container className={className}>
      <Styled.Input
        className={classNames({ invalid: valid === false })}
        htmlFor={value}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onInputBlur}
        {...props}
      />
      {(value || !valid) && valid !== null && (
        <Styled.ValidationIcon
          color={valid ? colors.spotifyGreen : colors.errorRed}
          name={valid ? ICONS.FORM_SUCCESS : ICONS.FORM_ERROR}
        />
      )}
    </Styled.Container>
  );
};

Input.propTypes = {
  /**
   * The className ref.
   */
  className: PropTypes.string,
  /**
   * Input name
   */
  name: PropTypes.string.isRequired,
  /**
   * Input placeholder
   */
  placeholder: PropTypes.string,
  /**
   * Input value
   */
  value: PropTypes.string,
  /**
   * Input validity
   */
  valid: PropTypes.bool,
  /**
   * Validation rules array
   */
  validations: PropTypes.arrayOf(
    PropTypes.oneOf(
      Object.keys(validationNames).map(name => validationNames[name]),
    ),
  ),
  /**
   * function to call when the change event is triggered
   */
  onChange: PropTypes.func.isRequired,
  /**
   * function to call when the blur event is triggered
   */
  onValidate: PropTypes.func,
};

export default Input;
