import React, { useReducer } from 'react';
import {
  AddressFormData,
  BankAccountFormData,
  LegalNameFormData,
  PhoneNumberFormData,
  SocialSecurityFormData,
} from '../components/forms';
import { UserAccountData } from '../server/api/useraccount';

export enum RegistrationStep {
  LEGAL_NAME = 'name',
  ADDRESS = 'address',
  PHONE_NUMBER = 'phone',
  SOCIAL_SECURITY = 'ssn',
  PERSONAL_VALIDATION = 'personal-details',
  DESTINATION = 'destination-setup',
  PAYOUT_VALIDATION = 'payout-details',
}

export enum ConfirmationStep {
  PERSONAL_VALIDATION = RegistrationStep.PERSONAL_VALIDATION,
  PAYOUT_VALIDATION = RegistrationStep.PAYOUT_VALIDATION,
}

export const PersonalDetailsStepOrder = [
  RegistrationStep.LEGAL_NAME,
  RegistrationStep.ADDRESS,
  RegistrationStep.SOCIAL_SECURITY,
  RegistrationStep.PERSONAL_VALIDATION,
];

export const PayoutDetailsStepOrder = [RegistrationStep.DESTINATION, RegistrationStep.PAYOUT_VALIDATION];

export const StepOrder = [...PersonalDetailsStepOrder, ...PayoutDetailsStepOrder];

interface RegistrationState {
  isLoading: boolean;
  currentStep: RegistrationStep;
  completedSteps: Set<RegistrationStep>;
  submitButtonText: string;
  isEditing: boolean;
  globalError: string | null;
  userAccountData?: UserAccountData;
  legalNameFormData?: LegalNameFormData;
  addressFormData?: AddressFormData;
  phoneNumberFormData?: PhoneNumberFormData;
  socialSecurityFormData?: SocialSecurityFormData;
  bankAccountFormData?: BankAccountFormData;
}

type RegistrationAction =
  | { type: 'setIsLoading'; payload: boolean }
  | { type: 'setCurrentStep'; payload: RegistrationStep }
  | { type: 'setStepToEdit'; payload: RegistrationStep }
  | { type: 'proceedFromStep' }
  | { type: 'goBackFromStep' }
  | { type: 'setLegalNameFormData'; payload: LegalNameFormData }
  | { type: 'setAddressFormData'; payload: AddressFormData }
  | { type: 'setPhoneNumberFormData'; payload: PhoneNumberFormData }
  | { type: 'setSocialSecurityFormData'; payload: SocialSecurityFormData }
  | { type: 'setBankAccountFormData'; payload: BankAccountFormData }
  | { type: 'setGlobalError'; payload: string }
  | { type: 'removeGlobalError' };

const getNextStep = (currentStep: RegistrationStep, isEditing: boolean) => {
  if (isEditing) {
    if (PersonalDetailsStepOrder.includes(currentStep)) {
      return RegistrationStep.PERSONAL_VALIDATION;
    } else if (PayoutDetailsStepOrder.includes(currentStep)) {
      return RegistrationStep.PAYOUT_VALIDATION;
    }
  }
  return StepOrder[StepOrder.indexOf(currentStep!) + 1] || currentStep;
};

const getSubmitButtonText = (currentStep: RegistrationStep) => {
  if (currentStep === RegistrationStep.PERSONAL_VALIDATION) {
    return 'Save and continue';
  } else if (currentStep === RegistrationStep.PAYOUT_VALIDATION) {
    return 'Save and complete';
  }
  return 'Next';
};

const canShowStep = (step: RegistrationStep, completedSteps: Set<RegistrationStep>) => {
  const isFirstStep = step === StepOrder[0];
  const previousStep = StepOrder[StepOrder.indexOf(step) - 1];
  return isFirstStep || (previousStep && completedSteps.has(previousStep));
};

export const registrationReducer = (state: RegistrationState, action: RegistrationAction) => {
  switch (action.type) {
    case 'setIsLoading': {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case 'setCurrentStep': {
      const nextStep = canShowStep(action.payload, state.completedSteps) ? action.payload : state.currentStep;
      return {
        ...state,
        currentStep: nextStep,
        submitButtonText: getSubmitButtonText(nextStep),
      };
    }
    case 'setStepToEdit': {
      const nextStep = action.payload;
      return {
        ...state,
        currentStep: nextStep,
        isEditing: true,
        globalError: null,
        submitButtonText: getSubmitButtonText(nextStep),
      };
    }
    case 'proceedFromStep': {
      const nextStep = getNextStep(state.currentStep, state.isEditing);
      return {
        ...state,
        currentStep: nextStep,
        isEditing: false,
        globalError: null,
        submitButtonText: getSubmitButtonText(nextStep),
      };
    }
    case 'goBackFromStep': {
      const nextStep = StepOrder[StepOrder.indexOf(state.currentStep!) - 1] || state.currentStep;
      return {
        ...state,
        currentStep: nextStep,
        globalError: null,
        submitButtonText: getSubmitButtonText(nextStep),
      };
    }
    case 'setLegalNameFormData':
      return {
        ...state,
        legalNameFormData: action.payload,
        completedSteps: new Set(state.completedSteps).add(RegistrationStep.LEGAL_NAME),
      };
    case 'setAddressFormData':
      return {
        ...state,
        addressFormData: action.payload,
        completedSteps: new Set(state.completedSteps).add(RegistrationStep.ADDRESS),
      };
    case 'setPhoneNumberFormData':
      return {
        ...state,
        phoneNumberFormData: action.payload,
        completedSteps: new Set(state.completedSteps).add(RegistrationStep.PHONE_NUMBER),
      };
    case 'setSocialSecurityFormData':
      return {
        ...state,
        socialSecurityFormData: action.payload,
        completedSteps: new Set(state.completedSteps).add(RegistrationStep.SOCIAL_SECURITY),
      };
    case 'setBankAccountFormData':
      return {
        ...state,
        bankAccountFormData: action.payload,
        completedSteps: new Set(state.completedSteps).add(RegistrationStep.DESTINATION),
      };
    case 'setGlobalError':
      return {
        ...state,
        globalError: action.payload,
      };
    case 'removeGlobalError':
      return {
        ...state,
        globalError: null,
      };
    default:
      return state;
  }
};

export const useRegistrationReducer = (
  userAccountData: UserAccountData,
  hasCompletedBasicDetails: boolean,
): [RegistrationState, React.Dispatch<RegistrationAction>] => {
  const initialFormData = {
    phoneNumberFormData: {
      phoneNumber: userAccountData.phoneNumber ?? '',
    },
  };
  const [state, dispatch] = useReducer(registrationReducer, {
    isLoading: hasCompletedBasicDetails,
    currentStep: hasCompletedBasicDetails ? PayoutDetailsStepOrder[0] : StepOrder[0],
    completedSteps: hasCompletedBasicDetails ? new Set(PersonalDetailsStepOrder) : new Set([]),
    submitButtonText: 'Next',
    isEditing: false,
    globalError: null,
    ...initialFormData,
    userAccountData,
  });
  return [state, dispatch];
};
