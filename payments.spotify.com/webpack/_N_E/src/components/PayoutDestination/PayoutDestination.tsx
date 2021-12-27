import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { Environment, hyperwalletUrlMapping } from './environment';
import { loadScript } from './loadScript';
import { countriesWithProfileFields } from './profileFields';
import { BANK_DETAILS_LOADING_ERROR } from '../../lib/errorMessages';
import HyperwalletGlobalStyles from './HyperwalletGlobalStyles';

declare global {
  interface Window {
    HWWidgets: {
      initialize: Function;
      transferMethods: {
        configure: Function;
      };
      users: {
        configure: Function;
      };
      events: {
        on: Function;
      };
    };
  }
}

/**
 * Returns a function that returns the initial token the first time it's called, and fetches a new one if it's called
 * after the initial token has been used. Used by HyperWallet to refresh the auth token every 10 minutes.
 */
export const getAuthTokenCb = (
  initialToken: string,
  getPayoutDestinationData: PayoutDestinationTypes['getPayoutDestinationData'],
) => {
  let hasInitialTokenBeenUsed = false;
  return async (onSuccess: (token: string) => void, onFailure: () => void) => {
    if (!hasInitialTokenBeenUsed) {
      hasInitialTokenBeenUsed = true;
      onSuccess(initialToken);
      return;
    }

    const destinationData = await getPayoutDestinationData();
    if (destinationData) {
      onSuccess(destinationData.authToken);
    } else {
      onFailure();
    }
  };
};

export type PayoutDestinationData = {
  userToken: string;
  authToken: string;
  profileType: string;
  country: string;
  currency: string;
};

export type BankDetailsResultData = {
  branchId: string;
  bankAccountId: string;
  bankAccountPurpose: string;
};

type PayoutDestinationTypes = {
  environment: Environment;
  getPayoutDestinationData: () => Promise<PayoutDestinationData | null>;
  onSuccess: (data: BankDetailsResultData) => void;
  onLoading: (isLoading: boolean) => void;
  onError: (error: string) => void;
};

const initializeComponent = async (
  environment: Environment,
  getPayoutDestinationData: PayoutDestinationTypes['getPayoutDestinationData'],
  onSuccess: MutableRefObject<PayoutDestinationTypes['onSuccess']>,
  container: HTMLDivElement,
  addGlobalError: (error: string) => void,
  setIsLoading: (isLoading: boolean) => void,
) => {
  setIsLoading(true);

  const destinationData = await getPayoutDestinationData();

  if (!destinationData) {
    setIsLoading(false);
    addGlobalError(BANK_DETAILS_LOADING_ERROR);
    return;
  }

  // Clear container before using
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }

  await loadScript(
    `${hyperwalletUrlMapping[environment]}/rest/widgets/transfer-methods/${destinationData.userToken}/en.min.js`,
  );

  window.HWWidgets.initialize(getAuthTokenCb(destinationData.authToken, getPayoutDestinationData));

  const skipProfileFields = !countriesWithProfileFields.includes(destinationData.country);

  const widget = window.HWWidgets.transferMethods.configure({
    template: 'plain',
    el: container,
    onComplete: async (trmObject: BankDetailsResultData) => {
      setIsLoading(false);
      onSuccess.current(trmObject);
    },
    onSubmit: () => {
      setIsLoading(true);
    },
    onLoading: (isLoading: boolean) => {
      setIsLoading(isLoading);
    },
    skipProfileFields,
    transferMethodConfiguration: {
      country: destinationData.country,
      currency: destinationData.currency,
      type: 'BANK_ACCOUNT',
      profileType: destinationData.profileType,
    },
  });
  widget.display();
};

export function PayoutDestination(props: PayoutDestinationTypes) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const onSuccessRef = useRef<PayoutDestinationTypes['onSuccess']>(props.onSuccess);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPayoutDestinationData = useCallback(props.getPayoutDestinationData, []);

  useEffect(() => {
    if (divRef.current) {
      initializeComponent(
        props.environment,
        getPayoutDestinationData,
        onSuccessRef,
        divRef.current,
        props.onError,
        props.onLoading,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.environment, getPayoutDestinationData]);

  useEffect(() => {
    onSuccessRef.current = props.onSuccess;
  }, [props.onSuccess]);

  return (
    <div>
      <HyperwalletGlobalStyles />

      <div ref={divRef} />
    </div>
  );
}

export default React.memo(PayoutDestination);
