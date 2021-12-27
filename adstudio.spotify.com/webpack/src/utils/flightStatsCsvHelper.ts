import i18n from 'i18next';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import moment, { Moment } from 'moment';

import { formatToSentenceCase } from '@spotify-internal/adstudio-tape/lib/utils/helpers/stringHelpers';

import {
  FlightCombinedAudienceStatsState,
  FlightDetailsState,
  FlightLifetimeStreamingStatsState,
} from 'ducks/flights/reducer';

import { getStatusText } from 'components/common/CampaignHierarchy/StatusIndicator/constants';
import {
  AudienceStats,
  StatAudienceType,
  StatsGroup,
} from 'components/FlightDetails/ReportsTab/AudienceInsights/TabbedBarChart/TabbedBarChartTypes';
import {
  isflightStartDateAfterSCMCutoff,
  mapCombinedStatsApiToView,
} from 'components/FlightDetails/ReportsTab/chart-common/ChartUtils';

import { isAudienceInsightsEnabled } from 'utils/remoteconfig/remoteConfigHelpers';

import { isPodcastFormatType } from './creativeHelpers';
import { mapI18N } from './i18nHelpers';

import { I18N_ASSET_TYPE, I18N_PLACEMENT } from 'config/formats';
import { GENRE_MAP, GenreType } from 'config/genres';
import { IMPRESSIONS_MODEL, PAID_LISTENS_MODEL } from 'config/pricing';
import {
  GENRE,
  NON_SCM_ONLY,
  SCM_ONLY,
  STAT_FIELD_ATTRS,
  STAT_FIELDS,
  STAT_TYPES,
} from 'config/stats';

import { FlightLifetimeStreamingConversionStats } from 'types/common/state/api/flight';
import {
  AudienceStat,
  DailyCPCL,
  DailyCPM,
  LifetimeCPCL,
  LifetimeCPM,
} from 'types/common/state/api/flush';
import { Format } from 'types/common/state/api/format';

const { LIFETIME, DAILY, SCM_DAILY, SCM_LIFETIME } = STAT_TYPES;

const lineDelimiter = '\n';
const columnDelimiter = ',';
const quote = (string = '') => `"${string.replace(/"/g, '"')}"`;

