import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import errorLink from './errorLink';
import previewLink from './previewLink';
import httpLink from './httpLink';

const link = ApolloLink.from([errorLink, previewLink, httpLink]);

/**
 * Suppresses Apollo warnings in console by passing in an empty schema object.
 * https://github.com/apollographql/apollo-client/issues/3397
 */
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [],
    },
  },
});

export default withApollo(
  // You can get headers and ctx (context) from the callback params
  // e.g. ({ headers, ctx, initialState })
  ({ initialState }) =>
    new ApolloClient({
      link,
      cache: new InMemoryCache({ fragmentMatcher })
        // Rehydrates the cache using the initial data passed from the server:
        .restore(initialState || {}),
    }),
);
