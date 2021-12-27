import {
  ColumnGroup,
  FormSchema,
} from 'components/common/Table/ColumnCustomization/types';

import { CreativeColumns } from 'types/common/state/api/creatives';

const creativeDetails: ColumnGroup = {
  [CreativeColumns.STATUS]: { i18nKey: 'I18N_STATUS', default: 'Status' },
  [CreativeColumns.FORMAT]: { i18nKey: 'I18N_FORMAT_LABEL', default: 'Format' },
};

const creativePerformance: ColumnGroup = {
  [CreativeColumns.CLICK]: { i18nKey: 'I18N_CLICKS', default: 'Clicks' },
  [CreativeColumns.CTR]: { i18nKey: 'I18N_CTR', default: 'CTR' },
  [CreativeColumns.COMPLETION_RATE]: {
    i18nKey: 'I18N_COMPLETION_RATE',
    default: 'Completion rate',
  },
};

const creativePerformanceActiveAudio: ColumnGroup = {
  ...creativePerformance,
  [CreativeColumns.AD_LISTENS]: {
    i18nKey: 'I18N_AD_LISTENS',
    default: 'Ad completes',
  },
  [CreativeColumns.AD_LISTEN_RATE]: {
    i18nKey: 'I18N_AD_LISTEN_RATE',
    default: 'Ad completion rate',
  },
};

const creativeArtistResults: ColumnGroup = {
  [CreativeColumns.LISTENERS]: {
    i18nKey: 'I18N_LISTENERS',
    default: 'Listeners',
  },
  [CreativeColumns.NEW_LISTENERS]: {
    i18nKey: 'I18N_NEW_LISTENERS',
    default: 'New listeners',
  },
};

const creativeCompletionPerformance: ColumnGroup = {
  [CreativeColumns.FIRST_QUARTILE]: {
    i18nKey: 'I18N_FIRST_QUARTILE',
    default: 'Ad played to: 25%',
  },
  [CreativeColumns.SECOND_QUARTILE]: {
    i18nKey: 'I18N_SECOND_QUARTILE',
    default: 'Ad played to: 50%',
  },
  [CreativeColumns.THIRD_QUARTILE]: {
    i18nKey: 'I18N_THIRD_QUARTILE',
    default: 'Ad played to: 75%',
  },
  [CreativeColumns.FOURTH_QUARTILE]: {
    i18nKey: 'I18N_FOURTH_QUARTILE',
    default: 'Ad played to: 100%',
  },
};

export const getCreativeDeliveryColumns = (
  hasPodcast: boolean,
): ColumnGroup => {
  const impressions = hasPodcast
    ? {
        [CreativeColumns.IMPRESSIONS]: {
          i18nKey: 'I18N_IMPRESSIONS_ON_SPOTIFY',
          default: 'Impressions on Spotify',
        },
        [CreativeColumns.EXTERNAL_IMPRESSIONS]: {
          i18nKey: 'I18N_IMPRESSIONS_OFF_SPOTIFY',
          default: 'Impressions off Spotify',
        },
      }
    : {
        [CreativeColumns.IMPRESSIONS]: {
          i18nKey: 'I18N_IMPRESSIONS',
          default: 'Impressions',
        },
      };
  return {
    ...impressions,
    [CreativeColumns.BUDGET_SPENT]: {
      i18nKey: 'I18N_BUDGET_SPENT',
      default: 'Budget spent',
    },
    [CreativeColumns.FREQUENCY]: {
      i18nKey: 'I18N_FREQUENCY',
      default: 'Frequency',
    },
    [CreativeColumns.REACH]: { i18nKey: 'I18N_REACH', default: 'Reach' },
  };
};

export const getCreativeDeliveryActiveAudio = (
  hasPodcast: boolean,
): ColumnGroup => {
  return {
    ...getCreativeDeliveryColumns(hasPodcast),
    [CreativeColumns.FREQUENCY_OF_LISTENS]: {
      i18nKey: 'I18N_FREQ_OF_LISTENS',
      default: 'Frequency of ad listens',
    },
    [CreativeColumns.LISTENS_REACH]: {
      i18nKey: 'I18N_REACH_OF_AD_LISTENS1',
      default: 'Reach of ad listens',
    },
  };
};

export const getCreativeFormSchema = (hasPodcast: boolean): FormSchema => {
  return [
    {
      label: {
        i18nKey: 'I18N_DETAILS',
        default: 'Details',
      },
      group: creativeDetails,
      groupKey: 'details',
    },
    {
      label: {
        i18nKey: 'I18N_DELIVERY',
        default: 'Delivery',
      },
      group: getCreativeDeliveryColumns(hasPodcast),
      groupKey: 'delivery',
    },
    {
      label: {
        i18nKey: 'I18N_PERFORMANCE',
        default: 'Performance',
      },
      group: {
        ...creativePerformance,
        ...creativeCompletionPerformance,
      },
      groupKey: 'performance',
    },
  ];
};

export const getCreativeFormSchemaScm = (hasPodcast: boolean): FormSchema => {
  return [
    ...getCreativeFormSchema(hasPodcast),
    {
      label: {
        i18nKey: 'I18N_ARTIST_RESULTS',
        default: 'Artist results',
      },
      group: creativeArtistResults,
      groupKey: 'artist',
    },
  ];
};

export const getCreativeFormSchemaActiveAudio = (
  hasPodcast: boolean,
): FormSchema => {
  return [
    {
      label: {
        i18nKey: 'I18N_DETAILS',
        default: 'Details',
      },
      group: creativeDetails,
      groupKey: 'details',
    },
    {
      label: {
        i18nKey: 'I18N_DELIVERY',
        default: 'Delivery',
      },
      group: getCreativeDeliveryActiveAudio(hasPodcast),
      groupKey: 'delivery',
    },
    {
      label: {
        i18nKey: 'I18N_PERFORMANCE',
        default: 'Performance',
      },
      group: {
        ...creativePerformance,
        ...creativePerformanceActiveAudio,
        ...creativeCompletionPerformance,
      },
      groupKey: 'performance',
    },
  ];
};

export const getCreativeFormSchemaActiveAudioScm = (
  hasPodcast: boolean,
): FormSchema => {
  return [
    ...getCreativeFormSchemaActiveAudio(hasPodcast),
    {
      label: {
        i18nKey: 'I18N_ARTIST_RESULTS',
        default: 'Artist results',
      },
      group: creativeArtistResults,
      groupKey: 'artist',
    },
  ];
};

export const determineCreativeTableSchema = (
  isScm: boolean,
  isActiveAudio: boolean,
  hasPodcast: boolean,
): FormSchema => {
  if (isScm) {
    return isActiveAudio
      ? getCreativeFormSchemaActiveAudioScm(hasPodcast)
      : getCreativeFormSchemaScm(hasPodcast);
  }
  return isActiveAudio
    ? getCreativeFormSchemaActiveAudio(hasPodcast)
    : getCreativeFormSchema(hasPodcast);
};

export const getAllColumns = (hasPodcast: boolean): ColumnGroup => {
  return {
    ...creativeDetails,
    ...getCreativeDeliveryColumns(hasPodcast),
    ...getCreativeDeliveryActiveAudio(hasPodcast),
    ...creativePerformance,
    ...creativeCompletionPerformance,
    ...creativePerformanceActiveAudio,
    ...creativeArtistResults,
  };
};
