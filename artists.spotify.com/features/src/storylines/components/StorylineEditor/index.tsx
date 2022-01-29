import React, { useState, useLayoutEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Backdrop, ButtonTertiary, Type } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { useRtl } from '@mrkt/features/i18n/hooks/useRtl';

import { BlankCard } from '../BlankCard';
import {
  CARD_ANIMATION_DURATION,
  CARD_CHAR_LIMIT,
  CARD_COUNT_LIMIT,
} from '../../lib/constants';

import { StorylineEditorCard } from '../../lib/types';
import { createStorylineEditorCard } from '../../lib/helpers';
import { CarouselCard } from './CarouselCard';
import { EditorControls } from './EditorControls';
import { ImageEditor } from './ImageEditor';

import {
  AddCardButton,
  CardArea,
  CardAreaTop,
  CardCarousel,
  CarouselWrapper,
  Mat,
} from './styles';

type Props = {
  onChange: (cards: StorylineEditorCard[]) => void;
  onError: (errors: string[]) => void;
  cardIndex: number;
  cards: StorylineEditorCard[];
  setCardIndex: (cardIndex: number) => void;
  forceImageEditor?: boolean;
};

export function StorylineEditor(props: Props) {
  const [scrollTransition, setScrollTransition] = useState(false);
  const [cardLimitReached, setCardLimitReached] = useState(false);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const t = useT();
  const rtl = useRtl();

  useLayoutEffect(() => {
    if (props.forceImageEditor) {
      setShowImageEditor(true);
    }
  }, [props.forceImageEditor]);

  const onCancelImageEditor = () => {
    setShowImageEditor(false);
  };

  // Update the card with edited image and close the editor
  const onSaveImageEditor = (imageEditorCard: StorylineEditorCard) => {
    onCardUpdate(imageEditorCard);
    setShowImageEditor(false);
  };

  /*
    Creates an empty card with unique timestamp for react key.
  */
  const onAddCardClick = () => {
    // Enforce card creation limit
    if (props.cards.length === CARD_COUNT_LIMIT) {
      if (!cardLimitReached) {
        props.onError([
          t(
            'STORYLINES_MAX_CARDS_ERROR',
            'The maximum number of cards for a Storyline is {cardCountLimit}',
            'error message indicating the max number of cards limit',
            { cardCountLimit: CARD_COUNT_LIMIT },
          ),
        ]);
        setCardLimitReached(true);
      }
      return;
    }

    // Clear errors
    props.onError([]);
    setCardLimitReached(false);

    const newCard = createStorylineEditorCard();
    const combinedCards = props.cards.slice(0);

    // insert new card to the right of the current one
    if (props.cards.length) {
      combinedCards.splice(props.cardIndex + 1, 0, newCard);
    } else {
      combinedCards.push(newCard);
    }

    props.onChange(combinedCards);
    props.setCardIndex(Math.min(props.cardIndex + 1, combinedCards.length - 1));
  };

  const onCardUpdate = (card: StorylineEditorCard) => {
    const newCards = props.cards.slice(0);
    newCards.splice(props.cardIndex, 1, card);
    props.onChange(newCards);

    if (card.text.content && card.text.content.length >= CARD_CHAR_LIMIT) {
      props.onError([
        t(
          'STORYLINES_MAX_CHAR_ERROR',
          "You've reached the {cardCharLimit} character limit. Please add another card to continue typing.",
          'error message indicating character limit has been met',
          { cardCharLimit: CARD_CHAR_LIMIT },
        ),
      ]);
      return;
    }
    // Clear errors
    props.onError([]);
  };

  const onCardClick = (index: number) => {
    props.setCardIndex(index);
    setScrollTransition(true);
  };

  const onDeleteCardClick = () => {
    const newCards = [...props.cards];

    newCards.splice(props.cardIndex, 1);
    props.onChange(newCards);
    if (props.cardIndex >= newCards.length - 1) {
      props.setCardIndex(newCards.length - 1);
    }
  };

  const hasCards = props.cards.length > 0;

  const renderCardCarousel = () => {
    return (
      <CarouselWrapper className="encore-muted-accent-set">
        <CardArea>
          <CardAreaTop>
            <Type
              as="span"
              aria-label={t(
                'STORYLINES_CARD_INDICATOR1',
                'Current card indicator',
                'current card inidicator',
              )}
              weight="bold"
            >
              {`${props.cardIndex + 1} / ${props.cards.length}`}
            </Type>
            {props.cards.length > 1 && (
              <ButtonTertiary
                buttonSize={ButtonTertiary.sm}
                condensed
                data-testid="storyline--delete-card"
                data-slo-id="delete-storyline-card-button"
                onClick={onDeleteCardClick}
              >
                {t(
                  'STORYLINES_DELETE_CARD',
                  'Delete Card',
                  'delete card button',
                )}
              </ButtonTertiary>
            )}
          </CardAreaTop>
          <AddCardButton
            data-slo-id="add-storyline-card"
            aria-label={t(
              'STORYLINES_ADD_BLANK_CARD1',
              'Add blank card to Storyline',
              'add blank card button',
            )}
            role="button"
            onClick={onAddCardClick}
          />
        </CardArea>

        {!hasCards ? (
          <BlankCard
            text={t(
              'STORYLINES_ADD_BLANK_CARD2',
              'Add a card...',
              'add card button',
            )}
          />
        ) : (
          <>
            <CardCarousel
              currentCard={props.cardIndex + 1}
              scrollTransition={scrollTransition}
              rtl={rtl}
            >
              <TransitionGroup style={{ display: 'inherit' }}>
                {props.cards.map((card, i) => {
                  return (
                    <CSSTransition
                      key={card.key}
                      timeout={{
                        enter: 0,
                        exit: CARD_ANIMATION_DURATION,
                      }}
                    >
                      {(state: string) => (
                        <CarouselCard
                          key={card.key}
                          card={card}
                          active={i === props.cardIndex}
                          indexFromEnd={props.cards.length - i - 1}
                          transitionState={state}
                          onCardClick={() => onCardClick(i)}
                          onChange={onCardUpdate}
                        />
                      )}
                    </CSSTransition>
                  );
                })}
              </TransitionGroup>
            </CardCarousel>
          </>
        )}

        {!showImageEditor && (
          <EditorControls
            card={props.cards[props.cardIndex]}
            onChange={onCardUpdate}
            onFileError={props.onError}
          />
        )}
      </CarouselWrapper>
    );
  };

  const renderImageEditor = () => {
    return (
      <Backdrop center>
        <ImageEditor
          card={props.cards[props.cardIndex]}
          onCancel={onCancelImageEditor}
          onFileError={props.onError}
          onSave={onSaveImageEditor}
        />
      </Backdrop>
    );
  };

  return (
    <Mat>
      {renderCardCarousel()}

      {showImageEditor && renderImageEditor()}
    </Mat>
  );
}
