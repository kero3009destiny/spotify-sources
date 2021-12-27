import { UploadInfo } from 'types/common/state/api/upload';
import { Objective } from 'types/common/state/api/campaign';
import { AgeRange, TargetingServiceGeo } from '../state/api/flight';
import { AudioType } from 'config/audioTypes';
import { PlatformKey } from 'config/platforms';
import { FormatType } from '../state/api/format';
import { ViewabilityMeasurementType } from '../state/api/creative';
import {
  Categories as TargetingCategories,
  ContentSafetyCategory as TargetingContentSafetyCategory,
  ContextualTargetingCategory as TargetingContextualTargetingCategory,
} from '@spotify-internal/targetingservice/proto/com/spotify/targetingservice/proto/service_pb';
/**
 * Types for the relationships between create form sections
 * and existing entities for 1XY campaign building.
 */

// disambiguate form objects from references to existing entities
export enum PersistenceState {
  // objects created entirely from scratch
  PRE_SAVED = 'PRE_SAVED',
  // references to existing entities
  EXISTING = 'EXISTING',
  // net new objects that duplicate existing entities with certain immutable properties
  DUPLICATE = 'DUPLICATE',
  // net new objects pre-populated with components of existing entities
  COPY_OF_EXISTING = 'COPY_OF_EXISTING',
}

// identify the individual form section type
export enum FormType {
  CAMPAIGN = 'CAMPAIGN',
  FLIGHT = 'FLIGHT',
  CREATIVE = 'CREATIVE',
  PAYMENT = 'PAYMENT',
  SUCCESS = 'SUCCESS',
}

// base interface for form state related to a campaign, flight or creative
export interface PreSavedEntity {
  persistenceState:
    | PersistenceState.PRE_SAVED
    | PersistenceState.DUPLICATE
    | PersistenceState.COPY_OF_EXISTING;
  name?: string;
}

// base interface referencing an existing campaign, flight or creative
export interface ExistingEntity {
  persistenceState: PersistenceState.EXISTING;
  id: string;
}

interface CampaignDetails {
  name?: string;
  objective?: Objective;
  artist?: Artist[];
  purchaseOrderNumber?: string;
}

// individual campaign details and form section state
export type CampaignFormValues = PreSavedEntity & CampaignDetails;

// reference to an existing campaign in a form section
export type ExistingCampaign = ExistingEntity & CampaignDetails;

export enum Placement {
  MUSIC = 'MUSIC',
  PODCASTS = 'PODCASTS',
}

const FREQUENCY_CAP_DAY_UNIT: number = 1;
const FREQUENCY_CAP_WEEK_UNIT: number = 2;
const FREQUENCY_CAP_MONTH_UNIT: number = 3;

export enum FrequencyCapUnit {
  days = FREQUENCY_CAP_DAY_UNIT,
  weeks = FREQUENCY_CAP_WEEK_UNIT,
  months = FREQUENCY_CAP_MONTH_UNIT,
}

export enum FrequencyCapTimeUnitString {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}

export interface FrequencyCapAPIResponse
  extends Omit<FrequencyCap, 'timeUnit'> {
  timeUnit: FrequencyCapTimeUnitString;
}

/** Maps { timeUnit: "DAY" } to  { timeUnit: 1 } */
export const FrequencyCapAPIResponseTimeUnitMapper = {
  [FrequencyCapTimeUnitString.DAY]: FrequencyCapUnit.days,
  [FrequencyCapTimeUnitString.WEEK]: FrequencyCapUnit.weeks,
  [FrequencyCapTimeUnitString.MONTH]: FrequencyCapUnit.months,
};

export interface FrequencyCap {
  isCustom?: boolean;
  maxImpressions: number;
  time: number;
  timeUnit: FrequencyCapUnit;
}

interface FlightDetails {
  name?: string;
  dateRange?: DateRange;
  totalBudget?: string;
  platforms?: PlatformTargeting;
  ageMin?: string;
  ageMax?: string;
  ageRanges?: AgeRange[];
  genders?: Gender;
  frequencyCap?: FrequencyCap[];
  withFrequencyCap?: boolean;
  country?: TargetingServiceGeo[];
  locations?: TargetingServiceGeo[];
  targetWholeCountry?: boolean;
  listenerCategory: ListenerCategory;
  audienceSegments?: Record<string, boolean>;
  customAudiences?: string[];
  playlists?: Record<string, boolean>;
  genres?: Genre[];
  fanAudiences?: Artist[];
  minAudienceThresholdReached?: boolean;
  aspectRatio?: number;
  format?: FormatType;
  placement?: Placement;
  copiedFlightId?: string;
  contentSafetyIds?: string[];
  contextualTargetingIds?: string[];
  serveOnMegaphone?: boolean;
  competitiveSeparationCategory?: string;
  competitiveSeparationSubcategory?: string;
}

// individual flight details and form section state
export type FlightFormValues = PreSavedEntity & FlightDetails;

