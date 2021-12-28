import { gql } from 'apollo-boost';

import { DYNAMIC_COLLECTION_KEY } from 'constants/query';

export const DYNAMIC_COLLECTION = `footer${DYNAMIC_COLLECTION_KEY}Collection`;

/**
 * Provides a query to fetch the Footer content. Defaults to english.
 * @param {string} collection
 * @returns {Object} A query for the footer.
 */
const FOOTER_QUERY = (collection = 'footerCollection') => gql`
  query Footer($preview: Boolean = false, $slug: String!) {
    ${collection}(preview: $preview, where: { slug: $slug }, limit: 1) {
      items {
        legalLinksCollection {
          items {
            title
            url
          }
        }
        socialLinksCollection {
          items {
            title
            url
          }
        }
        linkGroupsCollection {
          items {
            title
            linksCollection {
              items {
                title
                url
              }
            }
          }
        }
      }
    }
  }
`;

export { FOOTER_QUERY };
