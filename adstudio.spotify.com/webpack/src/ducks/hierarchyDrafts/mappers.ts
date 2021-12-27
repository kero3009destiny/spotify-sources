import i18n from 'i18next';
import { isEmpty } from 'lodash';
import moment from 'moment';

import { fillObject } from 'utilities';
import { getInitialFlightFormValues } from 'utils/campaignHierarchy/initialValues';
import {
  getCorrectAgeRangesForFlight,
  mapFlightFormTargetingPlacement,
  mapFormToThirdPartyTrackingValues,
  mapGeoToTargetingGeo,
  mapThirdPartyTrackingValuesToForm,
} from 'utils/campaignHierarchy/mapperHelpers';
import {
  getPlacementFromFormat,
  isPodcastFormatType,
} from 'utils/creativeHelpers';
import {
  ISO_SERVER_FORMAT_SIMPLE,
  parseDateOrFastforward,
} from 'utils/dateHelpers';
import {
  limitDecimals,
  pickIdsFromObjectArray,
  platformFill,
} from 'utils/targeting';

import { FREQUENCY_CAPS_DEFAULT_VALUES } from 'config/frequencyCaps';

import {
  Artist,
  CampaignFormValues,
  FlightFormValues,
  FrequencyCap,
  FrequencyCapUnit,
  Genre,
  PersistenceState,
  Placement,
  PlatformTargeting,
  PreSavedCreativeFormValues,
} from 'types/common/campaignHierarchy/types';
import { Objective } from 'types/common/state/api/campaign';
import {
  CampaignDraftFormValues,
  CreativeDraftFormValues,
  EnrichedCampaignDraft,
  EnrichedCreativeDraft,
  EnrichedFlightDraft,
  FlightDraftFormValues,
} from 'types/common/state/api/drafts';
import { TargetingServiceGeo } from 'types/common/state/api/flight';
import { FormatType } from 'types/common/state/api/format';
import { UploadInfo } from 'types/common/state/api/upload';

export const mapCampaignDraftToCampaignFormValues = (
  draft: EnrichedCampaignDraft,
): CampaignFormValues => {
  return {
    persistenceState: PersistenceState.PRE_SAVED,
    name: draft.enrichedFormValues.campaignName,
    objective: draft.enrichedFormValues.objective,
    purchaseOrderNumber: draft.enrichedFormValues.purchaseOrderNumber,
    artist: draft.enrichedFormValues.artistId
      ? draft.enrichedFormValues.artistId.map(
          ({ name, id, artistMetadata }) => ({
            name,
            id,
            images: artistMetadata ? artistMetadata.images : undefined,
          }),
        )
      : undefined,
  };
};

