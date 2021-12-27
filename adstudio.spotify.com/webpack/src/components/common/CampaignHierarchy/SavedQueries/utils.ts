import moment from 'moment';

import { CAMPAIGN_QUERY_PARAM_PREFIX } from 'components/CampaignCatalogue/constants';
import { CREATIVE_QUERY_PARAM_PREFIX } from 'components/CreativeCatalogue/constants';
import { FLIGHT_QUERY_PARAM_PREFIX } from 'components/FlightCatalogue/constants';

import {
  CAMPAIGN_ID_KEY,
  FLIGHT_ID_KEY,
  LIMIT_KEY,
  OFFSET_KEY,
  SEARCH_WORD_KEY,
  SORT_CRITERIA_KEY,
  SORT_DIRECTION_KEY,
} from 'utils/campaignHierarchy/catalogueFilters';

import {
  dateBegin,
  dateEnd,
  dateRangePresetKey as dateRangePreset,
} from '../DateFilter';

import { routeFragmentLiterals, routeStrings as routes } from 'config/routes';

import {
  CampaignParams,
  CreativeParams,
  DateRangeParams,
  DateRangePresets,
  DateRangePresetsApiToUrl,
  DateRangePresetsUrlToApi,
  EntityDimension,
  EntityDimensionType,
  FlightParams,
  SavedQuery,
} from 'types/common/state/api/savedQueries';

interface CampaignParamsWithSort extends CampaignParams {
  campaignOrderBy?: string;
  campaignSortDirection?: string;
}

interface FlightParamsWithSort extends FlightParams {
  flightOrderBy?: string;
  flightSortDirection?: string;
}

interface CreativeParamsWithSort extends CreativeParams {
  creativeOrderBy?: string;
  creativeSortDirection?: string;
}

type DateParams = {
  dateRangePreset?: string;
  dateBegin?: string;
  dateEnd?: string;
};

type ParamsResponseKey =
  | keyof CampaignParamsWithSort
  | keyof FlightParamsWithSort
  | keyof CreativeParamsWithSort
  | keyof DateParams;

type SavedFiltersParams =
  | CampaignParamsWithSort
  | FlightParamsWithSort
  | CreativeParamsWithSort
  | DateParams;

interface SavedQueryParams
  extends CampaignParams,
    FlightParams,
    CreativeParams,
    DateRangeParams {}

const campaignParamsMap: Partial<Record<
  keyof CampaignParamsWithSort,
  string
>> = {
  campaignId: CAMPAIGN_ID_KEY,
  campaignLimit: `${CAMPAIGN_QUERY_PARAM_PREFIX}-${LIMIT_KEY}`,
  campaignNameSearch: `${CAMPAIGN_QUERY_PARAM_PREFIX}-${SEARCH_WORD_KEY}`,
  campaignOrderBy: `${CAMPAIGN_QUERY_PARAM_PREFIX}-${SORT_CRITERIA_KEY}`,
  campaignSortDirection: `${CAMPAIGN_QUERY_PARAM_PREFIX}-${SORT_DIRECTION_KEY}`,
};

const flightParamsMap: Partial<Record<keyof FlightParamsWithSort, string>> = {
  flightId: FLIGHT_ID_KEY,
  flightLimit: `${FLIGHT_QUERY_PARAM_PREFIX}-${LIMIT_KEY}`,
  flightNameSearch: `${FLIGHT_QUERY_PARAM_PREFIX}-${SEARCH_WORD_KEY}`,
  flightStatus: `${FLIGHT_QUERY_PARAM_PREFIX}-flightState`,
  flightOrderBy: `${FLIGHT_QUERY_PARAM_PREFIX}-${SORT_CRITERIA_KEY}`,
  flightSortDirection: `${FLIGHT_QUERY_PARAM_PREFIX}-${SORT_DIRECTION_KEY}`,
};

const creativesParamsMap: Partial<Record<
  keyof CreativeParamsWithSort,
  string
>> = {
  creativeLimit: `${CREATIVE_QUERY_PARAM_PREFIX}-${LIMIT_KEY}`,
  creativeNameSearch: `${CREATIVE_QUERY_PARAM_PREFIX}-${SEARCH_WORD_KEY}`,
  creativeStatus: `${CREATIVE_QUERY_PARAM_PREFIX}-creativeState`,
  creativeOrderBy: `${CREATIVE_QUERY_PARAM_PREFIX}-${SORT_CRITERIA_KEY}`,
  creativeSortDirection: `${CREATIVE_QUERY_PARAM_PREFIX}-${SORT_DIRECTION_KEY}`,
};

