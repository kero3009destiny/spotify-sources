import { com as FlightLinkRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/FlightLink';
import { com as PauseResumeFlightLinkRequestRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/PauseResumeFlightLinkRequest';

export type FlightLink = FlightLinkRoot.spotify.adstudiobff.proto.IFlightLink;
export type FlightLinkPauseResumeActionType = PauseResumeFlightLinkRequestRoot.spotify.adstudiobff.proto.PauseResumeFlightLinkRequest.Action;

export const FlightLinkPauseResumeAction: Record<
  FlightLinkPauseResumeActionType,
  FlightLinkPauseResumeActionType
> = {
  UNKNOWN: 'UNKNOWN',
  PAUSE: 'PAUSE',
  RESUME: 'RESUME',
};
