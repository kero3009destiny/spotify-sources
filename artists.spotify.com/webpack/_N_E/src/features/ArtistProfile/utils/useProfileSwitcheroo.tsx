// ignore-string-externalization
import React, { useState } from 'react';
import { inferSelectedTeam } from '@mrkt/features/teamswitcher';
import { useTeams } from '@mrkt/features/teamswitcher/lib/useTeams';
import URI from 'spotify-liburi';
import { ProfileSwitcheroo } from '../ProfileSwitcheroo';
import { useCurrentArtist } from '../../../features/artists';
import { useTeamSwitcherRollout } from './useTeamSwitcherRollout';
import { jsx as _jsx } from "react/jsx-runtime";
export var useProfileSwitcheroo = function useProfileSwitcheroo(onSelectTeam) {
  var _onClose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  var _useState = useState(false),
      showTeamSwitcher = _useState[0],
      setShowTeamSwitcher = _useState[1];

  var _useState2 = useState(),
      organizationUri = _useState2[0],
      setOrganizationUri = _useState2[1];

  var artist = useCurrentArtist();
  var inRollout = useTeamSwitcherRollout();
  var artistUri = artistIdToUri(artist.id);
  var teams = useTeams(artistUri, 'artistidentity.edit.v1');
  var inferredTeam = inferSelectedTeam(teams);

  var showProfileSwitcheroo = function showProfileSwitcheroo() {
    if (inRollout && !inferredTeam) {
      setShowTeamSwitcher(true);
    } else {
      var _inferredTeam$uri;

      var orgUri = (_inferredTeam$uri = inferredTeam === null || inferredTeam === void 0 ? void 0 : inferredTeam.uri) !== null && _inferredTeam$uri !== void 0 ? _inferredTeam$uri : artistUri;
      setOrganizationUri(orgUri);
      onSelectTeam();
    }
  };

  var setTeam = function setTeam(team) {
    setOrganizationUri(team.uri);
    onSelectTeam();
    setShowTeamSwitcher(false);
  };

  var renderedProfileSwitcheroo = showTeamSwitcher ? /*#__PURE__*/_jsx(ProfileSwitcheroo, {
    onClose: function onClose() {
      setShowTeamSwitcher(false);

      _onClose();
    },
    onSubmit: setTeam
  }) : null;
  return {
    showProfileSwitcheroo: showProfileSwitcheroo,
    organizationUri: organizationUri,
    renderedProfileSwitcheroo: renderedProfileSwitcheroo
  };
};

function artistIdToUri(id) {
  return URI.artistURI(URI.idToHex(id)).toURI();
}