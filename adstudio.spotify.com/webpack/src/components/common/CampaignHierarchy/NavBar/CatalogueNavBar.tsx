import React from 'react';
import i18n from 'i18next';

import { useBool } from '@spotify-internal/remote-config-resolver-react';

import { AnalyticsContextConsumer } from 'components/common/AnalyticsContext';

import { draftToggleIsActive } from 'utils/hierarchyDraft';

import { ConnectedSavedQueries } from '../SavedQueries/ConnectedSavedQueries';
import { NavBarProps } from './ConnectedNavBarHOC';
import { formatRoute } from './formatRoute';
import {
  CampaignLinkLabel,
  CreativeLinkLabel,
  FlightLinkLabel,
} from './LinkLabels';
import { MaybeCreateCreative } from './MaybeCreateCreative';
import { MaybeCreateFlight } from './MaybeCreateFlight';
import { CampaignNavPill, CreativeNavPill, FlightNavPill } from './NavPills';
import {
  Container,
  NavPillContainer,
  StyledLink,
  StyledNavBarList,
  StyledNavBarListItem,
} from './styles';

import { routes } from 'config/routes';

// TODO: extend NavBarListItemProps when we add encore type declaration module/
interface CustomNavBarListItemProps {
  to: string;
}

export const I18N_VIEW_ALL_YOUR_DATA_HERE = i18n.t(
  'I18N_VIEW_ALL_YOUR_DATA_HERE',
  'View all your data here, separated into campaigns, ad sets, and ads.',
);

export const LinkComponent = (props: CustomNavBarListItemProps) => {
  const { to, ...rest } = props;
  return <StyledLink to={to} {...rest} />;
};

export const CatalogueNavBar = (props: NavBarProps) => {
  const isSavedQueriesEnabled = useBool('adstudio_saved_views');
  const { tabIsActive, params, search = '' } = props;

  return (
    <AnalyticsContextConsumer>
      {({ category, logUserAction }) => (
        <Container>
          <NavPillContainer>
            <div>
              <StyledNavBarList>
                <StyledNavBarListItem
                  condensed
                  // @ts-ignore
                  label={<CampaignLinkLabel />}
                  data-test="campaigns-catalogue-nav-bar-link"
                  to={formatRoute(
                    draftToggleIsActive()
                      ? routes.CAMPAIGN_DRAFT_CATALOGUE
                      : routes.CAMPAIGN_CATALOGUE,
                    params,
                    search,
                  )}
                  component={LinkComponent}
                  active={
                    tabIsActive(routes.CAMPAIGN_CATALOGUE) ||
                    tabIsActive(routes.CAMPAIGN_DRAFT_CATALOGUE)
                  }
                  onClick={() => {
                    logUserAction({
                      category,
                      label: 'dashboard_nav_icon_click',
                      params: { tab: 'campaigns' },
                    });
                  }}
                />
                <CampaignNavPill />
                <StyledNavBarListItem
                  // @ts-ignore
                  label={<FlightLinkLabel />}
                  data-test="flights-catalogue-nav-bar-link"
                  to={formatRoute(
                    draftToggleIsActive()
                      ? routes.FLIGHT_DRAFT_CATALOGUE
                      : routes.FLIGHT_CATALOGUE,
                    params,
                    search,
                  )}
                  component={LinkComponent}
                  active={
                    tabIsActive(routes.FLIGHT_CATALOGUE) ||
                    tabIsActive(routes.FLIGHT_DRAFT_CATALOGUE)
                  }
                  onClick={() => {
                    logUserAction({
                      category,
                      label: 'dashboard_nav_icon_click',
                      params: { tab: 'ad-sets' },
                    });
                  }}
                />

                <FlightNavPill search={search} />

                <StyledNavBarListItem
                  // @ts-ignore
                  label={<CreativeLinkLabel />}
                  data-test="creatives-catalogue-nav-bar-link"
                  to={formatRoute(
                    draftToggleIsActive()
                      ? routes.CREATIVE_DRAFT_CATALOGUE
                      : routes.CREATIVE_CATALOGUE,
                    params,
                    search,
                  )}
                  component={LinkComponent}
                  active={
                    tabIsActive(routes.CREATIVE_CATALOGUE) ||
                    tabIsActive(routes.CREATIVE_DRAFT_CATALOGUE)
                  }
                  onClick={() => {
                    logUserAction({
                      category,
                      label: 'dashboard_nav_icon_click',
                      params: { tab: 'ads' },
                    });
                  }}
                />
                <CreativeNavPill />
              </StyledNavBarList>
            </div>
          </NavPillContainer>

          <div>
            {(tabIsActive(routes.FLIGHT_CATALOGUE) ||
              tabIsActive(routes.FLIGHT_DRAFT_CATALOGUE)) && (
              <MaybeCreateFlight />
            )}
            {(tabIsActive(routes.CREATIVE_CATALOGUE) ||
              tabIsActive(routes.CREATIVE_DRAFT_CATALOGUE)) && (
              <MaybeCreateCreative />
            )}
            {isSavedQueriesEnabled && (
              <ConnectedSavedQueries
                isDraftsTable={
                  tabIsActive(routes.CAMPAIGN_DRAFT_CATALOGUE) ||
                  tabIsActive(routes.FLIGHT_DRAFT_CATALOGUE) ||
                  tabIsActive(routes.CREATIVE_DRAFT_CATALOGUE)
                }
              />
            )}
          </div>
        </Container>
      )}
    </AnalyticsContextConsumer>
  );
};