const labels = {
  AD_LISTENS: i18n.t('I18N_AD_LISTENS', 'Ad completes'),
  AD_LISTEN_RATE: i18n.t('I18N_AD_LISTEN_RATE', 'Ad completion rate'),
  ADS_SERVED: i18n.t('I18N_IMPRESSIONS', 'Impressions'),
  ARTIST_NAME: i18n.t('I18N_ARTIST_NAME', 'Artist name'),
  AUDIENCE_INSIGHTS: i18n.t('I18N_AUDIENCE_INSIGHTS', 'Audience insights'),
  AUDIENCE_INSIGHTS_ON_SPOTIFY: i18n.t(
    'I18N_AUDIENCE_INSIGHTS_ON_SPOTIFY',
    'Audience insights for ads delivered on Spotify',
  ),
  AVG_FREQ_OF_AD_LISTENS: i18n.t(
    'I18N_FREQ_OF_LISTENS2',
    'Freq of ad completes',
  ),
  AVG_FREQ_OF_ADS_SERVED: i18n.t('I18N_FREQUENCY', 'Frequency'),
  BUDGET: i18n.t('I18N_BUDGET', 'Budget'),
  ACR: i18n.t('I18N_COMPLETION_RATE', 'Completion rate'),
  CLICKS: i18n.t('I18N_CLICKS', 'Clicks'),
  CTR: i18n.t('I18N_CTR', 'CTR'),
  DAILY_PERFORMANCE: i18n.t(
    'I18N_DAILY_PERFORMANCE_METRICS',
    'Daily performance (metrics displayed in UTC timezone)',
  ),
  DAILY_PERFORMANCE_ON_SPOTIFY: i18n.t(
    'I18N_DAILY_PERFORMANCE_METRICS_ON_SPOTIFY',
    'Daily performance on Spotify (metrics displayed in UTC timezone)',
  ),
  DATE: i18n.t('I18N_DATE', 'Date'),
  END_DATE: i18n.t('I18N_END_DATE', 'End date'),
  FORMAT: i18n.t('I18N_FORMAT_LABEL', 'Format'),
  INTENT_RATE: i18n.t('I18N_INTENT_RATE', 'Intent rate'),
  LISTENERS: i18n.t('I18N_LISTENERS', 'Listeners'),
  LISTENER_AVG_STREAMS: i18n.t(
    'I18N_LISTENER_AVG_STREAMS',
    'Listener avg streams',
  ),
  LISTENER_CONVERSION_RATE: i18n.t(
    'I18N_LISTENER_CONVERSION_RATE',
    'Listener conversion rate',
  ),
  NEW_LISTENERS: i18n.t('I18N_NEW_LISTENERS', 'New listeners'),
  NEW_LISTENER_AVG_STREAMS: i18n.t(
    'I18N_NEW_LISTENER_AVERAGE_STRE',
    'New listener avg streams',
  ),
  NEW_LISTENER_CONVERSION: i18n.t(
    'I18N_NEW_LISTENER_CONVERSION_R',
    'New listener conversion rate',
  ),
  REACH_OF_AD_LISTENS: i18n.t(
    'I18N_REACH_OF_AD_LISTENS1',
    'Reach of ad completes',
  ),
  REACH_OF_ADS_SERVED: i18n.t('I18N_REACH', 'Reach'),
  SPEND: i18n.t('I18N_SPEND', 'Spend'),
  START_DATE: i18n.t('I18N_START_DATE', 'Start date'),
  STARTS: i18n.t('I18N_STARTS', 'Starts'),
  STATUS: i18n.t('I18N_STATUS', 'Status'),
  TOTAL: i18n.t('I18N_TOTAL', 'Total'),
  TOTAL_STREAMS: i18n.t('I18N_TOTAL_STREAMS', 'Total streams'),
  FIRST_QUARTILE: i18n.t('I18N_FIRST_QUARTILE', 'Ad played to: 25%'),
  SECOND_QUARTILE: i18n.t('I18N_SECOND_QUARTILE', 'Ad played to: 50%'),
  THIRD_QUARTILE: i18n.t('I18N_THIRD_QUARTILE', 'Ad played to: 75%'),
  FOURTH_QUARTILE: i18n.t('I18N_FOURTH_QUARTILE', 'Ad played to: 100%'),
  PLACEMENT: i18n.t('I18N_PLACEMENT', 'Placement'),
  EXTERNAL_IMPRESSIONS: i18n.t(
    'I18N_IMPRESSIONS_OFF_SPOTIFY',
    'Impressions off Spotify',
  ),
  BUDGET_SPENT_ON_SPOTIFY: i18n.t(
    'I18N_BUDGET_SPENT_ON_SPOTIFY',
    'Budget spent on Spotify',
  ),
  BUDGET_SPENT_OFF_SPOTIFY: i18n.t(
    'I18N_BUDGET_SPENT_OFF_SPOTIFY',
    'Budget spent off Spotify',
  ),
  ADS_DELIVERED_OFF_SPOTIFY: i18n.t(
    'I18N_ADS_DELIVERED_OFF_SPOTIFY',
    'Podcast ads delivered off Spotify only have data for Impressions',
  ),
};

// Special case where ADS_SERVED has a different label for SPAN podcasts
const impressionsOnSpotifyLabel = i18n.t(
  'I18N_IMPRESSIONS_ON_SPOTIFY',
  'Impressions on Spotify',
);

const getImpressionHeaders = (isPodcast: boolean) =>
  isPodcast
    ? [quote(impressionsOnSpotifyLabel), quote(labels.EXTERNAL_IMPRESSIONS)]
    : [quote(labels.ADS_SERVED)];

const getCpmDailyHeaders = (showClicks: boolean, isPodcast: boolean) => [
  quote(labels.DATE),
  ...getImpressionHeaders(isPodcast),
  quote(labels.REACH_OF_ADS_SERVED),
  quote(labels.SPEND),
  ...(showClicks ? [quote(labels.CLICKS)] : []),
];

