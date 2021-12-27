import i18n from 'i18next';
import { isEmpty } from 'lodash';
import { validateImpressionTrackingUrl } from 'validators/viewabilityMeasurement';

import { ThirdPartyPixel as ThirdPartyPixelProto } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/ads/campaignservice/ThirdPartyPixel';

import { CreativeDetailsState } from 'ducks/creatives/reducer';

import { isDcmImpressionPixel } from 'components/CreativeForm/Fields/ImpressionTracking/constants';
import { AGE_RANGE_DEFAULT_VALUES } from 'components/FlightForm/Fields/AgeRanges/Field';

import { fillObject, getGcsBucketUri } from 'utilities';
import {
  getInitialBeginDate,
  getInitialEndDate,
  hasDatePassed,
  parseDateOrFastforward,
} from 'utils/dateHelpers';
import { momentsFill, platformFill, segmentsFill } from 'utils/targeting';

import {
  getPlacementFromFormat,
  isPodcastFormatType,
} from '../creativeHelpers';
import { containsInvalidAgeRange } from '../flightHelpers';
import { isDefaultOrLegacyFrequencyCapSet } from './frequencyCaps';
import { getInitialFlightFormValues } from './initialValues';

import { ASPECT_RATIOS, BUSINESS_PROMO } from 'config/adCreation';
import { AudioType } from 'config/audioTypes';
import { FREQUENCY_CAPS_DEFAULT_VALUES } from 'config/frequencyCaps';

import {
  CampaignFormValues,
  DateRange,
  DuplicateCreativeFormValues,
  ExistingCampaign,
  ExistingCreative,
  ExistingFlight,
  FlightFormValues,
  FrequencyCapUnit,
  Gender,
  Genre,
  ListenerCategory,
  PersistenceState,
  Pixel,
  Placement,
  PlatformTargeting,
  PreSavedCreativeFormValues,
} from 'types/common/campaignHierarchy/types';
import { CampaignDetails, Objective } from 'types/common/state/api/campaign';
import {
  CreativeDetails,
  ThirdPartyPixel,
  ViewabilityMeasurementType,
} from 'types/common/state/api/creative';
import { DraftType } from 'types/common/state/api/drafts';
import {
  AgeRange,
  CreateOrEditTargeting,
  FlightDetails,
  Geo,
  Target,
  Targeting,
  TargetingServiceGeo,
} from 'types/common/state/api/flight';
import { Format, FormatType } from 'types/common/state/api/format';
import { UploadInfo } from 'types/common/state/api/upload';

// Map 3rd-party tracking from API values to form
export const mapThirdPartyTrackingValuesToForm = (
  isMoatEnabled: boolean | undefined,
  iasPixel: string | undefined,
  trackingPixel: ThirdPartyPixel[] | undefined,
): Partial<PreSavedCreativeFormValues> => {
  let viewabilityMeasurement = ViewabilityMeasurementType.VIEWABILITY_NONE;
  if (isMoatEnabled) {
    viewabilityMeasurement = ViewabilityMeasurementType.MOAT;
  } else if (!isEmpty(iasPixel)) {
    viewabilityMeasurement = ViewabilityMeasurementType.IAS;
  }
  const viewabilityPixel = !isEmpty(iasPixel) ? iasPixel : undefined;
  // default to an empty pixel so that the field array will initialize with a DropdownWithTextField
  // with "None" selected
  let impressionPixel: Pixel[] = [{ key: '', value: '' }];
  if (trackingPixel && trackingPixel.length) {
    const pixelFieldArray: Pixel[] = [];
    trackingPixel.forEach(pixel => {
      pixelFieldArray.push({ key: pixel.trackingEventType, value: pixel.url });
    });
    // in the case where an super user has created the draft with pixels, but where none meet the Impressions/DCM tracking
    // pixel criteria, we need to include a "None" pixel in order to render the FieldArray properly.
    impressionPixel = !pixelFieldArray.some(isDcmImpressionPixel)
      ? [...impressionPixel, ...pixelFieldArray]
      : pixelFieldArray;
  }

  return {
    viewabilityMeasurement,
    viewabilityPixel,
    impressionPixel,
  };
};

