import React, { Component } from 'react';
import { Link } from 'react-router';
import Combokeys from 'combokeys';
import i18n from 'i18next';
import styled from 'styled-components';

import { ButtonPrimary } from '@spotify-internal/adstudio-shared/lib/components/CustomEncore';
import { spacer48 } from '@spotify-internal/encore-foundation';
import { ButtonTertiary, Type } from '@spotify-internal/encore-web';

import OfferDetails, { DisplayType } from 'components/Offers';

import { INTRO_CAROUSEL_KEY, WELCOME_SLIDE } from './constants';
import { routes } from 'config/routes';

const WelcomeSplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: ${spacer48};
  text-align: center;
  height: 100%;
  max-width: 698px;
  margin: 0 auto;
`;

const ExtraMarginButtonTertiary = styled(ButtonTertiary)`
  margin-top: 4px;
`;

export const WelcomeCaption = styled.p`
  font-size: 18px;
  line-height: 24px;
`;

export interface WelcomeSplashProps {
  buildAdDisabled: boolean;
  minSpend: string;
  logUserAction: (userAction: GoogleAnalyticsEvent) => void;
  updateOnboardingSection: (section: string) => void;
}

export default class WelcomeSplash extends Component<WelcomeSplashProps> {
  combokeys?: Combokeys.Combokeys;

  componentDidMount() {
    this.props.logUserAction({
      label: 'land_on_welcome_screen',
      category: 'Welcome Screen',
    });

    this.combokeys = new Combokeys(document.documentElement);
    this.combokeys.bind('right', e => {
      e.preventDefault();
      this.onNext();
    });
  }

  componentWillUnmount() {
    this.combokeys!.detach();
  }

  onNext() {
    const { updateOnboardingSection } = this.props;
    updateOnboardingSection(INTRO_CAROUSEL_KEY);
  }

  render() {
    const {
      buildAdDisabled,
      logUserAction,
      minSpend,
      updateOnboardingSection,
    } = this.props;

    const { Icon, title, caption } = WELCOME_SLIDE;
    // @ts-ignore
    const captionWithMinSpend = caption(minSpend);
    const defaultWelcomeSplash = (
      <div>
        <Icon width={249} height={142} viewBox="" />
        <Type.h1 variant={Type.heading1}>{title}</Type.h1>
        <WelcomeCaption>{captionWithMinSpend}</WelcomeCaption>
      </div>
    );
    return (
      <WelcomeSplashContainer data-test="welcome-splash">
        <OfferDetails
          displayType={DisplayType.ONBOARDING}
          defaultComponent={defaultWelcomeSplash}
        />
        <div>
          {!buildAdDisabled && (
            <div>
              <ButtonPrimary
                data-test="welcomeSplash-createAd"
                component={Link}
                // @ts-ignore
                to={routes.BUILD_CAMPAIGN}
                onClick={() => {
                  logUserAction({
                    label: 'create_ad',
                    category: 'create_ad_flow',
                    params: {
                      location: 'onboarding_modal',
                    },
                  });

                  logUserAction({
                    label: 'click_on_create_ad',
                    category: 'Welcome Screen',
                  });
                }}
                buttonLegacy
              >
                {i18n.t('I18N_CREATE_AD1', 'Create Ad')}
              </ButtonPrimary>
            </div>
          )}
          <ExtraMarginButtonTertiary
            data-test="welcomeSplash-learnMore"
            // @ts-ignore
            color="white"
            onClick={() => {
              updateOnboardingSection(INTRO_CAROUSEL_KEY);
              logUserAction({
                label: 'click_on_learn_more',
                category: 'Welcome Screen',
              });
            }}
            buttonLegacy
          >
            {i18n.t('I18N_LEARN_MORE', 'Learn More')}
          </ExtraMarginButtonTertiary>
        </div>
      </WelcomeSplashContainer>
    );
  }
}