const getCpmHeaders = (showClicks: boolean, isPodcast: boolean) => [
  ...getImpressionHeaders(isPodcast),
  quote(labels.REACH_OF_ADS_SERVED),
  quote(labels.AVG_FREQ_OF_ADS_SERVED),
  // Do not show completion rate, clicks, or CTR for podcast ads
  ...(!isPodcast ? [quote(labels.ACR)] : []),
  ...(showClicks && !isPodcast ? [quote(labels.CTR)] : []),
  ...(showClicks && !isPodcast ? [quote(labels.CLICKS)] : []),
  quote(labels.SPEND),
  // Do not show starts for podcast ads
  ...(!isPodcast ? [quote(labels.STARTS)] : []),
];

const getCpclHeaders = (showClicks: boolean, isPodcast: boolean) => [
  ...getImpressionHeaders(isPodcast),
  quote(labels.REACH_OF_ADS_SERVED),
  quote(labels.AVG_FREQ_OF_ADS_SERVED),
  ...(showClicks ? [quote(labels.CTR)] : []),
  quote(labels.AD_LISTENS),
  quote(labels.REACH_OF_AD_LISTENS),
  quote(labels.AVG_FREQ_OF_AD_LISTENS),
  quote(labels.AD_LISTEN_RATE),
  ...(showClicks ? [quote(labels.CLICKS)] : []),
  quote(labels.SPEND),
];

const getCpclDailyHeaders = (showClicks: boolean, isPodcast: boolean) => [
  quote(labels.DATE),
  ...getImpressionHeaders(isPodcast),
  quote(labels.AD_LISTENS),
  quote(labels.SPEND),
  ...(showClicks ? [quote(labels.CLICKS)] : []),
];

const scmHeaders = [
  quote(labels.LISTENERS),
  quote(labels.LISTENER_CONVERSION_RATE),
  quote(labels.LISTENER_AVG_STREAMS),
  quote(labels.NEW_LISTENERS),
  quote(labels.NEW_LISTENER_CONVERSION),
  quote(labels.NEW_LISTENER_AVG_STREAMS),
  quote(labels.INTENT_RATE),
  quote(labels.TOTAL_STREAMS),
];

const quartileHeaders = [
  quote(labels.FIRST_QUARTILE),
  quote(labels.SECOND_QUARTILE),
  quote(labels.THIRD_QUARTILE),
  quote(labels.FOURTH_QUARTILE),
];

const scmDailyHeaders = [quote(labels.LISTENERS), quote(labels.NEW_LISTENERS)];

function getHeaders(
  costType: string,
  statsType: string,
  showClicks: boolean,
  isPodcast: boolean,
) {
  if (statsType === SCM_DAILY) {
    return scmDailyHeaders.join(',');
  }

  if (statsType === SCM_LIFETIME) {
    return scmHeaders.join(',');
  }

  if (costType === IMPRESSIONS_MODEL) {
    if (statsType === DAILY) {
      return getCpmDailyHeaders(showClicks, isPodcast).join(',');
    }
    return getCpmHeaders(showClicks, isPodcast).join(',');
  }

  if (costType === PAID_LISTENS_MODEL) {
    if (statsType === DAILY) {
      return getCpclDailyHeaders(showClicks, isPodcast).join(',');
    }
    return getCpclHeaders(showClicks, isPodcast).join(',');
  }
  return;
}

const getAudienceHeaders = (stats: AudienceStats) => {
  const headersObject: { [key: string]: Array<string> } = {};
  Object.entries(stats).forEach(([key, values]) => {
    headersObject[key] = values.map((val: AudienceStat) => val.name);
  });
  return headersObject;
};

/**
 * Ensure that missing stats won't cause any processing errors.  If we need a number from the
 * missing stat because it will be subject to a arithemetical operation, ensure we return 0 if
 * missing, else return an empty string.
 * @param {number} stat The stat to clean
 * @param {boolean} mustReturnNumber=false Ensure we return a zero for a missing stat.
 * @returns {number|string} The stat, if present, else a zero if mustReturnNumber set else an
 * empty string.
 */
export const cleanStat = (
  stat: number,
  mustReturnNumber = false,
): number | string => {
  // We want to make sure that if the stat is explicitly zero, we return that.
  if (stat || stat === 0) {
    return stat;
  }
  // If the stat is missing the caller tells us whether to return a zero or an empty string.
  return mustReturnNumber ? 0 : '';
};

