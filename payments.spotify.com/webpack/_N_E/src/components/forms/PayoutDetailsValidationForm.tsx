import React from 'react';
import { FormContainer } from './FormStyledComponents';
import { BankAccountFormData } from '.';
import { FormHeader } from './FormHeader';
import { EditContainer } from './EditContainer';
import { RegistrationStep } from '../../lib/registrationReducer';
import { Type } from '@spotify-internal/encore-web';
import { trackEvent } from '../../lib/tracking';
import { onboardingConfirmationSubmitEvent } from '../../lib/tracking/definition/gabito/onboarding';

type Props = {
  onSubmit: () => void;
  onEditStep: (formId: RegistrationStep, confirmationId: RegistrationStep) => void;
  data: BankAccountFormData;
  onboardingId: string;
};

export function PayoutDetailsValidationForm({ onSubmit, onEditStep, data, onboardingId }: Props) {
  const onFormSubmit = (e: React.FormEvent) => {
    trackEvent(onboardingConfirmationSubmitEvent({ onboardingId, confirmationId: RegistrationStep.PAYOUT_VALIDATION }));
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={onFormSubmit} id="step-form">
      <FormContainer>
        <FormHeader
          category="Payout details"
          title="Check your answers"
          description="Make sure your bank account details are correct before completing!"
        />

        <EditContainer
          title="Bank details"
          onEdit={() => onEditStep(RegistrationStep.DESTINATION, RegistrationStep.DESTINATION)}
        >
          <Type>Account type: {data.bankAccountPurpose}</Type>
          <br />
          <Type>Routing number: {data.branchId}</Type>
          <br />
          <Type>Account number: {data.bankAccountId}</Type>
        </EditContainer>
      </FormContainer>
    </form>
  );
}
