import i18n from 'i18next';

import { LocalizedCtaEntry } from 'ducks/config/types';

import localizedCtaConfig from 'config/configExtensions/localizedCtaConfig';

export const getLocalesAndKeysForTranslatedCTA = (
  translatedCta: string,
): LocalizedCtaEntry[] => {
  return localizedCtaConfig.filter(
    ({ value }: LocalizedCtaEntry): boolean =>
      value.toLowerCase() === translatedCta.toLowerCase(),
  );
};

export function bulkMapI18nCtaToTargetedLocales(creativePayload: TSFixMe) {
  return creativePayload.map(mapI18nCtaToTargetedLocales);
}

export function mapI18nCtaToTargetedLocales(creative: TSFixMe) {
  if (!creative.ctaText) return creative;
  const locales = getLocalesAndKeysForTranslatedCTA(creative.ctaText);
  let locale = locales[0];
  if (locales.length > 1) {
    const maybeUserLocale = locales.find(loc => loc.id === i18n.language);
    locale = maybeUserLocale || locale;
  }
  return {
    ...creative,
    targetedLocale: locale.id,
    ctaText: locale.key,
  };
}
