import { ReactNode } from 'react';
import styled from 'styled-components';
import { breakpoint, color, spacer } from '@spotify-internal/encore-web';

const navMobileHeight = spacer.spacer64;
const navDesktopHeight = spacer.spacer80;

const Wrapper = styled.div`
  background: ${color.gray7};
  display: flex;
  align-items: center;
  position: relative;

  @media (max-width: ${breakpoint.screenXsMax}) {
    height: ${navMobileHeight};
    padding-right: ${spacer.spacer4};
    padding-left: ${spacer.spacer4};
    justify-content: space-between;
    margin-bottom: ${spacer.spacer24};
  }

  @media (min-width: ${breakpoint.screenSmMin}) {
    height: ${navDesktopHeight};
    padding-right: ${spacer.spacer20};
    padding-left: ${spacer.spacer20};
    margin-left: auto;
    margin-right: auto;
    margin-bottom: ${spacer.spacer24};
  }
`;

export const TopNav = ({ children, ...props }: { children: ReactNode }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};
