import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import useIsInViewport from 'utils/use-is-in-viewport/useIsInViewport';
import { colors, visibilityThreshold } from 'styles/variables';
import { ACTIVATE_ANIMATION_CLASS } from 'styles/animations';
import { getLinkProps } from 'utils/get-link-props';

import * as Styled from './Quote.styled';

/**
 * Quote component
 * @param {object} props
 * @param {string} props.quote - Text to be displayed as the Quote
 * @param {string} props.speaker - Quote's author
 * @param {string} props.companyOrRole - Company/Role of the author
 * @param {string} props.backgroundColor - HEX color for the background
 * @param {string} props.quoteColor - HEX color for the text quote
 * @param {string} props.attributionTextColor - HEX color for author's text info
 * @param {object} props.cta - The optional CTA
 * @returns {ReactComponent}
 */
const Quote = ({
  quote,
  speaker = '',
  companyOrRole = '',
  backgroundColor = '',
  quoteColor = `${colors.black}`,
  attributionTextColor = `${colors.black}`,
  cta,
}) => {
  const [inViewport, inViewportRef] = useIsInViewport({
    threshold: visibilityThreshold.oneThird,
  });

  return (
    <Styled.Root
      ref={inViewportRef}
      backgroundColor={backgroundColor}
      modifier={!backgroundColor && Styled.MODIFIERS.lessPadding}
      className={inViewport && ACTIVATE_ANIMATION_CLASS}
    >
      <Styled.Wrapper>
        <Styled.Quote>
          <Styled.Blockquote>
            <Styled.TextQuote color={quoteColor}>{quote}</Styled.TextQuote>
          </Styled.Blockquote>
          <ThemeProvider theme={{ color: attributionTextColor }}>
            {speaker && <Styled.Author>{speaker}</Styled.Author>}
            {companyOrRole && (
              <Styled.AuthorInfo>{companyOrRole}</Styled.AuthorInfo>
            )}
            {cta && (
              <Styled.Cta
                {...getLinkProps(cta.url)}
                overrideFunctionality={cta.overrideFunctionality}
              >
                {cta.title}
              </Styled.Cta>
            )}
          </ThemeProvider>
        </Styled.Quote>
      </Styled.Wrapper>
    </Styled.Root>
  );
};

Quote.propTypes = {
  /**
   * Text to be displayed as the Quote
   */
  quote: PropTypes.string.isRequired,
  /**
   * Quote's author
   */
  speaker: PropTypes.string,
  /**
   * Company/Role of the author
   */
  companyOrRole: PropTypes.string,
  /**
   * HEX color for the background
   */
  backgroundColor: PropTypes.string,
  /**
   * HEX color for the text quote
   */
  quoteColor: PropTypes.string,
  /**
   * HEX color for author's text info
   */
  attributionTextColor: PropTypes.string,
  /**
   * The optional CTA
   */
  cta: PropTypes.shape({}),
};

export default Quote;