// Filter out pixels without a key, or any advertiser-modified fields that are not valid
// (otherwise invalid fields will not appear when editing and cannot be deleted)
const isValidPixel = (pixel: Pixel): boolean =>
  pixel.key !== '' &&
  !(
    pixel.advertiserModified && validateImpressionTrackingUrl(pixel.value || '')
  );

// Map 3rd-party tracking from form values to API
export const mapFormToThirdPartyTrackingValues = (
  formValues: Pick<
    PreSavedCreativeFormValues,
    'viewabilityMeasurement' | 'viewabilityPixel' | 'impressionPixel'
  >,
): Pick<CreativeDetails, 'moatEnabled' | 'iasPixel' | 'trackingPixel'> => {
  const moatEnabled =
    formValues.viewabilityMeasurement === ViewabilityMeasurementType.MOAT
      ? true
      : false;

  const iasPixel = !isEmpty(formValues.viewabilityPixel)
    ? formValues.viewabilityPixel
    : '';

  let trackingPixels: ThirdPartyPixel[] = [];

  if (formValues.impressionPixel) {
    trackingPixels = formValues.impressionPixel
      .filter(isValidPixel)
      .map(pixel =>
        new ThirdPartyPixelProto()
          .setTrackingEventType(pixel.key!)
          .setUrl(pixel.value!),
      );
  }

  return {
    moatEnabled,
    iasPixel,
    trackingPixel: trackingPixels.length ? trackingPixels : undefined,
  };
};

export const parseDateValue = (
  dateRange: DateRange,
  key: keyof DateRange,
): string => {
  const dateValue: string | Date = dateRange[key];

  if (typeof dateValue === 'string') {
    return dateValue;
  }

  return (dateValue as Date).toISOString();
};

export const mapFlightFormTargetingPlacement = (
  formState: FlightFormValues | ExistingFlight,
): string[] => {
  return Object.keys(formState.platforms!).filter(
    p => !!formState.platforms![p as keyof PlatformTargeting],
  );
};

export const mapFlightFormTargeting = (
  formState: FlightFormValues | ExistingFlight,
): CreateOrEditTargeting => {
  const listenerCategory = formState.listenerCategory;
  const geo: TargetingServiceGeo[] = formState.targetWholeCountry
    ? formState.country!
    : formState.locations!;
  const platforms = mapFlightFormTargetingPlacement(formState);
  const genders =
    formState.genders === Gender.ALL
      ? [Gender.MALE, Gender.FEMALE]
      : [formState.genders!];
  const genres =
    listenerCategory === ListenerCategory.GENRE ? formState.genres! : [];
  const moments =
    listenerCategory === ListenerCategory.PLAYLIST
      ? Object.keys(formState.playlists!).reduce(
          (accum: Target[], playlist: string) => {
            if (formState.playlists![playlist]) {
              accum.push({ id: playlist });
            }

            return accum;
          },
          [],
        )
      : [];
  const audienceData =
    listenerCategory === ListenerCategory.FAN
      ? formState.fanAudiences!.map(artist => ({
          id: artist.id,
        }))
      : [];
  const audienceSegmentIds =
    listenerCategory === ListenerCategory.AUDIENCE_SEGMENT
      ? Object.keys(formState.audienceSegments!).filter(
          as => !!formState.audienceSegments![as],
        )
      : [];

  const customAudienceIds: string[] = formState.customAudiences ?? [];
  const contextualTargetingCategories: string[] =
    formState.contextualTargetingIds ?? [];
  const brandSafetyCategories: string[] = formState.contentSafetyIds ?? [];
  const competitiveSeparationCategory = formState.competitiveSeparationCategory!;
  const competitiveSeparationSubcategory = formState.competitiveSeparationSubcategory!;
  return {
    ageMin: Number(formState.ageMin!),
    ageMax: Number(formState.ageMax!),
    ageRanges: formState.ageRanges!,
    geo,
    platforms,
    genders,
    genres,
    moments,
    audienceData,
    audienceSegmentIds,
    customAudienceIds,
    contextualTargetingCategories,
    brandSafetyCategories,
    competitiveSeparationCategory,
    competitiveSeparationSubcategory,
  };
};

