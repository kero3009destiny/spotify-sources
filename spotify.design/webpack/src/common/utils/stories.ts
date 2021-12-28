import { FluidObject } from 'gatsby-image';
import { CardData } from '../../components/card';
import { TagData } from '../../components/tag';

import {
  FragmentArticleLongFormEdgeFragment,
  FragmentArticleSpotlightEdgeFragment,
  FragmentArticleThreeDesignersEdgeFragment,
  FragmentArticleToolEdgeFragment,
  ContentfulCategoryTopic,
  FragmentFeaturedSpotlightEdgeFragment,
} from '../../../typings/graphql-types';
import { Author } from '../../components/author-carousel';
import { ROUTE } from '../constants/routes';
import { PlaylistCardData } from '../../components/card/playlistCard';

type Articles =
  | FragmentArticleLongFormEdgeFragment[]
  | FragmentArticleSpotlightEdgeFragment[]
  | FragmentArticleThreeDesignersEdgeFragment[]
  | FragmentArticleToolEdgeFragment[]
  | { node: PlaylistCardData }[];

export function sortArticlesByDate(articles: Articles) {
  return articles.sort(
    (a, b) =>
      new Date(b.node.publishDate).getTime() -
      new Date(a.node.publishDate).getTime()
  );
}

export function formatTagData(
  topic: Pick<ContentfulCategoryTopic, 'title' | 'slug' | 'parentCategory'>
): TagData {
  const { title, parentCategory, slug } = topic;
  return {
    parentCategory: parentCategory || undefined,
    title: title ? title : '',
    href:
      slug && parentCategory
        ? `/${ROUTE.STORIES}/${parentCategory}/${slug}`
        : '',
  };
}

export function formatArticleCardData(
  articles: Articles,
  curatedArticles: CardData[] = []
): CardData[] {
  const cardData: CardData[] = [...curatedArticles];

  articles.forEach(item => {
    if (item.node.playlist) {
      const tags = [
        {
          title: 'Listen',
          href: `/${ROUTE.LISTEN}`,
        },
        ...item.node.tags,
      ];
      cardData.push({ ...item.node, tags });
    } else {
      const { title, excerpt, slug, topics, heroImage } = item.node;

      let tags: TagData[] = [];
      if (topics) tags = topics.map(formatTagData);

      cardData.push({
        title,
        description: excerpt,
        href: slug ? `/${ROUTE.ARTICLE}/${slug}` : null,
        tags,
        image: {
          src: heroImage?.fluid as FluidObject,
          alt: heroImage?.title,
        },
      });
    }
  });

  return cardData;
}

type CuratedArticles =
  | FragmentArticleLongFormEdgeFragment['node'][]
  | FragmentArticleSpotlightEdgeFragment['node'][]
  | FragmentArticleThreeDesignersEdgeFragment['node'][]
  | FragmentArticleToolEdgeFragment['node'][];

export function formatCuratedArticles(articles?: CuratedArticles) {
  if (!articles) {
    return;
  }

  return formatArticleCardData(articles.map(node => ({ node })));
}

export function formatHeroCardData(
  articles:
    | FragmentArticleLongFormEdgeFragment[]
    | FragmentArticleThreeDesignersEdgeFragment[]
    | FragmentArticleToolEdgeFragment[]
): CardData[] {
  const cardData: CardData[] = [];

  articles.forEach(item => {
    const { title, slug, topics, heroImage, alternativeHeroImage } = item.node;

    let tags: TagData[] = [];
    if (topics) tags = topics.map(formatTagData);

    const cardImage = alternativeHeroImage ? alternativeHeroImage : heroImage;

    cardData.push({
      title,
      href: slug ? `/${ROUTE.ARTICLE}/${slug}` : null,
      tags,
      image: {
        src: cardImage?.fluid as FluidObject,
        alt: cardImage?.title,
      },
    });
  });

  return cardData;
}

export function formatSpotlightCardData(
  articles: FragmentFeaturedSpotlightEdgeFragment[]
): Author[] {
  const cardData: Author[] = [];

  articles.forEach(item => {
    const { slug, personHero } = item.node;

    cardData.push({
      name: personHero?.name,
      location: personHero?.location,
      quote: personHero?.quote,
      jobTitle: personHero?.jobTitle,
      headshot: {
        image: personHero?.headshot?.fluid as FluidObject,
        alt: personHero?.headshot?.title,
      },
      articleUrl: slug ? `/${ROUTE.ARTICLE}/${slug}` : null,
    });
  });

  return cardData;
}
