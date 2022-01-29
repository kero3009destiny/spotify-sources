// ignore-string-externalization
import styled, { css } from 'styled-components';
import getColor from 'color';
import { Type, spacer12, white, black } from '@spotify-internal/encore-web-v3';

type Props = {
  avatarColor: string;
  variant: 'artist' | 'user' | 'label' | 'tool';
  character?: string;
};

const backgroundShape = ({ variant, avatarColor }: Props) => {
  switch (variant) {
    case 'user':
    case 'artist':
    default:
      return `url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2236%22%20height%3D%2236%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M18%2036c9.9411%200%2018-8.0589%2018-18%200-9.94113-8.0589-18-18-18C8.05887%200%200%208.05887%200%2018c0%209.9411%208.05887%2018%2018%2018z%22%20fill%3D%22${encodeURIComponent(
        avatarColor,
      )}%22%2F%3E%3C%2Fsvg%3E")`;
    case 'label':
      return `url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2236%22%20height%3D%2236%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M1.07618%207.09426C1.66028%204.105%203.9551%201.80897%206.94135%201.20967%209.92268.611366%2013.958%200%2018%200c4.1147%200%208.2296.633571%2011.2323%201.24196%202.9034.58827%205.1561%202.7855%205.7293%205.69193C35.4881%209.60339%2036%2013.2216%2036%2017.1998c0%204.1208-.5492%208.2452-1.095%2011.3267-.5597%203.1598-2.9771%205.6023-6.1271%206.2148C25.5925%2035.3606%2021.3523%2036%2017.4225%2036c-3.7446%200-7.48603-.5806-10.32308-1.1711-3.07617-.6403-5.37079-3.0936-5.92152-6.187C.603632%2025.4162%200%2021.0983%200%2017.1998c0-3.6687.534572-7.33373%201.07618-10.10554z%22%20fill%3D%22${encodeURIComponent(
        avatarColor,
      )}%22%2F%3E%3C%2Fsvg%3E")`;
    case 'tool':
      return `url("data:image/svg+xml,%3Csvg%20width%3D%2236%22%20height%3D%2236%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M34.0218914%209.9604218l1.857158%2010.2575394c.4931977%202.7240521-.5432843%205.4974298-2.7190134%207.2754286l-8.1928044%206.6951334c-2.1757291%201.7779987-5.1601602%202.2904982-7.8290869%201.3444448L7.0881822%2031.970562c-2.6689268-.9460534-4.6168758-3.2069316-5.1100736-5.9309838L.1209506%2015.7820388C-.372247%2013.0579867.664235%2010.284609%202.839964%208.5066102l8.1928044-6.6951334C13.2084975.0334781%2016.1929286-.4790214%2018.8618553.467032l10.0499625%203.562406c2.6689268.9460534%204.6168758%203.2069316%205.1100736%205.9309838z%22%20fill%3D%22${encodeURIComponent(
        avatarColor,
      )}%22%20fill-rule%3D%22evenodd%22%20%2F%3E%3C%2Fsvg%3E")`;
  }
};

export const Avatar = styled.div<Props>`
  align-items: center;
  background-image: ${({ variant, avatarColor }) =>
    backgroundShape({ variant, avatarColor })};
  background-repeat: no-repeat;
  background-size: contain;
  color: ${({ avatarColor }) =>
    getColor(avatarColor).isLight() ? black : white};
  display: flex;
  flex-shrink: 0;
  font-size: 10px;
  font-weight: ${Type.bold};
  height: 36px;
  justify-content: center;
  line-height: 10px;
  margin-right: ${spacer12};
  text-transform: uppercase;
  width: 36px;

  ${({ character }) =>
    character &&
    css`
      &::after {
        content: '${character}';
      }
    `}
`;
