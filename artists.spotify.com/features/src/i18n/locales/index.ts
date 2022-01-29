import { info } from './info';

export function getDisplayName(locale: string) {
  return info[locale]?.displayName ?? locale;
}

export function getDisplayNameEn(locale: string) {
  return info[locale]?.displayNameEn ?? locale;
}

export function getDisplayNameCombined(locale: string) {
  const displayName = getDisplayName(locale);
  const displayNameEn = getDisplayNameEn(locale);

  return displayName === displayNameEn
    ? displayName
    : `${displayName} (${displayNameEn})`;
}

export function getContentfulLocale(locale: string) {
  return info[locale]?.contentful;
}
