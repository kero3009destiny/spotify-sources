import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router';
import i18n from 'i18next';
import styled, { css, ThemeProvider } from 'styled-components';

import {
  gray10,
  gray50,
  gray70,
  gray80,
  gray85,
  gray95,
  spacer4,
  spacer8,
  spacer16,
  spacer24,
  spacer32,
  spacer48,
  white,
} from '@spotify-internal/encore-foundation';
import {
  ButtonTertiary,
  IconArrowRight,
  IconGears,
  OverlayTrigger,
  Popover,
  PopoverTrigger,
  Type,
} from '@spotify-internal/encore-web';
import { useBool } from '@spotify-internal/remote-config-resolver-react';

import { Account } from 'ducks/account/types';
import { AdAccountMetadata } from 'ducks/accounts/types';

import AccountBadge from 'components/common/AccountBadge';
import { ConnectedAuthProvider } from 'components/common/AuthorizationContext';
import SpotifyAdvertisingLogo from 'components/common/SpotifyAdvertisingLogo';
import { ImpersonationFrame } from 'components/ImpersonationFrame';
import LegalFooter from 'components/MarketingPageFooter/LegalFooter';

import { Coachmark } from '../common/Coachmark/Coachmark';
import { CoachmarkPortal } from '../common/Coachmark/CoachmarkPortal';
import { NotificationLight } from '../common/NotificationLight';
import LocalizeMoment from '../LocalizeMoment';
import AccountPopover from './AccountPopover';
import { GlobalNavBar } from './GlobalNavBar';
import GlobalNotificationBanner from './GlobalNotificationBanner';
import ManageAccountsIcon from './ManageAccountsIcon';
import { darkTheme, lightTheme } from './themes';
import TopBannersContainer from './TopBannersContainer';
import UserCircleIcon from './UserCircleIcon';

import {
  EXTERNAL_FAQ_ADDRESS,
  routeFragmentRegEx,
  routes,
} from 'config/routes';

import { UserMetadata } from 'types/common/state/api/user';

export const GLOBAL_NAV_GA_CATEGORY = 'Global_nav_bar';

export interface StateProps {
  showAccountHierarchyOnboarding: boolean;
  accountMetadata: AdAccountMetadata;
  userMetadata: UserMetadata;
  account: Account;
  locale: string;
  accounts: AdAccountMetadata[] | [];
  frequentAccounts: AdAccountMetadata[] | [];
  currentRoute: string;
  gaPartnerId: string;
  isAuthorized: boolean;
  buildAdDisabled: boolean;
  isGreylisted: boolean;
  roles: Array<string>;
  isImpersonating: boolean;
}

export interface DispatchProps {
  requestAccountHierarchyOnboarding: () => {};
  setAccountHierarchyOnboardingState: (active: boolean) => {};
  logUserAction: (userAction: GoogleAnalyticsEvent) => void;
}

export interface OwnProps {
  children: ReactNode;
}

export const I18N_ACC_HIERARCHY_ONBOARDING = i18n.t(
  'I18N_ACC_HIERARCHY_ONBOARDING',
  'You can now view your full list of ad accounts and switch between them here. You can also update membership by clicking on “Manage ad accounts.”',
);

export type GlobalNavProps = StateProps & DispatchProps & OwnProps;

const gridBaseStyles = css`
  display: grid;
  align-items: center;
`;

const baseColorAndHover = css`
  color: ${props => props.theme.nav.textColorActive};
  &:hover {
    color: ${props => props.theme.nav.textColorHover};
    text-decoration: underline;
  }
`;

// @ts-ignore
const GlobalNavContainer = styled.div`
  ${gridBaseStyles};
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0 ${parseInt(spacer48, 10) + parseInt(spacer48, 10)}px;
  height: 80px;

  // make links render nicely for the whole thing
  a {
    text-decoration: none !important;
  }
`;

const LeftMenu = styled.div`
  ${gridBaseStyles};
  grid-template-columns: max-content max-content max-content;

  span[class^='Overlay'] {
    transform: none;
    left: -32px;
    top: 56px;
  }
`;

const RightMenu = styled.div`
  ${gridBaseStyles};
  grid-gap: ${spacer32};
  justify-content: end;

  span[class^='Overlay'] {
    transform: none;
    right: -32px;
    top: 56px;
  }
`;

const UserBadge = styled.div`
  display: inline-block;
  border-radius: 100%;
  width: ${spacer32};
  height: ${spacer32};
  overflow: hidden;
`;

