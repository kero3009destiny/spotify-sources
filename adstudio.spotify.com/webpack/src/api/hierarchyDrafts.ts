import { AdStudioBffDraftsService } from '@spotify-internal/adstudio-bff-clients/clients/AdStudioBffDraftsService';
import { ArchiveHierarchyDraftsRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/ArchiveHierarchyDraftsRequest';
import { CompleteHierarchyDraftRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CompleteHierarchyDraftRequest';
import { CreateColdStartDraftRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CreateColdStartDraftRequest';
import { CreateDraftForExistingCampaignRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CreateDraftForExistingCampaignRequest';
import { CreateDraftForExistingFlightRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CreateDraftForExistingFlightRequest';
import { DismissHierarchyDraftReviewRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/DismissHierarchyDraftReviewRequest';
import { GetCampaignDraftsRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetCampaignDraftsRequest';
import { GetCreativeDraftsRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetCreativeDraftsRequest';
import { GetEnrichedHierarchyDraftRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetEnrichedHierarchyDraftRequest';
import { GetFlightDraftsRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetFlightDraftsRequest';
import { GetReviewableHierarchyDraftsRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetReviewableHierarchyDraftsRequest';
import { UpdateCampaignDraftRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/UpdateCampaignDraftRequest';
import { UpdateCreativeDraftRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/UpdateCreativeDraftRequest';
import { UpdateFlightDraftRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/UpdateFlightDraftRequest';

import { getEdgeProxyClientConfig } from './utils/getBeClientConfig';

import { protoFetchWithLogging } from './webgate';

import {
  CampaignDraftFormValues,
  CampaignDraftQueryParams,
  CreateColdStartDraftResponse,
  CreateDraftForExistingCampaignResponse,
  CreateDraftForExistingFlightResponse,
  CreativeDraftFormValues,
  CreativeDraftQueryParams,
  DraftStatus,
  EnrichedDraftApiResponse,
  FlightDraftFormValues,
  FlightDraftQueryParams,
  ReviewableDraftQueryParams,
} from 'types/common/state/api/drafts';

export async function getCampaignDrafts(params: CampaignDraftQueryParams) {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffDraftsService(protoFetchWithLogging, config);
  const request = new GetCampaignDraftsRequest()
    .setAdAccountId(params.adAccountId)
    .setHierarchyDraftStatus(DraftStatus.ACTIVE)
    .setOffset(parseInt(params.offset!, 10))
    .setLimit(parseInt(params.limit!, 10));

  if (params.searchWord) {
    request.setSearchWord(params.searchWord!);
  }

  if (params.hierarchyDraftIds) {
    request.setHierarchyDraftIds({ ids: params.hierarchyDraftIds });
  }

  return client.getCampaignDrafts(request);
}

export async function getFlightDrafts(params: FlightDraftQueryParams) {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffDraftsService(protoFetchWithLogging, config);
  const request = new GetFlightDraftsRequest()
    .setAdAccountId(params.adAccountId)
    .setHierarchyDraftStatus(DraftStatus.ACTIVE)
    .setOffset(parseInt(params.offset!, 10))
    .setLimit(parseInt(params.limit!, 10));

  if (params.searchWord) {
    request.setSearchWord(params.searchWord!);
  }

  if (params.campaignId) {
    request.setCampaignId(params.campaignId!);
  }

  if (params.campaignIds) {
    request.setCampaignIds({ ids: params.campaignIds! });
  }

  if (params.hierarchyDraftIds) {
    request.setHierarchyDraftIds({ ids: params.hierarchyDraftIds });
  }

  return client.getFlightDrafts(request);
}

export async function getCreativeDrafts(params: CreativeDraftQueryParams) {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffDraftsService(protoFetchWithLogging, config);
  const request = new GetCreativeDraftsRequest()
    .setAdAccountId(params.adAccountId)
    .setHierarchyDraftStatus(DraftStatus.ACTIVE)
    .setOffset(parseInt(params.offset!, 10))
    .setLimit(parseInt(params.limit!, 10));

  if (params.searchWord) {
    request.setSearchWord(params.searchWord!);
  }

  if (params.flightId) {
    request.setFlightId(params.flightId!);
  }

  if (params.campaignId && !params.flightId) {
    request.setCampaignId(params.campaignId!);
  }

  if (params.flightIds) {
    request.setFlightIds({ ids: params.flightIds! });
  }

  if (params.campaignIds && !params.flightIds) {
    request.setCampaignIds({ ids: params.campaignIds! });
  }

  if (params.hierarchyDraftIds) {
    request.setHierarchyDraftIds({ ids: params.hierarchyDraftIds });
  }

  return client.getCreativeDrafts(request);
}

export async function dismissReview(
  adAccountId: string,
  hierarchyDraftId: string,
) {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffDraftsService(protoFetchWithLogging, config);
  const request = new DismissHierarchyDraftReviewRequest()
    .setAdAccountId(adAccountId)
    .setHierarchyDraftId(hierarchyDraftId);

  return client.dismissHierarchyDraftReview(request);
}

export async function deleteHierarchyDrafts(
  adAccountId: string,
  ids: Array<string>,
) {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffDraftsService(protoFetchWithLogging, config);
  const request = new ArchiveHierarchyDraftsRequest()
    .setAdAccountId(adAccountId)
    .setHierarchyDraftIds(ids);

  return client.archiveHierarchyDrafts(request);
}

export async function getReviewableDrafts(params: ReviewableDraftQueryParams) {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffDraftsService(protoFetchWithLogging, config);
  const request = new GetReviewableHierarchyDraftsRequest()
    .setAdAccountId(params.adAccountId)
    .setLimit(parseInt(params.limit!, 10))
    .setOffset(parseInt(params.offset!, 10));

  return client.getReviewableHierarchyDrafts(request);
}

export async function updateCampaignDraft(
  adAccountId: string,
  campaignDraftId: string,
  hierarchyDraftId: string,
  draftValues: CampaignDraftFormValues,
) {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffDraftsService(protoFetchWithLogging, config);
  const request = new UpdateCampaignDraftRequest()
    .setAdAccountId(adAccountId)
    .setCampaignDraftId(campaignDraftId)
    .setHierarchyDraftId(hierarchyDraftId)
    .setCampaignDraftFormValues(draftValues);

  return client.updateCampaignDraft(request);
}

export async function updateFlightDraft(
  adAccountId: string,
  flightDraftId: string,
  hierarchyDraftId: string,
  draftValues: FlightDraftFormValues,
) {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffDraftsService(protoFetchWithLogging, config);
  const request = new UpdateFlightDraftRequest()
    .setAdAccountId(adAccountId)
    .setFlightDraftId(flightDraftId)
    .setHierarchyDraftId(hierarchyDraftId)
    .setFlightDraftFormValues(draftValues);

  return client.updateFlightDraft(request);
}

export async function updateCreativeDraft(
  adAccountId: string,
  creativeDraftId: string,
  hierarchyDraftId: string,
  draftValues: CreativeDraftFormValues,
) {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffDraftsService(protoFetchWithLogging, config);
  const request = new UpdateCreativeDraftRequest()
    .setAdAccountId(adAccountId)
    .setCreativeDraftId(creativeDraftId)
    .setHierarchyDraftId(hierarchyDraftId)
    .setCreativeDraftFormValues(draftValues);

  return client.updateCreativeDraft(request);
}

export async function getEnrichedHierarchyDraft(
  adAccountId: string,
  hierarchyDraftId: string,
): Promise<EnrichedDraftApiResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffDraftsService(protoFetchWithLogging, config);
  const request = new GetEnrichedHierarchyDraftRequest()
    .setAdAccountId(adAccountId)
    .setId(hierarchyDraftId);

  return client.getEnrichedHierarchyDraft(request);
}

export async function createColdStartHierarchyDraft(
  adAccountId: string,
  campaignDraftFormValues: CampaignDraftFormValues,
  flightDraftFormValues: FlightDraftFormValues,
  creativeDraftFormValues: CreativeDraftFormValues,
): Promise<CreateColdStartDraftResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffDraftsService(protoFetchWithLogging, config);
  const request = new CreateColdStartDraftRequest()
    .setAdAccountId(adAccountId)
    .setCampaignDraftFormValues(campaignDraftFormValues)
    .setFlightDraftFormValues(flightDraftFormValues)
    .setCreativeDraftFormValues(creativeDraftFormValues);

  return client.createColdStartDraft(request);
}

export async function createAddToExistingCampaignDraft(
  adAccountId: string,
  campaignId: string,
  flightDraftFormValues: FlightDraftFormValues,
  creativeDraftFormValues: CreativeDraftFormValues,
): Promise<CreateDraftForExistingCampaignResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffDraftsService(protoFetchWithLogging, config);
  const request = new CreateDraftForExistingCampaignRequest()
    .setAdAccountId(adAccountId)
    .setCampaignId(campaignId)
    .setFlightDraftFormValues(flightDraftFormValues)
    .setCreativeDraftFormValues(creativeDraftFormValues);

  return client.createDraftForExistingCampaign(request);
}

export async function createAddToExistingFlightDraft(
  adAccountId: string,
  campaignId: string,
  flightId: string,
  creativeDraftFormValues: CreativeDraftFormValues,
): Promise<CreateDraftForExistingFlightResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffDraftsService(protoFetchWithLogging, config);
  const request = new CreateDraftForExistingFlightRequest()
    .setAdAccountId(adAccountId)
    .setCampaignId(campaignId)
    .setFlightId(flightId)
    .setCreativeDraftFormValues(creativeDraftFormValues);

  return client.createDraftForExistingFlight(request);
}

export async function completeHierarchyDraft(
  adAccountId: string,
  hierarchyDraftId: string,
) {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffDraftsService(protoFetchWithLogging, config);
  const request = new CompleteHierarchyDraftRequest()
    .setAdAccountId(adAccountId)
    .setHierarchyDraftId(hierarchyDraftId);

  return client.completeHierarchyDraft(request);
}