export const mapFlightDraftToFlightFormValues = (
  draft: EnrichedFlightDraft,
): FlightFormValues => {
  const defaults = getInitialFlightFormValues();
  const placement = draft.enrichedFormValues.placement
    ? draft.enrichedFormValues.placement
    : getPlacementFromFormat(draft.enrichedFormValues.format);
  const frequencyCap = [];
  const dailyFreqCap = draft.enrichedFormValues.dailyFreqCap;
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
  const weeklyFreqCap = draft.enrichedFormValues.weeklyFreqCap;
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
  const monthlyFreqCap = draft.enrichedFormValues.monthlyFreqCap;
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
  const format = draft.enrichedFormValues.format || defaults.format;
  const ageRanges = getCorrectAgeRangesForFlight({
    ageRanges: draft.enrichedFormValues.ageRanges ?? [],
    format,
  });

  const locations = isEmpty(draft.enrichedFormValues.locationIds)
    ? defaults.locations
    : draft.enrichedFormValues.locationIds!.map(mapGeoToTargetingGeo);

  const shouldClearLocations = isPodcastFormatType(
    draft.enrichedFormValues.format,
  );

  return {
    persistenceState: draft.enrichedFormValues.copiedFlightId
      ? PersistenceState.COPY_OF_EXISTING
      : PersistenceState.PRE_SAVED,
    name: draft.enrichedFormValues.flightName,
    dateRange: {
      begin: parseDateOrFastforward(draft.enrichedFormValues.startDate || ''),
      end: parseDateOrFastforward(draft.enrichedFormValues.endDate || '', 7),
    },
    totalBudget: draft.enrichedFormValues.totalBudget,
    platforms: isEmpty(draft.enrichedFormValues.platforms)
      ? defaults.platforms
      : ((platformFill(
          draft.enrichedFormValues.platforms,
        ) as unknown) as PlatformTargeting),
    ageMin: draft.enrichedFormValues.ageMin || defaults.ageMin,
    ageMax: draft.enrichedFormValues.ageMax || defaults.ageMax,
    ageRanges,
    genders: draft.enrichedFormValues.gender
      ? draft.enrichedFormValues.gender
      : defaults.genders,
    genres: draft.enrichedFormValues.genreIds?.length
      ? draft.enrichedFormValues.genreIds
      : defaults.genres,
    country: isEmpty(draft.enrichedFormValues.country)
      ? defaults.country
      : draft.enrichedFormValues.country!.map(mapGeoToTargetingGeo),
    locations: shouldClearLocations ? [] : locations,
    targetWholeCountry: draft.enrichedFormValues.targetWholeCountry,
    listenerCategory: draft.enrichedFormValues.listenerCategory
      ? draft.enrichedFormValues.listenerCategory
      : defaults.listenerCategory,
    audienceSegments: isEmpty(draft.enrichedFormValues.audienceSegmentIds)
      ? defaults.audienceSegments
      : (fillObject(
          draft.enrichedFormValues.audienceSegmentIds!,
          true,
        ) as Record<string, boolean>),
    playlists: isEmpty(draft.enrichedFormValues.momentIds)
      ? defaults.playlists
      : (fillObject(draft.enrichedFormValues.momentIds!, true) as Record<
          string,
          boolean
        >),
    fanAudiences: isEmpty(draft.enrichedFormValues.fanAudienceIds)
      ? defaults.fanAudiences
      : draft.enrichedFormValues.fanAudienceIds,
    aspectRatio: draft.enrichedFormValues.selectedAspectRatio,
    minAudienceThresholdReached: false,
    format,
    placement,
    frequencyCap,
    copiedFlightId: draft.enrichedFormValues.copiedFlightId,
    withFrequencyCap: draft.enrichedFormValues.withFrequencyCap,
    contentSafetyIds: isEmpty(draft.enrichedFormValues.contentSafetyIds)
      ? defaults.contentSafetyIds
      : draft.enrichedFormValues.contentSafetyIds,
    contextualTargetingIds: isEmpty(
      draft.enrichedFormValues.contextualTargetingIds,
    )
      ? defaults.contextualTargetingIds
      : draft.enrichedFormValues.contextualTargetingIds,
    competitiveSeparationCategory:
      draft.enrichedFormValues.competitiveSeparationCategory,
    competitiveSeparationSubcategory:
      draft.enrichedFormValues.competitiveSeparationSubcategory,
    serveOnMegaphone: placement === Placement.PODCASTS,
  };
};