const StyledNotificationLight = styled(NotificationLight)`
  :after {
    right: 16px;
  }
`;

const hoverable = (elem: React.ElementType) => styled(elem)<{
  hoverAncestor: React.ReactNode;
}>`
  box-shadow: 0 0 0 0 ${white};
  transition: box-shadow 200ms linear;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 0 3px ${white},
      0 0 0 5px ${props => props.theme.colors.primaryColor};
  }
  ${props => {
    if (props.hoverAncestor) {
      return `
        ${props.hoverAncestor}:hover & {
          box-shadow: 0 0 0 3px ${white},
            0 0 0 5px ${props.theme.colors.primaryColor};
        }
      `;
    }
    return '';
  }}
`;

const HoverableUserBadge = hoverable(UserBadge);
const HoverableAccountBadge = hoverable(AccountBadge);

const UserImage = styled.img`
  height: ${spacer32};
  width: ${spacer32};
`;

const ThemedType = styled(Type.p)`
  color: ${props => props.theme.nav.textColorActive};
`;

// @ts-ignore
const ThemedLocaleType = styled(ThemedType)`
  text-transform: uppercase;
  color: ${gray70};
`;

const StyledManageAccountsIcon = styled(hoverable(ManageAccountsIcon))`
  margin-right: ${spacer8};
  border-radius: 100%; // allow hover interaction to be circular
`;

const AccountRole = styled.div`
  font-size: 10px;
  color: ${gray50};
`;

const AccountInfo = styled.div`
  display: grid;
  grid-template-columns: 48px auto;
  grid-template-rows: auto auto;
  align-items: center;
  cursor: pointer;

  grid-row: 1 / span 2;
  grid-column: 1 / 1;
`;

const popoverWithoutCloseStyles = css<{ arrow: string }>`
  & button[aria-label='Close'] {
    display: none;
  }
  border-radius: 16px;
  background-color: ${gray10};
  color: ${gray95};
  &:before,
  &:after {
    border-bottom-color: ${gray10};
    ${props => props.arrow === Popover.topLeft && 'left: 40px;'}
    ${props => props.arrow === Popover.topRight && 'left: calc(100% - 55px);'}
  }
  padding: 0;
  width: 336px;
`;

const AccountPopoverWithoutClose = styled(Popover)`
  position: relative;
  top: 64px;
  left: -26px;
  ${popoverWithoutCloseStyles}
`;

const UserPopoverWithoutClose = styled(Popover)`
  ${popoverWithoutCloseStyles}
`;

const StyledOverlayTrigger = styled(OverlayTrigger)`
  span:nth-child(2) {
    left: 0;
  }
`;

const UserPopover = styled.div``;

const UsernameAndLocale = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  padding: ${spacer24};
  padding-bottom: ${spacer16};
  p:first-child {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: ${spacer4};
  }
`;

const LogoContainer = styled.div`
  ${baseColorAndHover};
  justify-self: center;
  svg {
    width: 155px;
  }
`;

const IconBadge = styled(({ children, className }) => (
  <span className={className}>{children}</span>
))`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: ${gray85};
  width: 40px;
  height: 40px;
  margin-right: ${spacer16};

  svg {
    pointer-events: none;
  }
`;

const ButtonRow = styled(Link)`
  display: flex;
  align-items: center;
  ${ThemedType} {
    display: inline;
  }
  height: 72px;
  border-radius: ${spacer8};
  margin: 2px ${spacer24};
  padding: 0 ${spacer16};
  &:hover {
    background-color: #535353;
    p {
      color: ${gray80};
    }
  }

  /* will change the stroke color of the icons inside, due to the currentColor property */
  span {
    color: ${gray10};
  }
`;

const LinkRow = styled.span`
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${spacer24} 0;

  // override defaults
  a[href]:not([class]) {
    color: white;
    text-decoration: none;
  }

  span {
    padding: 0 1em;
  }

  margin-top: ${spacer32};
  padding-top: ${spacer24};
  border-top: 1px solid #282828; // todo: encore?
`;

const coachmarkHiddenStyles = css`
  width: 0;
  height: 0;
  box-shadow: none;
  box-sizing: content-box;
  padding: 8px;
`;

const StyledCoachmark = styled(Coachmark)<{ hide: boolean }>`
  pointer-events: all;
  box-sizing: content-box;
  padding: 8px;
  ${props => props.hide && coachmarkHiddenStyles}
