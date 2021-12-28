import { gql } from 'apollo-boost';

import { USE_CONTENT_PREVIEW_FILTER } from 'constants/query';
import { getLocalizedField } from 'utils/get-localized-field';
import { DYNAMIC_FRAGMENT_LITERALS } from 'queries/fragment-literals';
import {
  COMPONENT_FRAGMENTS,
  MODULE_FRAGMENTS,
  DYNAMIC_FRAGMENTS,
} from 'queries/fragments';

const getLandingFilter = () =>
  USE_CONTENT_PREVIEW_FILTER
    ? `{
          OR: [
            { navigationTag: { slug: $tagSlug } }
            { navigationTag: { sys: { id: $tagSlug } } }
          ]
        }`
    : `{ navigationTag: { slug: $tagSlug } }`;

const PAGE_LANDING_QUERY = {
  body: ({
    collection = 'pageLandingCollection',
    filter = getLandingFilter(),
  }) => gql`
    query LandingPage($preview: Boolean = false, $tagSlug: String!) {
      ${collection}(
        preview: $preview
        where: ${filter}
        limit: 1
      ) {
        items {
          meta {
            ...MetaFields
          }
          pageIndexation
          hero {
            ...HeroFields
          }
          subhead
          introText
        }
      }
    }
    ${COMPONENT_FRAGMENTS.CTA}
    ${COMPONENT_FRAGMENTS.META}
    ${COMPONENT_FRAGMENTS.HERO}
    ${COMPONENT_FRAGMENTS.IMAGE}
  `,
  modules: ({
    collection = 'pageLandingCollection',
    locale = '',
    filter = getLandingFilter(),
  }) => gql`
    query LandingPage($preview: Boolean = false, $tagSlug: String!) {
      ${collection}(
        preview: $preview
        where: ${filter}
        limit: 1
      ) {
        items {
          modulesCollection {
            items {
              ... on ModuleCatalog {
                ...Catalog
              }
              ... on ModuleAudio {
                ...Audio
              }
              ... on ModuleCuratedListGroup {
                ${DYNAMIC_FRAGMENT_LITERALS.CURATED_LIST_GROUP(
                  getLocalizedField(locale),
                )}
              }
              ... on ModuleSpotifyPlayer {
                ...SpotifyPlayer
              }
              ... on ModuleFeatureCard {
                ...FeatureCard
              }
              ... on ModuleInlineForm {
                ...InlineForm
              }
              ... on ModuleTopicCarousel {
                ...TopicCarousel
              }
              ... on ModuleTopic {
                ...Topic
              }
              ... on ModuleLinkList {
                ...LinkList
              }
              ... on ModuleMarkdownText {
                ...MarkdownText
              }
              ... on ModuleVideo {
                ...Video
              }
              ... on ModuleInlineCard {
                ...InlineCard
              }
              ... on ModuleStats {
                ...Stats
              }
              ... on ModuleAdExperiences {
                ...AdExperiences
              }
              ... on ModuleAccordion {
                ...Accordion
              }
            }
          }
        }
      }
    }
    ${DYNAMIC_FRAGMENTS.CURATED_LIST_PAGE_DETAIL(getLocalizedField(locale))}
    ${DYNAMIC_FRAGMENTS.CURATED_LIST_PAGE_LANDING(getLocalizedField(locale))}
    ${COMPONENT_FRAGMENTS.CTA}
    ${COMPONENT_FRAGMENTS.IMAGE}
    ${MODULE_FRAGMENTS.CATALOG}
    ${MODULE_FRAGMENTS.AUDIO}
    ${MODULE_FRAGMENTS.SPOTIFY_PLAYER}
    ${MODULE_FRAGMENTS.FEATURE_CARD}
    ${MODULE_FRAGMENTS.INLINE_FORM}
    ${MODULE_FRAGMENTS.TOPIC_CAROUSEL}
    ${MODULE_FRAGMENTS.TOPIC}
    ${MODULE_FRAGMENTS.LINK_LIST}
    ${MODULE_FRAGMENTS.MARKDOWN_TEXT}
    ${MODULE_FRAGMENTS.VIDEO}
    ${MODULE_FRAGMENTS.INLINE_CARD}
    ${MODULE_FRAGMENTS.STATS}
    ${MODULE_FRAGMENTS.AD_EXPERIENCES}
    ${MODULE_FRAGMENTS.ACCORDION}
  `,
};

export default PAGE_LANDING_QUERY;
