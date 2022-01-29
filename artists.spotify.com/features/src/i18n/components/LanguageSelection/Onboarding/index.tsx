import React, { useCallback } from 'react';
import { OverlayTrigger, Popover } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { useT } from '../../../hooks/useT';

type Props = {
  children: React.ReactNode;
};

const Contents = styled.div`
  display: contents;
`;

export function LanguageSelectionOnboarding({ children }: Props) {
  const t = useT();
  const [enabled, setEnabled] = React.useState(false);

  const [placement, setPlacement] = React.useState<
    'bottom' | 'bottomLeft' | 'bottomRight'
  >('bottom');

  const arrow = (
    {
      bottom: 'top',
      bottomLeft: 'topRight',
      bottomRight: 'topLeft',
    } as const
  )[placement];

  // automatically place the dialog based on it's bounding client rectangle.
  // see: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
  const placementCallbackRef = useCallback(el => {
    if (!el) return;
    const { left, right } = el.getBoundingClientRect();
    if (left < 0) setPlacement('bottomRight');
    else if (right > window.innerWidth) setPlacement('bottomLeft');
    else setPlacement('bottom');
  }, []);

  React.useEffect(() => {
    // don't show onboarding in synthetic tests
    if (navigator.webdriver) setOnboardingStatus('closed');
    if (getOnboardingStatus() === 'closed') return;
    setEnabled(true);
  }, []);

  const closeOnboarding = () => {
    setEnabled(false);
    setOnboardingStatus('closed');
  };

  return (
    <OverlayTrigger
      dir="ltr"
      placement={placement}
      overlay={
        enabled && (
          <div ref={placementCallbackRef}>
            <Popover
              colorSet="invertedLight"
              arrow={arrow}
              onClose={closeOnboarding}
            >
              <div dir="auto">
                {t(
                  'choose_language_prompt',
                  'Choose your preferred language.',
                  'Prompt for the user to change the language on the page',
                )}
              </div>
            </Popover>
          </div>
        )
      }
    >
      <Contents onClick={closeOnboarding}>{children}</Contents>
    </OverlayTrigger>
  );
}

function getOnboardingStatus() {
  return localStorage.getItem('langSelectionOnboardingStatus');
}

function setOnboardingStatus(status: 'closed') {
  return localStorage.setItem('langSelectionOnboardingStatus', status);
}
