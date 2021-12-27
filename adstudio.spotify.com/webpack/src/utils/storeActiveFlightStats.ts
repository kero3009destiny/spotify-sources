import debug from 'debug';
import { isNull } from 'lodash';
import moment from 'moment';

import {
  getExpirationKey,
  getLocalStorage,
  getStorage,
  getTimeout,
  isKeyExpired,
  jsonParse,
  jsonStringify,
  removeStorage,
  setStorage,
} from 'utils/storageHelpers';

import {
  CombinedAudienceStatsResponse,
  CombinedDailyStatResponse,
  LifetimeStatsResponse,
  LifetimeStreamingConversionStatsResponse,
} from 'types/common/state/api/flight';

const log = debug('storeActiveFlightStats');

export const LIFETIME_STATS_KEY = 'lifetime-stats';
export const DAILY_STATS_KEY = 'daily-stats';
export const STREAMING_CONVERSION_STATS_KEY = 'streaming-conversion-stats';
export const AUDIENCE_STATS_KEY = 'audience-stats';
export const EXPIRES_SUFFIX = 'stats-expires';

interface FlightStats {
  [LIFETIME_STATS_KEY]?: LifetimeStatsResponse;
  [DAILY_STATS_KEY]?: CombinedDailyStatResponse;
  [STREAMING_CONVERSION_STATS_KEY]?: LifetimeStreamingConversionStatsResponse;
  [AUDIENCE_STATS_KEY]?: CombinedAudienceStatsResponse;
}

type StatsResponse =
  | LifetimeStatsResponse
  | CombinedDailyStatResponse
  | LifetimeStreamingConversionStatsResponse
  | CombinedAudienceStatsResponse;

export const removeStoredStatsAndExpiration = (key: string) => {
  removeStorage(getLocalStorage(), key);
  removeStorage(getLocalStorage(), getExpirationKey(key, EXPIRES_SUFFIX));
  log(`removed data for key: ${key}`);
};

export const storeActiveFlightStatsByKey = (
  key: string,
  statsKey: keyof FlightStats,
  data: StatsResponse,
) => {
  const storedStatsForFlight: string | null = getStorage(
    getLocalStorage(),
    key,
  );

  const setExpiration: boolean = isNull(
    getStorage(getLocalStorage(), getExpirationKey(key, EXPIRES_SUFFIX)),
  );

  const parsedData: FlightStats | null = jsonParse(storedStatsForFlight);
  const stringifiedUpdatedStats: string | void = jsonStringify({
    ...parsedData,
    [statsKey]: data,
  });

  if (stringifiedUpdatedStats) {
    setStorage(getLocalStorage(), key, stringifiedUpdatedStats);
    if (setExpiration) {
      setStorage(
        getLocalStorage(),
        getExpirationKey(key, EXPIRES_SUFFIX),
        getTimeout(
          moment()
            .add(1, 'minutes')
            .valueOf(),
        ),
      );
    }
    log(`updated data for key: ${key}`);
  } else {
    log(`unable to store data for key: ${key}`);
  }
};

export const retrieveActiveFlightStatsByKey = (
  key: string,
  statsKey: keyof FlightStats,
): StatsResponse | null => {
  const storedStatsForFlight: string | null = getStorage(
    getLocalStorage(),
    key,
  );
  const isStatsDataExpired: boolean = isKeyExpired(
    getLocalStorage(),
    getExpirationKey(key, EXPIRES_SUFFIX),
  );

  if (storedStatsForFlight && !isStatsDataExpired) {
    const parsedStatsForFlight: FlightStats = jsonParse(storedStatsForFlight);
    return parsedStatsForFlight[statsKey] || null;
  }

  if (isStatsDataExpired) {
    removeStoredStatsAndExpiration(key);
  }

  log(`no data to retrieve for key: ${key}`);
  return null;
};

export const getActiveFlightStorageKey = (
  accountId: string,
  flightId: string,
) => `${accountId}/ad-set/${flightId}`;
