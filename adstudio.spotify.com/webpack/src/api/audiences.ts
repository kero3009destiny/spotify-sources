import { AdStudioBffAudienceSegmentsService } from '@spotify-internal/adstudio-bff-clients/clients/AdStudioBffAudienceSegmentsService';
import { CreateAudienceRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CreateAudienceRequest';
import { CreateAudienceResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CreateAudienceResponse';
import { GetAudiencesBffResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetAudiencesBffResponse';
import { GetAudiencesRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetAudiencesRequest';
import { UploadAudienceRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/UploadAudienceRequest';
import { UploadAudienceResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/UploadAudienceResponse';

import { protoFetchWithLogging } from 'api/webgate';

import { getEdgeProxyClientConfig } from './utils/getBeClientConfig';

type GetAudiencesBffResponseType = typeof GetAudiencesBffResponse;
type CreateAudienceResponseType = typeof CreateAudienceResponse;
type UploadAudienceResponseType = typeof UploadAudienceResponse;

export async function getAudiences(
  accountId: string,
): Promise<GetAudiencesBffResponseType[]> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffAudienceSegmentsService(
    protoFetchWithLogging,
    config,
  );
  const request = new GetAudiencesRequest().setAdAccountId(accountId);
  return client
    .getAudiences(request)
    .catch((r: Response) => Promise.reject(r.statusText));
}

export async function getAudienceUrl(
  audienceId: string,
  accountId: string,
): Promise<UploadAudienceResponseType[]> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffAudienceSegmentsService(
    protoFetchWithLogging,
    config,
  );
  const request = new UploadAudienceRequest().setAudienceId(audienceId);

  return client
    .uploadAudience({
      ...request,
      adAccountId: accountId, // todo: use setAccountId once they add it to the constructor
    })
    .catch((r: Response) => Promise.reject(r.statusText));
}

export async function createAudience(
  accountId: string,
  name: string,
  description: string,
): Promise<CreateAudienceResponseType[]> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffAudienceSegmentsService(
    protoFetchWithLogging,
    config,
  );
  const request = new CreateAudienceRequest()
    .setAdAccountId(accountId)
    .setName(name)
    .setDescription(description);

  return client
    .createAudience(request)
    .catch((r: Response) => Promise.reject(r.statusText));
}
