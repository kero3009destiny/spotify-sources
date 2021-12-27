import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  AddressForm,
  AddressFormData,
  BankAccountForm,
  BankAccountFormData,
  FormFooter,
  LegalNameForm,
  LegalNameFormData,
  PayoutDetailsValidationForm,
  PersonalDetailsValidationForm,
  PhoneNumberForm,
  PhoneNumberFormData,
  SocialSecurityFormData,
  SocialSecurityNumberForm,
} from '../../../components/forms';
import {
  ConfirmationStep,
  PayoutDetailsStepOrder,
  RegistrationStep,
  StepOrder,
  useRegistrationReducer,
} from '../../../lib/registrationReducer';
import { confirmPayoutDestination, createProfile } from '../../../lib/api';
import { AppContainer } from '../../../components/AppContainer';
import { FormWrapper, StepViewerContainer, StepViewerSideBar } from '../../../components/forms/FormStyledComponents';
import { StepProgressIndicator } from '../../../components/StepProgressIndicator';
import { captureException } from '@sentry/nextjs';
import { GetServerSideProps } from 'next';
import { getUserData, UserAccountData } from '../../../server/api/useraccount';
import { checkCapabilityForSellerProfile } from '../../../server/api/sellerProfile';
import { CheckCapabilityResponse } from '../../../../generated/spotify/sellerprofile/v1';
import { ANCHOR } from '../../../customers';
import { LoadingOverlay } from '../../../components/LoadingOverlay';
import { ErrorContainer } from '../../../components/ErrorContainer';
import {
  BANK_DETAILS_CONFIRMATION_ERROR,
  GET_USER_DATA_ERROR,
  SUBMIT_PERSONAL_DETAILS_ERROR,
} from '../../../lib/errorMessages';
import BrowserOnly from '../../../components/BrowserOnly';
import { useGetOnboardingId } from '../../../hooks/onboardingId';
import { ServerErrorType, trackEvent } from '../../../lib/tracking';
import {
  onboardingConfirmationEditActionEvent,
  onboardingConfirmationSubmitErrorEvent,
  onboardingConfirmationSubmitSuccessEvent,
  onboardingConfirmationViewEvent,
  onboardingDestinationSubmitErrorEvent,
  onboardingDestinationSubmitSuccessEvent,
  onboardingFormViewEvent,
} from '../../../lib/tracking/definition/gabito/onboarding';
import { verifyOnboardingCapababilities } from '../../../helpers/onboardingCapabilities';

export const BASE_PATH = '/setup/anchor';
export const FIRST_STEP_URL = `${BASE_PATH}/${StepOrder[0]}`;
export const RESUME_STEP_URL = `${BASE_PATH}/${PayoutDetailsStepOrder[0]}`;
export const COMPLETED_URL = `${BASE_PATH}/complete`;

type Props = {
  userAccountData: UserAccountData;
  serverError: string | null;
  hasCompletedBasicDetails: boolean;
};

export const getServerSideProps: GetServerSideProps<Props, { step: string }> = async ({ req }) => {
  const userId = req.headers['sp-internal-user-id'] as string;
  let userAccountResponse: UserAccountData | null = null;
  let serverError: Props['serverError'] = null;
  let sellerProfile: CheckCapabilityResponse | undefined = undefined;
  let hasOnboarded = false;
  let hasCompletedBasicDetails = false;

  try {
    // Impossible to test with the constant flakiness
    userAccountResponse = await getUserData(userId);
  } catch (e) {
    captureException(e);
  }

  try {
    sellerProfile = await checkCapabilityForSellerProfile({
      spotifyUserId: userId,
      customerId: ANCHOR,
      capability: 'payouts',
    });
  } catch (e) {
    captureException(e);
  }

  [hasOnboarded, hasCompletedBasicDetails] = verifyOnboardingCapababilities(sellerProfile);

  if (hasOnboarded) {
    // TODO: After dashboard is ready, redirect to it instead
    return {
      redirect: {
        permanent: false,
        destination: COMPLETED_URL,
      },
    };
  }

  if (userAccountResponse === null) {
    captureException(new Error('User account data not available'));
    serverError = GET_USER_DATA_ERROR;
  } else if (userAccountResponse.email === '' || userAccountResponse.birthdate === '') {
    return {
      redirect: {
        permanent: false,
        destination: `${BASE_PATH}/missing-information`,
      },
    };
  }

  return {
    props: {
      userAccountData: userAccountResponse ?? {},
      serverError,
      hasCompletedBasicDetails,
    },
  };
};