// Hide genre for SCM and podcasts
function shouldShowGenre(
  isScmAd: boolean,
  startedAfterSCMCutoff: boolean,
  isPodcast: boolean,
) {
  return !(isScmAd && startedAfterSCMCutoff) && !isPodcast;
}

function buildLifetimeString(
  flight: FlightDetailsState,
  stats: (LifetimeCPM | LifetimeCPCL) &
    Pick<
      FlightLifetimeStreamingConversionStats,
      'conversionRate' | 'streams' | 'newListenerStreams' | 'completionRate'
    >,
  costType: string,
  isPodcast: boolean,
) {
  let result = ' ' + columnDelimiter;
  const isScmAd = !!flight.artistId;
  const showClicks = !isScmAd && !isPodcast;
  const showQuartiles = costType === IMPRESSIONS_MODEL && !isPodcast;

  /* ---- Column Headers ---- */
  if (costType === PAID_LISTENS_MODEL) {
    result +=
      getHeaders(PAID_LISTENS_MODEL, LIFETIME, showClicks, isPodcast) +
      columnDelimiter;
  } else {
    result +=
      getHeaders(IMPRESSIONS_MODEL, LIFETIME, showClicks, isPodcast) +
      columnDelimiter;
  }

  if (showQuartiles) {
    result += quartileHeaders.join(',') + columnDelimiter;
  }

  if (isScmAd) {
    result += getHeaders(costType, SCM_LIFETIME, showClicks, isPodcast);
  }

  result += lineDelimiter;

  /* ---- Data ---- */
  result += labels.TOTAL + columnDelimiter;
  if (isPodcast) {
    result += cleanStat(stats.adsServed) + columnDelimiter;
    result += cleanStat(stats.externalImpressions) + columnDelimiter;
    // TODO(ASMIR-1525) – Re-enable once capping logic is fixed
    /*
    result +=
      (cleanStat(stats.budgetSpentOnSpotify, true) as number).toFixed(2) +
      columnDelimiter;
    result +=
      (cleanStat(stats.budgetSpentOffSpotify, true) as number).toFixed(2) +
      columnDelimiter;
    */
  } else {
    result += cleanStat(stats.adsServed) + columnDelimiter;
  }
  result += cleanStat(stats.reach) + columnDelimiter;
  result +=
    (cleanStat(stats.frequency, true) as number).toFixed(2) + columnDelimiter;
  // Do not show CPM completion rate for podcast ads
  if (costType === IMPRESSIONS_MODEL && !isPodcast) {
    result +=
      ((cleanStat(stats.completionRate || 0) as number) / 100).toFixed(4) +
      columnDelimiter;
  }
  // Do not show CTR completion rate for podcast ads
  if (showClicks && !isPodcast) {
    result +=
      ((cleanStat(stats.ctr, true) as number) / 100).toFixed(4) +
      columnDelimiter;
  }
  if (costType === PAID_LISTENS_MODEL) {
    result += cleanStat((stats as LifetimeCPCL).paidListens) + columnDelimiter;
    result +=
      cleanStat((stats as LifetimeCPCL).reachPaidListens) + columnDelimiter;
    result +=
      (cleanStat(
        (stats as LifetimeCPCL).frequencyPaidListens,
        true,
      ) as number).toFixed(2) + columnDelimiter;
    result +=
      (
        (cleanStat((stats as LifetimeCPCL).completionRate, true) as number) /
        100
      ).toFixed(4) + columnDelimiter;
  }
  // Do not show clicks completion rate for podcast ads
  if (showClicks && !isPodcast) {
    result += cleanStat(stats.clicks) + columnDelimiter;
  }

  result += (cleanStat(stats.budgetConsumed, true) as number).toFixed(2);

  if (costType === IMPRESSIONS_MODEL && !isPodcast) {
    result += columnDelimiter;
    result += cleanStat(stats.starts, true) as number;
  }

  if (showQuartiles) {
    result += columnDelimiter;
    result +=
      (
        (cleanStat(get(stats.quartiles, 'firstQuartile'), true) as number) / 100
      ).toFixed(4) + columnDelimiter;
    result +=
      (
        (cleanStat(get(stats.quartiles, 'midpoint'), true) as number) / 100
      ).toFixed(4) + columnDelimiter;
    result +=
      (
        (cleanStat(get(stats.quartiles, 'thirdQuartile'), true) as number) / 100
      ).toFixed(4) + columnDelimiter;
    result += (
      (cleanStat(get(stats.quartiles, 'complete'), true) as number) / 100
    ).toFixed(4);
  }

  if (isScmAd) {
    result += columnDelimiter + cleanStat(stats.listeners) + columnDelimiter;
    result +=
      ((cleanStat(stats.conversionRate!, true) as number) / 100).toFixed(4) +
      columnDelimiter;
    result +=
      (cleanStat(
        (cleanStat(stats.streams!, true) as number) /
          (cleanStat(stats.listeners, true) as number),
        true,
      ) as number).toFixed(2) + columnDelimiter;
    result += cleanStat(stats.newListeners) + columnDelimiter;
    result +=
      (
        (cleanStat(stats.newListenerConversionRate, true) as number) / 100
      ).toFixed(4) + columnDelimiter;
    result +=
      (cleanStat(
        (cleanStat(stats.newListenerStreams!, true) as number) /
          (cleanStat(stats.newListeners, true) as number),
        true,
      ) as number).toFixed(2) + columnDelimiter;
    result +=
      ((cleanStat(stats.intentRate, true) as number) / 100).toFixed(4) +
      columnDelimiter;
    result += cleanStat(stats.streams!);
  }

  return result + lineDelimiter;
}

