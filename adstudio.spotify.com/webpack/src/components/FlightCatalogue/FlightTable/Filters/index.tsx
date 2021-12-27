import React, { useContext, useEffect } from 'react';
import { event } from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import i18n from 'i18next';

import Can from '@spotify-internal/adstudio-shared/lib/components/CanWrapper';
import { FiltersComponentProps } from '@spotify-internal/adstudio-shared/lib/components/TSTableBrowser/types';
import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';
import { useBool } from '@spotify-internal/remote-config-resolver-react';

import { viewAllFlights, viewSelectedFlights } from 'ducks/dashboard/actions';
import { exportFlightCSV } from 'ducks/hierarchyExport/actions';
import { fetchUserHasSeenHierarchyDraftsOnboarding } from 'ducks/onboarding/actions';
import {
  getSelectedCampaignCount,
  getSelectedFlightCount,
  getSelectedFlights,
  getShouldOnlyViewSelectedFlights,
} from 'ducks/dashboard/selectors';
import { getFlightsTableState } from 'ducks/flights/selectors';
import {
  getCSVExportState,
  getFlightExportPayload,
} from 'ducks/hierarchyExport/selectors';
import { shouldShowHierarchyDraftsOnboardingOnFlightOrCreativeCatalogue } from 'ducks/onboarding/selectors';

import { AnalyticsContext } from 'components/common/AnalyticsContext';
import { AuthContextConsumer } from 'components/common/AuthorizationContext';
import { BulksheetActionBar } from 'components/common/CampaignHierarchy/BulksheetActionBar';
import { BulksheetDownloadProgress } from 'components/common/CampaignHierarchy/BulksheetDownloadProgress';
import { BulksheetUpload } from 'components/common/CampaignHierarchy/BulksheetUploadCSV';
import { ConnectedCSVExport } from 'components/common/CampaignHierarchy/CreateFlows/CSVExport';
import DateFilter from 'components/common/CampaignHierarchy/DateFilter';
import { EntityDraftToggle } from 'components/common/CampaignHierarchy/EntityDraftToggle';
import {
  FilterContainer,
  SpaceBetween,
} from 'components/common/CampaignHierarchy/Filters/FilterContainer';
import { Search } from 'components/common/CampaignHierarchy/Filters/Search';
import { StatusDropdown } from 'components/common/CampaignHierarchy/Filters/StatusDropdown';
import { HierarchyDraftCoachmark } from 'components/common/CampaignHierarchy/HierarchyDraftCoachmark';
import { ScheduledReportingButton } from 'components/common/CampaignHierarchy/ScheduledReporting';
import { EntityType } from 'components/common/CampaignHierarchy/StatusIndicator/constants';
import { TableContext, TableType } from 'components/common/Table/TableContext';

import { getRouteAccountId } from 'utils/routeHelpers';

import { FlightsColumnCustomization } from '../FlightsColumnCustomization';

import { FLIGHT_STATUS_MAP } from '../constants';
import {
  GA_STATUS_FILTER_SELECTED,
  GA_TABLE_SEARCH_FILTER_CHANGE,
} from 'utils/campaignHierarchy/constants';
import { routeFragmentLiterals, routes } from 'config/routes';

import { FlightsQueryParams } from 'types/common/state/api/flights';

const PLACEHOLDER_TEXT = i18n.t(
  'I18N_SEARCH_BY_AD_SET_NAME',
  'Search by ad set name',
);

export interface FlightFilterProps extends FiltersComponentProps {
  tableParams: Partial<FlightsQueryParams>;
  defaultQueryParams: Partial<FlightsQueryParams>;
}