export const mapCampaignDetailsToExistingCampaign = (
  campaign: CampaignDetails,
): ExistingCampaign => {
  return {
    persistenceState: PersistenceState.EXISTING,
    id: campaign.campaignId!,
    name: campaign.name!,
    objective: campaign.objective! as Objective,
    purchaseOrderNumber: campaign.purchaseOrderNumber,
    artist:
      campaign.artistId && campaign.artistName
        ? [
            {
              id: campaign.artistId!,
              name: campaign.artistName!,
            },
          ]
        : undefined,
  };
};

export const parseGender = (genders: string[]): Gender => {
  if (genders.length > 1) {
    return Gender.ALL;
  }

  return genders[0] as Gender;
};

export const mapGeoToTargetingGeo = (geo: Geo): TargetingServiceGeo => {
  return {
    countryCode: geo.countryCode,
    name: geo.name,
    typeDisplayName: geo.typeDisplayName,
    parentName: geo.parentName,
    geoId: geo.id,
    type: geo.geoType,
  };
};

export const parseListenerCategory = (
  targeting: Targeting,
): ListenerCategory => {
  if (targeting.genres.length) {
    return ListenerCategory.GENRE;
  }

  if (targeting.audienceData.length) {
    return ListenerCategory.FAN;
  }

  if (targeting.audienceSegmentIds.length) {
    return ListenerCategory.AUDIENCE_SEGMENT;
  }

  if (targeting.moments.length) {
    return ListenerCategory.PLAYLIST;
  }

  return ListenerCategory.DEFAULT;
};

const determineAudioType = (
  creative: CreativeDetails | CreativeDetailsState,
): AudioType => {
  const isPodcast = creative.format === Format.AUDIO_PODCAST;

  if (isPodcast) {
    return AudioType.SPOKEN_LAYER_FULLMIX;
  }

  return AudioType.UPLOADED_AUDIO;
};

const mapCreativeDetailsToFormValues = (
  creative: CreativeDetails | CreativeDetailsState,
  objective: Objective,
  persistenceState: PersistenceState,
) => {
  const audioType = determineAudioType(creative);
  const audioUploaderUri = creative.audio?.oggUrl
    ? creative.audio?.oggUrl!
    : getGcsBucketUri(creative.audio?.id!);

  const thirdPartyTrackingValues =
    persistenceState === PersistenceState.EXISTING
      ? mapThirdPartyTrackingValuesToForm(
          creative.moatEnabled,
          creative.iasPixel,
          creative.trackingPixel,
        )
      : {
          viewabilityMeasurement: creative.moatEnabled
            ? ViewabilityMeasurementType.MOAT
            : ViewabilityMeasurementType.VIEWABILITY_NONE,
          viewabilityPixel: undefined,
          impressionPixel: [{ key: '', value: '' }],
        };

  return {
    name: creative.name,
    ctaText: creative.ctaText,
    clickthroughUrl: creative.clickthroughUrl,
    brandName: creative.brandName,
    tagLine: creative.tagLine,
    audioUploader: creative.audio?.id
      ? {
          name: creative.name!,
          gcsUri: audioUploaderUri,
          uri: audioUploaderUri,
          id: creative.audio?.id!,
        }
      : undefined,
    imageUploader: creative.image?.url
      ? {
          name: creative.name!,
          gcsUri: creative.image?.url!,
          uri: creative.image?.url,
          id: creative.image?.id,
        }
      : undefined,
    audioType,
    objective,
    videoUploader: {
      name: creative.name!,
      gcsUri: creative.video?.userUploadedAssetUrl!,
      uri: creative.video?.userUploadedAssetUrl,
      id: creative.video?.id!,
      aspectRatio: creative.video?.aspectRatio!,
    },
    format: creative.format!,
    aspectRatio: creative.video
      ? creative.video!.aspectRatio
      : ASPECT_RATIOS.UNKNOWN,
    targetedLocale: creative.targetedLocale || i18n.language,
    ...thirdPartyTrackingValues,
  };
};

