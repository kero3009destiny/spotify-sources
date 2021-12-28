import React from 'react';
import PropTypes from 'prop-types';

import { Markdown } from 'components/molecules';

import * as Styled from './Intro.styled';

/**
 * Renders an Intro text block component.
 * @param {String} bodyText The string for the Markdown.
 * @returns {ReactElement}
 */
const Intro = ({ bodyText }) => (
  <Styled.Intro>
    <Styled.Content>
      <Markdown body={bodyText} />
    </Styled.Content>
  </Styled.Intro>
);

Intro.propTypes = {
  /**
   * The string for the Markdown.
   */
  bodyText: PropTypes.string.isRequired,
};

export default Intro;
