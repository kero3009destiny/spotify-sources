import { AudioType } from 'config/audioTypes';
import { FormatType } from './format';
import { Objective } from './campaign';
import { com as EnrichedDraftRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/EnrichedDraft';
import { com as EnrichedCreativeDraftRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/EnrichedCreativeDraft';
import { com as EnrichedCreativeDraftFormValuesRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/EnrichedCreativeDraftFormValues';
import { com as EnrichedVoiceoverDraftRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/EnrichedVoiceoverDraft';
import { com as DraftStatusRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/ads/adstudiodrafts/DraftStatus';
import {
  Placement,
  Gender,
  ListenerCategory,
  Genre,
  FrequencyCap,
  Artist,
} from 'types/common/campaignHierarchy/types';
import { AgeRange, Geo } from 'types/common/state/api/flight';
import { com as DraftRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/ads/adstudiodrafts/Draft';
import { ApiQueryParams, Paging } from '.';
import { BffTarget } from './bff';
import { ThirdPartyPixel } from './creative';

type EnrichedDraft = EnrichedDraftRoot.spotify.adstudiobff.proto.EnrichedDraft; // intentionally not exported
type EnrichedCreativeDraftProto = EnrichedCreativeDraftRoot.spotify.adstudiobff.proto.EnrichedCreativeDraft;
type EnrichedCreativeDraftFormValuesProto = EnrichedCreativeDraftFormValuesRoot.spotify.adstudiobff.proto.EnrichedCreativeDraftFormValues;
type EnrichedVoiceoverDraftProto = EnrichedVoiceoverDraftRoot.spotify.adstudiobff.proto.EnrichedVoiceoverDraft;
export type DraftStatusType = DraftStatusRoot.spotify.ads.adstudiodrafts.DraftStatus;
export type DraftSourceType = DraftRoot.spotify.ads.adstudiodrafts.Draft.Source;

export interface DraftType extends Partial<EnrichedDraft> {
  audienceSegmentIds?: string[];
  audioCreative?: AudioType | '';
  creativeFormat?: FormatType | '';
  gender?: Gender | '';
  listenerCategory?: ListenerCategory | '';
  momentIds?: string[];
  objective?: Objective | '';
  platforms?: string[];
  placement?: Placement | '';
  needsReview?: boolean;
  managedDraft?: boolean;
  source?: DraftSourceType | '';
  copiedFlightId?: string;
  copiedCreativeId?: string;
  audienceMatchIds?: string[];
  targetedLocale?: string;
}

export const DraftState: Record<DraftStatusType, DraftStatusType> = {
  UNSET: 'UNSET',
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED',
  COMPLETE: 'COMPLETE',
};

export const ADVERTISER_SOURCE: DraftSourceType = 'ADVERTISER';
export const IMPERSONATOR_SOURCE: DraftSourceType = 'IMPERSONATOR';

/**
 * HIERARCHY DRAFTS
 *
 * types are still in flux, but based on this spec: https://ghe.spotify.net/gist/kylel/91da876166d74c33a061b62fa71817b2
 */

export enum DraftStatus {
  UNSET = 'UNSET',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  COMPLETE = 'COMPLETE',
}

export enum CreateFlowType {
  UNSET = 'UNSET',
  COLD_START = 'COLD_START',
  ADD_TO_CAMPAIGN = 'ADD_TO_CAMPAIGN',
  ADD_TO_FLIGHT = 'ADD_TO_FLIGHT',
}

export interface HierarchyDraft {
  id: string;
  version: number;
  status: DraftStatus;
  createFlowType: CreateFlowType;
  source: DraftSourceType;
  managedDraft: boolean;
  needsReview: boolean;
  updated: string;
  userUpdated: string;
  adAccountId: string;
}

export interface CampaignDraftFormValues {
  campaignName?: string;
  objective?: Objective;
  purchaseOrderNumber?: string;
  artistId?: string;
}

export type EnrichedCampaignDraftFormValues = Omit<
  CampaignDraftFormValues,
  'artistId'
> & {
  artistId: BffTarget[];
};

export interface CampaignDraft {
  id: string;
  hierarchyDraftId: string;
  formValues: CampaignDraftFormValues;
}

export type EnrichedCampaignDraft = Omit<CampaignDraft, 'formValues'> & {
  enrichedFormValues: EnrichedCampaignDraftFormValues;
};

export interface FlightDraftFormValues {
  flightName?: string;
  duplicatedFromFlightId?: string;
  format?: FormatType;
  placement?: Placement;
  selectedAspectRatio?: number;
  totalBudget?: string;
  startDate?: string;
  endDate?: string;
  currency?: string;
  listenerCategory?: ListenerCategory;
  ageMin?: string;
  ageMax?: string;
  gender?: Gender;
  country?: string;
  targetWholeCountry?: boolean;
  locationIds?: string[];
  platforms?: string[];
  momentIds?: string[];
  genreIds?: string[];
  fanAudienceIds?: string[];
  audienceSegmentIds?: string[];
  dailyFreqCap?: number;
  weeklyFreqCap?: number;
  monthlyFreqCap?: number;
  copiedFlightId?: string;
  frequencyCap?: FrequencyCap[];
  withFrequencyCap?: boolean;
  audienceMatchIds?: string[];
  contentSafetyIds?: string[];
  contextualTargetingIds?: string[];
  ageRanges?: AgeRange[];
  competitiveSeparationCategory?: string;
  competitiveSeparationSubcategory?: string;
}

export type EnrichedFlightDraftFormValues = Omit<
  FlightDraftFormValues,
  | 'country'
  | 'locationIds'
  | 'momentIds'
  | 'genreIds'
  | 'fanAudienceIds'
  | 'audienceSegmentIds'
> & {
  country?: Geo[];
  locationIds?: Geo[];
  momentIds?: string[];
  genreIds?: Genre[];
  fanAudienceIds?: Artist[];
  audienceSegmentIds?: string[];
};

export interface FlightDraft {
  id: string;
  hierarchyDraftId: string;
  csCampaignId?: string;
  formValues: FlightDraftFormValues;
}

export type EnrichedFlightDraft = Omit<FlightDraft, 'formValues'> & {
  enrichedFormValues: EnrichedFlightDraftFormValues;
};

export interface EnrichedVoiceoverDraft
  extends Partial<EnrichedVoiceoverDraftProto> {}

// Nested protobuf types need to be overridden manually or they will default to 'any'
export interface EnrichedCreativeDraftFormValues
  extends Partial<EnrichedCreativeDraftFormValuesProto> {
  enrichedVoiceover?: EnrichedVoiceoverDraft;
  trackingPixel?: ThirdPartyPixel[];
  audioType?: AudioType;
  format?: FormatType;
}

export interface EnrichedCreativeDraft
  extends Partial<EnrichedCreativeDraftProto> {
  enrichedFormValues: EnrichedCreativeDraftFormValues;
}

export interface CreativeDraftFormValues
  extends Omit<EnrichedCreativeDraftFormValues, 'enrichedVoiceover'> {
  voiceover?: EnrichedVoiceoverDraft;
}

export interface CreativeDraft
  extends Omit<EnrichedCreativeDraft, 'enrichedFormValues'> {
  formValues: CreativeDraftFormValues;
}

export interface CatalogueDraft {
  bffHierarchyDraft: HierarchyDraft;
  campaignDraft?: CampaignDraft;
  flightDraft?: FlightDraft;
  creativeDraft?: CreativeDraft;
}

export interface CampaignDraftQueryParams extends ApiQueryParams {
  adAccountId: string;
  searchWord?: string;
  hierarchyDraftIds?: string[];
}

export interface FlightDraftQueryParams extends ApiQueryParams {
  adAccountId: string;
  searchWord?: string;
  campaignId?: string;
  campaignIds?: string[];
  hierarchyDraftIds?: string[];
}

export interface CreativeDraftQueryParams extends ApiQueryParams {
  adAccountId: string;
  searchWord?: string;
  flightId?: string;
  flightIds?: string[];
  campaignId?: string;
  campaignIds?: string[];
  hierarchyDraftIds?: string[];
}

export interface ReviewableDraftQueryParams extends ApiQueryParams {
  adAccountId: string;
}

export interface CatalogueDraftApiResponse {
  items: CatalogueDraft[];
  paging: Paging;
}

export interface CreateColdStartDraftResponse {
  hierarchyDraftId: string;
  campaignDraftId: string;
  flightDraftId: string;
  creativeDraftId: string;
}

export interface CreateDraftForExistingCampaignResponse {
  hierarchyDraftId: string;
  flightDraftId: string;
  creativeDraftId: string;
}

export interface CreateDraftForExistingFlightResponse {
  hierarchyDraftId: string;
  creativeDraftId: string;
}

export interface EnrichedDraftApiResponse {
  bffHierarchyDraft: HierarchyDraft;
  enrichedCampaignDraft?: EnrichedCampaignDraft;
  enrichedFlightDraft?: EnrichedFlightDraft;
  enrichedCreativeDraft?: EnrichedCreativeDraft;
}
