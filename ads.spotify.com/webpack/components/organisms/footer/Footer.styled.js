import styled, { css } from 'styled-components';

import { colors } from 'styles/variables';
import { minWidth } from 'styles/media-queries';
import { columnsGutter } from 'styles/grid';
import { Modal } from 'components/molecules/modal';
import { levels } from 'styles/z-index';

import { Cta, Eyebrow } from 'components/atoms';

export const Footer = styled.footer`
  background-color: ${colors.grey100};
  color: ${colors.white};
  margin-top: auto;
  padding-bottom: 8rem;
  padding-top: 4rem;
  z-index: ${levels.base};

  ${minWidth.lg`
    padding-bottom: 7.2rem;
    padding-top: 12rem;
  `}
`;

export const Content = styled.div`
  ${columnsGutter}

  ${minWidth.lg`
    -ms-grid-columns: 3fr 6fr 3fr;
    display: -ms-grid;
    display: grid;
    grid-template-columns: 3fr 6fr 3fr;
    margin-bottom: 15.4rem;
  `}
`;

export const LogoWrapper = styled.div`
  line-height: 0; // prevents extra whitespace around svg
`;

export const Logo = styled(Cta).attrs({ type: 'textlink' })`
  display: inline-block;
  margin-bottom: 4.5rem;

  /* ReactSVG adds extra div wrapper */
  div,
  svg {
    height: 3rem;
    width: 19.3rem;

    ${minWidth.lg`
      height: 4rem;
      width: 25.8rem;
  `}
  }

  svg {
    color: ${colors.white};
  }

  ${minWidth.lg`
    margin-bottom: 10rem;
  `}
`;

export const LocaleContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${minWidth.lg`
    flex-direction: row;
    align-items: center;
  `}
`;

export const CtaLocaleSelector = styled(Cta).attrs({
  tag: 'button',
  type: 'textLink',
})`
  align-items: center;
  color: ${colors.grey500};
  display: flex;
  flex-direction: row;
  margin-bottom: 1.6rem;
  text-decoration: none;

  ${minWidth.lg`
    margin-bottom: 0;
    margin-right: 3.2rem;
  `}

  &:hover {
    color: ${colors.grey500};
    text-decoration: underline;
  }
`;

export const CountryName = styled.span`
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

export const CountryFlag = styled.div`
  display: flex;
  height: 1.8rem;
  margin-right: 1.6rem;
  width: 2.4rem;

  & svg {
    flex: 1;
  }
`;

export const ModalLocales = styled(Modal)`
  padding-left: 2rem;
  padding-right: 2rem;

  ${minWidth.sm`
    padding-left: 4rem;
    padding-right: 4rem;
    border: 0.1rem solid ${colors.grey400}
  `}

  ${minWidth.md`
    width: 80%;
    max-width: 84.9rem;
    padding-left: 8rem;
    padding-right: 8rem;
  `}
`;

export const LinkCollectionContainer = styled.div`
  ${columnsGutter}

  ${minWidth.lg`
    -ms-grid-column: 2;
    -ms-grid-columns: 2fr 2fr 2fr;
    display: -ms-grid;
    display: grid;
    grid-template-columns: 2fr 2fr 2fr;
  `}
`;

export const LinkCollectionItem = styled.div`
  ${minWidth.lg`
    -ms-grid-column: ${props => props.index + 1};
  `}
`;

export const LinkCollectionTitle = styled(Eyebrow)`
  color: ${colors.grey500};
  display: block;
  margin-bottom: 2.2rem;

  ${minWidth.lg`
    font-size: 1.6rem;
    letter-spacing: 0.067rem;
    margin-bottom: 4.6rem;
  `}
`;

export const LinkCollection = styled.ul`
  margin-bottom: 4.2rem;

  &:last-child {
    margin-bottom: 3.9rem;
  }

  ${minWidth.lg`
    margin-bottom: 0;

    &:last-child {
      margin-bottom: 0;
    }
  `}
`;

export const LinkContainer = styled.li`
  margin-bottom: 0.8rem;

  &:last-child {
    margin-bottom: 0;
  }

  ${minWidth.lg`
    margin-bottom: 0.8rem;
  `}
`;

export const Link = styled(Cta).attrs({
  type: 'TextLink',
})`
  color: ${colors.white};
  text-decoration: none;

  &:hover {
    color: ${colors.white};
    text-decoration: underline;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  margin-bottom: 3.6rem;

  svg {
    color: ${colors.white};

    .social-icon {
      color: ${colors.white};
    }
  }

  ${minWidth.lg`
    -ms-grid-column: 3;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0;
  `}
`;

export const SocialLink = styled.a`
  margin-right: 2.4rem;
  max-height: 4rem;

  &:last-child {
    margin-right: 0;
  }
`;

export const Legal = styled.div`
  display: flex;
  flex-direction: column;

  ${minWidth.lg`
    -ms-grid-row: 2;
    flex-direction: row;
    grid-column: 1 / 4;
    justify-content: space-between;
  `}
`;

export const LegalLinksList = styled.ul`
  margin-bottom: 4.8rem;

  ${minWidth.lg`
    display: flex;
    margin-bottom: 0;
  `}
`;

export const LegalLinkItem = styled.li`
  ${minWidth.lg`
    margin-right: 4rem;

    &:last-child {
      margin-right: 0;
    }
  `}
`;

const legalStyles = css`
  color: ${colors.grey500};
  font-size: 1.6rem;
  letter-spacing: -0.033rem;
  line-height: 3.2rem;
  text-decoration: none;

  ${minWidth.lg`
    line-height: 1.6rem;
  `}
`;

export const LegalLink = styled(Cta).attrs({
  type: 'TextLink',
})`
  ${legalStyles}

  &:hover {
    color: ${colors.grey500};
    text-decoration: underline;
  }
`;

export const Copy = styled.span`
  ${legalStyles}
`;
