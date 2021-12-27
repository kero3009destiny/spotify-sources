import React from 'react';
import { Trans } from 'react-i18next';
import i18n from 'i18next';

import { semanticColors, TextLink } from '@spotify-internal/encore-web';

import {
  ALL_GENDERS,
  AUDIENCE,
  FEMALE_GENDER,
  GENDER,
  LISTENING_BEHAVIOR,
  MALE_GENDER,
  NO_GENDERS,
  SUPPORTED_GENDERS,
} from '@spotify-internal/adstudio-shared/lib/components/AdTargeting/constants';
import { routes } from 'config/routes';

const IMAGE = 'cover-art-upload';
const AUDIO = 'upload-audio-tab';
const VIDEO = 'video-upload';
const NEW_VOICEOVER = 'request-voiceover-tab';
const AUDIO_SUBMISSION = 'audioSubmission';

export const FORM_NAMES = {
  HEADLINE: 'name',
  URL: 'clickthroughUrl',
  BRAND_NAME: 'brandName',
  TAG_LINE: 'tagLine',
  INSTANT_PROMO_TRACK_URL: 'instantPromoTrackUrl',
  MIX_URL: 'mixUrl',
  ARTIST_NAME: 'artistName',
  TRACK_NAME: 'trackName',
  IMAGE_URL: 'imageUrl',
  AUDIO_CREATIVE: 'audio_creative',
  TTS_SCRIPT: 'textToSpeechScript',
  TTS_VOICENAME: 'textToSpeechVoiceName',
  IMAGE,
  AUDIO,
  VIDEO,
  NEW_VOICEOVER,
  AUDIO_SUBMISSION,
  ARTIST: 'artist',
  OBJECTIVE: 'objective',
  IMAGE_UPLOADER: `${IMAGE}__uploader`,
  AUDIO_UPLOADER: `${AUDIO}__uploader`,
  VIDEO_UPLOADER: `${VIDEO}__uploader`,
  NEW_VOICEOVER_BGMUSIC_UPLOADER: `${NEW_VOICEOVER}__uploader`,
  NEW_VOICEOVER_BGMUSIC_DURATION: `${AUDIO_SUBMISSION}.${NEW_VOICEOVER}.backgroundDuration`,
  NEW_VOICEOVER_BGMUSIC_ID: `${AUDIO_SUBMISSION}.${NEW_VOICEOVER}.bgmusicId`,
  NEW_VOICEOVER_NAME: `${AUDIO_SUBMISSION}.${NEW_VOICEOVER}.name`,
  NEW_VOICEOVER_TRANSCRIPT: `${AUDIO_SUBMISSION}.${NEW_VOICEOVER}.transcript`,
  NEW_VOICEOVER_INSTRUCTIONS: `${AUDIO_SUBMISSION}.${NEW_VOICEOVER}.instructions`,
  NEW_VOICEOVER_LOCALE: `${AUDIO_SUBMISSION}.${NEW_VOICEOVER}.locale`,
  NEW_VOICEOVER_VOICE: `${AUDIO_SUBMISSION}.${NEW_VOICEOVER}.voice`,
  CTA_TEXT: 'ctaText',
  CREATIVE_FORMAT: 'creativeFormat',
  TARGETING: 'targeting',
  PLATFORM_TARGETS: 'targeting.platforms',
  ASPECT_RATIO: 'selectedAspectRatio',
  TARGETED_LOCALE: 'targetedLocale',
};

export const DEFAULT_VOICE_LOCALE = 'eng-us';

export const CAMPAIGN_FORM_NAME = 'build-ad-campaign-step';
export const AUDIENCE_FORM_NAME = 'build-ad-audience-step';
export const AD_CREATION_FORM_NAME = 'build-ad-creation-step';
export const REVIEW_AD_FORM_NAME = 'build-ad-review-step';
export const SUCCESS_STEP = 'build-ad-success';

export const BUILD_AD_BREADCRUMB_LABELS = {
  [CAMPAIGN_FORM_NAME]: i18n.t('I18N_SETUP', 'Setup'),
  [AUDIENCE_FORM_NAME]: i18n.t(
    'I18N_BUDGET_AND_TARGETING',
    'Budget and targeting',
  ),
  [AD_CREATION_FORM_NAME]: i18n.t('I18N_CREATIVE', 'Creative'),
  [REVIEW_AD_FORM_NAME]: i18n.t('I18N_REVIEW', 'Review'),
};

export const BUILD_AD_FLOW_STEPS = [
  CAMPAIGN_FORM_NAME,
  AUDIENCE_FORM_NAME,
  AD_CREATION_FORM_NAME,
];

export const BUILD_AD_FLOW_STEPS_WITH_REVIEW = [
  ...BUILD_AD_FLOW_STEPS,
  REVIEW_AD_FORM_NAME,
];

export const EDIT_FORM_NAME = 'edit-ad';

export const CAMPAIGN_FIELDS = [
  'objective',
  'internalName',
  'purchaseOrderNumber',
  'artist',
];

