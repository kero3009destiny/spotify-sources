import { CampaignHierarchyService } from '@spotify-internal/adstudio-bff-clients/clients/CampaignHierarchyService';
import {
  com as EditFlightLinkParametersRoot,
  EditFlightLinkParameters,
} from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/EditFlightLinkParameters';
import { EditFlightLinksRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/EditFlightLinksRequest';
import { FlightLinkRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/FlightLinkRequest';
import { PauseResumeFlightLinkRequest } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/PauseResumeFlightLinkRequest';
import { google as EmptyProto } from '@spotify-internal/adstudio-bff-clients/models/google/protobuf/Empty';

import {
  EditFlightLinksPayload,
  FlightLinkParameters,
  PauseResumeFlightLinkPayload,
} from 'ducks/flightlinks/types';

import { protoFetchWithLogging } from 'api/webgate';

import { getEdgeProxyClientConfig } from './utils/getBeClientConfig';

type IEditFlightLinkParameters = EditFlightLinkParametersRoot.spotify.adstudiobff.proto.IEditFlightLinkParameters;
type Empty = EmptyProto.protobuf.Empty;

export const createFlightLink = async (
  adAccountId: string,
  flightId: string,
  creativeIds: string[],
): Promise<Empty> => {
  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = new FlightLinkRequest()
    .setAdAccountId(adAccountId)
    .setFlightId(flightId)
    .setCreativeIds(creativeIds);

  return client.createFlightLinks(request);
};

export const pauseResumeFlightLink = async ({
  adAccountId,
  flightId,
  creativeId,
  action,
}: PauseResumeFlightLinkPayload): Promise<Empty> => {
  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const request = new PauseResumeFlightLinkRequest()
    .setAdAccountId(adAccountId)
    .setFlightId(flightId)
    .setCreativeId(creativeId)
    .setAction(action);
  return client.pauseResumeFlightLink(request);
};

export const editFlightLinks = async ({
  adAccountId,
  flightLinks,
}: EditFlightLinksPayload): Promise<Empty> => {
  const config = await getEdgeProxyClientConfig();
  const client = new CampaignHierarchyService(protoFetchWithLogging, config);
  const editFlightLinkParameters: IEditFlightLinkParameters[] = flightLinks.map<
    FlightLinkParameters
  >((flightLink: FlightLinkParameters) => {
    return new EditFlightLinkParameters()
      .setCreativeRotationParameters(flightLink.creativeRotationParameters)
      .setFlightLinkId(flightLink.flightLinkId);
  });
  const request = new EditFlightLinksRequest()
    .setAdAccountId(adAccountId)
    .setEditFlightLinkParameters(editFlightLinkParameters);
  return client.editFlightLinks(request);
};
