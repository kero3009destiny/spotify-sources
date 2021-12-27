import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserHasSeenBulksheetsOnboarding } from 'ducks/onboarding/actions';
import { getAccount } from 'ducks/account/selectors';
import { shouldShowOnboarding } from 'ducks/onboarding/selectors';
import { getCurrentRouteLocation } from 'ducks/routes/selectors';

import AnnouncementModal from 'components/AnnouncementModal';
import { AnalyticsContextProvider } from 'components/common/AnalyticsContext';
import { ConnectedCatalogueNavBar } from 'components/common/CampaignHierarchy/NavBar';
import { CataloguePageContainer } from 'components/common/CampaignHierarchy/PageContainer';
import {
  TableContextProvider,
  TableType,
} from 'components/common/Table/TableContext';
import OnboardingModal from 'components/OnboardingModal';

import ConditionalRedirect from '../Redirects/ConditionalRedirect';
import { CampaignTableBrowser } from './CampaignTableBrowser';

import { ANALYTICS_CATEGORY } from './constants';
import { routeFragmentRegEx, routes } from 'config/routes';

export const CampaignCatalogue = () => {
  const dispatch = useDispatch();
  const account = useSelector(getAccount);
  const currentLocation = useSelector(getCurrentRouteLocation);
  const showOnboarding = useSelector(shouldShowOnboarding);

  useEffect(() => {
    dispatch(fetchUserHasSeenBulksheetsOnboarding());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ConditionalRedirect
      loading={!account.id}
      redirectUrl={routes.CAMPAIGN_CATALOGUE.replace(
        routeFragmentRegEx.ACCOUNT_ID,
        account.id!,
      )}
      shouldRedirect={currentLocation === routes.DASHBOARD}
    >
      <TableContextProvider value={TableType.CATALOGUE}>
        <AnalyticsContextProvider value={{ category: ANALYTICS_CATEGORY }}>
          <CataloguePageContainer
            dataTestName="campaign-catalogue"
            route={routes.CAMPAIGN_CATALOGUE}
          >
            <ConnectedCatalogueNavBar />
            <CampaignTableBrowser />
            {showOnboarding && <OnboardingModal />}
            <AnnouncementModal />
          </CataloguePageContainer>
        </AnalyticsContextProvider>
      </TableContextProvider>
    </ConditionalRedirect>
  );
};

export default CampaignCatalogue;
