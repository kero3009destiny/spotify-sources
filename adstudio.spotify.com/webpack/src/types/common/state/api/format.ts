import { com as FormatTypeProto } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/ads/cs/proto/FormatType';

export type FormatType = FormatTypeProto.spotify.ads.cs.proto.FormatType;

export const Format: Record<FormatType, FormatType> = {
  UNKNOWN: 'UNKNOWN',
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO',
  AUDIO_PODCAST: 'AUDIO_PODCAST',
};
