import React, { useEffect } from 'react';
import { FormContainer } from './FormStyledComponents';
import { FormHeader } from './FormHeader';
import { Environment, useAddressCollection } from '@spotify-internal/address-collection-sdk';
import { getPublicRuntimeConfigValue } from '../../lib/config';
import { trackEvent } from '../../lib/tracking';
import { onboardingFormSubmitEvent } from '../../lib/tracking/definition/gabito/onboarding';
import { RegistrationStep } from '../../lib/registrationReducer';

export type AddressFormData = {
  street: string;
  postalCode: string;
  city: string;
  state: string;
};

type Props = {
  onSubmit: (data: AddressFormData) => void;
  onLoading: (isLoading: boolean) => void;
  onboardingId: string;
};

export function AddressForm({ onSubmit, onLoading, onboardingId }: Props) {
  const config = getPublicRuntimeConfigValue<{
    context: string;
    addressProfile: any;
    environment: keyof typeof Environment;
  }>('addressCollectionSDK');

  const addressCollectionSdk = useAddressCollection({
    context: config.context,
    addressProfile: config.addressProfile,
    environment: Environment[config.environment],
    locale: 'en',
    country: 'US',
    useEncoreStyle: true,
    fallbackEnabled: false,
    formOnly: true,
  });

  useEffect(() => {
    onLoading(addressCollectionSdk.isLoading);
  }, [addressCollectionSdk.isLoading, onLoading]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    trackEvent(onboardingFormSubmitEvent({ onboardingId, formId: RegistrationStep.ADDRESS }));

    try {
      await addressCollectionSdk.hooks.onSubmit();
    } catch {
      // errors are handled internally within the address-collection-sdk and
      // presented to the user
      return;
    }

    const address = addressCollectionSdk.hooks._getAddress?.();
    if (address) {
      onSubmit({
        street: address.street,
        state: address.state,
        city: address.city,
        postalCode: address.postal_code_short,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} id="step-form">
      <FormContainer>
        <FormHeader
          category="Personal Info"
          title="Home address"
          description="Your address is needed so we can get you paid. It’ll be used for that, and that only, promise."
        />
        {addressCollectionSdk.component}
      </FormContainer>
    </form>
  );
}
