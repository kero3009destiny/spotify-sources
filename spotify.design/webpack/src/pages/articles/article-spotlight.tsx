import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import {
  ArticleSpotlightQuery,
  ContentfulAsset,
  ContentfulCategoryTopic,
} from '../../../typings/graphql-types';
import { getArticleTheme } from '../../common/utils/articles';

import Shell from '../../components/app-shell';
import Head from '../../components/head';
import { HeroSpotlight } from '../../components/articles/hero/spotlight';
import { Credits, CreditsCondensed } from '../../components/articles/credits';
import { Author, AuthorCondensed } from '../../components/articles/author';
import { Introduction } from '../../components/articles/introduction';
import { formatRichText } from '../../components/articles/body';
import { RelatedArticles } from '../../components/articles/related-articles';
import { NewsLetter } from '../../components/section-newsletter';
import { OnwardJourney } from '../../components/articles/onward-journey';
import {
  sortArticlesByDate,
  formatArticleCardData,
  formatCuratedArticles,
} from '../../common/utils/stories';
import { SpotifyEmbed } from '../../components/articles/spotify-embed';
import style from './article-spotlight.module.css';
import { IMAGE_PLACEHOLDER_COLOR } from '../../common/constants';
import { ArticleBase } from '../../components/articles/base';

interface Props {
  data: ArticleSpotlightQuery;
  pageContext: {
    parentCategory?: string;
  };
}

const ArticleSpotlight = ({ data, pageContext }: Props) => {
  const {
    articleData,
    relatedLongForm,
    relatedSpotlight,
    relatedThreeDesigners,
    relatedTool,
  } = data;

  if (!articleData) return null;

  // related Articles
  const defaultRelatedArticles = sortArticlesByDate([
    ...relatedLongForm.edges,
    ...relatedSpotlight.edges,
    ...relatedThreeDesigners.edges,
    ...relatedTool.edges,
  ]);
  const curatedRelatedArticlesCards = formatCuratedArticles(
    articleData.relatedArticles
  );
  const relatedArticlesCards = formatArticleCardData(
    defaultRelatedArticles,
    curatedRelatedArticlesCards
  );
  const socialImage = articleData?.heroImage?.fluid?.src || undefined;

  return (
    <Shell theme={getArticleTheme(pageContext.parentCategory)}>
      <Head
        title={articleData.title ? articleData.title : 'Stories'}
        description={articleData.excerpt ? articleData.excerpt : ''}
        socialImage={socialImage}
      />

      <HeroSpotlight
        image={articleData?.heroImage as ContentfulAsset}
        topics={articleData?.topics as ContentfulCategoryTopic[]}
        heading={articleData?.title as string}
        publishDate={articleData?.publishDate}
      />

      <ArticleBase slug={articleData.slug}>
        <div className={`sd-container ${style.articleWrapper}`}>
          <div className={`sd-container-inner sd-grid ${style.article}`}>
            {articleData?.authors && (
              <CreditsCondensed>
                {articleData?.authors?.map(author => (
                  <AuthorCondensed
                    key={author?.name || undefined}
                    name={author?.name}
                    headshot={author?.headshotBw}
                  />
                ))}
              </CreditsCondensed>
            )}

            {articleData?.introduction?.introduction && (
              <Introduction body={articleData.introduction.introduction} />
            )}

            {articleData.playButtonWidget?.spotifyLink && (
              <SpotifyEmbed
                src={articleData.playButtonWidget.spotifyLink}
                podcast={articleData.playButtonWidget?.podcast}
              />
            )}

            <h2 className="a11y-visually-hidden">Questions & Answers</h2>
            {articleData?.questionAnswer?.map(({ question, answer, image }) => (
              <Fragment key={question?.question}>
                {question?.question && (
                  <h3 className={`t-heading-1 ${style.question}`}>
                    {question.question}
                  </h3>
                )}
                {image?.fluid?.src && (
                  <Img
                    fluid={image.fluid}
                    className={style.questionImage}
                    backgroundColor={IMAGE_PLACEHOLDER_COLOR}
                    alt={image.description || undefined}
                  />
                )}
                {answer?.json && (
                  <div className={style.answer}>
                    {formatRichText(answer.json)}
                  </div>
                )}
              </Fragment>
            ))}

            {articleData.slug && (
              <OnwardJourney show currentSlug={articleData.slug} />
            )}
            {articleData?.authors && (
              <Credits>
                {articleData.authors.map(author => (
                  <Author
                    key={author?.name}
                    name={author?.name}
                    bio={author?.bio?.bio}
                    link={author?.link}
                    headshot={author?.headshotBw}
                    jobTitle={author?.jobTitle}
                  />
                ))}
              </Credits>
            )}
          </div>
        </div>
      </ArticleBase>

      <RelatedArticles
        articles={relatedArticlesCards}
        count={4}
        category={pageContext.parentCategory}
        hasCuratedContent={!!curatedRelatedArticlesCards}
      />

      <NewsLetter />
    </Shell>
  );
};

