import CreateUploadUrlRequestRoot from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CreateUploadUrlRequest';

export type UploadType = CreateUploadUrlRequestRoot.com.spotify.adstudiobff.proto.CreateUploadUrlRequest.Type;

export const UPLOAD_TYPES: Record<string, UploadType> = {
  BG_MUSIC: 'bgmusic',
  FULLMIX: 'fullmix',
  IMAGE: 'image',
  VIDEO: 'video',
};