function buildAudienceString(
  flight: FlightDetailsState,
  stats: AudienceStats,
  costType: string,
  isPodcast: boolean,
) {
  const audienceHeaders = getAudienceHeaders(stats);
  const isScmAd = !!flight.artistId;
  const startedAfterSCMCutoff = isflightStartDateAfterSCMCutoff(flight);
  let result =
    (isPodcast
      ? labels.AUDIENCE_INSIGHTS_ON_SPOTIFY
      : labels.AUDIENCE_INSIGHTS) + lineDelimiter;
  const impressionsLabel = isPodcast
    ? i18n.t('I18N_IMPRESSIONS_ON_SPOTIFY', 'Impressions on Spotify')
    : i18n.t('I18N_IMPRESSIONS', 'Impressions');

  Object.keys(audienceHeaders).map(category => {
    /* ---- Column Headers ---- */
    // TODO: Remove following if you want to add Genres back in to Artist Promo Audience Insights CSV
    //  https://jira.spotify.net/browse/ASMIR-201
    const categoryAllowed =
      category !== GENRE ||
      shouldShowGenre(isScmAd, startedAfterSCMCutoff, isPodcast);

    if (categoryAllowed) {
      // Audience Type (i.e Platform)
      result +=
        ' ' +
        lineDelimiter +
        mapI18N(category, formatToSentenceCase(category)) +
        columnDelimiter;

      // Audience Subgroups (i.e iOS, Android, Desktop, etc.)
      audienceHeaders[category].forEach(subCategory => {
        result +=
          mapI18N(
            subCategory,
            mapI18N(
              subCategory,
              formatToSentenceCase(
                category === StatAudienceType.GENRE
                  ? // when falling back to default for some genre types we need to do a look up of proper string value
                    GENRE_MAP[subCategory as keyof GenreType] || subCategory
                  : subCategory,
              ),
              'I18N',
            ),
            `I18N_${category.toUpperCase()}`,
          ) + columnDelimiter;
      });
      result += lineDelimiter;
    }

    /* ---- Data ---- */
    const mappedStats: { [key: string]: TSFixMe } = {};

    stats[category as StatAudienceType]
      .filter(stat => stat.name)
      .forEach(stat => {
        Object.values(STAT_FIELDS).forEach((k: string) => {
          const key: keyof StatsGroup = k as keyof StatsGroup;
          if (stat[key]) {
            mappedStats[key] = {
              ...mappedStats[key],
              [stat.name]: stat[key],
            };
          } else if (!mappedStats[key] || !mappedStats[key][stat.name]) {
            mappedStats[key] = {
              ...mappedStats[key],
              [stat.name]: 0,
            };
          }
        });
      });

    Object.values(STAT_FIELDS).forEach(fieldKey => {
      const fieldAttrs = STAT_FIELD_ATTRS[fieldKey];
      const fieldValues = mappedStats[fieldKey] || [];
      if (
        !isEmpty(fieldValues) &&
        (!fieldAttrs.constraint ||
          (typeof fieldAttrs.constraint !== 'string' &&
            fieldAttrs.constraint.costType === costType) ||
          (isScmAd &&
            startedAfterSCMCutoff &&
            fieldAttrs.constraint === SCM_ONLY) ||
          (isAudienceInsightsEnabled() &&
            !isScmAd &&
            !isPodcast &&
            fieldAttrs.constraint === NON_SCM_ONLY))
      ) {
        // TODO: Remove following if you want to add Genres back in to Artist Promo Audience Insights CSV
        //  https://jira.spotify.net/browse/ASMIR-201
        if (!categoryAllowed) {
          return '';
        }
        // TODO: Update stats.js to only have impressions once we are fully in 1xy
        // https://jira.spotify.net/browse/ASMIR-201
        result +=
          (fieldAttrs.label === 'Ads served'
            ? impressionsLabel
            : fieldAttrs.label) + columnDelimiter;
        Object.entries(fieldValues).forEach(([, value]) => {
          const source = fieldAttrs.source;
          const digits = fieldAttrs.digits || 0;
          let stat: number | string = cleanStat(
            // @ts-ignore
            isObject(value) ? value[source] || 0 : value || 0,
            true,
          ) as number;
          if (source === 'percentage') {
            stat = (stat / 100).toFixed(4);
          } else {
            stat = stat.toFixed(digits);
          }
          result += stat + columnDelimiter;
        });
        result += lineDelimiter;
      }
      return;
    });
  });
  return result;
}
export const formatDate = (date: string | Moment = moment()) =>
  moment(date)
    .utc()
    .format('YYYY-MM-DD');

