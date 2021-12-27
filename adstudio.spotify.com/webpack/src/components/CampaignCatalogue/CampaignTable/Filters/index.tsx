import React, { useContext, useEffect } from 'react';
import { event } from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import i18n from 'i18next';

import Can from '@spotify-internal/adstudio-shared/lib/components/CanWrapper';
import { FiltersComponentProps } from '@spotify-internal/adstudio-shared/lib/components/TSTableBrowser/types';
import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';
import { useBool } from '@spotify-internal/remote-config-resolver-react';

import { BulksheetOnboardingPhase } from 'ducks/onboarding/types';
import {
  viewAllCampaigns,
  viewSelectedCampaigns,
} from 'ducks/dashboard/actions';
import { exportCampaignCSV } from 'ducks/hierarchyExport/actions';
import { fetchUserHasSeenHierarchyDraftsOnboarding } from 'ducks/onboarding/actions';
import { getCampaignsTableState } from 'ducks/campaigns/selectors';
import {
  getSelectedCampaignCount,
  getSelectedCampaigns,
  getShouldOnlyViewSelectedCampaigns,
} from 'ducks/dashboard/selectors';
import {
  getCampaignExportPayload,
  getCSVExportState,
} from 'ducks/hierarchyExport/selectors';
import {
  getBulksheetOnboardingPhase,
  shouldShowHierarchyDraftsOnboardingOnCampaignCatalogue,
} from 'ducks/onboarding/selectors';

import { BulksheetActionBarCoachmark } from 'components/BulksheetsOnboarding/BulksheetActionBarCoachmark';
import { BulksheetUploadBtnCoachmark } from 'components/BulksheetsOnboarding/BulksheetUploadBtnCoachmark';
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
import { HierarchyDraftCoachmark } from 'components/common/CampaignHierarchy/HierarchyDraftCoachmark';
import { ScheduledReportingButton } from 'components/common/CampaignHierarchy/ScheduledReporting';
import { EntityType } from 'components/common/CampaignHierarchy/StatusIndicator/constants';
import { Coachmark } from 'components/common/Coachmark/Coachmark';
import { CoachmarkPortal } from 'components/common/Coachmark/CoachmarkPortal';

import { getRouteAccountId } from 'utils/routeHelpers';

import { CampaignColumnCustomization } from '../CampaignColumnCustomization';

import { GA_TABLE_SEARCH_FILTER_CHANGE } from 'utils/campaignHierarchy/constants';
import { routeFragmentLiterals, routes } from 'config/routes';

import { CampaignsQueryParams } from 'types/common/state/api/campaigns';

const PLACEHOLDER_TEXT = i18n.t(
  'I18N_SEARCH_BY_CAMPAIGN_NAME',
  'Search by campaign name',
);

export interface CampaignFilterProps extends FiltersComponentProps {
  tableParams: Partial<CampaignsQueryParams>;
  defaultQueryParams: Partial<CampaignsQueryParams>;
}

export const Filters = (props: CampaignFilterProps) => {
  const dispatch = useDispatch();
  const analyticsContext = useContext(AnalyticsContext);
  const hasScheduledReporting = useBool('adstudio_automated_reporting');
  const draftToggleRef = React.createRef<HTMLDivElement>();
  const actionBarRef = React.createRef<HTMLDivElement>();
  const uploadBtnRef = React.createRef<HTMLButtonElement>();
  const hierarchyExportPayload = useSelector(state =>
    getCampaignExportPayload(
      state,
      props.tableParams,
      analyticsContext.category,
    ),
  );
  const disableCSVExport = useSelector(
    state =>
      getCampaignsTableState(state).empty ||
      getCSVExportState(state).isExporting ||
      getSelectedCampaignCount(state) > 0,
  );
  const exportCsv = () => dispatch(exportCampaignCSV(hierarchyExportPayload));
  const searchWord: keyof CampaignsQueryParams = 'searchWord';
  const routeAccountId = getRouteAccountId();
  const campaignDashboardRoute = routes.CAMPAIGN_CATALOGUE.replace(
    routeFragmentLiterals.ACCOUNT_ID,
    routeAccountId,
  );
  const draftDashboardRoute = routes.CAMPAIGN_DRAFT_CATALOGUE.replace(
    routeFragmentLiterals.ACCOUNT_ID,
    routeAccountId,
  );
  const shouldShowHierarchyDraftsOnboarding = useSelector(
    shouldShowHierarchyDraftsOnboardingOnCampaignCatalogue,
  );
  const bulksheetOnboardingPhase = useSelector(getBulksheetOnboardingPhase);

  useEffect(() => {
    dispatch(fetchUserHasSeenHierarchyDraftsOnboarding());
  }, [dispatch]);

  return (
    <>
      <FilterContainer>
        <SpaceBetween>
          <div>
            <AuthContextConsumer>
              {permissions => (
                <Can
                  permissions={permissions}
                  perform={[RolePermissions.DRAFTS_GET]}
                  yes={() => (
                    <>
                      <EntityDraftToggle
                        ref={draftToggleRef}
                        entityDashboardRoute={campaignDashboardRoute}
                        draftDashboardRoute={draftDashboardRoute}
                      />
                      {shouldShowHierarchyDraftsOnboarding && (
                        <HierarchyDraftCoachmark
                          entityType={EntityType.Campaign}
                          coachmarkRef={draftToggleRef}
                        />
                      )}
                    </>
                  )}
                />
              )}
            </AuthContextConsumer>
          </div>
          <Search
            defaultValue={props.tableParams[searchWord]}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              props.handleFilterChange({ [searchWord]: evt.target.value });
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
            tableParams={props.tableParams}
            defaultQueryParams={props.defaultQueryParams}
            handleFilterChange={props.handleFilterChange}
          />
          <CampaignColumnCustomization />
          <>
            <ConnectedCSVExport
              disabled={disableCSVExport}
              exportCsv={exportCsv}
            />
            {hasScheduledReporting && <ScheduledReportingButton />}
            <BulksheetUpload ref={uploadBtnRef} />
            {bulksheetOnboardingPhase ===
              BulksheetOnboardingPhase.UPLOAD_BTN && (
              <CoachmarkPortal>
                <Coachmark target={uploadBtnRef}>
                  <BulksheetUploadBtnCoachmark />
                </Coachmark>
              </CoachmarkPortal>
            )}
          </>
        </SpaceBetween>

        <>
          {bulksheetOnboardingPhase === BulksheetOnboardingPhase.ACTION_BAR && (
            <CoachmarkPortal>
              <Coachmark borderRadius="16px" target={actionBarRef}>
                <BulksheetActionBarCoachmark />
              </Coachmark>
            </CoachmarkPortal>
          )}
          <BulksheetActionBar
            ref={actionBarRef}
            entityType="CAMPAIGN"
            selectedEntitySelector={getSelectedCampaigns}
            viewAllEntityAction={viewAllCampaigns}
            viewSelectedEntityAction={viewSelectedCampaigns}
            viewEntitySelector={getShouldOnlyViewSelectedCampaigns}
            viewSelectedEntityCTAText={i18n.t(
              'I18N_VIEW_SELECTED_CAMPAIGNS',
              'View selected campaigns',
            )}
            viewAllEntityCTAText={i18n.t(
              'I18N_VIEW_ALL_CAMPAIGNS',
              'View all campaigns',
            )}
          />
          <BulksheetDownloadProgress />
        </>
      </FilterContainer>
    </>
  );
};