export const mapCreativeDetailsToExistingCreative = (
  creative: CreativeDetails | CreativeDetailsState,
): ExistingCreative => {
  const persistenceState = PersistenceState.EXISTING;
  return {
    ...mapCreativeDetailsToFormValues(
      creative,
      creative.objective!,
      persistenceState,
    ),
    id: creative.creativeId!,
    persistenceState,
  };
};

export const mapCreativeDetailsToDuplicateCreative = (
  creative: CreativeDetails | CreativeDetailsState,
  objective: Objective,
  flightId?: string,
): DuplicateCreativeFormValues => {
  const persistenceState = PersistenceState.DUPLICATE;
  return {
    ...mapCreativeDetailsToFormValues(creative, objective, persistenceState),
    name: i18n.t('I18N_SUFFIX_DUPLICATED_AD_NAME', {
      adName: creative.name,
      defaultValue: `${creative.name} (COPY)`,
    }),
    flightId,
    duplicatedCreativeId: creative.creativeId,
    persistenceState,
  };
};

export const mapCreativeDetailsToCopyOfCreative = (
  creative: CreativeDetails | CreativeDetailsState,
  objective: Objective,
): PreSavedCreativeFormValues => {
  const persistenceState = PersistenceState.COPY_OF_EXISTING;
  return {
    ...mapCreativeDetailsToFormValues(creative, objective, persistenceState),
    name: i18n.t('I18N_SUFFIX_DUPLICATED_AD_NAME', {
      adName: creative.name,
      defaultValue: `${creative.name} (COPY)`,
    }),
    persistenceState,
    copiedCreativeId: creative.creativeId,
  };
};

export const mapBulkCreativesToFormValues = (
  creatives: CreativeDetails[],
  flightId: string,
) =>
  creatives.map(creative =>
    mapCreativeDetailsToDuplicateCreative(
      creative,
      creative.objective!,
      flightId,
    ),
  );

const mapFlightDetailsToFormValues = (flight: FlightDetails) => {
  const targeting = flight.targeting!;
  const targetWholeCountry =
    targeting.geo.length === 1 && targeting.geo[0].geoType === 'COUNTRY';

  return {
    name: flight.name!,
    dateRange: {
      begin: flight.dateBegin!,
      end: flight.dateEnd!,
    },
    totalBudget: String(flight.totalBudget!.amount),
    platforms: (platformFill(
      targeting.platforms,
    ) as unknown) as PlatformTargeting,
    ageMin: String(targeting.ageMin),
    ageMax: String(targeting.ageMax),
    ageRanges: targeting.ageRanges,
    genders: parseGender(targeting.genders),
    country: targeting.targetedCountry!.map(mapGeoToTargetingGeo),
    // remove this when CITY and STATE is targetable
    locations: targetWholeCountry
      ? []
      : targeting.geo.map(mapGeoToTargetingGeo),
    targetWholeCountry,
    listenerCategory: parseListenerCategory(targeting),
    audienceSegments: segmentsFill(targeting.audienceSegmentIds),
    playlists: momentsFill(targeting.moments),
    genres: targeting.genres as Genre[],
    fanAudiences: targeting.audienceData,
    minAudienceThresholdReached: true,
    aspectRatio: flight.aspectRatio,
    format: flight.format,
    placement:
      flight.format === Format.AUDIO_PODCAST
        ? Placement.PODCASTS
        : Placement.MUSIC,
    frequencyCap: flight.frequencyCap,
    withFrequencyCap: flight.withFrequencyCap,
    customAudiences: flight.targeting?.customAudienceIds || [],
    serveOnMegaphone: !!flight.serveOnMegaphone,
    contentSafetyIds: flight.targeting?.brandSafetyCategories?.length
      ? flight.targeting?.brandSafetyCategories
      : undefined,
    contextualTargetingIds: flight.targeting?.contextualTargetingCategories
      ?.length
      ? flight.targeting?.contextualTargetingCategories
      : undefined,
    competitiveSeparationCategory:
      flight.targeting?.competitiveSeparationCategory,
    competitiveSeparationSubcategory:
      flight.targeting?.competitiveSeparationSubcategory,
  };
};

