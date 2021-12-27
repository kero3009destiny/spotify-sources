import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'query-string';

import { unprefixObject } from '@spotify-internal/adstudio-shared/lib/components/TSTableBrowser/prefixes';

import { getCampaigns } from 'ducks/campaigns/actions';
import { getCSVSubmissionSucceeded } from 'ducks/bulksheets/selectors';
import { getCampaignsTableState } from 'ducks/campaigns/selectors';
import {
  getSelectedCampaigns,
  getShouldOnlyViewSelectedCampaigns,
} from 'ducks/dashboard/selectors';

import { ConnectedTableBrowserRouter } from 'components/common/CampaignHierarchy/TableBrowserRouter';

import { DATE_RANGE_KEYS } from 'utils/campaignHierarchy/catalogueFilters';
import { paginationDisplayString } from 'utils/campaignHierarchy/paginationHelpers';
import { getRouteAccountId } from 'utils/routeHelpers';

import { ConnectedCampaignTable } from '../CampaignTable';
import { Filters } from '../CampaignTable/Filters';

import { CAMPAIGN_QUERY_PARAM_PREFIX } from '../constants';
import { routes } from 'config/routes';

import { CampaignsQueryParams } from 'types/common/state/api/campaigns';

export const CAMPAIGN_CATALOGUE_DEFAULT_QUERY_PARAMS: Partial<CampaignsQueryParams> = {
  limit: '20',
  offset: '0',
};

export const CampaignTableBrowser = () => {
  const dispatch = useDispatch();
  const adAccountId = getRouteAccountId();
  const tableState = useSelector(getCampaignsTableState);
  const selectedCampaignIds = useSelector(getSelectedCampaigns);
  const shouldOnlyViewSelectedCampaigns = useSelector(
    getShouldOnlyViewSelectedCampaigns,
  );
  const bulksheetSubmitted = useSelector(getCSVSubmissionSucceeded);
  const fetchCampaigns = useCallback(
    (params: CampaignsQueryParams) => {
      if (shouldOnlyViewSelectedCampaigns) {
        dispatch(
          getCampaigns({
            adAccountId,
            limit: params.limit,
            offset: params.offset,
            sortDirection: params.sortDirection,
            sortCriteria: params.sortCriteria,
            campaignIds: selectedCampaignIds,
          }),
        );
      } else {
        dispatch(
          getCampaigns({
            ...params,
            adAccountId,
          }),
        );
      }
    },
    [
      shouldOnlyViewSelectedCampaigns,
      dispatch,
      adAccountId,
      selectedCampaignIds,
    ],
  );

  useEffect(() => {
    const queryParams = unprefixObject(
      qs.parse(window.location.search),
      CAMPAIGN_QUERY_PARAM_PREFIX,
    );
    fetchCampaigns(queryParams);
    // only execute when this flag changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldOnlyViewSelectedCampaigns, bulksheetSubmitted]);

  return (
    <ConnectedTableBrowserRouter
      tablePathname={routes.CAMPAIGN_CATALOGUE}
      defaultQueryParams={CAMPAIGN_CATALOGUE_DEFAULT_QUERY_PARAMS}
      tableComponent={ConnectedCampaignTable}
      filtersComponent={Filters}
      fetchTableData={fetchCampaigns}
      tableState={tableState}
      queryParamsPrefix={CAMPAIGN_QUERY_PARAM_PREFIX}
      queryParamsToIgnore={new Set(DATE_RANGE_KEYS)}
      paginationStringGenerator={paginationDisplayString}
    />
  );
};

export default CampaignTableBrowser;
