import i18n from 'i18next';
import { get } from 'lodash';

import {
  azure,
  green,
  lavender,
  royalBlue,
} from '@spotify-internal/encore-foundation';

// Common

export type Accessor = (data: StatsGroup) => number;
export type StringAccessor = (data: StatsGroup) => string;
export type DataAccessor = (
  data: StatsGroup,
) => PercentageStat | BaseStat | undefined;

export type Formatter = (value: any) => string;
export type StringFormatter = (text: string) => string;

export function percentFormatter(value: number): string {
  return `${Math.round(value)}%`;
}

export const decimalFormatter = (precision: number) => (
  value: number,
): string => value.toFixed(precision);

export const percentDecimalFormatter = (precision: number) => {
  const formatter = decimalFormatter(precision);
  return (value: number): string => `${formatter(value)}%`;
};

export function wholeNumberFormatter(value: number): string {
  return value.toFixed(0);
}
export interface PercentageStat {
  percentage: number;
}

export interface BaseStat {
  base: number;
}

export enum StatAudienceType {
  AGE = 'age',
  GENDER = 'gender',
  GENRE = 'genre',
  PLATFORM = 'platform',
}

export interface AudienceStats {
  [StatAudienceType.AGE]: StatsGroup[];
  [StatAudienceType.GENDER]: StatsGroup[];
  [StatAudienceType.GENRE]: StatsGroup[];
  [StatAudienceType.PLATFORM]: StatsGroup[];
}

// Collection of stats for a particular value (e.g. for a particular genre of age bucket)
export interface StatsGroup {
  name: string;
  adsServed: PercentageStat;
  clicks?: PercentageStat;
  ctr?: PercentageStat;
  paidListens?: PercentageStat;
  listeners: PercentageStat;
  newListeners: PercentageStat;
  reach?: PercentageStat;
  avgStreams?: BaseStat;
  avgNewListenerStreams?: BaseStat;
  conversionRate?: PercentageStat;
  newListenersConversionRate?: PercentageStat;
  intentRate?: PercentageStat;
}

// Empty objects, useful as initial "empty" states and for tests
const emptyPercentageStat: PercentageStat = {
  percentage: 0,
};

const emptyBaseStat: BaseStat = {
  base: 0,
};

export const emptyStatsGroup: StatsGroup = {
  name: '',
  adsServed: emptyPercentageStat,
  paidListens: emptyPercentageStat,
  listeners: emptyPercentageStat,
  newListeners: emptyPercentageStat,
  reach: emptyPercentageStat,
  avgStreams: emptyBaseStat,
  avgNewListenerStreams: emptyBaseStat,
  conversionRate: emptyPercentageStat,
  newListenersConversionRate: emptyPercentageStat,
  intentRate: emptyPercentageStat,
};

export interface StatForDisplay {
  label: string;
  fillColor: string;
  rawValueAccessor?: (d: StatsGroup) => number;
  derivedValueAccessor: (d: StatsGroup) => number;
  derivedValueFormatter: (value: number) => string;
}

export interface ToggleDimensionConfig {
  toggleLabel: string;
  legendLabels: string[];
  tooltipLegendLabels?: string[]; // Optional override to use different text for tooltip legend
  cpclLegendLabels?: string[]; // Optional to use different text for cpcl specific legend labels
  cpclTooltipLegendLabels?: string[]; // Optional to use different text for cpcl specific tooltip legend
  colors: string[];
  toggleHighlightColor?: string;
  primaryAccessors: Accessor[];
  primaryCpclAccessors?: Accessor[];
  requiredAccessor: DataAccessor[]; // Accessor used for filtering out items with missing fields, such as "Others".
  primaryFormatter?: Formatter;
  yAxisFormatter?: Formatter;
}

export const percentageValueAccessor = (
  dimensionAccessor: (data: StatsGroup) => PercentageStat | undefined,
  fallback: number = 0,
) => (data: StatsGroup) => get(dimensionAccessor(data), 'percentage', fallback);

export const baseValueAccessor = (
  dimensionAccessor: (data: StatsGroup) => BaseStat | undefined,
  fallback: number = 0,
): Accessor => (data: StatsGroup) =>
  get(dimensionAccessor(data), 'base', fallback);

export const nameAccessor: StringAccessor = (data: StatsGroup): string =>
  data.name;

export const adsServedDataAccessor = (data: StatsGroup) => data.adsServed;
export const clicksDataAccessor = (data: StatsGroup) => data.clicks;
export const ctrDataAccessor = (data: StatsGroup) => data.ctr;
export const paidListensDataAccessor = (data: StatsGroup) => data.paidListens;

// Non SCM Config. nonSCM campaign are either non SCM or SCM campaigns before July 10, 2019.
export enum NonScmDimension {
  ADS_SERVED = 'ADS_SERVED',
  CLICKS = 'CLICKS',
  CTR = 'CTR',
}

