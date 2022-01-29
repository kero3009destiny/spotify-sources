import { useTeamStore } from '../../../lib/store/useTeamStore';
import { ArtistAccessFlowStep } from '../../store';
import { FormContainer, FormHeadingContainer } from '../../components/sharedStyles';
import { Type } from '@spotify-internal/encore-web';
import { AccessUserDetailsForm } from '../../components/AccessUserDetailsForm';
import { MaybeValidationTimeoutDialog } from '../../components/MaybeValidationTimeoutDialog';
import React from 'react';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var JoinArtistTeamPage = function JoinArtistTeamPage() {
  var _useTeamStore = useTeamStore(),
      details = _useTeamStore.onboarding.artistAccessFlow.details,
      goToArtistAccessFlowStep = _useTeamStore.goToArtistAccessFlowStep;

  var t = useT();
  var selectedArtist = details.selectedArtist;

  if (!selectedArtist) {
    goToArtistAccessFlowStep(ArtistAccessFlowStep.FIND_ARTIST);
    return null;
  }

  return /*#__PURE__*/_jsxs(FormContainer, {
    "data-testid": "join-artist-team-page",
    children: [/*#__PURE__*/_jsx(FormHeadingContainer, {
      children: /*#__PURE__*/_jsx(Type, {
        "data-testid": "join-artist-team-heading",
        as: "h1",
        variant: "heading1",
        weight: "bold",
        children: t('ARTIST_ACCESS_JOIN_ARTIST_TEAM_TITLE', 'Join {artistName}', 'Join this artist team', {
          artistName: selectedArtist === null || selectedArtist === void 0 ? void 0 : selectedArtist.name
        })
      })
    }), /*#__PURE__*/_jsx(AccessUserDetailsForm, {
      isCreatingNewTeam: false,
      isArtist: true
    }), /*#__PURE__*/_jsx(MaybeValidationTimeoutDialog, {})]
  });
};