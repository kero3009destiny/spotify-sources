// ignore-string-externalization
import React from 'react';
import { violet, forest, tangerine, blue } from '@spotify-internal/encore-web';
import { Avatar } from './Avatar';
import { Image } from './Image';

export type BadgeProps = {
  variant?: 'user' | 'artist' | 'label' | 'tool';
  /** This value will be shortened to the first character when rendered */
  initial?: string;
  bgColor?: string;
  imgSrc?: string;
  circle?: boolean | undefined;
};

const getBgColorDefault = ({ variant }: BadgeProps) => {
  switch (variant) {
    case 'user':
      return violet;
    case 'artist':
      return forest;
    case 'label':
      return blue;
    case 'tool':
      return tangerine;
    default:
      return violet;
  }
};

export const Badge = ({
  variant = 'user',
  initial,
  bgColor,
  imgSrc,
  ...props
}: BadgeProps) => {
  const character =
    (initial && String.fromCodePoint(initial.codePointAt(0)!)) || undefined;
  const bgColorDefault = getBgColorDefault({ variant });

  /*
     If imgSrc is set, return the image in a circle shape.
     If not, return appropriate generic badge with first character.
  */

  if (imgSrc) {
    return <Image src={imgSrc} {...props} />;
  }

  return (
    <Avatar
      variant={variant}
      avatarColor={bgColor || bgColorDefault}
      character={character}
      {...props}
    />
  );
};
