import React from 'react';
import PropTypes, { any } from 'prop-types';
import { ThemeProvider } from 'styled-components';

import get from 'lodash/get';

import { Paragraph } from 'components/atoms';
import { KeyPoints } from 'components/molecules';
import { Container } from 'utils/container';
import { ACTIVATE_ANIMATION_CLASS } from 'styles/animations';
import useIsInViewport from 'utils/use-is-in-viewport/useIsInViewport';

import * as Styled from './Statement.styled';

const BAND_HEIGHT = {
  FIFTY_PERCENT: 50,
  THIRTY_FIVE_PERCENT: 35,
};

const HEADLINE_PIXEL_BREAKPOINTS = {
  sm: 48, // sm font-size
  lg: 208, // lg font-size
};

/**
 * Statement Module
 * @param {string} title Component title
 * @param {string} description Component description
 * @param {string} backgroundColor Component content background color
 * @param {string} introColor Title and description hex color
 * @param {string} statementColor Statement color
 * @param {string} statement Statement text
 * @param {Array} curatedLists Curated lists data
 * @param {Object} keyPoints Key points object data
 * @param {string|null} className The component class name.
 * @returns {ReactElement}
 */
const Statement = ({
  title,
  description,
  backgroundColor,
  introColor,
  statementColor,
  statement,
  curatedLists,
  keyPoints,
  className = null,
}) => {
  const [inViewport, inViewportRef] = useIsInViewport({
    pixelBreakpoints: HEADLINE_PIXEL_BREAKPOINTS,
  });
  const [leadCuratedListItem, curatedListItem] = curatedLists;
  const singleList =
    curatedLists.length === 1 && Styled.MODIFIERS.BOTTOM_SPACING;
  const oneUp = get(leadCuratedListItem, 'pagesCollection.items.length') === 1;

  return (
    <ThemeProvider theme={{ backgroundColor, introColor, statementColor }}>
      <Styled.Statement className={className}>
        <Styled.Content>
          <Container>
            <Styled.Grid>
              <Styled.IntroContainer>
                <Styled.IntroHeadline>{title}</Styled.IntroHeadline>
                <Paragraph>{description}</Paragraph>
              </Styled.IntroContainer>
              <Styled.StatementContainer ref={inViewportRef}>
                <Styled.Headline
                  className={inViewport && ACTIVATE_ANIMATION_CLASS}
                >
                  {statement}
                </Styled.Headline>
              </Styled.StatementContainer>
            </Styled.Grid>
          </Container>
        </Styled.Content>
        <Styled.LeadCuratedList
          data={leadCuratedListItem}
          modifier={singleList}
          displayTitle={false}
          beforeRender={() => (
            <Styled.Band
              color={backgroundColor}
              percentageHeight={
                oneUp
                  ? BAND_HEIGHT.FIFTY_PERCENT /* Covering happy path for One-up content height */
                  : BAND_HEIGHT.THIRTY_FIVE_PERCENT /* Covering happy path for Two-up and Three-up content height */
              }
            />
          )}
        />
        {curatedListItem && (
          <Styled.CuratedList data={curatedListItem} displayTitle={false} />
        )}
        {(!singleList || !oneUp) && (
          <Container>
            <hr />
          </Container>
        )}
        <KeyPoints
          title={keyPoints.title}
          description={keyPoints.description}
          bodyText={keyPoints.bodyText}
          ctasCollection={keyPoints.ctasCollection}
        />
      </Styled.Statement>
    </ThemeProvider>
  );
};

Statement.propTypes = {
  /**
   * Component title
   */
  title: PropTypes.string.isRequired,
  /**
   * Component description
   */
  description: PropTypes.string.isRequired,
  /**
   * Component content background color
   */
  backgroundColor: PropTypes.string.isRequired,
  /**
   * Title and description hex color
   */
  introColor: PropTypes.string.isRequired,
  /**
   * Statement color
   */
  statementColor: PropTypes.string.isRequired,
  /**
   * Statement text
   */
  statement: PropTypes.string.isRequired,
  /**
   * Curated lists data
   */
  curatedLists: PropTypes.arrayOf(any).isRequired,
  /**
   * Key points object data
   */
  keyPoints: PropTypes.objectOf(any).isRequired,
  /**
   * Default className prop
   */
  className: PropTypes.string,
};

export default Statement;