export const AUDIENCE_FIELDS = [
  'targeting',
  'withFrequencyCap',
  'frequencyCap',
  'dateRange.begin',
  'dateRange.end',
  'payments.totalBudget',
  'paymentsConnected',
  FORM_NAMES.CREATIVE_FORMAT,
  FORM_NAMES.ASPECT_RATIO,
];

export const AD_CREATION_FIELDS = [
  FORM_NAMES.IMAGE,
  FORM_NAMES.HEADLINE,
  FORM_NAMES.URL,
  FORM_NAMES.AUDIO,
  FORM_NAMES.AUDIO_CREATIVE,
  FORM_NAMES.ARTIST,
  FORM_NAMES.NEW_VOICEOVER_BGMUSIC_UPLOADER,
  FORM_NAMES.NEW_VOICEOVER_BGMUSIC_DURATION,
  FORM_NAMES.NEW_VOICEOVER_NAME,
  FORM_NAMES.NEW_VOICEOVER_TRANSCRIPT,
  FORM_NAMES.NEW_VOICEOVER_INSTRUCTIONS,
  FORM_NAMES.NEW_VOICEOVER_LOCALE,
  FORM_NAMES.NEW_VOICEOVER_VOICE,
  FORM_NAMES.CTA_TEXT,
  FORM_NAMES.INSTANT_PROMO_TRACK_URL,
  FORM_NAMES.BRAND_NAME,
];

// Underlying values - not displayed so not to be I18N
export const DEFAULT_CTA_TEXT = 'LEARN MORE';
export const DEFAULT_INSTANT_TRACK_PROMO_CTA_TEXT = 'LISTEN NOW';

export const LISTENER_CATEGORY_DEFAULT = '';
export const LISTENER_CATEGORY_GENRE = 'listener-genre';
export const LISTENER_CATEGORY_MOMENT = 'listener-moment';
export const LISTENER_CATEGORY_FAN = 'listener-fan';
export const LISTENER_CATEGORY_NAME = 'listener-category';
export const LISTENER_CATEGORY_AUDIENCE_SEGMENTS = 'listener-audience-segments';

export const MIN_VOICEOVER_WORD_COUNT = 2;
export const MAX_VOICEOVER_WORD_COUNT = 70;
export const MAX_VOICEOVER_WORD_COUNT_STRING = i18n.t(
  'I18N_WORDS',
  'words remaining',
);
export const MAX_VOICEOVER_NAME_LENGTH = 60;

export const VOICEOVER_SCRIPT_EXAMPLES = {
  [i18n.t('I18N_SCRIPT_SAMPLES_BUY_IN_STORE', 'Buy In-Store')]: i18n.t(
    'I18N_SCRIPT_SAMPLES_BUY_IN_STORE_CONTENT',
    `Hey Boston, National Yoga Day is next Sunday. Need something to keep your flow going all day long?
      Stop by your local grocery store to grab a bottle of Cody’s Flavored Water on your way to yoga class. At your local grocery store, our drinks start as low as 99¢.
      Our philosophy? Namaste hydrated.
      Tap the banner to find Cody’s Beverages near you.`,
  ),
  [i18n.t('I18N_SCRIPT_SAMPLES_BUY_ONLINE', 'Buy Online')]: i18n.t(
    'I18N_SCRIPT_SAMPLES_BUY_ONLINE_CONTENT',
    `Looking for the most convenient way to get your favorite flavored water? And you want it now? We’ve got you covered.
    Here at Cody’s Beverage Company, we offer the best value online. We have a wide range of refreshing drinks at the lowest prices, delivered right to your door!
    Browse our full selection online and buy today at CODYSBEVERAGE.COM
    Tap the banner to shop now.`,
  ),
  [i18n.t('I18N_SCRIPT_SAMPLES_SIGN_UP', 'Sign-Up')]: i18n.t(
    'I18N_SCRIPT_SAMPLES_SIGN_UP_CONTENT',
    `Sounds like you have your head down.
    Between songs, we have something else to keep you focused - a free virtual event sponsored by Lovely Valley State College.
    Sign up to network with students and professionals who share your goals, and enjoy presentations from industry leaders.
    Join us at Lovely Valley State College. Now that’s something to focus on, right?
    Tap the banner to reserve your spot.`,
  ),
  [i18n.t(
    'I18N_SCRIPT_SAMPLES_PROMOTE_OFFER',
    'Promote Limited-Time-Offer',
  )]: i18n.t(
    'I18N_SCRIPT_SAMPLES_PROMOTE_OFFER_CONTENT',
    `Need to take your morning routine to the next level? Pearly Lite Dental is offering big discounts on select products for our annual sale.
    For a limited time, enjoy deep discounts. You’ll get 50% when you order online and enter promo code SMILE at checkout. That’s S-M-I-L-E.
    Pearly Lite Dental will having you smiling in no time.
    Tap the banner for this limited deal.`,
  ),
  [i18n.t('I18N_SCRIPT_SAMPLES_PROMOTE_ARTIST', 'Promote an Artist')]: i18n.t(
    'I18N_SCRIPT_SAMPLES_PROMOTE_ARTIST_CONTENT',
    `What’s up Spotify, it’s Identity Spine.
    You’re listening to “All The Outcomes”, a new song from my upcoming album, Free Signals.
    Follow me, Identity Spine, to listen. Now available on Spotify.`,
  ),
};
export const VOICEOVER_SCRIPT_EXAMPLES_DEFAULT_INDEX = 0;

