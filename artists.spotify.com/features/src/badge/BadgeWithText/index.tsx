// ignore-string-externalization
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Badge, BadgeProps } from '../Badge';
import { Container } from './Container';
import { TextContainer } from './TextContainer';
import { Text } from './Text';
import { SecondaryText } from './SecondaryText';

type Props = BadgeProps & {
  text?: string;
  secondaryText?: string;
};

export const BadgeWithText = ({
  variant,
  text,
  initial,
  bgColor,
  secondaryText,
  imgSrc,
  ...props
}: Props) => {
  return (
    <Container {...props}>
      <Badge
        variant={variant}
        imgSrc={imgSrc}
        initial={initial || text}
        bgColor={bgColor}
      />
      <TextContainer>
        {text && <Text>{text}</Text>}
        {secondaryText && <SecondaryText>{secondaryText}</SecondaryText>}
      </TextContainer>
    </Container>
  );
};
