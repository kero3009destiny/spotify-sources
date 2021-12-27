import { getWebgateToken } from '@spotify-internal/adstudio-webgate-fetch';
import { com as CreateSavedQueryModel } from '@spotify-internal/dunder-client/models/com/spotify/ads/dunder/v1/CreateSavedQueryRequest';
import { com as DeleteSavedQueryModel } from '@spotify-internal/dunder-client/models/com/spotify/ads/dunder/v1/DeleteSavedQueryRequest';
import { com as GetReportSchedulingRequestModel } from '@spotify-internal/dunder-client/models/com/spotify/ads/dunder/v1/GetReportSchedulingRequest';
import { com as GetSavedQueryRequestModel } from '@spotify-internal/dunder-client/models/com/spotify/ads/dunder/v1/GetSavedQueriesRequest';

import { logTimeout } from 'api/webgate';

import { getEnvironmentConfig } from 'config/environment';

export type DeleteSavedQueryParams = DeleteSavedQueryModel.spotify.ads.dunder.v1.IDeleteSavedQueryRequest;
export type CreateSavedQueryParams = CreateSavedQueryModel.spotify.ads.dunder.v1.ICreateSavedQueryRequest;
export type GetSavedQueryParams = GetSavedQueryRequestModel.spotify.ads.dunder.v1.IGetSavedQueriesRequest;
export type GetReportSchedulingParams = GetReportSchedulingRequestModel.spotify.ads.dunder.v1.IGetReportSchedulingRequest;
export type DunderParams =
  | GetSavedQueryParams
  | CreateSavedQueryParams
  | DeleteSavedQueryParams
  | GetReportSchedulingParams;

export async function dunderFetch(
  url: string,
  basePath: string,
  params: DunderParams,
): Promise<Response> {
  const token = await getWebgateToken();
  const edgeProxyHost = await getEnvironmentConfig('edgeProxyHost');
  try {
    return await fetch(`${edgeProxyHost}/${basePath}/${url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
  } catch (e) {
    logTimeout(e);
    throw e;
  }
}

export function dunderFetchHandler(
  url: string,
  basePath: string,
  params: DunderParams,
) {
  return dunderFetch(url, basePath, params)
    .then(r =>
      r.json().then(data =>
        r.ok
          ? data
          : Promise.reject({
              headers: r.headers,
              ok: r.ok,
              redirect: r.redirected,
              status: r.status,
              statusText: r.statusText,
              type: r.type,
              url: r.url,
              errorDetails: data,
            }),
      ),
    )
    .catch(e => Promise.reject(e));
}
