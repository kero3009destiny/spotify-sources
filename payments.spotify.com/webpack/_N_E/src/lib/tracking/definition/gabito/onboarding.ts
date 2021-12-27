import { EventDefinition } from '../../types';
import { SellerProfileType, stepToIdentifier, Tracker } from '../../tracking';
import { createCPHostedFlowOnboardingView } from '@spotify-internal/event-definitions/es5/events/createCPHostedFlowOnboardingView';
import { createCPHostedFlowOnboardingStart } from '@spotify-internal/event-definitions/es5/events/createCPHostedFlowOnboardingStart';
import { createCPHostedFlowOnboardingFormView } from '@spotify-internal/event-definitions/es5/events/createCPHostedFlowOnboardingFormView';
import { createCPHostedFlowOnboardingFormFieldValidationError } from '@spotify-internal/event-definitions/es5/events/createCPHostedFlowOnboardingFormFieldValidationError';
import { createCPHostedFlowOnboardingFormSubmit } from '@spotify-internal/event-definitions/es5/events/createCPHostedFlowOnboardingFormSubmit';
import { createCPHostedFlowOnboardingConfirmationView } from '@spotify-internal/event-definitions/es5/events/createCPHostedFlowOnboardingConfirmationView';
import { createCPHostedFlowOnboardingConfirmationEditAction } from '@spotify-internal/event-definitions/es5/events/createCPHostedFlowOnboardingConfirmationEditAction';
import { createCPHostedFlowOnboardingConfirmationSubmit } from '@spotify-internal/event-definitions/es5/events/createCPHostedFlowOnboardingConfirmationSubmit';
import { createCPHostedFlowDestinationSubmitError } from '@spotify-internal/event-definitions/es5/events/createCPHostedFlowDestinationSubmitError';
import { createCPHostedFlowDestinationSubmitSuccess } from '@spotify-internal/event-definitions/es5/events/createCPHostedFlowDestinationSubmitSuccess';
import { createCPHostedFlowConfirmationSubmitError } from '@spotify-internal/event-definitions/es5/events/createCPHostedFlowConfirmationSubmitError';
import { createCPHostedFlowConfirmationSubmitSuccess } from '@spotify-internal/event-definitions/es5/events/createCPHostedFlowConfirmationSubmitSuccess';
import { createCPHostedFlowOnboardingComplete } from '@spotify-internal/event-definitions/es5/events/createCPHostedFlowOnboardingComplete';
import { RegistrationStep } from '../../../registrationReducer';

const DEFAULT_SELLER_PROFILE_TYPE = SellerProfileType.INDIVIDUAL;
const DEFAULT_RESUME_FLOW = false;

// Triggered when initial page of the flow is rendered
export const onboardingViewEvent = ({
  onboardingId,
  customerId,
  sellerProfileType,
  resumeFlow,
}: {
  onboardingId: string;
  customerId: string;
  sellerProfileType?: string;
  resumeFlow?: boolean;
}): EventDefinition[] => [
  {
    tracker: Tracker.Gabito,
    eventData: createCPHostedFlowOnboardingView({
      onboarding_id: onboardingId,
      customer_id: customerId,
      seller_profile_type: sellerProfileType || DEFAULT_SELLER_PROFILE_TYPE,
      resume_flow: resumeFlow || DEFAULT_RESUME_FLOW,
    }),
  },
];

// Triggered when user starts flow from the initial page
export const onboardingStartEvent = ({
  onboardingId,
  customerId,
  sellerProfileType,
}: {
  onboardingId: string;
  customerId: string;
  sellerProfileType?: string;
}): EventDefinition[] => [
  {
    tracker: Tracker.Gabito,
    eventData: createCPHostedFlowOnboardingStart({
      onboarding_id: onboardingId,
      customer_id: customerId,
      seller_profile_type: sellerProfileType || DEFAULT_SELLER_PROFILE_TYPE,
    }),
  },
];

// Triggered when a form is loaded
export const onboardingFormViewEvent = ({
  onboardingId,
  formId,
}: {
  onboardingId: string;
  formId: RegistrationStep;
}): EventDefinition[] => [
  {
    tracker: Tracker.Gabito,
    eventData: createCPHostedFlowOnboardingFormView({
      onboarding_id: onboardingId,
      form_id: stepToIdentifier(formId),
    }),
  },
];

