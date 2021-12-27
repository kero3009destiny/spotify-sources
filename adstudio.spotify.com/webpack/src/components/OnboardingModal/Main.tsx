import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { compose } from 'recompose';
import styled from 'styled-components';

import { DialogConfirmation } from '@spotify-internal/adstudio-tape';
import { addColorSet, IconX } from '@spotify-internal/encore-web';

import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';
import {
  closeOnboardingModal as closeOnboardingModalAC,
  hasUserBeenOnboarded as hasUserBeenOnboardedAC,
  markAllOnboardingStepsViewed as markAllOnboardingStepsViewedAC,
} from 'ducks/onboarding/actions';
import {
  getAccountCountry,
  videoIsEnabledForAccountCountry,
} from 'ducks/account/selectors';
import {
  getCurrencyFormatter,
  getExtendedCountry,
} from 'ducks/config/selectors';
import {
  AppState,
  getAllOnboardingStepsViewed,
  shouldSkipWelcomeScreen as shouldSkipWelcomeScreenSelector,
} from 'ducks/onboarding/selectors';

import IntroCarousel from './IntroCarousel';
import IntroCarouselFooter from './IntroCarouselFooter';
import WelcomeSplash from './WelcomeSplash';

import {
  INTRO_CAROUSEL_KEY,
  INTRO_CAROUSEL_SLIDES,
  INTRO_CAROUSEL_VIDEO_SLIDES,
  WELCOME_SPLASH_KEY,
} from './constants';
import { DEFAULT_CURRENCY } from 'config/config';
import { MIN_BUDGET } from 'config/payments';

export interface OnboardingModalProps {
  videoIsEnabledForCountry: boolean;
  allOnboardingStepsViewed: boolean;
  buildAdDisabled: boolean;
  currentSlide: number;
  hasUserBeenOnboarded: () => void;
  hideOnboardingModal: () => () => void;
  closeOnboardingModal: () => () => void;
  shouldSkipWelcomeScreen: boolean;
  logUserAction: (userAction: GoogleAnalyticsEvent) => void;
  markAllOnboardingStepsViewed: () => void;
  onboardingSection: string;
  updateCurrentSlide: (slide: number) => void;
  updateOnboardingSection: (section: string) => void;
  children: React.ReactNode;
  href: string;
  minSpend: string;
}

export const CloseButton = styled.button`
  border: 0;
  outline: none;
  padding: 20px;
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  path {
    stroke: #535353;
  }
  &:hover {
    cursor: pointer;
    path {
      stroke: #777;
    }
  }
`;

const ModalBody = styled.div`
  position: relative;
  height: 100%;
`;

const OnboardingDialog = styled(DialogConfirmation)`
  width: 800px;
  height: 655px;

  // The first content child inside the DialogConfirmation
  div[data-id='body'] {
    height: 100%;
  }
`;

export const OnboardingModal = (props: OnboardingModalProps) => {
  const {
    buildAdDisabled,
    logUserAction,
    allOnboardingStepsViewed,
    closeOnboardingModal,
    videoIsEnabledForCountry,
    markAllOnboardingStepsViewed,
    shouldSkipWelcomeScreen,
    children,
    href,
    minSpend,
  } = props;

  const [onboardingSection, updateOnboardingSection] = useState<string>(
    WELCOME_SPLASH_KEY,
  );
  const [currentSlide, updateCurrentSlide] = useState<number>(0);

  const slides = videoIsEnabledForCountry
    ? INTRO_CAROUSEL_VIDEO_SLIDES
    : INTRO_CAROUSEL_SLIDES;

  // if you skip the welcome screen via reducer, update the onboarding section to reflect that
  useEffect(() => {
    if (currentSlide === 0 && shouldSkipWelcomeScreen) {
      updateOnboardingSection(INTRO_CAROUSEL_KEY);
    }
  }, [currentSlide, shouldSkipWelcomeScreen]);

  const onClickX = useCallback(() => {
    markAllOnboardingStepsViewed();
    closeOnboardingModal();
    logUserAction({
      label: 'close_modal_via_x',
      category: 'Welcome Screen',
      params: {
        // The slides are 0-indexed starting *after* the welcome screen, so simplify that for analytics
        currentSlide:
          onboardingSection === WELCOME_SPLASH_KEY
            ? '0'
            : (currentSlide + 1).toString(),
      },
    });
  }, [
    currentSlide,
    onboardingSection,
    markAllOnboardingStepsViewed,
    closeOnboardingModal,
    logUserAction,
  ]);

  return (
    <div>
      <OnboardingDialog
        flush
        body={
          <ModalBody className={addColorSet('base')}>
            <CloseButton onClick={onClickX}>
              <IconX />
            </CloseButton>
            {onboardingSection === WELCOME_SPLASH_KEY ? (
              <WelcomeSplash
                buildAdDisabled={buildAdDisabled}
                updateOnboardingSection={updateOnboardingSection}
                logUserAction={logUserAction}
                minSpend={minSpend}
              />
            ) : (
              <IntroCarousel
                children={children}
                currentSlide={currentSlide}
                slides={slides}
                href={href}
                logUserAction={logUserAction}
              />
            )}
          </ModalBody>
        }
        onClose={props.hideOnboardingModal}
        footer={
          onboardingSection !== WELCOME_SPLASH_KEY ? (
            <div className={addColorSet('base')}>
              <IntroCarouselFooter
                allOnboardingStepsViewed={allOnboardingStepsViewed}
                buildAdDisabled={buildAdDisabled}
                currentSlide={currentSlide}
                closeOnboardingModal={closeOnboardingModal}
                logUserAction={logUserAction}
                markAllOnboardingStepsViewed={markAllOnboardingStepsViewed}
                updateCurrentSlide={updateCurrentSlide}
                updateOnboardingSection={updateOnboardingSection}
              />
            </div>
          ) : null
        }
      />
    </div>
  );
};

function mapStateToProps(state: AppState) {
  const accountExtendedCountry = getExtendedCountry(
    // @ts-ignore
    state,
    getAccountCountry(state),
  );
  const currencyFormatter = getCurrencyFormatter(
    // @ts-ignore
    state,
    get(accountExtendedCountry, 'currencyCode', DEFAULT_CURRENCY),
  );
  const formattedMinSpend = currencyFormatter(
    get(accountExtendedCountry, 'currencyThresholds.minBudget', MIN_BUDGET),
    {
      decimals: 0,
    },
  ).replace(/\.00$/, '');

  return {
    allOnboardingStepsViewed: getAllOnboardingStepsViewed(state),
    buildAdDisabled: false,
    minSpend: formattedMinSpend,
    shouldSkipWelcomeScreen: shouldSkipWelcomeScreenSelector(state),
    videoIsEnabledForCountry: videoIsEnabledForAccountCountry(state),
  };
}

export default compose<OnboardingModalProps, {}>(
  connect(mapStateToProps, {
    closeOnboardingModal: closeOnboardingModalAC,
    hasUserBeenOnboarded: hasUserBeenOnboardedAC,
    logUserAction: logUserActionAC,
    markAllOnboardingStepsViewed: markAllOnboardingStepsViewedAC,
  }),
)(OnboardingModal);
