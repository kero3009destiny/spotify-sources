// ignore-string-externalization
import styled, { css } from 'styled-components';
import {
  Type,
  gray45,
  gray70,
  gray90,
  orange,
  spacer16,
  body2LineHeight,
} from '@spotify-internal/encore-web';

/**
  '#7F80FA' is a lighter / accessible version of Klein Blue meant for dark backgrounds.
  Follow along at https://ghe.spotify.net/encore/foundation/issues/29 for discussions on accessible dark themed color tokens.
*/
export const kleinBlueVariant = '#7F80FA';

export const isDarkTheme = (theme: { [key: string]: string | undefined }) =>
  theme.dialogConfirmation === 'dark' || theme.dialogFullScreen === 'dark';

export const TeamWrapper = styled.span<{ underlined?: boolean }>`
  cursor: default;
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  // button styles
  width: 100%;
  appearance: none;
  background: none;
  border: 0;
  box-shadow: 0;
  text-align: left;

  ${props =>
    props.underlined &&
    css`
      border-bottom: 1px solid ${gray90};
    `};
`;

export const Avatar = styled.span<{ background?: string }>`
  align-items: center;
  background: ${props => props.background || orange};
  border-radius: 50%;
  display: flex;
  flex-shrink: 0;
  height: 36px;
  justify-content: center;
  margin-right: 8px;
  overflow: hidden;
  position: relative;
  text-transform: uppercase;
  width: 36px;
`;

export const AvatarImage = styled.img`
  height: 100%;
  position: absolute;
  width: 100%;
`;

export const Text = styled.span`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  margin-right: ${spacer16};
  min-height: /* ensure the element has the same height with either one or two lines */ calc(
    2 * ${body2LineHeight}
  );
`;

export const Subtext = styled(Type)`
  color: ${props => (isDarkTheme(props.theme) ? gray70 : gray45)};
`;
