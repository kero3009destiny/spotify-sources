import {
  ColumnGroup,
  FormSchema,
} from 'components/common/Table/ColumnCustomization/types';

import { FlightColumns } from 'types/common/state/api/flights';

export const flightDetails: ColumnGroup = {
  [FlightColumns.STATUS]: { i18nKey: 'I18N_STATUS', default: 'Status' },
  [FlightColumns.START_DATE]: {
    i18nKey: 'I18N_START_DATE',
    default: 'Start date',
  },
  [FlightColumns.END_DATE]: { i18nKey: 'I18N_END_DATE', default: 'End date' },
  [FlightColumns.BUDGET]: { i18nKey: 'I18N_BUDGET', default: 'Budget' },
  [FlightColumns.PLACEMENT]: {
    i18nKey: 'I18N_PLACEMENT',
    default: 'Placement',
  },
  [FlightColumns.FORMAT]: { i18nKey: 'I18N_FORMAT_LABEL', default: 'Format' },
  [FlightColumns.COST_MODEL]: {
    i18nKey: 'I18N_COST_MODEL',
    default: 'Cost model',
  },
};

const flightPerformance: ColumnGroup = {
  [FlightColumns.CLICK]: { i18nKey: 'I18N_CLICKS', default: 'Clicks' },
  [FlightColumns.CTR]: { i18nKey: 'I18N_CTR', default: 'CTR' },
  [FlightColumns.COMPLETION_RATE]: {
    i18nKey: 'I18N_COMPLETION_RATE',
    default: 'Completion rate',
  },
};

const flightPerformanceActiveAudio: ColumnGroup = {
  ...flightPerformance,
  [FlightColumns.AD_LISTENS]: {
    i18nKey: 'I18N_AD_LISTENS',
    default: 'Ad completes',
  },
  [FlightColumns.AD_LISTEN_RATE]: {
    i18nKey: 'I18N_AD_LISTEN_RATE',
    default: 'Ad completion rate',
  },
};

const flightArtistResults: ColumnGroup = {
  [FlightColumns.LISTENERS]: {
    i18nKey: 'I18N_LISTENERS',
    default: 'Listeners',
  },
  [FlightColumns.NEW_LISTENERS]: {
    i18nKey: 'I18N_NEW_LISTENERS',
    default: 'New listeners',
  },
  [FlightColumns.INTENT_RATE]: {
    i18nKey: 'I18N_INTENT_RATE',
    default: 'Intent rate',
  },
  [FlightColumns.NEW_LISTENER_CONVERSION_RATE]: {
    i18nKey: 'I18N_NEW_LISTENER_CONVERSION_R',
    default: 'New listener conversion rate',
  },
  [FlightColumns.LISTENER_CONVERSION_RATE]: {
    i18nKey: 'I18N_LISTENER_CONVERSION_RATE',
    default: 'Listener conversion rate',
  },
  [FlightColumns.AVERAGE_STREAMS_PER_LISTENER]: {
    i18nKey: 'I18N_AVERAGE_STREAMS_PER_LISTE',
    default: 'Average streams per listener',
  },
  [FlightColumns.AVERAGE_STREAMS_PER_NEW_LISTENER]: {
    i18nKey: 'I18N_AVERAGE_STREAMS_PER_NEW_L',
    default: 'Average streams per new listener',
  },
};

const flightCompletionPerformance: ColumnGroup = {
  [FlightColumns.FIRST_QUARTILE]: {
    i18nKey: 'I18N_FIRST_QUARTILE',
    default: 'Ad played to: 25%',
  },
  [FlightColumns.SECOND_QUARTILE]: {
    i18nKey: 'I18N_SECOND_QUARTILE',
    default: 'Ad played to: 50%',
  },
  [FlightColumns.THIRD_QUARTILE]: {
    i18nKey: 'I18N_THIRD_QUARTILE',
    default: 'Ad played to: 75%',
  },
  [FlightColumns.FOURTH_QUARTILE]: {
    i18nKey: 'I18N_FOURTH_QUARTILE',
    default: 'Ad played to: 100%',
  },
};

const getFlightDeliveryColumns = (hasPodcast: boolean): ColumnGroup => {
  const impressions = hasPodcast
    ? {
        [FlightColumns.IMPRESSIONS]: {
          i18nKey: 'I18N_IMPRESSIONS_ON_SPOTIFY',
          default: 'Impressions on Spotify',
        },
        [FlightColumns.EXTERNAL_IMPRESSIONS]: {
          i18nKey: 'I18N_IMPRESSIONS_OFF_SPOTIFY',
          default: 'Impressions off Spotify',
        },
      }
    : {
        [FlightColumns.IMPRESSIONS]: {
          i18nKey: 'I18N_IMPRESSIONS',
          default: 'Impressions',
        },
      };
  return {
    ...impressions,
    [FlightColumns.BUDGET_SPENT]: {
      i18nKey: 'I18N_BUDGET_SPENT',
      default: 'Budget spent',
    },
    [FlightColumns.PACING]: {
      i18nKey: 'I18N_PACING',
      default: 'Pacing',
    },
    [FlightColumns.FREQUENCY]: {
      i18nKey: 'I18N_FREQUENCY',
      default: 'Frequency',
    },
    [FlightColumns.REACH]: { i18nKey: 'I18N_REACH', default: 'Reach' },
  };
};