export const mapFlightDetailsToExistingFlight = (
  flight: FlightDetails,
): ExistingFlight => {
  return {
    ...mapFlightDetailsToFormValues(flight),
    persistenceState: PersistenceState.EXISTING,
    id: flight.flightId!,
  };
};

export const mapFlightDetailsToDuplicatedFlight = (
  flight: FlightDetails,
): FlightFormValues => {
  // @ts-ignore
  const flightHasStarted = hasDatePassed(flight.dateBegin);
  const baseValues = mapFlightDetailsToFormValues(flight);
  const ageRanges = getCorrectAgeRangesForFlight(baseValues);
  const isPodcast = isPodcastFormatType(flight.format);

  return {
    ...baseValues,
    ageRanges,
    locations: isPodcast ? [] : baseValues.locations,
    serveOnMegaphone: isPodcast,
    name: i18n.t('I18N_SUFFIX_DUPLICATED_AD_NAME', {
      adName: flight.name,
      defaultValue: `${flight.name} (COPY)`,
    }),
    dateRange: {
      begin: flightHasStarted ? getInitialBeginDate() : flight.dateBegin!,
      end: flightHasStarted ? getInitialEndDate() : flight.dateEnd!,
    },
    persistenceState: PersistenceState.DUPLICATE,
  };
};

export const mapFlightDetailsToCopyOfExistingFlight = (
  flight: FlightDetails,
  campaignObjective: Objective,
): FlightFormValues => {
  // @ts-ignore
  const flightHasStarted = hasDatePassed(flight.dateBegin);
  const baseValues = mapFlightDetailsToFormValues(flight);
  const isPodcast = isPodcastFormatType(flight.format);
  const locations = isPodcast ? [] : baseValues.locations;
  const ageRanges = getCorrectAgeRangesForFlight(baseValues);

  return {
    ...baseValues,
    ageRanges,
    locations,
    serveOnMegaphone: isPodcast,
    name: i18n.t('I18N_SUFFIX_DUPLICATED_AD_NAME', {
      adName: flight.name,
      defaultValue: `${flight.name} (COPY)`,
    }),
    dateRange: {
      begin: flightHasStarted ? getInitialBeginDate() : flight.dateBegin!,
      end: flightHasStarted ? getInitialEndDate() : flight.dateEnd!,
    },
    persistenceState: PersistenceState.COPY_OF_EXISTING,
    copiedFlightId: flight.flightId,
    fanAudiences:
      isPodcast || campaignObjective === BUSINESS_PROMO
        ? []
        : baseValues.fanAudiences,
    listenerCategory:
      isPodcast ||
      (campaignObjective === BUSINESS_PROMO &&
        baseValues.listenerCategory === ListenerCategory.FAN)
        ? ListenerCategory.DEFAULT
        : baseValues.listenerCategory,
    audienceSegments: isPodcast ? {} : baseValues.audienceSegments,
    playlists: isPodcast ? {} : baseValues.playlists,
    genres: isPodcast ? [] : baseValues.genres,
    customAudiences: isPodcast ? [] : baseValues.customAudiences,
  };
};

