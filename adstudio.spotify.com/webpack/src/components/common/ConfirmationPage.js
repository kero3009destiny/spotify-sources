import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import i18n from 'i18next';

import { ButtonSecondary } from '@spotify-internal/adstudio-tape';
import { Type } from '@spotify-internal/encore-web';

import { routes } from 'config/routes';

import PropTypes from 'prop-types';

const CSS_BASE_CLASS = 'confirmation-page';

export const ConfirmationPage = ({
  ctaLink,
  ctaText,
  className,
  flush,
  header,
  showCta,
  subcopy,
}) => (
  <div
    className={cx(CSS_BASE_CLASS, className, { flush })}
    data-test="confirmation-page"
  >
    {header && (
      <Type.h1 variant={Type.display2} className={`${CSS_BASE_CLASS}-header`}>
        {header}
      </Type.h1>
    )}

    {subcopy && (
      <Type.p variant={Type.body1} className={`${CSS_BASE_CLASS}-subcopy`}>
        {subcopy}
      </Type.p>
    )}

    {showCta && (
      <ButtonSecondary
        component={Link}
        to={ctaLink}
        className={`${CSS_BASE_CLASS}-button`}
        buttonLegacy
      >
        {ctaText}
      </ButtonSecondary>
    )}
  </div>
);

ConfirmationPage.defaultProps = {
  ctaText: i18n.t('I18N_CTA_LEARN_MORE', 'Learn more'),
  ctaLink: routes.FAQ,
  showCta: true,
};

ConfirmationPage.propTypes = {
  ctaLink: PropTypes.string,
  className: PropTypes.string,
  ctaText: PropTypes.string,
  flush: PropTypes.bool,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  showCta: PropTypes.bool,
  subcopy: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default ConfirmationPage;
