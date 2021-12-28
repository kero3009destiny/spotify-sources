import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import { useTranslation } from 'i18n/nexti18n';

import * as Styled from './FormSuccessState.styled';

/**
 * Renders the contact form sucess state
 * @param {String} className Class to override current styles
 * @param {string} modifier A modifier to use for style overrides.
 * @returns {ReactElement}
 */
const FormSuccessState = ({ className = null, modifier = '' }) => {
  const { t } = useTranslation();

  return (
    <ThemeProvider theme={{ modifier }}>
      <Styled.SuccessState className={className}>
        <Styled.Copy>{t('formSuccess.p1')}</Styled.Copy>
        <Styled.Copy>{t('formSuccess.p2')}</Styled.Copy>
      </Styled.SuccessState>
    </ThemeProvider>
  );
};

FormSuccessState.propTypes = {
  /**
   * Class to override current styles
   */
  className: PropTypes.string,
  /**
   * A modifier to use for style overrides.
   */
  modifier: PropTypes.string,
};

export default FormSuccessState;
