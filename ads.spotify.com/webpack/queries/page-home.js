import { gql } from 'apollo-boost';

import { getLocalizedField } from 'utils/get-localized-field';
import { DYNAMIC_FRAGMENT_LITERALS } from 'queries/fragment-literals';
import {
  COMPONENT_FRAGMENTS,
  MODULE_FRAGMENTS,
  DYNAMIC_FRAGMENTS,
} from 'queries/fragments';

// -----------------------------------------------------------------------------
// Page Queries
const PAGE_HOME_QUERY = {
  body: ({ collection = 'pageHomeCollection' }) => gql`
    query HomePage($preview: Boolean = false, $homeSlug: String!) {
      ${collection}(
        preview: $preview
        where: { slug: $homeSlug }
        limit: 1
      ) {
        items {
          meta {
            ...MetaFields
          }
          hero {
            ...HeroFields
          }
          heroCarousel {
            ...HeroCarousel
          }
          heroDynamic {
            ...HeroDynamic
          }
          subhead
          introText
        }
      }
    }
    ${COMPONENT_FRAGMENTS.CTA}
    ${COMPONENT_FRAGMENTS.IMAGE}
    ${COMPONENT_FRAGMENTS.RESPONSIVE_IMAGE}
    ${COMPONENT_FRAGMENTS.META}
    ${COMPONENT_FRAGMENTS.HERO}
    ${COMPONENT_FRAGMENTS.HERO_CAROUSEL}
    ${COMPONENT_FRAGMENTS.HERO_DYNAMIC}
  `,
  modules: ({ collection = 'pageHomeCollection', locale = '' }) => gql`
    query HomePage($preview: Boolean = false, $homeSlug: String!) {
      ${collection}(
        preview: $preview
        where: { slug: $homeSlug }
        limit: 1
      ) {
        items {
          modulesCollection {
            items {
              ... on ModuleStatement {
                ${DYNAMIC_FRAGMENT_LITERALS.STATEMENT(
                  getLocalizedField(locale),
                )}
              }
              ... on ModuleAudio {
                ...Audio
              }
              ... on ModuleSpotifyPlayer {
                ...SpotifyPlayer
              }
              ... on ModuleFeatureCard {
                ...FeatureCard
              }
              ... on ModuleMarkdownText {
                ...MarkdownText
              }
              ... on ModuleCuratedListGroup {
                ${DYNAMIC_FRAGMENT_LITERALS.CURATED_LIST_GROUP(
                  getLocalizedField(locale),
                )}
              }
              ... on ModuleStats {
                ...Stats
              }
              ... on ModuleTopic {
                ...Topic
              }
              ... on ModuleTopicCarousel {
                ...TopicCarousel
              }
              ... on ModuleAdExperiences {
                ...AdExperiences
              }
              ... on ModuleChromeFeatureCard {
                ...ChromeFeatureCard
              }
            }
          }
        }
      }
    }
    ${DYNAMIC_FRAGMENTS.CURATED_LIST_PAGE_DETAIL(getLocalizedField(locale))}
    ${DYNAMIC_FRAGMENTS.CURATED_LIST_PAGE_LANDING(getLocalizedField(locale))}
    ${COMPONENT_FRAGMENTS.IMAGE}
    ${COMPONENT_FRAGMENTS.CTA}
    ${MODULE_FRAGMENTS.AUDIO}
    ${MODULE_FRAGMENTS.SPOTIFY_PLAYER}
    ${MODULE_FRAGMENTS.FEATURE_CARD}
    ${MODULE_FRAGMENTS.MARKDOWN_TEXT}
    ${MODULE_FRAGMENTS.STATS}
    ${MODULE_FRAGMENTS.TOPIC}
    ${MODULE_FRAGMENTS.TOPIC_CAROUSEL}
    ${MODULE_FRAGMENTS.AD_EXPERIENCES}
    ${MODULE_FRAGMENTS.CHROME_FEATURE_CARD}
  `,
};

export default PAGE_HOME_QUERY;
