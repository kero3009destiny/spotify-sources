import get from 'lodash/get';

import { mapI18Ns } from 'utils/i18nHelpers';

import { AD_TARGETING_STRINGS } from 'config/adCreation';

/**
 * I started declaring types doing so exposed that 190+ usages of this function we're
 * possibly passing in undefined. These need to be resolved before this function is
 * fully type declared. My progress is commented out below.
 */
// type MapIdsToNamesTargeted = string[] | Record<string, boolean>
type MapIdsToNamesTargeted = any;
type MapIdsToNamesStored = Record<'id' | string, any>;
type MapIdsToNamesResponse = any[];
type MapIdsToName = (
  targeted: MapIdsToNamesTargeted,
  stored: MapIdsToNamesStored,
) => MapIdsToNamesResponse;

/*
 * @param {Object|Array} targeted i.e. {<id>:<true|false>, ... , <id>:<true|false>} OR [<id>,
 *  ... , <id>]
 * @param {Array.<Object>} stored i.e. [{<id>: <name>}, ... , {<id>: <name>}]
 * @return Array [<name>, <name>] where `name` is the corresponding name for each targeted item
 *  with a truthy `id`
 */
export const mapIdsToNames: MapIdsToName = (targeted, stored) => {
  let items = [];

  if (targeted.length === 0 || stored.length === 0) return targeted;

  if (Array.isArray(targeted)) {
    items = targeted;
  } else {
    items = Object.keys(targeted).filter(id => !!targeted[id]);
  }

  return items.map(item =>
    get(
      AD_TARGETING_STRINGS,
      `generalTargeting.RELEASED_SEGMENTS[${stored[item]}]`,
      stored[item],
    ),
  );
};

/**
 * Amends the CTA items to add I18N labels if available.
 * @param {Object[]} items The CTAs from the backend
 * @returns {Object[]} The amended CTAs.
 */
export const mapI18NToCTAs = (items: { id: string; key: string }[]) =>
  mapI18Ns(items, 'I18N_CTA');

/**
 * Amends the voiceover option items to add I18N labels if available.
 * @param {Object} options The voiceover options from the backend
 * @returns {Object} The amended voiceover options.
 */
export const mapI18NToVOOptions = ({
  languageLocales = [],
  voiceTypes = [],
}) => {
  return {
    languageLocales: mapI18Ns(languageLocales, 'I18N_VO_LOCALE'),
    voiceTypes: mapI18Ns(voiceTypes, 'I18N_VO_VOICETYPE'),
  };
};
