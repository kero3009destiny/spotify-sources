import i18n from 'i18next';

import { formatCheckboxResults } from '../utils/formatCheckboxResults';

import { PlatformTargeting } from '../types/common/campaignHierarchy/types';

export interface Platform {
  key: keyof typeof PlatformKey;
  value: string;
}

export enum PlatformKey {
  ios = 'ios',
  android = 'android',
  desktop = 'desktop',
}

const I18N_IOS = i18n.t('I18N_IOS_IPHONE_IPAD', 'iOS (iPhone/iPad)');
const I18N_ANDROID = i18n.t('I18N_ANDROID', 'Android');
const I18N_DESKTOP = i18n.t('I18N_DESKTOP', 'Desktop');
const I18N_DESKTOP_AND_SMARTSPEAKERS = i18n.t(
  'I18N_DESKTOP_AND_SMARTSPEAKERS',
  'Desktop and smart speakers',
);

export const PLATFORMS: Record<keyof typeof PlatformKey, string> = {
  [PlatformKey.ios]: I18N_IOS,
  [PlatformKey.android]: I18N_ANDROID,
  [PlatformKey.desktop]: I18N_DESKTOP,
} as const;

export const DEFAULT_PLATFORMS: Record<PlatformKey, boolean> = {
  [PlatformKey.ios]: true,
  [PlatformKey.android]: true,
  [PlatformKey.desktop]: true,
};

export const PLATFORMS_AS_LIST = Object.entries(
  PLATFORMS,
).map(([key, value]) => ({ key, value })) as Platform[];

export const CUSTOM_TARGETABLE_PLATFORMS: Record<PlatformKey, boolean> = {
  ...DEFAULT_PLATFORMS,
  [PlatformKey.desktop]: false,
};

interface PlatformTarget {
  [key: string]: string;
  value: string;
}

export const CUSTOM_TARGETABLE_PLATFORM_OPTIONS = Object.keys(
  CUSTOM_TARGETABLE_PLATFORMS,
).reduce((acc, key) => {
  const typedKey = key as PlatformKey;
  if (CUSTOM_TARGETABLE_PLATFORMS[typedKey])
    acc.push({ key, value: PLATFORMS[typedKey] });
  return acc;
}, [] as PlatformTarget[]);

export function formatPlatformsForDisplay(
  platforms: PlatformTargeting,
  isPodcast: boolean = false,
) {
  if (platforms.android && platforms.ios && platforms.desktop)
    return i18n.t('I18N_PLATFORMS_ALL', 'All');
  let formattedPlatformsString = formatCheckboxResults(PLATFORMS, platforms);
  if (isPodcast) {
    formattedPlatformsString = formattedPlatformsString.replace(
      I18N_DESKTOP,
      I18N_DESKTOP_AND_SMARTSPEAKERS,
    );
  }
  return formattedPlatformsString;
}