export const formatDateAndTimeLocal = (date = moment()) =>
  moment(date).format('YYYY-MM-DD' + ' HH:mm:ss');

function buildMetaData(flight: FlightDetailsState, isPodcast: boolean) {
  let result = '';
  const state = getStatusText(flight.flightState!);

  result +=
    `${flight.name} ${formatDate()}`.split(' ').join('_') + lineDelimiter;

  if (isPodcast) {
    result +=
      columnDelimiter + labels.ADS_DELIVERED_OFF_SPOTIFY + lineDelimiter;
  }

  result +=
    labels.STATUS +
    columnDelimiter +
    state!.substr(0, 1).toUpperCase() +
    state!.substr(1, state!.length) +
    lineDelimiter;
  result +=
    labels.BUDGET +
    columnDelimiter +
    flight.totalBudget!.amount +
    lineDelimiter;
  result +=
    labels.START_DATE +
    columnDelimiter +
    formatDate(flight.dateBegin!) +
    lineDelimiter;
  result +=
    labels.END_DATE +
    columnDelimiter +
    formatDate(flight.dateEnd!) +
    lineDelimiter;

  const placement = I18N_PLACEMENT[flight.format || Format.AUDIO];
  result += labels.PLACEMENT + columnDelimiter + placement + lineDelimiter;

  if (flight.format) {
    const format = I18N_ASSET_TYPE[flight.format];
    result += labels.FORMAT + columnDelimiter + format + lineDelimiter;
  }

  if (flight.artistName) {
    result +=
      labels.ARTIST_NAME + columnDelimiter + flight.artistName + lineDelimiter;
  }
  return result;
}