const dateParamsMap: Partial<Record<keyof DateParams, string>> = {
  dateRangePreset: dateRangePreset,
  dateBegin: dateBegin,
  dateEnd: dateEnd,
};

const paramsMap: Partial<Record<ParamsResponseKey, string>> = {
  ...campaignParamsMap,
  ...flightParamsMap,
  ...creativesParamsMap,
  ...dateParamsMap,
};

const entityDimensionRouteMap: Record<EntityDimensionType, string> = {
  ENTITY_DIMENSION_UNSPECIFIED: routes.CAMPAIGN_CATALOGUE,
  CAMPAIGNS: routes.CAMPAIGN_CATALOGUE,
  FLIGHTS: routes.FLIGHT_CATALOGUE,
  CREATIVES: routes.CREATIVE_CATALOGUE,
};

const CAMPAIGNS = 'campaigns';
const AD_SETS = 'ad-sets';
const ADS = 'ads';
const ORDER_BY = 'orderBy';
const SORT_DIRECTION = 'sortDirection';
const REPORT_DATE_FILTER = 'reportDateFilter';
const CAMPAIGN_COLUMN_SORT = 'campaignColumnSort';
const FLIGHT_COLUMN_SORT = 'flightColumnSort';
const CREATIVE_COLUMN_SORT = 'creativeColumnSort';
const DEFAULT_OFFSET = '0';
const DEFAULT_LIMIT = '20';

/*
  This object is used to manage the mapping of nested object in the createSavedQuery service.
    flattenedKey - key that is used in the flattened param list (allows UI to generate query string)
    nestedKey - the nested key name that this attribute maps to in the SavedQuery object
    parentKey - the name of the parent object that the value needs to be nested in
*/
const nestedParamsMap: {
  [key: string]: {
    flattenedKey: string;
    nestedKey: string;
    parentKey: keyof SavedQueryParams;
  };
} = {
  campaignOrderBy: {
    flattenedKey: `${CAMPAIGN_QUERY_PARAM_PREFIX}OrderBy`,
    nestedKey: ORDER_BY,
    parentKey: CAMPAIGN_COLUMN_SORT,
  },
  campaignSortDirection: {
    flattenedKey: `${CAMPAIGN_QUERY_PARAM_PREFIX}SortDirection`,
    nestedKey: SORT_DIRECTION,
    parentKey: CAMPAIGN_COLUMN_SORT,
  },
  flightOrderBy: {
    flattenedKey: `${FLIGHT_QUERY_PARAM_PREFIX}OrderBy`,
    nestedKey: ORDER_BY,
    parentKey: FLIGHT_COLUMN_SORT,
  },
  flightSortDirection: {
    flattenedKey: `${FLIGHT_QUERY_PARAM_PREFIX}SortDirection`,
    nestedKey: SORT_DIRECTION,
    parentKey: FLIGHT_COLUMN_SORT,
  },
  creativeOrderBy: {
    flattenedKey: `${CREATIVE_QUERY_PARAM_PREFIX}OrderBy`,
    nestedKey: ORDER_BY,
    parentKey: CREATIVE_COLUMN_SORT,
  },
  creativeSortDirection: {
    flattenedKey: `${CREATIVE_QUERY_PARAM_PREFIX}SortDirection`,
    nestedKey: SORT_DIRECTION,
    parentKey: CREATIVE_COLUMN_SORT,
  },
  dateBegin: {
    flattenedKey: dateBegin,
    nestedKey: dateBegin,
    parentKey: REPORT_DATE_FILTER,
  },
  dateEnd: {
    flattenedKey: dateEnd,
    nestedKey: dateEnd,
    parentKey: REPORT_DATE_FILTER,
  },
};

