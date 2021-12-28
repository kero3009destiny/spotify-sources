import React, { ForwardedRef, ChangeEventHandler } from 'react';

import { ICONS } from 'constants/icons';
import { useTranslation } from 'i18n/nexti18n';

import * as Styled from './Dropdown.styled';

/**
 * Renders a dropdown
 *
 * @param {String} labelText Select's label
 * @param {String} id Select's id
 * @param {String} labelText Select's id
 * @param {String} placeholder Input's placeholder
 * @param {Function} onChange Fuction to trigger on the change event
 * @param {Function} onBlur Function to trigger the on blur event
 * @param {Array} options Array of options
 * @param {Boolean} asInput whether or not to render the select with input styles
 * @param {String} className Class to override current styles
 * @param {String} value The input's value
 * @param {String} name the input's name
 */

export interface DropdownOption {
  value: string;
  text: string;
  key?: string;
  disabled?: boolean;
}

export interface DropdownProps {
  /**
   * Select's id
   */
  id?: string;
  /**
   * Select's label
   */
  labelText?: string;
  /**
   * Input's placeholder
   */
  placeholder?: string;
  /**
   * Array of options
   */
  options: Array<DropdownOption>;
  /**
   * Function to trigger on the change event
   */
  onChange: ChangeEventHandler<HTMLSelectElement>;
  /**
   * Function to trigger the on blur event
   */
  onBlur?: () => void;
  /**
   * Whether or not to render the select with input styles
   */
  asInput?: boolean;
  /**
   * Class to override current styles
   */
  className?: string;

  name?: string;

  value?: string;

  disabled?: boolean;

  forwardedRef?: ForwardedRef<HTMLSelectElement>;
}

const Dropdown = ({
  id = '',
  labelText = '',
  placeholder = '',
  options,
  onChange,
  onBlur,
  asInput = false,
  className = undefined,
  forwardedRef = null,
  value = '',
  name = '',
  ...props
}: DropdownProps) => {
  const { t } = useTranslation();
  const DropdownStyle = asInput ? Styled.DropdownAsInput : Styled.Dropdown;

  return (
    <Styled.Label
      htmlFor={id}
      className={className}
      aria-labelledby={placeholder}
    >
      {labelText && <Styled.Span>{t(labelText)}</Styled.Span>}
      <Styled.DropdownContainer>
        <DropdownStyle
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          ref={forwardedRef}
          value={value}
          name={name}
          {...props}
        >
          {options.map(option => (
            <option
              key={option.key || option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {t(option.text)}
            </option>
          ))}
        </DropdownStyle>
        <Styled.Caret name={ICONS.CARET_DOWN} />
      </Styled.DropdownContainer>
    </Styled.Label>
  );
};

export default React.forwardRef<HTMLSelectElement, DropdownProps>(
  (props, ref) => <Dropdown forwardedRef={ref} {...props} />,
);
