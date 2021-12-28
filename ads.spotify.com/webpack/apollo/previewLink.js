import { ApolloLink } from 'apollo-link';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { CONTENTFUL_PREVIEW },
} = getConfig();

export default new ApolloLink((operation, forward) => {
  if (CONTENTFUL_PREVIEW === 'true') {
    // eslint-disable-next-line no-param-reassign
    operation.variables.preview = true;
  }

  return forward(operation);
});
