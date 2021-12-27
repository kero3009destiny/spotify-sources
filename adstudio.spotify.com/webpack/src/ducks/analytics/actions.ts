import * as types from './types';

export function logUserAction({
  category,
  label,
  params,
}: GoogleAnalyticsEvent) {
  return {
    type: types.LOG_USER_ACTION,
    payload: {
      category,
      label,
      params,
    },
  };
}

export function logTaggableAction(eventId: string, params: TSFixMe) {
  return {
    type: types.LOG_TAGGABLE_ACTION,
    payload: {
      eventId,
      params,
    },
  };
}

export function logFBAction(eventName: string, data: TSFixMe, custom: TSFixMe) {
  return {
    type: types.LOG_FB_ACTION,
    payload: {
      eventName,
      data,
      custom,
    },
  };
}

export function setGAPartnerId(gaPartnerId: string) {
  return {
    type: types.GA_PARTNER_ID_RECEIVED,
    payload: {
      partnerId: gaPartnerId,
    },
  };
}

export function setQualarooPartnerId(qualarooPartnerId: string) {
  return {
    type: types.QUALAROO_PARTNER_ID_RECEIVED,
    payload: {
      partnerId: qualarooPartnerId,
    },
  };
}

export function setQualtricsPartnerId(qualtricsPartnerId: string) {
  return {
    type: types.QUALTRICS_PARTNER_ID_RECEIVED,
    payload: {
      partnerId: qualtricsPartnerId,
    },
  };
}

export function fetchGAPartnerIdFailed(err: Error) {
  return {
    type: types.GA_PARTNER_ID_FETCH_FAILED,
    error: true,
    payload: err,
  };
}

export function fetchQualarooPartnerId() {
  return {
    type: types.FETCH_QUALAROO_PARTNER_ID,
  };
}

export function fetchQualarooPartnerIdFailed(err: Error) {
  return {
    type: types.QUALAROO_PARTNER_ID_FETCH_FAILED,
    error: true,
    payload: err,
  };
}

export function fetchQualtricsPartnerId() {
  return {
    type: types.FETCH_QUALTRICS_PARTNER_ID,
  };
}

export function fetchQualtricsPartnerIdFailed(err: Error) {
  return {
    type: types.QUALTRICS_PARTNER_ID_FETCH_FAILED,
    error: true,
    payload: err,
  };
}

export function trackConversionAction(eventType: TSFixMe) {
  return {
    type: types.TRACK_CONVERSION_ACTION,
    payload: eventType,
  };
}

export function sendSemanticMetric(eventObj: TSFixMe) {
  return {
    type: types.SEND_SEMANTIC_METRIC,
    payload: eventObj,
  };
}