export interface NonScmToggleConfig {
  [NonScmDimension.ADS_SERVED]: ToggleDimensionConfig;
  [NonScmDimension.CLICKS]: ToggleDimensionConfig;
  [NonScmDimension.CTR]: ToggleDimensionConfig;
}

export const getNonScmToggleConfig = (
  isPodcast: boolean,
): NonScmToggleConfig => {
  const impressionString = isPodcast
    ? i18n.t('I18N_IMPRESSIONS_ON_SPOTIFY', 'Impressions on Spotify')
    : i18n.t('I18N_IMPRESSIONS', 'Impressions');
  const clicksString = i18n.t('I18N_CLICKS', 'Clicks');
  const ctrString = i18n.t('I18N_CTR', 'CTR');
  return {
    [NonScmDimension.ADS_SERVED]: {
      toggleLabel: impressionString,
      legendLabels: [impressionString],
      tooltipLegendLabels: [impressionString],
      cpclLegendLabels: [
        impressionString,
        i18n.t('I18N_AD_LISTENS', 'Ad completes'),
      ],
      cpclTooltipLegendLabels: [
        impressionString,
        i18n.t('I18N_AD_LISTENS', 'Ad completes'),
      ],
      colors: [azure, royalBlue],
      primaryAccessors: [percentageValueAccessor(adsServedDataAccessor)],
      primaryCpclAccessors: [
        percentageValueAccessor(adsServedDataAccessor),
        percentageValueAccessor(paidListensDataAccessor),
      ],
      requiredAccessor: [adsServedDataAccessor],
    },
    [NonScmDimension.CLICKS]: {
      toggleLabel: clicksString,
      legendLabels: [clicksString],
      tooltipLegendLabels: [clicksString],
      cpclLegendLabels: [clicksString, i18n.t('I18N_CLICKS', 'Clicks')],
      cpclTooltipLegendLabels: [clicksString, i18n.t('I18N_CLICKS', 'Clicks')],
      colors: [azure, royalBlue],
      primaryAccessors: [percentageValueAccessor(clicksDataAccessor)],
      primaryCpclAccessors: [percentageValueAccessor(clicksDataAccessor)],
      requiredAccessor: [clicksDataAccessor],
    },
    [NonScmDimension.CTR]: {
      toggleLabel: ctrString,
      legendLabels: [ctrString],
      tooltipLegendLabels: [ctrString],
      cpclLegendLabels: [ctrString, i18n.t('I18N_CTR', 'CTR')],
      cpclTooltipLegendLabels: [ctrString, i18n.t('I18N_CTR', 'CTR')],
      colors: [azure, royalBlue],
      primaryAccessors: [percentageValueAccessor(ctrDataAccessor)],
      primaryCpclAccessors: [percentageValueAccessor(ctrDataAccessor)],
      requiredAccessor: [ctrDataAccessor],
      primaryFormatter: percentDecimalFormatter(2),
    },
  };
};

// SCM Config

export const newListenersColor = '#f86624';
export const listenersColor = '#fdc2a8';
export const listenerAvgStreamsColor = '#8edca9';
export const listenerConversionRateColor = '#d9cde3';
export const listenerIntentRateColor = '#7badc2';

export const reachDataAccessor = (data: StatsGroup) => data.reach;
export const listenersDataAccessor = (data: StatsGroup) => data.listeners;
export const newListenersDataAccessor = (data: StatsGroup) => data.newListeners;
export const avgListenerStreamsDataAccessor = (data: StatsGroup) =>
  data.avgStreams;
export const avgNewListenerStreamsDataAccessor = (data: StatsGroup) =>
  data.avgNewListenerStreams;
export const listenerConversionRateDataAccessor = (data: StatsGroup) =>
  data.conversionRate;
export const newListenerConversionRateDataAccessor = (data: StatsGroup) =>
  data.newListenersConversionRate;
export const listenerIntentRateDataAccessor = (data: StatsGroup) =>
  data.intentRate;

export enum ScmDimension {
  LISTENERS = 'LISTENERS',
  NEW_LISTENERS = 'NEW_LISTENERS',
  AVG_STREAMS = 'AVG_STREAMS',
  CONVERSION_RATE = 'CONVERSION_RATE',
  INTENT_RATE = 'INTENT_RATE',
}

interface ScmToggleConfig {
  [ScmDimension.LISTENERS]: ToggleDimensionConfig;
  [ScmDimension.NEW_LISTENERS]: ToggleDimensionConfig;
  [ScmDimension.AVG_STREAMS]: ToggleDimensionConfig;
  [ScmDimension.CONVERSION_RATE]: ToggleDimensionConfig;
  [ScmDimension.INTENT_RATE]: ToggleDimensionConfig;
}

