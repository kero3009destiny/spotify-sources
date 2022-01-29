import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { useMemo } from 'react';
import { trackTaskStatus } from '../../lib/util/trackTaskStatus';
import { submitAccessFlowDetailsTask } from './tasks/submitAccessFlowDetailsTask';
import { selectLabelAccessFlowMediaTask } from './tasks/selectLabelAccessFlowMediaTask';
import { verifyCodeLabelAccessFlowEmailTask } from './tasks/verifyCodeLabelAccessFlowEmailTask';
import { sendAccessFlowEmailTask } from './tasks/sendAccessFlowEmailTask';
import { selectArtistAccessFlowArtistTask } from './tasks/selectArtistAccessFlowArtistTask';
import { canCreateAccessRequestTask } from './tasks/canCreateAccessRequestTask';
import { createAccessCaseTask } from './tasks/createAccessCaseTask';
import { getRequestDetailsFromIdTask } from './tasks/getRequestDetailsFromIdTask';
import { submitArtistClaimTask } from './tasks/submitArtistClaimTask';
export var useOnboardingTaskDispatchers = function useOnboardingTaskDispatchers(actionDispatchers, taskDispatchers) {
  return useMemo(function () {
    return {
      selectArtistAccessFlowArtist: function selectArtistAccessFlowArtist(artistId, locale, errorMessages) {
        return trackTaskStatus(selectArtistAccessFlowArtistTask(artistId, locale, errorMessages, _objectSpread(_objectSpread({}, actionDispatchers), taskDispatchers)), actionDispatchers.updateTaskStatus, 'artist-access-flow-select-artist');
      },
      getRequestDetailsFromId: function getRequestDetailsFromId(requestId) {
        return trackTaskStatus(getRequestDetailsFromIdTask(requestId, _objectSpread(_objectSpread({}, actionDispatchers), taskDispatchers)), actionDispatchers.updateTaskStatus, 'artist-access-flow-get-request-details');
      },
      selectLabelAccessFlowMedia: function selectLabelAccessFlowMedia(key, mediaUriOrLink) {
        return trackTaskStatus(selectLabelAccessFlowMediaTask(key, mediaUriOrLink, _objectSpread(_objectSpread({}, actionDispatchers), taskDispatchers)), actionDispatchers.updateTaskStatus, 'label-onboarding-flow-select-media');
      },
      submitArtistClaim: function submitArtistClaim(details, errorMessage, isApp) {
        return trackTaskStatus(submitArtistClaimTask({
          details: details,
          errorMessage: errorMessage,
          isApp: isApp
        }, _objectSpread(_objectSpread({}, actionDispatchers), taskDispatchers)), actionDispatchers.updateTaskStatus, 'artist-claim-submit');
      },
      submitAccessFlowDetails: function submitAccessFlowDetails(details, isCreatingNewTeam, t) {
        var isArtist = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var isApp = arguments.length > 4 ? arguments[4] : undefined;
        return trackTaskStatus(submitAccessFlowDetailsTask({
          details: details,
          isCreatingNewTeam: isCreatingNewTeam,
          t: t,
          isArtist: isArtist,
          isApp: isApp
        }, _objectSpread(_objectSpread({}, actionDispatchers), taskDispatchers)), actionDispatchers.updateTaskStatus, 'label-onboarding-flow-submit-form');
      },
      sendAccessFlowEmail: function sendAccessFlowEmail(businessEmail, isArtist, locale) {
        return trackTaskStatus(sendAccessFlowEmailTask(businessEmail, isArtist, locale, _objectSpread(_objectSpread({}, actionDispatchers), taskDispatchers)), actionDispatchers.updateTaskStatus, 'label-onboarding-flow-send-email');
      },
      canCreateAccessRequest: function canCreateAccessRequest(organizationUri, isArtist, errorMessages) {
        return trackTaskStatus(canCreateAccessRequestTask(organizationUri, isArtist, errorMessages, _objectSpread(_objectSpread({}, actionDispatchers), taskDispatchers)), actionDispatchers.updateTaskStatus, 'can-create-access-request');
      },
      createAccessCase: function createAccessCase(details) {
        return trackTaskStatus(createAccessCaseTask(details, _objectSpread(_objectSpread({}, actionDispatchers), taskDispatchers)), actionDispatchers.updateTaskStatus, 'create-access-case');
      },
      verifyCodeAccessFlowEmail: function verifyCodeAccessFlowEmail(businessEmail, token, nextStep) {
        var isArtist = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        return trackTaskStatus(verifyCodeLabelAccessFlowEmailTask(businessEmail, token, nextStep, isArtist, _objectSpread(_objectSpread({}, actionDispatchers), taskDispatchers)), actionDispatchers.updateTaskStatus, 'label-onboarding-flow-verify-code');
      }
    };
  }, [actionDispatchers, taskDispatchers]);
};