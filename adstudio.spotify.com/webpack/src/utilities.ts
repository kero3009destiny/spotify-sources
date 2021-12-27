import { isEqual } from 'lodash';

import { TARGETING_MAX_AGE } from 'config';

import { AgeRange } from 'types/common/state/api/flight';

const DEFAULT_GENERATOR = () => Date.now();

/**
 * Append a parameter to the given url for the purposes of avoiding the local resource cache.
 * @param {String} url The URL to modify
 * @param {String} parameter The name of the cachebusting parameter [default = 'cachebuster']
 * @param {Function} generator A function which will generate a cachebusting value
 */
export function appendCachebuster(
  url: string,
  parameter = 'cachebuster',
  generator = DEFAULT_GENERATOR,
) {
  const urlWithSep = url + (url.indexOf('?') === -1 ? '?' : '');
  return urlWithSep + '&' + parameter + '=' + generator();
}

/**
 * Populate an object with given keys and initial value
 * @param {Iterator | Array} keys
 * @param {*} initialValue
 * @return {Object}
 */
export function fillObject(keys: string[], initialValue: any) {
  type ReturnType = { [key: string]: any };
  return Array.from(keys).reduce((obj, k) => {
    obj[k] = initialValue;
    return obj;
  }, {} as ReturnType);
}

/**
 * @param {number|string} ageMax
 * @return {number|string}
 */
export function ageMaxConverter(ageMax: number | string) {
  const ageMaxInt = typeof ageMax === 'number' ? ageMax : parseInt(ageMax, 10);
  if (ageMaxInt >= TARGETING_MAX_AGE) {
    return `${TARGETING_MAX_AGE}+`;
  }
  return ageMax;
}

/**
 * Return a string of an age range
 * @param {AgeRange>} ageRange
 * @return {string}
 */
export function toAgeRangeString(ageRange: AgeRange) {
  if (!ageRange.ageMax && !ageRange.ageMin) return '';
  if (!ageRange.ageMin) return ageRange.ageMax?.toString() + '-';
  if (!ageRange.ageMax) return ageRange.ageMin?.toString() + '+';
  if (ageRange.ageMin === ageRange.ageMax)
    return ageMaxConverter(ageRange.ageMin);

  return ageRange.ageMin + '–' + ageMaxConverter(ageRange.ageMax);
}

/**
 * Return an array of Ranges that do not overlap
 * @param {Array<AgeRange>} ageRanges
 * @return {Array<AgeRange>}
 */
function mergeContinuousRanges(sortedAgeRangesByMinAge: Array<AgeRange>) {
  const continuousRanges = sortedAgeRangesByMinAge.reduce<Array<AgeRange>>(
    (arr, range) => {
      const last = arr[arr.length - 1];
      const lastMax = last?.ageMax || -Infinity;
      const currentMin = range.ageMin;
      const currentMax = range.ageMax;

      // if current min age is greater than the previous max age, it means the ranges aren't continuous
      // therefore we push the range into our result
      if (lastMax < (currentMin || 0) - 1) return [...arr, range];
      // if the current min age is smaller than the previous max age, it means the ranges are continous
      // therefore we need to set the las max age to be the larger of the two ranges
      else if ((currentMax || Infinity) > lastMax) {
        const newArray = [
          ...arr.slice(0, arr.length - 1),
          { ...last, ageMax: currentMax },
        ];
        return newArray;
      }
      return arr;
    },
    [],
  );
  return continuousRanges;
}

/**
 * Return a string of a comma seperated list of age ranges
 * @param {Array<AgeRange>} ageRanges
 * @return {string}
 */
export function toAgeRangesString(ageRanges: AgeRange[]) {
  const sortedAgeRangesByMinAge = [...ageRanges].sort((a, b) => {
    if ((a.ageMin || 0) > (b.ageMin || 0)) return 1;
    return -1;
  });

  const continuousAgeRanges = mergeContinuousRanges(sortedAgeRangesByMinAge);

  const largestOriginalAgeRange =
    sortedAgeRangesByMinAge[sortedAgeRangesByMinAge.length - 1];

  const str = continuousAgeRanges
    .map(continuousAgeRange => {
      // when ageMax === undefined, it means the range is ageMin+ (anything greater than ageMin)
      if (
        continuousAgeRange.ageMax === undefined &&
        largestOriginalAgeRange.ageMin
      ) {
        // if the continuous ageRange is equal to the largest original age range, we want to display ageMin+
        if (isEqual(continuousAgeRange, largestOriginalAgeRange))
          return toAgeRangeString(continuousAgeRange);

        // if the continuous age range is not equal to the largest original age range,
        // we still want to keep the max value of the original age range
        // therefore we would like to display ageMin - ageMax+
        return `${continuousAgeRange.ageMin}–${ageMaxConverter(
          largestOriginalAgeRange.ageMin,
        )}`;
      }

      return toAgeRangeString(continuousAgeRange);
    })
    .join(', ');

  return str;
}

/**
 * Convert string to title case format
 * @param {string} str - String that will be coverted to title case
 * @return {string} - returns the string in title case format
 */
export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

export function sortByKeyAsc(key: string, arr: Record<string, any>[]) {
  return arr.sort((a, b) => {
    const aLowercase = a[key].toLowerCase();
    const bLowercase = b[key].toLowerCase();

    if (aLowercase > bLowercase) return 1;
    if (aLowercase < bLowercase) return -1;
    return 0;
  });
}

export function ballparkNumber(num: number) {
  const roundedNum = Math.round(num);
  const length = roundedNum.toString().length;
  const divisor = Math.pow(10, length - (length > 3 ? 2 : 1));
  return Math.round(roundedNum / divisor) * divisor;
}

function convertDataURIToBinary(dataBase64: string) {
  const binaryData = window.atob(dataBase64);
  const binaryLength = binaryData.length;
  const binaryArray = new Uint8Array(new ArrayBuffer(binaryLength));

  for (let i = 0; i < binaryLength; i++) {
    binaryArray[i] = binaryData.charCodeAt(i);
  }
  return binaryArray;
}

export function decodeVoiceData(audioContent: string) {
  const binaryArray = convertDataURIToBinary(audioContent);
  const blob = new Blob([binaryArray], { type: 'audio/wav' });
  const textToSpeechVoiceFile = new File([blob], 'voiceover.wav');
  const voiceDataUrl = URL.createObjectURL(blob); // returns type string

  return { voiceDataUrl, textToSpeechVoiceFile };
}

export function throwError(message: string): never {
  throw new Error(message);
}

export function getGcsBucketUri(id: string, bucket: string = 'adstudio-inbox') {
  return `https://storage.cloud.google.com/${bucket}/${id}`;
}