export const FIELDS_BY_FORM = {
  [CAMPAIGN_FORM_NAME]: CAMPAIGN_FIELDS,
  [AUDIENCE_FORM_NAME]: AUDIENCE_FIELDS,
  [AD_CREATION_FORM_NAME]: AD_CREATION_FIELDS,
  [REVIEW_AD_FORM_NAME]: [],
};

// Exported for components that should only show
// when a user is promoting content.
export const BUSINESS_PROMO = 'businesspromo';
export const CONTENT_PROMO = 'contentpromo';
export const ARTIST_PROMO = 'artistpromo';
export const BUSINESS_PROMO_PODCAST = 'businesspromopodcast';

export const OBJECTIVE_TYPES = {
  [BUSINESS_PROMO]: i18n.t('I18N_BRAND_PROMOTION', 'Brand promotion'),
  [CONTENT_PROMO]: i18n.t(
    'I18N_CONCERT_AND_MERCH_PROMOTI',
    'Concert and merch promotion',
  ),
  [ARTIST_PROMO]: i18n.t(
    'I18N_ARTIST_MUSIC_PROMOTION_FO',
    'Artist music promotion for #ARTIST#',
  ),
  [BUSINESS_PROMO_PODCAST]: '',
};

export const PRICING_MODEL_FIELD_NAME = 'pricingModel';

export const DEFAULT_AD_CREATION_ERROR = i18n.t(
  'I18N_SOMETHING_WENT_WRONG_WHIL',
  'Something went wrong while creating your ad. Please try submitting your ad again. If you continue to experience issues, please contact us at adstudio@spotify.com.',
);

export const TTS_VOICES = [
  {
    key: 'en-US-Wavenet-F',
    value: i18n.t('I18N_FEMALE_VOICE', 'Female Voice'),
  },
  { key: 'en-US-Wavenet-D', value: i18n.t('I18N_MALE_VOICE', 'Male Voice') },
];

export const LANDSCAPE_ORIENTATION = 'LANDSCAPE';
export const PORTRAIT_ORIENTATION = 'PORTRAIT';

export const ASPECT_RATIOS = {
  LANDSCAPE: 1.778,
  PORTRAIT: 0.5625,
  UNKNOWN: 1,
  UNSET: undefined,
};

export const BACKGROUND_DURATION_TEXT = {
  FULL_LENGTH_TRUE: i18n.t(
    'I18N_PLAYS_UNTIL_END_OF_BACKGR',
    'Plays until end of background track.',
  ),
  FULL_LENGTH_FALSE: i18n.t(
    'I18N_PLAYS_UNTIL_END_OF_VOICEO',
    'Plays until end of voiceover track.',
  ),
};

