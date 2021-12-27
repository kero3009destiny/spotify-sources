import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {
  LogoSpotify,
  spacer4,
  spacer32,
  Type,
  spotifyBlack7,
  white,
  semanticColors,
} from '@spotify-internal/encore-web';
import { HeaderButtons } from './HeaderButtons';

export const HEADER_HEIGHT = '80px';

const Header = styled.div`
  height: ${HEADER_HEIGHT};
  display: flex;
  width: 100%;
  background: ${spotifyBlack7};
  color: ${white};
  padding: ${spacer4} ${spacer32};
`;

const HeaderContentContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const HeaderLogoIcon = styled(LogoSpotify)`
  margin-right: ${spacer4};
`;

const HeaderSiteNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderSiteName = styled(Type.p).attrs(() => ({
  variant: 'finale',
}))`
  font-size: 18px;
`;

const HeaderContent = ({ title }: { title: string }) => (
  <Link href="/setup/anchor">
    <HeaderSiteNameContainer>
      <HeaderLogoIcon height="26" semanticColor={semanticColors.backgroundBase} />
      <HeaderSiteName>{title}</HeaderSiteName>
    </HeaderSiteNameContainer>
  </Link>
);

const RegistrationHeader = () => {
  return (
    <Header>
      <HeaderContentContainer>
        <HeaderContent title="Payments" />
        <HeaderButtons />
      </HeaderContentContainer>
    </Header>
  );
};

export default RegistrationHeader;
