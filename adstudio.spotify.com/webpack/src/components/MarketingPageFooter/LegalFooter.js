import React from 'react';
import { Link } from 'react-router';
import i18n from 'i18next';
import moment from 'moment';

import { routes } from 'config/routes';

import PropTypes from 'prop-types';

export const LegalFooter = ({ innerRef }) => {
  const year = moment().year();

  return (
    <footer ref={innerRef} className="footer-legal">
      <nav>
        <ul className="nav-legal">
          <li className="nav-item-legal">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link-legal"
              title={i18n.t(
                'I18N_SPOTIFY_AD_STUDIO_TERMS_A',
                'Spotify Ad Studio Terms and Conditions page',
              )}
              to={routes.BETA_TERMS}
            >
              {i18n.t('I18N_LEGAL', 'Legal')}
            </Link>
          </li>
          <li className="nav-item-legal">
            <a
              target="_blank"
              href="https://www.spotify.com/legal/privacy-policy/"
              className="nav-link-legal"
              rel="noopener noreferrer"
              title={i18n.t(
                'I18N_SPOTIFY_AD_STUDIO_PRIVACY',
                'Spotify Ad Studio Privacy',
              )}
            >
              {i18n.t('I18N_PRIVACY', 'Privacy')}
            </a>
          </li>
          <li className="nav-item-legal">
            <a
              target="_blank"
              href="https://www.spotify.com/legal/privacy-policy/#s13"
              className="nav-link-legal"
              rel="noopener noreferrer"
              title={i18n.t(
                'I18N_SPOTIFY_AD_STUDIO_COOKIES',
                'Spotify Ad Studio Cookies',
              )}
            >
              {i18n.t('I18N_COOKIES', 'Cookies')}
            </a>
          </li>
          <li className="nav-item-legal nav-item-copyright-legal">
            {i18n.t('I18N_SPOTIFY_AB', {
              year,
              defaultValue: '© {{year}} Spotify AB',
            })}
          </li>
        </ul>
      </nav>
    </footer>
  );
};

LegalFooter.propTypes = {
  // Required for lazyloading with CustomWaypoint component
  innerRef: PropTypes.func,
};

export default LegalFooter;
