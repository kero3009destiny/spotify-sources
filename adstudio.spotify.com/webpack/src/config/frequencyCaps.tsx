import React from 'react';
import { Trans } from 'react-i18next';
import i18n from 'i18next';

import { semanticColors, TextLink } from '@spotify-internal/encore-web';

import { EXTERNAL_FAQ_ADDRESS } from './routes';

import { FrequencyCapUnit } from 'types/common/campaignHierarchy/types';

export const FREQUENCY_CAPS_DEFAULT_RANGES = {
  [FrequencyCapUnit.days]: { default: 5, min: 1, max: 5 },
  [FrequencyCapUnit.weeks]: { default: 35, min: 1, max: 35 },
  [FrequencyCapUnit.months]: { default: 50, min: 1, max: 50 },
};

export const FREQUENCY_CAPS_DEFAULT_VALUES = {
  [FrequencyCapUnit.days]: {
    maxImpressions: FREQUENCY_CAPS_DEFAULT_RANGES[FrequencyCapUnit.days].max,
    time: 1,
    timeUnit: FrequencyCapUnit.days,
    isCustom: true,
  },
  [FrequencyCapUnit.weeks]: {
    maxImpressions: FREQUENCY_CAPS_DEFAULT_RANGES[FrequencyCapUnit.weeks].max,
    time: 1,
    timeUnit: FrequencyCapUnit.weeks,
    isCustom: true,
  },
  [FrequencyCapUnit.months]: {
    maxImpressions: FREQUENCY_CAPS_DEFAULT_RANGES[FrequencyCapUnit.months].max,
    time: 1,
    timeUnit: FrequencyCapUnit.months,
    isCustom: true,
  },
};

export const FREQUENCY_CAP_DEFAULT_VALUE = [
  FREQUENCY_CAPS_DEFAULT_VALUES[FrequencyCapUnit.days],
  FREQUENCY_CAPS_DEFAULT_VALUES[FrequencyCapUnit.weeks],
  FREQUENCY_CAPS_DEFAULT_VALUES[FrequencyCapUnit.months],
];

export const FREQUENCY_CAPS_STRINGS = {
  errors: {
    invalid: () =>
      i18n.t(
        'I18N_FREQUENCY_CAPS_ERROR_INVALID',
        'A low frequency may reduce your budget delivery likelihood.',
      ),
    max: (val: number | string) =>
      i18n.t('I18N_FREQUENCY_CAPS_ERROR_MAX', {
        max: val,
        defaultValue: 'Number must be equal to or below {{max}}.',
      }),
    min: (val: number | string) =>
      i18n.t('I18N_FREQUENCY_CAPS_ERROR_MIN', {
        min: val,
        defaultValue: 'A minimum of {{min}} is required.',
      }),
    none: () =>
      i18n.t(
        'I18N_FREQUENCY_CAPS_ERROR_NONE',
        'Select a frequency cap to proceed.',
      ),
  },
  headers: {
    label: () =>
      i18n.t(
        'I18N_FREQUENCY_CAPS_HEADER_CUSTOM_FREQUENCY_CAP',
        'Custom frequency cap',
      ),
    createTooltip: (isPodcast: boolean, logger: Function) => {
      const FaqLink = ({ children }: { children: React.ReactNode }) => (
        <TextLink
          semanticColor={semanticColors.textBrightAccent}
          onClick={() => logger()}
          href={
            EXTERNAL_FAQ_ADDRESS[i18n.language]?.FREQ_CAPS ||
            EXTERNAL_FAQ_ADDRESS.en_US.FREQ_CAPS
          }
          target="_blank"
        >
          {children}
        </TextLink>
      );

      return isPodcast ? (
        <Trans i18nKey="I18N_FREQUENCY_CAPS_TOOLTIP_PODCAST">
          When you set a frequency cap, it's applied separately to ads that are
          delivered on Spotify and off Spotify.{' '}
          <FaqLink>Learn more about frequency caps</FaqLink>
        </Trans>
      ) : (
        <Trans i18nKey="I18N_FREQUENCY_CAPS_TOOLTIP">
          We set maximum impressions per user by default, but you can also
          choose to customize these frequency caps.{' '}
          <FaqLink>Learn more</FaqLink>
        </Trans>
      );
    },
    newMarker: () => i18n.t('I18N_NEW', 'New'),
    toggleOff: () => i18n.t('I18N_TOGGLE_OFF', 'Off'),
    toggleOn: () => i18n.t('I18N_TOGGLE_ON', 'ON'),
  },
  labels: {
    impressions: {
      generic: () =>
        i18n.t(
          'I18N_FREQUENCY_CAPS_LABEL_MAX_IMPRESSIONS',
          'Maximum impressions',
        ),
      [FrequencyCapUnit.days]: (freqCap: number | string) =>
        i18n.t(
          freqCap === 1
            ? 'I18N_FREQUENCY_CAPS_LABEL_IMPRESSION_PER_DAY'
            : 'I18N_FREQUENCY_CAPS_LABEL_IMPRESSIONS_PER_DAY',
          {
            dailyFreqCap: freqCap,
            defaultValue: '{{dailyFreqCap}} impressions max per 1 day',
          },
        ),
      [FrequencyCapUnit.weeks]: (freqCap: number | string) =>
        i18n.t(
          freqCap === 1
            ? 'I18N_FREQUENCY_CAPS_LABEL_IMPRESSION_PER_WEEK'
            : 'I18N_FREQUENCY_CAPS_LABEL_IMPRESSIONS_PER_WEEK',
          {
            weeklyFreqCap: freqCap,
            defaultValue: '{{weeklyFreqCap}} impressions max per 1 week',
          },
        ),
      [FrequencyCapUnit.months]: (freqCap: number | string) =>
        i18n.t(
          freqCap === 1
            ? 'I18N_FREQUENCY_CAPS_LABEL_IMPRESSION_PER_MONTH'
            : 'I18N_FREQUENCY_CAPS_LABEL_IMPRESSIONS_PER_MONTH',
          {
            monthlyFreqCap: freqCap,
            defaultValue: '{{monthlyFreqCap}} impressions max per 1 month',
          },
        ),
    },
    periods: {
      [FrequencyCapUnit.days]: () =>
        i18n.t('I18N_FREQUENCY_CAPS_LABEL_DAILY', 'Daily'),
      [FrequencyCapUnit.weeks]: () =>
        i18n.t('I18N_FREQUENCY_CAPS_LABEL_WEEKLY', 'Weekly'),
      [FrequencyCapUnit.months]: () =>
        i18n.t('I18N_FREQUENCY_CAPS_LABEL_MONTHLY', 'Monthly'),
    },
    review: () =>
      i18n.t('I18N_FREQUENCY_CAPS_LABEL_FREQUENCY_CAPS', 'Frequency capping'),
    values: {
      [FrequencyCapUnit.days]: () =>
        i18n.t('I18N_FREQUENCY_CAPS_VALUES_PER_DAY', 'per day'),
      [FrequencyCapUnit.weeks]: () =>
        i18n.t('I18N_FREQUENCY_CAPS_VALUES_PER_WEEK', 'per week'),
      [FrequencyCapUnit.months]: () =>
        i18n.t('I18N_FREQUENCY_CAPS_VALUES_PER_MONTH', 'per month'),
    },
  },
};
