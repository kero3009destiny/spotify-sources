import { css } from 'styled-components';
import { normalize } from 'styled-normalize';

import {
  cssGlobals,
  cssFragments,
  navHeight,
  colors,
  fontWeights,
} from './variables';
import { minWidth } from './media-queries';

const resetStyles = css`
  ${normalize}

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%; /* Relative font size. 1px -> 0.1rem */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body,
  button,
  figure,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  hr {
    margin: 0;
    padding: 0;
  }

  ul,
  ol {
    list-style: none;
  }

  button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /** Screen reader only. It's used to hide screen reader messages for presentation content like Logos, etc. */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /** Navigation fixed height */
  main,
  [role='main'] {
    margin-top: ${navHeight.smToLg + 0.1}rem;

    ${minWidth.md`
      margin-top: ${navHeight.mlUp + 0.1}rem;
    `}

    article > section > div:first-child,
    article > section > section:first-child {
      margin-top: 0;
    }
  }

  /* Optimize anti-flicker */
  body.${cssGlobals.antiFlicker} {
    opacity: 0;
  }

  /* hide reCAPTCHA badge */
  .grecaptcha-badge {
    visibility: hidden;
  }

  div[tabindex] {
    ${cssFragments.defaultFocusState}
  }

  .CompanySearchResults {
    background-color: ${colors.white};
    margin-top: -2rem;
    width: 100%;
  }

  .CompanySearchResults li {
    color: ${colors.black};
    cursor: pointer;
    padding: 1.6rem 2rem;

    div:first-child {
      font-weight: ${fontWeights.black};
    }
  }

  .CompanySearchResults .CompanySearchResults__selected {
    background-color: ${colors.grey600};

    div {
      font-weight: ${fontWeights.black};
    }
  }
`;

export default resetStyles;