export const Filters = ({
  handleFilterChange,
  tableParams,
  defaultQueryParams,
}: FlightFilterProps) => {
  const dispatch = useDispatch();
  const analyticsContext = useContext(AnalyticsContext);
  const hasScheduledReporting = useBool('adstudio_automated_reporting');
  const tableType = useContext(TableContext);
  const draftToggleRef = React.createRef<HTMLDivElement>();
  const hierarchyExportPayload = useSelector(state =>
    getFlightExportPayload(
      state,
      tableParams as FlightsQueryParams,
      analyticsContext.category,
    ),
  );
  const disableCSVExport = useSelector(state => {
    return (
      getFlightsTableState(state).empty ||
      getCSVExportState(state).isExporting ||
      getSelectedFlightCount(state) > 0 ||
      getSelectedCampaignCount(state) > 1
    );
  });
  const exportCsv = () => dispatch(exportFlightCSV(hierarchyExportPayload));
  const searchWord: keyof FlightsQueryParams = 'searchWord';
  const flightState: keyof FlightsQueryParams = 'flightState';
  const routeAccountId = getRouteAccountId();
  const flightDashboardRoute = routes.FLIGHT_CATALOGUE.replace(
    routeFragmentLiterals.ACCOUNT_ID,
    routeAccountId,
  );
  const draftDashboardRoute = routes.FLIGHT_DRAFT_CATALOGUE.replace(
    routeFragmentLiterals.ACCOUNT_ID,
    routeAccountId,
  );
  const shouldShowHierarchyDraftsOnboarding = useSelector(
    shouldShowHierarchyDraftsOnboardingOnFlightOrCreativeCatalogue,
  );
  const selectedCampaignCount = useSelector(getSelectedCampaignCount);
  // If user has multiselect and selected a campaign, disable search field, otherwise do so if campaignId query param is present. Always disable on entity pages.
  const disableSearch =
    selectedCampaignCount > 0 || tableType === TableType.ENTITY;

  useEffect(() => {
    dispatch(fetchUserHasSeenHierarchyDraftsOnboarding());
  }, [dispatch]);

  return (
    <FilterContainer>
      <SpaceBetween>
        <AuthContextConsumer>
          {permissions => (
            <Can
              permissions={permissions}
              perform={[RolePermissions.DRAFTS_GET]}
              yes={() => (
                <>
                  {tableType === TableType.CATALOGUE && (
                    <div>
                      <EntityDraftToggle
                        ref={draftToggleRef}
                        entityDashboardRoute={flightDashboardRoute}
                        draftDashboardRoute={draftDashboardRoute}
                      />
                      {shouldShowHierarchyDraftsOnboarding &&
                        tableType === TableType.CATALOGUE && (
                          <HierarchyDraftCoachmark
                            entityType={EntityType.Flight}
                            coachmarkRef={draftToggleRef}
                          />
                        )}
                    </div>
                  )}
                </>
              )}
            />
          )}
        </AuthContextConsumer>
        <Search
          // FIXME: backend may allow this to be enabled in the near future
          disabled={disableSearch}
          defaultValue={tableParams[searchWord]}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            handleFilterChange({ [searchWord]: evt.target.value });
            event({
              category: analyticsContext.category,
              action: GA_TABLE_SEARCH_FILTER_CHANGE,
              label: evt.target.value,
            });
          }}
          name={searchWord}
          placeholder={PLACEHOLDER_TEXT}
        />
        <DateFilter
          tableParams={tableParams}
          defaultQueryParams={defaultQueryParams}
          handleFilterChange={handleFilterChange}
        />
        <StatusDropdown
          defaultValue={tableParams[flightState]}
          onChange={status => {
            handleFilterChange({ [flightState]: status });
            event({
              category: analyticsContext.category,
              action: GA_STATUS_FILTER_SELECTED,
              label: status,
            });
          }}
          options={FLIGHT_STATUS_MAP}
        />
        <FlightsColumnCustomization />

        <ConnectedCSVExport disabled={disableCSVExport} exportCsv={exportCsv} />
        {hasScheduledReporting && <ScheduledReportingButton />}
        <BulksheetUpload />
      </SpaceBetween>

      <>
        <BulksheetActionBar
          entityType="AD_SET"
          selectedEntitySelector={getSelectedFlights}
          viewAllEntityAction={viewAllFlights}
          viewSelectedEntityAction={viewSelectedFlights}
          viewEntitySelector={getShouldOnlyViewSelectedFlights}
          viewSelectedEntityCTAText={i18n.t(
            'I18N_VIEW_SELECTED_AD_SETS',
            'View selected ad sets',
          )}
          viewAllEntityCTAText={i18n.t(
            'I18N_VIEW_ALL_AD_SETS',
            'View all ad sets',
          )}
        />
        <BulksheetDownloadProgress />
      </>
    </FilterContainer>
  );
};