export const AD_TARGETING_STRINGS = {
  generalTargeting: {
    AUDIENCE,
    GENDER,
    ALL_GENDERS,
    FEMALE_GENDER,
    MALE_GENDER,
    NO_GENDERS,
    LISTENING_BEHAVIOR,
    SUPPORTED_GENDERS,

    SELECT_VALUE: i18n.t(
      'I18N_PLEASE_SELECT_AT_LEAST_ON',
      'Please select at least one value.',
    ),

    SELECT_GENDER: i18n.t(
      'I18N_PLEASE_SELECT_AT_LEAST_O1',
      'Please select at least one gender.',
    ),

    HEADERS: {
      [AUDIENCE]: i18n.t('I18N_AUDIENCE', 'Audience'),
      [LISTENING_BEHAVIOR]: i18n.t(
        'I18N_LISTENING_BEHAVIOR1',
        'Listening behavior',
      ),
    },

    LABELS: {
      [AUDIENCE]: {
        Locations: i18n.t('I18N_LOCATION', 'Location'),
        Age: i18n.t('I18N_AGE', 'Age'),
        Gender: i18n.t('I18N_GENDER', 'Gender'),
      },
      [GENDER]: {
        [FEMALE_GENDER]: i18n.t('I18N_GENDER_FEMALE', 'Female'),
        [MALE_GENDER]: i18n.t('I18N_GENDER_MALE', 'Male'),
      },
      [LISTENING_BEHAVIOR]: {
        Genres: i18n.t('I18N_GENRES', 'Genres'),
        Playlist: i18n.t('I18N_PLAYLIST', 'Playlist'),
        Fans: i18n.t('I18N_FANS', 'Fans'),
        Platform: i18n.t('I18N_PLATFORMS', 'Platform'),
        Interests: i18n.t('I18N_INTERESTS', 'Interests'),
      },
    },

    PLACEHOLDERS: {
      [LISTENING_BEHAVIOR]: {
        Genres: i18n.t('I18N_E_G_HIP_HOP_INDIE', 'E.g., Hip hop, Indie'),
        Playlist: i18n.t('I18N_E_G_PARTY_FOCUS', 'E.g., Party, Focus'),
        Fans: i18n.t('I18N_CHOOSE_ARTISTS', 'Choose artist(s)'),
      },
    },

    PLATFORMS: {
      ios: i18n.t('I18N_IOS_IPHONE_IPAD', 'iOS (iPhone/iPad)'),
      android: i18n.t('I18N_ANDROID', 'Android'),
      desktop: i18n.t('I18N_DESKTOP', 'Desktop'),
    },
    DESKTOP_TOOLTIP_MESSAGE: i18n.t(
      'I18N_TO_TARGET_LISTENERS_ON_DE',
      'To target listeners on desktop, select horizontal video or audio.',
    ),

    SELECT_ONE_PLATFORM: i18n.t(
      'I18N_PLEASE_SELECT_AT_LEAST_O2',
      'Please select at least one platform.',
    ),
    SELECT_ONE_LOCATION: i18n.t(
      'I18N_PLEASE_SELECT_AT_LEAST_O3',
      'Please select at least one location and remove any invalid locations.',
    ),
    SEARCH_FOR_LOCATION: i18n.t(
      'I18N_SEARCH_FOR_A_LOCATION',
      'Search for location',
    ),

    TARGET_BASED_DESCRIPTION: i18n.t(
      'I18N_YOU_CAN_FURTHER_TARGET_YO',
      "You can further target your ad based on your audience's music taste. This will impact reach.",
    ),
    TARGET_BASED_TOOLTIP: i18n.t(
      'I18N_TARGETING_BASED_ON_GENRE',
      'Targeting based on genre, playlist, or fan will further narrow the reach of your ad. If you don\'t know your audience\'s listening behavior, we suggest leaving "All music" selected.',
    ),
    PLATFORM_DESCRIPTION: i18n.t(
      'I18N_WE_RECOMMEND_CHOOSING_ALL',
      'We recommend choosing all platforms to maximize your potential audience reach, unless your ad is platform specific.',
    ),
    TOOLTIP_DESCRIPTION: i18n.t(
      'I18N_A_DMA_DESIGNATED_MARKET_A',
      'A DMA (Designated Market Area) is a group of cities that form a broader metropolitan area. For example, the Los Angeles DMA includes the city of Los Angeles as well as the neighboring towns and counties.',
    ),

    SHOW_ALL_TEXT: i18n.t('I18N_ALL', 'All'),

    RELEASED_SEGMENTS: {
      Books: i18n.t('I18N_AUDIENCE_SEGMENT_27', 'Books'),
      Business: i18n.t('I18N_AUDIENCE_SEGMENT_12', 'Business'),
      Chill: i18n.t('I18N_AUDIENCE_SEGMENT_20', 'Chill'),
      Comedy: i18n.t('I18N_AUDIENCE_SEGMENT_19', 'Comedy'),
      Commuting: i18n.t('I18N_AUDIENCE_SEGMENT_17', 'Commuting'),
      Cooking: i18n.t('I18N_AUDIENCE_SEGMENT_7', 'Cooking'),
      'Culture \u0026 Society': i18n.t(
        'I18N_AUDIENCE_SEGMENT_2',
        'Culture & Society',
      ),
      Dinner: i18n.t('I18N_AUDIENCE_SEGMENT_21', 'Dinner'),
      'DIY Hobbies \u0026 Crafts': i18n.t(
        'I18N_AUDIENCE_SEGMENT_28',
        'DIY Hobbies & Crafts',
      ),
      Education: i18n.t('I18N_AUDIENCE_SEGMENT_16', 'Education'),
      Fitness: i18n.t('I18N_AUDIENCE_SEGMENT_3', 'Fitness'),
      Focus: i18n.t('I18N_AUDIENCE_SEGMENT_22', 'Focus'),
      Gaming: i18n.t('I18N_AUDIENCE_SEGMENT_14', 'Gaming'),
      'Health \u0026 Lifestyle': i18n.t(
        'I18N_AUDIENCE_SEGMENT_10',
        'Health & Lifestyle',
      ),
      History: i18n.t('I18N_AUDIENCE_SEGMENT_29', 'History'),
      Holidays: i18n.t('I18N_AUDIENCE_SEGMENT_23', 'Holidays'),
      'In-Car Listening': i18n.t(
        'I18N_AUDIENCE_SEGMENT_18',
        'In-Car Listening',
      ),
      'Love \u0026 Dating': i18n.t('I18N_AUDIENCE_SEGMENT_30', 'Love & Dating'),
      News: i18n.t('I18N_AUDIENCE_SEGMENT_31', 'News'),
      Parenting: i18n.t('I18N_AUDIENCE_SEGMENT_5', 'Parenting'),
      Party: i18n.t('I18N_AUDIENCE_SEGMENT_24', 'Party'),
      Partying: i18n.t('I18N_AUDIENCE_SEGMENT_4', 'Partying'),
      Podcasts: i18n.t('I18N_AUDIENCE_SEGMENT_1', 'Podcasts'),
      Running: i18n.t('I18N_AUDIENCE_SEGMENT_11', 'Running'),
      'Science \u0026 Medicine': i18n.t(
        'I18N_AUDIENCE_SEGMENT_32',
        'Science & Medicine',
      ),
      'Sports \u0026 Recreation': i18n.t(
        'I18N_AUDIENCE_SEGMENT_33',
        'Sports & Recreation',
      ),
      Study: i18n.t('I18N_AUDIENCE_SEGMENT_25', 'Study'),
      'Studying or focusing': i18n.t(
        'I18N_AUDIENCE_SEGMENT_6',
        'Studying or Focusing',
      ),
      Tech: i18n.t('I18N_AUDIENCE_SEGMENT_8', 'Tech'),
      Theater: i18n.t('I18N_AUDIENCE_SEGMENT_13', 'Theater'),
      Travel: i18n.t('I18N_AUDIENCE_SEGMENT_15', 'Travel'),
      'TV \u0026 Film': i18n.t('I18N_AUDIENCE_SEGMENT_9', 'TV & Film'),
      Workout: i18n.t('I18N_AUDIENCE_SEGMENT_26', 'Workout'),
    },

    PODCAST_TOOLTIP_TEXT: i18n.t(
      'I18N_ADS_ARE_TARGETED_TO_USERS',
      'Ads are targeted to users who recently listened to podcasts, but they aren’t served during podcasts.',
    ),
  },
  bulkUploader: {
    // Modal Text
    CANCEL_BUTTON: i18n.t('I18N_CANCEL', 'Cancel'),
    DIALOG_TITLE: i18n.t('I18N_BULK_ADD_POSTAL_CODES', 'Bulk add postal codes'),
    UPLOAD_BODY_TEXT: i18n.t(
      'I18N_TYPE_OR_PASTE_POSTAL',
      'Type or paste postal codes below',
    ),
    UPLOAD_SUBDESCRIPTION_TEXT: i18n.t(
      'I18N_PUT_EACH_CODE_ON_A_NE',
      'Put each code on a new line, or use semicolons between them.',
    ),
    PLACEHOLDER_TEXT: '90210\n90211\n89109; 89108; 13579', // Not to be translated
    TABLE_HEADER_TEXT: i18n.t('I18N_LOCATION', 'Location'),
    LOCATION_COUNT_TEXT: i18n.t(
      'I18N_LOCATION_S_ENTERED',
      '[num]/[limit] location(s) entered',
    ),
    LOCATION_LIMIT_ERROR_TEXT: i18n.t(
      'I18N_A_TOTAL_OF_LOCATIONS_IS_A',
      'A total of {{limit}} locations (including cities, states, etc.) is allowed.',
    ),
    // Matches Text
    MATCHES_TAB_TITLE: i18n.t(
      'I18N_MATCHED_POSTAL_CODES',
      'Matched Postal Codes',
    ),
    MATCHES_TAB_BODY_TEXT: i18n.t('I18N_REVIEW_MATCHES', 'Review matches'),
    MATCHES_TAB_SUBDESCRIPTION_TEXT: i18n.t(
      'I18N_YOU_CAN_REMOVE_ITEMS_FROM',
      'You can remove items in the table',
    ),
    NO_MATCHES_TEXT: i18n.t('I18N_NO_MATCHES_FOUND', 'No matches found'),
    // Errors Text
    ERRORS_TAB_TITLE: i18n.t('I18N_ERRORS', 'Errors'),
    ERRORS_TAB_BODY_TEXT: i18n.t('I18N_REVIEW_ERRORS', 'Review errors'),
    ERRORS_TAB_SUBDESCRIPTION_TEXT: i18n.t(
      'I18N_YOU_CAN_REMOVE_ITEMS_FROM',
      'You can remove items in the table',
    ),
    NO_ERRORS_TEXT: i18n.t('I18N_NO_ERRORS_FOUND', 'No errors found'),
    // Button Text
    MATCH_LOCATIONS_BUTTON_TEXT: i18n.t('I18N_MATCH_CODES', 'Match Codes'),
    ADD_LOCATIONS_BUTTON_TEXT: i18n.t('I18N_ADD_CODES', 'Add [num] codes'),
  },

  countrySearch: {
    COUNTRY_LABEL: i18n.t('I18N_COUNTRY', 'Country'),
    COUNTRY_TOOLTIP_DESCRIPTION: i18n.t(
      'I18N_CHOOSE_A_COUNTRY_BEFORE_T',
      'Choose a country before targeting locations within it. You can only target one country.',
    ),
    COUNTRY_PODCAST_RESTRICTION_MESSAGE: i18n.t(
      'I18N_PODCAST_COUNTRY_DISABLED',
      'Podcast placements are only available in the United States of America at this time.',
    ),

    COUNTRY_PLACEHOLDER: i18n.t(
      'I18N_SEARCH_FOR_A_COUNTRY_E_G',
      'Search for a country. E.g., United States',
    ),
    COUNTRY_ERROR_MESSAGE: i18n.t(
      'I18N_SELECTING_A_COUNTRY_IS_RE',
      'Selecting a country is required.',
    ),
  },

  locationSearch: {
    ARIA_REMOVE_THIS_LOCATION: i18n.t(
      'I18N_REMOVE_THIS_LOCATION',
      'Remove this location.',
    ),
    ARIA_REMOVE_THIS_UNAVAILABLE_LOCATION: i18n.t(
      'I18N_REMOVE_THIS_UNAVAILABLE_LOCATION',
      'This location is unavailable. Please remove.',
    ),
    CTA_LEARN_MORE: i18n.t('I18N_LEARN_MORE1', 'Learn more'),
    CTA_REMOVE_ALL_SINGULAR: i18n.t('I18N_REMOVE', 'Remove'),
    CTA_REMOVE_ALL_PLURAL: i18n.t('I18N_REMOVE_ALL', 'Remove all'),
    DEPRECATED_GEOS_ERROR: i18n.t(
      'I18N_PLEASE_REMOVE_UNAVAILABLE_LOCATIONS',
      'Please remove any unavailable locations.',
    ),
    LOCATION_UNAVAILABLE_SINGULAR: i18n.t(
      'I18N_LOCATION_UNAVAILABLE',
      `[deprecatedCount] location unavailable.`,
    ),
    LOCATION_UNAVAILABLE_PLURAL: i18n.t(
      'I18N_LOCATIONS_UNAVAILABLE',
      `[deprecatedCount] locations unavailable.`,
    ),
    LOCATIONS_DESCRIPTION: i18n.t(
      'I18N_REACH_LISTENERS_IN_A_SPEC',
      'Reach listeners in a specific country, state, city, or DMA.',
    ),
    LOCATION_LABEL: i18n.t('I18N_LOCATION_S', 'Location(s)'),
    LOCATION_PLACEHOLDER: i18n.t(
      'I18N_SEARCH_FOR_A_LOCATION_E',
      'Search for a location. E.g., 90210, Santa Monica, or California',
    ),
    LOCATION_TOOLTIP_DESCRIPTION: (
      <Trans i18nKey="I18N_SEARCH_BY_CITY_STATE_DM">
        Search by city, state, DMA, or zip/postal code. For more info
        <TextLink
          href={routes.FAQ}
          target="_blank"
          semanticColor={semanticColors.textBrightAccent}
        >
          visit our FAQ
        </TextLink>
      </Trans>
    ),
    SELECT_ONE_LOCATION: i18n.t(
      'I18N_PLEASE_SELECT_AT_LEAST_O3',
      'Please select at least one location and remove any invalid locations.',
    ),
  },

  targetingOptions: {
    BULK_ADD_MESSAGE: i18n.t(
      'I18N_BULK_ADD_POSTAL_CODES',
      'Bulk add postal codes',
    ),
    LABEL_MESSAGE: i18n.t(
      'I18N_TARGET_THE_WHOLE_COUNTRY',
      'Target the whole country',
    ),
  },

  subdivisionCategories: {
    CITY: i18n.t('I18N_SUBDIVISION_CITY', 'City'),
    COUNTRY: i18n.t('I18N_SUBDIVISION_COUNTRY', 'Country'),
    DMA_REGION: i18n.t('I18N_SUBDIVISION_DMA', 'DMA'),
    POSTAL_CODE: i18n.t('I18N_SUBDIVISION_POSTAL_CODE', 'Postal Code'),
    REGION: i18n.t('I18N_SUBDIVISION_REGION', 'Region'),
    COUNTY: i18n.t('I18N_SUBDIVISION_COUNTY', 'County'),
  },
};

