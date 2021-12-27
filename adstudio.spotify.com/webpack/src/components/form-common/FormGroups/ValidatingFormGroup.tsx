import React from 'react';
import { FormSpy } from 'react-final-form';
import { get } from 'lodash';
import styled from 'styled-components';

import {
  EnhancedFormGroup,
  EnhancedFormGroupProps,
} from '@spotify-internal/encore-advertising-web';
import { FormHelpText, spacer8 } from '@spotify-internal/encore-web';

export type ValidatingFormGroupProps = EnhancedFormGroupProps & {
  validateFields: [string, ...string[]]; // non empty array of strings
  hideError?: boolean;
  errorMessage?: string;
};

// The inferred type of "X" cannot be named without a reference to "Y" error. TS error is probably coming from encore-web
// @ts-ignore
export const StyledFormHelpText = styled(FormHelpText)<
  Pick<ValidatingFormGroupProps, 'showHelpTextAboveChildren'>
>`
  margin: ${props =>
    props.showHelpTextAboveChildren ? `0 0 ${spacer8}` : `${spacer8} 0 0`};
`;

export const ValidatingFormGroup: React.FC<ValidatingFormGroupProps> = ({
  validateFields,
  hideError,
  errorMessage,
  children,
  ...formGroupProps
}) => (
  <FormSpy subscription={{ touched: true, errors: true }}>
    {({ touched, errors }) => {
      const erroredFieldName = validateFields.find(
        // use 'get' function for errors because errors (unlike touched) is not a flat object
        field => touched?.[field] && get(errors, field),
      );
      const isInvalid = validateFields.find(field => get(errors, field));
      return (
        <EnhancedFormGroup
          labelFor={validateFields[0]}
          aria-invalid={!!isInvalid}
          helpText={
            !!erroredFieldName &&
            !hideError && (
              <StyledFormHelpText error {...formGroupProps}>
                {errorMessage ?? get(errors, erroredFieldName)}
              </StyledFormHelpText>
            )
          }
          {...formGroupProps}
        >
          {children}
        </EnhancedFormGroup>
      );
    }}
  </FormSpy>
);
