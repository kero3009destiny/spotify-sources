import React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';

import {
  Backdrop as BackdropBase,
  IconMenu as IconMenuBase,
  IconX,
  screenXxsMax,
  screenXsMin,
  spacer4,
  spacer16,
  spacer20,
  gray10,
  gray20,
  addColorSet,
  cssColorValue,
} from '@spotify-internal/encore-web';

const zIndexNav = 1035;
const zIndexNavBackdrop = 1034;

const Wrapper = styled.div`
  svg {
    color: ${cssColorValue('textBase')};
  }
`;
// Reset a button to a link looking thing
const buttonReset = () => css`
  background-color: transparent;
  border: 0;
  color: inherit;
  line-height: 1;
  letter-spacing: inherit;
  padding: 0;

  &:focus {
    outline: 0;
  }
`;

const ButtonMenu = styled.button`
  ${buttonReset()}; /* stylelint-disable-line no-extra-semicolons */

  padding: ${spacer20} ${spacer16};
  margin-right: -${spacer4};

  &:focus {
    outline: 0;
    background: ${gray20};
  }
`;

const IconMenu = styled(IconMenuBase)`
  vertical-align: middle;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  background: ${gray10};
  z-index: ${zIndexNav};
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 1);
  height: 100%;

  @media (max-width: ${screenXxsMax}) {
    width: 100%;
  }

  @media (min-width: ${screenXsMin}) {
    width: 336px;
  }
`;

const MobileHeader = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${gray20};
  padding: ${spacer16};

  @media (min-width: ${screenXsMin}) {
    display: none;
  }
`;

const MobileDismiss = styled.button`
  ${buttonReset()}; /* stylelint-disable-line no-extra-semicolons */

  &:focus {
    outline: 0;
  }
`;

const MobileNavigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  list-style-type: none;
`;

/* When flyout is open, don't allow body to scroll */
const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    overflow: hidden;

    @media (max-width: ${screenXxsMax}) {
      position: fixed;
      width: 100%;
    }
  }
`;

/*
We need a lower z-index value than usual so that the navigational elements can appear on top it, while altogether remaining at a lower zindex value than popups, dialogs, etc elsewhere in the application.
*/

const Backdrop = styled(BackdropBase)`
  z-index: ${zIndexNavBackdrop};
`;

type Props = {
  children: React.ReactNode;
  onHideMenu: () => void;
  onShowMenu: () => void;
  showMenu: boolean;
  logo: React.ReactNode;
};

export const MobileContainer = React.forwardRef(
  ({ children, onHideMenu, onShowMenu, showMenu, logo }: Props, ref: React.Ref<HTMLDivElement>) => (
    <Wrapper className={addColorSet('invertedDark')}>
      <ButtonMenu onClick={onShowMenu} title="Open Navigation">
        <IconMenu />
      </ButtonMenu>
      {showMenu && (
        <>
          <GlobalStyle />
          <Backdrop />
          <Container ref={ref}>
            <MobileHeader>
              {logo}
              <MobileDismiss type="button" onClick={onHideMenu} title="Dismiss Navigation">
                <IconX />
              </MobileDismiss>
            </MobileHeader>
            <MobileNavigation>{children}</MobileNavigation>
          </Container>
        </>
      )}
    </Wrapper>
  ),
);
