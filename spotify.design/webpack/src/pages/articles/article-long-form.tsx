import React from 'react';
import { graphql } from 'gatsby';

import {
  ArticleLongFormQuery,
  ContentfulAsset,
  ContentfulCategoryTopic,
} from '../../../typings/graphql-types';
import { getArticleTheme } from '../../common/utils/articles';

import Shell from '../../components/app-shell';
import Head from '../../components/head';
import { ContentModule } from '../../components/articles/content-module';
import { RelatedArticles } from '../../components/articles/related-articles';

import { OnwardJourney } from '../../components/articles/onward-journey';
import { Introduction } from '../../components/articles/introduction';
import { Author, AuthorCondensed } from '../../components/articles/author';
import { Credits, CreditsCondensed } from '../../components/articles/credits';
import { HeroLongForm } from '../../components/articles/hero/long-form';
import { NewsLetter } from '../../components/section-newsletter';
import { ArticleBase } from '../../components/articles/base';

import {
  formatArticleCardData,
  formatCuratedArticles,
  sortArticlesByDate,
} from '../../common/utils/stories';
import style from './article-long-form.module.css';

interface Props {
  data: ArticleLongFormQuery;
  pageContext: {
    parentCategory?: string;
  };
}

const ArticleLongForm = ({ data, pageContext }: Props) => {
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
      <HeroLongForm
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
                {articleData.authors?.map(author => (
                  <AuthorCondensed
                    key={author?.name}
                    name={author?.name}
                    headshot={author?.headshotBw}
                  />
                ))}
              </CreditsCondensed>
            )}

            {articleData?.introduction?.introduction && (
              <Introduction body={articleData.introduction.introduction} />
            )}

            {articleData.contentModules?.map((data, index: number) => (
              <ContentModule key={index} data={data} />
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

export default ArticleLongForm;

export const pageQuery = graphql`
  query ArticleLongForm($slug: String, $parentCategory: String) {
    articleData: contentfulArticleLongForm(slug: { eq: $slug }) {
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
        title
        fluid(maxWidth: 1000, quality: 96) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
      introduction {
        introduction
      }
      contentModules {
        ...FragmentContentModules
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
        slug: { nin: ["long-form-test", $slug] }
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
        slug: { ne: "spotlight-test" }
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
