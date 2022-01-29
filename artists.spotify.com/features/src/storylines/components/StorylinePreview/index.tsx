import React from 'react';
import styled from 'styled-components';

import { Type, spacer16 } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { useRtl } from '@mrkt/features/i18n/hooks/useRtl';
import { StorylineArtist, StorylineEntity } from '../../lib/types';
import { Card } from '../Card';
import {
  Preview,
  BreadcrumbWrapper,
  Breadcrumb,
  BreadcrumbText,
  StorylineWrapper,
  CardWrapper,
  CardButtonPrevious,
  CardButtonNext,
} from './styles';

const CardIndicator = styled.div`
  margin: ${spacer16} 0 0;
  z-index: 1;
`;

type Props = {
  artist: StorylineArtist;
  cardIndex: number;
  entity: StorylineEntity;
  images: string[];
  setCardIndex: (cardIndex: number) => void;
  showCardIndicator?: boolean;
  showFollow?: boolean;
};

export function StorylinePreview(props: Props) {
  const decrementCardIndex = () => {
    if (props.cardIndex > 0) {
      props.setCardIndex(props.cardIndex - 1);
    }
  };
  const incrementCardIndex = () => {
    if (props.cardIndex < props.images.length - 1) {
      props.setCardIndex(props.cardIndex + 1);
    }
  };

  const currentImage = props.images[props.cardIndex];

  const t = useT();
  const rtl = useRtl();
  const PrevButton = rtl ? CardButtonNext : CardButtonPrevious;
  const NextButton = rtl ? CardButtonPrevious : CardButtonNext;

  return (
    <Preview data-testid="storyline-preview">
      <StorylineWrapper>
        <PrevButton
          aria-label={t(
            'STORYLINES_SHOW_PREVIOUS',
            'Show previous Storyline card',
            'show previous card text',
          )}
          onClick={decrementCardIndex}
        />

        <CardWrapper rtl={rtl}>
          <BreadcrumbWrapper>
            <BreadcrumbText>
              {t('STORYLINES_BREADCRUMB', 'Storyline', 'storyline breadcrumb')}
            </BreadcrumbText>
            {props.images.map((_image, i) => (
              <Breadcrumb key={i} active={props.cardIndex >= i} />
            ))}
          </BreadcrumbWrapper>

          <Card
            artist={props.artist}
            imageUrl={currentImage}
            showFollow={props.showFollow}
          />
        </CardWrapper>

        <NextButton
          aria-label={t(
            'STORYLINES_NEXT_CARD',
            'Show next Storyline card',
            'show next storyline card',
          )}
          onClick={incrementCardIndex}
        />
      </StorylineWrapper>

      {props.showCardIndicator ? (
        <CardIndicator>
          <Type
            as="p"
            aria-label={t(
              'STORYLINES_CARD_INDICATOR2',
              'Current card indicator',
              'current card indicator',
            )}
          >
            <Type as="span" semanticColor="textBase">
              {props.cardIndex + 1}
            </Type>
            /{props.images.length}
          </Type>
        </CardIndicator>
      ) : null}
    </Preview>
  );
}
