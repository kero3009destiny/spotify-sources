import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'i18n/nexti18n';

import * as Styled from './SkipToMain.styled';

/**
 * Skips the regular focus flow to go directly to the main content.
 * @param {string|null} className The component class name.
 * @returns {ReactElement}
 */
const SkipToMain = ({ className = null }) => {
  const { t } = useTranslation();

  return (
    <Styled.SkipToMain className={className} href="#main-content">
      {t('skipToContent')}
    </Styled.SkipToMain>
  );
};

SkipToMain.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
};

export default SkipToMain;