export function getCorrectAgeRangesForFlight(baseValues: {
  ageRanges: AgeRange[];
  format?: FormatType;
}) {
  return containsInvalidAgeRange(
    baseValues.ageRanges ?? [],
    isPodcastFormatType(baseValues.format!),
  )
    ? AGE_RANGE_DEFAULT_VALUES
    : baseValues.ageRanges;
}

export const mapDraftToCampaignFormValues = (
  draft: DraftType,
): CampaignFormValues => {
  return {
    persistenceState: PersistenceState.PRE_SAVED, // TODO: possibly change to draft enum val
    name: draft.internalName!,
    objective: draft.objective as Objective,
    artist: draft.artist ? JSON.parse(draft.artist) : undefined,
    purchaseOrderNumber: draft.purchaseOrderNumber!,
  };
};

export const mapDraftToFlightFormValues = (
  draft: DraftType,
): FlightFormValues => {
  const defaults = getInitialFlightFormValues();
  const placement = draft.placement
    ? draft.placement
    : getPlacementFromFormat(draft.creativeFormat);
  const frequencyCap = [];
  const dailyFreqCap = draft.dailyFreqCap;
  if (
    dailyFreqCap &&
    dailyFreqCap !==
      FREQUENCY_CAPS_DEFAULT_VALUES[FrequencyCapUnit.days].maxImpressions
  ) {
    frequencyCap.push({
      isCustom: true,
      time: 1,
      timeUnit: FrequencyCapUnit.days,
      maxImpressions: dailyFreqCap,
    });
  } else {
    frequencyCap.push(FREQUENCY_CAPS_DEFAULT_VALUES[FrequencyCapUnit.days]);
  }
  const weeklyFreqCap = draft.weeklyFreqCap;
  if (
    weeklyFreqCap &&
    weeklyFreqCap !==
      FREQUENCY_CAPS_DEFAULT_VALUES[FrequencyCapUnit.weeks].maxImpressions
  ) {
    frequencyCap.push({
      isCustom: true,
      time: 1,
      timeUnit: FrequencyCapUnit.weeks,
      maxImpressions: weeklyFreqCap,
    });
  } else {
    frequencyCap.push(FREQUENCY_CAPS_DEFAULT_VALUES[FrequencyCapUnit.weeks]);
  }
  const monthlyFreqCap = draft.monthlyFreqCap;
  if (
    monthlyFreqCap &&
    monthlyFreqCap !==
      FREQUENCY_CAPS_DEFAULT_VALUES[FrequencyCapUnit.months].maxImpressions
  ) {
    frequencyCap.push({
      isCustom: true,
      time: 1,
      timeUnit: FrequencyCapUnit.months,
      maxImpressions: monthlyFreqCap,
    });
  } else {
    frequencyCap.push(FREQUENCY_CAPS_DEFAULT_VALUES[FrequencyCapUnit.months]);
  }

  return {
    persistenceState: draft.copiedFlightId
      ? PersistenceState.COPY_OF_EXISTING
      : PersistenceState.PRE_SAVED,
    name: draft.flightName,
    dateRange: {
      begin: parseDateOrFastforward(draft.startDate),
      end: parseDateOrFastforward(draft.endDate, 7),
    },
    totalBudget: draft.totalBudget,
    platforms:
      draft.platforms && draft.platforms.length
        ? ((platformFill(draft.platforms) as unknown) as PlatformTargeting)
        : defaults.platforms,
    ageMin: draft.ageMin || defaults.ageMin,
    ageMax: draft.ageMax || defaults.ageMax,
    genders: draft.gender ? draft.gender : defaults.genders,
    genres: draft.genres ? JSON.parse(draft.genres) : defaults.genres,
    country: draft.country ? JSON.parse(draft.country) : defaults.country,
    locations: draft.locations
      ? JSON.parse(draft.locations)
      : defaults.locations,
    targetWholeCountry: draft.targetWholeCountry,
    listenerCategory: draft.listenerCategory
      ? draft.listenerCategory
      : defaults.listenerCategory,
    audienceSegments: draft.audienceSegmentIds
      ? (fillObject(draft.audienceSegmentIds, true) as Record<string, boolean>)
      : defaults.audienceSegments,
    playlists: draft.momentIds
      ? (fillObject(draft.momentIds, true) as Record<string, boolean>)
      : defaults.playlists,
    fanAudiences: draft.fanAudiences
      ? JSON.parse(draft.fanAudiences)
      : defaults.fanAudiences,
    aspectRatio: draft.selectedAspectRatio,
    minAudienceThresholdReached: false,
    customAudiences: draft.audienceMatchIds,
    format: draft.creativeFormat ? draft.creativeFormat : defaults.format,
    placement: placement,
    frequencyCap,
    withFrequencyCap: !isDefaultOrLegacyFrequencyCapSet(frequencyCap),
    copiedFlightId: draft.copiedFlightId,
    serveOnMegaphone: placement === Placement.PODCASTS,
  };
};

