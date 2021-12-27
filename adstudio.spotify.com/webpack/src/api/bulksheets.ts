import { AdstudioGainzService } from '@spotify-internal/adstudio-gainz-client/clients/AdstudioGainzService';
import { BulkSheetRequest } from '@spotify-internal/adstudio-gainz-client/models/com/spotify/ads/adstudiogainz/BulkSheetRequest';
import { BulkUploadRequest } from '@spotify-internal/adstudio-gainz-client/models/com/spotify/ads/adstudiogainz/BulkUploadRequest';
import { DownloadRequest } from '@spotify-internal/adstudio-gainz-client/models/com/spotify/ads/adstudiogainz/DownloadRequest';
import { PdfUploadRequest } from '@spotify-internal/adstudio-gainz-client/models/com/spotify/ads/adstudiogainz/PdfUploadRequest';

import { protoFetchWithLogging } from 'api/webgate';

import { getEdgeProxyClientConfig } from './utils/getBeClientConfig';

import {
  BulkSheetPayload,
  BulkValidationResponse,
  DownloadBulkCSVPayload,
  DownloadUrlResponse,
  GenerateSignedUrlResponse,
  PdfEntityResponse,
  ResultSheetResponse,
} from 'types/common/state/api/bulksheets';

export async function getBulkCSVSignedUrl(
  adAccountId: string,
): Promise<GenerateSignedUrlResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdstudioGainzService(protoFetchWithLogging, config);
  const request = new BulkUploadRequest().setAdAccountId(adAccountId);
  return client.generateBulkSheetSignUrl(request);
}

export async function getPdfSignedUrl({
  adAccountId,
  bulkSheetId,
}: BulkSheetPayload): Promise<PdfEntityResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdstudioGainzService(protoFetchWithLogging, config);
  const request = new PdfUploadRequest()
    .setAdAccountId(adAccountId)
    .setBulkSheetId(bulkSheetId);
  return client.generatePdfSignedUrl(request);
}

export async function getBulkCSVDownloadUrl(
  adAccountId: string,
  { campaignIds, flightIds, creativeIds }: DownloadBulkCSVPayload,
): Promise<DownloadUrlResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdstudioGainzService(protoFetchWithLogging, config);
  const request = new DownloadRequest()
    .setAdAccountId(adAccountId)
    .setCampaignIds(campaignIds)
    .setFlightIds(flightIds)
    .setCreativeIds(creativeIds);

  return client.downloadBulkSheet(request);
}

export async function validateCsv({
  adAccountId,
  bulkSheetId,
}: BulkSheetPayload): Promise<BulkValidationResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdstudioGainzService(protoFetchWithLogging, config);
  const request = new BulkSheetRequest()
    .setAdAccountId(adAccountId)
    .setBulkSheetId(bulkSheetId);

  return client.validateCsv(request);
}

export async function submitBulkSheet({
  adAccountId,
  bulkSheetId,
}: BulkSheetPayload): Promise<ResultSheetResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdstudioGainzService(protoFetchWithLogging, config);
  const request = new BulkSheetRequest()
    .setAdAccountId(adAccountId)
    .setBulkSheetId(bulkSheetId);

  return client.submitBulkSheet(request);
}
