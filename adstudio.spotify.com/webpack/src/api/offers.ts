import { AdStudioBffOffersService } from '@spotify-internal/adstudio-bff-clients/clients/AdStudioBffOffersService';
import { GetAvailableOffersRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetAvailableOffersRequest';

import { OffersResponsePayload } from 'ducks/offers/types';

import { protoFetchWithLogging } from 'api/webgate';

import { getEdgeProxyClientConfig } from './utils/getBeClientConfig';

export async function getAvailableOffers(
  adAccountId: string,
): Promise<OffersResponsePayload> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffOffersService(protoFetchWithLogging, config);
  const request = new GetAvailableOffersRequest().setAdAccountId(adAccountId);

  return client.getAvailableOffers(request);
}
