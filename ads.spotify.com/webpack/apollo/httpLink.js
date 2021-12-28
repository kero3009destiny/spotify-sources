import { createHttpLink } from 'apollo-link-http';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const SPACE = publicRuntimeConfig.CONTENTFUL_SPACE_ID;
const ENVIRONMENT = publicRuntimeConfig.CONTENTFUL_ENVIRONMENT;
const TOKEN = publicRuntimeConfig.CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/${ENVIRONMENT}`;
export default createHttpLink({
  fetch, // Switches between unfetch & node-fetch for client & server.
  uri: CONTENTFUL_URL,
  headers: {
    authorization: `Bearer ${TOKEN}`,
    'Content-Language': 'en-US',
  },
});
