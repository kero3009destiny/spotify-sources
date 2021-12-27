import { Suspense, useEffect, useRef } from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import { TransitionValue } from 'react-use-transition';
import { useLocation } from 'react-router-dom';
import {
  Backdrop as EncoreBackdrop,
  gray10,
  screenXsMax,
  screenXxsMax,
  screenSmMin,
  ButtonIcon,
  IconX,
} from '@spotify-internal/encore-web';
import { hideSidePanel, useSidePanel, setSidePanelOpening } from './SidePanelState';
import { useViewport, Viewport } from 'libs/utils/useViewport';
import { useTransition } from 'react-use-transition';
import { SidePanelFooter } from './SidePanelFooter';
import { SPALogo } from 'components/SPALogo';
import { TeamSearch } from './TeamSearch';
import { TeamList } from './TeamList';
import { useCurrentUser } from 'libs/services/s4p';
import SidePanelComponent from 'components/SidePanel';

const zIndexNav = 1035;

const containerTransition = {
  entering: css`
    transform: translateX(0);
    visibility: visible;
    transition: transform 0.1s ease-in;
  `,

  entered: css`
    transform: translateX(0);
    visibility: visible;
  `,

  exiting: css`
    transform: translateX(-100%);
    visibility: visible;
    transition: transform 0.1s ease-in;
  `,

  exited: css`
    transform: translateX(-100%);
    visibility: hidden;
  `,
};

const SidePanelContainer = styled.div<{ transitionState: TransitionValue }>`
  background-color: ${gray10};
  position: fixed;
  left: 0;
  top: 0;
  z-index: ${zIndexNav};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 1);

  @media (max-width: ${screenXsMax}) {
    height: 100%;
    width: 100%;
  }

  @media (min-width: ${screenSmMin}) {
    height: 100vh;
    width: 336px;
  }

  ${(props) => containerTransition[props.transitionState]}
`;

const backdropTransition = {
  entering: css`
    opacity: 1;
    pointer-events: initial;
    transition: opacity 0.1s ease-in;
  `,

  entered: css`
    opacity: 1;
    pointer-events: initial;
  `,

  exiting: css`
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.1s ease-in;
  `,

  exited: css`
    opacity: 0;
    pointer-events: none;
  `,
};

const Backdrop = styled(EncoreBackdrop)<{ transitionState: TransitionValue }>`
  ${({ transitionState }) => backdropTransition[transitionState]}
  z-index: ${zIndexNav};
`;

const Logo = styled(SPALogo)<{ opacity: number }>`
  margin-right: 36px;

  @media (min-width: ${screenSmMin}) {
    opacity: ${(props) => props.opacity};
  }
`;

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

export function selectTeam(teamUri: string) {
  localStorage.setItem('SPA-Current-Team', teamUri);
  window.location.replace('/');
}

export function SidePanel() {
  const [
    { shouldShowSidePanel, sidePanelOpening, shouldShowSearch },
    sidePanelDispatch,
  ] = useSidePanel();
  const container = useRef<HTMLDivElement>(null);
  const { employee } = useCurrentUser();
  const fallback = null;
  const viewport = useViewport();
  const isMobile = viewport === Viewport.XS;

  const firstFocusableElement = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sidePanelOpening) {
      return;
    }

    firstFocusableElement.current?.focus();
    sidePanelDispatch(setSidePanelOpening(false));
  }, [firstFocusableElement, sidePanelDispatch, sidePanelOpening]);

  // hide when escape key pressed
  useEffect(() => {
    if (!shouldShowSidePanel) {
      return undefined;
    }

    function handleEvent(e: FocusEvent | KeyboardEvent) {
      switch (e.type) {
        case 'focus': {
          if (document.activeElement && !container.current?.contains(document.activeElement)) {
            sidePanelDispatch(hideSidePanel());
          }

          return;
        }

        case 'keydown': {
          if (e instanceof KeyboardEvent && e.code === 'Escape') {
            sidePanelDispatch(hideSidePanel());
          }

          return;
        }

        default:
          return;
      }
    }

    window.addEventListener('keydown', handleEvent, true);
    window.addEventListener('focus', handleEvent, true);

    return () => {
      window.removeEventListener('keydown', handleEvent, true);
      window.removeEventListener('focus', handleEvent, true);
    };
  }, [shouldShowSidePanel]); // eslint-disable-line react-hooks/exhaustive-deps

  // hide when location changes
  useEffect(() => {
    if (shouldShowSidePanel) {
      sidePanelDispatch(hideSidePanel());
    }
  }, [useLocation()]); // eslint-disable-line react-hooks/exhaustive-deps

  const [transitionState, handleTransitionEnd] = useTransition(shouldShowSidePanel);

  return (
    <Suspense fallback={fallback}>
      {shouldShowSidePanel && <GlobalStyle />}
      <Backdrop
        onClick={() => sidePanelDispatch(hideSidePanel())}
        transitionState={transitionState}
        onTransitionEnd={handleTransitionEnd}
      />
      <SidePanelContainer
        transitionState={transitionState}
        onTransitionEnd={handleTransitionEnd}
        ref={container}
        id="side-panel-container"
      >
        <SidePanelComponent
          header={
            <>
              <Logo opacity={!isMobile && shouldShowSearch ? 0 : 1} />
              {isMobile && (
                <ButtonIcon
                  type="button"
                  title="Dismiss sidepanel"
                  onClick={() => sidePanelDispatch(hideSidePanel())}
                >
                  <IconX />
                </ButtonIcon>
              )}
              {employee ? <TeamSearch ref={isMobile ? null : firstFocusableElement} /> : null}
            </>
          }
          body={<TeamList />}
          footer={<SidePanelFooter />}
        />
      </SidePanelContainer>
    </Suspense>
  );
}
