import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/get';
import lowerCase from 'lodash/lowerCase';
import { colors } from 'styles/variables';
import { TopicScroll } from 'components/molecules';
import { topicScrollProptypes } from 'components/molecules/topic-scroll/TopicScroll';
import * as Styled from './Topic.styled';

const THEME = {
  dark: colors.white,
  light: colors.black,
};

/**
 * Renders a Topic module
 * @param {string} backgroundColor The component background color.
 * @param {string} headlineColor The component headline color.
 * @param {boolean} theme True if the theme is light, false if it is dark.
 * @param {string} title The component title.
 * @param {string} topicScroll
 * @returns {ReactElement}
 */
const Topic = ({
  backgroundColor = '',
  headlineColor = '',
  theme,
  title = '',
  topicScroll,
  audioWithTranscript,
}) => {
  const textColor = useMemo(() => THEME[lowerCase(theme)], [theme]);
  const topicScrollEntries = get(
    topicScroll,
    'topicScrollEntriesCollection.items',
    [],
  );

  return (
    (audioWithTranscript || topicScrollEntries.length > 0) && (
      <Styled.Root backgroundColor={backgroundColor}>
        <Styled.Container>
          <Styled.Wrapper tabIndex={0}>
            {title && (
              <Styled.Title textColor={textColor}>{title}</Styled.Title>
            )}
          </Styled.Wrapper>
        </Styled.Container>
        {audioWithTranscript && (
          <Styled.AudioWithTranscript
            eyebrow={audioWithTranscript.eyebrow}
            title={audioWithTranscript.title}
            description={audioWithTranscript.description}
            audio={audioWithTranscript.audio}
            transcript={audioWithTranscript.transcript}
            cta={audioWithTranscript.cta}
            backgroundColor={backgroundColor}
            textColor={textColor}
            headlineColor={headlineColor}
            bottomSpacing={!topicScrollEntries.length}
          />
        )}
        {topicScrollEntries.length > 0 && (
          <TopicScroll
            entries={topicScrollEntries}
            headlineColor={headlineColor}
            textColor={textColor}
          />
        )}
      </Styled.Root>
    )
  );
};

Topic.propTypes = {
  /**
   * The component background color.
   */
  backgroundColor: PropTypes.string,
  /**
   * The component headline color.
   */
  headlineColor: PropTypes.string,
  /**
   * True if the theme is light, false if it is dark.
   */
  theme: PropTypes.string.isRequired,
  /**
   * The component title.
   */
  title: PropTypes.string,
  /**
   * The topic carousel entries
   */
  topicScroll: PropTypes.shape({
    topicScrollEntriesCollection: PropTypes.shape({
      items: topicScrollProptypes,
    }),
  }),
};

export default Topic;
