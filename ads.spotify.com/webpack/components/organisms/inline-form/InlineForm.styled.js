import styled from 'styled-components';

import { container, columnsGutter } from 'styles/grid';
import { minWidth } from 'styles/media-queries';
import { caption } from 'styles/typography';
import { colors, fontWeights } from 'styles/variables';
import { Headline, Icon } from 'components/atoms';
import { Field as FieldComponent } from 'components/molecules/field';
import { ReCaptchaText as ReCaptchaTextComponent } from 'components/molecules/re-captcha-text';

export const Root = styled.div`
  ${container}
  ${columnsGutter}

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin: 3.2rem auto;

  ${minWidth.lg`
    margin: 6.4rem auto;
  `}
`;

export const Container = styled.div`
  background-color: ${colors.grey800};
  grid-column: span 12;
  padding: 1.6rem 1.6rem 2.4rem;

  ${minWidth.lg`
    grid-column: 4 / span 6;
    padding: 3.2rem 3.2rem 4rem;
  `}
`;

export const Title = styled(Headline).attrs({
  tag: 'h4',
  styling: 'Display4',
})`
  font-weight: ${fontWeights.black};
  letter-spacing: -0.025rem;
  margin-bottom: 1.6rem;

  ${minWidth.lg`
    letter-spacing: -0.005rem;
    margin-bottom: 2.4rem;
  `};
`;

export const FieldContainer = styled.div`
  margin-bottom: 1.6rem;

  ${minWidth.lg`
    margin-bottom: 2.4rem;
  `};
`;

export const Field = styled(FieldComponent)`
  input {
    ${minWidth.lg`
      padding-bottom: 1rem;
    `};
  }
`;

export const CtaContainer = styled.div`
  display: block;
`;

export const Disclaimer = styled.span`
  ${caption}
  color: ${colors.grey300};
  display: block;
  font-weight: ${fontWeights.normal};
  margin-top: 1.6rem;

  ${minWidth.lg`
    margin-top: 2.4rem;
  `};
`;

export const Error = styled.div`
  align-items: center;
  color: ${colors.errorRed};
  display: flex;
  font-size: 1.4rem;
  line-height: 1.6rem;
  margin-top: 2.4rem;

  ${minWidth.lg`
    font-size: 1.6rem;
    line-height: 2.4rem;
    margin-top: 3.4rem;
  `}
`;

export const ErrorIcon = styled(Icon).attrs({
  color: colors.errorRed,
})`
  height: 1.6rem;
  width: 1.6rem;

  svg,
  div {
    height: inherit;
    width: inherit;
  }

  ${minWidth.lg`
    height: 2.4rem;
    width: 2.4rem;
  `}
`;

export const ErrorCopy = styled.p`
  margin-left: 0.8rem;
`;

export const ReCaptchaText = styled(ReCaptchaTextComponent)`
  margin-bottom: 3.2rem;
`;
