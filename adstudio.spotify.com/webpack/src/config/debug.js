// --- Create Ad ---
import { setUserAccount } from 'ducks/account/actions';
import * as debugActions from 'ducks/debug/actions';
import { replaceFormValues } from 'ducks/reduxForm/actions';

import { getWebgateToken } from 'api/webgate';

import { daysFromToday, endOfDay } from 'utils/dateHelpers';

import { ASPECT_RATIOS } from './adCreation';
import { FREQUENCY_CAP_DEFAULT_VALUE } from './frequencyCaps';

import {
  FREE_TRIAL_NULL_VALUE,
  TARGETING_MAX_AGE,
  TARGETING_MIN_AGE,
} from 'config';
import { ACCOUNT_REDUX_FORM_ID } from 'config/account';
import { EASTER_EGG_BUDGET } from 'config/payments';

import { Format } from 'types/common/state/api/format';

const IMAGE_ID = '29a58838-eae6-47f6-8165-7696bbf620d7';
const IMAGE_GCS_URL = `https://storage.googleapis.com/adstudio-inbox/${IMAGE_ID}`;
const AUDIO_ID = 'b5b8b753-d46d-42dd-a5ce-5d3eeff9bc9c';
const GCS_URL = `https://storage.googleapis.com/adstudio-inbox/${AUDIO_ID}`;
const DEBUG_COUNTRY = {
  countryCode: 'US',
  id: 'US',
  geoId: 'US',
  name: 'United States',
  parentName: '',
  type: 'COUNTRY',
  typeDisplayName: 'COUNTRY',
};
const DEBUG_GEO = {
  name: 'Omaha, NE',
  type: 'DMA_REGION',
  countryCode: 'US',
  id: 652,
  geoId: '652',
  typeDisplayName: 'DMA',
  parentName: 'United States',
};

export const POPULATED_AD = {
  name: 'Thank You',
  clickthroughUrl:
    'https://open.spotify.com/user/spotifycharts/playlist/37i9dQZEVXbLRQDuF5jeBp',
  internalName: 'Test-Reject',
  objective: 'businesspromo',
  purchaseOrderNumber: '123456789',
  ctaText: 'LEARN MORE',
  creativeFormat: Format.AUDIO,
  selectedAspectRatio: ASPECT_RATIOS.UNKNOWN,
  image: { url: IMAGE_GCS_URL, id: IMAGE_ID },
  audio: { mp3Url: GCS_URL, id: AUDIO_ID },
  fullmixId: AUDIO_ID,
  targeting: {
    geo: [DEBUG_GEO],
    country: [DEBUG_COUNTRY],
    platforms: ['desktop'],
    genders: ['male', 'female'],
    ageMin: `${TARGETING_MIN_AGE}`,
    ageMax: `${TARGETING_MAX_AGE}`,
    ageRanges: [{ ageMin: TARGETING_MIN_AGE, ageMax: TARGETING_MAX_AGE }],
    audienceData: [],
    moments: [],
    genres: [],
    audienceSegmentIds: [],
    freeTrial: FREE_TRIAL_NULL_VALUE,
  },
  withFrequencyCap: false,
  frequencyCap: FREQUENCY_CAP_DEFAULT_VALUE,

  brandName: 'adStudio Debug Co.',
  dateBegin: daysFromToday(2),
  dateEnd: endOfDay(daysFromToday(2)),
  totalBudget: EASTER_EGG_BUDGET,
  debug: true,
};

export const POPULATED_INSTANT_AD = {
  name: 'Thank You',
  internalName: 'Ricky Martin',
  objective: 'artistpromo',
  creativeFormat: Format.AUDIO,
  selectedAspectRatio: ASPECT_RATIOS.UNKNOWN,
  artist: [
    {
      id: '7slfeZO9LsJbWgpkIoXBUJ',
      images: [
        {
          height: 640,
          width: 640,
          url:
            'https://i.scdn.co/image/76390c7321e976a63a5124124915765a784de36b',
        },
      ],

      name: 'Ricky Martin',
    },
  ],
  targeting: {
    geo: [DEBUG_GEO],
    country: [DEBUG_COUNTRY],
    targetWholeCountry: true,
    platforms: ['desktop'],
    genders: ['male', 'female'],
    ageMin: `${TARGETING_MIN_AGE}`,
    ageMax: `${TARGETING_MAX_AGE}`,
    audienceData: [],
    moments: [],
    genres: [],
    audienceSegmentIds: [],
    freeTrial: FREE_TRIAL_NULL_VALUE,
  },
  withFrequencyCap: false,
  frequencyCap: FREQUENCY_CAP_DEFAULT_VALUE,
  brandName: 'adStudio Debug Co.',
  dateBegin: daysFromToday(2),
  dateEnd: endOfDay(daysFromToday(2)),
  totalBudget: EASTER_EGG_BUDGET,
  debug: true,
};

export const POPULATED_ACCOUNT = {
  country: 'US',
  firstName: 'Buddy',
  lastName: 'The Elf',
  businessName: 'Spotify',
  businessEmail: 'no-reply@spotify.com',
  businessType: 'Brand advertiser',
  industry: 'Automotive',
};

const KEY_F5 = 116;
const KEY_F6 = 117;
const KEY_F7 = 118;

export default function debug(store, windowObj) {
  function populateAccount() {
    store.dispatch(replaceFormValues(ACCOUNT_REDUX_FORM_ID, POPULATED_ACCOUNT));
  }

  function forceAccountSetup() {
    store.dispatch(setUserAccount(null));
  }

  // Add debug keyboard shortcuts
  windowObj.onkeyup = e => {
    switch (e.keyCode) {
      case KEY_F7:
        populateAccount();
        break;
      default:
    }
  };

  function triggerAction(actionType, payload) {
    store.dispatch({
      type: actionType,
      payload,
    });
  }

  function extendStartDate(adId, numDays = 30) {
    store.dispatch(debugActions.extendStartDate(adId, daysFromToday(numDays)));
  }

  function extendEndDate(adId, numDays = 30) {
    store.dispatch(debugActions.extendEndDate(adId, daysFromToday(numDays)));
  }

  return {
    populateAccount,
    forceAccountSetup,
    store,
    env: () => __ENV__,
    triggerAction,
    extendStartDate,
    extendEndDate,
    getWebgateToken,
  };
}
