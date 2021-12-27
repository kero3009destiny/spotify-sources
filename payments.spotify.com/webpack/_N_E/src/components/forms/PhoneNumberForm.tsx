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

export type PhoneNumberFormData = {
  phoneNumber: string;
};

type Props = {
  onSubmit: (data: PhoneNumberFormData) => void;
  onboardingId: string;
  data?: PhoneNumberFormData;
};

// Using the same validation pattern as in the tax service:
// https://ghe.spotify.net/fin-busters/tax-profile/blob/master/src/main/java/com/spotify/taxprofile/validation/InputValidator.java
export const phoneNumberPatternValidator = /^\+(?:[0-9] ?){6,14}[0-9]$/g;

export function PhoneNumberForm({ onSubmit, data, onboardingId }: Props) {
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
    setValue(event.target.name as keyof PhoneNumberFormData, event.target.value.trim(), {
      shouldValidate: true,
    });
  };

  useEffect(() => {
    if (isSubmitting) {
      trackEvent(onboardingFormSubmitEvent({ onboardingId, formId: RegistrationStep.PHONE_NUMBER }));

      if (Object.keys(errors).length > 0) {
        Object.keys(errors).map((field) => {
          trackEvent(
            onboardingFormFieldValidationErrorEvent({
              onboardingId,
              formId: RegistrationStep.PHONE_NUMBER,
              field: field,
              type: FieldErrorType.INVALID,
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
          title="Phone number"
          description="This is for identification purposes only. No spam calls, don't worry."
        />
        <FormGroup label="Phone number" indicator="required">
          <FormInput
            type="text"
            autoComplete="tel"
            placeholder="+123 123456789"
            {...register('phoneNumber', {
              pattern: phoneNumberPatternValidator,
              required: true,
            })}
            onBlur={onBlur}
            error={!!errors.phoneNumber}
          />
          {errors.phoneNumber && (
            <FormHelpText error>Enter a valid phone number, including area code: +123 123456789</FormHelpText>
          )}
        </FormGroup>
      </FormContainer>
    </form>
  );
}
