import React, { useEffect } from 'react';
import { FormGroup, FormHelpText, FormInput } from '@spotify-internal/encore-web';
import { FormContainer } from './FormStyledComponents';
import { FormHeader } from './FormHeader';
import { useForm } from 'react-hook-form';
import { FieldErrorType, trackEvent } from '../../lib/tracking';
import {
  onboardingFormFieldValidationErrorEvent,
  onboardingFormSubmitEvent,
} from '../../lib/tracking/definition/gabito/onboarding';
import { RegistrationStep } from '../../lib/registrationReducer';

export type LegalNameFormData = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

type Props = {
  onSubmit: (data: LegalNameFormData) => void;
  onboardingId: string;
  data?: LegalNameFormData;
};

export function LegalNameForm({ onSubmit, data, onboardingId }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      ...data,
    },
  });

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setValue(event.target.name as keyof LegalNameFormData, event.target.value.trim(), {
      shouldValidate: true,
    });
  };

  useEffect(() => {
    if (isSubmitting) {
      trackEvent(onboardingFormSubmitEvent({ onboardingId, formId: RegistrationStep.LEGAL_NAME }));

      if (Object.keys(errors).length > 0) {
        Object.keys(errors).map((field) => {
          trackEvent(
            onboardingFormFieldValidationErrorEvent({
              onboardingId,
              formId: RegistrationStep.LEGAL_NAME,
              field: field,
              type: FieldErrorType.REQUIRED,
            }),
          );
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="step-form">
      <FormContainer>
        <FormHeader
          category="Personal Info"
          title="Full Name"
          description="We need your name as it appears on official documents for payment purposes."
        />
        <FormGroup label="First name" indicator="required">
          <FormInput
            type="text"
            autoComplete="given-name"
            {...register('firstName', { required: 'This field is required' })}
            onBlur={onBlur}
            error={!!errors.firstName}
          />
          {errors.firstName && <FormHelpText error>{errors.firstName.message}</FormHelpText>}
        </FormGroup>
        <FormGroup label="Middle names">
          <FormInput type="text" autoComplete="additional-name" {...register('middleName')} onBlur={onBlur} />
        </FormGroup>
        <FormGroup label="Last name" indicator="required">
          <FormInput
            type="text"
            autoComplete="family-name"
            {...register('lastName', { required: 'This field is required' })}
            onBlur={onBlur}
            error={!!errors.lastName}
          />
          {errors.lastName && <FormHelpText error>{errors.lastName.message}</FormHelpText>}
        </FormGroup>
      </FormContainer>
    </form>
  );
}
