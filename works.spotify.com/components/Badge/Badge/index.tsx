import { violet, aubergine, midnight } from '@spotify-internal/encore-web';
import { Avatar } from './Avatar';
import { Image } from './Image';

export type BadgeProps = {
  variant?: 'user' | 'songwriter' | 'publisher';
  /** This value will be shortened to the first character when rendered */
  initial?: string;
  bgColor?: string;
  imgSrc?: string;
};

const getBgColorDefault = ({ variant }: BadgeProps) => {
  switch (variant) {
    case 'user':
      return violet;
    case 'songwriter':
      return aubergine;
    case 'publisher':
      return midnight;
    default:
      return violet;
  }
};

export const Badge = ({ variant = 'user', initial, bgColor, imgSrc, ...props }: BadgeProps) => {
  const character = (initial && initial[0]) || undefined;
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
