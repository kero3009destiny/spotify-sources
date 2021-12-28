import React, { MutableRefObject } from 'react';
import styled from 'styled-components';

interface IFieldWrapperProps {
  label?: string;
  name?: string;
  className?: string;
  children: any;
}

const StyledFieldWrapper = styled.div`
  display: block;
  width: 100%;
`;

const StyledFieldWrapperLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--color-TUNDORA);
`

const FieldWrapper = ({
  label,
  name,
  className,
  children
}: IFieldWrapperProps) => {
  return (
    <StyledFieldWrapper className={className}>
      {label && <StyledFieldWrapperLabel htmlFor={name}>{label}</StyledFieldWrapperLabel>}
      <div>
        {children}
      </div>
    </StyledFieldWrapper>
  )
};

export default FieldWrapper;
