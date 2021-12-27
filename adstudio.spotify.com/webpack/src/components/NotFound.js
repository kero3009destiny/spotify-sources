import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import i18n from 'i18next';

import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';

import HomePageFooter from 'components/MarketingPageFooter';

import { routes } from 'config/routes';

import PropTypes from 'prop-types';

const mainContainerStyles = `
  .main{
    padding-top:0; margin-top:0;
  }
`;
export class NotFound extends Component {
  static propTypes = {
    logUserAction: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.logUserAction({
      category: 'error',
      label: 'page_not_found',
      params: null,
    });
  }

  render() {
    return (
      <div className="not-found-wrapper">
        <Helmet>
          <style>{mainContainerStyles}</style>
        </Helmet>
        <section className="container container-info">
          <div className="row not-found-container">
            <div className="not-found-message">
              <h3>{i18n.t('I18N_DARN', 'Darn!')}</h3>
              <p className="not-found-text">
                <Trans i18nKey="I18N_WE_COULDN_T_FIND_THE_PAGE">
                  We couldn't find the page you were looking for. Maybe our
                  <Link to={routes.FAQ} className="faq-link">
                    FAQ
                  </Link>{' '}
                  or
                  <a href={routes.MAIN} className="faq-link">
                    homepage
                  </a>{' '}
                  can help?
                </Trans>
              </p>
              <a href={routes.MAIN} className="main-link">
                {i18n.t('I18N_GO_BACK', 'Go Back')}
              </a>
            </div>
            <figure className="not-found-illustration">
              <picture>
                <source
                  srcSet="https://adstudio.scdn.co/assets/landingpage/404_Illustration.svg"
                  media="(max-width: 768px)"
                />

                <img
                  src="https://adstudio.scdn.co/assets/landingpage/404_Illustration.svg"
                  alt={i18n.t('I18N_ERROR_ART_WORK', '404 Error Art Work')}
                  className="center-block"
                />
              </picture>
            </figure>
          </div>
        </section>

        <HomePageFooter />
      </div>
    );
  }
}

export default connect(null, { logUserAction: logUserActionAC })(NotFound);