`;

const StyledTabsTooltip = styled(Popover)`
  position: absolute;
  top: 134px;
  left: 330px;
  user-select: none;
  border-radius: 4px;
  width: 280px;
  min-height: 156px;
  z-index: 2001;
`;

const DoneButton = styled(ButtonTertiary)`
  position: absolute;
  bottom: 0;
  right: 16px;
`;

export const GlobalNav: FunctionComponent<GlobalNavProps> = ({
  accountMetadata,
  logUserAction,
  userMetadata,
  account,
  locale,
  accounts,
  frequentAccounts,
  children,
  currentRoute,
  gaPartnerId,
  isAuthorized,
  buildAdDisabled,
  isGreylisted,
  showAccountHierarchyOnboarding,
  isImpersonating,
  requestAccountHierarchyOnboarding,
  setAccountHierarchyOnboardingState,
}: GlobalNavProps) => {
  const [showUserPopover, toggleShowUserPopover] = useState(false);
  const [showAccountPopover, toggleShowAccountPopover] = useState(false);
  const [offsetHeight, setOffsetHeight] = useState(0);
  const coachmarkRef = useRef(null);

  // Fallback information for viewer/admin flows
  const adjustedAccountMetadata = {
    adAccountName: accountMetadata.adAccountName || account.businessName || ' ',
    adAccountId: accountMetadata.adAccountId || account.id || ' ',
    role: accountMetadata.role || ' ',
  };

  const isAccountRoute =
    currentRoute.includes('/account-management') ||
    currentRoute.includes('/account-details') ||
    currentRoute.includes('/account-settings') ||
    currentRoute.includes('/billing-center');

  const shouldShowManageIcon = isAccountRoute;

  // Set global bgcolor and margins on mount.
  useEffect(() => {
    const body: HTMLElement | null = document.body;
    if (body) {
      body.style.backgroundColor = '#FAFAFA';
      body.classList.add('rollout_new_nav');
    }

    // Add listeners so popovers will close if a user starts to scroll or clicks outside of popover
    const closePopover = () => {
      if (showAccountPopover) {
        toggleShowAccountPopover(false);
      }
      if (showUserPopover) {
        toggleShowUserPopover(false);
      }
    };
    const clickListener = (e: Event) => {
      // Don't close for clicks emanating within the popover
      if (
        e &&
        e.composedPath &&
        e
          .composedPath()
          .find(
            (el: TSFixMe) =>
              el.id === 'account-switcher' || el.id === 'coachmark-root',
          )
      ) {
        return;
      }
      closePopover();
    };
    const scrollListener = closePopover;
    document.addEventListener('scroll', scrollListener);
    document.addEventListener('click', clickListener);

    // turn off listeners on unmount
    return function cleanup() {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('scroll', scrollListener);
    };
  });

  useEffect(() => {
    requestAccountHierarchyOnboarding();
  }, [requestAccountHierarchyOnboarding]);

  const adjustedRoutes: TSFixMe = {
    BUILD_CAMPAIGN: routes.BUILD_CAMPAIGN_ADACCOUNT.replace(
      routeFragmentRegEx.ACCOUNT_ID,
      adjustedAccountMetadata.adAccountId,
    ),
    CAMPAIGN_CATALOGUE: routes.CAMPAIGN_CATALOGUE.replace(
      routeFragmentRegEx.ACCOUNT_ID,
      adjustedAccountMetadata.adAccountId,
    ),
    BUILD_AD: routes.BUILD_AD_ADACCOUNT.replace(
      routeFragmentRegEx.ACCOUNT_ID,
      adjustedAccountMetadata.adAccountId,
    ),
    AUDIENCES_ADACCOUNT: routes.AUDIENCES_ADACCOUNT.replace(
      routeFragmentRegEx.ACCOUNT_ID,
      adjustedAccountMetadata.adAccountId,
    ),
    ASSET_LIBRARY: routes.ASSET_LIBRARY.replace(
      routeFragmentRegEx.ACCOUNT_ID,
      adjustedAccountMetadata.adAccountId,
    ),
  };

  const routeHasSubnav = [
    '/dashboard',
    '/ad-set',
    '/details',
    '/browse-ads',
    '/audiences',
    '/asset-library',
  ].some(item => currentRoute.includes(item));

  const [language, market] = locale.split('_');
  const renderMarket = market ? `(${market})` : ``;
  const userLocale = `${language} ${renderMarket}`;

  const hasImpersonation = useBool('impersonation');

  // Don't show frame on account routes since those are not affected by impersonation
  const showImpersonationFrame =
    isImpersonating && hasImpersonation && !isAccountRoute;

  const FAQ =
    EXTERNAL_FAQ_ADDRESS[i18n.language]?.FAQ || EXTERNAL_FAQ_ADDRESS.en_US.FAQ;

  return (
    <ConnectedAuthProvider>
      <ThemeProvider theme={{ nav: lightTheme, sidebar: lightTheme }}>
        <LocalizeMoment />

        {showImpersonationFrame && (
          <ImpersonationFrame accountName={account.businessName} />
        )}

        <TopBannersContainer
          onChangeHeight={height => setOffsetHeight(height)}
        />
        <GlobalNavContainer>
          <LeftMenu ref={coachmarkRef}>
            <StyledOverlayTrigger
              onClick={() => {
                if (showAccountPopover) {
                  if (showAccountHierarchyOnboarding) {
                    setAccountHierarchyOnboardingState(false);
                    return;
                  }
                } else {
                  logUserAction({
                    category: GLOBAL_NAV_GA_CATEGORY,
                    label: 'Acct_switcher_open_accts_menu',
                  });
                }
                toggleShowAccountPopover(!showAccountPopover);
              }}
              placement={PopoverTrigger.bottomRight}
              overlay={
                showAccountPopover && (
                  <CoachmarkPortal
                    disablePointerEvents={!showAccountHierarchyOnboarding}
                  >
                    <StyledCoachmark
                      target={coachmarkRef}
                      hide={!showAccountHierarchyOnboarding}
                      rectOffset={
                        {
                          top: -8,
                          left: -8,
                          width: 0,
                          height: 0,
                        } as DOMRect
                      }
                    >
                      <AccountPopoverWithoutClose
                        large
                        arrow={Popover.topLeft}
                        onClose={undefined}
                      >
                        <AccountPopover
                          accounts={accounts}
                          activeAccount={account}
                          frequentAccounts={frequentAccounts}
                          logUserAction={logUserAction}
                          onClick={() => toggleShowAccountPopover(false)}
                        />
                      </AccountPopoverWithoutClose>
                      {showAccountHierarchyOnboarding && (
                        <StyledTabsTooltip arrow={Popover.left}>
                          {I18N_ACC_HIERARCHY_ONBOARDING}
                          <DoneButton
                            data-test="account-onboarding-done-button"
                            buttonSize={ButtonTertiary.md}
                            condensed
                            onClick={() =>
                              setAccountHierarchyOnboardingState(false)
                            }
                            buttonLegacy
                          >
                            {i18n.t('I18N_DONE', 'Done')}
                          </DoneButton>
                        </StyledTabsTooltip>
                      )}
                    </StyledCoachmark>
                  </CoachmarkPortal>
                )
              }
            >
              <AccountInfo data-test="account-switcher-trigger">
                <StyledNotificationLight show={showAccountHierarchyOnboarding}>
                  {shouldShowManageIcon ? (
                    <StyledManageAccountsIcon hoverAncestor={AccountInfo} />
                  ) : (
                    adjustedAccountMetadata.adAccountName[0] !== ' ' && (
                      <HoverableAccountBadge
                        width="32px"
                        height="32px"
                        account={adjustedAccountMetadata.adAccountId}
                        hoverAncestor={AccountInfo}
                      >
                        {adjustedAccountMetadata.adAccountName[0].toUpperCase()}
                      </HoverableAccountBadge>
                    )
                  )}
                </StyledNotificationLight>
                <div>
                  <ThemedType
                    data-test="account-name"
                    variant={Type.body3}
                    weight={Type.bold}
                    condensed
                  >
                    {shouldShowManageIcon
                      ? i18n.t(
                          'I18N_ACC_HIERARCHY_BTN_MANAGE_AD_ACCOUNTS',
                          'Manage Ad Accounts',
                        )
                      : adjustedAccountMetadata.adAccountName}
                  </ThemedType>
                  {adjustedAccountMetadata.role && !shouldShowManageIcon && (
                    <AccountRole data-test="account-role">
                      {i18n.t(
                        `I18N_ACCOUNT_ROLE_${adjustedAccountMetadata.role.toUpperCase()}`,
                        adjustedAccountMetadata.role,
                      )}
                    </AccountRole>
                  )}
                </div>
              </AccountInfo>
            </StyledOverlayTrigger>
          </LeftMenu>
          <LogoContainer>
            <a
              href="/dashboard"
              onClick={() => {
                logUserAction({
                  category: GLOBAL_NAV_GA_CATEGORY,
                  label: 'Dashboard_click',
                  params: {
                    ad_account_id: adjustedAccountMetadata.adAccountId,
                  },
                });
              }}
            >
              <SpotifyAdvertisingLogo />
            </a>
          </LogoContainer>
          <RightMenu>
            <PopoverTrigger
              placement={PopoverTrigger.bottomLeft}
              onShow={() => {
                logUserAction({
                  category: GLOBAL_NAV_GA_CATEGORY,
                  label: 'User_profile_open_profile_menu',
                });
                toggleShowUserPopover(true);
              }}
              onHide={() => toggleShowUserPopover(false)}
              overlay={
                showUserPopover && (
                  <UserPopoverWithoutClose
                    large
                    arrow={Popover.topRight}
                    onClose={undefined}
                  >
                    <ThemeProvider theme={{ nav: darkTheme }}>
                      <UserPopover data-test="account-drawer">
                        <UsernameAndLocale data-test="username-and-locale">
                          <ThemedType variant={Type.body2} condensed>
                            {userMetadata.displayName}
                          </ThemedType>
                          <ThemedLocaleType variant={Type.body3} condensed>
                            {userLocale}
                          </ThemedLocaleType>
                        </UsernameAndLocale>
                        <ButtonRow
                          to={routes.USER_SETTINGS}
                          onMouseDown={() => {
                            logUserAction({
                              category: GLOBAL_NAV_GA_CATEGORY,
                              label: 'User_profile_user_settings_link',
                              params: {
                                user_id: gaPartnerId,
                              },
                            });
                          }}
                        >
                          <IconBadge>
                            <IconGears
                              iconSize={16}
                              data-test="user-settings"
                            />
                          </IconBadge>
                          <ThemedType variant={Type.body3} condensed>
                            {i18n.t('I18N_USER_SETTINGS1', 'User Settings')}
                          </ThemedType>
                        </ButtonRow>
                        <ButtonRow
                          to={routes.LOGOUT}
                          onMouseDown={() => {
                            logUserAction({
                              category: GLOBAL_NAV_GA_CATEGORY,
                              label: 'User_profile_select_logout',
                            });
                          }}
                        >
                          <IconBadge>
                            <IconArrowRight iconSize={16} />
                          </IconBadge>
                          <ThemedType variant={Type.body3} condensed>
                            {i18n.t('I18N_LOGOUT', 'Logout')}
                          </ThemedType>
                        </ButtonRow>
                        <LinkRow>
                          <a
                            href="http://ads.spotify.com/"
                            onMouseDown={() => {
                              logUserAction({
                                category: GLOBAL_NAV_GA_CATEGORY,
                                label: 'User_profile_menu_homepage_link',
                              });
                            }}
                            target="_blank"
                          >
                            {i18n.t(
                              'I18N_SPOTIFY_ADVERTISING',
                              'Spotify Advertising',
                            )}
                          </a>
                          {/* eslint-disable-next-line */}
                          <span>•</span>
                          <a
                            href={FAQ}
                            data-test="faq-link"
                            onMouseDown={() => {
                              logUserAction({
                                category: GLOBAL_NAV_GA_CATEGORY,
                                label: 'User_profile_menu_FAQ_link',
                              });
                            }}
                            target="_blank"
                          >
                            {i18n.t('I18N_FAQ_HELP', 'FAQ & Help')}
                          </a>
                        </LinkRow>
                      </UserPopover>
                    </ThemeProvider>
                  </UserPopoverWithoutClose>
                )
              }
            >
              <HoverableUserBadge data-test="user-badge">
                {userMetadata.imgSrc ? (
                  <UserImage src={userMetadata.imgSrc} />
                ) : (
                  <UserCircleIcon />
                )}
              </HoverableUserBadge>
            </PopoverTrigger>
          </RightMenu>
        </GlobalNavContainer>
        {routeHasSubnav && (
          <GlobalNavBar
            adAccountId={adjustedAccountMetadata.adAccountId}
            offsetHeight={offsetHeight}
            buildAdDisabled={buildAdDisabled}
            isGreylisted={isGreylisted}
            logUserAction={logUserAction}
            adjustedRoutes={adjustedRoutes}
            currentRoute={currentRoute}
            isAuthorized={isAuthorized}
          />
        )}
        <GlobalNotificationBanner positionStatic />
        {children}
        <LegalFooter />
      </ThemeProvider>
    </ConnectedAuthProvider>
  );
};

export default GlobalNav;