const RegistrationFlow = ({ userAccountData, serverError, hasCompletedBasicDetails }: Props) => {
  const router = useRouter();
  const onboardingId = useGetOnboardingId();
  const [state, dispatch] = useRegistrationReducer(userAccountData, hasCompletedBasicDetails);

  const setIsLoading = useCallback(
    (isLoading: boolean): void => {
      dispatch({ type: 'setIsLoading', payload: isLoading });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (onboardingId) {
      if (Object.values(ConfirmationStep).includes(state.currentStep)) {
        trackEvent(onboardingConfirmationViewEvent({ onboardingId, confirmationId: state.currentStep }));
        return;
      }
      trackEvent(onboardingFormViewEvent({ onboardingId, formId: state.currentStep }));
    }
  }, [onboardingId, state.currentStep]);

  const setStepToEdit = useCallback(
    (formId: RegistrationStep, confirmationId: RegistrationStep): void => {
      dispatch({ type: 'setStepToEdit', payload: formId });
      trackEvent(onboardingConfirmationEditActionEvent({ onboardingId, confirmationId, formId }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, onboardingId],
  );

  const setToPreviousStep = useCallback((): void => {
    dispatch({ type: 'goBackFromStep' });
  }, [dispatch]);
  const setGlobalError = useCallback(
    (error: string): void => {
      dispatch({ type: 'setGlobalError', payload: error });
    },
    [dispatch],
  );

  const isCurrent = (step: RegistrationStep) => state.currentStep === step;

  const onSubmitFormWrapper = async (submitFormData: () => Promise<void>) => {
    dispatch({ type: 'removeGlobalError' });
    setIsLoading(true);
    try {
      await submitFormData();
      dispatch({ type: 'proceedFromStep' });
      // eslint-disable-next-line no-empty
    } catch (error) {
      dispatch({ type: 'setGlobalError', payload: error });
    }
    setIsLoading(false);
  };

  const onSubmitLegalNameForm = async (data: LegalNameFormData) => {
    await onSubmitFormWrapper(() => {
      dispatch({ type: 'setLegalNameFormData', payload: data });
      return Promise.resolve();
    });
  };

  const onSubmitAddressForm = async (data: AddressFormData) => {
    await onSubmitFormWrapper(() => {
      dispatch({ type: 'setAddressFormData', payload: data! });
      return Promise.resolve();
    });
  };

  const onSubmitPhoneNumberForm = async (data: PhoneNumberFormData) => {
    await onSubmitFormWrapper(() => {
      dispatch({ type: 'setPhoneNumberFormData', payload: data });
      return Promise.resolve();
    });
  };

  const onSubmitSocialSecurityForm = async (data: SocialSecurityFormData) => {
    await onSubmitFormWrapper(() => {
      dispatch({ type: 'setSocialSecurityFormData', payload: data });
      return Promise.resolve();
    });
  };

  const onSubmitBankAccountForm = async (data: BankAccountFormData) => {
    await onSubmitFormWrapper(async () => {
      const response = await confirmPayoutDestination();
      if (response.ok) {
        dispatch({ type: 'setBankAccountFormData', payload: data });
        trackEvent(onboardingDestinationSubmitSuccessEvent({ onboardingId }));
        return Promise.resolve();
      }
      trackEvent(onboardingDestinationSubmitErrorEvent({ onboardingId, error: ServerErrorType.CREATE_DESTINATION }));
      return Promise.reject(BANK_DETAILS_CONFIRMATION_ERROR);
    });
  };

  const onSubmitPersonalValidationForm = async () => {
    await onSubmitFormWrapper(async () => {
      const response = await createProfile({
        firstName: state.legalNameFormData!.firstName,
        lastName: state.legalNameFormData!.lastName,
        sellerCountry: 'US',
        addressLine_1: state.addressFormData!.street,
        stateProvinceRegion: state.addressFormData!.state,
        city: state.addressFormData!.city,
        zipCode: state.addressFormData!.postalCode,
        email: state.userAccountData!.email,
        dateOfBirth: state.userAccountData!.birthdate,
        taxIdentificationNumber: state.socialSecurityFormData!.ssn,
        taxClassificationType: 'Individual',
        informationIsTrue: true,
        consentElectronicReports: true,
      });
      if (response.body?.success) {
        trackEvent(
          onboardingConfirmationSubmitSuccessEvent({
            onboardingId,
            confirmationId: RegistrationStep.PERSONAL_VALIDATION,
          }),
        );
        return Promise.resolve();
      }
      trackEvent(
        onboardingConfirmationSubmitErrorEvent({
          onboardingId,
          confirmationId: RegistrationStep.PERSONAL_VALIDATION,
          error: ServerErrorType.CREATE_PROFILE,
        }),
      );

      // The tax service is only doing static and regex validations. We should mimic these validations
      // on the frontend for a better user experience. Therefore, non of the errors returned from the
      // tax service BE should reach the user. We should make sure that we send the right data in the
      // right format.
      // docs: https://backstage.spotify.net/docs/tax-profile/api/tax_profile_validation/
      // GHE: ghe.spotify.net/fin-busters/tax-profile/blob/master/src/main/java/com/spotify/taxprofile/validation/InputValidator.java
      captureException(new Error(`Failed to create tax profile: ${JSON.stringify(response.body)}`));
      return Promise.reject(SUBMIT_PERSONAL_DETAILS_ERROR);
    });
  };

  const onSubmitPayoutValidationForm = async () => {
    trackEvent(
      onboardingConfirmationSubmitSuccessEvent({
        onboardingId,
        confirmationId: RegistrationStep.PAYOUT_VALIDATION,
      }),
    );
    await router.push(`${BASE_PATH}/complete`);
  };

  // If current step changes, update URL accordingly
  useEffect(() => {
    if (state.currentStep && state.currentStep !== router.query.step) {
      router.push(`${BASE_PATH}/${state.currentStep}`, undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentStep]);

  // Set the current step on page load and history navigation
  useEffect(() => {
    const requestedStep = router.query.step as string;

    if (requestedStep === state.currentStep) {
      return;
    }

    if (Object.values<string>(RegistrationStep).includes(requestedStep)) {
      dispatch({ type: 'setCurrentStep', payload: requestedStep as RegistrationStep });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (serverError) {
    return <>{serverError}</>;
  }

  return (
    <AppContainer>
      <StepViewerContainer>
        <StepViewerSideBar>
          <StepProgressIndicator currentStep={state.currentStep} completedSteps={state.completedSteps} />
        </StepViewerSideBar>
        <FormWrapper>
          <LoadingOverlay showLoader={state.isLoading} />
          <ErrorContainer error={state.globalError} />

          {isCurrent(RegistrationStep.LEGAL_NAME) && (
            <LegalNameForm
              onSubmit={onSubmitLegalNameForm}
              data={state.legalNameFormData}
              onboardingId={onboardingId}
            />
          )}

          {isCurrent(RegistrationStep.ADDRESS) && (
            <BrowserOnly>
              <AddressForm onSubmit={onSubmitAddressForm} onLoading={setIsLoading} onboardingId={onboardingId} />
            </BrowserOnly>
          )}

          {isCurrent(RegistrationStep.PHONE_NUMBER) && (
            <PhoneNumberForm
              onSubmit={onSubmitPhoneNumberForm}
              data={state.phoneNumberFormData}
              onboardingId={onboardingId}
            />
          )}

          {isCurrent(RegistrationStep.SOCIAL_SECURITY) && (
            <SocialSecurityNumberForm
              onSubmit={onSubmitSocialSecurityForm}
              data={state.socialSecurityFormData}
              email={state.userAccountData!.email!}
              onboardingId={onboardingId}
            />
          )}

          {isCurrent(RegistrationStep.PERSONAL_VALIDATION) && (
            <PersonalDetailsValidationForm
              onSubmit={onSubmitPersonalValidationForm}
              onEditStep={setStepToEdit}
              onboardingId={onboardingId}
              data={{
                legalNameFormData: state.legalNameFormData!,
                addressFormData: state.addressFormData!,
                phoneNumberFormData: state.phoneNumberFormData!,
                socialSecurityFormData: state.socialSecurityFormData!,
              }}
            />
          )}

          {isCurrent(RegistrationStep.DESTINATION) && (
            <BankAccountForm
              onSubmit={onSubmitBankAccountForm}
              onLoading={setIsLoading}
              setGlobalError={setGlobalError}
              onboardingId={onboardingId}
            />
          )}

          {isCurrent(RegistrationStep.PAYOUT_VALIDATION) && (
            <PayoutDetailsValidationForm
              onSubmit={onSubmitPayoutValidationForm}
              onEditStep={setStepToEdit}
              onboardingId={onboardingId}
              data={state.bankAccountFormData!}
            />
          )}
        </FormWrapper>
      </StepViewerContainer>
      <FormFooter
        onPrevious={setToPreviousStep}
        submitButtonText={state.submitButtonText}
        shouldHidePreviousButton={
          state.isLoading || state.isEditing || isCurrent(StepOrder[0]) || isCurrent(PayoutDetailsStepOrder[0])
        }
        shouldHideSubmitButton={state.isLoading}
      />
    </AppContainer>
  );
};
export default RegistrationFlow;