const ERROR_LABEL = i18n.t(
  'I18N_UNABLE_TO_ESTIMATE_AUDIEN',
  'Unable to estimate audience',
);
const ERROR_MESSAGE = i18n.t(
  'I18N_PLEASE_CHECK_YOUR_CONNECT',
  'Please check your connection or try reloading the page.',
);
const LOW_RECOMMENDATION_LABEL = i18n.t(
  'I18N_NOT_LIKELY_TO_BE_SPENT',
  'Not likely to be spent',
);
const MED_RECOMMENDATION_LABEL = i18n.t(
  'I18N_MAY_NOT_BE_SPENT',
  'May not be spent',
);
const LOW_OR_MED_VALUE_MESSAGE_1 = i18n.t(
  'I18N_TO_INCREASE_THE_LIKELIH_1',
  'To increase the likelihood of spending your full budget; do one or more of the following =',
);
const LOW_OR_MED_VALUE_MESSAGE_2 = i18n.t(
  'I18N_TO_INCREASE_THE_LIKELIH_2',
  '- Extend your schedule',
);
const LOW_OR_MED_VALUE_MESSAGE_3 = i18n.t(
  'I18N_TO_INCREASE_THE_LIKELIH_3',
  '- Expand your audience',
);
const LOW_OR_MED_VALUE_MESSAGE_4 = i18n.t(
  'I18N_TO_INCREASE_THE_LIKELIH_4',
  '- Add locations (cities; states; provinces; DMAs; etc.)',
);

