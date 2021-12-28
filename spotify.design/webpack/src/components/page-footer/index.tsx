import React from 'react';
import { Link } from 'gatsby';

import { sendTrackingEvent } from '../../common/utils/sendTrackingEvent';
import { Logo } from '../utilities/ui-icons';
import { RelevantLinks } from './relevant-links';
import { Timezones } from './timezones';
import { FooterBottom } from './footer-bottom';
import { Burst } from './burst';
import style from './style.module.css';

export const PageFooter = () => {
  return (
    <footer className={`sd-container ${style.footer}`}>
      <div className={`hidden-without-js ${style.burst}`}>
        <Burst />
      </div>
      <div className={`sd-container-inner ${style.footerInner}`}>
        <div className={style.footerGrid}>
          <div className={style.logo}>
            <Link
              to="/"
              aria-label="Go to homepage"
              onClick={() => sendTrackingEvent('footer', 'click', 'logo')}
            >
              <Logo />
            </Link>
          </div>
          <RelevantLinks />
          <Timezones className={style.timezones} />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
};