export const mapCreativeDraftToCreativeFormValues = (
  draft: EnrichedCreativeDraft,
  objective: Objective,
): PreSavedCreativeFormValues => {
  let bgMusicUploader: UploadInfo | undefined;
  const hasVoiceover = !isEmpty(draft.enrichedFormValues.enrichedVoiceover);
  if (
    draft.enrichedFormValues.enrichedVoiceover?.bgMusicId &&
    draft.enrichedFormValues.enrichedVoiceover?.bgMusicGcsUri
  ) {
    bgMusicUploader = {
      gcsUri: draft.enrichedFormValues.enrichedVoiceover.bgMusicGcsUri,
      id: draft.enrichedFormValues.enrichedVoiceover.bgMusicId,
      name: '',
    };
  }

  const thirdPartyTrackingValues = mapThirdPartyTrackingValuesToForm(
    draft.enrichedFormValues.moatEnabled,
    draft.enrichedFormValues.iasPixel,
    draft.enrichedFormValues.trackingPixel,
  );

  if (
    draft.enrichedFormValues.enrichedVoiceover?.bgMusicId &&
    draft.enrichedFormValues.enrichedVoiceover?.bgMusicStockTrackUri
  ) {
    bgMusicUploader = {
      gcsUri: draft.enrichedFormValues.enrichedVoiceover.bgMusicStockTrackUri,
      uri: draft.enrichedFormValues.enrichedVoiceover.bgMusicStockTrackUri,
      id: draft.enrichedFormValues.enrichedVoiceover.bgMusicId,
      name: '',
    };
  }

  return {
    persistenceState: draft.enrichedFormValues.copiedCreativeId
      ? PersistenceState.COPY_OF_EXISTING
      : PersistenceState.PRE_SAVED,
    name: draft.enrichedFormValues.creativeName,
    imageUploader: draft.enrichedFormValues.coverArtId
      ? {
          gcsUri: draft.enrichedFormValues.coverArtGcsUri!,
          id: draft.enrichedFormValues.coverArtId,
          name: '',
        }
      : undefined,
    ctaText: draft.enrichedFormValues.ctaText,
    clickthroughUrl: draft.enrichedFormValues.clickthroughUrl,
    audioUploader: draft.enrichedFormValues.fullmixId
      ? {
          gcsUri: draft.enrichedFormValues.audioGcsUri!,
          id: draft.enrichedFormValues.fullmixId,
          name: '',
        }
      : undefined,
    locale: hasVoiceover
      ? draft.enrichedFormValues.enrichedVoiceover!.locale
      : undefined,
    voice: hasVoiceover
      ? draft.enrichedFormValues.enrichedVoiceover!.voice
      : undefined,
    transcript: hasVoiceover
      ? draft.enrichedFormValues.enrichedVoiceover!.transcript
      : undefined,
    audioType: draft.enrichedFormValues.audioType,
    playFullTrack: hasVoiceover
      ? draft.enrichedFormValues.enrichedVoiceover!.playFullMusic
      : undefined,
    bgMusicUploader,
    objective,
    videoUploader: draft.enrichedFormValues.videoId
      ? {
          id: draft.enrichedFormValues.videoId,
          gcsUri: draft.enrichedFormValues.videoGcsUri!,
          name: draft.enrichedFormValues.videoName!,
          aspectRatio: draft.enrichedFormValues.videoAspectRatio!,
        }
      : undefined,
    brandName: draft.enrichedFormValues.brandName,
    stockCompanionImage: undefined, // TODO: determine draft field that maps to stock image
    copiedCreativeId: draft.enrichedFormValues.copiedCreativeId,
    targetedLocale: draft.enrichedFormValues.targetedLocale || i18n.language,
    tagLine: draft.enrichedFormValues.tagLine || undefined,
    ...thirdPartyTrackingValues,
    promoting: draft.enrichedFormValues.promoting,
    reachWho: draft.enrichedFormValues.reachWho,
    toneAndFeel: draft.enrichedFormValues.toneAndFeel,
    postListenSentiment: draft.enrichedFormValues.postListenSentiment,
    talkingPoints: draft.enrichedFormValues.talkingPoints,
    callToAction: draft.enrichedFormValues.callToAction,
    vanityUrlOrDiscountCode: draft.enrichedFormValues.vanityUrlOrDiscountCode,
    genderPref: draft.enrichedFormValues.genderPref,
    additionalInstructions: draft.enrichedFormValues.additionalInstructions,
  };
};

export const mapCampaignFormToCampaignDraftFormValues = (
  formValues: CampaignFormValues,
): CampaignDraftFormValues => {
  return {
    campaignName: formValues.name,
    objective: formValues.objective,
    purchaseOrderNumber: formValues.purchaseOrderNumber,
    artistId: getArtistIdFromFormValue(formValues.artist),
  };
};

function getArtistIdFromFormValue(maybeArtist: Artist[] | undefined) {
  if (!maybeArtist || !maybeArtist[0]) return '';
  return maybeArtist[0].id;
}

