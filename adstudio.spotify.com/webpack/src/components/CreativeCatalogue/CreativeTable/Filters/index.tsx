import React, { useContext, useEffect, useState } from 'react';
import { event } from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import i18n from 'i18next';

import Can from '@spotify-internal/adstudio-shared/lib/components/CanWrapper';
import { FiltersComponentProps } from '@spotify-internal/adstudio-shared/lib/components/TSTableBrowser/types';
import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';
import { useBool } from '@spotify-internal/remote-config-resolver-react';

import { getAllCreatives } from 'ducks/creatives/actions';
import {
  viewAllCreatives,
  viewSelectedCreatives,
} from 'ducks/dashboard/actions';
import { getFlight } from 'ducks/flights/actions';
import { exportCreativeCSV } from 'ducks/hierarchyExport/actions';
import { fetchUserHasSeenHierarchyDraftsOnboarding } from 'ducks/onboarding/actions';
import {
  getCreativesState,
  getCreativesTableState,
} from 'ducks/creatives/selectors';
import {
  getSelectedCampaignCount,
  getSelectedCreativeCount,
  getSelectedCreatives,
  getSelectedFlightCount,
  getSelectedFlights,
  getShouldOnlyViewSelectedCreatives,
} from 'ducks/dashboard/selectors';
import {
  getFetchFlightSuccess,
  getFlightFormat,
  getFlightIsInTerminalState,
} from 'ducks/flights/selectors';
import {
  getCreativeExportPayload,
  getCSVExportState,
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
import { FilterBarButton } from 'components/common/CampaignHierarchy/Filters/ButtonIcon';
import {
  FilterContainer,
  SpaceBetween,
} from 'components/common/CampaignHierarchy/Filters/FilterContainer';
import { IconAdRotation } from 'components/common/CampaignHierarchy/Filters/Icons';
import { Search } from 'components/common/CampaignHierarchy/Filters/Search';
import { StatusDropdown } from 'components/common/CampaignHierarchy/Filters/StatusDropdown';
import { HierarchyDraftCoachmark } from 'components/common/CampaignHierarchy/HierarchyDraftCoachmark';
import { ScheduledReportingButton } from 'components/common/CampaignHierarchy/ScheduledReporting';
import { EntityType } from 'components/common/CampaignHierarchy/StatusIndicator/constants';
import { TableContext, TableType } from 'components/common/Table/TableContext';
import { GA_EVENTS } from 'components/CreativeRotation/constants';
import CreativeRotationModal from 'components/CreativeRotation/CreativeRotationModal';

import { isMusicFormatType } from 'utils/creativeHelpers';
import { getRouteAccountId } from 'utils/routeHelpers';

import { CreativeColumnCustomization } from '../CreativeColumnCustomization';

import { CREATIVE_STATUS_MAP } from '../constants';
import {
  GA_STATUS_FILTER_SELECTED,
  GA_TABLE_SEARCH_FILTER_CHANGE,
} from 'utils/campaignHierarchy/constants';
import { routeFragmentLiterals, routes } from 'config/routes';

import { CreativesQueryParams } from 'types/common/state/api/creatives';

const PLACEHOLDER_TEXT = i18n.t('I18N_SEARCH_BY_AD_NAME', 'Search by ad name');

export interface CreativeFiltersProps extends FiltersComponentProps {
  tableParams: Partial<CreativesQueryParams>;
  defaultQueryParams: Partial<CreativesQueryParams>;
}

export const Filters = ({
  tableParams,
  handleFilterChange,
  defaultQueryParams,
}: CreativeFiltersProps) => {
  const tableType = useContext(TableContext);
  const draftToggleRef = React.createRef<HTMLDivElement>();
  const { category } = useContext(AnalyticsContext);

  // redux
  const dispatch = useDispatch();
  const hasScheduledReporting = useBool('adstudio_automated_reporting');
  const selectedFlights = useSelector(getSelectedFlights);
  let flightId: string | undefined;

  // If user has multiselect feature, derive selected flight from redux.
  // Else if the the user does not have multiselect or this is the creative
  // table tab of the flight details page, derive selected flight from react router.
  if (selectedFlights.length === 1 && tableType === TableType.CATALOGUE) {
    flightId = selectedFlights[0];
  } else if (tableType === TableType.ENTITY) {
    flightId = tableParams.flightId;
  }

  const selectedFlightIsMutable = useSelector(state => {
    return (
      !getFlightIsInTerminalState(state) &&
      !!flightId &&
      getFetchFlightSuccess(state)
    );
  });
  const creativeRotationEnabledForFlight = useSelector(state => {
    return (
      !!flightId &&
      isMusicFormatType(getFlightFormat(state)) &&
      getFetchFlightSuccess(state)
    );
  });
  const hierarchyExportPayload = useSelector(state =>
    getCreativeExportPayload(
      state,
      tableParams as CreativesQueryParams,
      category,
    ),
  );
  const disableCSVExport = useSelector(state => {
    return (
      getCreativesTableState(state).empty ||
      getCSVExportState(state).isExporting ||
      getSelectedCreativeCount(state) > 0 ||
      getSelectedFlightCount(state) > 1 ||
      getSelectedCampaignCount(state) > 1
    );
  });
  const allCreatives = useSelector(
    state => getCreativesState(state).allCreatives,
  );

  // local/derived state
  const adAccountId = getRouteAccountId();
  const [showAdRotationModal, setShowAdRotationModal] = useState(false);
  const searchWord: keyof CreativesQueryParams = 'searchWord';
  const creativeState: keyof CreativesQueryParams = 'creativeState';
  const hasAtLeastTwoCreatives =
    allCreatives && allCreatives.items && allCreatives.items.length > 1;
  const showAdRotationButton =
    selectedFlightIsMutable && hasAtLeastTwoCreatives;
  const routeAccountId = getRouteAccountId();
  const creativeDashboardRoute = routes.CREATIVE_CATALOGUE.replace(
    routeFragmentLiterals.ACCOUNT_ID,
    routeAccountId,
  );
  const draftDashboardRoute = routes.CREATIVE_DRAFT_CATALOGUE.replace(
    routeFragmentLiterals.ACCOUNT_ID,
    routeAccountId,
  );
  const shouldShowHierarchyDraftsOnboarding = useSelector(
    shouldShowHierarchyDraftsOnboardingOnFlightOrCreativeCatalogue,
  );

  useEffect(() => {
    dispatch(fetchUserHasSeenHierarchyDraftsOnboarding());

    if (flightId && adAccountId) {
      dispatch(getFlight({ adAccountId, flightId }));
      dispatch(getAllCreatives({ flightId, adAccountId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, flightId, adAccountId]);

  return (
    <AuthContextConsumer>
      {permissions => (
        <FilterContainer>
          <SpaceBetween>
            <Can
              permissions={permissions}
              perform={[RolePermissions.DRAFTS_GET]}
              yes={() => (
                <div>
                  {shouldShowHierarchyDraftsOnboarding &&
                    tableType === TableType.CATALOGUE && (
                      <HierarchyDraftCoachmark
                        entityType={EntityType.Creative}
                        coachmarkRef={draftToggleRef}
                      />
                    )}
                  {tableType === TableType.CATALOGUE && (
                    <EntityDraftToggle
                      ref={draftToggleRef}
                      entityDashboardRoute={creativeDashboardRoute}
                      draftDashboardRoute={draftDashboardRoute}
                    />
                  )}
                </div>
              )}
            />
            <Search
              // FIXME: backend may allow this to be enabled in the near future
              disabled={!!flightId}
              defaultValue={tableParams[searchWord]}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                handleFilterChange({ [searchWord]: evt.target.value });
                event({
                  category,
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
              defaultValue={tableParams[creativeState]}
              onChange={status => {
                handleFilterChange({ [creativeState]: status });
                event({
                  category,
                  action: GA_STATUS_FILTER_SELECTED,
                  label: status,
                });
              }}
              options={CREATIVE_STATUS_MAP}
            />
            <CreativeColumnCustomization />

            <ConnectedCSVExport
              disabled={disableCSVExport}
              exportCsv={() =>
                dispatch(exportCreativeCSV(hierarchyExportPayload))
              }
            />
            {hasScheduledReporting && <ScheduledReportingButton />}
            <BulksheetUpload />
            <Can
              permissions={permissions}
              perform={[RolePermissions.FLIGHT_LINK_UPDATE]}
              yes={() => (
                <>
                  {showAdRotationButton && creativeRotationEnabledForFlight && (
                    <FilterBarButton
                      data-test="adjust-delivery-button"
                      onClick={() => {
                        event({
                          category,
                          action: GA_EVENTS.CLICK_ADJUST_DELIVERY_BUTTON,
                        });
                        setShowAdRotationModal(true);
                      }}
                      tooltipText={i18n.t(
                        'I18N_EDIT_AD_ROTATION',
                        'Edit ad rotation',
                      )}
                    >
                      <IconAdRotation />
                    </FilterBarButton>
                  )}
                </>
              )}
            />
          </SpaceBetween>

          {showAdRotationModal &&
            flightId &&
            creativeRotationEnabledForFlight && (
              <CreativeRotationModal
                flightId={flightId!}
                onClose={() => setShowAdRotationModal(false)}
              />
            )}

          <BulksheetActionBar
            entityType="AD"
            selectedEntitySelector={getSelectedCreatives}
            viewAllEntityAction={viewAllCreatives}
            viewSelectedEntityAction={viewSelectedCreatives}
            viewEntitySelector={getShouldOnlyViewSelectedCreatives}
            viewSelectedEntityCTAText={i18n.t(
              'I18N_VIEW_SELECTED_ADS',
              'View selected ads',
            )}
            viewAllEntityCTAText={i18n.t('I18N_VIEW_ALL_ADS', 'View all ads')}
          />
          <BulksheetDownloadProgress />
        </FilterContainer>
      )}
    </AuthContextConsumer>
  );
};

export default Filters;
