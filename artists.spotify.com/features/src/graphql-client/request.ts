// ignore-string-externalization
import { GraphQLClient } from 'graphql-request';
import { webgateFetch } from '@mrkt/features/webgate-fetch';

const endpoint = process.env.GRAPHQL_ENDPOINT || '/api/graphql';

export async function request<Data = unknown, Variables = any>(
  query: string,
  variables?: Variables,
) {
  const client = new GraphQLClient(endpoint, {
    fetch: webgateFetch,
  });

  return client.request<Data>(query, variables);
}