export const scmToggleConfig: ScmToggleConfig = {
  [ScmDimension.LISTENERS]: {
    toggleLabel: i18n.t('I18N_LISTENERS', 'Listeners'),
    legendLabels: [
      i18n.t('I18N_OF_LISTENERS', '% of listeners'),
      i18n.t('I18N_OF_IMPRESSIONS', '% of impressions'),
    ],
    tooltipLegendLabels: [
      i18n.t('I18N_LISTENERS', 'Listeners'),
      i18n.t('I18N_IMPRESSIONS', 'Impressions'),
    ],
    cpclLegendLabels: [
      i18n.t('I18N_OF_LISTENERS', '% of listeners'),
      i18n.t('I18N_OF_AD_LISTENS', '% of ad completes'),
    ],
    cpclTooltipLegendLabels: [
      i18n.t('I18N_LISTENERS', 'Listeners'),
      i18n.t('I18N_AD_LISTENS', 'Ad completes'),
    ],
    colors: [listenersColor, azure],
    toggleHighlightColor: listenersColor,
    primaryAccessors: [
      percentageValueAccessor(listenersDataAccessor),
      percentageValueAccessor(adsServedDataAccessor),
    ],
    primaryCpclAccessors: [
      percentageValueAccessor(listenersDataAccessor),
      percentageValueAccessor(paidListensDataAccessor),
    ],
    requiredAccessor: [listenersDataAccessor],
  },
  [ScmDimension.NEW_LISTENERS]: {
    toggleLabel: i18n.t('I18N_NEW_LISTENERS', 'New listeners'),
    legendLabels: [
      i18n.t('I18N_OF_NEW_LISTENERS', '% of new listeners'),
      i18n.t('I18N_OF_IMPRESSIONS', '% of impressions'),
    ],
    tooltipLegendLabels: [
      i18n.t('I18N_NEW_LISTENERS', 'New listeners'),
      i18n.t('I18N_IMPRESSIONS', 'Impressions'),
    ],
    cpclLegendLabels: [
      i18n.t('I18N_OF_NEW_LISTENERS', '% of new listeners'),
      i18n.t('I18N_OF_AD_LISTENS', '% of ad completes'),
    ],
    cpclTooltipLegendLabels: [
      i18n.t('I18N_NEW_LISTENERS', 'New listeners'),
      i18n.t('I18N_AD_LISTENS', 'Ad completes'),
    ],
    colors: [newListenersColor, azure],
    toggleHighlightColor: newListenersColor,
    primaryAccessors: [
      percentageValueAccessor(newListenersDataAccessor),
      percentageValueAccessor(adsServedDataAccessor),
    ],
    primaryCpclAccessors: [
      percentageValueAccessor(newListenersDataAccessor),
      percentageValueAccessor(paidListensDataAccessor),
    ],
    requiredAccessor: [newListenersDataAccessor],
  },
  [ScmDimension.AVG_STREAMS]: {
    toggleLabel: i18n.t('I18N_AVG_STREAMS', 'Avg streams'),
    legendLabels: [
      i18n.t('I18N_STREAMS_PER_LISTENER', 'Streams per listener'),
      i18n.t('I18N_STREAMS_PER_NEW_LISTENE', 'Streams per new listener'),
    ],
    colors: [listenerAvgStreamsColor, green],
    toggleHighlightColor: green,
    primaryAccessors: [
      baseValueAccessor(avgListenerStreamsDataAccessor),
      baseValueAccessor(avgNewListenerStreamsDataAccessor),
    ],
    primaryFormatter: decimalFormatter(1),
    yAxisFormatter: wholeNumberFormatter,
    requiredAccessor: [
      avgListenerStreamsDataAccessor,
      avgNewListenerStreamsDataAccessor,
    ],
  },
  [ScmDimension.CONVERSION_RATE]: {
    toggleLabel: i18n.t('I18N_CONVERSION_RATE', 'Conversion rate'),
    legendLabels: [
      i18n.t('I18N_LISTENER_CONVERSION_RATE', 'Listener conversion rate'),
      i18n.t('I18N_NEW_LISTENER_CONVERSION_R', 'New listener conversion rate'),
    ],
    colors: [listenerConversionRateColor, lavender],
    toggleHighlightColor: lavender,
    primaryFormatter: percentDecimalFormatter(2),
    primaryAccessors: [
      percentageValueAccessor(listenerConversionRateDataAccessor),
      percentageValueAccessor(newListenerConversionRateDataAccessor),
    ],
    yAxisFormatter: percentDecimalFormatter(1),
    requiredAccessor: [
      listenerConversionRateDataAccessor,
      newListenerConversionRateDataAccessor,
    ],
  },
  [ScmDimension.INTENT_RATE]: {
    toggleLabel: i18n.t('I18N_INTENT_RATE', 'Intent rate'),
    legendLabels: [i18n.t('I18N_LISTENER_INTENT_RATE', 'Listener intent rate')],
    colors: [listenerIntentRateColor],
    toggleHighlightColor: listenerIntentRateColor,
    primaryFormatter: percentDecimalFormatter(2),
    primaryAccessors: [percentageValueAccessor(listenerIntentRateDataAccessor)],
    requiredAccessor: [
      listenerIntentRateDataAccessor,
      listenerIntentRateDataAccessor,
    ],
    yAxisFormatter: percentDecimalFormatter(1),
  },
};
