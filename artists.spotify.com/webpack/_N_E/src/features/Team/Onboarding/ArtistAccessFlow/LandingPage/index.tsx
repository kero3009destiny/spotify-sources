import React from 'react';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { useT } from '@mrkt/features/i18n';
import { ButtonPrimary, spacer12, spacer24, spacer32, Type } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { ArtistFlowContainer, FaqLinkContainer, Link } from '../../components/sharedStyles';
import { ArtistAccessFlowStep } from '../../store';
import { useFaqLink } from '../../utils';
import { useParams } from 'react-router';
import { LoadingIndicator } from '../../../../../shared/components/LoadingIndicator';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var HeadingContainer = styled(Type.h1).attrs({
  variant: 'heading1',
  condensed: true
}).withConfig({
  displayName: "LandingPage__HeadingContainer",
  componentId: "sc-11j7iku-0"
})(["margin-bottom:", ";text-align:center;"], spacer24);
var TextContainer = styled.div.withConfig({
  displayName: "LandingPage__TextContainer",
  componentId: "sc-11j7iku-1"
})(["padding-bottom:", ";margin-left:10%;margin-right:10%;"], spacer32);
var ButtonContainer = styled.div.withConfig({
  displayName: "LandingPage__ButtonContainer",
  componentId: "sc-11j7iku-2"
})(["margin-bottom:", ";"], spacer12);
export var LandingPage = function LandingPage() {
  var _useTeamStore = useTeamStore(),
      details = _useTeamStore.onboarding.artistAccessFlow.details,
      goToArtistAccessFlowStep = _useTeamStore.goToArtistAccessFlowStep,
      platform = _useTeamStore.platform,
      trackEvent = _useTeamStore.trackEvent;

  var faqMusicLink = useFaqLink('getting-music-on-spotify', platform === null || platform === void 0 ? void 0 : platform.isApp);
  var faqLabelLink = useFaqLink('getting-access-to-spotify-for-artists', platform === null || platform === void 0 ? void 0 : platform.isApp);
  var t = useT();

  var _useParams = useParams(),
      artistId = _useParams.artistId;

  if (!platform || artistId && details.selectedArtist) {
    // checking (artistId && details.selectedArtist)
    // if there is an artistId route parameter and a valid selected artist,
    // show a loading indicator while the Speedbump page is being rendered
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  return /*#__PURE__*/_jsxs(ArtistFlowContainer, {
    "data-testid": "landing-page",
    children: [/*#__PURE__*/_jsx(HeadingContainer, {
      children: t('ARTIST_ACCESS_LANDING_PAGE_TITLE', 'Claim an artist profile', 'Claim an artist profile')
    }), /*#__PURE__*/_jsx(TextContainer, {
      children: /*#__PURE__*/_jsx(Type, {
        as: Type.p,
        variant: Type.body1,
        children: t('ARTIST_ACCESS_LANDING_PAGE_SUBTITLE', 'If you already have music on Spotify, you can get access to stats, pitch tracks to our editors, and more.', 'If you already have music on Spotify, you can use this flow to request access to the team so you can see your stats, pitch tracks to editors, and more.')
      })
    }), /*#__PURE__*/_jsx(ButtonContainer, {
      children: /*#__PURE__*/_jsx(ButtonPrimary, {
        "data-testid": "artist-access-continue",
        buttonSize: "md",
        onClick: function onClick() {
          goToArtistAccessFlowStep(ArtistAccessFlowStep.VERIFY_ACCOUNT);
          trackEvent({
            action_target: 'artist-access:landing-page-continue-cta',
            action_type: 'artist-access:click',
            action_intent: 'artist-access:landing-page-continue',
            action_meta_str_1: 'started-artist-access-flow'
          });
        },
        children: t('ARTIST_ACCESS_CONTINUE', 'Continue', 'Continue')
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
    })]
  });
};