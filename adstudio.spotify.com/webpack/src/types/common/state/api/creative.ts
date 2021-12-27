import { com as GetCreativeResponseProto } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetCreativeResponse';
type IGetCreativeResponse = GetCreativeResponseProto.spotify.adstudiobff.proto.IGetCreativeResponse;
import { BffCreativeState } from 'types/common/state/api/creatives';
import { com as EffectiveVoStateProto } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/EffectiveVoState';
import { FormatType } from './format';
import { IBffVoiceover } from './assets';
import { Objective } from './campaign';
import {
  AssetState,
  VideoFormatType,
} from '@spotify-internal/adstudioasset/proto/com/spotify/adstudioasset/model_pb';
import { com as CreativeRotationParametersRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CreativeRotationParameters';
import { com as ThirdPartyPixelRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/ads/campaignservice/ThirdPartyPixel';
import { com as TrackingEventTypeRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/ads/common/TrackingEventType';
import { DuplicationType } from './bff';

export type CreativeRotationParameters = CreativeRotationParametersRoot.spotify.adstudiobff.proto.ICreativeRotationParameters;
export type CreativeRotationType = CreativeRotationParametersRoot.spotify.adstudiobff.proto.CreativeRotationParameters.CreativeRotationType;

export const CREATIVE_ROTATION_TYPE: Record<
  CreativeRotationType,
  CreativeRotationType
> = {
  OPTIMIZED: 'OPTIMIZED',
  SEQUENTIAL: 'SEQUENTIAL',
  WEIGHTED: 'WEIGHTED',
  UNKNOWN: 'UNKNOWN',
};

export type EffectiveVoState = EffectiveVoStateProto.spotify.adstudiobff.proto.EffectiveVoState;

type ThirdPartyPixelProto = ThirdPartyPixelRoot.spotify.ads.campaignservice.ThirdPartyPixel;
export type TrackingEventType = TrackingEventTypeRoot.spotify.ads.common.TrackingEventType;

// Nested protobuf types need to be overridden manually or they will default to 'any'
export interface ThirdPartyPixel extends Partial<ThirdPartyPixelProto> {
  trackingEventType: TrackingEventType;
}

export const TRACKING_EVENT_TYPE: Record<
  TrackingEventType,
  TrackingEventType
> = {
  CLICKED: 'CLICKED',
  START: 'START',
  IMPRESSION: 'IMPRESSION',
  FIRST_QUARTILE: 'FIRST_QUARTILE',
  MIDPOINT: 'MIDPOINT',
  THIRD_QUARTILE: 'THIRD_QUARTILE',
  COMPLETE: 'COMPLETE',
  PAUSE: 'PAUSE',
  RESUME: 'RESUME',
  MUTE: 'MUTE',
  UNMUTE: 'UNMUTE',
  EXPAND: 'EXPAND',
  COLLAPSE: 'COLLAPSE',
  SKIPPED: 'SKIPPED',
  ERROR: 'ERROR',
  FOREGROUNDED: 'FOREGROUNDED',
  BACKGROUNDED: 'BACKGROUNDED',
};

export interface GetCreativeResponse extends IGetCreativeResponse {
  creativeState?: BffCreativeState;
}

export interface BffAudio {
  id: string;
  mp3Url?: string;
  oggUrl?: string;
  duration: number;
}

export interface BffVideo {
  id: string;
  transcodeSourceId?: string;
  userUploadedAssetUrl?: string;
  aspectRatio: number;
  state: AssetState;
  formatType: VideoFormatType;
}

export interface BgAsset {
  id: string;
  url: string;
  playFullMusic: boolean;
  name: string;
}

export interface BffAsset {
  id: string;
  url: string;
}

export interface SpokenLayerBrief {
  promoting: string;
  reachWho: string;
  toneAndFeel: string;
  postListenSentiment: string;
  talkingPoints: string;
  callToAction: string;
  vanityUrlOrDiscountCode: string;
  genderPref: string;
  additionalInstructions: string;
  brandName: string;
  creativeName: string;
}

export interface CreateBffVoiceover {
  transcript?: string;
  instructions?: string;
  locale?: string;
  voice?: string;
  spokenlayerBrief?: SpokenLayerBrief;
}

export interface BffVoiceover extends CreateBffVoiceover {
  id: string;
  state: EffectiveVoState;
}

export interface CreativeDetails {
  creativeId?: string;
  adAccountId?: string;
  name?: string;
  creativeState?: BffCreativeState;
  spotifyPreviewUri?: string;
  clickthroughUrl?: string;
  brandName?: string;
  tagLine?: string;
  audio?: BffAudio;
  bg?: BgAsset;
  image?: BffAsset;
  voiceover?: IBffVoiceover;
  ctaText?: string;
  artistId?: string;
  creativesAreStillProcessing?: boolean;
  format?: FormatType;
  objective?: Objective;
  video?: BffVideo;
  isAdgen?: boolean;
  targetedLocale?: string;
  moatEnabled?: boolean;
  iasPixel?: string;
  trackingPixel?: Array<ThirdPartyPixel>;
}

export interface CreateCreativePayload {
  adAccountId: string;
  name: string;
  banner?: string;
  fullmixId?: string;
  clickthroughUrl?: string;
  voiceover?: CreateBffVoiceover;
  bgMusicId?: string;
  playFullMusic?: boolean;
  ctaText?: string;
  objective: Objective;
  artistId?: string;
  flightId?: string;
  videoId?: string;
  brandName?: string;
  tagLine?: string;
  duplicatedCreativeId?: string;
  copiedCreativeId?: string;
  format: FormatType;
  targetedLocale?: string;
  moatEnabled?: boolean;
  iasPixel?: string;
  trackingPixel?: Array<ThirdPartyPixel>;
  hierarchyDraftId?: string;
  duplicationType?: DuplicationType;
  serveOnMegaphone: boolean;
}

export type EditCreativePayload = Omit<
  CreateCreativePayload,
  | 'objective'
  | 'artistId'
  | 'voiceover'
  | 'bgMusicId'
  | 'playFullMusic'
  | 'serveOnMegaphone'
> & {
  creativeId: string;
};

export interface CreativeBreadcrumb {
  flightName?: string;
  flightId?: string;
  campaignName: string;
  campaignId: string;
}

export enum ViewabilityMeasurementType {
  MOAT = 'MOAT',
  IAS = 'IAS',
  VIEWABILITY_NONE = 'VIEWABILITY_NONE',
}
