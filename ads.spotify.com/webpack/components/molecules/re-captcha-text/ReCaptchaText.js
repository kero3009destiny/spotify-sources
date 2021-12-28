import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'i18n/nexti18n';

import { Markdown } from 'components/molecules/markdown';

import * as Styled from './ReCaptchaText.styled';

/**
 * ReCaptchaText
 * @param {string|null} className The component class name.
 * @param {number} tabIndex attribute specifies the tab order of an element
 * @returns {ReactElement}
 */
const ReCaptchaText = ({ className = null, tabIndex = 0 }) => {
  const { t } = useTranslation();

  return (
    <Styled.Container className={className}>
      <Markdown body={t('reCaptchaBranding')} params={{ tabIndex }} />
    </Styled.Container>
  );
};

ReCaptchaText.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * The tabindex attribute specifies the tab order of an element
   */
  tabIndex: PropTypes.number,
};

export default ReCaptchaText;
