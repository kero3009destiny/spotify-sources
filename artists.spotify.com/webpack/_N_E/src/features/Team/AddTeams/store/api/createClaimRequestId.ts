// ignore-string-externalization
import { webgateFetchJson } from '@mrkt/features/webgate-fetch';
import { storeRequestId } from '../../utils/stateStorage';
import { ONBOARDING_API } from '../../../../../shared/lib/api';
export var createClaimRequestId = function createClaimRequestId(artistId, history, continueUrl, setRequestId) {
  var body = JSON.stringify({
    artistUris: ["spotify:artist:".concat(artistId)],
    role: 'other',
    sourceUrl: window.location.href
  });
  webgateFetchJson("".concat(ONBOARDING_API, "/v0/access/add-artist"), {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: body
  }).then(function (data) {
    storeRequestId(data.requestId);
    setRequestId(data.requestId);
  }).catch(function () {
    return history.push("/add-team?continue=".concat(continueUrl));
  });
};