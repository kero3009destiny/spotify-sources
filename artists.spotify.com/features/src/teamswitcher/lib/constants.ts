// ignore-string-externalization
import { WEBGATE_DOMAIN } from '@mrkt/features/webgate-fetch';

export const TEAM_ENDPOINT = `${WEBGATE_DOMAIN}/s4x-me/v0/orgs`;

export enum SWITCHER_STATE {
  'LIST' = 'LIST',
  'HIDE' = 'HIDE',
}
