import {
  ColumnGroup,
  FormSchema,
} from 'components/common/Table/ColumnCustomization/types';

import { CampaignColumns } from 'types/common/state/api/campaigns';

const campaignDetails: ColumnGroup = {
  [CampaignColumns.STATUS]: { i18nKey: 'I18N_STATUS', default: 'Status' },
  [CampaignColumns.ISSUES]: { i18nKey: 'I18N_ISSUES', default: 'Issues' },
};

const campaignPerformance: ColumnGroup = {
  [CampaignColumns.CLICK]: { i18nKey: 'I18N_CLICKS', default: 'Clicks' },
  [CampaignColumns.CTR]: { i18nKey: 'I18N_CTR', default: 'CTR' },
};

const campaignPerformanceActiveAudio: ColumnGroup = {
  ...campaignPerformance,
  [CampaignColumns.AD_LISTENS]: {
    i18nKey: 'I18N_AD_LISTENS',
    default: 'Ad completes',
  },
  [CampaignColumns.AD_LISTEN_RATE]: {
    i18nKey: 'I18N_AD_LISTEN_RATE',
    default: 'Ad completion rate',
  },
};

const campaignArtistResults: ColumnGroup = {
  [CampaignColumns.LISTENERS]: {
    i18nKey: 'I18N_LISTENERS',
    default: 'Listeners',
  },
  [CampaignColumns.NEW_LISTENERS]: {
    i18nKey: 'I18N_NEW_LISTENERS',
    default: 'New listeners',
  },
};

const getCampaignDeliveryColumns = (hasPodcast: boolean): ColumnGroup => {
  const impressions = hasPodcast
    ? {
        [CampaignColumns.IMPRESSIONS]: {
          i18nKey: 'I18N_IMPRESSIONS_ON_SPOTIFY',
          default: 'Impressions on Spotify',
        },
        [CampaignColumns.EXTERNAL_IMPRESSIONS]: {
          i18nKey: 'I18N_IMPRESSIONS_OFF_SPOTIFY',
          default: 'Impressions off Spotify',
        },
      }
    : {
        [CampaignColumns.IMPRESSIONS]: {
          i18nKey: 'I18N_IMPRESSIONS',
          default: 'Impressions',
        },
      };
  return {
    ...impressions,
    [CampaignColumns.FREQUENCY]: {
      i18nKey: 'I18N_FREQUENCY',
      default: 'Frequency',
    },
    [CampaignColumns.REACH]: { i18nKey: 'I18N_REACH', default: 'Reach' },
  };
};

const getCampaignDeliveryScmColumns = (hasPodcast: boolean): ColumnGroup => {
  return {
    ...getCampaignDeliveryColumns(hasPodcast),
  };
};

const getCampaignDeliveryActiveAudioColumns = (
  hasPodcast: boolean,
): ColumnGroup => {
  return {
    ...getCampaignDeliveryColumns(hasPodcast),
    [CampaignColumns.FREQUENCY_OF_LISTENS]: {
      i18nKey: 'I18N_FREQ_OF_LISTENS',
      default: 'Frequency of ad listens',
    },
  };
};

export const getCampaignFormSchema = (hasPodcast: boolean): FormSchema => {
  return [
    {
      label: {
        i18nKey: 'I18N_DETAILS',
        default: 'Details',
      },
      group: campaignDetails,
      groupKey: 'details',
    },
    {
      label: {
        i18nKey: 'I18N_DELIVERY',
        default: 'Delivery',
      },
      group: getCampaignDeliveryColumns(hasPodcast),
      groupKey: 'delivery',
    },
    {
      label: {
        i18nKey: 'I18N_PERFORMANCE',
        default: 'Performance',
      },
      group: campaignPerformance,
      groupKey: 'performance',
    },
  ];
};

export const getCampaignFormSchemaActiveAudio = (
  hasPodcast: boolean,
): FormSchema => {
  return [
    {
      label: {
        i18nKey: 'I18N_DETAILS',
        default: 'Details',
      },
      group: campaignDetails,
      groupKey: 'details',
    },
    {
      label: {
        i18nKey: 'I18N_DELIVERY',
        default: 'Delivery',
      },
      group: getCampaignDeliveryActiveAudioColumns(hasPodcast),
      groupKey: 'delivery',
    },
    {
      label: {
        i18nKey: 'I18N_PERFORMANCE',
        default: 'Performance',
      },
      group: campaignPerformanceActiveAudio,
      groupKey: 'performance',
    },
  ];
};

export const getCampaignFormSchemaScm = (hasPodcast: boolean): FormSchema => {
  return [
    {
      label: {
        i18nKey: 'I18N_DETAILS',
        default: 'Details',
      },
      group: campaignDetails,
      groupKey: 'details',
    },
    {
      label: {
        i18nKey: 'I18N_DELIVERY',
        default: 'Delivery',
      },
      group: getCampaignDeliveryScmColumns(hasPodcast),
      groupKey: 'delivery',
    },
    {
      label: {
        i18nKey: 'I18N_PERFORMANCE',
        default: 'Performance',
      },
      group: campaignPerformance,
      groupKey: 'performance',
    },
    {
      label: {
        i18nKey: 'I18N_ARTIST_RESULTS',
        default: 'Artist results',
      },
      group: campaignArtistResults,
      groupKey: 'artist',
    },
  ];
};

export const getCampaignFormSchemaActiveAudioScm = (
  hasPodcast: boolean,
): FormSchema => {
  return [
    ...getCampaignFormSchemaActiveAudio(hasPodcast),
    {
      label: {
        i18nKey: 'I18N_ARTIST_RESULTS',
        default: 'Artist results',
      },
      group: campaignArtistResults,
      groupKey: 'artist',
    },
  ];
};

export const determineCampaignTableSchema = (
  isScm: boolean,
  isActiveAudio: boolean,
  isSpanEnabled: boolean,
): FormSchema => {
  if (isScm) {
    return isActiveAudio
      ? getCampaignFormSchemaActiveAudioScm(isSpanEnabled)
      : getCampaignFormSchemaScm(isSpanEnabled);
  }
  return isActiveAudio
    ? getCampaignFormSchemaActiveAudio(isSpanEnabled)
    : getCampaignFormSchema(isSpanEnabled);
};

export const getAllColumns = (isSpanEnabled: boolean): ColumnGroup => {
  return {
    ...campaignDetails,
    ...getCampaignDeliveryColumns(isSpanEnabled),
    ...getCampaignDeliveryScmColumns(isSpanEnabled),
    ...getCampaignDeliveryActiveAudioColumns(isSpanEnabled),
    ...campaignPerformance,
    ...campaignPerformanceActiveAudio,
    ...campaignArtistResults,
  };
};
