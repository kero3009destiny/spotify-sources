import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import * as Styled from './HighlightedStatement.styled';

/**
 * HighlightedStatement component
 * @param {string} text Text to be displayed as the Statement
 * @param {string} text HEX color for the bold text
 * @returns {ReactElement}
 */
const HighlightedStatement = ({ text = '', highlightColor = '' }) => {
  const formatText = () => {
    let highlightedText = '';
    let flagTagOpen = true;

    for (let i = 0; i < text.length; i += 1) {
      if (text[i] === '_') {
        if (flagTagOpen) {
          highlightedText += '<strong>';
          flagTagOpen = false;
        } else {
          highlightedText += '</strong>';
          flagTagOpen = true;
        }
      } else {
        highlightedText += text[i];
      }
    }
    return highlightedText;
  };

  const formattedText = useMemo(() => formatText(), [text]);

  return (
    <Styled.Container>
      <Styled.Statement highlightColor={highlightColor}>
        {/* eslint-disable-next-line react/no-danger */}
        <span dangerouslySetInnerHTML={{ __html: formattedText }} />
      </Styled.Statement>
    </Styled.Container>
  );
};

HighlightedStatement.propTypes = {
  /**
   * Text to be displayed as the Statement
   */
  text: PropTypes.string.isRequired,
  /**
   * HEX color for the bold text
   */
  highlightColor: PropTypes.string.isRequired,
};

export default HighlightedStatement;
