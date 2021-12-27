import React, { useState } from 'react';
import { FormContainer } from './FormStyledComponents';
import { AddressFormData, LegalNameFormData, PhoneNumberFormData, SocialSecurityFormData } from '.';
import { RegistrationStep } from '../../lib/registrationReducer';
import { FormHeader } from './FormHeader';
import { spacer20, spacer4, Type } from '@spotify-internal/encore-web';
import { EditContainer } from './EditContainer';
import { trackEvent } from '../../lib/tracking';
import { onboardingConfirmationSubmitEvent } from '../../lib/tracking/definition/gabito/onboarding';
import { IconPreview } from '@spotify-internal/encore-web';
import styled from 'styled-components';

export type CompletedFormData = {
  legalNameFormData: LegalNameFormData;
  addressFormData: AddressFormData;
  phoneNumberFormData: PhoneNumberFormData;
  socialSecurityFormData: SocialSecurityFormData;
};

type Props = {
  onSubmit: () => void;
  onEditStep: (formId: RegistrationStep, confirmationId: RegistrationStep) => void;
  data: CompletedFormData;
  onboardingId: string;
};

const StyledSsnWrapper = styled(Type)`
  display: flex;
  align-items: center;
`;

const StyledSsn = styled.span`
  width: 90px;
`;

const StyledIconPreview = styled(IconPreview)`
  cursor: pointer;
  margin-left: ${spacer4};
  height: ${spacer20};
`;

export function PersonalDetailsValidationForm({ onSubmit, data, onEditStep, onboardingId }: Props) {
  const onFormSubmit = (e: React.FormEvent) => {
    trackEvent(
      onboardingConfirmationSubmitEvent({ onboardingId, confirmationId: RegistrationStep.PERSONAL_VALIDATION }),
    );
    e.preventDefault();
    onSubmit();
  };

  const { firstName, middleName, lastName } = data.legalNameFormData;
  const middleNameWithSpacing = middleName ? ` ${middleName} ` : ' ';
  const fullName = `${firstName}${middleNameWithSpacing}${lastName}`;

  const { street, state, city } = data.addressFormData;
  const address = `${street}, ${city}, ${state}`;

  const maskedSSN = data.socialSecurityFormData.ssn.replace(/.(?=.{4})/g, '*');

  const [ssnToShow, setSsnToShow] = useState(maskedSSN);

  const toggleSsn = () => {
    setSsnToShow(ssnToShow.includes('*') ? data.socialSecurityFormData.ssn : maskedSSN);
  };

  return (
    <form onSubmit={onFormSubmit} id="step-form">
      <FormContainer>
        <FormHeader
          category="Personal Info"
          title="Check your answers"
          description="Make sure all your personal info is correct before moving onto the next step!"
        />

        <EditContainer
          title="Full name"
          onEdit={() => onEditStep(RegistrationStep.LEGAL_NAME, RegistrationStep.PERSONAL_VALIDATION)}
        >
          <Type>{fullName}</Type>
        </EditContainer>

        <EditContainer
          title="Address"
          onEdit={() => onEditStep(RegistrationStep.ADDRESS, RegistrationStep.PERSONAL_VALIDATION)}
        >
          <Type>{address}</Type>
        </EditContainer>

        {/* <EditContainer*/}
        {/*  title="Phone number"*/}
        {/*  onEdit={() => onEditStep(RegistrationStep.PHONE_NUMBER, RegistrationStep.PERSONAL_VALIDATION)}*/}
        {/* >*/}
        {/*  <Type>{data.phoneNumberFormData.phoneNumber}</Type>*/}
        {/* </EditContainer>*/}

        <EditContainer
          title="Social security number"
          onEdit={() => onEditStep(RegistrationStep.SOCIAL_SECURITY, RegistrationStep.PERSONAL_VALIDATION)}
        >
          <StyledSsnWrapper onClick={toggleSsn}>
            <StyledSsn>{ssnToShow}</StyledSsn>
            <StyledIconPreview />
          </StyledSsnWrapper>
        </EditContainer>
      </FormContainer>
    </form>
  );
}
