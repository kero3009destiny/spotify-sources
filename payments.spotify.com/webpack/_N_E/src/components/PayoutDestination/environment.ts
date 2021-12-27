export enum Environment {
  LOCAL = 'local',
  SHARED = 'shared',
  PRODUCTION = 'production',
}

export const hyperwalletUrlMapping = {
  [Environment.LOCAL]: 'https://uat-api.paylution.com',
  [Environment.SHARED]: 'https://uat-api.paylution.com',
  [Environment.PRODUCTION]: 'https://api.paylution.com',
};
