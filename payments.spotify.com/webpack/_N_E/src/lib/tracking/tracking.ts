import { EventDefinition } from './types';
import * as gabito from './eventSender/gabito';
import { RegistrationStep } from '../registrationReducer';

// Future tracking features as DataLayer, GA, Optimize can be included
export enum Tracker {
  Gabito = 1,
}

export const trackEvent = (eventDefinitions: EventDefinition[]) => {
  return Promise.all(
    eventDefinitions.map((eventDefinition) => {
      switch (eventDefinition.tracker) {
        default:
        case Tracker.Gabito:
          gabito.getEventSender().then((eventSender) => eventSender.send(eventDefinition.eventData));
      }
    }),
  );
};

export enum FormIdentifier {
  LEGAL_NAME = 'nameInformation',
  ADDRESS = 'addressInformation',
  PHONE = 'phoneInformation',
  TAX = 'taxInformation',
  DESTINATION = 'destinationDetails',
}

export enum ConfirmationPageIdentifier {
  BASIC = 'basicDetails',
  DESTINATION = 'destinationDetails',
}

// TODO: Move to upper level when needed for business rules
export enum SellerProfileType {
  INDIVIDUAL = 'individual',
  BUSINESS = 'business',
}

export enum FieldErrorType {
  REQUIRED = 'required',
  INVALID = 'invalid',
}

// TODO: Match with an error mapping with different translated as CODE responses from backend
export enum ServerErrorType {
  CREATE_PROFILE = 'FAILED CONFIRM PERSONAL INFO',
  CREATE_DESTINATION = 'FAILED CONFIRM DESTINATION',
}

const stepsToIdentifierMap = {
  [RegistrationStep.LEGAL_NAME]: FormIdentifier.LEGAL_NAME,
  [RegistrationStep.ADDRESS]: FormIdentifier.ADDRESS,
  [RegistrationStep.PHONE_NUMBER]: FormIdentifier.PHONE,
  [RegistrationStep.SOCIAL_SECURITY]: FormIdentifier.TAX,
  [RegistrationStep.DESTINATION]: FormIdentifier.DESTINATION,
  [RegistrationStep.PERSONAL_VALIDATION]: ConfirmationPageIdentifier.BASIC,
  [RegistrationStep.PAYOUT_VALIDATION]: ConfirmationPageIdentifier.DESTINATION,
};

// We don't want to couple steps to form names, although they are very similar.
export const stepToIdentifier = (step: RegistrationStep): FormIdentifier | ConfirmationPageIdentifier | string => {
  if (!Object.keys(stepsToIdentifierMap).includes(step)) {
    return '';
  }
  return stepsToIdentifierMap[step];
};