const LOW_OR_MED_VALUE_MESSAGE_1_PODCAST = i18n.t(
  'I18N_LOW_OR_MED_VALUE_MESSAGE_1_PODCAST',
  '- Include more episode content topics',
);
// IMPORTANT: Leave the following variable formatted across multiple lines - required for
//  ReactMarkdown formatting.
const LOW_OR_MED_VALUE_MESSAGE = `${LOW_OR_MED_VALUE_MESSAGE_1}
${LOW_OR_MED_VALUE_MESSAGE_2}
${LOW_OR_MED_VALUE_MESSAGE_3}
${LOW_OR_MED_VALUE_MESSAGE_4}`;

// IMPORTANT: Leave the following variable formatted across multiple lines - required for
//  ReactMarkdown formatting.
const LOW_OR_MED_VALUE_PODCAST_MESSAGE = `${LOW_OR_MED_VALUE_MESSAGE_1_PODCAST}
${LOW_OR_MED_VALUE_MESSAGE_2}
${LOW_OR_MED_VALUE_MESSAGE_3}
${LOW_OR_MED_VALUE_MESSAGE_4}`;

const GOOD_RECOMMENDATION_LABEL = i18n.t(
  'I18N_LIKELY_TO_BE_SPENT',
  'Likely to be spent',
);
const GOOD_VALUE_MESSAGE = i18n.t(
  'I18N_YOUR_SELECTED_AUDIENCE_IS',
  'Based on your audience selections, your budget will likely spend in full.',
);

