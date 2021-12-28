import React, { useContext } from 'react';
import { graphql } from 'gatsby';

import { HomepageQuery } from '../../typings/graphql-types';
import {
  formatArticleCardData,
  formatSpotlightCardData,
  sortArticlesByDate,
  formatHeroCardData,
} from '../common/utils/stories';
import { ROUTE } from '../common/constants/routes';
import { AppContext } from '../common/context.app';

import Head from '../components/head';
import Shell from '../components/app-shell';
import { HeavyRotation } from '../components/heavy-rotation';
import { SummaryList } from '../components/summary-list';
import { CardList } from '../components/card-list';
import { JobListing } from '../components/job-listing';
import { NewsLetter } from '../components/section-newsletter';
import { AuthorCarousel } from '../components/author-carousel';
import style from './index.module.css';
import { contentfulPlaylistToCard } from '../common/utils/player';

interface Props {
  data: HomepageQuery;
}

export const HOME_SECTION_IDS = {
  heavyRotation: 'highlighted-articles',
  newReleases: 'new-releases',
  inTheSpotlight: 'in-the-spotlight',
  toolsAndJobs: 'tools-and-jobs',
};

const IndexPage = ({ data }: Props) => {
  const {
    featuredTools,
    featuredJobs,
    featuredSpotlight,
    articlesLongForm,
    articlesThreeDesigners,
    articlesTool,
    allContentfulListenPlaylist,
    heroLongForm,
    heroThreeDesigners,
    heroTool,
  } = data;

  // hero articles
  const heroArticles = sortArticlesByDate([
    ...heroLongForm.edges,
    ...heroThreeDesigners.edges,
    ...heroTool.edges,
  ]);
  const heroArticlesCards = formatHeroCardData(heroArticles);

  const listenPlaylists = allContentfulListenPlaylist.edges.map((edge: any) => {
    return {
      node: contentfulPlaylistToCard(edge.node),
    };
  });

  // latest Articles
  const latestArticles = sortArticlesByDate([
    ...articlesLongForm.edges,
    ...articlesThreeDesigners.edges,
    ...articlesTool.edges,
    ...listenPlaylists,
  ]);
  const latestArticlesCards = formatArticleCardData(latestArticles);

  // featured Spotlight
  const featuredSpotlightCards = formatSpotlightCardData(
    featuredSpotlight.edges
  );

  // featured Tools
  const featuredToolsCards = formatArticleCardData(featuredTools.edges);

  const { isLoading } = useContext(AppContext);

  return (
    <Shell>
      <Head title="Home" />
      <h1 className="a11y-visually-hidden">Spotify Design</h1>

      <div className={style.contentWrapper}>
        <section
          id={HOME_SECTION_IDS.heavyRotation}
          className={style.sectionHeavyRotation}
        >
          <HeavyRotation articles={heroArticlesCards} />
        </section>

        <section
          id={HOME_SECTION_IDS.newReleases}
          className={`sd-container ${style.sectionNewReleases}`}
        >
          <div className="sd-container-inner">
            <SummaryList
              buttonUrl={`/${ROUTE.STORIES}`}
              heading="New Releases"
              buttonLabel="View all stories"
              trackingLabel="homepage"
            >
              <CardList
                cards={latestArticlesCards}
                count={4}
                className={`sd-grid ${style.latestList}`}
              />
            </SummaryList>
          </div>
        </section>

        {!isLoading && (
          <AuthorCarousel
            className={style.sectionSpotlight}
            authors={featuredSpotlightCards}
          />
        )}

        {!isLoading && <NewsLetter />}

        <section
          id={HOME_SECTION_IDS.toolsAndJobs}
          className={`sd-container ${style.sectionToolsAndJobs}`}
        >
          <div
            className={`sd-container-inner sd-grid ${style.sectionToolsAndJobsGrid}`}
          >
            <SummaryList
              heading="Tools"
              subheading="Our day-to-day resources"
              buttonUrl={`/${ROUTE.TOOLS}`}
              buttonLabel="View all tools"
              trackingLabel="homepage"
            >
              <CardList
                cards={featuredToolsCards}
                count={2}
                className={style.toolsList}
              />
            </SummaryList>

            <SummaryList
              heading="Jobs"
              subheading="Open roles at Spotify Design"
              buttonLabel="View Team"
              buttonUrl={`/${ROUTE.TEAM}`}
              trackingLabel="homepage"
            >
              {featuredJobs?.edges?.length > 0 && (
                <ul className={`unstyled-list ${style.jobsList}`}>
                  {featuredJobs.edges.map((jobListing, i) => (
                    <li key={i}>
                      <JobListing
                        job={jobListing.node}
                        trackingLabel="homepage"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </SummaryList>
          </div>
        </section>
      </div>
    </Shell>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query Homepage {
    articlesLongForm: allContentfulArticleLongForm(
      limit: 3
      sort: { order: DESC, fields: publishDate }
      filter: { slug: { ne: "long-form-test" } }
    ) {
      edges {
        ...FragmentArticleLongFormEdge
      }
    }
    articlesThreeDesigners: allContentfulArticleThreeDesigners(
      limit: 3
      filter: { slug: { ne: "3-designers-3-sentences-test" } }
      sort: { order: DESC, fields: publishDate }
    ) {
      edges {
        ...FragmentArticleThreeDesignersEdge
      }
    }
    articlesTool: allContentfulArticleTool(
      limit: 3
      filter: { slug: { ne: "tool-test" } }
      sort: { order: DESC, fields: publishDate }
    ) {
      edges {
        ...FragmentArticleToolEdge
      }
    }
    allContentfulListenPlaylist(
      limit: 3
      sort: { order: DESC, fields: publishdate }
    ) {
      edges {
        node {
          image {
            fluid(maxWidth: 960, quality: 96) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          spotifyUri
          title
          description
          publishdate
          genres {
            genre
            slug
          }
        }
      }
    }
    featuredSpotlight: allContentfulArticleSpotlight(
      sort: { order: DESC, fields: publishDate }
      filter: { slug: { ne: "spotlight-test" }, featureHomepage: { eq: true } }
    ) {
      edges {
        ...FragmentFeaturedSpotlightEdge
      }
    }
    featuredTools: allContentfulArticleTool(
      limit: 2
      sort: { order: DESC, fields: publishDate }
      filter: { slug: { ne: "tool-test" }, featureHomepage: { eq: true } }
    ) {
      edges {
        ...FragmentArticleToolEdge
      }
    }
    featuredJobs: allContentfulTeamVacancy(
      limit: 4
      sort: { order: DESC, fields: createdAt }
      filter: { featureHomepage: { eq: true } }
    ) {
      edges {
        node {
          id
          location
          url
          title
        }
      }
    }
    heroLongForm: allContentfulArticleLongForm(
      sort: { order: DESC, fields: publishDate }
      filter: {
        slug: { ne: "long-form-test" }
        featureHomepageHero: { eq: true }
      }
    ) {
      edges {
        ...FragmentArticleLongFormEdge
      }
    }
    heroThreeDesigners: allContentfulArticleThreeDesigners(
      sort: { order: DESC, fields: publishDate }
      filter: {
        slug: { ne: "3-designers-3-sentences-test" }
        featureHomepageHero: { eq: true }
      }
    ) {
      edges {
        ...FragmentArticleThreeDesignersEdge
      }
    }
    heroTool: allContentfulArticleTool(
      sort: { order: DESC, fields: publishDate }
      filter: { slug: { ne: "tool-test" }, featureHomepageHero: { eq: true } }
    ) {
      edges {
        ...FragmentArticleToolEdge
      }
    }
  }
`;
