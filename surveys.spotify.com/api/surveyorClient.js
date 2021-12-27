import 'rxjs/add/operator/pluck';

import { ajax } from 'rxjs/observable/dom/ajax';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { getLocalAuth } from '../lib/auth';
import qs from 'qs';

const BASE_URL =
  'https://exp.wg.spotify.com/surveyor';

function buildRequestAuth(accessToken) {
  return {
    external: true,
    crossDomain: true,
    headers: { authorization: `Bearer ${accessToken}`,
    },
  };
}

function authenticatedRequest() {
  return fromPromise(getLocalAuth()).pluck('accessToken').map(buildRequestAuth);
}

export function fetchSurveyById(surveyId) {
  // eslint-disable-line no-unused-vars
  return authenticatedRequest()
    .mergeMap(req =>
      ajax({
        ...req,
        method: 'GET',
        url: `${BASE_URL}/v1/surveys/${surveyId}/`,
      })
    )
    .map(ajaxResponse => ajaxResponse.response);
}

export function fetchQuestionDetails(
  surveyId,
  limit = 10,
  excludeTrackUris = []
) {
  const queryString = { limit };

  if (excludeTrackUris && excludeTrackUris.length) {
    queryString.exclude = excludeTrackUris.join(',');
  }

  return authenticatedRequest()
    .mergeMap(req =>
      ajax({
        ...req,
        method: 'GET',
        url: `${BASE_URL}/v1/surveys/${surveyId}/tracks?${qs.stringify(
          queryString
        )}`,
      })
    )
    .map(ajaxResponse => ajaxResponse.response);
}

export function createGiftPlaylist(surveyId) {
  return authenticatedRequest()
    .mergeMap(req =>
      ajax({
        ...req,
        method: 'POST',
        url: `${BASE_URL}/v1/surveys/${surveyId}/create-gift`,
      })
    )
    .map(ajaxResponse => ajaxResponse.response);
}

export function saveTrackRating(surveyId, trackUri, rating) {
  return authenticatedRequest()
    .mergeMap(req =>
      ajax({
        ...req,
        method: 'POST',
        url: `${BASE_URL}/v1/surveys/${surveyId}/${trackUri}/rating`,
        body: JSON.stringify(rating),
      })
    )
    .map(ajaxResponse => ajaxResponse.response);
}

export function saveDescriptorRating(surveyId, trackUri, descriptor, rating) {
  return authenticatedRequest()
    .mergeMap(req =>
      ajax({
        ...req,
        method: 'POST',
        url: `${BASE_URL}/v1/surveys/${surveyId}/${trackUri}/${descriptor}/rating`,
        body: JSON.stringify(rating),
      })
    )
    .map(ajaxResponse => ajaxResponse.response);
}



// WEBPACK FOOTER //
// ./src/api/surveyorClient.js