// Translates query param object into a query string
export const translateToQueryString = (
  params: SavedFiltersParams,
  entity: EntityDimensionType,
) => {
  const searchParams = new URLSearchParams('');
  for (const [key, value] of Object.entries(params)) {
    const paramKey = paramsMap[key as ParamsResponseKey];
    if (paramKey && value) {
      searchParams.set(paramKey, value);
    }
  }

  // Need to ensure that the offset and limit values are being set. These are passed into the data requests and they prevent duplicate requests from being made
  let offsetKey = `${CAMPAIGN_QUERY_PARAM_PREFIX}-${OFFSET_KEY}`;
  let limitKey = `${CAMPAIGN_QUERY_PARAM_PREFIX}-${LIMIT_KEY}`;
  if (entity === EntityDimension.FLIGHTS) {
    offsetKey = `${FLIGHT_QUERY_PARAM_PREFIX}-${OFFSET_KEY}`;
    limitKey = `${FLIGHT_QUERY_PARAM_PREFIX}-${LIMIT_KEY}`;
  } else if (entity === EntityDimension.CREATIVES) {
    offsetKey = `${CREATIVE_QUERY_PARAM_PREFIX}-${OFFSET_KEY}`;
    limitKey = `${CREATIVE_QUERY_PARAM_PREFIX}-${LIMIT_KEY}`;
  }

  const offsetValue = searchParams.has(offsetKey);
  if (!offsetValue) {
    searchParams.set(offsetKey, DEFAULT_OFFSET);
  }

  const limitValue = searchParams.has(limitKey);
  if (!limitValue) {
    searchParams.set(limitKey, DEFAULT_LIMIT);
  }

  return searchParams.toString();
};

// This function looks through the SavedQuery object and translates the params into a flattened structure that can generate a URL
export const generateUrl = (savedQuery: SavedQuery, accountId: string) => {
  const entity: EntityDimensionType =
    savedQuery.entityDimension || EntityDimension.CAMPAIGNS;

  // flattens campaign params object
  const campaignParams: CampaignParamsWithSort =
    savedQuery.campaignParams || {};
  if (campaignParams[CAMPAIGN_COLUMN_SORT]) {
    campaignParams[
      nestedParamsMap.campaignOrderBy
        .flattenedKey as keyof CampaignParamsWithSort
    ] =
      campaignParams[CAMPAIGN_COLUMN_SORT][
        nestedParamsMap.campaignOrderBy.nestedKey
      ] || '';
    campaignParams[
      nestedParamsMap.campaignSortDirection
        .flattenedKey as keyof CampaignParamsWithSort
    ] =
      campaignParams[CAMPAIGN_COLUMN_SORT][
        nestedParamsMap.campaignSortDirection.nestedKey
      ] || '';
  }

  // flattens flight params object
  const flightParams: FlightParamsWithSort = savedQuery.flightParams || {};
  if (flightParams[FLIGHT_COLUMN_SORT]) {
    flightParams[
      nestedParamsMap.flightOrderBy.flattenedKey as keyof FlightParamsWithSort
    ] =
      flightParams[FLIGHT_COLUMN_SORT][
        nestedParamsMap.flightOrderBy.nestedKey
      ] || '';
    flightParams[
      nestedParamsMap.flightSortDirection
        .flattenedKey as keyof FlightParamsWithSort
    ] =
      flightParams[FLIGHT_COLUMN_SORT][
        nestedParamsMap.flightSortDirection.nestedKey
      ] || '';
  }

  // flattens creative params object
  const creativeParams: CreativeParamsWithSort =
    savedQuery.creativeParams || {};
  if (creativeParams[CREATIVE_COLUMN_SORT]) {
    creativeParams[
      nestedParamsMap.creativeOrderBy
        .flattenedKey as keyof CreativeParamsWithSort
    ] =
      creativeParams[CREATIVE_COLUMN_SORT][
        nestedParamsMap.creativeOrderBy.nestedKey
      ] || '';
    creativeParams[
      nestedParamsMap.creativeSortDirection
        .flattenedKey as keyof CreativeParamsWithSort
    ] =
      creativeParams[CREATIVE_COLUMN_SORT][
        nestedParamsMap.creativeSortDirection.nestedKey
      ] || '';
  }

  // flattens date params object
  const dateRangeParams: DateRangeParams = savedQuery.dateRangeParams || {};
  let dateParams: DateParams = {};
  if (
    dateRangeParams.dateRangePreset &&
    dateRangeParams.dateRangePreset === DateRangePresets.CUSTOM
  ) {
    const startDate = moment(dateRangeParams[REPORT_DATE_FILTER]?.dateBegin)
      .utc()
      .format('YYYY-MM-DD');
    const endDate = moment(dateRangeParams[REPORT_DATE_FILTER]?.dateEnd)
      .utc()
      .format('YYYY-MM-DD');
    dateParams = {
      dateRangePreset: dateRangeParams.dateRangePreset,
      dateBegin: startDate,
      dateEnd: endDate,
    };
  } else if (dateRangeParams.dateRangePreset) {
    const translatedDateRangePreset =
      DateRangePresetsApiToUrl[dateRangeParams.dateRangePreset] ||
      dateRangeParams.dateRangePreset;

    dateParams = {
      dateRangePreset: translatedDateRangePreset,
    };
  }

  const searchParams = translateToQueryString(
    {
      ...campaignParams,
      ...flightParams,
      ...creativeParams,
      ...dateParams,
    },
    entity,
  );

  const path = entityDimensionRouteMap[entity].replace(
    routeFragmentLiterals.ACCOUNT_ID,
    accountId,
  );

  return {
    url: `/${path}?${searchParams}`,
    params: `?${searchParams}`,
  };
};

