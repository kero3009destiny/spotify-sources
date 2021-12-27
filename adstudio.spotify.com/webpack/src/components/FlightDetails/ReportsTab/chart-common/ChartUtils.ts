import i18n from 'i18next';
import get from 'lodash/get';
import moment from 'moment';

import {
  FlightCombinedAudienceStatsState,
  FlightDailyStatsState,
  FlightDetailsState,
  FlightLifetimeStatsState,
} from 'ducks/flights/reducer';

import {
  AudienceStats,
  BaseStat,
  getNonScmToggleConfig,
  NonScmDimension,
  PercentageStat,
  ScmDimension,
  scmToggleConfig,
  StatAudienceType,
  StatsGroup,
} from 'components/FlightDetails/ReportsTab/AudienceInsights/TabbedBarChart/TabbedBarChartTypes';

import {
  adsServedAccessor,
  cleanStatDate,
  normalizeTimezone,
  yAccessor,
} from 'utils/statsHelpers';

import { ARTIST_PROMO } from 'config/adCreation';
import { IMPRESSIONS_MODEL, PAID_LISTENS_MODEL } from 'config/pricing';
import { ScmStatsCutoffDate } from 'config/stats';

import { PricingModel } from 'types/common/state/api/flight';
import {
  AudienceStat,
  DailyCPCL,
  DailyCPM,
  LifetimeCPCL,
  LifetimeCPM,
} from 'types/common/state/api/flush';

export const ANIMATION_TIMEOUT_MS = 125;
export const PADDING_WIDTH = 32;

const yTickCountMap: Map<number, number> = new Map([
  [5, 1],
  [15, 3],
  [30, 3],
]);

export const getTickCount = (maxYDomain: number): number => {
  return yTickCountMap.get(maxYDomain) || 2;
};

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

export const CampaignFlightCopy = {
  small: i18n.t('I18N_CF', 'CF'),
  medium: i18n.t('I18N_CAMPAIGN_FLIGHT', 'Campaign Flight'),
  large: i18n.t('I18N_CAMPAIGN_FLIGHT', 'Campaign Flight'),
};

export const PostCampaignWindowCopy = {
  small: i18n.t('I18N_PCW', 'PCW'),
  medium: i18n.t('I18N_PCW', 'PCW'),
  large: i18n.t('I18N_POST_CAMPAIGN_WINDOW', 'Post Campaign Window'),
};

export const flightIsCpcl = (flight: FlightDetailsState) =>
  get(flight, 'pricingModel') === PAID_LISTENS_MODEL;

export const isflightStartDateAfterSCMCutoff = (flight: FlightDetailsState) => {
  if (!flight.dateBegin) return false;

  return moment(flight.dateBegin).isSameOrAfter(ScmStatsCutoffDate);
};

export const isFlightPromotingContent = (flight: FlightDetailsState) =>
  !!flight.artistId && flight.objective === ARTIST_PROMO;

export const mapAudienceStatsToView = (
  audienceStatsResponse: AudienceStat[],
): StatsGroup[] => {
  return audienceStatsResponse.map((audienceStat: AudienceStat) => {
    return {
      name: audienceStat.name,
      adsServed: audienceStat.adsServed as PercentageStat,
      paidListens: audienceStat.paidListens as PercentageStat | undefined,
      listeners: audienceStat.listeners as PercentageStat,
      newListeners: audienceStat.newListeners as PercentageStat,
      reach: audienceStat.reach as PercentageStat | undefined,
      avgStreams: audienceStat.avgStreams as BaseStat | undefined,
      avgNewListenerStreams: audienceStat.avgNewListenerStreams as
        | BaseStat
        | undefined,
      conversionRate: audienceStat.conversionRate as PercentageStat | undefined,
      newListenersConversionRate: audienceStat.newListenersConversionRate as
        | PercentageStat
        | undefined,
      intentRate: audienceStat.intentRate as PercentageStat | undefined,
      clicks: audienceStat.clicks as PercentageStat | undefined,
      ctr: audienceStat.ctr as PercentageStat | undefined,
    };
  });
};

