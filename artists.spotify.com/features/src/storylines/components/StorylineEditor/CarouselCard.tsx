import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useT } from '@mrkt/features/i18n';

import { StorylineEditorCard } from '../../lib/types';
import { Card } from '../Card';
import { CARD_ANIMATION_DURATION, CARD_PADDING } from '../../lib/constants';

import { EmptyCard } from './EmptyCard';
import { TextInput } from './TextInput';

const defaultStyle = (active: boolean) => {
  return transitionStyles(active).entered;
};

const transitionStyles = (active: boolean) => {
  type Styles = { [key: string]: React.CSSProperties };

  const styles: Styles = {
    entering: {
      opacity: active ? 1 : 0.5,
      transform: 'scale(0.8)',
    },
    entered: {
      opacity: active ? 1 : 0.5,
      transform: 'scale(1)',
    },
    exiting: {
      opacity: 0,
      transform: 'scale(0.8)',
    },
  };

  return styles;
};

const CardWrapper = styled.div<{ indexFromEnd: number; active: boolean }>`
  &:not(:last-child) {
    margin-right: ${CARD_PADDING}px;
  }
  opacity: 0;
  transition: opacity ${CARD_ANIMATION_DURATION}ms,
    transform ${CARD_ANIMATION_DURATION}ms;
  text-align: right;
`;

type Props = {
  card: StorylineEditorCard;
  active: boolean;
  indexFromEnd: number;
  transitionState: string;
  onCardClick: () => void;
  onChange: (card: StorylineEditorCard) => void;
};

export function CarouselCard({
  card,
  active,
  indexFromEnd,
  transitionState,
  onCardClick,
  onChange,
}: Props) {
  const onTextChange = useCallback(
    (content: string) => {
      const text = { ...card.text, content };
      onChange({ ...card, text });
    },
    [onChange, card],
  );

  const t = useT();

  return (
    <CardWrapper
      aria-label={t('STORYLINES_CARD', 'Storyline card', ' storyline card')}
      active={active}
      indexFromEnd={indexFromEnd}
      onClick={onCardClick}
      style={{
        ...defaultStyle(active),
        ...transitionStyles(active)[transitionState],
      }}
    >
      <TextInput textEditor={card.text} onChange={onTextChange} />
      {card.image.file ? <Card imageUrl={card.image.file} /> : <EmptyCard />}
    </CardWrapper>
  );
}
