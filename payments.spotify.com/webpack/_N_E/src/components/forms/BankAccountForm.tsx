import React, { useRef } from 'react';
import { FormContainer } from './FormStyledComponents';
import PayoutDestination, {
  BankDetailsResultData,
  PayoutDestinationData,
} from '../PayoutDestination/PayoutDestination';
import { getDestinationData } from '../../lib/api';
import { FormHeader } from './FormHeader';
import { Environment } from '../PayoutDestination/environment';
import { getPublicRuntimeConfigValue } from '../../lib/config';
import { trackEvent } from '../../lib/tracking';
import { onboardingFormSubmitEvent } from '../../lib/tracking/definition/gabito/onboarding';
import { RegistrationStep } from '../../lib/registrationReducer';

const HYPERWALLET_ERROR_CLASS = '.hw-global-errors';
const HYPWERWALLET_BUTTON_CLASS = 'hw-button';

export type BankAccountFormData = BankDetailsResultData;

type Props = {
  onSubmit: (resultData: BankDetailsResultData) => void;
  onLoading: (isLoading: boolean) => void;
  setGlobalError: (error: string) => void;
  onboardingId: string;
};

export const getDestinationDataCallback = () => {
  return async (): Promise<PayoutDestinationData | null> => {
    const destinationTokenResponse = await getDestinationData();
    return destinationTokenResponse.body?.proceedInfo?.hyperwallet ?? null;
  };
};

export function BankAccountForm({ onSubmit, onLoading, setGlobalError, onboardingId }: Props) {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const onFormSubmit = async (event: React.FormEvent) => {
    // the Hyperwallet component does not supply an onError callback. This is a
    // hacky substitute to figuring out if we need to remove the loading overlay
    timer.current = setInterval(() => {
      const hasError = formContainerRef?.current?.querySelector(HYPERWALLET_ERROR_CLASS);
      if (hasError) {
        onLoading(false);
        clearInterval(timer.current!);
      }
    }, 1000);

    trackEvent(onboardingFormSubmitEvent({ onboardingId, formId: RegistrationStep.DESTINATION }));
    event.preventDefault();

    // click Hyperwallet submit button programmatically
    const hwSubmitButton = document.getElementsByClassName(HYPWERWALLET_BUTTON_CLASS)[0] as HTMLElement;
    hwSubmitButton.click();
  };

  const afterPayoutDestinationSuccess = async (data: BankDetailsResultData) => {
    clearInterval(timer.current!);
    onSubmit(data);
  };

  const environmentKey = getPublicRuntimeConfigValue<keyof typeof Environment>('payoutDestination.environment');
  const environment = Environment[environmentKey];

  return (
    <form onSubmit={onFormSubmit} id="step-form">
      <FormContainer ref={formContainerRef}>
        <FormHeader
          category="Payout details"
          title="Bank account"
          description="Finally, the fun part. Where should we send your money?"
        />

        <PayoutDestination
          getPayoutDestinationData={getDestinationDataCallback()}
          environment={environment}
          onSuccess={afterPayoutDestinationSuccess}
          onLoading={onLoading}
          onError={setGlobalError}
        />
      </FormContainer>
    </form>
  );
}
