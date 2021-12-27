import { DomainValidator } from 'commons-validator-js';
import EMOJI_REGEX from 'emojibase-regex';
import formatNumber from 'format-number';
import i18n from 'i18next';
import { get, isEmpty, isObject, memoize } from 'lodash';
import moment from 'moment';

import {
  EASTER_EGG_BUDGET,
  EASTER_EGG_BUDGET_E2E,
  MIN_BUDGET,
} from '@spotify-internal/adstudio-shared/lib/config/budget';
import { getWordCount } from '@spotify-internal/adstudio-tape/lib/utils/helpers/stringHelpers';
import { getNumberFromCurrencyString } from '@spotify-internal/adstudio-web-utils/lib/utils/currency';
import {
  checkboxValidator,
  numericString,
} from '@spotify-internal/adstudio-web-utils/lib/validators';
import URI from 'spotify-liburi';

import { CLIENT_AUDIO_TYPES, CLIENT_IMAGE_TYPES } from 'config';
import {
  BUSINESS_PROMO,
  FORM_NAMES,
  MAX_BRAND_NAME_LENGTH,
  MAX_ENTITY_NAME_LENGTH,
  MAX_TAG_LINE_LENGTH,
  MIN_BRAND_NAME_LENGTH,
  MIN_ENTITY_NAME_LENGTH,
  MIN_TAG_LINE_LENGTH,
} from 'config/adCreation';

import { Placement } from 'types/common/campaignHierarchy/types';

// helper for wrapping any other validator in a custom message
// to override the default
function _withCustomMessage(validator, message) {
  return value => validator(value) && message;
}

export const withCustomMessage = memoize(_withCustomMessage, (...args) =>
  [...args].join('|'),
);

export const i18nCheckboxValidator = withCustomMessage(
  checkboxValidator,
  i18n.t('I18N_CHOOSE_AT_LEAST_ONE_VALUE', 'Choose at least one value.'),
);

export function atLeastOneTrueValue(value) {
  if (!isObject(value)) {
    throw new Error(`"${value}" is not an object`);
  }

  const atLeastOneValueIsTrue = Object.keys(value).some(k => value[k]);

  if (!atLeastOneValueIsTrue) {
    return i18n.t(
      'I18N_PLEASE_SELECT_AT_LEAST_ON',
      'Please select at least one value.',
    );
  }
}

const _numericStringBetween = (min, max, numberFormatter = formatNumber) => {
  return value => {
    // first, check that the value provided is actually a numeric string.
    const _numericString = withCustomMessage(
      numericString,
      i18n.t('I18N_MUST_BE_A_NUMERIC_VALUE', 'Must be a numeric value.'),
    );
    const numericStringError = _numericString(value);
    if (numericStringError) {
      return numericStringError;
    }

    // turn the string into a number
    const number = getNumberFromCurrencyString(value);

    if (typeof min === 'number' && min > number) {
      const numericAmount = numberFormatter(min);
      return i18n.t('I18N_AMOUNT_MUST_BE_OR_MORE', {
        numericAmount,
        defaultValue: 'Amount must be {{numericAmount}} or more',
      });
    }
    if (typeof max === 'number' && max < number) {
      const numericAmount = numberFormatter(max);
      return i18n.t('I18N_AMOUNT_MUST_BE_OR_LESS', {
        numericAmount,
        defaultValue: 'Amount must be {{numericAmount}} or less',
      });
    }
  };
};

export const numericStringBetween = memoize(
  _numericStringBetween,
  (min, max, numberFormatter = num => `${num}`) =>
    [min, max, numberFormatter(1234.567)].join('|'),
);

// sugar that just relies on . these could have their own
// impls for performance reasons later.
export const numericStringAbove = (min, numberFormatter) =>
  numericStringBetween(min, null, numberFormatter);
export const numericStringBelow = (max, numberFormatter) =>
  numericStringBetween(null, max, numberFormatter);

// sometimes, it's useful to connect an error message
// from the main redux store as a component. in this case,
// the form value will either be null or an error message.
export function errorMessageField(value) {
  return value ? value.toString() : undefined;
}

// a variant on errorMessageField where we connect the error from the store
// instead of depending on the error being the value of the field
function _checkForError(error) {
  return () => errorMessageField(error);
}

export const checkForError = memoize(_checkForError);

function _checkForFileUpload(formName) {
  return (value, formValues) => {
    if (value && formName && !get(formValues[formName], 'gcsUri')) {
      return true;
    }
  };
}

export const checkForFileUpload = memoize(_checkForFileUpload);

