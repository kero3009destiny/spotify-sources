import React from 'react';
import PropTypes, { any } from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { Headline, Paragraph, Cta } from 'components/atoms';
import { getLinkProps } from 'utils/get-link-props';
import { eventTrack, BODY_INLINE_CLICK } from 'utils/google-tag-manager';

import * as Styled from './RTE.styled';

/**
 * RTE: Rich Text Editor
 * @param {object} body Object with the contentful JSON metadata
 * @param {string} modifier A modifier to use for style overrides.
 * @param {function} onCtaClick function to add specific method to Cta
 * @returns {ReactElement}
 */
const RTE = ({ body, modifier, onCtaClick = () => {} }) => {
  const { json } = body;

  const onClickInlineCta = (event, href) => {
    eventTrack(BODY_INLINE_CLICK, { event, href });
    onCtaClick(event);
  };

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (_, children) => (
        <Headline tag="h1" styling="h1">
          {children}
        </Headline>
      ),
      [BLOCKS.HEADING_2]: (_, children) => (
        <Headline tag="h2" styling="h2">
          {children}
        </Headline>
      ),
      [BLOCKS.HEADING_3]: (_, children) => (
        <Headline tag="h3" styling="h3">
          {children}
        </Headline>
      ),
      [BLOCKS.HEADING_4]: (_, children) => (
        <Headline tag="h4" styling="h4">
          {children}
        </Headline>
      ),
      [BLOCKS.HEADING_5]: (_, children) => (
        <Headline tag="h5" styling="h5">
          {children}
        </Headline>
      ),
      [BLOCKS.HEADING_6]: (_, children) => (
        <Headline tag="h6" styling="h6">
          {children}
        </Headline>
      ),
      [BLOCKS.PARAGRAPH]: (_, children) => <Paragraph>{children}</Paragraph>,
      [INLINES.HYPERLINK]: ({ data }, children) => {
        const { uri } = data;
        const { href, asLink } = getLinkProps(uri);

        return (
          <Cta
            onClick={e => onClickInlineCta(e, asLink || href)}
            type="TextLink"
            href={href}
            asLink={asLink}
          >
            {children}
          </Cta>
        );
      },
    },
  };

  return (
    <ThemeProvider theme={{ modifier }}>
      <Styled.RTEWrapper>
        <Styled.RTEContainer>
          <Styled.RTE>{documentToReactComponents(json, options)}</Styled.RTE>
        </Styled.RTEContainer>
      </Styled.RTEWrapper>
    </ThemeProvider>
  );
};

RTE.propTypes = {
  /**
   * RTE Content
   */
  body: PropTypes.objectOf(any).isRequired,
  /**
   * The change styles modifier
   */
  modifier: PropTypes.string,
  /**
   * function to execute on CTAs
   */
  onCtaClick: PropTypes.func,
};

export default RTE;
