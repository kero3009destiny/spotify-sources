import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { useMemo } from 'react';
import { trackTaskStatus } from '../../lib/util/trackTaskStatus';
import { selectAddTeamsArtistTask } from './tasks/selectAddTeamsArtistTask';
import { selectAddTeamsLabelTask } from './tasks/selectAddTeamsLabelTask';
import { selectAddTeamsMediaTask } from './tasks/selectAddTeamsMediaTask';
import { submitAddTeamsRequestTask } from './tasks/submitAddTeamsRequestTask';
export var useAddTeamsTaskDispatchers = function useAddTeamsTaskDispatchers(actionDispatchers, taskDispatchers) {
  return useMemo(function () {
    return {
      selectAddTeamsArtist: function selectAddTeamsArtist(id, history, queryParams) {
        return trackTaskStatus(selectAddTeamsArtistTask(id, history, queryParams, _objectSpread(_objectSpread({}, actionDispatchers), taskDispatchers)), actionDispatchers.updateTaskStatus, 'add-teams-select-artist');
      },
      selectAddTeamsLabel: function selectAddTeamsLabel(selectedLabel, history, queryParams) {
        return trackTaskStatus(selectAddTeamsLabelTask(selectedLabel, history, queryParams, _objectSpread(_objectSpread({}, actionDispatchers), taskDispatchers)), actionDispatchers.updateTaskStatus, 'add-teams-select-label');
      },
      selectAddTeamsMedia: function selectAddTeamsMedia(key, mediaUriOrLink) {
        return trackTaskStatus(selectAddTeamsMediaTask(key, mediaUriOrLink, _objectSpread(_objectSpread({}, actionDispatchers), taskDispatchers)), actionDispatchers.updateTaskStatus, 'add-teams-flow-select-media');
      },
      submitAddTeamsRequest: function submitAddTeamsRequest(details, currentUserDetails, teamType, history, continueUrl) {
        return trackTaskStatus(submitAddTeamsRequestTask({
          details: details,
          currentUserDetails: currentUserDetails,
          teamType: teamType,
          history: history,
          continueUrl: continueUrl
        }, _objectSpread(_objectSpread({}, actionDispatchers), taskDispatchers)), actionDispatchers.updateTaskStatus, 'add-teams-submit-request');
      }
    };
  }, [actionDispatchers, taskDispatchers]);
};