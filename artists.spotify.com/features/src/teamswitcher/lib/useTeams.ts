// ignore-string-externalization
import { stringify } from 'query-string';
import { createLoader, useRead } from '@spotify-internal/creator-data-loading';
import { webgateFetchJson } from '@mrkt/features/webgate-fetch';
import { TEAM_ENDPOINT } from './constants';
import { TeamResponse } from './types';

function getLoaderKey(
  resourceUri: string,
  action: string,
  params?: { [key: string]: string },
) {
  const normalizedParams = params ? `?${stringify(params)}` : '';
  return `${resourceUri}/${action}${normalizedParams}`;
}

export const teamsLoader = createLoader(async (path: string) => {
  const data: TeamResponse = await webgateFetchJson(`${TEAM_ENDPOINT}/${path}`);

  return {
    teams: data.teams,
    switcherState: data.switcher_state,
    user: data.user,
  };
});

/** For when useTeams can't be used because of conditional logic. */
export function getTeams(
  resourceUri: string,
  action: string,
  params?: { [key: string]: string },
) {
  return teamsLoader.load(getLoaderKey(resourceUri, action, params));
}

export function useTeams(
  resourceUri: string,
  action: string,
  params?: { [key: string]: string },
) {
  return useRead(teamsLoader, getLoaderKey(resourceUri, action, params));
}
