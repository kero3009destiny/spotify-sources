import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { screenXsMax, white } from '@spotify-internal/encore-web';

const slideDown = keyframes`
  0% {
      opacity: 0;
      transform: translateY(-100%);
  }
  100% {
      opacity: 1;
      transform: translateY(0);
  }
`;

type StickyPlaceholderProps = {
  stickyHeader: boolean;
  headerHeight: string;
};

const StickyPlaceholder = styled.div<StickyPlaceholderProps>`
  display: ${props =>
    props.stickyHeader && props.headerHeight ? 'block' : 'none'};
  height: ${props => props.headerHeight};
`;

type HeaderProps = {
  stickyHeader: boolean;
  stickyOffsetTop: string;
  headerLeftPadding: string;
  sideNavWidth: string;
};

const Header = styled.div<HeaderProps>`
  display: flex;
  justify-content: space-between;

  ${props =>
    props.stickyHeader &&
    css`
      box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px 0px;
      z-index: 75;
      position: fixed;
      width: calc(100% - ${props.sideNavWidth});
      top: ${({ stickyOffsetTop }: HeaderProps) => stickyOffsetTop};
      right: 0;
      padding-left: ${({ headerLeftPadding }: HeaderProps) =>
        headerLeftPadding};
      padding-top: 16px;
      padding-right: 32px;
      background-color: ${white};
      animation: ${slideDown} 0.3s;
      animation-timing-function: cubic-bezier(0.3, 0, 0, 1);
    `}

  @media (max-width: ${screenXsMax}) {
    width: 100%;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
`;

type MainRowProps = {
  stickyHeader: boolean;
  hasNavBar: boolean;
};

const MainRow = styled.div<MainRowProps>`
  display: flex;
  margin-bottom: ${props =>
    !props.hasNavBar && props.stickyHeader ? '16px' : '0px'};
`;

const NavBar = styled.div`
  ul {
    margin-bottom: 0;
  }
`;

const SideMenu = styled.div`
  align-self: baseline;
`;

export const EntityHeader = ({
  renderImage,
  renderTitle,
  attributes,
  actions,
  tabs,
  stickyHeader,
  sideNavWidth = '0px',
  headerHeight,
  stickyOffsetTop = '0px',
  stickyOffsetLeft,
}: $TSFixMe) => {
  const headerLeftPadding =
    stickyOffsetLeft || (sideNavWidth === '0px' ? '48px' : '32px');
  const hasNavBar = !!tabs;
  return (
    <React.Fragment>
      <StickyPlaceholder
        stickyHeader={stickyHeader}
        headerHeight={headerHeight}
      />
      <Header
        stickyHeader={stickyHeader}
        sideNavWidth={sideNavWidth}
        headerLeftPadding={headerLeftPadding}
        stickyOffsetTop={stickyOffsetTop}
      >
        <div>
          <MainRow stickyHeader={stickyHeader} hasNavBar={hasNavBar}>
            {renderImage && renderImage(stickyHeader)}
            <Center>
              {renderTitle(stickyHeader)}
              {!stickyHeader && attributes}
            </Center>
          </MainRow>
          {hasNavBar && <NavBar>{tabs}</NavBar>}
        </div>
        <SideMenu>{actions}</SideMenu>
      </Header>
    </React.Fragment>
  );
};
