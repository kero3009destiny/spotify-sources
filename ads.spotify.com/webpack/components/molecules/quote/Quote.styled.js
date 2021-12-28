import styled, { css } from 'styled-components';

import { container, columnsGutter } from 'styles/grid';
import { minWidth } from 'styles/media-queries';
import { colors, fontWeights } from 'styles/variables';
import { Headline, Paragraph, Cta as CtaComponent } from 'components/atoms';
import { getModifierStyles } from 'utils/get-modifier-styles';
import {
  fadeContentSlideUp,
  ACTIVATE_ANIMATION_CLASS,
} from 'styles/animations';

// Modifier styles
const ROOT_LESS_PADDING = css`
  margin: 4rem auto; // for transparent background we are allowing collapsing margins as per designs
  padding-bottom: 0;
  padding-top: 0;

  ${minWidth.lg`
    margin: 8rem auto; // for transparent background we are allowing collapsing margins as per designs
    padding-bottom: 0;
    padding-top: 0;
  `}
`;

export const MODIFIERS = {
  lessPadding: 'lessPadding',
};

// Style modifier map
const STYLE_MAP = {
  Root: {
    [MODIFIERS.lessPadding]: ROOT_LESS_PADDING,
  },
};

export const Root = styled.div`
  background-color: ${props => props.backgroundColor || 'transparent'};
  padding-bottom: 8.8rem;
  padding-top: 7.2rem;

  ${minWidth.lg`
    padding-bottom: 16.8rem;
    padding-top: 15.2rem;
  `}

  ${props => props.modifier && getModifierStyles(props, STYLE_MAP.Root)}
`;

export const Wrapper = styled.div`
  ${container}
  ${columnsGutter}
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

export const Quote = styled.div`
  grid-column: 1 / 13;
  ${fadeContentSlideUp.setup}

  ${minWidth.lg`
    grid-column: 4 / 12;
  `}

  .${ACTIVATE_ANIMATION_CLASS} & {
    ${fadeContentSlideUp.play}
  }
`;

export const TextQuote = styled(Headline).attrs({
  tag: 'p',
  styling: 'h1',
})`
  color: ${props => props.color || colors.black};
  margin-bottom: 2.2rem;

  &::before {
    content: '\\201C'; // left double quotation mark
    display: block;
  }

  ${minWidth.lg`
    margin-bottom: 5.3rem;
  `}
`;

export const Author = styled(Paragraph)`
  color: ${props => props.theme.color || colors.black};
  font-weight: ${fontWeights.black};
  letter-spacing: -0.025rem;

  ${minWidth.lg`
    letter-spacing: -0.05rem;
  `}
`;

export const AuthorInfo = styled(Author)`
  font-weight: ${fontWeights.normal};
  letter-spacing: normal;

  ${minWidth.lg`
    letter-spacing: -0.05rem;
  `}
`;

export const Blockquote = styled.blockquote`
  margin: 0;
`;

export const Cta = styled(CtaComponent).attrs({
  type: 'textLink',
})`
  display: inline-block;
  color: ${props => props.theme.color || colors.black};
  margin-top: 1.6rem;

  ${minWidth.lg`
    margin-top: 2.4rem;
  `}
`;
