import i18n from 'i18next';
import moment from 'moment';

import { PAID_LISTENS_MODEL } from 'config/pricing';

export const HEIGHT = 300;
export const WIDTH = 1280;

export const MIN_WIDTH = 1008;
export const MAX_WIDTH = 1328;
export const FLIGHT_ENTITY_MAX_WIDTH = 1416;
export const SIDE_NAV_WIDTH = 208;
export const ACCOUNT_SWITCHER_WIDTH = 272;

export const CHART_HEIGHT = 350;
export const CHART_WIDTH = 760;

export const QUARTILE_BAR_NUM = 4;
export const QUARTILE_HEIGHT = 350;
export const QUARTILE_BAR_THICKNESS = 90;
export const QUARTILE_SPACING_LEFT = 80;
export const QUARTILE_SPACING_TOP = 50;

export const SMALL_CHART_WIDTH = 400;
export const LARGE_CHART_WIDTH = 1016;

export const SPACING = {
  spacingTop: 10,
  spacingRight: 20,
};

export const SCM_ONLY = 'SCM_ONLY';
export const NON_SCM_ONLY = 'NON_SCM_ONLY';

export const LIFETIME = 'lifetime';
export const DAILY = 'daily';
export const AGE = 'age';
export const GENDER = 'gender';
export const GENRE = 'genre';
export const PLATFORM = 'platform';
export const SCM_DAILY = 'streamingConversion';
export const SCM_LIFETIME = 'streamingConversionLifetime';
export const ALL_DAILY = 'allDaily';
export const ALL_AUDIENCE = 'allAudience';
export const QUARTILES = 'quartiles';
export const FIRST_QUARTILE = 'firstQuartile';
export const SECOND_QUARTILE = 'midpoint';
export const THIRD_QUARTILE = 'thirdQuartile';
export const FOURTH_QUARTILE = 'complete';

export const STAT_TYPES = {
  LIFETIME,
  DAILY,
  SCM_DAILY,
  SCM_LIFETIME,
  ALL_DAILY,
  ALL_AUDIENCE,
};

export const AUDIENCE_STAT_TYPES = {
  AGE,
  GENDER,
  GENRE,
  PLATFORM,
};

export const QUARTILE_STAT_TYPES = {
  FIRST_QUARTILE,
  SECOND_QUARTILE,
  THIRD_QUARTILE,
  FOURTH_QUARTILE,
};

export const STAT_ATTRS = {
  [AUDIENCE_STAT_TYPES.AGE]: {
    chartWidth: CHART_WIDTH,
  },

  [AUDIENCE_STAT_TYPES.GENDER]: {
    chartWidth: SMALL_CHART_WIDTH,
  },

  [AUDIENCE_STAT_TYPES.GENRE]: {
    chartWidth: CHART_WIDTH,
  },

  [AUDIENCE_STAT_TYPES.PLATFORM]: {
    chartWidth: SMALL_CHART_WIDTH,
  },
};

export const POST_CAMPAIGN_WINDOW_DURATION = 14; // days

export const ADS_SERVED = 'adsServed';
export const CLICKS = 'clicks';
export const CTR = 'ctr';
export const AD_LISTENS = 'paidListens';
export const AVG_STREAMS = 'avgStreams';
export const AVG_NEW_LISTENER_STREAMS = 'avgNewListenerStreams';
export const CONVERSION_RATE = 'conversionRate';
export const INTENT_RATE = 'intentRate';
export const LISTENERS = 'listeners';
export const NEW_LISTENERS = 'newListeners';
export const NEW_LISTENER_CONVERSION_RATE = 'newListenersConversionRate';
export const REACH = 'reach';
export const STREAMS = 'streams';

export const STAT_FIELDS = {
  ADS_SERVED,
  CLICKS,
  CTR,
  AD_LISTENS,
  LISTENERS,
  NEW_LISTENERS,
  AVG_STREAMS,
  AVG_NEW_LISTENER_STREAMS,
  CONVERSION_RATE,
  NEW_LISTENER_CONVERSION_RATE,
  INTENT_RATE,
};

export const STAT_FIELD_ATTRS = {
  [STAT_FIELDS.ADS_SERVED]: {
    digits: 2,
    label: i18n.t('I18N_ADS_SERVED', 'Ads served'),
    source: 'percentage',
  },

  [STAT_FIELDS.AD_LISTENS]: {
    constraint: {
      costType: PAID_LISTENS_MODEL,
    },

    digits: 2,
    label: i18n.t('I18N_AD_LISTENS', 'Ad completes'),
    source: 'percentage',
  },

  [STAT_FIELDS.LISTENERS]: {
    constraint: SCM_ONLY,
    digits: 2,
    label: i18n.t('I18N_LISTENERS', 'Listeners'),
    source: 'percentage',
  },

  [STAT_FIELDS.NEW_LISTENERS]: {
    constraint: SCM_ONLY,
    digits: 2,
    label: i18n.t('I18N_NEW_LISTENERS', 'New listeners'),
    source: 'percentage',
  },

  [STAT_FIELDS.AVG_STREAMS]: {
    constraint: SCM_ONLY,
    digits: 1,
    label: i18n.t(
      'I18N_AVERAGE_STREAMS_PER_LISTE',
      'Average streams per listener',
    ),
    source: 'base',
  },

  [STAT_FIELDS.AVG_NEW_LISTENER_STREAMS]: {
    constraint: SCM_ONLY,
    digits: 1,
    label: i18n.t(
      'I18N_AVERAGE_STREAMS_PER_NEW_L',
      'Average streams per new listener',
    ),
    source: 'base',
  },

  [STAT_FIELDS.CONVERSION_RATE]: {
    constraint: SCM_ONLY,
    digits: 2,
    label: i18n.t('I18N_CONVERSION_RATE', 'Conversion rate'),
    source: 'percentage',
  },

  [STAT_FIELDS.NEW_LISTENER_CONVERSION_RATE]: {
    constraint: SCM_ONLY,
    digits: 2,
    label: i18n.t(
      'I18N_NEW_LISTENER_CONVERSION_R1',
      'New listener conversion rate',
    ),
    source: 'percentage',
  },

  [STAT_FIELDS.INTENT_RATE]: {
    constraint: SCM_ONLY,
    digits: 2,
    label: i18n.t('I18N_INTENT_RATE', 'Intent rate'),
    source: 'percentage',
  },
  [STAT_FIELDS.CLICKS]: {
    constraint: NON_SCM_ONLY,
    digits: 2,
    label: i18n.t('I18N_CLICKS', 'Clicks'),
    source: 'percentage',
  },
  [STAT_FIELDS.CTR]: {
    constraint: NON_SCM_ONLY,
    digits: 4,
    label: i18n.t('I18N_CTR', 'CTR'),
    source: 'percentage',
  },
};

export const ScmStatsCutoffDate = moment('2019-07-10T00:00:00.000Z');
