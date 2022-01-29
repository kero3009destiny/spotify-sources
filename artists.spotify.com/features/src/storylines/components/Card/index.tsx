import React from 'react';
import styled, { css } from 'styled-components';
import { spacer8, spacer12 } from '@spotify-internal/encore-web';

import { AttributionLine } from '@mrkt/features/attributionline';
import { useT } from '@mrkt/features/i18n';
import { StorylineCard } from '../../lib/types';
import {
  CARD_ASPECT_RATIO,
  CARD_BORDER_RADIUS,
  DEFAULT_CARD_WIDTH,
} from '../../lib/constants';

export const CardStyles = css<{ width: number }>`
  height: ${props => props.width / CARD_ASPECT_RATIO}px;
  width: ${props => props.width}px;
  border-radius: ${CARD_BORDER_RADIUS}px;
`;

const CardWrapper = styled.div`
  position: relative;
  display: inline-block;
  user-select: none;
  vertical-align: bottom;
`;
const CardImage = styled.div<{ href: string; width: number }>`
  ${CardStyles}
  background-image: ${props => `url(${props.href})`};
  background-position: center;
  background-size: cover;
`;
const Attribution = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 100%;
`;
const FollowButton = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 10px;
  height: 24px;
  line-height: 24px;
  margin: ${spacer12};
  padding: 0 ${spacer8};
  text-transform: uppercase;
`;

type Props = StorylineCard & {
  showFollow?: boolean;
};
export function Card({
  artist,
  imageUrl,
  width = DEFAULT_CARD_WIDTH,
  showFollow,
}: Props) {
  const t = useT();
  return (
    <CardWrapper>
      <CardImage
        href={imageUrl}
        role="presentation"
        width={width}
        data-testid="card-image"
      />
      {width >= DEFAULT_CARD_WIDTH && artist && (
        <Attribution>
          <AttributionLine imageUrl={artist.imageUrl} text={artist.name} />
          {showFollow ? (
            <FollowButton>
              {t('STORYLINES_FOLLOW', 'Follow', 'follow button')}
            </FollowButton>
          ) : null}
        </Attribution>
      )}
    </CardWrapper>
  );
}
