import React from 'react';
import { useT } from '@mrkt/features/i18n';
import { ArtistSearchFormCombobox } from '../../components/ArtistSearchFormCombobox';
import { Type, FormHelpText, TextLink, spacer20, spacer32 } from '@spotify-internal/encore-web';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { useFaqLink } from '../../Onboarding/utils';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var FaqMusicLink = styled.div.withConfig({
  displayName: "ArtistSearchPage__FaqMusicLink",
  componentId: "fk0hni-0"
})(["padding-top:", ";"], spacer32);
var FaqLabelLink = styled.div.withConfig({
  displayName: "ArtistSearchPage__FaqLabelLink",
  componentId: "fk0hni-1"
})(["padding-top:", ";"], spacer20);
export var ArtistSearchPage = function ArtistSearchPage() {
  var _useTeamStore = useTeamStore(),
      selectAddTeamsArtist = _useTeamStore.selectAddTeamsArtist,
      canRequestAccessError = _useTeamStore.addTeams.canRequestAccessError,
      platform = _useTeamStore.platform;

  var t = useT();
  var faqMusicLink = useFaqLink('getting-music-on-spotify', platform === null || platform === void 0 ? void 0 : platform.isApp);
  var faqLabelLink = useFaqLink('getting-access-to-spotify-for-artists', platform === null || platform === void 0 ? void 0 : platform.isApp);
  var errorMessages = {
    'already-team-member': t('4fd4c1', "You're already a member of this team.", ''),
    'request-already-pending': t('d2c2c7', 'You have a pending request to join this team.', ''),
    'org-invite-only': t('ab6f7c', 'This team is not accepting requests right now.', ''),
    'unknown-error': t('b1e8b3', 'Something went wrong', '')
  };
  return /*#__PURE__*/_jsxs("div", {
    "data-slo-id": "artist-search-page",
    "data-testid": "artist-search-page",
    children: [/*#__PURE__*/_jsx(Type, {
      as: "h1",
      variant: Type.heading2,
      children: t('ADD_TEAM_ARTIST_SEARCH_PAGE_TITLE', 'Which artist team is it?', 'Which artist team do you want to access?')
    }), /*#__PURE__*/_jsx(Type, {
      as: "p",
      variant: Type.body2,
      children: t('ADD_TEAM_ARTIST_SEARCH_PAGE_BODY', 'As long as their music is on Spotify, you can request access or set up their team.', 'If an artist has music on Spotify, you can request access or set up their team.')
    }), /*#__PURE__*/_jsx(ArtistSearchFormCombobox, {
      addTeamsSelectAction: selectAddTeamsArtist
    }), /*#__PURE__*/_jsx(FormHelpText, {
      "data-testid": "artist-search-error",
      error: !!canRequestAccessError,
      children: canRequestAccessError && errorMessages[canRequestAccessError]
    }), /*#__PURE__*/_jsx(FaqMusicLink, {
      children: /*#__PURE__*/_jsx(TextLink, {
        href: faqMusicLink,
        "data-testid": "link-music",
        target: "_blank",
        rel: "noopener noreferrer",
        children: t('d0398f', 'Music not yet live on Spotify?', '')
      })
    }), /*#__PURE__*/_jsx(FaqLabelLink, {
      children: /*#__PURE__*/_jsx(TextLink, {
        href: faqLabelLink,
        "data-testid": "link-label",
        target: "_blank",
        rel: "noopener noreferrer",
        children: t('71ea41', 'Are you part of a label team?', '')
      })
    })]
  });
};