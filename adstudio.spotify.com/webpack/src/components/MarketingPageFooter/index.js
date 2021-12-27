import React from 'react';
import { Trans } from 'react-i18next';
import i18n from 'i18next';

import HomePageFooterSvgs from './HomePageFooterSvgs';

import PropTypes from 'prop-types';

export default function HomePageFooter({ innerRef }) {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <footer ref={innerRef} className="footer footer-default" role="contentinfo">
      <HomePageFooterSvgs />
      <div className="container">
        <nav className="row">
          <div className="col-xs-12 col-md-2">
            <div className="footer-logo">
              <a href="http://spotifyforbrands.com/us">
                {i18n.t('I18N_SPOTIFY', 'Spotify')}
              </a>
            </div>
          </div>
          <div className="col-xs-6 col-sm-4 col-md-2">
            <h3 className="nav-title">{i18n.t('I18N_COMPANY', 'Company')}</h3>
            <ul className="nav">
              <li>
                <a
                  className="nav-link"
                  href="https://www.spotify.com/us/about-us/contact/"
                >
                  {i18n.t('I18N_ABOUT', 'About')}
                </a>
              </li>
              <li>
                <a className="nav-link" href="https://www.spotify.com/us/jobs/">
                  {i18n.t('I18N_JOBS', 'Jobs')}
                </a>
              </li>
              <li>
                <a className="nav-link" href="https://press.spotify.com/us/">
                  {i18n.t('I18N_PRESS', 'Press')}
                </a>
              </li>
              <li>
                <a className="nav-link" href="https://news.spotify.com/us/">
                  {i18n.t('I18N_NEWS', 'News')}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-xs-6 col-sm-4 col-md-2">
            <h3 className="nav-title">
              {i18n.t('I18N_COMMUNITY', 'Community')}
            </h3>
            <ul className="nav">
              <li>
                <a className="nav-link" href="https://www.spotifyartists.com/">
                  {i18n.t('I18N_ARTISTS', 'Artists')}
                </a>
              </li>
              <li>
                <a className="nav-link" href="https://developer.spotify.com/">
                  {i18n.t('I18N_DEVELOPERS', 'Developers')}
                </a>
              </li>
              <li>
                <a
                  className="nav-link"
                  href="https://www.spotify.com/us/brands/"
                >
                  {i18n.t('I18N_BRANDS', 'Brands')}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-xs-6 col-sm-4 col-md-2">
            <h3 className="nav-title">
              {i18n.t('I18N_USEFUL_LINKS', 'Useful Links')}
            </h3>
            <ul className="nav">
              <li>
                <a
                  className="nav-link"
                  href="https://support.spotify.com/?utm_source=www.spotify.com&utm_medium=www_footer&_ga=2.179794404.1176359094.1504624428-334658961.1490890546"
                >
                  {i18n.t('I18N_HELP', 'Help')}
                </a>
              </li>
              <li>
                <a
                  className="nav-link"
                  href="https://www.spotify.com/us/purchase/ecards/"
                >
                  {i18n.t('I18N_GIFT', 'Gift')}
                </a>
              </li>
              <li>
                <a
                  className="nav-link"
                  href="https://www.spotify.com/us/redirect/webplayerlink/?utm_medium=www_footer"
                >
                  {i18n.t('I18N_WEB_PLAYER', 'Web Player')}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-xs-12 col-md-4 col-social text-right">
            <ul className="nav row">
              <li className="social-icons-list-item">
                <a href="http://instagram.com/spotify">
                  <svg className="social-icon">
                    <use xlinkHref="#instagram-icon" />
                  </svg>
                  <span className="social-text">
                    {i18n.t('I18N_INSTAGRAM', 'Instagram')}
                  </span>
                </a>
              </li>
              <li className="social-icons-list-item">
                <a href="https://twitter.com/spotify">
                  <svg className="social-icon">
                    <use xlinkHref="#twitter-icon" />
                  </svg>
                  <span className="social-text">
                    {i18n.t('I18N_TWITTER', 'Twitter')}
                  </span>
                </a>
              </li>
              <li className="social-icons-list-item">
                <a href="https://www.facebook.com/Spotify">
                  <svg className="social-icon">
                    <use xlinkHref="#facebook-icon" />
                  </svg>
                  <span className="social-text">
                    {i18n.t('I18N_FACEBOOK', 'Facebook')}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <nav className="row row-small">
          <div className="col-xs-8 col-md-4">
            <ul className="nav nav-small">
              <li>
                <a href="https://www.spotify.com/legal/">
                  {i18n.t('I18N_LEGAL', 'Legal')}
                </a>
              </li>
              <li>
                <a href="https://www.spotify.com/legal/privacy-policy/">
                  {i18n.t('I18N_PRIVACY_POLICY', 'Privacy Policy')}
                </a>
              </li>
              <li>
                <a href="https://www.spotify.com/legal/privacy-policy/#s13">
                  {i18n.t('I18N_COOKIES', 'Cookies')}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-xs-4 col-md-8 text-right">
            <small className="copyright">
              <Trans i18nKey="I18N_SPOTIFY_AB">© {{ year }} Spotify AB</Trans>
            </small>
          </div>
        </nav>
      </div>
    </footer>
  );
}
HomePageFooter.propTypes = {
  // Required for lazyloading with CustomWaypoint component
  innerRef: PropTypes.func,
};
