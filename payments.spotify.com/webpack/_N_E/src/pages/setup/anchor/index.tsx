import React, { useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { ButtonPrimary, Type, spacer16, spacer32, spacer80, screenMdMin } from '@spotify-internal/encore-web';
import { AppContainer } from '../../../components/AppContainer';
import { COMPLETED_URL, FIRST_STEP_URL, RESUME_STEP_URL } from './[step]';
import { StepProgressIndicator } from '../../../components/StepProgressIndicator';
import { useGetOnboardingId } from '../../../hooks/onboardingId';
import { onboardingStartEvent, onboardingViewEvent } from '../../../lib/tracking/definition/gabito/onboarding';
import { trackEvent } from '../../../lib/tracking';
import { GetServerSideProps } from 'next';
import { CheckCapabilityResponse } from '../../../../generated/spotify/sellerprofile/v1';
import { checkCapabilityForSellerProfile } from '../../../server/api/sellerProfile';
import { ANCHOR } from '../../../customers';
import { captureException } from '@sentry/nextjs';
import { PayoutDetailsStepOrder, PersonalDetailsStepOrder, RegistrationStep } from '../../../lib/registrationReducer';
import { verifyOnboardingCapababilities } from '../../../helpers/onboardingCapabilities';
import { ifDeviceBiggerThan } from '../../../helpers/device';

type Props = {
  hasCompletedBasicDetails: boolean;
  entryPointURL: string;
  currentStep: null | RegistrationStep;
  completedSteps: null | RegistrationStep[];
};

const Container = styled.div`
  padding-top: ${spacer32};
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  ${ifDeviceBiggerThan(screenMdMin)} {
    padding-top: ${spacer80};
  }
`;

const TitleContainer = styled.div`
  max-width: 680px;
  padding: ${spacer32} 5% ${spacer32} ${spacer32};
  & > * {
    margin: ${spacer32} 0;
  }
`;

const IntroductionContainer = styled.div`
  max-width: 575px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: ${spacer32};
  margin: ${spacer32};

  & > * {
    margin: ${spacer16} 0;
  }
`;

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const userId = req.headers['sp-internal-user-id'] as string;
  let sellerProfile: CheckCapabilityResponse | undefined = undefined;
  let hasCompletedBasicDetails = false;
  let hasOnboarded = false;

  try {
    sellerProfile = await checkCapabilityForSellerProfile({
      spotifyUserId: userId,
      customerId: ANCHOR,
      capability: 'payouts',
    });

    [hasOnboarded, hasCompletedBasicDetails] = verifyOnboardingCapababilities(sellerProfile);
  } catch (e) {
    captureException(e);
  }

  if (hasOnboarded) {
    // TODO: After dashboard is ready, redirect to it instead
    return {
      redirect: {
        permanent: false,
        destination: COMPLETED_URL,
      },
    };
  }

  // A user that has TaxProfile and PayeeProfile should be able to resume their flow
  return {
    props: {
      hasCompletedBasicDetails: hasCompletedBasicDetails,
      entryPointURL: hasCompletedBasicDetails ? RESUME_STEP_URL : FIRST_STEP_URL,
      currentStep: hasCompletedBasicDetails ? PayoutDetailsStepOrder[0] : null,
      completedSteps: hasCompletedBasicDetails ? PersonalDetailsStepOrder : null,
    },
  };
};

const RegistrationStart = ({ hasCompletedBasicDetails, entryPointURL, currentStep, completedSteps }: Props) => {
  const onboardingId = useGetOnboardingId(true);

  useEffect(() => {
    if (onboardingId) {
      trackEvent(onboardingViewEvent({ onboardingId, customerId: ANCHOR, resumeFlow: hasCompletedBasicDetails }));
    }
  }, [onboardingId, hasCompletedBasicDetails]);

  const trackOnSubmit = () => {
    trackEvent(onboardingStartEvent({ onboardingId, customerId: ANCHOR }));
  };

  return (
    <AppContainer>
      <Container>
        <TitleContainer>
          <Type as="h1" variant="bass">
            Make money doing what you love.
          </Type>
          <Type as="p" variant="alto">
            Get paid through Spotify.
          </Type>
        </TitleContainer>
        <IntroductionContainer>
          <Type as="h2" variant="alto">
            Set up as an individual
          </Type>
          <Type as="p" variant="ballad">
            The below info is needed for tax and payment purposes, if you’ll be filing as an individual and not a
            business. This should take around 7 minutes.
          </Type>
          <StepProgressIndicator currentStep={currentStep} completedSteps={new Set(completedSteps)} />
          <br />
          <Link href={entryPointURL} passHref>
            <ButtonPrimary data-testid="start-button" colorSet="announcement" onClick={trackOnSubmit}>
              {hasCompletedBasicDetails ? 'Continue' : 'Start'}
            </ButtonPrimary>
          </Link>
        </IntroductionContainer>
      </Container>
    </AppContainer>
  );
};

export default RegistrationStart;