const REACH_TOO_LOW_LABEL = i18n.t('I18N_CANNOT_BE_SPENT', 'Cannot be spent');
const REACH_TOO_LOW_MESSAGE = i18n.t(
  'I18N_BROADEN_YOUR_AUDIENCE_TO1',
  'Broaden your audience to proceed.',
);

export const AUDIENCE_SIZER_STRINGS = {
  IMPRESSIONS_MODEL_ADS_SERVED_LABEL: i18n.t(
    'I18N_ESTIMATED_ADS_SERVED',
    'Estimated ads served',
  ),
  IMPRESSIONS_MODEL_ADS_SERVED_TOOLTIP_TEXT: i18n.t(
    'I18N_YOUR_COST_PER_AD_SERVED_I',
    'Your cost per ad served increases as you add more targeting selections.',
  ),
  PAID_LISTENS_MODEL_ADS_SERVED_LABEL: i18n.t(
    'I18N_ESTIMATED_AD_LISTENS',
    'Estimated ad listens',
  ),
  PAID_LISTENS_MODEL_ADS_SERVED_TOOLTIP_TEXT: i18n.t(
    'I18N_YOUR_COST_PER_LISTEN_INCR',
    'Your cost per listen increases as you add more targeting selections.',
  ),
  PAID_LISTENS_MODEL_ADS_VIEWED_LABEL: i18n.t(
    'I18N_ESTIMATED_AD_VIEWS',
    'Estimated ad views',
  ),
  PAID_LISTENS_MODEL_ADS_VIEWED_TOOLTIP_TEXT: i18n.t(
    'I18N_YOUR_COST_PER_VIEW_INCR',
    'Your cost per view increases as you add more targeting selections.',
  ),
  ESTIMATED_DAILY_REACH_LABEL: i18n.t(
    'I18N_ESTIMATED_REACH',
    'Estimated reach',
  ),
  ESTIMATED_DAILY_REACH_TOOLTIP_TEXT: i18n.t(
    'I18N_THE_ESTIMATED_NUMBER_OF_U',
    'The estimated number of unique users who will be served your ad at least once.',
  ),
  ESTIMATED_FREQUENCY_LABEL: i18n.t(
    'I18N_ESTIMATED_FREQUENCY',
    'Estimated lifetime frequency',
  ),
  ESTIMATED_FREQUENCY_TOOLTIP_TEXT: i18n.t(
    'I18N_THE_ESTIMATED_AVERAGE_NUM',
    'The estimated average number of times each user will be served your ad over the lifetime of the campaign.',
  ),
  BUDGET_DELIVERY_LABEL: i18n.t(
    'I18N_BUDGET_DELIVERY_LIKELIHOO',
    'Budget delivery likelihood',
  ),

  DEFAULT_PRICER_ERROR: i18n.t(
    'I18N_WE_RE_UNABLE_TO_GET_PRICI',
    'We’re unable to get pricing information. Check your connection or try reloading the page.',
  ),
  DEFAULT_AUDIENCE_ESTIMATE_ERROR: i18n.t(
    'I18N_WE_RE_UNABLE_TO_ESTIMATE',
    'We’re unable to estimate your audience. Check your connection or try reloading the page.',
  ),

  PLACEHOLDER_MESSAGE: i18n.t(
    'I18N_COMPLETE_REQUIRED_FIELDS',
    'Complete required fields',
  ),

  PLACEHOLDER_WITH_SUGGESTIONS_MESSAGE: i18n.t(
    'I18N_COMPLETE_REQUIRED_FIELDS',
    'Complete required fields',
  ),

  INSUFFICIENT_RANGE_TEXT: i18n.t('I18N_INSUFFICIENT', 'Insufficient'),

  ERROR_LABEL,
  ERROR_MESSAGE,

  LOW_RECOMMENDATION_LABEL,
  MED_RECOMMENDATION_LABEL,
  LOW_OR_MED_VALUE_MESSAGE,

  GOOD_RECOMMENDATION_LABEL,
  GOOD_VALUE_MESSAGE,

  REACH_TOO_LOW_LABEL,
  REACH_TOO_LOW_MESSAGE,

  GREATER_THAN_PREFIX: i18n.t('I18N_GREATER_THAN', 'Greater than ') + ' ',
  LESS_THAN_PREFIX: i18n.t('I18N_LESS_THAN', 'Less than ') + ' ',

  RECOMMENDATIONTEXT: {
    Error: {
      Label: ERROR_LABEL,
      Body: ERROR_MESSAGE,
    },
    NoValue: {
      Label: i18n.t('I18N_RECOMMENDATION', 'Recommendation'),
      Body: null,
    },
    LowValue: {
      Label: LOW_RECOMMENDATION_LABEL,
      Body: LOW_OR_MED_VALUE_MESSAGE,
    },
    MedValue: {
      Label: MED_RECOMMENDATION_LABEL,
      Body: LOW_OR_MED_VALUE_MESSAGE,
    },
    HighValue: {
      Label: GOOD_RECOMMENDATION_LABEL,
      Body: GOOD_VALUE_MESSAGE,
    },
    ReachTooLow: {
      Label: REACH_TOO_LOW_LABEL,
      Body: REACH_TOO_LOW_MESSAGE,
    },
  },

  REACH_COST_LABEL_TEXT: i18n.t(
    'I18N_BASED_ON_YOUR_TARGETING_Y',
    'Based on your targeting, you can reach this audience for',
  ),

  PER_AD_SERVED: i18n.t('I18N_CPM', 'per ad served'),
  PER_VIDEO_SERVED: i18n.t('I18N_PER_VIDEO_AD_SERVED', 'per video ad served'),
  PER_LISTEN: i18n.t('I18N_PER_LISTEN', 'per listen'),
  PER_VIEW: i18n.t('I18N_PER_VIEW', 'per view'),
  HIGH_LABEL: i18n.t('I18N_HIGH', 'High'),
  LOW_LABEL: i18n.t('I18N_LOW', 'Low'),
};

