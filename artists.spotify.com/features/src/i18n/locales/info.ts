import infoJson from './info.json';

type Info = {
  [lang: string]: {
    smartling: string;
    contentful: string;
    displayName: string;
    displayNameEn: string;
    acceptLanguage: string;
    rtl?: boolean;
    rollout?: boolean;
  };
};

export const info: Info = infoJson;
