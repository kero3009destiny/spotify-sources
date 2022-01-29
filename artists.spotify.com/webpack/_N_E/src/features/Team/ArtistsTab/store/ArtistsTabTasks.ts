import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { useMemo } from 'react';
import { trackTaskStatus } from '../../lib/util/trackTaskStatus';
import { setArtistTeamMembersTask } from '../tasks/setArtistTeamMembersTask';
import { searchArtistTeamsTask } from '../tasks/searchArtistTeamsTask';
export var useArtistsTabTaskDispatchers = function useArtistsTabTaskDispatchers(actionDispatchers, taskDispatchers) {
  return useMemo(function () {
    return {
      searchArtistTeams: function searchArtistTeams(labelUri, query) {
        return trackTaskStatus(searchArtistTeamsTask(labelUri, query, _objectSpread(_objectSpread({}, actionDispatchers), taskDispatchers)), actionDispatchers.updateTaskStatus, 'artists-tab-search-artist-teams');
      },
      setArtistTeamMembers: function setArtistTeamMembers(artistUri, labelUri) {
        return trackTaskStatus(setArtistTeamMembersTask(artistUri, labelUri, _objectSpread(_objectSpread({}, actionDispatchers), taskDispatchers)), actionDispatchers.updateTaskStatus, 'artists-tab-search-artist-teams');
      }
    };
  }, [actionDispatchers, taskDispatchers]);
};