import { CampaignHierarchyService } from '@spotify-internal/adstudio-bff-clients/clients/CampaignHierarchyService';
import { CreateCampaignRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CreateCampaignRequest';
import { CreateResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CreateResponse';
import { EditCampaignRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/EditCampaignRequest';
import { GetCampaignRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetCampaignRequest';
import { GetCampaignResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetCampaignResponse';
import { GetCampaignsRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetCampaignsRequest';
import { Empty } from '@spotify-internal/adstudio-bff-clients/models/google/protobuf/Empty';

import {
  hasDateParams,
  setDateParamsOnRequest,
} from 'components/common/CampaignHierarchy/DateFilter/DateFilterHelpers';

import { protoFetchWithLogging } from 'api/webgate';

import { getEdgeProxyClientConfig } from './utils/getBeClientConfig';

import { getEnvironmentConfig } from '../config/environment';

import {
  CreateCampaignPayload,
  EditCampaignPayload,
} from 'types/common/state/api/campaign';
import {
  CampaignsApiResponse,
  CampaignsQueryParams,
} from 'types/common/state/api/campaigns';

export async function fetchCampaigns(
  params: CampaignsQueryParams,
): Promise<CampaignsApiResponse> {
  const useNewFlush = hasDateParams(params)
    ? false
    : await getEnvironmentConfig('useSimpleFlush');

  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = new GetCampaignsRequest()
    .setLimit(parseInt(params.limit!, 10))
    .setOffset(parseInt(params.offset!, 10))
    .setSortDirection(params.sortDirection)
    .setSortCriteria(params.sortCriteria)
    .setAdAccountId(params.adAccountId!)
    .setSearchWord(params.searchWord!)
    .setCampaignState(params.campaignState);

  if (params.campaignIds) {
    request.setCampaignIds({ ids: params.campaignIds! });
  }

  setDateParamsOnRequest(params, request);

  if (useNewFlush === 'true') {
    return client.getLifetimeCampaigns(request);
  }
  return client.getCampaigns(request);
}

export async function fetchCampaign(
  campaignId: string,
  adAccountId: string,
): Promise<typeof GetCampaignResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = new GetCampaignRequest()
    .setAdAccountId(adAccountId)
    .setCampaignId(campaignId);
  return client.getCampaign(request);
}

export async function createCampaign(
  payload: CreateCampaignPayload,
): Promise<typeof CreateResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = new CreateCampaignRequest()
    .setName(payload.name)
    .setAdAccountId(payload.adAccountId)
    .setObjective(payload.objective);

  if (payload.artistId) {
    request.setArtistId(payload.artistId!);
  }

  if (payload.purchaseOrderNumber) {
    request.setPurchaseOrderNumber(payload.purchaseOrderNumber!);
  }

  if (payload.hierarchyDraftId) {
    request.setHierarchyDraftId(payload.hierarchyDraftId);
  }

  return client.createCampaign(request);
}

export async function editCampaign(
  payload: EditCampaignPayload,
): Promise<typeof Empty> {
  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = new EditCampaignRequest()
    .setAdAccountId(payload.adAccountId)
    .setCampaignId(payload.campaignId)
    .setName(payload.name);
  return client.editCampaign(request);
}