// reference to an existing flight in a form section
export type ExistingFlight = ExistingEntity & FlightDetails;

export interface CreativeFormValues {
  name?: string;
  imageUploader?: UploadInfo;
  ctaText?: string;
  clickthroughUrl?: string;
  audioUploader?: UploadInfo | undefined;
  locale?: string;
  voice?: string;
  instructions?: string;
  transcript?: string;
  audioType?: AudioType;
  playFullTrack?: boolean;
  bgMusicUploader?: UploadInfo;
  objective?: Objective;
  videoUploader?: UploadInfo | undefined;
  brandName?: string;
  tagLine?: string;
  stockCompanionImage?: string;
  copiedCreativeId?: string;
  viewabilityMeasurement?: ViewabilityMeasurementType | undefined;
  viewabilityPixel?: string;
  impressionPixel?: Array<Pixel>;
  targetedLocale?: string;
  promoting?: string;
  reachWho?: string;
  toneAndFeel?: string;
  postListenSentiment?: string;
  talkingPoints?: string;
  callToAction?: string;
  vanityUrlOrDiscountCode?: string;
  genderPref?: string;
  additionalInstructions?: string;
}

// individual creative details and form section state
export type PreSavedCreativeFormValues = CreativeFormValues & PreSavedEntity;

// individual creative details and form section state
export interface ExistingCreativeFormValues
  extends ExistingEntity,
    CreativeFormValues {
  format?: FormatType;
  aspectRatio?: number;
}

// reference to an existing creative in a form section
export type ExistingCreative = ExistingEntity & ExistingCreativeFormValues;

// payment form section state
export interface LegalFormValues {
  ipRights?: boolean;
  adStudioTerms?: boolean;
  impersonationTerms?: boolean;
}

// parent form state for the cold start create flow of
// a new or existing campaign, with one or more flights,
// one or more creatives, their relationships, payment, and if managed draft.
export interface CreateFormValues {
  campaign: CampaignFormValues | ExistingCampaign;
  flights: Array<FlightFormValues | ExistingFlight>;
  creatives: Array<PreSavedCreativeFormValues | ExistingCreative>;
  payment?: LegalFormValues;
  isManagedDraft?: boolean;
}

// form state for adding a flight to an existing campaign.
// mocks may have this flow more closely resemble the
// cold start flow in the future.
export interface CreateFlightFormValues {
  campaign: ExistingCampaign;
  flight: FlightFormValues;
  creative: PreSavedCreativeFormValues;
  payment?: LegalFormValues;
  isManagedDraft?: boolean;
}

// form state for adding a creative to an existing flight.
// mocks may have this flow more closely resemble the
// cold start flow in the future.
export interface CreateCreativeFormValues {
  campaign: ExistingCampaign;
  flight: ExistingFlight;
  creative: PreSavedCreativeFormValues;
  payment?: LegalFormValues;
  isManagedDraft?: boolean;
}

// form state for duplicating a flight and copying
// all of that flight's creatives without capturing edits.
export interface DuplicateFlightWithCreativesFormValues {
  campaign: ExistingCampaign;
  flight: FlightFormValues;
  creatives: DuplicateCreativeFormValues[];
  payment?: LegalFormValues;
}

// form state for duplicating a creative. flightId may be a
// currently linked flight or a new flight in any number of campaigns.
export interface DuplicateCreativeFormValues
  extends PreSavedCreativeFormValues,
    LegalFormValues {
  persistenceState: PersistenceState.DUPLICATE;
  flightId?: string;
  duplicatedCreativeId?: string;
  format: FormatType;
}

export interface Artist {
  id: string;
  images?: any[];
  name?: string;
}

export interface DateRange {
  begin: string | Date;
  end: string | Date;
}

export type PlatformTargeting = {
  [K in PlatformKey]: boolean;
};

export interface Genre {
  id: string;
  name: string;
}

export enum Gender {
  ALL = 'All',
  MALE = 'Male',
  FEMALE = 'Female',
}

// Updated to be interoperable with the existing constants
// as we want 1:1:1 drafts to work in 1:x:y
export enum ListenerCategory {
  DEFAULT = '',
  GENRE = 'listener-genre',
  PLAYLIST = 'listener-moment',
  FAN = 'listener-fan',
  AUDIENCE_SEGMENT = 'listener-audience-segments',
}

export interface LanguageOption {
  id: string;
  value: string;
}

export interface VoiceoverProfile {
  id: string;
  value: string;
}

export interface Asset {
  uri?: string;
  gcsUri?: string;
}

// Third party tracking pixel
export interface Pixel {
  value?: string;
  id?: string;
  key?: string;
  // Flag to track whether advertiser (not impersonator) has changed this field,
  // used to filter out invalid pixel values so they are not saved
  advertiserModified?: boolean;
}

export type ContextualTargetingCategories = TargetingCategories.AsObject;
export type ContentSafetyCategory = TargetingContentSafetyCategory.AsObject;
export type ContextualTargetingCategory = TargetingContextualTargetingCategory.AsObject;
