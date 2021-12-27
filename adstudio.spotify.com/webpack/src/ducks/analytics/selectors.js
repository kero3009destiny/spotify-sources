export const getAnalytics = state => state.analytics;
export const getGAPartnerId = state =>
  (getAnalytics(state) || {}).googleAnalytics.partnerId;
export const getQualarooPartnerId = state =>
  (getAnalytics(state) || {}).qualaroo.partnerId;
export const getQualtricsPartnerId = state =>
  (getAnalytics(state) || {}).qualtrics.partnerId;
