import React, { FunctionComponent } from 'react';
import { FieldInputProps, FieldMetaState } from 'react-final-form';
import styled from 'styled-components';

import {
  FormGroup,
  FormHelpText,
  semanticColors,
  Type,
} from '@spotify-internal/encore-web';

import { FormGroupLabel } from 'components/form-common/FormGroupLabel';

const StyledFormGroup = styled(FormGroup)<{ condensed?: boolean }>`
  ${props => (props.condensed ? `padding-bottom: 0;` : '')}
`;

export interface FinalFormGroupProps {
  input: FieldInputProps<any>;
  meta: FieldMetaState<any>;
  label?: string | React.ReactElement;
  subdescription?: string | React.ReactElement;
  children: React.ReactNode;
  className?: string;
  inline?: boolean;
  condensed?: boolean;
  // Hide validation errors until field is focused and then blurred,
  // to prevent errors showing while user is still initially typing
  hideErrorUntilTouched?: boolean;
}

export const FinalFormGroup: FunctionComponent<FinalFormGroupProps> = ({
  input,
  meta,
  label,
  subdescription,
  children,
  className,
  inline,
  condensed,
  hideErrorUntilTouched,
}: FinalFormGroupProps) => {
  const shouldShowError = hideErrorUntilTouched
    ? meta.touched
    : meta.touched || meta.dirty || !!input.value;

  return (
    <StyledFormGroup
      condensed={condensed}
      className={className}
      labelFor={input.name}
      inline={inline ? inline : false}
      label={
        <>
          {label ? (
            <FormGroupLabel variant={Type.body2} weight={Type.bold}>
              {label}
            </FormGroupLabel>
          ) : null}
          {subdescription ? (
            <FormGroupLabel
              variant={Type.body2}
              semanticColor={semanticColors.textSubdued}
            >
              {subdescription}
            </FormGroupLabel>
          ) : null}
        </>
      }
    >
      {children}
      {meta.error && shouldShowError && (
        <FormHelpText error>{meta.error}</FormHelpText>
      )}
    </StyledFormGroup>
  );
};
