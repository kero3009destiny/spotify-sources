import React, { useContext, useEffect, useState } from 'react';
import { useTrail, animated, config } from 'react-spring';
import { useStaticQuery, graphql, Link } from 'gatsby';

import { AppContext } from '../../../common/context.app';
import { ROUTE } from '../../../common/constants/routes';
import { sortArticlesByDate } from '../../../common/utils/stories';
import {
  FragmentArticleLongFormEdgeFragment,
  FragmentArticleSpotlightEdgeFragment,
  FragmentArticleThreeDesignersEdgeFragment,
  FragmentArticleToolEdgeFragment,
} from '../../../../typings/graphql-types';
import { IconShuffle, IconSkip } from '../../utilities/ui-icons';
import { CopyToClipboard } from '../../utilities/copy-to-clipboard';
import controlsStyle from '../../heavy-rotation/controls.module.css';
import style from './style.module.css';

type Article =
  | FragmentArticleLongFormEdgeFragment
  | FragmentArticleSpotlightEdgeFragment
  | FragmentArticleThreeDesignersEdgeFragment
  | FragmentArticleToolEdgeFragment;

export interface Props {
  className?: string;
  currentSlug?: string;
  show?: boolean;
}

const transform = (x: number): string => `translate3d(${x}px, 0, 0px)`;

export const OnwardJourney = ({ className, currentSlug, show }: Props) => {
  const { prefersReducedMotion } = useContext(AppContext);

  const data = useStaticQuery(graphql`
    query OnwardJourney {
      allContentfulArticleLongForm(filter: { slug: { ne: "long-form-test" } }) {
        edges {
          ...FragmentArticleLongFormEdge
        }
      }
      allContentfulArticleSpotlight(
        filter: { slug: { ne: "spotlight-test" } }
      ) {
        edges {
          ...FragmentArticleSpotlightEdge
        }
      }
      allContentfulArticleThreeDesigners(
        filter: { slug: { ne: "3-designers-3-sentences-test" } }
      ) {
        edges {
          ...FragmentArticleThreeDesignersEdge
        }
      }
      allContentfulArticleTool(filter: { slug: { ne: "tool-test" } }) {
        edges {
          ...FragmentArticleToolEdge
        }
      }
    }
  `);

  const [prevArticle, setPrevArticle] = useState<Article>();
  const [nextArticle, setNextArticle] = useState<Article>();
  const [randomArticle, setRandomArticle] = useState<Article>();

  useEffect(() => {
    const articles = sortArticlesByDate([
      ...data.allContentfulArticleLongForm.edges,
      ...data.allContentfulArticleSpotlight.edges,
      ...data.allContentfulArticleThreeDesigners.edges,
      ...data.allContentfulArticleTool.edges,
    ]);

    // get index of current article
    const currentIndex = articles.findIndex(o => o.node.slug === currentSlug);

    // previous article
    setPrevArticle(articles[currentIndex + 1]);

    // next article
    setNextArticle(articles[currentIndex - 1]);

    // random article
    setRandomArticle(articles[Math.floor(Math.random() * articles.length)]);
  }, []);

  const animation = useTrail(4, {
    opacity: 1,
    x: 0,
    from: { opacity: 0, x: -16 },
    config: show ? config.stiff : { tension: 300 },
    reverse: !show,
    immediate: prefersReducedMotion,
  });

  return (
    <div
      className={`sd-container sd-article-controls ${style.controls} ${className}`}
    >
      {prevArticle && (
        <animated.div
          style={{
            opacity: animation[0].opacity,
            transform: animation[0].x.interpolate(transform),
          }}
        >
          <Link
            to={`/${ROUTE.ARTICLE}/${prevArticle.node.slug}`}
            className={controlsStyle.button}
          >
            <IconSkip />
            <span
              aria-hidden="true"
              className={`t-ui-4 ${controlsStyle.label}`}
            >
              Previous article
            </span>
          </Link>
        </animated.div>
      )}
      {nextArticle && (
        <animated.div
          style={{
            opacity: animation[1].opacity,
            transform: animation[1].x.interpolate(transform),
          }}
        >
          <Link
            to={`/${ROUTE.ARTICLE}/${nextArticle.node.slug}`}
            className={controlsStyle.button}
          >
            <IconSkip rotation={180} />
            <span
              aria-hidden="true"
              className={`t-ui-4 ${controlsStyle.label}`}
            >
              Next article
            </span>
          </Link>
        </animated.div>
      )}
      {randomArticle && (
        <animated.div
          style={{
            opacity: animation[2].opacity,
            transform: animation[2].x.interpolate(transform),
          }}
        >
          <Link
            to={`/${ROUTE.ARTICLE}/${randomArticle.node.slug}`}
            className={controlsStyle.button}
          >
            <IconShuffle />
            <span
              aria-hidden="true"
              className={`t-ui-4 ${controlsStyle.label}`}
            >
              Shuffle articles
            </span>
          </Link>
        </animated.div>
      )}
      <animated.div
        style={{
          opacity: animation[3].opacity,
          transform: animation[3].x.interpolate(transform),
        }}
      >
        <CopyToClipboard />
      </animated.div>
    </div>
  );
};

OnwardJourney.defaultProps = {
  className: '',
};
