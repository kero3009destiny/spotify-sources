import { gql } from 'apollo-boost';

import {
  COMPONENT_FRAGMENTS,
  DYNAMIC_FRAGMENTS,
  MODULE_FRAGMENTS,
} from 'queries/fragments';
import { getLocalizedField } from 'utils/get-localized-field';

const PAGE_DYNAMIC_LANDING = {
  body: ({
    collection = 'pageDynamicLandingCollection',
    locale = '',
    filter = '{ slug: $pageSlug }',
  }) => gql`
    query DynamicLandingPage($preview: Boolean = false, $pageSlug: String!) {
      ${collection}(
        preview: $preview
        where: ${filter}
        limit: 1
      ) {
        items {
          meta {
            ...MetaFields
          }
          eyebrow
          hero {
            ...DynamicTextIntro
          }
          pagesCollection {
            items {
              ... on PageDetail${getLocalizedField(locale)} {
                ...pageDetail
                timeRange
              }
            }
          }
        }
      }
    }
    ${DYNAMIC_FRAGMENTS.CURATED_LIST_PAGE_DETAIL(getLocalizedField(locale))}
    ${COMPONENT_FRAGMENTS.META}
    ${COMPONENT_FRAGMENTS.IMAGE}
    ${MODULE_FRAGMENTS.DYNAMIC_TEXT_INTRO}
  `,
  modules: ({
    collection = 'pageDynamicLandingCollection',
    filter = '{ slug: $pageSlug }',
  }) => gql`
    query DynamicLandingPage($preview: Boolean = false, $pageSlug: String!) {
      ${collection}(
        preview: $preview
        where: ${filter}
        limit: 1
      ) {
        items {
          modulesCollection {
            items {
              ... on ModuleDynamicSection {
                sys { id }
                title
                titleDetailText
                backgroundColor
                timeRange
              }
            }
          }
        }
      }
    }
  `,
};

export default PAGE_DYNAMIC_LANDING;
