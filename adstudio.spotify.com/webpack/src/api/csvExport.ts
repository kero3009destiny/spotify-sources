import { HttpServiceConfigOptions } from '@spotify-internal/adstudio-bff-clients/clients/HttpServiceConfigOptions';
import { DunderService } from '@spotify-internal/dunder-client/clients/DunderService';
import { ExportHierarchyRequest } from '@spotify-internal/dunder-client/models/com/spotify/ads/dunder/ExportHierarchyRequest';
import { HierarchySortOrder } from '@spotify-internal/dunder-client/models/com/spotify/ads/dunder/HierarchySortOrder';

import {
  CampaignExportPayload,
  CreativeExportPayload,
  FlightExportPayload,
} from 'ducks/hierarchyExport/types';

import { protoFetchWithLogging } from 'api/webgate';

import { isUuid } from 'utils/uuid';
import {
  BE_CLIENT_CONFIG,
  getGenericClientConfig,
} from './utils/getBeClientConfig';

import { setDateParamsOnRequest } from '../components/common/CampaignHierarchy/DateFilter/DateFilterHelpers';

import { getEnvironmentConfig } from 'config/environment';

import { ExportResponse } from 'types/common/state/api/hierarchycolumns';

type HttpServiceConfigOptionsType = typeof HttpServiceConfigOptions;

async function getDunderClientConfig(): Promise<
  InstanceType<HttpServiceConfigOptionsType>
> {
  const webgateHost = await getEnvironmentConfig('webgateHost');
  return getGenericClientConfig(
    (webgateHost || BE_CLIENT_CONFIG.WEBGATE_HOST) + '/dunder',
  );
}

export async function exportCampaignCSV(
  payload: CampaignExportPayload,
): Promise<ExportResponse> {
  const config = await getDunderClientConfig();
  const client = new DunderService(protoFetchWithLogging, config);
  const request = new ExportHierarchyRequest()
    .setAdAccountId(payload.adAccountId)
    .setFields(payload.columns)
    .setLocale(payload.locale)
    .setSortOrder([
      new HierarchySortOrder()
        .setOrderBy(payload.sortCriteria)
        .setSortDirection(payload.sortDirection),
    ])
    .setCampaignStatus(payload.campaignState);

  setDateParamsOnRequest(payload.dateFilterParams, request);

  if (payload.searchWord) {
    const trimmedSearchWord = payload.searchWord.trim();

    if (isUuid(trimmedSearchWord)) {
      request.setCampaignId(trimmedSearchWord);
    } else {
      request.setSearchQuery(trimmedSearchWord);
    }
  }

  return client.exportHierarchyCsv(request);
}

export async function exportFlightCSV(
  payload: FlightExportPayload,
): Promise<ExportResponse> {
  const config = await getDunderClientConfig();
  const client = new DunderService(protoFetchWithLogging, config);
  const request = new ExportHierarchyRequest()
    .setAdAccountId(payload.adAccountId)
    .setFields(payload.columns)
    .setLocale(payload.locale)
    .setSortOrder([
      new HierarchySortOrder()
        .setOrderBy(payload.sortCriteria)
        .setSortDirection(payload.sortDirection),
    ])
    .setFlightStatus(payload.flightState);

  if (payload.campaignId) {
    request.setCampaignId(payload.campaignId!);
  } else if (payload.creativeId) {
    request.setCreativeId(payload.creativeId!);
  }

  setDateParamsOnRequest(payload.dateFilterParams, request);

  if (payload.searchWord) {
    const trimmedSearchWord = payload.searchWord.trim();

    if (isUuid(trimmedSearchWord)) {
      request.setFlightId(trimmedSearchWord);
    } else {
      request.setSearchQuery(trimmedSearchWord);
    }
  }

  return client.exportHierarchyCsv(request);
}

export async function exportCreativeCSV(
  payload: CreativeExportPayload,
): Promise<ExportResponse> {
  const config = await getDunderClientConfig();
  const client = new DunderService(protoFetchWithLogging, config);
  const request = new ExportHierarchyRequest()
    .setAdAccountId(payload.adAccountId)
    .setFields(payload.columns)
    .setLocale(payload.locale)
    .setSortOrder([
      new HierarchySortOrder()
        .setOrderBy(payload.sortCriteria)
        .setSortDirection(payload.sortDirection),
    ])
    .setCreativeStatus(payload.creativeState);

  // only one id filter type should exist
  if (payload.flightId) {
    request.setFlightId(payload.flightId!);
  } else if (payload.campaignId) {
    request.setCampaignId(payload.campaignId);
  }

  setDateParamsOnRequest(payload.dateFilterParams, request);

  if (payload.searchWord) {
    const trimmedSearchWord = payload.searchWord.trim();

    if (isUuid(trimmedSearchWord)) {
      request.setCreativeId(trimmedSearchWord);
    } else {
      request.setSearchQuery(trimmedSearchWord);
    }
  }
  return client.exportHierarchyCsv(request);
}
