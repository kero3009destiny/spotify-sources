import React from 'react';
import { graphql } from 'gatsby';

import {
  ArticleToolQuery,
  ContentfulAsset,
  ContentfulCategoryTopic,
  ContentfulToolDownload,
  ContentfulToolExternalLink,
} from '../../../typings/graphql-types';
import { THEME_CLASSES } from '../../common/constants/colour-combinations';

import Shell from '../../components/app-shell';
import Head from '../../components/head';
import { ContentModule } from '../../components/articles/content-module';
import { HeroTools } from '../../components/articles/hero/tools';
import { Credits, CreditsCondensed } from '../../components/articles/credits';
import { Author, AuthorCondensed } from '../../components/articles/author';
import { Introduction } from '../../components/articles/introduction';
import { RelatedArticles } from '../../components/articles/related-articles';
import { NewsLetter } from '../../components/section-newsletter';
import { OnwardJourney } from '../../components/articles/onward-journey';
import { ArticleBase } from '../../components/articles/base';
import {
  sortArticlesByDate,
  formatArticleCardData,
  formatCuratedArticles,
} from '../../common/utils/stories';
import style from './article-long-form.module.css';
import journeyStyles from '../../components/articles/onward-journey/style.module.css';

interface Props {
  data: ArticleToolQuery;
  pageContext: {
    parentCategory?: string;
  };
}

const ArticleTool = ({ data, pageContext }: Props) => {
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
    <Shell theme={THEME_CLASSES.tools}>
      <Head
        title={articleData.title ? articleData.title : 'Stories'}
        description={articleData.excerpt ? articleData.excerpt : ''}
        socialImage={socialImage}
      />

      <HeroTools
        image={articleData?.heroImage as ContentfulAsset}
        topics={articleData?.topics as ContentfulCategoryTopic[]}
        heading={articleData?.title as string}
        publishDate={articleData?.publishDate}
        downloads={articleData?.toolDownload as ContentfulToolDownload[]}
        links={articleData?.toolExternalLink as ContentfulToolExternalLink[]}
      />

      <ArticleBase slug={articleData.slug}>
        <div className={`sd-container ${style.articleWrapper}`}>
          <div className={`sd-container-inner sd-grid ${style.article}`}>
            {articleData.authors && (
              <CreditsCondensed>
                {articleData.authors.map(author => (
                  <AuthorCondensed
                    key={author?.name}
                    name={author?.name}
                    headshot={author?.headshotBw}
                  />
                ))}

                {articleData.slug && (
                  <OnwardJourney
                    currentSlug={articleData.slug}
                    className={journeyStyles.first}
                  />
                )}
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

export default ArticleTool;

export const pageQuery = graphql`
  query ArticleTool($slug: String, $parentCategory: String) {
    articleData: contentfulArticleTool(slug: { eq: $slug }) {
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
        fluid(maxWidth: 960, quality: 96) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
      toolDownload {
        title
        filetype
        file {
          title
          file {
            url
          }
        }
      }
      toolExternalLink {
        title
        filetype
        link
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
        slug: { ne: "long-form-test" }
        topics: { elemMatch: { parentCategory: { eq: $parentCategory } } }
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
        slug: { nin: ["tool-test", $slug] }
        topics: { elemMatch: { parentCategory: { eq: $parentCategory } } }
      }
    ) {
      edges {
        ...FragmentArticleToolEdge
      }
    }
  }
`;