function buildDailyString(
  flight: FlightDetailsState,
  stats: Array<DailyCPM | DailyCPCL>,
  costType: string,
  isPodcast: boolean,
) {
  let result = labels.DAILY_PERFORMANCE + lineDelimiter;

  const isScmAd = !!flight.artistId;
  const showClicks = !isScmAd && !isPodcast;

  /* ---- Column Headers ---- */
  if (costType === PAID_LISTENS_MODEL) {
    result +=
      getHeaders(PAID_LISTENS_MODEL, DAILY, showClicks, isPodcast) +
      columnDelimiter;
  } else {
    result +=
      getHeaders(IMPRESSIONS_MODEL, DAILY, showClicks, isPodcast) +
      columnDelimiter;
  }

  if (flight.artistId) {
    result +=
      getHeaders(costType, SCM_DAILY, showClicks, isPodcast) + columnDelimiter;
  }

  result += lineDelimiter;

  /* ---- Data ---- */
  stats.forEach((row: DailyCPM | DailyCPCL) => {
    result += formatDate(row.timestamp) + columnDelimiter;
    result += cleanStat(row.adsServed) + columnDelimiter;

    if (isPodcast) {
      result += cleanStat(row.externalImpressions) + columnDelimiter;
    }

    if (costType === PAID_LISTENS_MODEL) {
      result += cleanStat((row as DailyCPCL).paidListens) + columnDelimiter;
    } else {
      result += cleanStat((row as DailyCPM).reach) + columnDelimiter;
    }

    result +=
      (cleanStat(row.spend, true) as number).toFixed(2) + columnDelimiter;
    if (showClicks) {
      result += cleanStat(row.clicks) + columnDelimiter;
    }
    if (flight.artistId) {
      result += cleanStat(row.scm!.listeners) + columnDelimiter;
      result += cleanStat(row.scm!.newListeners) + columnDelimiter;
    }

    result += lineDelimiter;
  });

  return result;
}

export function convertToCSVString(data: {
  flight: FlightDetailsState;
  dailyStats: DailyCPM[] | DailyCPCL[];
  lifetimeStats: LifetimeCPM | LifetimeCPCL;
  scmLifetimeStats: FlightLifetimeStreamingStatsState;
  audienceStats: FlightCombinedAudienceStatsState;
}) {
  const {
    flight,
    dailyStats = [],
    lifetimeStats,
    audienceStats,
    scmLifetimeStats,
  } = data;
  const mappedAudienceStats = !isEmpty(audienceStats)
    ? mapCombinedStatsApiToView(audienceStats)
    : {
        [StatAudienceType.AGE]: [],
        [StatAudienceType.GENDER]: [],
        [StatAudienceType.GENRE]: [],
        [StatAudienceType.PLATFORM]: [],
      };
  let result = '';
  const costType = flight.pricingModel;

  const nonNullScmLifetimeStats: { [key: string]: number } = {};
  if (!isEmpty(scmLifetimeStats)) {
    Object.entries(scmLifetimeStats).forEach(([key, value]) => {
      nonNullScmLifetimeStats[key] = value!;
    });
  }

  const totalLifetimeStats = {
    ...lifetimeStats,
    ...nonNullScmLifetimeStats,
  };

  const isPodcast = isPodcastFormatType(flight.format);

  result += buildMetaData(flight, isPodcast) + lineDelimiter;
  result +=
    buildLifetimeString(flight, totalLifetimeStats, costType!, isPodcast) +
    ' ' +
    lineDelimiter +
    lineDelimiter;
  result +=
    buildAudienceString(flight, mappedAudienceStats, costType!, isPodcast) +
    lineDelimiter +
    ' ' +
    lineDelimiter;
  result += buildDailyString(flight, dailyStats, costType!, isPodcast);

  return result;
}
export function createCSVDownloadLink(content: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  return URL.createObjectURL(blob);
}

export function createDownloadUri(data: {
  flight: FlightDetailsState;
  dailyStats: DailyCPM[] | DailyCPCL[];
  lifetimeStats: LifetimeCPM | LifetimeCPCL;
  scmLifetimeStats: FlightLifetimeStreamingStatsState;
  audienceStats: FlightCombinedAudienceStatsState;
}) {
  const csvString = convertToCSVString(data);
  return createCSVDownloadLink(csvString);
}

export function exportCSVDownload(content: string, filename: string) {
  const elem = window.document.createElement('a');
  elem.href = createCSVDownloadLink(content);
  elem.download = filename;
  elem.type = 'text/csv';
  document.body.appendChild(elem);
  elem.click();
  URL.revokeObjectURL(elem.href);
  document.body.removeChild(elem);
}