export const mapDraftToCreativeFormValues = (
  draft: DraftType,
): PreSavedCreativeFormValues => {
  let bgMusicUploader: UploadInfo | undefined;

  if (draft.voiceoverBgMusicId && draft.voiceoverBgMusicGcsUri) {
    bgMusicUploader = {
      gcsUri: draft.voiceoverBgMusicGcsUri,
      id: draft.voiceoverBgMusicId,
      name: '',
    };
  }

  if (draft.voiceoverBgMusicId && draft.voiceoverBgMusicStockTrackUri) {
    bgMusicUploader = {
      gcsUri: draft.voiceoverBgMusicStockTrackUri,
      uri: draft.voiceoverBgMusicStockTrackUri,
      id: draft.voiceoverBgMusicId,
      name: '',
    };
  }

  const thirdPartyTrackingValues = mapThirdPartyTrackingValuesToForm(
    draft.moatEnabled,
    draft.iasPixel,
    draft.trackingPixel,
  );

  return {
    persistenceState: draft.copiedCreativeId
      ? PersistenceState.COPY_OF_EXISTING
      : PersistenceState.PRE_SAVED,
    name: draft.creativeName,
    imageUploader: draft.coverArtId
      ? {
          gcsUri: draft.coverArtGcsUri!,
          id: draft.coverArtId,
          name: '',
        }
      : undefined,
    ctaText: draft.ctaText ? draft.ctaText : undefined,
    clickthroughUrl: draft.clickthroughUrl ? draft.clickthroughUrl : undefined,
    audioUploader: draft.audioId
      ? {
          gcsUri: draft.audioGcsUri!,
          id: draft.audioId,
          name: '',
        }
      : undefined,
    locale: draft.voiceoverLocale ? draft.voiceoverLocale : undefined,
    voice: draft.voiceoverVoice ? draft.voiceoverVoice : undefined,
    instructions: draft.voiceoverInstructions
      ? draft.voiceoverInstructions
      : undefined,
    transcript: draft.voiceoverTranscript
      ? draft.voiceoverTranscript
      : undefined,
    audioType: draft.audioCreative ? draft.audioCreative : undefined,
    playFullTrack: draft.voiceoverBgPlayFullMusic
      ? draft.voiceoverBgPlayFullMusic
      : undefined,
    bgMusicUploader,
    objective: draft.objective ? draft.objective : undefined,
    videoUploader: draft.videoId
      ? {
          id: draft.videoId,
          gcsUri: draft.videoGcsUri!,
          name: '',
          aspectRatio: draft.videoAspectRatio,
        }
      : undefined,
    brandName: draft.brandName ? draft.brandName : undefined,
    stockCompanionImage: undefined, // TODO: determine draft field that maps to stock image
    copiedCreativeId: draft.copiedCreativeId,
    targetedLocale: draft.targetedLocale || i18n.language,
    ...thirdPartyTrackingValues,
  };
};
