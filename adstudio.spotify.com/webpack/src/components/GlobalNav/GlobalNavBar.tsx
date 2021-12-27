import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router';
import { Waypoint } from 'react-waypoint';
import i18n from 'i18next';
import styled from 'styled-components';

import { ButtonTertiary } from '@spotify-internal/adstudio-shared/lib/components/CustomEncore';
import CreateAdIcon from '@spotify-internal/adstudio-shared/lib/components/CustomEncore/CreateAdIcon';
import {
  black,
  spacer8,
  spacer64,
  white,
} from '@spotify-internal/encore-foundation';
import {
  NavBar,
  NavBarList,
  NavBarListItem,
} from '@spotify-internal/encore-web';
import { useBool } from '@spotify-internal/remote-config-resolver-react';

import CanAccessBuilder from 'components/common/CanAccessBuilder';

import { GLOBAL_NAV_GA_CATEGORY } from './GlobalNav';

// @ts-ignore
const StyledNavBarList = styled(NavBarList)`
  margin-bottom: 0;
`;

const StyledNavBarListItem = styled(NavBarListItem)`
  &:after {
    width: 45px;
  }
  &:hover {
    color: ${props => props.theme.colors.primaryColor};
    &:after {
      background-color: ${props => props.theme.colors.primaryColor};
    }
  }
  &[aria-selected='true'] {
    &:after {
      background-color: ${props => props.theme.colors.primaryColor};
    }
  }
`;

const StyledNavBar = styled(NavBar)`
  align-items: center;
  display: grid;
  grid-template-rows: 1fr 0; // remove the NavBarPanel
`;

const Spacer = styled.div<{ offsetHeight: number }>`
  height: ${props => props.offsetHeight}px;
`;

const NavBarAlignmentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NavBarContainer = styled.div<{ sticky: boolean; topOffset: number }>`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr max-content;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  width: calc(100% - ${spacer64} - ${spacer64});
  margin: 0 auto;
  height: 84px;
  padding: 0 32px;
  background-color: ${white};

  // float above lower contents
  position: relative;
  z-index: 1;
  transition: padding 200ms ease-in-out, width 200ms ease-in-out,
    border-radius 200ms ease-in-out, margin 200ms ease-in-out;

  transform: translateX(0);

  ${props =>
    props.sticky &&
    `
    position: fixed;
    width: 100%;

    padding: 0 96px;
    border-radius: 0;
    top: ${props.topOffset | 0}px;
  `}
`;

const StyledButtonTertiary = styled(ButtonTertiary)`
  color: ${black}; // theme this
  padding: 0;
  transition: 0.2s color linear;

  text-transform: none;
  letter-spacing: 0.0178571em;

  display: flex;
  align-items: center;

  svg {
    transition: 0.2s all linear;
    margin-right: ${spacer8};
    path:first-child {
      fill: white; // specify this so it will animate
    }
    * {
      transition: 0.2s all linear;
    }
  }

  // a funny selector so we can override encore's specificity
  &:hover:not(:focus):not(:disabled) {
    color: ${props => props.theme.colors.primaryColor};
    path:first-child,
    > path {
      stroke: ${props => props.theme.colors.primaryColor};
      fill: ${props => props.theme.colors.primaryColor};
    }
    circle {
      fill: ${props => props.theme.colors.primaryColor};
      stroke: ${white};
    }
    rect {
      fill: ${white};
    }
  }

  // accessibility outline
  &:after {
    width: 100%;
    bottom: -5px;
  }
`;

export interface GlobalNavBarProps {
  adAccountId: string;
  logUserAction: (userAction: GoogleAnalyticsEvent) => void;
  adjustedRoutes: TSFixMe;
  currentRoute: string;
  buildAdDisabled: boolean;
  isGreylisted: boolean;
  isAuthorized: boolean;
  offsetHeight: number;
}