// This function checks if the current query string matches the selected saved filter url (allows for the saved filter to remain toggled on table switch)
export const checkQueryStringsMatch = (
  currentQueryString: string,
  savedFilterQueryString: string,
) => {
  // ignore pagination settings when trying to match a saved filter
  const ignoreParams = [
    `${CAMPAIGN_QUERY_PARAM_PREFIX}-${OFFSET_KEY}`,
    `${FLIGHT_QUERY_PARAM_PREFIX}-${OFFSET_KEY}`,
    `${CREATIVE_QUERY_PARAM_PREFIX}-${OFFSET_KEY}`,
    `${CAMPAIGN_QUERY_PARAM_PREFIX}-${LIMIT_KEY}`,
    `${FLIGHT_QUERY_PARAM_PREFIX}-${LIMIT_KEY}`,
    `${CREATIVE_QUERY_PARAM_PREFIX}-${LIMIT_KEY}`,
  ];
  const currentSearchParams = new URLSearchParams(currentQueryString);
  const savedFilterSearchParams = new URLSearchParams(savedFilterQueryString);
  ignoreParams.forEach(param => {
    currentSearchParams.delete(param);
    savedFilterSearchParams.delete(param);
  });
  currentSearchParams.sort();
  savedFilterSearchParams.sort();
  return currentSearchParams.toString() === savedFilterSearchParams.toString();
};

export const checkMultiIdsMatch = (
  currentCampaignIds: string[],
  selectedCampaignIds: string[],
  currentFlightIds: string[],
  selectedFlightIds: string[],
) => {
  if (currentCampaignIds.length !== selectedCampaignIds.length) {
    return false;
  }
  if (currentFlightIds.length !== selectedFlightIds.length) {
    return false;
  }
  for (const campaignId of currentCampaignIds) {
    if (!selectedCampaignIds.includes(campaignId)) return false;
  }
  for (const flightId of currentFlightIds) {
    if (!selectedFlightIds.includes(flightId)) return false;
  }
  return true;
};

/*
  Inputs:
    serviceKey - current key being evaluated (translated url query param to dunder service key)
    nestedParams - array of params that the createSavedQueries service needs to have nested
    params - current params being modified (campaign, flight, creative, or date)
    value - current value of url param that is being evaluated
  Outputs:
    Updates params object at either the nested level or the parent level
  Description:
    This function manages the building of params for the createSavedQueries service. Some params need to be in nested objects.
      Nested Example: for url param 'campaign-sortCriteria', dunder is expecting it to passed as 'campaignParams.campaignColumnSort.orderBy'.
      Non-Nested Example: for url param 'campaignId', dunder is expecting it to be passed as 'campaignParams.campaignId'.
*/
export const buildParams = (
  serviceKey: ParamsResponseKey,
  nestedParamsList: {
    flattenedKey: string;
    nestedKey: string;
    parentKey: keyof SavedQueryParams;
  }[],
  params: SavedQueryParams,
  value: string,
) => {
  let isNested = false;
  // Loop through the list of nested attributes and see if the service key matches. If it does, add the value to the defined nested object.
  nestedParamsList.forEach(np => {
    if (np.flattenedKey === serviceKey) {
      if (!params[np.parentKey]) {
        params[np.parentKey] = {};
      }
      params[np.parentKey][np.nestedKey] = value;
      isNested = true;
    }
  });
  // If the service key does not need to be nested, add to the parent object.
  if (!isNested) {
    params[serviceKey as keyof SavedQueryParams] = value;
  }
};

const translateDateParamValues = (
  serviceKey: string,
  value: string,
): string => {
  if (serviceKey === dateRangePreset) {
    // Translate preset values into those accepted by dunder backend
    // e.g. LAST_FOURTEEN_DAYS => LAST_14_DAYS
    return DateRangePresetsUrlToApi[value] || value;
  } else if (serviceKey === dateBegin || serviceKey === dateEnd) {
    // Translate YYYY-MM-DD string from URL into proto timestamp format
    return moment(value)
      .utc(true)
      .toISOString();
  }
  return value;
};

