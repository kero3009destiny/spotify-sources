import React, { MutableRefObject, useState } from 'react';
import styled from 'styled-components';
import FieldWrapper from './fieldWrapper';

interface IFieldProps {
  type: string;
  label?: string;
  placeholder?: string;
  value?: any;
  name: string;
  hidden?: boolean;
  className?: string;
  onChange?: (e: any) => void;
  fieldRef?: MutableRefObject<any>;
  isReadOnly?: boolean;
  isBordered?: boolean;
}

const StyledInput = styled.input`
  display: block;
  width: 100%;
  background: none;
  appearance: none;
  padding: ${(props: IFieldProps) => props.isBordered ? '13px' : '13px 0'};
  border: ${(props: IFieldProps) => props.isBordered ? '1px solid var(--color-GRAY-DARK)' : 0};
  border-bottom: 1px solid var(--color-GRAY-DARK);
  border-radius: 0;
  color: var(--color-GRIM);
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
  transition: padding ease 0.2s;

  &:focus {
    border-color: var(--color-GRIM);
    padding: 13px;
  }
`

const Field = (props: IFieldProps) => {
  const changeCallback = (e: any) => {
    if (typeof props.onChange === 'function') {
      return props.onChange(e);
    }
  };

  if (props.hidden) {
    return <input value={props.value} name={props.name} hidden readOnly />;
  } else {
    return (
      <FieldWrapper
        label={props.label}
        name={props.name}
        className={props.className}
      >
        <StyledInput
          type={props.type}
          placeholder={props.placeholder || props.label}
          id={props.name}
          name={props.name}
          onChange={e => changeCallback(e)}
          readOnly={props.isReadOnly}
          value={props.value}
          isBordered={props.isBordered}
          ref={props.fieldRef}
        />
      </FieldWrapper>
    );
  }
};

Field.defaultProps = {
  readOnly: false
}

export default Field;
