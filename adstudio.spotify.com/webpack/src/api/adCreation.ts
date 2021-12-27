import { AdStudioBffAssetService } from '@spotify-internal/adstudio-bff-clients/clients/AdStudioBffAssetService';
import { AuthCreateMixPreviewRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/AuthCreateMixPreviewRequest';
import { AuthIsMixPreviewCompleteRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/AuthIsMixPreviewCompleteRequest';
import { AuthIsMixPreviewCompleteResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/AuthIsMixPreviewCompleteResponse';
import CreateUploadUrlRequestRoot from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CreateUploadUrlRequest';
import { com as CreateUploadUrlResponseRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CreateUploadUrlResponse';
import { Empty } from '@spotify-internal/adstudio-bff-clients/models/google/protobuf/Empty';

import { unauthorizedResponse as unauthorized } from 'utils/unauthorizedEvents';
import { getEdgeProxyClientConfig } from './utils/getBeClientConfig';

import {
  apiPartnerWebgateFetch,
  protoFetch,
  protoFetchWithLogging,
} from './webgate';

import { FormatType } from 'types/common/state/api/format';
import { UploaderFileTypes } from 'types/common/state/api/upload';
import { UploadType } from 'types/common/state/api/uploadTypes';

export type CreateUploadUrlResponse = CreateUploadUrlResponseRoot.spotify.adstudiobff.proto.ICreateUploadUrlResponse;

const CreateUploadUrlRequest =
  CreateUploadUrlRequestRoot.com.spotify.adstudiobff.proto
    .CreateUploadUrlRequest;

export const GEO = 'geo';
export const GENRE = 'genre';
export const PLAYLIST_CAT = 'moment';
export const ADSYNTH_SVC = 'adsynth-api';

/**
 * @param {String} type
 * @param format
 * @param {String} mediaType
 * @param {String} adAccountId
 * @param {Number} aspectRatio
 */
export async function createPlaceholder(
  type: UploadType,
  mediaType: string,
  adAccountId: string,
  aspectRatio?: number,
  format?: FormatType | UploaderFileTypes,
): Promise<CreateUploadUrlResponse | Response> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffAssetService(protoFetchWithLogging, config);
  const request = new CreateUploadUrlRequest()
    .setType(type)
    .setMediaType(mediaType)
    .setAdAccountId(adAccountId);
  if (aspectRatio) request.setAspectRatio(aspectRatio);
  if (format) request.setFormatType(format);
  return client
    .createUploadUrl(request)
    .catch((r: Response) => Promise.reject(r));
}

export function fetchStockMusic() {
  const uri = 'v1/assets/stockbackgroundmusic';
  return apiPartnerWebgateFetch(uri)
    .then(unauthorized)
    .then(r => (r.ok ? r.json() : Promise.reject(r)))
    .then(r => r.assets);
}

// Autogenerates an ad from nothing but a spotify URI
export function createAdsynthPromo(
  contentUri: string,
  accountId: string,
  draftId: string,
  imageUrl: string,
  audioUrl: string,
  script: string,
  voiceName: string,
  artistId: string,
) {
  const url = `${ADSYNTH_SVC}/api/promo`;
  const opts = {
    method: 'POST',
    body: JSON.stringify({
      content_uri: contentUri,
      username: 'dummy',
      script,
      voice_name: voiceName,
      adstudio_account_id: accountId,
      adstudio_draft_id: draftId,
      adstudio_image_url: imageUrl,
      adstudio_audio_url: audioUrl,
      artist_id: artistId,
    }),
  };
  return protoFetch(url, opts)
    .then(r => (r.ok ? r.json() : Promise.reject(r)))
    .then(json => {
      if (json.status === 'OK') {
        return Promise.resolve(json);
      }
      return Promise.reject(json);
    });
}

// Polls until createAdsynthPromo is complete
export function pollAdsynthPromo(adsynthCampaignId: string) {
  const url = `${ADSYNTH_SVC}/api/campaigns/${adsynthCampaignId}/media`;
  const opts = {
    method: 'GET',
  };
  return protoFetch(url, opts)
    .then(r => (r.ok ? r.json() : Promise.reject(r)))
    .then(json =>
      json.adstudio_status === 'complete' ? json : Promise.reject(json),
    );
}

export function createPreview(script: string, voiceName: string) {
  const url = `${ADSYNTH_SVC}/api/texttospeech/synthesize`;
  const json = {
    input: {
      ssml: script || null,
    },
    voice: {},
  };
  if (voiceName) {
    json.voice = {
      name: voiceName,
      languageCode: voiceName.substr(0, 5),
    };
  }
  const opts = {
    method: 'POST',
    body: JSON.stringify(json),
  };
  return protoFetch(url, opts).then(r => (r.ok ? r.json() : Promise.reject(r)));
}

export async function createMixPreview(
  accountId: string,
  musicPath: string,
  voiceoverPath: string,
  playFullMusic: boolean,
  mixMode: string,
  voiceStart: number,
  musicStart: number,
  backgroundVolume: number,
  musicDuration: number,
): Promise<typeof Empty | Response> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffAssetService(protoFetchWithLogging, config);

  return client
    .createMixPreview(
      new AuthCreateMixPreviewRequest()
        .setAdAccountId(accountId)
        .setMusicFile(musicPath)
        .setVoiceFile(voiceoverPath)
        .setPlayFullMusic(playFullMusic)
        .setMixMode(mixMode)
        .setVoiceStart(voiceStart)
        .setMusicStart(musicStart)
        .setMusicVolume(backgroundVolume)
        .setDuration(musicDuration),
    )
    .catch((r: Response) => Promise.reject(r));
}

// Polls until createMixPreview is complete
export async function pollMixPreview(
  accountId: string,
  outputFile: string,
): Promise<typeof AuthIsMixPreviewCompleteResponse | Response> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffAssetService(protoFetchWithLogging, config);
  return client
    .isMixPreviewComplete(
      new AuthIsMixPreviewCompleteRequest()
        .setAdAccountId(accountId)
        .setOutputFile(outputFile),
    )
    .then(r => (r.mixComplete ? Promise.resolve(r) : Promise.reject(r)))
    .catch((r: Response) => Promise.reject(r));
}

export function checkLicense(artistId: string) {
  const url = `${ADSYNTH_SVC}/api/licensing/artist/${artistId}`;
  const opts = {
    method: 'GET',
  };
  return protoFetch(url, opts)
    .then(r => (r.ok ? r.json() : Promise.reject(r)))
    .then(json => Promise.resolve(json.hasLicense));
}
