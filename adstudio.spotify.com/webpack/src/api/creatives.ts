import { AdStudioValidationService } from '@spotify-internal/adstudio-bff-clients/clients/AdStudioValidationService';
import { CampaignHierarchyService } from '@spotify-internal/adstudio-bff-clients/clients/CampaignHierarchyService';
import { BulkGetCreativesRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/BulkGetCreativesRequest';
import { BulkGetCreativesResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/BulkGetCreativesResponse';
import { CreateCreativeRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CreateCreativeRequest';
import { CreateResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CreateResponse';
import { EditCreativeRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/EditCreativeRequest';
import { GetCreativeRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetCreativeRequest';
import { GetCreativesRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetCreativesRequest';
import { ValidateTrackingUrlRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/ValidateTrackingUrlRequest';
import { Empty } from '@spotify-internal/adstudio-bff-clients/models/google/protobuf/Empty';

import {
  hasDateParams,
  setDateParamsOnRequest,
} from 'components/common/CampaignHierarchy/DateFilter/DateFilterHelpers';

import { getLocalizedValueForBundle } from '../utils/i18nHelpers';
import { getEdgeProxyClientConfig } from './utils/getBeClientConfig';

import { getEnvironmentConfig } from '../config/environment';
import { protoFetchWithLogging } from './webgate';

import {
  CreateCreativePayload,
  CreativeDetails,
  EditCreativePayload,
} from 'types/common/state/api/creative';
import {
  BulkGetCreativesRequestParams,
  CreativesApiResponse,
  CreativesQueryParams,
} from 'types/common/state/api/creatives';
import { Format } from 'types/common/state/api/format';

export async function fetchCreatives(
  params: CreativesQueryParams,
): Promise<CreativesApiResponse> {
  const useNewFlush = hasDateParams(params)
    ? false
    : await getEnvironmentConfig('useSimpleFlush');

  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = new GetCreativesRequest()
    .setLimit(parseInt(params.limit!, 10))
    .setOffset(parseInt(params.offset!, 10))
    .setSortDirection(params.sortDirection)
    .setSortCriteria(params.sortCriteria)
    .setAdAccountId(params.adAccountId)
    .setCreativeState(params.creativeState);

  // set one of the following search criteria
  if (params.creativeIds) {
    request.setCreativeIds({ ids: params.creativeIds });
  } else if (params.flightId) {
    request.setFlightId(params.flightId);
  } else if (params.campaignId) {
    request.setCampaignId(params.campaignId);
  } else if (params.flightIds) {
    request.setFlightIds({ ids: params.flightIds });
  } else if (params.campaignIds) {
    request.setCampaignIds({ ids: params.campaignIds });
  } else if (params.searchWord) {
    request.setSearchWord(params.searchWord);
  }

  setDateParamsOnRequest(params, request);

  if (useNewFlush === 'true') {
    return client.getLifetimeCreatives(request);
  }
  return client.getCreatives(request);
}

export async function fetchBulkCreatives(
  params: BulkGetCreativesRequestParams,
): Promise<typeof BulkGetCreativesResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = new BulkGetCreativesRequest()
    .setAdAccountId(params.adAccountId)
    .setFlightId(params.flightId);

  if (params.creativeIds) {
    request.setCreativeIds(params.creativeIds);
  }

  return client.getBulkCreatives(request);
}

export async function fetchCreative(
  adAccountId: string,
  creativeId: string,
): Promise<CreativeDetails> {
  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = new GetCreativeRequest()
    .setAdAccountId(adAccountId)
    .setCreativeId(creativeId);
  return client.getCreative(request);
}

function setNonPodcastCreativeFields(
  payload: CreateCreativePayload | EditCreativePayload,
  request: TSFixMe,
) {
  if (payload.format !== Format.AUDIO_PODCAST) {
    request
      .setBanner(payload.banner!)
      .setCtaText(
        getLocalizedValueForBundle(payload.targetedLocale!, payload.ctaText!),
      )
      .setClickthroughUrl(payload.clickthroughUrl!);
  }
}

export const buildCreateCreativeRequest = (payload: CreateCreativePayload) => {
  const request = new CreateCreativeRequest()
    .setAdAccountId(payload.adAccountId)
    .setName(payload.name)
    .setObjective(payload.objective)
    .setFormat(payload.format)
    .setServeOnMegaphone(!!payload.serveOnMegaphone)
    .setMoatEnabled(payload.moatEnabled!)
    .setIasPixel(payload.iasPixel!);

  setNonPodcastCreativeFields(payload, request);

  if (payload.brandName) {
    request.setBrandName(payload.brandName!);
  }

  if (payload.tagLine) {
    request.setTagLine(payload.tagLine!);
  }

  if (payload.fullmixId) {
    request.setFullmixId(payload.fullmixId!);
  }

  if (payload.bgMusicId) {
    request.setBgmusicId(payload.bgMusicId!);
  }

  if (payload.voiceover) {
    request.setVoiceover(payload.voiceover!);
  }

  if (payload.playFullMusic) {
    request.setPlayFullMusic(payload.playFullMusic!);
  }

  if (payload.artistId) {
    request.setArtistId(payload.artistId!);
  }

  if (payload.flightId) {
    request.setFlightId(payload.flightId!);
  }

  if (payload.videoId) {
    request.setVideoId(payload.videoId!);
  }

  if (payload.duplicatedCreativeId) {
    request.setDuplicatedCreativeId(payload.duplicatedCreativeId);
  }

  if (payload.copiedCreativeId) {
    request.setCopiedFromExistingCreativeId(payload.copiedCreativeId);
  }

  if (payload.trackingPixel) {
    request.setTrackingPixel(payload.trackingPixel);
  }

  if (payload.hierarchyDraftId) {
    request.setHierarchyDraftId(payload.hierarchyDraftId);
  }

  if (payload.duplicationType) {
    request.setDuplicationType(payload.duplicationType);
  }

  return request;
};

export async function createCreative(
  payload: CreateCreativePayload,
): Promise<typeof CreateResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);

  return client.createCreative(buildCreateCreativeRequest(payload));
}

export async function editCreative(
  payload: EditCreativePayload,
): Promise<typeof Empty> {
  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = new EditCreativeRequest()
    .setAdAccountId(payload.adAccountId)
    .setCreativeId(payload.creativeId)
    .setName(payload.name);

  if (payload.format !== Format.AUDIO_PODCAST) {
    request
      .setBanner(payload.banner!)
      .setCtaText(payload.ctaText!)
      .setClickthroughUrl(payload.clickthroughUrl!);
  }

  if (payload.brandName) {
    request.setBrandName(payload.brandName!);
  }

  if (payload.tagLine) {
    request.setTagLine(payload.tagLine!);
  }

  if (payload.fullmixId) {
    request.setFullmixId(payload.fullmixId!);
  }

  if (payload.videoId) {
    request.setVideoId(payload.videoId);
  }

  if (payload.format === Format.VIDEO) {
    request.setMoatEnabled(payload.moatEnabled!).setIasPixel(payload.iasPixel!);
  }

  if (payload.trackingPixel) {
    request.setTrackingPixel(payload.trackingPixel);
  }

  return client.editCreative(request);
}

export async function validateDoubleClickTrackingUrl(url: string) {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioValidationService(protoFetchWithLogging, config);
  const request = new ValidateTrackingUrlRequest().setUrl(url);
  return client.validateTrackingUrl(request);
}
