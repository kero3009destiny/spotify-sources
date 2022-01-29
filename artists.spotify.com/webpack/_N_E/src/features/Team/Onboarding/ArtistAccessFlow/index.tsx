// ignore-string-externalization
import { useHelpButton } from '../../../HelpWidget';
import React, { useEffect } from 'react';
import { OnboardingPage } from '../components/OnboardingPage';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { ArtistAccessFlowStep } from '../store';
import { assertUnreachable } from '../../lib/util/assertUnreachable';
import { VerifyAccountPage } from './VerifyAccountPage';
import { getLastVisitedArtist } from '../../../../shared/lib/lastVisitedArtist';
import { TeamType } from '../../lib';
import { FindArtistPage } from './FindArtistPage';
import { SpeedbumpPage } from './SpeedbumpPage';
import { ConfirmationPage } from './ConfirmationPage';
import { ArtistEnterEmailPage } from './ArtistEnterEmailPage';
import { ArtistEmailConfirmationPage } from './ArtistEmailConfirmationPage';
import { JoinArtistTeamPage } from './JoinArtistTeamPage';
import { ClaimArtistForm } from './ClaimArtistForm';
import { VerifyClaimPage } from './VerifyClaimPage';
import { SocialVerificationPage } from './SocialVerificationPage';
import { LandingPage } from './LandingPage';
import { isLqaTester } from '../store/util/isLqaTester';
import { jsx as _jsx } from "react/jsx-runtime";

var Step = function Step() {
  var _useTeamStore = useTeamStore(),
      step = _useTeamStore.onboarding.artistAccessFlow.step;

  switch (step) {
    case ArtistAccessFlowStep.LANDING:
      return /*#__PURE__*/_jsx(LandingPage, {});

    case ArtistAccessFlowStep.VERIFY_ACCOUNT:
      return /*#__PURE__*/_jsx(VerifyAccountPage, {});

    case ArtistAccessFlowStep.FIND_ARTIST:
      return /*#__PURE__*/_jsx(FindArtistPage, {});

    case ArtistAccessFlowStep.SPEEDBUMP:
      return /*#__PURE__*/_jsx(SpeedbumpPage, {});

    case ArtistAccessFlowStep.ENTER_EMAIL:
      return /*#__PURE__*/_jsx(ArtistEnterEmailPage, {});

    case ArtistAccessFlowStep.CONFIRM_EMAIL:
      return /*#__PURE__*/_jsx(ArtistEmailConfirmationPage, {});

    case ArtistAccessFlowStep.CLAIM_ARTIST:
      return /*#__PURE__*/_jsx(ClaimArtistForm, {});

    case ArtistAccessFlowStep.VERIFY_CLAIM:
      return /*#__PURE__*/_jsx(VerifyClaimPage, {});

    case ArtistAccessFlowStep.SOCIAL_VERIFICATION:
      return /*#__PURE__*/_jsx(SocialVerificationPage, {});

    case ArtistAccessFlowStep.JOIN_ARTIST_TEAM:
      return /*#__PURE__*/_jsx(JoinArtistTeamPage, {});

    case ArtistAccessFlowStep.DETAILS_CONFIRMATION:
      return /*#__PURE__*/_jsx(ConfirmationPage, {});

    default:
      return assertUnreachable(step);
  }
};

export var ArtistAccessFlow = function ArtistAccessFlow() {
  var _useHelpButton = useHelpButton(),
      setVisible = _useHelpButton.setVisible;

  useEffect(function () {
    return setVisible(false);
  }, [setVisible]);

  var _useTeamStore2 = useTeamStore(),
      currentUser = _useTeamStore2.currentUser,
      goToHomePage = _useTeamStore2.goToHomePage,
      isEmployee = _useTeamStore2.isEmployee,
      artists = _useTeamStore2.artists;

  if (currentUser && currentUser.hasAccess && artists && !isLqaTester(currentUser.username)) {
    // the LQA tester account has employee access, but still needs to see the  artist access flow
    var lastVisitedArtist = getLastVisitedArtist(currentUser.username);
    var artist = artists.find(function (item) {
      return item.id === lastVisitedArtist;
    }) || artists[0] || isEmployee && {
      id: '3FP9zWr3P1KWfvmChpnsB6'
    };
    goToHomePage({
      team: {
        type: TeamType.artist,
        id: artist.id,
        uri: artist.uri
      }
    }, '?aaf=info');
  }

  return /*#__PURE__*/_jsx(OnboardingPage, {
    children: /*#__PURE__*/_jsx(Step, {})
  });
};