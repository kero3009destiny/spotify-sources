import React, { Component } from 'react';
import { Link } from 'react-router';
import Combokeys from 'combokeys';
import i18n from 'i18next';
import styled from 'styled-components';

import {
  ButtonPrimary,
  ButtonTertiary,
  cssColorValue,
  semanticColors,
} from '@spotify-internal/encore-web/';

import { INTRO_CAROUSEL_SLIDES, WELCOME_SPLASH_KEY } from './constants';
import { routes } from 'config/routes';

export interface IntroCarouselFooterProps {
  allOnboardingStepsViewed: boolean;
  buildAdDisabled: boolean;
  currentSlide: number;
  closeOnboardingModal: () => void;
  logUserAction: (userAction: GoogleAnalyticsEvent) => void;
  markAllOnboardingStepsViewed: () => void;
  updateCurrentSlide: (slide: number) => void;
  updateOnboardingSection: (section: string) => void;
}

const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  > div {
    &:nth-child(1) {
      justify-self: start;
    }
    &:nth-child(2) {
      justify-self: center;
    }
    &:nth-child(3) {
      justify-self: end;
    }
  }
`;

const CarouselDot = styled.div<{ active: Boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  display: inline-block;
  margin: 0 8px;
  cursor: pointer;
  background: ${props =>
    props.active
      ? cssColorValue(semanticColors.essentialBrightAccent)
      : cssColorValue(semanticColors.essentialSubdued)};
`;

export class IntroCarouselFooter extends Component<IntroCarouselFooterProps> {
  combokeys?: Combokeys.Combokeys;

  componentDidMount() {
    this.combokeys = new Combokeys(document.documentElement);
    this.combokeys.bind('left', e => {
      e.preventDefault();
      this.onBack();
    });
    this.combokeys.bind('right', e => {
      e.preventDefault();
      this.onNext();
    });
  }

  componentWillUnmount() {
    this.combokeys!.detach();
  }

  onNext() {
    const { currentSlide, updateCurrentSlide, logUserAction } = this.props;

    if (currentSlide < INTRO_CAROUSEL_SLIDES.length - 1) {
      updateCurrentSlide(currentSlide + 1);
    }

    logUserAction({
      label: 'next_on_information_dialogue',
      category: 'Welcome Screen',
    });
  }

  onBack() {
    const {
      currentSlide,
      logUserAction,
      updateCurrentSlide,
      updateOnboardingSection,
    } = this.props;

    if (currentSlide === 0) {
      updateOnboardingSection(WELCOME_SPLASH_KEY);
    } else {
      updateCurrentSlide(currentSlide - 1);
    }

    logUserAction({
      label: 'back_on_information_dialogue',
      category: 'Welcome Screen',
    });
  }

  componentWillReceiveProps(nextProps: IntroCarouselFooterProps) {
    const {
      currentSlide,
      markAllOnboardingStepsViewed,
      allOnboardingStepsViewed,
    } = nextProps;

    if (!allOnboardingStepsViewed) {
      const finalSlideViewed =
        currentSlide === INTRO_CAROUSEL_SLIDES.length - 1;

      if (finalSlideViewed) {
        markAllOnboardingStepsViewed();
      }
    }
  }

  render() {
    const {
      logUserAction,
      updateCurrentSlide,
      currentSlide,
      allOnboardingStepsViewed,
      closeOnboardingModal,
    } = this.props;
    return (
      <FooterContainer>
        <div>
          {currentSlide > 0 && (
            <ButtonTertiary
              data-test="intro-carousel-back"
              buttonLegacy
              onClick={() => {
                this.onBack();
                logUserAction({
                  label: 'back_on_information_dialogue',
                  category: 'Welcome Screen',
                });
              }}
            >
              {i18n.t('I18N_BACK', 'Back')}
            </ButtonTertiary>
          )}
        </div>
        <div>
          {INTRO_CAROUSEL_SLIDES.map(({ title: slideTitle }, idx) => (
            <CarouselDot
              tabIndex={-1}
              role="button"
              data-test="carousel-dot"
              active={idx === currentSlide}
              key={slideTitle}
              onClick={() => updateCurrentSlide(idx)}
            />
          ))}
        </div>
        <div>
          {currentSlide < INTRO_CAROUSEL_SLIDES.length - 1 && (
            <ButtonTertiary
              data-test="intro-carousel-next"
              // @ts-ignore
              semanticColor={semanticColors.textBrightAccent}
              buttonLegacy
              onClick={() => {
                this.onNext();
                logUserAction({
                  label: 'next_on_information_dialogue',
                  category: 'Welcome Screen',
                });
              }}
            >
              {i18n.t('I18N_NEXT', 'Next')}
            </ButtonTertiary>
          )}

          {currentSlide >= INTRO_CAROUSEL_SLIDES.length - 1 && (
            <ButtonPrimary
              data-test="intro-carousel-done"
              // @ts-ignore
              to={routes.BUILD_CAMPAIGN}
              component={Link}
              buttonLegacy
              onClick={() => {
                logUserAction({
                  label: 'back_on_information_dialogue',
                  category: 'Welcome Screen',
                });
                if (allOnboardingStepsViewed) closeOnboardingModal();
              }}
            >
              {i18n.t('I18N_CREATE_AD1', 'Create Ad')}
            </ButtonPrimary>
          )}
        </div>
      </FooterContainer>
    );
  }
}

export default IntroCarouselFooter;
