import { AdStudioBffAdAccountService } from '@spotify-internal/adstudio-bff-clients/clients/AdStudioBffAdAccountService';
import { com as GetSuperUserResponseRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetSuperUserResponse';
import { Empty } from '@spotify-internal/adstudio-bff-clients/models/google/protobuf/Empty';
import {
  protoFetch as globalProtoFetch,
  webgateFetch as globalWebgateFetch,
} from '@spotify-internal/adstudio-webgate-fetch';

import { getBffWegbateClientConfig } from './utils/getBeClientConfig';

export type GetSuperUserResponse = GetSuperUserResponseRoot.spotify.adstudiobff.proto.GetSuperUserResponse;

const PARTNER_USERID_WEBGATE_HOST = 'https://spclient.wg.spotify.com';
const SPOTIFY_WEB_API = 'https://api.spotify.com/v1';

export async function getUserInfo(): Promise<TSFixMe> {
  return globalWebgateFetch(`${SPOTIFY_WEB_API}/me`).then((r: Response) => {
    if (!r.ok) return Promise.reject(r.statusText);
    return r.json();
  });
}

export function getPartnerId(partner: string): Promise<string> {
  const url = `${PARTNER_USERID_WEBGATE_HOST}/partner-userid/encrypted/${partner}`;
  return globalWebgateFetch(url).then((r: Response) => {
    if (!r.ok) return Promise.reject(r.statusText);
    return r.text();
  });
}

export async function getSuperUser(): Promise<GetSuperUserResponse> {
  const config = await getBffWegbateClientConfig();
  const client = new AdStudioBffAdAccountService(globalProtoFetch, config);
  return client.getSuperUserPermissions(new Empty().toObject());
}
