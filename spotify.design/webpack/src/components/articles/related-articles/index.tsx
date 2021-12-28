import React from 'react';

import { CardData } from '../../card';
import { SummaryList } from '../../summary-list';
import { CardList } from '../../card-list';

import { STORIES_CATEGORIES } from '../../../common/constants/stories';

import style from './style.module.css';

export interface Props {
  hasCuratedContent: boolean;
  articles?: CardData[];
  category?: string;
  count?: number;
}

export const RelatedArticles = ({
  hasCuratedContent,
  articles,
  count,
  category,
}: Props) => {
  const activeCategory = STORIES_CATEGORIES.find(x => x.id === category);

  if (!articles || !activeCategory) return null;

  return (
    <div className="sd-container">
      <div className={`sd-container-inner ${style.root}`}>
        <SummaryList
          buttonUrl={`/${activeCategory.slug}`}
          heading={
            hasCuratedContent
              ? 'Next up'
              : `Our latest in ${activeCategory.title}`
          }
          buttonLabel={
            hasCuratedContent
              ? `Our latest in ${activeCategory.title}`
              : `View all ${activeCategory.title} stories`
          }
          trackingLabel="article"
        >
          <CardList cards={articles} count={count} className={style.cardGrid} />
        </SummaryList>
      </div>
    </div>
  );
};
