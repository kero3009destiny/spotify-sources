import { dunderFetchHandler } from './utils/dunder';

import { SavedQuery } from 'types/common/state/api/savedQueries';

const BASE_PATH = 'com.spotify.ads.dunder.v1.SavedQueryService';
const GET_URI = 'GetSavedQueries';
const CREATE_URI = 'CreateSavedQuery';
const RESTORE_URI = 'RestoreSavedQuery';
const DELETE_URI = 'DeleteSavedQuery';

export async function getSavedQueries(iamDomain: string) {
  return dunderFetchHandler(GET_URI, BASE_PATH, {
    params: { iam_domain: iamDomain },
  });
}

export async function createSavedQueryRequest(savedQuery: SavedQuery) {
  return dunderFetchHandler(CREATE_URI, BASE_PATH, {
    savedQuery,
  });
}

export async function restoreSavedQueryRequest(
  savedQueryUuid: string,
  iamDomain: string,
) {
  return dunderFetchHandler(RESTORE_URI, BASE_PATH, {
    savedQueryUuid,
    iamDomain,
  });
}

export async function deleteSavedQueryRequest(
  savedQueryUuid: string,
  iamDomain: string,
) {
  return dunderFetchHandler(DELETE_URI, BASE_PATH, {
    savedQueryUuid,
    iamDomain,
  });
}
