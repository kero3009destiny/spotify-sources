import i18n from 'i18next';

import { getInitialBeginDate, getInitialEndDate } from 'utils/dateHelpers';

import { AGE_RANGE_DEFAULT_VALUES } from '../../components/FlightForm/Fields/AgeRanges/Field';

import { TARGETING_MAX_AGE, TARGETING_MIN_AGE } from 'config';
import { ASPECT_RATIOS } from 'config/adCreation';
import { FREQUENCY_CAP_DEFAULT_VALUE } from 'config/frequencyCaps';
import { INITIAL_BUDGET } from 'config/payments';
import { DEFAULT_PLATFORMS } from 'config/platforms';

import {
  FlightFormValues,
  Gender,
  LegalFormValues,
  ListenerCategory,
  PersistenceState,
  Pixel,
  PreSavedCreativeFormValues,
} from 'types/common/campaignHierarchy/types';

export const getInitialFlightFormValues = (): FlightFormValues => {
  return {
    persistenceState: PersistenceState.PRE_SAVED,
    dateRange: {
      begin: getInitialBeginDate(),
      end: getInitialEndDate(),
    },
    platforms: DEFAULT_PLATFORMS,
    ageMin: TARGETING_MIN_AGE.toString(),
    ageMax: TARGETING_MAX_AGE.toString(),
    ageRanges: AGE_RANGE_DEFAULT_VALUES,
    genders: Gender.ALL,
    country: [],
    locations: [],
    targetWholeCountry: false,
    listenerCategory: ListenerCategory.DEFAULT,
    audienceSegments: {},
    playlists: {},
    genres: [],
    fanAudiences: [],
    minAudienceThresholdReached: false,
    format: undefined,
    aspectRatio: ASPECT_RATIOS.UNSET,
    withFrequencyCap: false,
    frequencyCap: FREQUENCY_CAP_DEFAULT_VALUE,
    contentSafetyIds: undefined,
    contextualTargetingIds: undefined,
    competitiveSeparationCategory: undefined,
    competitiveSeparationSubcategory: undefined,
    serveOnMegaphone: false,
    totalBudget: INITIAL_BUDGET.toString(),
  };
};

export const initialImpressionPixel: Pixel = { value: '', key: '' };

export const getInitialCreativeFormValues = (): PreSavedCreativeFormValues => {
  return {
    ctaText: undefined,
    targetedLocale: i18n.language,
    persistenceState: PersistenceState.PRE_SAVED,
    name: undefined,
    imageUploader: undefined,
    impressionPixel: [initialImpressionPixel],
  };
};

export const getInitialPaymentReviewFormValues = (): LegalFormValues => {
  return {};
};
