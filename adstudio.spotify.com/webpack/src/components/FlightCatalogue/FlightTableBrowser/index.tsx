import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'query-string';

import { unprefixObject } from '@spotify-internal/adstudio-shared/lib/components/TSTableBrowser/prefixes';

import { getFlights } from 'ducks/flights/actions';
import { getCSVSubmissionSucceeded } from 'ducks/bulksheets/selectors';
import {
  getSelectedCampaigns,
  getSelectedFlights,
  getShouldOnlyViewSelectedFlights,
} from 'ducks/dashboard/selectors';
import { getFlightsTableState } from 'ducks/flights/selectors';

import { ConnectedTableBrowserRouter } from 'components/common/CampaignHierarchy/TableBrowserRouter';

import { DATE_RANGE_KEYS } from 'utils/campaignHierarchy/catalogueFilters';
import { paginationDisplayString } from 'utils/campaignHierarchy/paginationHelpers';
import { getRouteAccountId } from 'utils/routeHelpers';

import { ConnectedFlightTable } from '../FlightTable';
import { Filters } from '../FlightTable/Filters/';

import { FLIGHT_QUERY_PARAM_PREFIX } from '../constants';
import { routes } from 'config/routes';

import { PaginationType } from 'types/common/pagination';
import { FlightsQueryParams } from 'types/common/state/api/flights';

export const FLIGHT_CATALOGUE_DEFAULT_QUERY_PARAMS: Partial<FlightsQueryParams> = {
  limit: '20',
  offset: '0',
};

export const FlightTableBrowser = () => {
  const dispatch = useDispatch();
  const selectedCampaigns = useSelector(getSelectedCampaigns);
  const adAccountId = getRouteAccountId();
  const tableState = useSelector(getFlightsTableState);
  const selectedFlightIds = useSelector(getSelectedFlights);
  const shouldOnlyViewSelectedFlights = useSelector(
    getShouldOnlyViewSelectedFlights,
  );
  const bulksheetSubmitted = useSelector(getCSVSubmissionSucceeded);
  const fetchFlights = useCallback(
    params => {
      let queryParams;

      if (!shouldOnlyViewSelectedFlights) {
        queryParams = {
          ...params,
          adAccountId,
          campaignId: undefined,
          campaignIds: selectedCampaigns.length ? selectedCampaigns : undefined,
        };
      } else if (shouldOnlyViewSelectedFlights) {
        queryParams = {
          adAccountId,
          limit: params.limit,
          offset: params.offset,
          sortDirection: params.sortDirection,
          sortCriteria: params.sortCriteria,
          flightIds: selectedFlightIds,
        };
      } else {
        queryParams = {
          ...params,
          adAccountId,
          campaignIds: undefined,
        };
      }

      dispatch(getFlights(queryParams, PaginationType.REPLACE_PAGE));
    },
    [
      dispatch,
      adAccountId,
      selectedCampaigns,
      shouldOnlyViewSelectedFlights,
      selectedFlightIds,
    ],
  );

  useEffect(() => {
    const queryParams = unprefixObject(
      qs.parse(window.location.search),
      FLIGHT_QUERY_PARAM_PREFIX,
    );
    fetchFlights(queryParams);
    // only execute when this flag changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldOnlyViewSelectedFlights, bulksheetSubmitted, selectedCampaigns]);

  return (
    <ConnectedTableBrowserRouter
      tablePathname={routes.FLIGHT_CATALOGUE}
      defaultQueryParams={FLIGHT_CATALOGUE_DEFAULT_QUERY_PARAMS}
      tableComponent={ConnectedFlightTable}
      filtersComponent={Filters}
      fetchTableData={fetchFlights}
      tableState={tableState}
      queryParamsPrefix={FLIGHT_QUERY_PARAM_PREFIX}
      queryParamsToIgnore={new Set(DATE_RANGE_KEYS)}
      paginationStringGenerator={paginationDisplayString}
    />
  );
};