export default ArticleSpotlight;

export const pageQuery = graphql`
  query ArticleSpotlight($slug: String, $parentCategory: String) {
    articleData: contentfulArticleSpotlight(slug: { eq: $slug }) {
      id
      title
      excerpt
      publishDate
      slug
      topics {
        title
        slug
        parentCategory
      }
      authors {
        ...FragmentAuthor
      }
      heroImage {
        description
        fluid(maxWidth: 800, quality: 96) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
      introduction {
        introduction
      }
      playButtonWidget {
        id
        spotifyLink
        podcast
      }
      questionAnswer {
        question {
          question
        }
        answer {
          json
        }
        image {
          description
          fluid(maxWidth: 800, quality: 96) {
            ...GatsbyContentfulFluid_withWebp_noBase64
          }
        }
      }
      relatedArticles {
        ... on ContentfulArticleLongForm {
          ...FragmentArticleLongFormNode
        }
        ... on ContentfulArticleSpotlight {
          ...FragmentArticleSpotlightNode
        }
        ... on ContentfulArticleTool {
          ...FragmentArticleToolNode
        }
        ... on ContentfulArticleThreeDesigners {
          ...FragmentArticleThreeDesignersNode
        }
      }
    }
    relatedLongForm: allContentfulArticleLongForm(
      limit: 4
      sort: { order: DESC, fields: publishDate }
      filter: {
        topics: { elemMatch: { parentCategory: { eq: $parentCategory } } }
        slug: { ne: "long-form-test" }
      }
    ) {
      edges {
        ...FragmentArticleLongFormEdge
      }
    }
    relatedSpotlight: allContentfulArticleSpotlight(
      limit: 4
      sort: { order: DESC, fields: publishDate }
      filter: {
        slug: { nin: ["spotlight-test", $slug] }
        topics: { elemMatch: { parentCategory: { eq: $parentCategory } } }
      }
    ) {
      edges {
        ...FragmentArticleSpotlightEdge
      }
    }
    relatedThreeDesigners: allContentfulArticleThreeDesigners(
      limit: 4
      sort: { order: DESC, fields: publishDate }
      filter: {
        slug: { ne: "3-designers-3-sentences-test" }
        topics: { elemMatch: { parentCategory: { eq: $parentCategory } } }
      }
    ) {
      edges {
        ...FragmentArticleThreeDesignersEdge
      }
    }
    relatedTool: allContentfulArticleTool(
      limit: 4
      sort: { order: DESC, fields: publishDate }
      filter: {
        slug: { ne: "tool-test" }
        topics: { elemMatch: { parentCategory: { eq: $parentCategory } } }
      }
    ) {
      edges {
        ...FragmentArticleToolEdge
      }
    }
  }
`;
