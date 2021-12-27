import { ApiQueryParams, Paging } from './';

// TODO: yet to be built out
export enum CombinedAssetState {}

export enum AssetLibraryFormatTypes {
  AUDIO = 'AUDIO',
  AUDIO_PODCAST = 'AUDIO_PODCAST',
  HORIZONTAL_VIDEO = 'HORIZONTAL_VIDEO',
  IMAGE = 'IMAGE',
  UNKNOWN = 'UNKNOWN',
  VIDEO = 'VIDEO',
  VERTICAL_VIDEO = 'VERTICAL_VIDEO',
}

export enum AssetLibraryStatus {
  UNKNOWN = 'UNKNOWN',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export interface AssetLibraryQueryParams extends ApiQueryParams {
  adAccountId: string;
}

export interface GetAssetLibraryResponse {
  items: AssetLibraryResponseRow[];
  loading: boolean;
  paging: Paging;
}

export interface AssetLibraryResponseRow {
  assetId: string;
  created: string;
  updated: string;
  userUpdated: string;
  name: string;
  // TODO: this will be required once the enum is built out
  combinedAssetState?: CombinedAssetState;
  formatType: AssetLibraryFormatTypes;
  assetLibraryStatus: AssetLibraryStatus;
  // TODO: tbd as to how we'll break out thumbnail url vs asset url
  assetUrl: string;
}
