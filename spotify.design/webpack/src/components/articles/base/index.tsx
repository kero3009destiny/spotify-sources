import React, { useCallback, useState } from 'react';
import { ScrollProgress } from '../../utilities/scroll-progress';
import { OnwardJourney } from '../onward-journey';
import styles from '../onward-journey/style.module.css';

interface Props {
  children: React.ReactNode;
  slug?: string;
  hideControls?: boolean;
}

export const ArticleBase = ({ children, hideControls, slug }: Props) => {
  const [isReadingArticle, setIsReadingArticle] = useState(false);

  const handleOnArticle = useCallback(
    (readingArticle: boolean) => {
      if (isReadingArticle !== readingArticle) {
        setIsReadingArticle(readingArticle);
      }
    },
    [isReadingArticle, setIsReadingArticle]
  );

  return (
    <>
      <h2 className="a11y-visually-hidden">Article</h2>

      <ScrollProgress scrollingThroughArticle={handleOnArticle}>
        {children}
        {!hideControls && slug && (
          <OnwardJourney
            currentSlug={slug}
            className={styles.sticky}
            show={isReadingArticle}
          />
        )}
      </ScrollProgress>
    </>
  );
};
