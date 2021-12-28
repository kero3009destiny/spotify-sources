import React, { Fragment } from 'react';
import { ContentfulCategoryTopic } from '../../../../typings/graphql-types';

interface Props {
  topics: ContentfulCategoryTopic[];
}

export const Topics = ({ topics }: Props) => {
  const categories = [...new Set(topics.map(topic => topic.parentCategory))];

  return categories.map((category, i) => {
    const needsSeparator = i < categories.length - 1;

    return (
      <Fragment key={category}>
        <span>
          {category}
          {needsSeparator ? ' ∙ ' : ' '}
        </span>
      </Fragment>
    );
  });
};