export const GlobalNavBar: FunctionComponent<GlobalNavBarProps> = ({
  adAccountId,
  logUserAction,
  adjustedRoutes,
  currentRoute,
  buildAdDisabled,
  isGreylisted,
  isAuthorized,
  offsetHeight,
}: GlobalNavBarProps) => {
  const createCampaignButton = (
    <StyledButtonTertiary
      title={i18n.t(
        'I18N_SPOTIFY_AD_STUDIO_BUILD_A',
        'Spotify Ad Studio build ad page',
      )}
      component={Link}
      buttonSize={ButtonTertiary.lg}
      id="create-campaign-link"
      onClick={() => {
        logUserAction({
          category: GLOBAL_NAV_GA_CATEGORY,
          label: 'Create_campaign_click',
          params: {
            ad_account_id: adAccountId,
          },
        });
        logUserAction({
          label: 'signupStep',
          category: 'CreateAds',
          params: {
            element: 'create-campaign-link',
          },
        });
      }}
      // @ts-ignore
      to={adjustedRoutes.BUILD_CAMPAIGN}
      disabled={buildAdDisabled || isGreylisted || !isAuthorized}
      data-test="create-campaign-button"
      buttonLegacy
    >
      <CreateAdIcon />
      {i18n.t('I18N_CREATE_CAMPAIGN', 'Create Campaign')}
    </StyledButtonTertiary>
  );

  const [hasStickyNav, setStickyNav] = useState<boolean>(false);

  const showAudiencesButton = useBool('adstudio_custom_audiences');
  const showAssetLibraryButton = useBool('adstudio_asset_library');

  return (
    <>
      <Waypoint
        onLeave={() => setStickyNav(true)}
        onEnter={() => setStickyNav(false)}
        topOffset={offsetHeight}
      />
      <NavBarAlignmentContainer>
        <NavBarContainer
          data-test="nav-bar-container"
          sticky={hasStickyNav}
          topOffset={offsetHeight}
        >
          <StyledNavBar
            list={
              <StyledNavBarList>
                <StyledNavBarListItem
                  sentenceCase
                  component={Link}
                  title={i18n.t('I18N_OVERVIEW', 'Overview')}
                  // @ts-ignore
                  to={adjustedRoutes.CAMPAIGN_CATALOGUE}
                  active={
                    adjustedRoutes.CAMPAIGN_CATALOGUE === currentRoute ||
                    currentRoute.includes('/dashboard/') ||
                    currentRoute.includes('/ad-set/')
                  }
                  label={i18n.t('I18N_OVERVIEW', 'Overview')}
                  disabled={!isAuthorized}
                  data-test="nav-bar-overview-button"
                />
                {showAudiencesButton && (
                  <StyledNavBarListItem
                    sentenceCase
                    component={Link}
                    title={i18n.t('I18N_AUDIENCES', 'Audiences')}
                    // @ts-ignore
                    to={adjustedRoutes.AUDIENCES_ADACCOUNT}
                    active={adjustedRoutes.AUDIENCES_ADACCOUNT === currentRoute}
                    label={i18n.t('I18N_AUDIENCES', 'Audiences')}
                    disabled={!isAuthorized}
                    data-test="nav-bar-audiences-button"
                    onClick={() => {
                      logUserAction({
                        category: GLOBAL_NAV_GA_CATEGORY,
                        label: 'Audiences_click',
                        params: {
                          ad_account_id: adAccountId,
                        },
                      });
                    }}
                  />
                )}
                {showAssetLibraryButton && (
                  <StyledNavBarListItem
                    sentenceCase
                    component={Link}
                    title={i18n.t('I18N_MEDIA_LIBRARY', 'Media Library')}
                    // @ts-ignore
                    to={adjustedRoutes.ASSET_LIBRARY}
                    active={adjustedRoutes.ASSET_LIBRARY === currentRoute}
                    label={i18n.t('I18N_MEDIA_LIBRARY', 'Media Library')}
                    disabled={!isAuthorized}
                    data-test="nav-bar-asset-library-button"
                    onClick={() => {
                      logUserAction({
                        category: GLOBAL_NAV_GA_CATEGORY,
                        label: 'Asset_Library_click',
                        params: {
                          ad_account_id: adAccountId,
                        },
                      });
                    }}
                  />
                )}
              </StyledNavBarList>
            }
          />

          <CanAccessBuilder yes={() => createCampaignButton} />
        </NavBarContainer>
      </NavBarAlignmentContainer>
      {hasStickyNav && <Spacer offsetHeight={84} />}
    </>
  );
};

export default GlobalNavBar;
