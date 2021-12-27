import { matchPath } from 'react-router-dom';
import { window } from 'global';
import { ParsedQuery } from 'query-string';

import {
  dateBegin,
  dateEnd,
  dateRangePresetKey as dateRangePreset,
} from 'components/common/CampaignHierarchy/DateFilter';

import { CAMPAIGN_QUERY_PARAM_PREFIX } from '../../components/CampaignCatalogue/constants';
import { CREATIVE_QUERY_PARAM_PREFIX } from '../../components/CreativeCatalogue/constants';
import { FLIGHT_QUERY_PARAM_PREFIX } from '../../components/FlightCatalogue/constants';
import { routes } from 'config/routes';

export const CAMPAIGN_ID_KEY = 'campaignId';
export const FLIGHT_ID_KEY = 'flightId';
export const CREATIVE_ID_KEY = 'creativeId';

export const LIMIT_KEY = 'limit';
export const OFFSET_KEY = 'offset';
export const SEARCH_WORD_KEY = 'searchWord';
export const STATUS_KEY = 'status';
export const SORT_CRITERIA_KEY = 'sortCriteria';
export const SORT_DIRECTION_KEY = 'sortDirection';
const flightParamRegex = new RegExp(`^${FLIGHT_QUERY_PARAM_PREFIX}-`);
const creativeParamRegex = new RegExp(`^${CREATIVE_QUERY_PARAM_PREFIX}-`);

export const DATE_RANGE_KEYS = [dateBegin, dateEnd, dateRangePreset];

export const CAMPAIGN_TABLE_BROWSER_KEYS = [
  `${CAMPAIGN_QUERY_PARAM_PREFIX}-${LIMIT_KEY}`,
  `${CAMPAIGN_QUERY_PARAM_PREFIX}-${OFFSET_KEY}`,
  `${CAMPAIGN_QUERY_PARAM_PREFIX}-${SEARCH_WORD_KEY}`,
  `${CAMPAIGN_QUERY_PARAM_PREFIX}-${SORT_CRITERIA_KEY}`,
  `${CAMPAIGN_QUERY_PARAM_PREFIX}-${SORT_DIRECTION_KEY}`,
];

export const FLIGHT_TABLE_BROWSER_KEYS = [
  `${FLIGHT_QUERY_PARAM_PREFIX}-${LIMIT_KEY}`,
  `${FLIGHT_QUERY_PARAM_PREFIX}-${OFFSET_KEY}`,
  `${FLIGHT_QUERY_PARAM_PREFIX}-${SEARCH_WORD_KEY}`,
  `${FLIGHT_QUERY_PARAM_PREFIX}-${STATUS_KEY}`,
  `${FLIGHT_QUERY_PARAM_PREFIX}-${SORT_CRITERIA_KEY}`,
  `${FLIGHT_QUERY_PARAM_PREFIX}-${SORT_DIRECTION_KEY}`,
  `${FLIGHT_QUERY_PARAM_PREFIX}-flightState`,
];

export const CREATIVE_TABLE_BROWSER_KEYS = [
  `${CREATIVE_QUERY_PARAM_PREFIX}-${LIMIT_KEY}`,
  `${CREATIVE_QUERY_PARAM_PREFIX}-${OFFSET_KEY}`,
  `${CREATIVE_QUERY_PARAM_PREFIX}-${SEARCH_WORD_KEY}`,
  `${CREATIVE_QUERY_PARAM_PREFIX}-${STATUS_KEY}`,
  `${CREATIVE_QUERY_PARAM_PREFIX}-${SORT_CRITERIA_KEY}`,
  `${CREATIVE_QUERY_PARAM_PREFIX}-${SORT_DIRECTION_KEY}`,
  `${CREATIVE_QUERY_PARAM_PREFIX}-creativeState`,
];

const HIERARCHY_KEYS = [CAMPAIGN_ID_KEY, FLIGHT_ID_KEY];

const filterQueryParams = (
  keeplist: Array<string>,
  params: URLSearchParams,
): string => {
  const keptQueryParams = new URLSearchParams();

  keeplist.forEach(key => {
    if (params.get(key)) {
      keptQueryParams.append(key, params.get(key)!);
    }
  });
  const paramsString = keptQueryParams.toString();
  return paramsString.length > 0 ? `?${paramsString}` : '';
};

export const ALL_KEYS = [
  ...HIERARCHY_KEYS,
  ...DATE_RANGE_KEYS,
  ...CAMPAIGN_TABLE_BROWSER_KEYS,
  ...FLIGHT_TABLE_BROWSER_KEYS,
  ...CREATIVE_TABLE_BROWSER_KEYS,
];

export const stripNavBarQueryParams = (search?: string): string => {
  return filterQueryParams(ALL_KEYS, new URLSearchParams(search));
};

export const STRIP_ONLY_FLIGHT_AND_CREATIVE_KEYS = [
  CAMPAIGN_ID_KEY,
  ...DATE_RANGE_KEYS,
  ...CAMPAIGN_TABLE_BROWSER_KEYS,
];

export const stripOnlyFlightAndCreativeFilteringParams = (
  params: URLSearchParams,
): string => {
  return filterQueryParams(STRIP_ONLY_FLIGHT_AND_CREATIVE_KEYS, params);
};

export const STRIP_ONLY_CREATIVE_KEYS = [
  ...HIERARCHY_KEYS,
  ...DATE_RANGE_KEYS,
  ...CAMPAIGN_TABLE_BROWSER_KEYS,
  ...FLIGHT_TABLE_BROWSER_KEYS,
];

export const stripOnlyCreativeFilteringParams = (
  params: URLSearchParams,
): string => {
  return filterQueryParams(STRIP_ONLY_CREATIVE_KEYS, params);
};

export const generateFlightNavPillQueryParams = (
  queryParams: ParsedQuery<string>,
): string => {
  // When you click this X button, we want to completely reset any flight or creative filters / paging and drop the
  // selected flightId.  Here we are trying to remove any filtering or pagination params that belong to the flight or
  // the creative by finding any params with the flight prefix or creative prefix.  If we see those params or the
  // flightId param, we don't propagate them into the href.
  const filteredQueryParams: Record<string, any> = Object.keys(queryParams)
    .filter(paramName => {
      return (
        !paramName.match(flightParamRegex) &&
        !paramName.match(creativeParamRegex) &&
        paramName !== FLIGHT_ID_KEY
      );
    })
    .reduce((accum: Record<string, any>, param: string) => {
      accum[param] = queryParams[param];
      return accum;
    }, {});

  return new URLSearchParams(filteredQueryParams).toString();
};

export const generateParamCount = (
  param?: string | string[] | null,
): number => {
  if (param) {
    return typeof param === 'string' ? 1 : param.length;
  }

  return 0;
};

export const getCurrentPagePrefix = (): string => {
  const matchesCampaignsCatalogue = matchPath(window.location.pathname, {
    path: routes.CAMPAIGN_CATALOGUE,
  });
  const matchesFlightsCatalogue = matchPath(window.location.pathname, {
    path: routes.FLIGHT_CATALOGUE,
  });
  const matchesCreativesCatalogue = matchPath(window.location.pathname, {
    path: routes.CREATIVE_CATALOGUE,
  });
  if (matchesCampaignsCatalogue) {
    return `${CAMPAIGN_QUERY_PARAM_PREFIX}-`;
  } else if (matchesFlightsCatalogue) {
    return `${FLIGHT_QUERY_PARAM_PREFIX}-`;
  } else if (matchesCreativesCatalogue) {
    return `${CREATIVE_QUERY_PARAM_PREFIX}-`;
  }
  return '';
};
