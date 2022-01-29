// ignore-string-externalization
import { loadTeams } from './api';
import { SWITCHER_STATE } from './constants';
import { Team } from './types';

type PromiseResolveType<T> = T extends Promise<infer U> ? U : T;

export function inferSelectedTeam(
  data: PromiseResolveType<ReturnType<typeof loadTeams>>,
): Team | null {
  if (data?.switcherState === SWITCHER_STATE.HIDE) {
    return data.teams[0];
  }
  return null;
}
