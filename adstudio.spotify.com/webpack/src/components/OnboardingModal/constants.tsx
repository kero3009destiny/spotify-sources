import React from 'react';
import { Trans } from 'react-i18next';
import i18n from 'i18next';

import { Cards, Graph, Stars, TruckCrane } from './svgs';

export const WELCOME_SPLASH_KEY = 'welcome-splash';
export const welcomeSplashMessage = (minSpend: string) => (
  <Trans i18nKey="I18N_EASILY_CREATE_AND_MANAGE_ADS" values={{ minSpend }}>
    Easily create and manage ads that let you connect with your target audience
    on Spotify, starting at a <b>minimum of {{ minSpend }}.</b>
  </Trans>
);

export const MIN_SPEND = 250;

export interface WelcomeSlideType {
  Icon: React.ElementType;
  title: string;
  caption: JSX.Element;
}

export interface SlideType {
  Icon: React.ElementType;
  title: string;
  caption: string;
}

export const WELCOME_SLIDE: WelcomeSlideType = {
  Icon: Stars,
  title: i18n.t('I18N_WELCOME_TO_AD_STUDIO', 'Welcome to Ad Studio!'),
  // @ts-ignore
  caption: (minSpend: string) => welcomeSplashMessage(minSpend),
};

const FIRST_SLIDE_WITH_VIDEO_COPY: SlideType = {
  Icon: TruckCrane,
  title: i18n.t('I18N_CREATE_AN_AD_IN_MINUTES', 'Create an ad in minutes'),
  caption: i18n.t(
    'I18N_UPLOAD_AN_AUDIO_OR_VIDEO',
    'Uploading an audio or video ad is easy. No audio spot? We’ll record your script with a professional voice actor and mix it with a quality background track, at&nbsp;__no&nbsp;additional&nbsp;charge.__',
  ),
};

export const INTRO_CAROUSEL_KEY = 'intro-carousel';
export const INTRO_CAROUSEL_SLIDES: Array<SlideType> = [
  {
    Icon: TruckCrane,
    title: i18n.t('I18N_CREATE_AN_AD_IN_MINUTES', 'Create an ad in minutes'),
    caption: i18n.t(
      'I18N_UPLOAD_AN_AUDIO_SPOT_OR',
      'Upload an audio spot or let us help you build one  — we’ll record your script with a professional voice actor and mix it with a quality background track, at&nbsp;__no&nbsp;additional&nbsp;charge.__',
    ),
  },
  {
    Icon: Graph,
    title: i18n.t(
      'I18N_REACH_YOUR_AUDIENCE',
      'Reach your audience in key moments',
    ),
    caption: i18n.t(
      'I18N_DELIVER_YOUR_MESSAGE',
      'Deliver your message when it’s most relevant. Target listeners by demographics like age or location, or by real-time contexts like “working out” or “cooking” based on the Spotify playlist they’re listening to in the moment.',
    ),
  },
  {
    Icon: Cards,
    title: i18n.t('I18N_LETS_GO', "Let's go"),
    caption: i18n.t(
      'I18N_LOOKING_FOR_GUIDANCE',
      'Looking for guidance? Download our [creative guidelines]({{voiceoverGuide}}) to get started.',
    ),
  },
];

export const INTRO_CAROUSEL_VIDEO_SLIDES: Array<SlideType> = [
  FIRST_SLIDE_WITH_VIDEO_COPY,
  INTRO_CAROUSEL_SLIDES[1],
  INTRO_CAROUSEL_SLIDES[2],
];

export const GridGutterWidth: string = '30px';
