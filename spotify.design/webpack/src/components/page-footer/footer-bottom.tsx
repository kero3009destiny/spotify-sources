import React from 'react';
import { MAIN_CONTENT_ID } from '../../common/constants/a11y';
import { StylizedScrollButton } from '../utilities/scroll-button';
import { IconArrow } from '../utilities/ui-icons';
import { Legal } from './legal';
import style from './footer-bottom.module.css';
import { scrollToDestination } from '../../common/utils/scrollToElement';
import { sendTrackingEvent } from '../../common/utils/sendTrackingEvent';

export const FooterBottom = () => (
  <div className={style.footerBottom}>
    <div className={style.legal}>
      <span className={`t-ui-3 ${style.copyright}`}>© 2020 Spotify AB</span>
      <Legal />
    </div>
    <div className={style.scrollButtonWrapper}>
      <StylizedScrollButton
        top={0}
        label="Back to top"
        onClick={() => {
          sendTrackingEvent('footer', 'click', 'back to top');
          const main = document?.getElementById(MAIN_CONTENT_ID);

          requestAnimationFrame(() => {
            if (main) {
              main.focus({ preventScroll: true });

              // iOS does not support preventScroll.
              requestAnimationFrame(() => {
                scrollToDestination(0);
              });
            }
          });
        }}
      >
        <IconArrow rotation={180} />
      </StylizedScrollButton>
    </div>
  </div>
);
