import { Suspense } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconMoreAndroid, spacer4 } from '@spotify-internal/encore-web';
import {
  FlyOutToggle,
  FlyOutToggleName,
  NavItem,
  NavItemList,
  NavLink,
  TopNav,
} from 'components/TopNav';
import { useSidePanel, showSidePanel, setSidePanelOpening } from './SidePanel/SidePanelState';
import { UserEntity } from 'libs/services/s4pTypes';
import gTagManager from 'libs/services/logging';
import { SPALogo } from 'components/SPALogo';

const StyledIconMore = styled(IconMoreAndroid)`
  margin-right: ${spacer4};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StickyTopNav = styled(TopNav)`
  position: sticky;
  top: 0px;
  z-index: 1035;
`;

function isGodMode(user: UserEntity) {
  return user.team.organizationName === 'God Mode';
}

type NavigationItem = {
  key: string;
  title: string;
  url: string;
  routes: string[]; // list of url paths for which this link should stay highlighted
  onClick?: () => void;
  isHidden?: boolean;
};

type Props = {
  user: UserEntity;
  location: {
    pathname: string;
  };
};

export const NavigationHeader = ({ user, location }: Props) => {
  const [{ shouldShowSidePanel }, sidePanelDispatch] = useSidePanel();

  const {
    team: { resources },
  } = user;

  const openSidePanel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sidePanelDispatch(showSidePanel());
    sidePanelDispatch(setSidePanelOpening(true));
  };

  const navigationItems: NavigationItem[] = [
    {
      key: 'search',
      title: 'Search',
      url: '/search',
      onClick: () => gTagManager({ event: 'selectSearch' }),
      isHidden: !user.permissions.includes('s4p.catalog.search') && !isGodMode(user),
      routes: ['search'],
    },
    {
      key: 'works',
      title: 'Works',
      url: '/works',
      isHidden: !user.permissions.includes('s4p.catalog.view') && !isGodMode(user),
      routes: ['work', 'works'],
    },
    {
      key: 'writers',
      title: 'Songwriters',
      url: '/writers',
      isHidden: !user.permissions.includes('s4p.catalog.view') && !isGodMode(user),
      routes: ['writer', 'writers'],
    },
    {
      key: 'songwriterPage',
      title: 'Songwriter page',
      url: resources[0] ? `/creator/${resources[0].replace('spotify:creator:', '')}/curation` : '',
      isHidden: !user.permissions.includes('songwriterpage.view'),
      routes: ['creator'],
    },
    {
      key: 'manage-team',
      title: 'Manage team',
      url: '/manage-team',
      isHidden: !user.permissions.includes('team.view'),
      routes: ['manage-team'],
    },
  ];

  return (
    <StickyTopNav>
      <FlyOutToggle
        onClick={openSidePanel}
        sidePanelId="side-panel-container"
        shouldShowSidePanel={shouldShowSidePanel}
      >
        <StyledIconMore />
        <Suspense fallback={null}>
          <FlyOutToggleName>{user.team.organizationName}</FlyOutToggleName>
        </Suspense>
      </FlyOutToggle>
      <NavItemList logo={<SPALogo />}>
        {navigationItems.map((item) => (
          <NavItem key={item.key}>
            {!item.isHidden && (
              <StyledLink to={item.url}>
                <NavLink
                  title={item.title}
                  active={
                    item.routes.includes(location.pathname.split('/')[1]) ? 'true' : undefined
                  }
                  onClick={item.onClick ? item.onClick : undefined}
                >
                  {item.title}
                </NavLink>
              </StyledLink>
            )}
          </NavItem>
        ))}
      </NavItemList>
    </StickyTopNav>
  );
};
