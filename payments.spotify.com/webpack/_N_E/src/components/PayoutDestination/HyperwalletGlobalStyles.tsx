import { createGlobalStyle, css } from 'styled-components';
import {
  color,
  spacer12,
  spacer16,
  spacer24,
  spacer4,
  body1FontSize,
  body1LineHeight,
  body1LetterSpacing,
  body2FontSize,
  body2LineHeight,
  body2LetterSpacing,
  body2FontWeight,
  body3FontSize,
  spacer8,
  black,
} from '@spotify-internal/encore-web';

const subduedColor = '#878787';
const negativeColor = '#d31225';
const inputPadding = '14px';

const getBorderStyle = (borderWidth: number, borderColor: string) => {
  return css`
    box-shadow: inset 0 0 0 ${borderWidth}px ${borderColor};
  `;
};

const chevronSvg = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><polyline points='20 8 12 17 4 8' fill='none' stroke='#181818'></polyline></svg>",
);

const getTextStyles = (options: { size?: string; weight?: string; height?: string; spacing?: string } = {}) => {
  return css`
    font-family: spotify-circular, Helvetica, Arial, sans-serif;
    -webkit-tap-highlight-color: transparent;
    font-size: ${options.size ?? body2FontSize};
    line-height: ${options.height ?? body2LineHeight};
    letter-spacing: ${options.spacing ?? body2LetterSpacing};
    font-weight: ${options.weight ?? body2FontWeight};
  `;
};

const InputStyles = css`
  appearance: none;
  background-image: none;
  border: 0;
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin-top: 0;
  margin-bottom: 0;
  border-radius: ${spacer4};
  background-color: ${color.white};
  color: ${color.black};
  ${getBorderStyle(1, subduedColor)};
  ${getTextStyles({
    size: body1FontSize,
    height: body1LineHeight,
    spacing: body1LetterSpacing,
  })};

  &:focus {
    outline: 0;
  }
`;

// We are not able to use Encore for the Hyperwallet drop-in component so this styling
// is emulating the needed Encore components
export default createGlobalStyle`
  .hw-group {
    border: none;

    legend {
      display: none;
    }
  }

  .hw-global-errors {
    background: ${color.red100};
    text-align: left;
    border-radius: ${spacer4};
    margin: ${spacer16} 0;
    padding: ${spacer12} ${spacer16};
    display: flex;
    flex-direction: row;
    color: ${color.white};
    ${getTextStyles()};

    .hw-global-errors-list {
      list-style: none;
      padding: 0;
    }
  }

  .hw-form-group {
    padding-bottom: ${spacer24};

    &.hw-has-error {
      .hw-input, .hw-select {
        ${getBorderStyle(1, color.red100)};
      }

      .hw-input {
        &:hover {
          ${getBorderStyle(1, color.red100)};
        }

        &:focus {
          ${getBorderStyle(3, color.red100)};
        }
      }

      .hw-select {
        &:hover {
          ${getBorderStyle(1, color.red100)};
        }

        &:focus {
          ${getBorderStyle(1.5, color.red100)};
        }
      }
    }

    .hw-input {
      ${InputStyles};
      padding: ${inputPadding};

      &:hover {
        ${getBorderStyle(1, black)};
      }

      &:focus {
        ${getBorderStyle(3, black)};
      }
    }

    .hw-select {
      ${InputStyles};
      padding: ${inputPadding} 44px ${inputPadding} ${inputPadding};

      background-image: url("data:image/svg+xml;,${chevronSvg}");
      background-position: calc(100% - 20px);
      background-repeat: no-repeat;
      background-size: ${spacer16}, ${spacer16};

      &:hover {
        ${getBorderStyle(1, black)};
      }

      &:focus {
        ${getBorderStyle(1.5, black)};
      }
    }

    .hw-label {
      box-sizing: border-box;
      align-items: center;
      display: flex;
      width: 100%;
      padding-bottom: ${spacer8};
      ${getTextStyles({ weight: '700' })};
    }

    .hw-error-message {
      box-sizing: border-box;
      margin-top: ${spacer8};
      color: ${negativeColor};
      display: block;
      ${getTextStyles()};

      &::before {
        content: "X";
        display: inline-block;
        margin-right: 5px;
        font-size: ${body3FontSize};
      }
    }
  }

  // Hide the Hyperwallet submit button and then call it
  // programmatically when clicking the "Next" button
  .hw-button {
    display: none !important;
  }
`;