function _lengthIsLessThanOrEqualTo(max, name = 'text') {
  return value => {
    if (value && value.length > max) {
      return i18n.t('I18N_THE_MUST_BE_CHARACTERS_OR', {
        name,
        numericAmount: max,
        defaultValue:
          'The {{name}} must be {{numericAmount}} characters or fewer.',
      });
    }
  };
}

export const lengthIsLessThanOrEqualTo = memoize(
  _lengthIsLessThanOrEqualTo,
  (...args) => [...args].join('|'),
);

// File upload validators
export function fileUploadRequired(value) {
  if (!(value instanceof File) && !(value instanceof Blob)) {
    return i18n.t('I18N_PLEASE_UPLOAD_A_FILE', 'Please upload a file.');
  }
}

// Used when image was written by a backend, not through the upload component
export function fileBackendImageUploadRequired(value, formValues) {
  if (value) {
    return fileUploadRequired(value);
  }
  if (!get(formValues[FORM_NAMES.IMAGE], 'gcsUri')) {
    return i18n.t('I18N_PLEASE_UPLOAD_A_FILE', 'Please upload a file.');
  }
}

// Used when audio was written by a backend, not through the upload component
export function fileBackendAudioUploadRequired(value, formValues) {
  if (value) {
    return fileUploadRequired(value);
  }
  if (!get(formValues[FORM_NAMES.AUDIO], 'gcsUri')) {
    return i18n.t('I18N_PLEASE_UPLOAD_A_FILE', 'Please upload a file.');
  }
}

export function validateFloatStringInRange(value, minValue, maxValue) {
  const floatValue = parseFloat(value);
  if (Number.isNaN(floatValue)) {
    return i18n.t('I18N_INVALID_NUMBER', 'Input value must be a number.');
  }
  if (minValue !== undefined && minValue !== null && floatValue < minValue) {
    return i18n.t('I18N_NUMBER_TOO_SMALL', {
      minValue,
      defaultValue: 'Input value must be at least {{minValue}}',
    });
  }
  if (maxValue !== undefined && maxValue !== null && floatValue > maxValue) {
    return i18n.t('I18N_NUMBER_TOO_BIG', {
      maxValue,
      defaultValue: 'Input value must be at most {{maxValue}}',
    });
  }
}

export function validAudioFileType(value) {
  // ignore empty files
  if (!value) {
    return;
  }

  const isAudioTypeValid = CLIENT_AUDIO_TYPES.includes(value.type);
  if (!isAudioTypeValid) {
    return i18n.t(
      'I18N_INVALID_FILE_EXTENSION_AU',
      'Invalid file extension. Please upload a OGG, MP3, or WAV.',
    );
  }
}

export function validImageFileType(value) {
  // ignore empty files
  if (!value) {
    return;
  }

  const isImageTypeValid = CLIENT_IMAGE_TYPES.includes(value.type);
  if (!isImageTypeValid) {
    return i18n.t(
      'I18N_INVALID_FILE_EXTENSION_IM',
      'Invalid file extension. Please upload a JPG or PNG.',
    );
  }
}

function _getWordCountErrorMsg(number) {
  return i18n.t('I18N_PLEASE_LIMIT_YOUR_INPUT_T', {
    numericAmount: number,
    defaultValue: 'Please limit your input to {{numericAmount}} words.',
  });
}

function _maxWordCount(number) {
  return value => {
    const wordCount = getWordCount(value || '');
    if (wordCount > number) {
      return _getWordCountErrorMsg(number);
    }
  };
}

function _minCharCount(number, fieldName) {
  return value => {
    const str = value || '';
    if (str.trim().length < number) {
      return i18n.t('I18N_MUST_HAVE_OR_MORE_CHARACT', {
        name: fieldName,
        numericAmount: number,
        defaultValue:
          '{{name}} must have {{numericAmount}} or more characters.',
      });
    }
  };
}

export const maxWordCount = memoize(_maxWordCount);
export const minCharCount = memoize(_minCharCount);
export const maxWordCountErrorMsg = memoize(_getWordCountErrorMsg);

export function locationsFromSameCountry(targetedLocations) {
  const invalid = targetedLocations.every(
    location => targetedLocations[0].countryCode === location.countryCode,
  );

  if (!invalid) {
    return i18n.t(
      'I18N_YOU_CAN_ONLY_TARGET_ONE_C',
      'You can only target one country per ad.',
    );
  }
}

// Check for blank characters in headline
export function headLineNoBlankCharacters(value) {
  if (/^\s*$/.test(value)) {
    return i18n.t('I18N_THIS_FIELD_IS_REQUIRED', 'This field is required.');
  }
}

