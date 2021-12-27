import { AdStudioBffAssetService } from '@spotify-internal/adstudio-bff-clients/clients/AdStudioBffAssetService';
import { CampaignHierarchyService } from '@spotify-internal/adstudio-bff-clients/clients/CampaignHierarchyService';
import { ApproveVoiceoverRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/ApproveVoiceoverRequest';
import { BackgroundRevisionRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/BackgroundRevisionRequest';
import { GetMixFromVoiceoverRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetMixFromVoiceoverRequest';
import { PendingUserApprovalCreativesRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/PendingUserApprovalCreativesRequest';
import { RejectVoiceoverRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/RejectVoiceoverRequest';
import { RevisionRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/RevisionRequest';
import { google as EmptyProto } from '@spotify-internal/adstudio-bff-clients/models/google/protobuf/Empty';
import { MixAssetResponseBatch } from '@spotify-internal/adstudioasset/proto/com/spotify/adstudioasset/service_pb';

import { RejectionCode } from 'components/CreativeReviewActionsModal/types';

import { protoFetchWithLogging } from 'api/webgate';

import { getEdgeProxyClientConfig } from './utils/getBeClientConfig';

import { PendingUserApprovalCreativesResponse } from 'types/common/state/api/assets';

type Empty = EmptyProto.protobuf.Empty;

export async function getPendingUserApprovalCreatives(
  adAccountId: string,
  creativeId?: string,
  limit?: number,
  offset?: number,
): Promise<PendingUserApprovalCreativesResponse> {
  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = new PendingUserApprovalCreativesRequest()
    .setAdAccountId(adAccountId)
    .setCreativeId(creativeId || '')
    .setLimit(limit!)
    .setOffset(offset!);
  return client.getPendingUserApprovalCreatives(request);
}

export async function approveVoiceover(
  adAccountId: string,
  voiceoverId: string,
  mixId: string,
): Promise<Empty> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffAssetService(protoFetchWithLogging, config);
  const request = new ApproveVoiceoverRequest()
    .setAdAccountId(adAccountId)
    .setVoiceoverId(voiceoverId)
    .setMixId(mixId);
  return client.approveVoiceover(request);
}

export async function approveScript(
  adAccountId: string,
  voiceoverId: string,
  mixId: string,
): Promise<Empty> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffAssetService(protoFetchWithLogging, config);
  const request = new ApproveVoiceoverRequest()
    .setAdAccountId(adAccountId)
    .setVoiceoverId(voiceoverId)
    .setMixId(mixId);
  return client.approveVoiceoverScript(request);
}

export async function rejectVoiceover(
  adAccountId: string,
  voiceoverId: string,
  creativeId: string,
  rejectionReason: string,
  rejectionCode: RejectionCode,
): Promise<Empty> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffAssetService(protoFetchWithLogging, config);
  const request = new RejectVoiceoverRequest()
    .setAdAccountId(adAccountId)
    .setVoiceoverId(voiceoverId)
    .setCreativeId(creativeId)
    .setRejectionReason(rejectionReason)
    .setRejectionCode(rejectionCode);
  return client.rejectVoiceover(request);
}

export async function rejectVoiceoverLegacy111(
  adAccountId: string,
  voiceoverId: string,
  flightId: string,
): Promise<Empty> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffAssetService(protoFetchWithLogging, config);
  const request = new RejectVoiceoverRequest()
    .setAdAccountId(adAccountId)
    .setVoiceoverId(voiceoverId)
    .setFlightId(flightId);
  return client.rejectVoiceover(request);
}

export async function reviseVoiceoverById(
  adAccountId: string,
  voiceoverId: string,
  instructions: string,
): Promise<Empty> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffAssetService(protoFetchWithLogging, config);
  const request = new RevisionRequest()
    .setAdAccountId(adAccountId)
    .setVoiceoverId(voiceoverId)
    .setInstructions(instructions);
  return client.reviseVoiceoverByVoiceoverId(request);
}

export async function reviseScriptById(
  adAccountId: string,
  voiceoverId: string,
  instructions: string,
): Promise<Empty> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffAssetService(protoFetchWithLogging, config);
  const request = new RevisionRequest()
    .setAdAccountId(adAccountId)
    .setVoiceoverId(voiceoverId)
    .setInstructions(instructions);
  return client.reviseScriptByVoiceoverId(request);
}

export async function reviseVoiceoverBackground(
  adAccountId: string,
  bgAssetId: string,
  creativeId: string,
  playFullMusic: boolean,
  voiceoverMixId: string,
  mixMode: string,
  voiceStart: number,
  musicStart: number,
  backgroundVolume: number,
  musicDuration: number,
): Promise<Empty> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffAssetService(protoFetchWithLogging, config);
  const request = new BackgroundRevisionRequest()
    .setAdAccountId(adAccountId)
    .setBgAssetId(bgAssetId)
    .setCreativeId(creativeId)
    .setPlayFullMusic(playFullMusic)
    .setVoiceoverMixId(voiceoverMixId)
    .setMixMode(mixMode)
    .setVoiceStart(voiceStart)
    .setMusicStart(musicStart)
    .setBackgroundVolume(backgroundVolume)
    .setRequestedDuration(musicDuration);
  return client.reviseVoiceOverBackground(request);
}

export async function getMixHistory(
  adAccountId: string,
  voiceoverId: string,
): Promise<MixAssetResponseBatch> {
  const config = await getEdgeProxyClientConfig();
  const client = new AdStudioBffAssetService(protoFetchWithLogging, config);
  return client.getMixRequest(
    new GetMixFromVoiceoverRequest()
      .setVoiceoverId(voiceoverId)
      .setAdAccountId(adAccountId),
  );
}
