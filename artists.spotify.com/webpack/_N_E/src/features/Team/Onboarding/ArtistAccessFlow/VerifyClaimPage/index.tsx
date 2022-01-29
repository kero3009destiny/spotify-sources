import { useTeamStore } from '../../../lib/store/useTeamStore';
import { useT } from '@mrkt/features/i18n';
import { useLayoutType } from '../../store/selectors/useLayoutType';
import React from 'react';
import { ArtistAccessFlowStep } from '../../store';
import { ButtonPrimary, ButtonSecondary, LoadingIndicator, Type } from '@spotify-internal/encore-web';
import { ActionContainer, ArtistFlowContainer, AvatarContainer, Container, HeaderContainer, Link, ParagraphContainer, TextContainer } from '../../components/sharedStyles';
import { Avatar, AvatarSize } from '../../components/Avatar';
import { useFaqLink } from '../../utils';
import { isLqaTester } from '../../store/util/isLqaTester';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var VerifyClaimPage = function VerifyClaimPage() {
  var _selectedArtist$image;

  var _useTeamStore = useTeamStore(),
      details = _useTeamStore.onboarding.artistAccessFlow.details,
      goToArtistAccessFlowStep = _useTeamStore.goToArtistAccessFlowStep,
      artistAccessRouteReset = _useTeamStore.artistAccessRouteReset,
      createAccessCase = _useTeamStore.createAccessCase,
      currentUser = _useTeamStore.currentUser,
      layoutType = _useTeamStore.layoutType,
      platform = _useTeamStore.platform;

  var t = useT();
  var responsiveStyleProps = useLayoutType(layoutType);
  var selectedArtist = details.selectedArtist;
  var faqLink = useFaqLink('how-do-i-get-access-to-spotify-for-artists', platform === null || platform === void 0 ? void 0 : platform.isApp);

  if (!selectedArtist || !currentUser) {
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  var artistImageUrl = selectedArtist === null || selectedArtist === void 0 ? void 0 : (_selectedArtist$image = selectedArtist.images[0]) === null || _selectedArtist$image === void 0 ? void 0 : _selectedArtist$image.url;
  return /*#__PURE__*/_jsx(ArtistFlowContainer, {
    "data-testid": "verify-claim-page",
    children: /*#__PURE__*/_jsxs(Container, {
      children: [/*#__PURE__*/_jsx(AvatarContainer, {
        children: /*#__PURE__*/_jsx(Avatar, {
          size: layoutType === 'compact' ? AvatarSize.SMALL : AvatarSize.LARGE,
          imageUrl: artistImageUrl,
          claimed: false
        })
      }), /*#__PURE__*/_jsx(HeaderContainer, {
        children: /*#__PURE__*/_jsx(Type, {
          as: "h1",
          variant: "heading2",
          condensed: true,
          children: selectedArtist.name
        })
      }), /*#__PURE__*/_jsxs(TextContainer, {
        children: [/*#__PURE__*/_jsx(Type, {
          as: Type.h3,
          semanticColor: "textSubdued",
          variant: Type.body1,
          children: t('ARTIST_ACCESS_VERIFY_CLAIM_INFO_REQUIRED', 'INFO REQUIRED', 'Information is required')
        }), /*#__PURE__*/_jsxs(ParagraphContainer, {
          children: [/*#__PURE__*/_jsx(Type, {
            as: "p",
            variant: Type.body1,
            weight: Type.bold,
            condensed: true,
            children: t('ARTIST_ACCESS_VERIFY_CLAIM_TITLE', "Verify that you're part of this team", 'Verify that you are part of this artist team')
          }), t('ARTIST_ACCESS_VERIFY_CLAIM_DESCRIPTION', "Connect to the artist's social media accounts. We'll only use this to verify your identity.", "Connect to the artist's social media accounts. We'll only use this information to verify your identity.")]
        }), /*#__PURE__*/_jsx(ParagraphContainer, {
          children: /*#__PURE__*/_jsx(Link, {
            "data-testid": "faq-link",
            href: faqLink,
            children: t('ARTIST_ACCESS_VERIFY_CLAIM_FAQ_ADMIN', 'Or, ask an admin on your team to invite you.', 'Or you can ask an admin on the team to invite you. Link to FAQ article.')
          })
        })]
      }), /*#__PURE__*/_jsxs(ActionContainer, {
        children: [/*#__PURE__*/_jsx(ButtonSecondary, {
          "data-testid": "back-button",
          type: "button",
          onClick: function onClick() {
            artistAccessRouteReset();
            goToArtistAccessFlowStep(ArtistAccessFlowStep.CLAIM_ARTIST);
          },
          buttonSize: responsiveStyleProps.buttonSize,
          children: t('ARTIST_ACCESS_GO_BACK', 'Go back', 'Go back')
        }), /*#__PURE__*/_jsx(ButtonPrimary, {
          "data-testid": "next-button",
          buttonSize: responsiveStyleProps.buttonSize,
          onClick: function onClick() {
            isLqaTester(currentUser.username) ? goToArtistAccessFlowStep(ArtistAccessFlowStep.SOCIAL_VERIFICATION) : createAccessCase(details);
          },
          children: t('ARTIST_ACCESS_NEXT', 'Next', 'Go to the next step')
        })]
      })]
    })
  });
};