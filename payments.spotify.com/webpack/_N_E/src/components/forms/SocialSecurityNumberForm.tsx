import React, { useEffect } from 'react';
import { FormCheckbox, FormGroup, FormHelpText, FormInput, Type } from '@spotify-internal/encore-web';
import { FormContainer } from './FormStyledComponents';
import { FormHeader } from './FormHeader';
import { useForm } from 'react-hook-form';
import { FieldErrorType, trackEvent } from '../../lib/tracking';
import {
  onboardingFormFieldValidationErrorEvent,
  onboardingFormSubmitEvent,
} from '../../lib/tracking/definition/gabito/onboarding';
import { RegistrationStep } from '../../lib/registrationReducer';

export type SocialSecurityFormData = {
  ssn: string;
  taxFilingConsentGiven: boolean;
};

type Props = {
  onSubmit: (data: SocialSecurityFormData) => void;
  onboardingId: string;
  email: string;
  data?: SocialSecurityFormData;
};

// SSN: Social Security Numbers in the US are xxx-xx-xxxx this validator looks at the string we entered to see if it
// matches the criteria it is also possible to enter xxxxxxxxx and it will be valid as long as the initial numbers
// are not 666 000 or 9xx in any case. for more information look at
// https://www.geeksforgeeks.org/how-to-validate-ssn-social-security-number-using-regular-expression/
export const ssnPatternValidator =
  /(?!(\d){3}(-| |)\1{2}\2\1{4})(?!666|000|9\d{2})(\b\d{3}(-| |)(?!00)\d{2}\4(?!0{4})\d{4}\b)/g;

export function SocialSecurityNumberForm({ onSubmit, data, email, onboardingId }: Props) {
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
    setValue('ssn', event.target.value.trim(), {
      shouldValidate: true,
    });
  };

  useEffect(() => {
    if (isSubmitting) {
      trackEvent(onboardingFormSubmitEvent({ onboardingId, formId: RegistrationStep.SOCIAL_SECURITY }));

      if (Object.keys(errors).length > 0) {
        Object.keys(errors).map((field) => {
          trackEvent(
            onboardingFormFieldValidationErrorEvent({
              onboardingId,
              formId: RegistrationStep.SOCIAL_SECURITY,
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
          title="Social Security Number"
          description="We collect this for tax purposes and nothing else."
        />
        <FormGroup label="Social Security Number" indicator="required">
          <FormInput
            type="text"
            autoComplete="off"
            placeholder="123-45-6789"
            {...register('ssn', {
              pattern: ssnPatternValidator,
              required: true,
            })}
            onBlur={onBlur}
            error={!!errors.ssn}
          />
          {errors.ssn && <FormHelpText error>Enter a valid social security number: 123-45-6789</FormHelpText>}
        </FormGroup>

        <Type semanticColor="textSubdued">We’ll send relevant tax-filing information to</Type>
        <Type variant="cello">{email}</Type>

        <FormGroup>
          <FormCheckbox
            id="tax-info"
            {...register('taxFilingConsentGiven', {
              pattern: ssnPatternValidator,
              required: true,
            })}
          >
            I consent to receive tax filing information via e-mail where applicable.
          </FormCheckbox>
          {errors.taxFilingConsentGiven && <FormHelpText error>This is required</FormHelpText>}
        </FormGroup>
      </FormContainer>
    </form>
  );
}
