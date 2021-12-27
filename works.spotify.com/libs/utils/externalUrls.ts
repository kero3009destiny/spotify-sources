import { UserEntity } from 'libs/services/s4pTypes';

const prefix = (user: UserEntity) => (user.country === 'GB' ? 'uk' : 'us');

export const termsAndConditionsUrl = (user: UserEntity) =>
  `https://www.spotify.com/${(
    user.country || 'us'
  ).toLocaleLowerCase()}/legal/publishing-analytics-terms/`;

export const privacyPolicyUrl = (user: UserEntity) =>
  `https://www.spotify.com/${prefix(user)}/legal/privacy-policy/`;

export const cookiesUrl = (user: UserEntity) =>
  `https://www.spotify.com/${prefix(user)}/legal/privacy-policy/#s13`;

export const prohibitedContentLink =
  'https://artists.spotify.com/faq/music#what-content-is-prohibited-on-spotify';

export const generalFeedbackLink =
  'https://docs.google.com/forms/d/e/1FAIpQLSesRlCRp_LlfDR7qPoixud7DfKy__mtb_rRnFzvzcLnXeO76w/viewform';

export const addIdentifiersCSVLink =
  'https://docs.google.com/spreadsheets/d/1iPwKA10hVmGaHXPQHVUYeRQRzi4Kk3hfSO66MfRuR0k/edit?usp=sharing';

export function getSongwriterPageLink(creatorUri: string): string {
  const creatorId = creatorUri.replace('spotify:creator:', '');
  return `https://artists.spotify.com/songwriter/${creatorId}`;
}