// TODO: determine if we really store currency in drafts?
export const mapFlightFormToFlightDraftValues = (
  formValues: FlightFormValues,
  duplicatedFromFlightId?: string,
): FlightDraftFormValues => {
  const startDate = formValues.dateRange?.begin;
  const endDate = formValues.dateRange?.end;
  const locationIds = pickIdsFromObjectArray<TargetingServiceGeo>(
    formValues.locations!,
    'geoId',
  );
  const fanAudienceIds = pickIdsFromObjectArray<Artist>(
    formValues.fanAudiences!,
  );
  const audienceSegmentIds = Object.keys(formValues.audienceSegments!).filter(
    id => id && !!formValues.audienceSegments![id],
  );
  const momentIds = Object.keys(formValues.playlists!).filter(
    id => id && !!formValues.playlists![id],
  );
  const genreIds = pickIdsFromObjectArray<Genre>(formValues.genres!);
  const country = pickIdsFromObjectArray<TargetingServiceGeo>(
    formValues.country!,
    'geoId',
  )[0];
  const platforms = mapFlightFormTargetingPlacement(formValues);
  const frequencyCap = formValues.frequencyCap! || [];

  const dailyFreqCap = frequencyCap.length
    ? frequencyCap
        .filter((cap: FrequencyCap) => cap.timeUnit === FrequencyCapUnit.days)
        .reduce((_: TSFixMe, cap: FrequencyCap) => cap.maxImpressions, 0)
    : 0;
  const weeklyFreqCap = frequencyCap.length
    ? frequencyCap
        .filter((cap: FrequencyCap) => cap.timeUnit === FrequencyCapUnit.weeks)
        .reduce((_: TSFixMe, cap: FrequencyCap) => cap.maxImpressions, 0)
    : 0;
  const monthlyFreqCap = frequencyCap.length
    ? frequencyCap
        .filter((cap: FrequencyCap) => cap.timeUnit === FrequencyCapUnit.months)
        .reduce((_: TSFixMe, cap: FrequencyCap) => cap.maxImpressions, 0)
    : 0;

  return {
    flightName: formValues.name,
    duplicatedFromFlightId,
    format: formValues.format,
    placement: formValues.placement,
    selectedAspectRatio: formValues.aspectRatio,
    totalBudget: formValues.totalBudget
      ? limitDecimals(Number(formValues.totalBudget!))
      : '',
    startDate: startDate
      ? moment(startDate)
          .utc()
          .format(ISO_SERVER_FORMAT_SIMPLE)
      : '',
    endDate: endDate
      ? moment(endDate)
          .utc()
          .format(ISO_SERVER_FORMAT_SIMPLE)
      : '',
    listenerCategory: formValues.listenerCategory,
    ageMin: formValues.ageMin,
    ageMax: formValues.ageMax,
    gender: formValues.genders,
    country,
    targetWholeCountry: formValues.targetWholeCountry,
    locationIds,
    platforms,
    momentIds,
    genreIds,
    fanAudienceIds,
    audienceSegmentIds,
    dailyFreqCap,
    weeklyFreqCap,
    monthlyFreqCap,
    copiedFlightId: formValues.copiedFlightId,
    frequencyCap,
    withFrequencyCap: formValues.withFrequencyCap,
    audienceMatchIds: formValues.customAudiences,
    contentSafetyIds: formValues.contentSafetyIds,
    contextualTargetingIds: formValues.contextualTargetingIds,
    ageRanges: formValues.ageRanges,
    competitiveSeparationCategory: formValues.competitiveSeparationCategory,
    competitiveSeparationSubcategory:
      formValues.competitiveSeparationSubcategory,
  };
};

export const mapCreativeFormToCreativeDraftFormValues = (
  formValues: PreSavedCreativeFormValues,
  format?: FormatType,
): CreativeDraftFormValues => {
  const trackingValues = mapFormToThirdPartyTrackingValues(formValues);

  return {
    creativeName: formValues.name,
    fullmixId: formValues.audioUploader?.id,
    clickthroughUrl: formValues.clickthroughUrl,
    voiceover: {
      transcript: formValues.transcript,
      instructions: formValues.instructions,
      locale: formValues.locale,
      voice: formValues.voice,
      bgMusicId: formValues.bgMusicUploader?.id,
      bgMusicGcsUri: formValues.bgMusicUploader?.gcsUri,
      bgMusicStockTrackUri: formValues.bgMusicUploader?.uri,
      playFullMusic: formValues.playFullTrack,
    },
    videoGcsUri: formValues.videoUploader?.gcsUri,
    videoName: formValues.videoUploader?.name,
    ctaText: formValues.ctaText,
    videoId: formValues.videoUploader?.id,
    brandName: formValues.brandName,
    tagLine: formValues.tagLine,
    format,
    coverArtGcsUri: formValues.imageUploader?.gcsUri,
    coverArtId: formValues.imageUploader?.id,
    audioGcsUri: formValues.audioUploader?.gcsUri,
    videoAspectRatio: formValues.videoUploader?.aspectRatio,
    copiedCreativeId: formValues.copiedCreativeId,
    audioType: formValues.audioType,
    targetedLocale: formValues.targetedLocale,
    ...trackingValues,
    promoting: formValues.promoting,
    reachWho: formValues.reachWho,
    toneAndFeel: formValues.toneAndFeel,
    postListenSentiment: formValues.postListenSentiment,
    talkingPoints: formValues.talkingPoints,
    callToAction: formValues.callToAction,
    vanityUrlOrDiscountCode: formValues.vanityUrlOrDiscountCode,
    genderPref: formValues.genderPref,
    additionalInstructions: formValues.additionalInstructions,
  };
};
