import { com as VoiceoverSystemProto } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudioasset/VoiceoverSystem';

export type VoiceoverSystemType = VoiceoverSystemProto.spotify.adstudioasset.VoiceoverSystem;

export const VoiceoverSystem: Record<
  VoiceoverSystemType,
  VoiceoverSystemType
> = {
  VOICEOVER_SYSTEM_UNSET: 'VOICEOVER_SYSTEM_UNSET',
  VOICE_BUNNY: 'VOICE_BUNNY',
  USER_UPLOAD: 'USER_UPLOAD',
  TEXT_TO_SPEECH_UPLOAD: 'TEXT_TO_SPEECH_UPLOAD',
  SPOKENLAYER: 'SPOKENLAYER',
};
