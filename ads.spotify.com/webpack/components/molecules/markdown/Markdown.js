import React, { useState, useEffect, useRef } from 'react';
import PropTypes, { any } from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Markdown from 'markdown-to-jsx';

import { Headline, Paragraph, Cta } from 'components/atoms';
import { getLinkProps } from 'utils/get-link-props';
import { eventTrack, BODY_INLINE_CLICK } from 'utils/google-tag-manager';

import * as Styled from './Markdown.styled';

const onClickInlineCta = (event, href) =>
  eventTrack(BODY_INLINE_CLICK, { event, href });

const getOptions = (params = {}) => ({
  overrides: {
    h1: ({ children }) => (
      <Headline tag="h1" styling="h1">
        {children}
      </Headline>
    ),
    h2: ({ children }) => (
      <Headline tag="h2" styling="h2">
        {children}
      </Headline>
    ),
    h3: ({ children }) => (
      <Headline tag="h3" styling="h3">
        {children}
      </Headline>
    ),
    h4: ({ children }) => (
      <Headline tag="h4" styling="h4">
        {children}
      </Headline>
    ),
    h5: ({ children }) => (
      <Headline tag="h5" styling="h5">
        {children}
      </Headline>
    ),
    h6: ({ children }) => (
      <Headline tag="h6" styling="h6">
        {children}
      </Headline>
    ),
    p: ({ children }) => <Paragraph>{children}</Paragraph>,
    a: ({ children, href, ...props }) => {
      const { tabIndex = 0 } = params;
      const { href: asHref, asLink } = getLinkProps(href);

      return (
        <Cta
          type="TextLink"
          onClick={e => onClickInlineCta(e, asLink || asHref)}
          href={asHref}
          asLink={asLink}
          tabIndex={tabIndex}
          {...props}
        >
          {children}
        </Cta>
      );
    },
    ul: ({ children }) => (
      <Styled.UnorderedLists oneColumn={children.length <= 3}>
        {children}
      </Styled.UnorderedLists>
    ),
    Footnote: ({ children }) => (
      <Styled.MarkdownFootnote>
        {React.Children.map(children, item =>
          typeof item === 'string' ? `${item.trim()}\n` : item,
        )}
      </Styled.MarkdownFootnote>
    ),
    Cta: ({ children, href, overrideFunctionality }) => {
      const { href: asHref, asLink } = getLinkProps(href);

      return (
        <Styled.CtaWrapper>
          <Styled.Cta
            type="Primary"
            href={asHref}
            asLink={asLink}
            overrideFunctionality={overrideFunctionality}
          >
            {children}
          </Styled.Cta>
        </Styled.CtaWrapper>
      );
    },
  },
});

/**
 * Markdown - A markdown renderer component.
 * @param {object} props
 * @param {string} props.className - Class to override current styles
 * @param {object} props.body - The markdown text to be rendered
 * @param {string} props.modifier - The change styles modifier
 * @param {object} props.params - Extra params to be used on overrides options
 * @returns {ReactElement}
 */
const MarkdownComponent = ({
  className = null,
  body = '',
  modifier = '',
  params,
  theme,
}) => {
  const themeRef = useRef({ modifier, theme });
  const [options, setOptions] = useState(getOptions(params));

  useEffect(() => setOptions(getOptions(params)), [params]);

  return (
    <ThemeProvider theme={themeRef.current}>
      <Styled.MarkdownWrapper className={className}>
        <Styled.MarkdownContainer>
          <Styled.Markdown>
            <Markdown options={options}>{body || ''}</Markdown>
          </Styled.Markdown>
        </Styled.MarkdownContainer>
      </Styled.MarkdownWrapper>
    </ThemeProvider>
  );
};

Markdown.propTypes = {
  /**
   * Class to override current styles
   */
  className: PropTypes.string,
  /**
   * The markdown text to be rendered
   */
  body: PropTypes.string,
  /**
   * The change styles modifier
   */
  modifier: PropTypes.string,
  /**
   * Extra params to be used on overrides options
   */
  params: PropTypes.arrayOf(any),
};

export default MarkdownComponent;
