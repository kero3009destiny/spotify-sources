import React from 'react';
import { FormSpy, useForm } from 'react-final-form';
import i18n from 'i18next';
import { get } from 'lodash';

import {
  EditableFormGroup,
  EditableFormGroupProps,
} from '@spotify-internal/encore-advertising-web';

import { StyledFormHelpText } from './ValidatingFormGroup';

export type ValidatingEditableFormGroupProps = EditableFormGroupProps & {
  validateFields: [string, ...string[]]; // non empty array of strings
  hideError?: boolean;
  errorMessage?: string;
};

export const ValidatingEditableFormGroup: React.FC<ValidatingEditableFormGroupProps> = ({
  validateFields,
  hideError,
  errorMessage,
  isEditing: isEditingProp,
  closeText = i18n.t('I18N_CLOSE', 'Close'),
  editText = i18n.t('I18N_EDIT', 'Edit'),
  children,
  onChange,
  ...formGroupProps
}) => {
  const form = useForm();
  const fields = validateFields?.map(name => form.getFieldState?.(name));

  // Blur every field to validate.
  const triggerValidation = () => {
    fields?.forEach(f => f?.blur());
  };

  return (
    <FormSpy subscription={{ touched: true, errors: true }}>
      {({ touched, errors }) => {
        const erroredFieldName = validateFields.find(
          // use 'get' function for errors because errors (unlike touched) is not a flat object
          field => touched?.[field] && get(errors, field),
        );
        const isInvalid = validateFields.find(field => get(errors, field));
        return (
          <EditableFormGroup
            aria-invalid={!!isInvalid}
            labelFor={validateFields[0]}
            isEditing={!!erroredFieldName || isEditingProp}
            hideClose={!!erroredFieldName}
            closeText={closeText}
            editText={editText}
            helpText={isEditing =>
              isEditing &&
              !!erroredFieldName &&
              !hideError && (
                <StyledFormHelpText error {...formGroupProps}>
                  {errorMessage ?? get(errors, erroredFieldName)}
                </StyledFormHelpText>
              )
            }
            onChange={isEditing => {
              if (!isEditing) triggerValidation();
              onChange?.(isEditing);
            }}
            forceRenderChildren
            {...formGroupProps}
          >
            {children}
          </EditableFormGroup>
        );
      }}
    </FormSpy>
  );
};
