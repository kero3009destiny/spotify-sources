import React from 'react';
import styled from 'styled-components';
import FieldWrapper from './fieldWrapper';

interface IStaticFieldProps {
  label: string
  value: any
}

const StyledStaticFieldText = styled.h2`
  font-size: 36px;
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 24px;
    white-space: normal;
    word-break: break-word;
  }
`

const StaticField = (props: IStaticFieldProps) => {
  return (
    <FieldWrapper
      label={props.label}
      className="static-field-container"
    >
      <StyledStaticFieldText>{props.value}</StyledStaticFieldText>
    </FieldWrapper>
  )
}

StaticField.defaultProps = {
  label: '',
  value: ''
}

export default StaticField;