// Check for emojis
export function noEmojiSymbols(value) {
  if (EMOJI_REGEX.test(value))
    return i18n.t(
      'I18N_WE_DO_NOT_CURRENTLY_SUPPO',
      'We do not currently support emojis.',
    );
}

// check that multiple boxes are checked
export const allCheckboxesSelected = memoize(_allCheckboxesSelected);

function _allCheckboxesSelected(values) {
  const value = values || {};
  const invalid = !value['tc-checkbox'] || !value['ip-checkbox'];
  if (invalid) {
    return i18n.t(
      'I18N_PLEASE_ACCEPT_THE_TERMS_A',
      'Please accept the Terms and Conditions',
    );
  }
}

// Check for valid clickthrough URLs
export const VALID_MACRO_SEQUENCES = [
  'CAMPAIGN_ID',
  'FLIGHT_ID',
  'CREATIVE_ID',
  'DEVICE_ID',
  'CACHEBUSTER',
  'CLICK_URL',
];

const MACRO_MATCHER = /%%([a-zA-Z0-9:@%._\+~#=]+)%%/;

const _validateMacroParams = params =>
  params.every(param => {
    const macroParam = MACRO_MATCHER.exec(param)[1].replace(
      /(_ESC|_UNESC)/g,
      '',
    );

    return VALID_MACRO_SEQUENCES.includes(macroParam);
  });

const _validateNormalParams = params => {
  for (let i = 0; i < params.length; i++) {
    try {
      decodeURI(params[i]);
    } catch (e) {
      return false;
    }
  }
  return true;
};

const _validateDomain = domain => {
  const domainValidator = new DomainValidator();
  return domainValidator.isValid(domain);
};

const _validateClickthroughUrl = (value, errorMessage, urlPattern = false) => {
  let url;
  // validate properly formed url.
  try {
    // validate url against pattern if available
    if (urlPattern && !value.match(urlPattern)) {
      return errorMessage;
    }

    // check if we can construct a URL from what's passed
    url = new URL(value);

    // double check the protocol as URL autocorrects https:/ to https://
    if (!value.match(/(http(s)?:\/\/)/)) {
      return errorMessage;
    }
  } catch (e) {
    return errorMessage;
  }

  const params = url.search.split('&');
  const filteredParams = params.reduce(
    (acc, param) => {
      if (MACRO_MATCHER.test(param)) acc.macroParams.push(param);
      else acc.normalParams.push(param);
      return acc;
    },
    { macroParams: [], normalParams: [] },
  );

  // validate macro query parameters
  if (!_validateMacroParams(filteredParams.macroParams)) return errorMessage;
  // validate normal query parameters
  if (!_validateNormalParams(filteredParams.normalParams)) return errorMessage;
  // validate TLD
  if (!_validateDomain(url.host)) return errorMessage;
};

const _validateUnsafeChars = (value, errorMessage) => {
  const unsafeChars = /[\s\{\}\|\\\~\^\[\]\`\"]/g;
  if (value.match(unsafeChars)) {
    return errorMessage;
  }
};

export function validateArtistPromotionClickthrough(value) {
  const ERROR_MESSAGE = i18n.t(
    'I18N_ENTER_A_VALID_SPOTIFY_URL',
    'Enter a valid Spotify url starting with https://open.spotify.com/.',
  );

  const ARTIST_PROMOTION_PATTERN = /http(s)?:\/\/open\.spotify\.com\/.*/;
  return _validateClickthroughUrl(
    value,
    ERROR_MESSAGE,
    ARTIST_PROMOTION_PATTERN,
  );
}

export function validateClickthrough(value) {
  const ERROR_MESSAGE = i18n.t(
    'I18N_PLEASE_ENTER_A_VALID_URL',
    'Please enter a valid URL.',
  );
  return _validateClickthroughUrl(value, ERROR_MESSAGE);
}

export function isValidSpotifyTrackUriOrBlank(value) {
  if (value) {
    return isValidSpotifyTrackUri(value);
  }
}

export function isValidSpotifyTrackUri(value) {
  const ERROR_MESSAGE = i18n.t(
    'I18N_PLEASE_ENTER_A_VALID_SPOT',
    'Please enter a valid Spotify Track URI.',
  );
  try {
    if (URI.fromString(value).type !== URI.Type.TRACK) {
      return ERROR_MESSAGE;
    }
  } catch (e) {
    return ERROR_MESSAGE;
  }
}

export function isValidTrackUrl(value) {
  const ERROR_MESSAGE = i18n.t(
    'I18N_ENTER_A_VALID_SPOTIFY_TRA',
    'Enter a valid Spotify track URL starting with https://open.spotify.com/track/...',
  );

  const URL_PATTERN = /http(s)?:\/\/open\.spotify\.com\/track\/.*/;
  return _validateClickthroughUrl(value, ERROR_MESSAGE, URL_PATTERN);
}

export function isValidSpotifyTrackUriUrl(value) {
  if (value) {
    if (!isValidSpotifyTrackUri(value)) {
      return;
    }
    return isValidTrackUrl(value);
  }
}

export function validateUnsafeChars(value) {
  const ERROR_MESSAGE = `${i18n.t(
    'I18N_URL_CAN_T_INCLUDE_UNSAFE',
    "URL can't include unsafe characters like spaces, ~, or |. Visit our FAQ for help.",
  )}`;
  return _validateUnsafeChars(value, ERROR_MESSAGE);
}

export function validateForecastingBudgetRestriction(value) {
  if (value > 25000)
    return i18n.t(
      'I18N_THIS_VALUE_CAN_ONLY_BE_US',
      'This value can only be used for forecasting purposes',
    );
}

export const validateBudgetChange = initialValue => newValue => {
  if (!initialValue) {
    return;
  } else if (Number(newValue) < Number(initialValue)) {
    return i18n.t(
      'I18N_SUBMITTING_A_REDUCED_BUDG',
      "Submitting a reduced budget isn't permitted. You'll need to create a new ad with a reduced budget.",
    );
  }
};

export const validateEditDateRange = initialValue => newValue => {
  if (!initialValue) {
    return;
  }

  const adHasStarted = moment(initialValue.begin).isSameOrBefore(moment());
  const startDateChanged = !moment(initialValue.begin).isSame(
    moment(newValue.begin),
  );

  if (adHasStarted) {
    if (startDateChanged) {
      return i18n.t(
        'I18N_START_DATE_CANNOT_BE_MODI',
        'Start date cannot be modified if your campaign is active.',
      );
    }
  }
};

export const startDateIsBeforeEndDate = value => {
  if (value?.begin && value?.end) {
    if (moment(value?.end).isSameOrBefore(moment(value?.begin)))
      return i18n.t(
        'I18N_START_DATE_MUST_BE_BEFORE_END_DATE',
        'Start date must be before end date.',
      );
  }
};

const _validateAspectRatio = aspectRatio => (value, props) => {
  const video = props[FORM_NAMES.VIDEO];
  if (isEmpty(video)) return;

  if (video.aspectRatio !== aspectRatio) {
    return i18n.t(
      'I18N_PLEASE_UPLOAD_ASPECT_RATIO',
      'Please upload a video with the correct aspect ratio.',
    );
  }
};

export const validateAspectRatio = memoize(_validateAspectRatio);

export const validateEntityNameLength = val => {
  if (
    val.length < MIN_ENTITY_NAME_LENGTH ||
    val.length > MAX_ENTITY_NAME_LENGTH
  ) {
    return i18n.t('I18N_NAME_INVALID_LENGTH', {
      min: MIN_ENTITY_NAME_LENGTH,
      max: MAX_ENTITY_NAME_LENGTH,
      defaultValue: 'Name must be between {{min}} and {{max}} characters long.',
    });
  }
};

export const validateBrandNameLength = val => {
  if (
    !val ||
    val.trim().length < MIN_BRAND_NAME_LENGTH ||
    val.trim().length > MAX_BRAND_NAME_LENGTH
  ) {
    return i18n.t('I18N_NAME_INVALID_LENGTH', {
      min: MIN_BRAND_NAME_LENGTH,
      max: MAX_BRAND_NAME_LENGTH,
      defaultValue:
        'Brand name must be between {{min}} and {{max}} characters long.',
    });
  }
};

export const validateTaglineLength = val => {
  if (
    val &&
    (val.trim().length < MIN_TAG_LINE_LENGTH ||
      val.trim().length > MAX_TAG_LINE_LENGTH)
  ) {
    return i18n.t('I18N_TAG_LINE_INVALID_LENGTH', {
      min: MIN_TAG_LINE_LENGTH,
      max: MAX_TAG_LINE_LENGTH,
      defaultValue:
        'Tagline must be between {{min}} and {{max}} characters long.',
    });
  }
};

// special validation case for custom budget amounts where min budget depends on form's placement field
export const validateCustomBudgetAmount = memoize(
  options => {
    const {
      currencyFormatter,
      maxBudget: initialMaxBudget,
      placementFieldName,
      minMusicBudget,
      minPodcastBudget,
      noMaxBudget,
      premiumBudget,
    } = options;
    return (value, form) => {
      const formattedMaxBudget = currencyFormatter(initialMaxBudget, {
        decimals: 0,
      });
      const formattedMinMusicBudget = currencyFormatter(
        minMusicBudget || MIN_BUDGET,
        {
          decimals: 0,
        },
      );
      const formattedMinPodcastBudget = currencyFormatter(
        minPodcastBudget || MIN_BUDGET,
        {
          decimals: 0,
        },
      );

      const localizedErrors = {
        numericErrorText: i18n.t(
          'I18N_PLEASE_ENTER_A_VALID_AMOU',
          'Please enter a valid amount.',
        ),
        maxBudgetError: i18n.t('I18N_AD_STUDIO_S_MAXIMUM_BUDGE', {
          defaultValue: `Ad Studio's maximum budget is ${formattedMaxBudget}. Contact adstudio@spotify.com for help setting up larger campaigns.`,
          formattedErrorBudget: formattedMaxBudget,
        }),
        minBudgetPodcastError: i18n.t(
          'I18N_AD_STUDIO_HAS_A_MINIMUM_B_PODCAST',
          {
            defaultValue: `Minimum budget is ${formattedMinPodcastBudget} for podcast ads.`,
            formattedMinPodcastBudget: formattedMinPodcastBudget,
          },
        ),
        minBudgetMusicError: i18n.t('I18N_AD_STUDIO_HAS_A_MINIMUM_B_MUSIC', {
          defaultValue: `Minimum budget is ${formattedMinMusicBudget} for music ads.`,
          formattedMinMusicBudget: formattedMinMusicBudget,
        }),
        premiumError: i18n.t(
          'I18N_PLEASE_CONTACT_ADSTUDIO',
          'Please contact adstudio@spotify.com for premium ad options.',
        ),
      };

      const isPodcast = get(form, placementFieldName) === Placement.PODCASTS;

      const maxBudget = noMaxBudget ? Infinity : initialMaxBudget;
      const minBudget =
        (isPodcast ? minPodcastBudget : minMusicBudget) || MIN_BUDGET;

      const amountRangeValidator = numericStringBetween(
        minBudget,
        maxBudget,
        currencyFormatter,
      );

      const premiumBudgetValidator = numericStringBelow(
        premiumBudget,
        currencyFormatter,
      );
      const maxBudgetValidator = numericStringBelow(
        maxBudget,
        currencyFormatter,
      );
      const minBudgetValidator = numericStringAbove(
        minBudget,
        currencyFormatter,
      );

      const amountErrorMessage = amountRangeValidator(value);

      // the amount provided was in range
      if (!amountErrorMessage) {
        return;
      }

      const number = getNumberFromCurrencyString(value);

      if (typeof number !== 'number') {
        return localizedErrors.numericErrorText;
      }

      // 0.03 & 20.03 are a valid amounts for testing
      if (
        [EASTER_EGG_BUDGET, EASTER_EGG_BUDGET_E2E].includes(number.toString())
      ) {
        return;
      }

      // if we are above the premium threshold, show the premium error.
      if (premiumBudgetValidator(value)) {
        return localizedErrors.premiumError;
      }

      // if we are above the normal threshold, show the max error.
      if (maxBudgetValidator(value)) {
        return localizedErrors.maxBudgetError;
      }

      // if we are below the normal threshold, show the min error.
      if (minBudgetValidator(value)) {
        return isPodcast
          ? localizedErrors.minBudgetPodcastError
          : localizedErrors.minBudgetMusicError;
      }

      // something different is unexpected on.
      return localizedErrors.numericErrorText;
    };
  },
  ({
    currencyFormatter,
    maxBudget,
    placementFieldName,
    minMusicBudget,
    minPodcastBudget,
    noMaxBudget,
    premiumBudget,
  }) =>
    [
      currencyFormatter(1234.56),
      maxBudget,
      placementFieldName,
      minMusicBudget,
      minPodcastBudget,
      noMaxBudget,
      premiumBudget,
    ].join('|'),
);

export const validatePlacementForObjective = objective => value => {
  if (objective !== BUSINESS_PROMO && value === Placement.PODCASTS)
    return i18n.t(
      'I18N_PODCAST_AD_PLACEMENT',
      'Podcast ad placement is only available for campaigns promoting brands at this time.',
    );
  return;
};
