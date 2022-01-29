import React from 'react';
import { ButtonPrimary, ButtonSecondary, ButtonTertiary, Type } from '@spotify-internal/encore-web';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { LoadingIndicator } from '../../../../../shared/components/LoadingIndicator';
import { getAccountsDomain } from '@mrkt/features/auth';
import { ActionContainer, ArtistFlowContainer, AvatarContainer, HeaderContainer, InfoBox, Subheading, TextContainer } from '../../components/sharedStyles';
import { Avatar, AvatarSize } from '../../components/Avatar';
import { ArtistAccessFlowStep } from '../../store';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var VerifyAccountPage = function VerifyAccountPage() {
  var t = useT();

  var _useTeamStore = useTeamStore(),
      currentUser = _useTeamStore.currentUser,
      goToArtistAccessFlowStep = _useTeamStore.goToArtistAccessFlowStep,
      layoutType = _useTeamStore.layoutType,
      platform = _useTeamStore.platform;

  if (!currentUser || !platform) {
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  var artistAccessUrl = "".concat(window.location.protocol, "//").concat(window.location.host, "/c/team/access/artist");
  var logoutUrl = "".concat(getAccountsDomain(), "/logout?continue=").concat(encodeURIComponent(artistAccessUrl));
  return /*#__PURE__*/_jsxs(ArtistFlowContainer, {
    "data-testid": "verify-account-page",
    children: [/*#__PURE__*/_jsx(HeaderContainer, {
      children: /*#__PURE__*/_jsx(Type, {
        as: "h1",
        variant: "heading1",
        condensed: true,
        children: t('ARTIST_ACCESS_VERIFY_ACCOUNT_TITLE', 'Is this the right Spotify account?', 'Is this the right Spotify account?')
      })
    }), /*#__PURE__*/_jsx(Subheading, {
      children: t('ARTIST_ACCESS_VERIFY_ACCOUNT_SUBTITLE', 'You’ll use this to log in to Spotify for Artists.', 'This is the account you are currently logged in as')
    }), /*#__PURE__*/_jsx(InfoBox, {
      children: /*#__PURE__*/_jsxs(AvatarContainer, {
        children: [/*#__PURE__*/_jsx(Avatar, {
          size: AvatarSize.SMALL,
          imageUrl: currentUser.imageUrl,
          name: currentUser.name
        }), /*#__PURE__*/_jsxs(TextContainer, {
          children: [/*#__PURE__*/_jsx(Type, {
            as: Type.h3,
            condensed: true,
            variant: Type.body1,
            children: currentUser.email
          }), /*#__PURE__*/_jsx(Type, {
            as: Type.h3,
            condensed: true,
            variant: Type.body1,
            children: currentUser.name
          })]
        }), !platform.isApp && /*#__PURE__*/_jsx(ButtonTertiary, {
          as: "a",
          href: logoutUrl,
          children: t('ARTIST_ACCESS_VERIFY_ACCOUNT_CHANGE_ACCOUNT', 'Change account', 'Log out')
        })]
      })
    }), /*#__PURE__*/_jsxs(ActionContainer, {
      children: [/*#__PURE__*/_jsx(ButtonSecondary, {
        buttonSize: layoutType === 'compact' ? 'sm' : 'md',
        onClick: function onClick() {
          return goToArtistAccessFlowStep(ArtistAccessFlowStep.LANDING);
        },
        children: t('ARTIST_ACCESS_GO_BACK', 'Go back', 'Go back')
      }), /*#__PURE__*/_jsx(ButtonPrimary, {
        "data-testid": "verify-account-page-next",
        buttonSize: layoutType === 'compact' ? 'sm' : 'md',
        onClick: function onClick() {
          goToArtistAccessFlowStep(ArtistAccessFlowStep.FIND_ARTIST);
        },
        children: t('ARTIST_ACCESS_NEXT', 'Next', 'Go to the next step')
      })]
    })]
  });
};