export const mapCombinedStatsApiToView = (
  stats: FlightCombinedAudienceStatsState,
): AudienceStats => {
  return {
    [StatAudienceType.AGE]: mapAudienceStatsToView(stats.ageInsights!.stats),
    [StatAudienceType.GENDER]: mapAudienceStatsToView(
      stats.genderInsights!.stats,
    ),
    [StatAudienceType.GENRE]: mapAudienceStatsToView(
      stats.genreInsights!.stats,
    ),
    [StatAudienceType.PLATFORM]: mapAudienceStatsToView(
      stats.platformInsights!.stats,
    ),
  };
};

/*
     Filter out stats from the stats object that are not returned by the backend.
     Example of this would be Genre "Other" metric for Audience Insights chart:
     We're getting it for Listeners or New Listeners but not for aggregate metrics such as Conversion rate or Intent rate.
     */
export const getStatsWithoutMissingDimensions = (
  selectedToggle: ScmDimension,
  stats: StatsGroup[],
) =>
  stats.filter(statGroup => {
    return scmToggleConfig[selectedToggle].requiredAccessor.every(
      accessor => accessor(statGroup) !== undefined,
    );
  });

export const getNonScmStatsWithoutMissingDimensions = (
  selectedToggle: NonScmDimension,
  stats: StatsGroup[],
  isPodcastFormat: boolean,
) =>
  stats.filter(statGroup => {
    return getNonScmToggleConfig(isPodcastFormat)[
      selectedToggle
    ].requiredAccessor.every(accessor => accessor(statGroup) !== undefined);
  });

export const getStatsForPricingModel = (
  stats: FlightDailyStatsState,
  model: PricingModel,
) => {
  switch (model) {
    case IMPRESSIONS_MODEL:
      return stats.dailyCpmStats! || [];
    case PAID_LISTENS_MODEL:
      return stats.dailyCpclStats! || [];
    default:
      return stats.dailyCpmStats! || [];
  }
};

export const getLifetimeStatsForPricingModel = (
  stats: FlightLifetimeStatsState,
  model: PricingModel,
): LifetimeCPM | LifetimeCPCL => {
  switch (model) {
    case IMPRESSIONS_MODEL:
      return stats.lifetimeCpmStats! || [];
    case PAID_LISTENS_MODEL:
      return stats.lifetimeCpclStats! || [];
    default:
      return stats.lifetimeCpmStats! || [];
  }
};

export const getChartXDomainAndWindows = (
  flightDailyStats: FlightDailyStatsState,
) => {
  const dateBegin = normalizeTimezone(
    cleanStatDate(flightDailyStats.flightData!.adjustedStartDate!),
  );
  const dateEnd = normalizeTimezone(
    cleanStatDate(flightDailyStats.flightData!.adjustedPostCampaignDate!),
  );
  const midPoint = normalizeTimezone(
    cleanStatDate(flightDailyStats.flightData!.adjustedEndDate!),
  );

  const fullWidth = moment(dateEnd).diff(dateBegin, 'days');
  const cfWidth = moment(midPoint).diff(dateBegin, 'days');
  const campaignWindowRatio = cfWidth / fullWidth;

  let cfCopy = CampaignFlightCopy.large;
  let pcwCopy = PostCampaignWindowCopy.large;
  if (campaignWindowRatio <= 0.07) {
    cfCopy = CampaignFlightCopy.small;
  } else if (campaignWindowRatio <= 0.15) {
    cfCopy = CampaignFlightCopy.medium;
  } else if (campaignWindowRatio >= 0.7) {
    pcwCopy = PostCampaignWindowCopy.small;
  }

  return {
    xDomain: [moment(dateBegin).toDate(), moment(dateEnd).toDate()],
    windows: [
      {
        start: moment(dateBegin).toDate(),
        end: moment(midPoint)
          .startOf('day')
          .add(1, 'day')
          .toDate(),
        label: cfCopy,
      },
      {
        start: moment(midPoint)
          .startOf('day')
          .add(1, 'day')
          .toDate(),
        end: moment(dateEnd).toDate(),
        label: pcwCopy,
      },
    ],
  };
};

// Using `as any[]` due to TypeScript overloading issues on reduce/filter/etc
export const getDailyPerformanceYDomain = (stats: DailyCPCL[] | DailyCPM[]) => [
  0,
  (stats as any[]).reduce((prev: number, stat: DailyCPCL | DailyCPM) => {
    return Math.max(prev, adsServedAccessor(stat), yAccessor(stat));
  }, 2),
];
