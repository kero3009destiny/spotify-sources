import React from 'react';
import { IconCheckAltActive, spacer16, spacer24, Type } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { RegistrationStep } from '../../lib/registrationReducer';
import { styleVariables } from './styleVariables';

type Props = {
  currentStep: RegistrationStep | null;
  completedSteps: Set<RegistrationStep> | null;
};

type StylingProps = {
  isCurrentStep?: boolean;
  isCompleted?: boolean;
};

type StepInformationProps = {
  currentStep: boolean;
  step: string;
  children: React.ReactNode;
  completed?: boolean;
};

const StepIndicator = styled.span`
  width: ${spacer24};
  display: inline-block;
  font-size: 12px;
  border-radius: 50%;
  text-align: center;
  line-height: ${spacer24};
  vertical-align: middle;
  margin: 0 ${spacer16};
  max-height: ${spacer24};
`;

const StepText = styled.span`
  color: ${(props: StylingProps) =>
    props.isCurrentStep ? styleVariables.currentStepTextColor : styleVariables.stepTextColor};
  text-decoration: ${(props: StylingProps) => (props.isCompleted ? 'line-through' : 'none')};
`;

const LetteredStepIndicator = styled(StepIndicator)`
  background-color: ${(props: StylingProps) =>
    props.isCurrentStep ? styleVariables.currentRoundedLetterBg : styleVariables.roundedLetterBg};
  color: ${(props: StylingProps) =>
    props.isCurrentStep ? styleVariables.currentRoundedLetterColor : styleVariables.roundedLetterColor};
`;

const StepInformation = ({ currentStep, step, children, completed }: StepInformationProps) => {
  if (currentStep) {
    return (
      <Type as="h3" variant="body1" weight="bold">
        <LetteredStepIndicator isCurrentStep={currentStep}>{step.toUpperCase()}</LetteredStepIndicator>
        <StepText isCurrentStep={currentStep}>{children}</StepText>
      </Type>
    );
  }

  if (completed) {
    return (
      <Type as="h3" variant="body1">
        <StepIndicator>
          <IconCheckAltActive style={{ color: '#1abc54' }} />
        </StepIndicator>
        <StepText isCurrentStep={currentStep} isCompleted>
          {children}
        </StepText>
      </Type>
    );
  }

  return (
    <Type as="h3" variant="body1">
      <LetteredStepIndicator isCurrentStep={currentStep}>{step.toUpperCase()}</LetteredStepIndicator>
      <StepText isCurrentStep={currentStep}>{children}</StepText>
    </Type>
  );
};

export const StepProgressIndicator = ({ currentStep, completedSteps }: Props) => {
  const isCurrentStep = (expectedStep: RegistrationStep) => currentStep !== null && currentStep === expectedStep;
  const isCompleted = (expectedStep: RegistrationStep) => completedSteps !== null && completedSteps.has(expectedStep);

  return (
    <div>
      <Type as="h2" variant="heading4" weight="bold">
        1. Personal Info
      </Type>

      <StepInformation
        currentStep={isCurrentStep(RegistrationStep.LEGAL_NAME)}
        completed={isCompleted(RegistrationStep.LEGAL_NAME)}
        step="a"
      >
        Full Name
      </StepInformation>

      <StepInformation
        currentStep={isCurrentStep(RegistrationStep.ADDRESS)}
        completed={isCompleted(RegistrationStep.ADDRESS)}
        step="b"
      >
        Address
      </StepInformation>

      {/* <StepInformation*/}
      {/*  currentStep={isCurrentStep(RegistrationStep.PHONE_NUMBER)}*/}
      {/*  completed={isCompleted(RegistrationStep.PHONE_NUMBER)}*/}
      {/*  step="c"*/}
      {/* >*/}
      {/*  Phone number*/}
      {/* </StepInformation>*/}

      <StepInformation
        currentStep={isCurrentStep(RegistrationStep.SOCIAL_SECURITY)}
        completed={isCompleted(RegistrationStep.SOCIAL_SECURITY)}
        step="c"
      >
        Social Security Number
      </StepInformation>

      <Type as="h2" variant="heading4" weight="bold">
        2. Payout details
      </Type>

      <StepInformation
        currentStep={isCurrentStep(RegistrationStep.DESTINATION)}
        completed={isCompleted(RegistrationStep.DESTINATION)}
        step="a"
      >
        Bank Details
      </StepInformation>
    </div>
  );
};