const getFlightDeliveryActiveAudio = (hasPodcast: boolean): ColumnGroup => {
  return {
    ...getFlightDeliveryColumns(hasPodcast),
    [FlightColumns.FREQUENCY_OF_LISTENS]: {
      i18nKey: 'I18N_FREQ_OF_LISTENS',
      default: 'Frequency of ad listens',
    },
    [FlightColumns.LISTENS_REACH]: {
      i18nKey: 'I18N_REACH_OF_AD_LISTENS1',
      default: 'Reach of ad listens',
    },
  };
};

export const getFlightFormSchema = (hasPodcast: boolean): FormSchema => {
  return [
    {
      label: {
        i18nKey: 'I18N_DETAILS',
        default: 'Details',
      },
      group: flightDetails,
      groupKey: 'details',
    },
    {
      label: {
        i18nKey: 'I18N_DELIVERY',
        default: 'Delivery',
      },
      group: getFlightDeliveryColumns(hasPodcast),
      groupKey: 'delivery',
    },
    {
      label: {
        i18nKey: 'I18N_PERFORMANCE',
        default: 'Performance',
      },
      group: {
        ...flightPerformance,
        ...flightCompletionPerformance,
      },
      groupKey: 'performance',
    },
  ];
};

export const getFlightFormSchemaScm = (hasPodcast: boolean): FormSchema => {
  return [
    ...getFlightFormSchema(hasPodcast),
    {
      label: {
        i18nKey: 'I18N_ARTIST_RESULTS',
        default: 'Artist results',
      },
      group: flightArtistResults,
      groupKey: 'artist',
    },
  ];
};

export const getFlightFormSchemaActiveAudio = (
  hasPodcast: boolean,
): FormSchema => {
  return [
    {
      label: {
        i18nKey: 'I18N_DETAILS',
        default: 'Details',
      },
      group: flightDetails,
      groupKey: 'details',
    },
    {
      label: {
        i18nKey: 'I18N_DELIVERY',
        default: 'Delivery',
      },
      group: getFlightDeliveryActiveAudio(hasPodcast),
      groupKey: 'delivery',
    },
    {
      label: {
        i18nKey: 'I18N_PERFORMANCE',
        default: 'Performance',
      },
      group: {
        ...flightPerformanceActiveAudio,
        ...flightCompletionPerformance,
      },
      groupKey: 'performance',
    },
  ];
};

export const getFlightFormSchemaActiveAudioScm = (
  hasPodcast: boolean,
): FormSchema => {
  return [
    {
      label: {
        i18nKey: 'I18N_DETAILS',
        default: 'Details',
      },
      group: flightDetails,
      groupKey: 'details',
    },
    {
      label: {
        i18nKey: 'I18N_DELIVERY',
        default: 'Delivery',
      },
      group: getFlightDeliveryActiveAudio(hasPodcast),
      groupKey: 'delivery',
    },
    {
      label: {
        i18nKey: 'I18N_ARTIST_RESULTS',
        default: 'Artist results',
      },
      group: flightArtistResults,
      groupKey: 'artist',
    },
    {
      label: {
        i18nKey: 'I18N_PERFORMANCE',
        default: 'Performance',
      },
      group: {
        ...flightPerformanceActiveAudio,
        ...flightCompletionPerformance,
      },
      groupKey: 'performance',
    },
  ];
};

export const determineFlightTableSchema = (
  isScm: boolean,
  isActiveAudio: boolean,
  hasPodcast: boolean,
): FormSchema => {
  let formSchema = isActiveAudio
    ? getFlightFormSchemaActiveAudio(hasPodcast)
    : getFlightFormSchema(hasPodcast);

  if (isScm) {
    formSchema = isActiveAudio
      ? getFlightFormSchemaActiveAudioScm(hasPodcast)
      : getFlightFormSchemaScm(hasPodcast);
  }
  const details = formSchema.find(s => s.groupKey === 'details');
  if (details) details.group = flightDetails;

  return formSchema;
};

export const getAllColumns = (hasPodcast: boolean): ColumnGroup => {
  return {
    ...flightDetails,
    ...getFlightDeliveryColumns(hasPodcast),
    ...getFlightDeliveryActiveAudio(hasPodcast),
    ...flightPerformance,
    ...flightPerformanceActiveAudio,
    ...flightArtistResults,
    ...flightCompletionPerformance,
  };
};
