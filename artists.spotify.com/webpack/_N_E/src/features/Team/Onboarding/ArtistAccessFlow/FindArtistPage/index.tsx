import React from 'react';
import { ButtonSecondary, Type } from '@spotify-internal/encore-web';
import { ArtistAccessFlowStep } from '../../store';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { useFaqLink } from '../../utils';
import { ActionContainer, ArtistFlowContainer, FaqLinkContainer, HeaderContainer, Link, SearchContainer, Subheading } from '../../components/sharedStyles';
import { useT } from '@mrkt/features/i18n';
import { ArtistSearchFormCombobox } from '../../../components/ArtistSearchFormCombobox';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var FindArtistPage = function FindArtistPage() {
  var t = useT();

  var _useTeamStore = useTeamStore(),
      layoutType = _useTeamStore.layoutType,
      goToArtistAccessFlowStep = _useTeamStore.goToArtistAccessFlowStep,
      selectArtistAccessFlowArtist = _useTeamStore.selectArtistAccessFlowArtist,
      platform = _useTeamStore.platform;

  var faqMusicLink = useFaqLink('getting-music-on-spotify', platform === null || platform === void 0 ? void 0 : platform.isApp);
  var faqLabelLink = useFaqLink('getting-access-to-spotify-for-artists', platform === null || platform === void 0 ? void 0 : platform.isApp);
  return /*#__PURE__*/_jsxs(ArtistFlowContainer, {
    "data-testid": "find-artist-page",
    children: [/*#__PURE__*/_jsx(HeaderContainer, {
      children: /*#__PURE__*/_jsx(Type, {
        as: "h1",
        variant: "heading1",
        condensed: true,
        children: t('ARTIST_ACCESS_FIND_ARTIST_TITLE', 'What profile are you claiming?', 'Which artist team would you like to access?')
      })
    }), /*#__PURE__*/_jsx(Subheading, {
      children: t('ARTIST_ACCESS_FIND_ARTIST_SUBTITLE', 'Only claim 1 profile at a time and wait until you get access before claiming another.', 'Only claim 1 profile at a time. Wait until you get access before submitting another request')
    }), /*#__PURE__*/_jsx(SearchContainer, {
      children: /*#__PURE__*/_jsx(ArtistSearchFormCombobox, {
        accessSelectAction: selectArtistAccessFlowArtist
      })
    }), /*#__PURE__*/_jsxs(FaqLinkContainer, {
      children: [/*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(Link, {
          href: faqMusicLink,
          "data-testid": "link-music",
          target: "_blank",
          rel: "noopener noreferrer",
          children: t('ARTIST_ACCESS_FAQ_NOT_LIVE', 'Music not yet live on Spotify?', 'Is your music not yet live on Spotify? Link to FAQ article.')
        })
      }), /*#__PURE__*/_jsx("div", {
        children: /*#__PURE__*/_jsx(Link, {
          href: faqLabelLink,
          "data-testid": "link-label",
          target: "_blank",
          rel: "noopener noreferrer",
          children: t('ARTIST_ACCESS_FAQ_LABEL_TEAM', 'Are you part of a label team?', 'Are you part of a label team? Link to FAQ article.')
        })
      })]
    }), /*#__PURE__*/_jsx(ActionContainer, {
      children: /*#__PURE__*/_jsx(ButtonSecondary, {
        buttonSize: layoutType === 'compact' ? 'sm' : 'md',
        onClick: function onClick() {
          return goToArtistAccessFlowStep(ArtistAccessFlowStep.VERIFY_ACCOUNT);
        },
        children: t('ARTIST_ACCESS_GO_BACK', 'Go back', 'Go back')
      })
    })]
  });
};