/*
  This function takes in the URL query string and translates it into an a params object to send to the create saved queries service
  output: {
    campaignParams?: CampaignParams,
    flightParams?: FlightParams,
    creativeParams?: CreativeParams,
    dateRangeParams?: DateRangeParams
  }
*/
export const translateToSavedQueryParams = (queryString: string) => {
  const campaignParams: CampaignParams = {};
  const flightParams: FlightParams = {};
  const creativeParams: CreativeParams = {};
  const dateRangeParams: DateRangeParams = {};
  const urlParams = new URLSearchParams(queryString);

  // This inverts the paramsMap so that the query params are the keys. Allows for easier translation to expected object
  const invertedParamsMap: Partial<Record<string, ParamsResponseKey>> = {};
  for (const [serviceKey, paramKey] of Object.entries(paramsMap)) {
    if (paramKey) invertedParamsMap[paramKey] = serviceKey as ParamsResponseKey;
  }

  // Loop over the query params
  urlParams.forEach((value, key) => {
    // Find the service key that dunder is expecting that matches the key that voltron uses in the query params
    const serviceKey = invertedParamsMap[key];
    if (serviceKey && value) {
      // This splits the url params because the createSavedQueries service expects the campaign, flight, creative, and data params to be in separate objects.
      if (campaignParamsMap.hasOwnProperty(serviceKey)) {
        const nestedCampaignParams = [
          nestedParamsMap.campaignOrderBy,
          nestedParamsMap.campaignSortDirection,
        ];
        // builds campaign params and checks for params that need to be nested for campaign params
        buildParams(serviceKey, nestedCampaignParams, campaignParams, value);
      } else if (flightParamsMap.hasOwnProperty(serviceKey)) {
        const nestedFlightParams = [
          nestedParamsMap.flightOrderBy,
          nestedParamsMap.flightSortDirection,
        ];
        // builds flight params and checks for params that need to be nested for flight params
        buildParams(serviceKey, nestedFlightParams, flightParams, value);
      } else if (creativesParamsMap.hasOwnProperty(serviceKey)) {
        const nestedCreativeParams = [
          nestedParamsMap.creativeOrderBy,
          nestedParamsMap.creativeSortDirection,
        ];
        // builds creative params and checks for params that need to be nested for creative params
        buildParams(serviceKey, nestedCreativeParams, creativeParams, value);
      } else if (dateParamsMap.hasOwnProperty(serviceKey)) {
        const nestedDateParams = [
          nestedParamsMap.dateBegin,
          nestedParamsMap.dateEnd,
        ];

        const translatedValue = translateDateParamValues(serviceKey, value);

        // builds date params and checks for params that need to be nested for date params
        buildParams(
          serviceKey,
          nestedDateParams,
          dateRangeParams,
          translatedValue,
        );
      }
    }
  });

  // if the param objects do not have values in them, do not return them in the response
  const isNotEmpty = (obj: any) => Object.keys(obj).length > 0;
  return {
    ...(isNotEmpty(campaignParams) && { campaignParams }),
    ...(isNotEmpty(flightParams) && { flightParams }),
    ...(isNotEmpty(creativeParams) && { creativeParams }),
    ...(isNotEmpty(dateRangeParams) && { dateRangeParams }),
  };
};

// This function builds a SavedQuery object to pass to the dunder service
export const constructSavedQuery = (
  iamDomain: string,
  name: string,
  isPublic: string,
  path: string,
  queryString: string,
  selectedCampaigns: string[],
  selectedFlights: string[],
) => {
  // Translate entity dimension from current url path
  let entityDimension: EntityDimensionType =
    EntityDimension.ENTITY_DIMENSION_UNSPECIFIED;
  if (path.includes(CAMPAIGNS)) {
    entityDimension = EntityDimension.CAMPAIGNS;
  } else if (path.includes(AD_SETS)) {
    entityDimension = EntityDimension.FLIGHTS;
  } else if (path.includes(ADS)) {
    entityDimension = EntityDimension.CREATIVES;
  }

  // Build param objects from the url query string
  const params = translateToSavedQueryParams(queryString);

  params.campaignParams = {
    ...params.campaignParams,
    campaignIds: selectedCampaigns,
  };

  params.flightParams = {
    ...params.flightParams,
    flightIds: selectedFlights,
  };

  return {
    name: name,
    iamDomain: iamDomain,
    isPublic: isPublic === 'true',
    entityDimension: entityDimension,
    ...params,
  };
};
