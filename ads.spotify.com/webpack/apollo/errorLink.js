import { onError } from 'apollo-link-error';
import getConfig from 'next/config';

import get from 'lodash/get';
import isArray from 'lodash/isArray';
import unset from 'lodash/unset';

const UNRESOLVABLE_LINK = 'UNRESOLVABLE_LINK';
const { publicRuntimeConfig } = getConfig() || {};

const isAllowedEnvToFilterUnresolvableLinkNulls =
  publicRuntimeConfig.CONTENTFUL_ENVIRONMENT === 'master' ||
  publicRuntimeConfig.CONTENTFUL_ENVIRONMENT === 'staging';

const shouldRemoveUnresolvableLinkNulls =
  isAllowedEnvToFilterUnresolvableLinkNulls &&
  publicRuntimeConfig.CONTENTFUL_PREVIEW !== 'true';

export default onError(({ response, graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });

  if (response && response.errors) {
    if (shouldRemoveUnresolvableLinkNulls) {
      // Iterate through UNRESOLVABLE_LINK errors to remove null items from response.data
      response.errors
        .filter(
          el => get(el, 'extensions.contentful.code') === UNRESOLVABLE_LINK,
        )
        .forEach(({ path }) => {
          const parentPath = path.slice(0, -1);

          if (isArray(get(response.data, parentPath))) {
            // if parentPath is an array the last part of the path is an index
            const [index] = path.slice(-1);

            get(response.data, parentPath).splice(index, 1);
          } else {
            unset(response.data, path);
          }
        });
    }

    // Filter all UNRESOLVABLE_LINK errors
    response.errors = response.errors.filter(
      el => get(el, 'extensions.contentful.code') !== UNRESOLVABLE_LINK,
    );
  }

  if (networkError) console.error(`[Network error]: ${networkError}`);
});
