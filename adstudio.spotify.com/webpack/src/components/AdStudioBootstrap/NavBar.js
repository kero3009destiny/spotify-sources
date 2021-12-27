import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import { window } from 'global';
import i18n from 'i18next';
import styled from 'styled-components';

import { TooltipInfo } from '@spotify-internal/adstudio-tape';
import { screenLgMin, white } from '@spotify-internal/encore-foundation';
import { AdStudioLogo } from '@spotify-internal/encore-web/advertising/components/AdStudioLogo';

import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';
import { getAccount } from 'ducks/account/selectors';
import {
  getHasLoginError,
  getIsAuthenticated,
  getIsAuthorized,
} from 'ducks/auth/selectors';
import { getUserImg, getUserName } from 'ducks/user/selectors';

import { ADSTUDIO_LOGO_TITLE } from 'config';
import { routeFragmentRegEx, routes } from 'config/routes';

import PropTypes from 'prop-types';

const ResizingAdStudioLogo = styled(AdStudioLogo)`
  @media (min-width: ${screenLgMin}) {
    width: 238px;
    height: 40px;
  }
`;

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transparentBackground: false,
      showDropdown: false,
      hamburgerNav: false,
    };

    this.onScroll = this.onScroll.bind(this);
    this.hambergerNav = this.hambergerNav.bind(this);
    this.openDropdownMenu = this.openDropdownMenu.bind(this);
    this.closeDropdownMenu = this.closeDropdownMenu.bind(this);
  }

  componentDidMount() {
    this.onScroll();
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('click', this.closeDropdownMenu);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('click', this.closeDropdownMenu);
  }

  onScroll() {
    const navHeight = ReactDOM.findDOMNode(this.navComponent);
    if (navHeight) {
      const hasScrolled = window.pageYOffset > navHeight.clientHeight;
      this.setState({
        transparentBackground: hasScrolled,
      });
    }
  }

  hambergerNav(e) {
    e.preventDefault();
    this.setState({ hamburgerNav: !this.state.hamburgerNav });
  }

  openDropdownMenu(e) {
    e.preventDefault();
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  closeDropdownMenu(e) {
    if (this.userElement && !this.userElement.contains(e.target)) {
      this.setState({ showDropdown: false });
    }
  }

  render() {
    const {
      account,
      isAuthenticated,
      userName,
      userImg,
      isAuthorized,
      hasLoginError,
      logUserAction,
      logoColor,
    } = this.props;

    let adjustedRoutes = routes;

    if (account) {
      adjustedRoutes = {
        ...adjustedRoutes,
        BROWSE_ADS: routes.CAMPAIGN_CATALOGUE.replace(
          routeFragmentRegEx.ACCOUNT_ID,
          account.id,
        ),
      };
    }

    const loginErrorTooltip = i18n.t(
      'I18N_SORRY_WE_ARE_HAVING_SOME',
      'Sorry, we are having some technical difficulties. Please refresh this page in a few minutes.',
    );

    const DROPDOWN_MENU = (
      <ul className="dropdown-menu">
        <li className="dropdown-list-item">
          <Link
            title={i18n.t(
              'I18N_SPOTIFY_AD_STUDIO_ACCOUNT',
              'Spotify Ad Studio account page',
            )}
            href={adjustedRoutes.ACCOUNT}
            className="ta-account"
          >
            {i18n.t('I18N_ACCOUNT', 'Account')}
          </Link>
        </li>
        <li className="dropdown-list-item">
          <Link
            title={i18n.t(
              'I18N_SPOTIFY_AD_STUDIO_LOG_OUT',
              'Spotify Ad Studio log out',
            )}
            href={adjustedRoutes.LOGOUT}
            className="ta-logout"
          >
            {i18n.t('I18N_LOG_OUT', 'Log out')}
          </Link>
        </li>
      </ul>
    );

    return (
      <nav
        className={classnames('custom-nav homepage-nav', {
          'navbar-semi-transparent': this.state.transparentBackground,
        })}
        ref={nav => (this.navComponent = nav)}
      >
        <div className="container">
          <div className="brand-logo">
            <Link to={adjustedRoutes.MAIN} className="navbar-brand">
              <ResizingAdStudioLogo
                semanticColor={logoColor}
                title={ADSTUDIO_LOGO_TITLE}
              />
            </Link>
          </div>
          <div className="nav-wide-container">
            <ul
              className={classnames('topnav', {
                'responsive-nav': this.state.hamburgerNav,
              })}
            >
              <li className="nav-item scm-nav-link">
                <Link to={adjustedRoutes.STREAMING_CONVERSION_METRICS}>
                  {i18n.t('I18N_PROMOTE_YOUR_MUSIC', 'Promote your music')}
                </Link>
              </li>
              {isAuthorized && (
                <li className="nav-item">
                  <Link
                    title={i18n.t(
                      'I18N_SPOTIFY_AD_STUDIO_MANAGE',
                      'Spotify Ad Studio Manage Your Ads',
                    )}
                    href={adjustedRoutes.BROWSE_ADS}
                    onClick={() =>
                      logUserAction({
                        category: 'Landing Page',
                        label: 'click_your_ads_link',
                      })
                    }
                  >
                    {i18n.t('I18N_YOUR_ADS', 'Your ads')}
                  </Link>
                </li>
              )}

              {!isAuthorized && (
                <li className="nav-item">
                  <Link
                    to={`${adjustedRoutes.ADSTUDIO_SIGNUP}${window.location.search}`}
                    onClick={() =>
                      logUserAction({
                        category: 'Landing Page',
                        label: 'click_signup_button',
                      })
                    }
                  >
                    {i18n.t('I18N_SIGN_UP', 'Sign up')}
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link
                  title={i18n.t(
                    'I18N_SPOTIFY_AD_STUDIO_FAQS_PA',
                    'Spotify Ad Studio FAQs page',
                  )}
                  to={adjustedRoutes.FAQ}
                  onClick={() =>
                    logUserAction({
                      category: 'Landing Page',
                      label: 'click_faq_top',
                    })
                  }
                >
                  {i18n.t('I18N_FAQ', 'FAQ')}
                </Link>
              </li>

              <li className="nav-item divider-item">
                <span role="separator" className="divider" />
              </li>
              {!isAuthenticated && hasLoginError && (
                <li className="nav-item">
                  <Link
                    title={i18n.t(
                      'I18N_SPOTIFY_AD_STUDIO_LOG_IN',
                      'Spotify Ad Studio log in with error',
                    )}
                    id="navbar-login"
                    className="login-error"
                  >
                    <TooltipInfo
                      icon={false}
                      placement="bottom"
                      tooltipText={loginErrorTooltip}
                    >
                      <span className="login-error-label">
                        {i18n.t('I18N_LOG_IN', 'Log In')}
                      </span>
                    </TooltipInfo>
                  </Link>
                </li>
              )}

              {!isAuthenticated && !hasLoginError && (
                <li className="nav-item">
                  <Link
                    title={i18n.t(
                      'I18N_SPOTIFY_AD_STUDIO_LOG_IN',
                      'Spotify Ad Studio log in page',
                    )}
                    id="navbar-login"
                    to={adjustedRoutes.ADSTUDIO_SIGNUP}
                  >
                    {i18n.t('I18N_LOG_IN', 'Log In')}
                  </Link>
                </li>
              )}

              {isAuthenticated && (
                <li
                  ref={user => (this.userElement = user)}
                  id="user-dropdown"
                  className="ta-user-badge-toggle user-badge-toggle nav-item user-nav-item"
                >
                  <a
                    className="dropDownBtn"
                    href="#"
                    role="button"
                    tabIndex={0}
                    onClick={this.openDropdownMenu}
                  >
                    {userImg && (
                      <img
                        alt={i18n.t('I18N_USER_THUMBNAIL_ALT', 'User')}
                        className="user-img img-circle navbar-user-img"
                        src={userImg}
                      />
                    )}

                    <span className="user-name-item">{userName}</span>
                    <span className="caret" />
                  </a>
                  {this.state.showDropdown ? DROPDOWN_MENU : null}
                </li>
              )}
            </ul>
            <a
              href="#"
              className={`hamburger-icon ${
                this.state.hamburgerNav ? 'open' : ''
              }`}
              onClick={this.hambergerNav}
            >
              <span />
              <span />
              <span />
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  account: PropTypes.object,
  hasLoginError: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  userImg: PropTypes.string,
  userName: PropTypes.string,
  logoColor: PropTypes.string,
  logUserAction: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  logoColor: white,
};

function mapStateToProps(state) {
  return {
    account: getAccount(state),
    isAuthenticated: getIsAuthenticated(state),
    isAuthorized: getIsAuthorized(state),
    hasLoginError: getHasLoginError(state),
    userImg: getUserImg(state),
    userName: getUserName(state),
    logUserAction: logUserActionAC,
  };
}

export default connect(mapStateToProps, { logUserAction: logUserActionAC })(
  NavBar,
);
