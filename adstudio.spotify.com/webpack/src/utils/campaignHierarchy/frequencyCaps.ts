import i18n from 'i18next';
import { isEqual } from 'lodash';

import { plural } from 'utils/i18nHelpers';

import {
  FREQUENCY_CAP_DEFAULT_VALUE,
  FREQUENCY_CAPS_DEFAULT_VALUES,
} from 'config/frequencyCaps';

import {
  FrequencyCap,
  FrequencyCapAPIResponseTimeUnitMapper,
  FrequencyCapUnit,
} from 'types/common/campaignHierarchy/types';

/**
 * Utility to check truth of whether a set of frequency caps is the default frequency cap set
 * @param {FrequencyCap[]} frequencyCaps The frequency cap set to check against
 * @returns {boolean} Truth of whether this frequency cap set matches the default frequency cap set
 */
export const isDefaultFrequencyCapSet = (
  frequencyCaps: (FrequencyCap | undefined)[],
): boolean => isEqual(frequencyCaps, FREQUENCY_CAP_DEFAULT_VALUE);

/**
 * Utility to check truth of whether a frequency cap is the default frequency cap for the time unit
 * @param {FrequencyCap} frequencyCap The frequency cap to check against
 * @param {FrequencyCapUnit} [timeUnit=frequencyCap.timeUnit] The time unit to check against.
 * Although this is inferred if missing from the frequencyCap.timeUnit, we may have cases where
 * as well as checking for default status, we need to implicitly check that the frequency cap is
 * for the time unit we're interested in.
 * @returns {boolean} Truth of whether this frequency cap matches the default frequency cap for
 * the time unit.
 */
export const isDefaultFrequencyCapByTimeUnit = (
  frequencyCap: FrequencyCap,
  timeUnit?: TSFixMe,
): boolean =>
  isEqual(
    frequencyCap,
    FREQUENCY_CAPS_DEFAULT_VALUES[timeUnit || frequencyCap.timeUnit],
  );

/**
 * Utility to check truth of whether a set of frequency caps is the new default frequency cap
 * set of three defaults, one each for days, weeks and months or a legacy frequency cap set of
 * one, just by days.
 * @param {FrequencyCap[]} frequencyCaps The frequency cap set to check against
 * @returns {boolean} Truth of whether this frequency cap set is a current or legacy default
 */
export const isDefaultOrLegacyFrequencyCapSet = (
  frequencyCaps: FrequencyCap[],
): boolean =>
  frequencyCaps.length === 1
    ? isDefaultFrequencyCapByTimeUnit(frequencyCaps[0], FrequencyCapUnit.days)
    : isDefaultFrequencyCapSet(frequencyCaps);

/**
 * Utility to extend a frequencyCap to show if it is custom.
 * @param {FrequencyCap} frequencyCap Initial frequency cap object
 * @returns {FrequencyCap} The original object with the optional isCustom field set to the
 * appropriate value.
 */
export const extendFrequencyCap = ({
  maxImpressions,
  timeUnit,
  time,
}: TSFixMe): FrequencyCap => {
  const frequencyCap = {
    maxImpressions,
    time,
    timeUnit:
      typeof timeUnit === 'string'
        ? // @ts-ignore
          FrequencyCapAPIResponseTimeUnitMapper[timeUnit]
        : timeUnit,
  };
  return {
    ...frequencyCap,
    isCustom: !isDefaultFrequencyCapByTimeUnit(frequencyCap),
  };
};

interface FrequencyValue {
  time?: number;
  maxImpressions: number;
  unitName?: string;
  count: number;
}

/**
 * Utility to format a frequency values for the frequencyCapFormatter
 * @param frequencyCap frequency cap
 * @returns {object} the new values
 */
export const frequencyValues = (
  frequencyObject: FrequencyCap,
): FrequencyValue => {
  const { maxImpressions, time, timeUnit } = frequencyObject;
  const daysOption = i18n.t('I18N_FREQUENCY_CAPS_OPTION_LABEL_DAY', 'day', {
    count: time,
  });
  const weeksOption = i18n.t('I18N_FREQUENCY_CAPS_OPTION_LABEL_WEEK', 'week', {
    count: time,
  });
  const monthsOption = i18n.t(
    'I18N_FREQUENCY_CAPS_OPTION_LABEL_MONTH',
    'month',
    {
      count: time,
    },
  );

  const finalTime = time > 1 ? time : undefined;

  let unitName;
  switch (timeUnit) {
    case 1:
      unitName = daysOption;
      break;
    case 2:
      unitName = weeksOption;
      break;
    case 3:
      unitName = monthsOption;
      break;
  }
  return {
    time: finalTime,
    maxImpressions,
    unitName,
    count: maxImpressions,
  };
};

/**
 * Utility to format a frequency cap for nice display name
 * @param frequencyCap frequency cap
 * @returns {string} formatted string
 */
export const frequencyCapFormatter = (
  frequencyCap: FrequencyCap,
): string | undefined =>
  frequencyCap
    ? i18n.t(
        `I18N_REVIEW_FREQUENCY_CAPPING_SELECTION${plural(
          frequencyValues(frequencyCap).maxImpressions,
        )}`,
        `{{maxImpressions}} impressions per {{time}} {{unitName}}`,
        { ...frequencyValues(frequencyCap) },
      )
    : undefined;

/**
 * Utility to extend a frequencyCapSet to show if any of its members are custom.
 * @param {FrequencyCap[]} frequencyCapSet Initial frequency cap set array
 * @returns {FrequencyCap[]} The original array with the optional isCustom field set to the
 * appropriate value for each member.
 */
export const extendFrequencyCapSet = (
  frequencyCapSet: FrequencyCap[],
): FrequencyCap[] =>
  frequencyCapSet.map(frequencyCap => extendFrequencyCap(frequencyCap));

/**
 * Utility to determine if a frequency cap set contains any custom members
 * @param {FrequencyCap[]} frequencyCapSet The set to test
 * @returns {boolean} The truth of the test.
 */
export const isExtendedFrequencyCapSet = (
  frequencyCapSet: FrequencyCap[],
): boolean =>
  frequencyCapSet.reduce(
    (acc: boolean, { isCustom = false }) => acc || isCustom,
    false,
  );

/**
 * Returns a composite object of an extended frequency cap set with a withFrequencyCap flag.
 * @param {FrequencyCap[]} frequencyCapSet Initial frequency cap set array
 * @returns {object} Composite object
 */
export const extendAndFlagFrequencyCapSet = (
  frequencyCapSet: FrequencyCap[] | undefined | null,
): { frequencyCap: FrequencyCap[]; withFrequencyCap: boolean } | undefined => {
  if (!frequencyCapSet) {
    return undefined;
  }

  const frequencyCap = extendFrequencyCapSet(frequencyCapSet);
  const withFrequencyCap = isExtendedFrequencyCapSet(frequencyCap);
  return {
    frequencyCap,
    withFrequencyCap,
  };
};
