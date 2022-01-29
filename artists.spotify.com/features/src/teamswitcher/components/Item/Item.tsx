// ignore-string-externalization
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import {
  Type,
  IconCheckAltActive,
  usePrimaryColor,
  kleinBlue,
} from '@spotify-internal/encore-web';
import {
  Avatar,
  AvatarImage,
  isDarkTheme,
  kleinBlueVariant,
  Subtext,
  TeamWrapper,
  Text,
} from './styled';

export type Props = {
  name: string;
  subtext?: string;
  imageUrl?: string;
  checked?: boolean;
  seperated?: boolean;
  selectable?: boolean;
  onClick?: (event?: React.MouseEvent<HTMLSpanElement>) => void;
};

export function Item(props: Props) {
  const primaryColor = usePrimaryColor();
  const themeContext = useContext(ThemeContext);
  const iconColor =
    primaryColor === kleinBlue && isDarkTheme(themeContext)
      ? kleinBlueVariant
      : primaryColor;

  return (
    <TeamWrapper
      as={props.selectable ? 'button' : undefined}
      underlined={props.seperated}
      onClick={props.onClick}
      data-testid="teamswitcher-team-item"
      data-slo-id="teamswitcher-team-item"
    >
      <Avatar>
        {props.imageUrl && <AvatarImage src={props.imageUrl} alt="" />}
      </Avatar>
      <Text>
        <Type weight={Type.bold}>{props.name}</Type>
        {props.subtext && <Subtext>{props.subtext}</Subtext>}
      </Text>
      {props.checked && (
        <IconCheckAltActive
          color={iconColor}
          iconSize={24}
          data-testid="teamswitcher-item--checked"
        />
      )}
    </TeamWrapper>
  );
}
