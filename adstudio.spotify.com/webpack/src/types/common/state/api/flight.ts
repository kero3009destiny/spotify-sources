import { com as GeoLocationProto } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/targetingservice/proto/GeoLocation';
export type GeoLocationType = GeoLocationProto.spotify.targetingservice.proto.GeoLocation.Type;
import { BffFlightState } from './flights';
import { com as GetFlightResponseProto } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetFlightResponse';
type IGetFlightResponse = GetFlightResponseProto.spotify.adstudiobff.proto.IGetFlightResponse;

import { com as LifetimeStatsResponseProto } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/LifetimeStatsResponse';
type ILifetimeStatsResponse = LifetimeStatsResponseProto.spotify.adstudiobff.proto.ILifetimeStatsResponse;
import { com as GetCombinedAudienceStatsResponseProto } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/GetCombinedAudienceStatsResponse';
type IGetCombinedAudienceStatsResponse = GetCombinedAudienceStatsResponseProto.spotify.adstudiobff.proto.IGetCombinedAudienceStatsResponse;
import { com as CombinedDailyStatResponse } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/CombinedDailyStatResponse';
type ICombinedDailyStatResponse = CombinedDailyStatResponse.spotify.adstudiobff.proto.ICombinedDailyStatResponse;
import { com as LifetimeStreamingConversionStatsResponseProto } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/LifetimeStreamingConversionStatsResponse';
import { com as CostType } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/ads/protobuf/CostType';
import { Objective, CampaignDetails } from 'types/common/state/api/campaign';

import {
  AudienceStat,
  DailyCPCL,
  DailyCPM,
  FlightStatMetadata,
  LifetimeCPCL,
  LifetimeCPM,
  Money,
} from './flush';
import { FormatType } from './format';
import { FrequencyCap } from 'types/common/campaignHierarchy/types';
import { DuplicationType } from './bff';

export type PricingModel = CostType.spotify.ads.protobuf.CostType | 'CPCV';

export const FlightPricingModel: Record<PricingModel, PricingModel> = {
  UNSET: 'UNSET',
  CPM: 'CPM',
  CPCL: 'CPCL',
  CPC: 'CPC',
  CPCV: 'CPCV',
};

type ILifetimeStreamingConversionStatsResponse = LifetimeStreamingConversionStatsResponseProto.spotify.adstudiobff.proto.ILifetimeStreamingConversionStatsResponse;

export interface GetFlightResponse extends IGetFlightResponse {
  flightState?: BffFlightState;
}

export interface LifetimeStatsResponse extends ILifetimeStatsResponse {}

export interface CombinedDailyStatResponse extends ICombinedDailyStatResponse {}

export interface CombinedAudienceStatsResponse
  extends IGetCombinedAudienceStatsResponse {}

export interface LifetimeStreamingConversionStatsResponse
  extends ILifetimeStreamingConversionStatsResponse {}

export interface FlightLifetimeStats {
  lifetimeCpmStats?: LifetimeCPM;
  lifetimeCpclStats?: LifetimeCPCL;
}

export interface FlightCombinedDailyStats {
  flightData?: FlightStatMetadata;
  dailyCpmStats?: DailyCPM[];
  dailyCpclStats?: DailyCPCL[];
}

export interface FlightCombinedAudienceStats {
  platformInsights?: GetAudienceStatsResponse;
  ageInsights?: GetAudienceStatsResponse;
  genderInsights?: GetAudienceStatsResponse;
  genreInsights?: GetAudienceStatsResponse;
}

export interface FlightLifetimeStreamingConversionStats {
  listeners?: number | null;
  newListeners?: number | null;
  conversionRate?: number | null;
  completionRate?: number | null;
  newListenerConversionRate?: number | null;
  streams?: number | null;
  newListenerStreams?: number | null;
  intentRate?: number | null;
  averageStreams?: number | null;
  newListenerAverageStreams?: number | null;
}

export interface GetAudienceStatsResponse {
  stats: AudienceStat[];
}

export interface FlightDetails {
  flightId?: string;
  adAccountId?: string;
  name?: string;
  dateBegin?: string;
  dateEnd?: string;
  flightState?: BffFlightState;
  frequencyCaps?: Array<FrequencyCap> | null; // bff expects null sometimes?
  targeting?: Targeting;
  totalBudget?: Budget;
  objective?: string;
  adId?: string;
  campaignId?: string;
  artistId?: string;
  pricingModel?: PricingModel;
  format?: FormatType;
  campaign?: CampaignDetails;
  isActive?: boolean;
  aspectRatio?: number;
  frequencyCap?: FrequencyCap[];
  withFrequencyCap?: boolean;
  serveOnMegaphone?: boolean;
  ageRanges?: AgeRange[];
}

export interface Geo {
  id: string;
  countryCode: string;
  name: string;
  typeDisplayName: string;
  geoType: GeoLocationType;
  parentName: string;
  searchable?: boolean;
  targetableByAdserving?: boolean;
}

// Targeting service Geo models diverge from BFF's expectation of a GEO
export type TargetingServiceGeo = Omit<Geo, 'geoType' | 'id'> & {
  geoId: string;
  type: GeoLocationType;
};

export interface Target {
  id: string;
  name?: string;
  setId?: string;
  setName?: string;
}

export type AgeRange = {
  ageMin?: number;
  ageMax?: number;
};

export interface CreateOrEditTargeting {
  ageMin: number;
  ageMax: number;
  geo: TargetingServiceGeo[];
  platforms: string[];
  genders: string[];
  genres: Target[];
  moments: Target[];
  audienceData: Target[];
  audienceSegmentIds: string[];
  customAudienceIds: string[];
  ageRanges: AgeRange[];
  contextualTargetingCategories: string[];
  brandSafetyCategories: string[];
  competitiveSeparationCategory: string;
  competitiveSeparationSubcategory: string;
}

export type Targeting = Omit<CreateOrEditTargeting, 'geo'> & {
  audiences: string[];
  targetedCountry: Geo[];
  geo: Geo[];
};

export interface Budget {
  amount: number;
  currency: string;
}

export interface CreateFlightPayload {
  adAccountId: string;
  campaignId: string;
  name: string;
  dateBegin: string;
  dateEnd: string;
  targeting: CreateOrEditTargeting;
  totalBudget: Money;
  objective: Objective;
  artistId?: string;
  purchaseOrderNumber?: string;
  format: FormatType;
  aspectRatio: number;
  draftId?: string;
  duplicatedFlightId?: string;
  copiedFlightId?: string;
  frequencyCap?: FrequencyCap[];
  audienceMatchIds?: string[];
  hierarchyDraftId?: string;
  duplicationType?: DuplicationType;
  serveOnMegaphone: boolean;
}

export type EditFlightPayload = Omit<
  CreateFlightPayload,
  | 'campaignId'
  | 'objective'
  | 'format'
  | 'aspectRatio'
  | 'draftId'
  | 'serveOnMegaphone'
> & {
  flightId: string;
};

export enum PauseResumeFlightActionType {
  UNSET = 'UNSET',
  PAUSE = 'PAUSE',
  RESUME = 'RESUME',
}
