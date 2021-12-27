import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'query-string';

import { unprefixObject } from '@spotify-internal/adstudio-shared/lib/components/TSTableBrowser/prefixes';

import { getCreatives } from 'ducks/creatives/actions';
import { getCSVSubmissionSucceeded } from 'ducks/bulksheets/selectors';
import { getCreativesTableState } from 'ducks/creatives/selectors';
import {
  getSelectedCampaigns,
  getSelectedCreatives,
  getSelectedFlights,
  getShouldOnlyViewSelectedCreatives,
} from 'ducks/dashboard/selectors';

import { ConnectedTableBrowserRouter } from 'components/common/CampaignHierarchy/TableBrowserRouter';

import { DATE_RANGE_KEYS } from 'utils/campaignHierarchy/catalogueFilters';
import { paginationDisplayString } from 'utils/campaignHierarchy/paginationHelpers';
import { getRouteAccountId } from 'utils/routeHelpers';

import { ConnectedCreativeTable } from '../CreativeTable';
import { Filters } from '../CreativeTable/Filters';

import { CREATIVE_QUERY_PARAM_PREFIX } from '../constants';
import { routes } from 'config/routes';

import { PaginationType } from 'types/common/pagination';

export const CREATIVE_CATALOGUE_DEFAULT_QUERY_PARAMS = {
  limit: '20',
  offset: '0',
};

export const CreativeTableBrowser = () => {
  const dispatch = useDispatch();
  const tableState = useSelector(getCreativesTableState);
  const adAccountId = getRouteAccountId();
  const selectedCampaigns = useSelector(getSelectedCampaigns);
  const selectedFlights = useSelector(getSelectedFlights);
  const selectedCreatives = useSelector(getSelectedCreatives);
  const shouldOnlyViewSelectedCreatives = useSelector(
    getShouldOnlyViewSelectedCreatives,
  );
  const bulksheetSubmitted = useSelector(getCSVSubmissionSucceeded);
  const fetchCreatives = useCallback(
    params => {
      let queryParams;

      if (!shouldOnlyViewSelectedCreatives) {
        queryParams = {
          ...params,
          adAccountId,
          campaignId: undefined,
          flightId: undefined,
          campaignIds:
            selectedCampaigns.length && !selectedFlights.length
              ? selectedCampaigns
              : undefined,
          flightIds: selectedFlights.length ? selectedFlights : undefined,
        };
      } else if (shouldOnlyViewSelectedCreatives) {
        queryParams = {
          adAccountId,
          limit: params.limit,
          offset: params.offset,
          sortDirection: params.sortDirection,
          sortCriteria: params.sortCriteria,
          creativeIds: selectedCreatives,
        };
      } else {
        queryParams = {
          ...params,
          adAccountId,
          campaignIds: undefined,
          flightIds: undefined,
        };
      }

      dispatch(getCreatives(queryParams, PaginationType.REPLACE_PAGE));
    },
    [
      dispatch,
      adAccountId,
      selectedCampaigns,
      selectedFlights,
      selectedCreatives,
      shouldOnlyViewSelectedCreatives,
    ],
  );

  useEffect(() => {
    const queryParams = unprefixObject(
      qs.parse(window.location.search),
      CREATIVE_QUERY_PARAM_PREFIX,
    );
    fetchCreatives(queryParams);
    // only execute when this flag changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shouldOnlyViewSelectedCreatives,
    bulksheetSubmitted,
    selectedFlights,
    selectedCampaigns,
  ]);

  return (
    <ConnectedTableBrowserRouter
      tablePathname={routes.CREATIVE_CATALOGUE}
      defaultQueryParams={CREATIVE_CATALOGUE_DEFAULT_QUERY_PARAMS}
      tableComponent={ConnectedCreativeTable}
      filtersComponent={Filters}
      fetchTableData={fetchCreatives}
      tableState={tableState}
      queryParamsPrefix={CREATIVE_QUERY_PARAM_PREFIX}
      queryParamsToIgnore={new Set(DATE_RANGE_KEYS)}
      paginationStringGenerator={paginationDisplayString}
    />
  );
};
