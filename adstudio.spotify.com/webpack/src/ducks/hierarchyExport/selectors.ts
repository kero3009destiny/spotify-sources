import { isEqual } from 'lodash';

import { SortDirection } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/SortDirection';

import { getSelectedColumns } from 'ducks/columns/selectors';
import {
  getSelectedCampaigns,
  getSelectedCreatives,
  getSelectedFlights,
} from 'ducks/dashboard/selectors';
import { getSelectedLocale } from 'ducks/i18n/selectors';

import { getRouteAccountId } from 'utils/routeHelpers';

import { hasDateParams } from '../../components/common/CampaignHierarchy/DateFilter/DateFilterHelpers';
import { mapColumnSelectionToExportableColumns } from './mappers';
import { HiearchyExportState, initialState } from './reducer';

import {
  SELECTED_CAMPAIGN_COLUMNS,
  SELECTED_CREATIVE_COLUMNS,
  SELECTED_FLIGHT_COLUMNS,
} from 'ducks/columns/constants';

import { DateFilterParams } from '../../types/common/state/api';
import {
  CampaignExportPayload,
  CreativeExportPayload,
  FlightExportPayload,
} from './types';
import {
  CampaignsQueryParams,
  CampaignState,
  ExportColumns as CampaignExportColumns,
} from 'types/common/state/api/campaigns';
import {
  CreativesQueryParams,
  CreativeState,
  ExportColumns as CreativeExportColumns,
} from 'types/common/state/api/creatives';
import {
  ExportColumns as FlightExportColumns,
  FlightsQueryParams,
  FlightState,
} from 'types/common/state/api/flights';
import { HierarchyColumns } from 'types/common/state/api/hierarchycolumns';

const getDateFilterParams = (params: DateFilterParams) =>
  hasDateParams(params)
    ? {
        dateFilterParams: {
          dateBegin: params.dateBegin,
          dateEnd: params.dateEnd,
          dateRangePreset: params.dateRangePreset,
        },
      }
    : {};

export const getCampaignExportPayload = (
  state: TSFixMe,
  queryParams: CampaignsQueryParams,
  analyticsCategory: string,
): CampaignExportPayload => {
  return {
    adAccountId: getRouteAccountId(),
    columns: mapColumnSelectionToExportableColumns(
      getSelectedColumns(state, SELECTED_CAMPAIGN_COLUMNS),
      CampaignExportColumns,
    ),
    sortCriteria: queryParams.sortCriteria || HierarchyColumns.CAMPAIGN_NAME,
    sortDirection: queryParams.sortDirection || SortDirection.DESC,
    campaignState: CampaignState.UNKNOWN,
    searchWord: queryParams.searchWord,
    ...getDateFilterParams(queryParams),
    locale: getSelectedLocale(state),
    analyticsCategory,
  };
};

export const getFlightExportPayload = (
  state: TSFixMe,
  queryParams: FlightsQueryParams,
  analyticsCategory: string,
): FlightExportPayload => {
  let campaignId;
  let creativeId;
  const selectedCampaigns = getSelectedCampaigns(state);
  const selectedCreatives = getSelectedCreatives(state);

  if (selectedCampaigns.length === 1) {
    campaignId = selectedCampaigns[0];
  }

  if (selectedCreatives.length === 1) {
    creativeId = selectedCreatives[0];
  }

  return {
    adAccountId: getRouteAccountId(),
    columns: mapColumnSelectionToExportableColumns(
      getSelectedColumns(state, SELECTED_FLIGHT_COLUMNS),
      FlightExportColumns,
    ),
    sortCriteria: queryParams.sortCriteria || HierarchyColumns.FLIGHT_NAME,
    sortDirection: queryParams.sortDirection || SortDirection.DESC,
    flightState: queryParams.flightState || FlightState.UNKNOWN,
    searchWord: queryParams.searchWord,
    campaignId,
    creativeId,
    ...getDateFilterParams(queryParams),
    locale: getSelectedLocale(state),
    analyticsCategory,
  };
};

export const getCreativeExportPayload = (
  state: TSFixMe,
  queryParams: CreativesQueryParams,
  analyticsCategory: string,
): CreativeExportPayload => {
  let flightId;
  const selectedFlights = getSelectedFlights(state);

  if (selectedFlights.length === 1) {
    flightId = selectedFlights[0];
  }

  return {
    adAccountId: getRouteAccountId(),
    columns: mapColumnSelectionToExportableColumns(
      getSelectedColumns(state, SELECTED_CREATIVE_COLUMNS),
      CreativeExportColumns,
    ),
    sortCriteria: queryParams.sortCriteria || HierarchyColumns.CREATIVE_NAME,
    sortDirection: queryParams.sortDirection || SortDirection.DESC,
    creativeState: queryParams.creativeState || CreativeState.UNKNOWN,
    searchWord: queryParams.searchWord,
    flightId,
    ...getDateFilterParams(queryParams),
    locale: getSelectedLocale(state),
    analyticsCategory,
  };
};

export const getCSVExportState = (state: TSFixMe): HiearchyExportState => {
  return state.hierarchyExport;
};

export const getCSVDownloadCancelledState = (state: TSFixMe): boolean => {
  return getCSVExportState(state).downloadCancelled;
};

export const getCSVExportStateMatchesInitialState = (
  state: TSFixMe,
): boolean => {
  return isEqual(getCSVExportState(state), initialState);
};
