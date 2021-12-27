import uuid from 'uuid-random';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type OnboardingKey = {
  value: string;
  expiry: Date;
};

const EXPIRATION_TIME = 86400000; // 24h
export const ONBOARDING_ID = 'onboarding_id';

const generateOnboardingIdStorageKey = (value: string) => {
  const now = new Date();
  localStorage.setItem(ONBOARDING_ID, JSON.stringify({ value, expiry: now.getTime() + EXPIRATION_TIME }));
};

const clearOnboardingIdStorageKey = () => {
  localStorage.removeItem(ONBOARDING_ID);
};

const fetchNonExpiredOnboardingIdFromStorage = (setOnboardingId: Dispatch<SetStateAction<string>>) => {
  const dataOnboarding = localStorage.getItem(ONBOARDING_ID);

  if (dataOnboarding) {
    const onboardingKey: OnboardingKey = JSON.parse(dataOnboarding);

    if (Object.keys(onboardingKey).length > 0) {
      const now = new Date().getTime();
      const expiry = new Date(onboardingKey.expiry).getTime();
      if (now < expiry) {
        return setOnboardingId(onboardingKey.value);
      }
      clearOnboardingIdStorageKey();
    }
  }

  const value = uuid();
  generateOnboardingIdStorageKey(value);
  return setOnboardingId(value);
};

const fetchOnboardingIdFromStorage = (setOnboardingId: Dispatch<SetStateAction<string>>) => {
  const dataOnboarding = localStorage.getItem(ONBOARDING_ID);

  if (dataOnboarding) {
    const onboardingKey: OnboardingKey = JSON.parse(dataOnboarding);

    return setOnboardingId(onboardingKey.value);
  }

  const value = uuid();
  generateOnboardingIdStorageKey(value);
  return setOnboardingId(value);
};

export const handleOnboardingIdFromStorage = (
  withExpiration: boolean,
  setOnboardingId: Dispatch<SetStateAction<string>>,
) => {
  if (withExpiration) {
    return fetchNonExpiredOnboardingIdFromStorage(setOnboardingId);
  }
  return fetchOnboardingIdFromStorage(setOnboardingId);
};

export const useGetOnboardingId = (withExpiration: boolean = false) => {
  const [onboardingId, setOnboardingId] = useState('');

  useEffect(() => {
    handleOnboardingIdFromStorage(withExpiration, setOnboardingId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return onboardingId;
};
