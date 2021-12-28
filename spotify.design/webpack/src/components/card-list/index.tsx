import React from 'react';
import { Card, CardData } from '../card';
import { PlaylistCard, PlaylistCardData } from '../card/playlistCard';

interface Props {
  cards: CardData[] | PlaylistCardData[];
  count?: number;
  className?: string;
}

export function CardList({ cards, count, className }: Props) {
  const selectedCards = cards && cards.length ? cards.slice(0, count) : [];

  return (
    <ul className={`unstyled-list ${className}`}>
      {selectedCards.map((card, index: number) => (
        <li key={index}>
          {'playlist' in card ? <PlaylistCard {...card} /> : <Card {...card} />}
        </li>
      ))}
    </ul>
  );
}

CardList.defaultProps = {
  count: 4,
  className: '',
};