// Triggered when there is a field error on a form
export const onboardingFormFieldValidationErrorEvent = ({
  onboardingId,
  formId,
  field,
  type,
}: {
  onboardingId: string;
  formId: RegistrationStep;
  field: string;
  type: string;
}): EventDefinition[] => [
  {
    tracker: Tracker.Gabito,
    eventData: createCPHostedFlowOnboardingFormFieldValidationError({
      onboarding_id: onboardingId,
      form_id: stepToIdentifier(formId),
      field,
      type,
    }),
  },
];

// Triggered when there is a form submission
export const onboardingFormSubmitEvent = ({
  onboardingId,
  formId,
}: {
  onboardingId: string;
  formId: RegistrationStep;
}): EventDefinition[] => [
  {
    tracker: Tracker.Gabito,
    eventData: createCPHostedFlowOnboardingFormSubmit({
      onboarding_id: onboardingId,
      form_id: stepToIdentifier(formId),
    }),
  },
];

// Triggered when a confirmation page is loaded
export const onboardingConfirmationViewEvent = ({
  onboardingId,
  confirmationId,
}: {
  onboardingId: string;
  confirmationId: RegistrationStep;
}): EventDefinition[] => [
  {
    tracker: Tracker.Gabito,
    eventData: createCPHostedFlowOnboardingConfirmationView({
      onboarding_id: onboardingId,
      confirmation_id: stepToIdentifier(confirmationId),
    }),
  },
];

// Triggered when the user triggers the edit action on a confirmation page
export const onboardingConfirmationEditActionEvent = ({
  onboardingId,
  confirmationId,
  formId,
}: {
  onboardingId: string;
  confirmationId: RegistrationStep;
  formId: RegistrationStep;
}): EventDefinition[] => [
  {
    tracker: Tracker.Gabito,
    eventData: createCPHostedFlowOnboardingConfirmationEditAction({
      onboarding_id: onboardingId,
      confirmation_id: stepToIdentifier(confirmationId),
      form_id: stepToIdentifier(formId),
    }),
  },
];

// Triggered when a confirmation page is submitted
export const onboardingConfirmationSubmitEvent = ({
  onboardingId,
  confirmationId,
}: {
  onboardingId: string;
  confirmationId: RegistrationStep;
}): EventDefinition[] => [
  {
    tracker: Tracker.Gabito,
    eventData: createCPHostedFlowOnboardingConfirmationSubmit({
      onboarding_id: onboardingId,
      confirmation_id: stepToIdentifier(confirmationId),
    }),
  },
];

// Triggered when there is an error when submiting destination information
export const onboardingDestinationSubmitErrorEvent = ({
  onboardingId,
  error,
}: {
  onboardingId: string;
  error: string;
}): EventDefinition[] => [
  {
    tracker: Tracker.Gabito,
    eventData: createCPHostedFlowDestinationSubmitError({
      onboarding_id: onboardingId,
      error,
    }),
  },
];

// Triggered when there is an error when submiting destination information
export const onboardingDestinationSubmitSuccessEvent = ({
  onboardingId,
}: {
  onboardingId: string;
}): EventDefinition[] => [
  {
    tracker: Tracker.Gabito,
    eventData: createCPHostedFlowDestinationSubmitSuccess({
      onboarding_id: onboardingId,
    }),
  },
];

// Triggered when there is an error when submitting a confirmation page
export const onboardingConfirmationSubmitErrorEvent = ({
  onboardingId,
  confirmationId,
  error,
}: {
  onboardingId: string;
  confirmationId: RegistrationStep;
  error: string;
}): EventDefinition[] => [
  {
    tracker: Tracker.Gabito,
    eventData: createCPHostedFlowConfirmationSubmitError({
      onboarding_id: onboardingId,
      confirmation_id: stepToIdentifier(confirmationId),
      error,
    }),
  },
];

// Triggered when there is an error when submitting confirmation page
export const onboardingConfirmationSubmitSuccessEvent = ({
  onboardingId,
  confirmationId,
}: {
  onboardingId: string;
  confirmationId: RegistrationStep;
}): EventDefinition[] => [
  {
    tracker: Tracker.Gabito,
    eventData: createCPHostedFlowConfirmationSubmitSuccess({
      onboarding_id: onboardingId,
      confirmation_id: stepToIdentifier(confirmationId),
    }),
  },
];

// Triggered when the success page is shown and the onboarding is over
export const onboardingCompleteEvent = ({ onboardingId }: { onboardingId: string }): EventDefinition[] => [
  {
    tracker: Tracker.Gabito,
    eventData: createCPHostedFlowOnboardingComplete({
      onboarding_id: onboardingId,
    }),
  },
];