export const AUDIENCE_SIZER_1XY_STRINGS = {
  ...AUDIENCE_SIZER_STRINGS,
  IMPRESSIONS_MODEL_ADS_SERVED_LABEL: i18n.t(
    'I18N_ESTIMATED_IMPRESSIONS',
    'Estimated impressions',
  ),
  IMPRESSIONS_MODEL_ADS_SERVED_TOOLTIP_TEXT: i18n.t(
    'I18N_YOUR_COST_PER_IMPRESSION_I',
    'Your cost per impression increases as you add more targeting selections.',
  ),
  CPM_TOOLTIP: i18n.t(
    'I18N_CPM_TOOLTIP',
    'Your CPM increases as you add more targeting selections.',
  ),
  MAXIMUM_CPM_LABEL: i18n.t('I18N_MAXIMUM_CPM_LABEL', 'maximum CPM'),
  MAXIMUM_CPM_TOOLTIP: i18n.t(
    'I18N_MAXIMUM_CPM_TOOLTIP',
    "Maximum CPM is the most you'll pay per thousand impressions. Ads delivered off Spotify typically have a lower CPM than ads on Spotify, so your final CPM may vary based on delivery.",
  ),
  MAXIMUM_CPM_EDIT_DISCLAIMER: i18n.t(
    'I18N_MAXIMUM_CPM_EDIT_DISCLAIMER',
    'For ads delivered off Spotify, all impressions today are billed at the new CPM. For ads on Spotify, changes apply going forward.',
  ),
  ACCEPTABLE_AUDIENCE_MESSAGE: i18n.t(
    'I18N_ACCEPTABLE_AUDIENCE_MESSAGE',
    'Your selected audience is suited to your budget.',
  ),
  CPM_LABEL: i18n.t('I18N_CPM', 'CPM'),
  LOW_OR_MED_VALUE_PODCAST_MESSAGE,
};

export const MIN_ENTITY_NAME_LENGTH = 2;
export const MAX_ENTITY_NAME_LENGTH = 120;

export const MIN_BRAND_NAME_LENGTH = 2;
export const MAX_BRAND_NAME_LENGTH = 25;

export const MIN_TAG_LINE_LENGTH = 2;
export const MAX_TAG_LINE_LENGTH = 40;
