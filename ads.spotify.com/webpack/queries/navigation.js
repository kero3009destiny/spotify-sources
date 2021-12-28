import { gql } from 'apollo-boost';

import { defaultLocale } from 'i18n/config';
import { DYNAMIC_COLLECTION_KEY } from 'constants/query';

export const DYNAMIC_COLLECTION = `navigation${DYNAMIC_COLLECTION_KEY}Collection`;

// -----------------------------------------------------------------------------
// Fragments
// Composable Module GraphQL fragments (eg. NavigationTag, Link)
const FRAGMENTS = {
  NAVIGATION_TAG: gql`
    fragment NavigationTag on NavigationTag {
      sys {
        id
      }
      title
      slug
    }
  `,
  LINK: gql`
    fragment Link on Link {
      title
      url
    }
  `,
  DROPDOWN: gql`
    fragment Dropdown on Dropdown {
      sys {
        id
      }
      rootLink {
        ... on NavigationTag {
          ...NavigationTag
        }
        ... on Link {
          ...Link
        }
      }
      subLinksCollection {
        items {
          sys {
            id
          }
          title
          url
        }
      }
    }
  `,
};

/**
 * Provides a query to fetch the Navigation content. Defaults to english.
 * @param {string} collection
 * @returns {Object} A query for the footer.
 */
const NAVIGATION_QUERY = (collection = 'navigationCollection') => gql`
  query Navigation($preview: Boolean = false, $slug: String!, $locale: String = "${defaultLocale.id}") {
    ${collection}(preview: $preview, locale: $locale, where: { slug: $slug }, limit: 1) {
      items {
        navigationItemsCollection {
          items {
            type: __typename
            ... on NavigationTag {
              ...NavigationTag
            }
            ... on Dropdown {
              ...Dropdown
            }
          }
        }
        ctasCollection(limit: 2) {
          items {
            title
            url
            type
            overrideFunctionality
          }
        }
      }
    }
  }
  ${FRAGMENTS.NAVIGATION_TAG}
  ${FRAGMENTS.LINK}
  ${FRAGMENTS.DROPDOWN}
`;

export { NAVIGATION_QUERY };
