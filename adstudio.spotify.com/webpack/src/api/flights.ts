import { AdStudioBffStatsService } from '@spotify-internal/adstudio-bff-clients/clients/AdStudioBffStatsService';
import { CampaignHierarchyService } from '@spotify-internal/adstudio-bff-clients/clients/CampaignHierarchyService';
import { BffTargeting } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/BffTargeting';
import { CombinedDailyStatResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CombinedDailyStatResponse';
import { CreateFlightRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CreateFlightRequest';
import { CreateFlightWithCreativesRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CreateFlightWithCreativesRequest';
import { CreateResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CreateResponse';
import { EditFlightRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/EditFlightRequest';
import { Geo } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/Geo';
import { GetCombinedAudienceStatsResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetCombinedAudienceStatsResponse';
import { GetFlightRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetFlightRequest';
import { GetFlightResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetFlightResponse';
import { GetFlightsRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetFlightsRequest';
import { LifetimeStatsResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/LifetimeStatsResponse';
import { LifetimeStreamingConversionStatsResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/LifetimeStreamingConversionStatsResponse';
import { PauseResumeFlightRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/PauseResumeFlightRequest';
import { StatsRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/StatsRequest';
import { StopFlightRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/StopFlightRequest';
import { Empty } from '@spotify-internal/adstudio-bff-clients/models/google/protobuf/Empty';
import { Timestamp } from '@spotify-internal/adstudio-bff-clients/models/google/protobuf/Timestamp';

import {
  PauseResumeFlightPayload,
  StopFlightPayload,
} from 'ducks/flights/types';

import {
  hasDateParams,
  setDateParamsOnRequest,
} from 'components/common/CampaignHierarchy/DateFilter/DateFilterHelpers';

import { protoFetchWithLogging } from 'api/webgate';

import { getEdgeProxyClientConfig } from './utils/getBeClientConfig';

import { getEnvironmentConfig } from '../config/environment';
import { buildCreateCreativeRequest } from './creatives';

import { FrequencyCap } from '../types/common/campaignHierarchy/types';
import { CreateCreativePayload } from 'types/common/state/api/creative';
import {
  CreateFlightPayload,
  EditFlightPayload,
} from 'types/common/state/api/flight';
import {
  FlightsApiResponse,
  FlightsQueryParams,
} from 'types/common/state/api/flights';

export async function fetchFlights(
  params: FlightsQueryParams,
): Promise<FlightsApiResponse> {
  const useNewFlush = hasDateParams(params)
    ? false
    : await getEnvironmentConfig('useSimpleFlush');

  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = new GetFlightsRequest()
    .setLimit(parseInt(params.limit!, 10))
    .setOffset(parseInt(params.offset!, 10))
    .setSortDirection(params.sortDirection)
    .setSortCriteria(params.sortCriteria)
    .setAdAccountId(params.adAccountId!)
    .setCampaignIds(
      params.campaignIds ? { ids: params.campaignIds } : undefined,
    )
    .setFlightState(params.flightState);

  // set one of the following search criteria
  if (params.flightIds) {
    request.setFlightIds({ ids: params.flightIds });
  } else if (params.campaignId) {
    request.setCampaignId(params.campaignId);
  } else if (params.campaignIds) {
    request.setCampaignIds({ ids: params.campaignIds });
  } else if (params.creativeId) {
    request.setCreativeId(params.creativeId);
  } else if (params.searchWord) {
    request.setSearchWord(params.searchWord);
  }

  setDateParamsOnRequest(params, request);

  if (useNewFlush === 'true') {
    return client.getLifetimeFlights(request);
  }
  return client.getFlights(request);
}

export async function fetchFlight(
  flightId: string,
  adAccountId: string,
): Promise<typeof GetFlightResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = new GetFlightRequest()
    .setAdAccountId(adAccountId)
    .setFlightId(flightId);
  return client.getFlight(request);
}

export async function fetchLifetimeStats(
  adAccountId: string,
  flightId: string,
): Promise<typeof LifetimeStatsResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffStatsService(protoFetchWithLogging, config);
  const request = new StatsRequest()
    .setFlightId(flightId)
    .setAdAccountId(adAccountId);
  return client.getLifetimeFlightStats(request);
}

export async function fetchAllDailyStats(
  adAccountId: string,
  flightId: string,
): Promise<typeof CombinedDailyStatResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffStatsService(protoFetchWithLogging, config);
  const request = new StatsRequest()
    .setFlightId(flightId)
    .setAdAccountId(adAccountId);
  return client.getCombinedDailyStats(request);
}

export async function fetchCombinedAudienceInsights(
  adAccountId: string,
  flightId: string,
): Promise<typeof GetCombinedAudienceStatsResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffStatsService(protoFetchWithLogging, config);
  const request = new StatsRequest()
    .setFlightId(flightId)
    .setAdAccountId(adAccountId);
  return client.getCombinedAudienceStatsForFlight(request);
}

export async function fetchLifetimeStreamingConversionStats(
  adAccountId: string,
  flightId: string,
): Promise<typeof LifetimeStreamingConversionStatsResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffStatsService(protoFetchWithLogging, config);
  const request = new StatsRequest()
    .setFlightId(flightId)
    .setAdAccountId(adAccountId);
  return client.getLifetimeStreamingConversionStats(request);
}

function buildCreateFlightRequest(payload: CreateFlightPayload) {
  const request = new CreateFlightRequest()
    .setAdAccountId(payload.adAccountId)
    .setCampaignId(payload.campaignId)
    .setName(payload.name)
    .setDateBegin(new Timestamp().setTimestamp(payload.dateBegin))
    .setDateEnd(new Timestamp().setTimestamp(payload.dateEnd))
    .setTotalBudget(payload.totalBudget)
    .setObjective(payload.objective)
    .setTargeting(
      new BffTargeting()
        .setAgeRanges(payload.targeting.ageRanges)
        .setGeo(
          payload.targeting.geo.map(g => {
            return new Geo()
              .setId(g.geoId)
              .setGeoType(g.type)
              .setCountryCode(g.countryCode);
          }),
        )
        .setPlatforms(payload.targeting.platforms)
        .setGenders(payload.targeting.genders)
        .setAudienceData(payload.targeting.audienceData)
        .setAudienceSegmentIds(payload.targeting.audienceSegmentIds)
        .setGenres(payload.targeting.genres)
        .setCustomAudienceIds(payload.audienceMatchIds || [])
        .setMoments(payload.targeting.moments)
        .setContextualTargetingCategories(
          payload.targeting.contextualTargetingCategories,
        )
        .setBrandSafetyCategories(payload.targeting.brandSafetyCategories)
        .setCompetitiveSeparationCategory(
          payload.targeting.competitiveSeparationCategory,
        )
        .setCompetitiveSeparationSubcategory(
          payload.targeting.competitiveSeparationSubcategory,
        ),
    )
    .setFormat(payload.format)
    .setServeOnMegaphone(payload.serveOnMegaphone)
    .setAspectRatio(payload.aspectRatio)
    .setFrequencyCap(
      payload.frequencyCap!.map(
        ({ maxImpressions, time, timeUnit }: FrequencyCap) => ({
          maxImpressions,
          time,
          timeUnit,
        }),
      ),
    );

  if (payload.draftId) {
    request.setDraftId(payload.draftId);
  }

  if (payload.artistId) {
    request.setArtistId(payload.artistId);
  }

  if (payload.purchaseOrderNumber) {
    request.setPurchaseOrderNumber(payload.purchaseOrderNumber);
  }

  if (payload.duplicatedFlightId) {
    request.setDuplicatedFlightId(payload.duplicatedFlightId);
  }

  if (payload.copiedFlightId) {
    request.setCopiedFromExistingFlightId(payload.copiedFlightId);
  }

  if (payload.hierarchyDraftId) {
    request.setHierarchyDraftId(payload.hierarchyDraftId);
  }

  if (payload.duplicationType) {
    request.setDuplicationType(payload.duplicationType);
  }

  return request;
}

export async function createFlight(
  payload: CreateFlightPayload,
): Promise<typeof CreateResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = buildCreateFlightRequest(payload);

  return client.createFlight(request);
}

export async function createFlightWithCreatives(
  flightPayload: CreateFlightPayload,
  creativesPayload: CreateCreativePayload[],
) {
  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = new CreateFlightWithCreativesRequest()
    .setFlight(buildCreateFlightRequest(flightPayload))
    .setCreatives(creativesPayload.map(buildCreateCreativeRequest))
    .setAdAccountId(flightPayload.adAccountId);
  return client.createFlightWithCreatives(request);
}

export async function editFlight(
  payload: EditFlightPayload,
): Promise<typeof Empty> {
  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = new EditFlightRequest()
    .setAdAccountId(payload.adAccountId)
    .setFlightId(payload.flightId)
    .setDateBegin(payload.dateBegin)
    .setDateEnd(payload.dateEnd)
    .setName(payload.name)
    .setTargeting(
      new BffTargeting()
        .setAgeRanges(payload.targeting.ageRanges)
        .setGeo(
          payload.targeting.geo.map(g => {
            return new Geo()
              .setId(g.geoId)
              .setGeoType(g.type)
              .setCountryCode(g.countryCode);
          }),
        )
        .setPlatforms(payload.targeting.platforms)
        .setGenders(payload.targeting.genders)
        .setAudienceData(payload.targeting.audienceData)
        .setAudienceSegmentIds(payload.targeting.audienceSegmentIds)
        .setGenres(payload.targeting.genres)
        .setMoments(payload.targeting.moments)
        .setCustomAudienceIds(payload.targeting.customAudienceIds)
        .setContextualTargetingCategories(
          payload.targeting.contextualTargetingCategories,
        )
        .setBrandSafetyCategories(payload.targeting.brandSafetyCategories)
        .setCompetitiveSeparationCategory(
          payload.targeting.competitiveSeparationCategory,
        )
        .setCompetitiveSeparationSubcategory(
          payload.targeting.competitiveSeparationSubcategory,
        ),
    )
    .setTotalBudget(payload.totalBudget)
    // @ts-ignore
    .setFrequencyCap(payload.frequencyCap);
  return client.editFlight(request);
}

export async function stopFlight(
  payload: StopFlightPayload,
): Promise<typeof Empty> {
  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = new StopFlightRequest()
    .setFlightId(payload.flightId)
    .setAdAccountId(payload.adAccountId);
  return client.stopFlight(request);
}

export async function pauseResumeFlight(
  payload: PauseResumeFlightPayload,
): Promise<typeof Empty> {
  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = new PauseResumeFlightRequest()
    .setFlightId(payload.flightId)
    .setAdAccountId(payload.adAccountId)
    .setAction(payload.action);
  return client.pauseResumeFlight(request);
}
