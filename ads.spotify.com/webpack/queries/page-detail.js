import { gql } from 'apollo-boost';

import { USE_CONTENT_PREVIEW_FILTER } from 'constants/query';
import { getLocalizedField } from 'utils/get-localized-field';
import { DYNAMIC_FRAGMENT_LITERALS } from 'queries/fragment-literals';
import {
  COMPONENT_FRAGMENTS,
  MODULE_FRAGMENTS,
  DYNAMIC_FRAGMENTS,
} from 'queries/fragments';

const getDetailFilter = () =>
  USE_CONTENT_PREVIEW_FILTER
    ? `{
          OR: [
            { slug: $pageSlug, navigationTag: { slug: $tagSlug } }
            { slug: $pageSlug, navigationTag: { sys: { id: $tagSlug } } }
          ]
        }`
    : `{ slug: $pageSlug, navigationTag: { slug: $tagSlug } }`;

const PAGE_DETAIL_QUERY = {
  body: ({
    collection = 'pageDetailCollection',
    locale = '',
    filter = getDetailFilter(),
  }) => gql`
    query DetailPage(
      $preview: Boolean = false
      $tagSlug: String!
      $pageSlug: String!
    ) {
      ${collection}(
        preview: $preview
        where: ${filter}
        limit: 1
      ) {
        items {
          navigationTag {
            title
          }
          categoryTag {
            title
          }
          slug
          eyebrowOverride
          meta {
            ...MetaFields
          }
          pageIndexation
          hero {
            ...HeroFields
          }
          author {
            ...AuthorFields
          }
          publishDate
          introText
          relatedContent {
            ${DYNAMIC_FRAGMENT_LITERALS.CURATED_LIST(getLocalizedField(locale))}
          }
          recirculationModule {
            ${DYNAMIC_FRAGMENT_LITERALS.DYNAMIC_LANDING_RECIRCULATION_MODULE(
              getLocalizedField(locale),
            )}
          }
        }
      }
    }
    ${COMPONENT_FRAGMENTS.CTA}
    ${DYNAMIC_FRAGMENTS.CURATED_LIST_PAGE_DETAIL(getLocalizedField(locale))}
    ${DYNAMIC_FRAGMENTS.CURATED_LIST_PAGE_LANDING(getLocalizedField(locale))}
    ${COMPONENT_FRAGMENTS.META}
    ${COMPONENT_FRAGMENTS.HERO}
    ${COMPONENT_FRAGMENTS.AUTHOR}
    ${COMPONENT_FRAGMENTS.IMAGE}
  `,
  modules: ({
    collection = 'pageDetailCollection',
    filter = getDetailFilter(),
  }) => gql`
    query DetailPage(
      $preview: Boolean = false
      $tagSlug: String!
      $pageSlug: String!
    ) {
      ${collection}(
        preview: $preview
        where: ${filter}
        limit: 1
      ) {
        items {
          modulesCollection {
            items {
              ... on ModuleImage {
                ...Image
              }
              ... on ModuleAudio {
                ...Audio
              }
              ... on ModuleAccordion {
                ...Accordion
              }
              ... on ModuleVideo {
                ...Video
              }
              ... on ModuleQuote {
                ...Quote
              }
              ... on ModuleStats {
                ...Stats
              }
              ... on ModuleSpotifyPlayer {
                ...SpotifyPlayer
              }
              ... on ModuleMarkdownText {
                ...MarkdownText
              }
              ... on ModuleFeatureCard {
                ...FeatureCard
              }
              ... on ModuleTopicCarousel {
                ...TopicCarousel
              }
              ... on ModuleTopic {
                ...Topic
              }
              ... on ModuleInlineForm {
                ...InlineForm
              }
              ... on ModuleLinkList {
                ...LinkList
              }
              ... on ModuleHighlightedStatement {
                ...HighlightedStatement
              }
              ... on ModuleInlineCard {
                ...InlineCard
              }
            }
          }
        }
      }
    }
    ${COMPONENT_FRAGMENTS.CTA}
    ${COMPONENT_FRAGMENTS.IMAGE}
    ${MODULE_FRAGMENTS.IMAGE}
    ${MODULE_FRAGMENTS.AUDIO}
    ${MODULE_FRAGMENTS.ACCORDION}
    ${MODULE_FRAGMENTS.VIDEO}
    ${MODULE_FRAGMENTS.QUOTE}
    ${MODULE_FRAGMENTS.STATS}
    ${MODULE_FRAGMENTS.SPOTIFY_PLAYER}
    ${MODULE_FRAGMENTS.MARKDOWN_TEXT}
    ${MODULE_FRAGMENTS.FEATURE_CARD}
    ${MODULE_FRAGMENTS.TOPIC_CAROUSEL}
    ${MODULE_FRAGMENTS.TOPIC}
    ${MODULE_FRAGMENTS.INLINE_FORM}
    ${MODULE_FRAGMENTS.LINK_LIST}
    ${MODULE_FRAGMENTS.HIGHLIGHTED_STATEMENT}
    ${MODULE_FRAGMENTS.INLINE_CARD}
  `,
};

export default PAGE_DETAIL_QUERY;
