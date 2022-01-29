import _taggedTemplateLiteral from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral";

var _templateObject;

// ignore-string-externalization
import { request, gql } from '@mrkt/features/graphql-client';
var query = gql(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  query GetArtistsByUris($ids: [String!]!) {\n    artists(ids: $ids) {\n      id\n      imageUrl\n      name\n      uri\n    }\n  }\n"])));
export function getArtistsByUris(variables) {
  return request(query, variables);
}