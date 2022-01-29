import React, { useState } from 'react';
import { ButtonPrimary, ButtonSecondary, ButtonTertiary, Popover, PopoverTrigger, Type, IconArrowTopRight, LoadingIndicator, spacer16 } from '@spotify-internal/encore-web';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { ArtistAccessFlowStep } from '../../store';
import { useLayoutType } from '../../store/selectors/useLayoutType';
import { AvatarContainer, ButtonRow, Container, Heading, Link, ParagraphContainer, ParentContainer } from '../../components/sharedStyles';
import { Avatar, AvatarSize } from '../../components/Avatar';
import { useT } from '@mrkt/features/i18n';
import { spacer12 } from '@spotify-internal/tokens';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var StyledLink = styled(Link).withConfig({
  displayName: "SpeedbumpPage__StyledLink",
  componentId: "y3204r-0"
})(["margin-top:", ";"], spacer16);
export var SpeedbumpPage = function SpeedbumpPage() {
  var _selectedArtist$image, _selectedArtist$distr, _selectedArtist$distr2;

  var _useTeamStore = useTeamStore(),
      details = _useTeamStore.onboarding.artistAccessFlow.details,
      goToArtistAccessFlowStep = _useTeamStore.goToArtistAccessFlowStep,
      artistAccessRouteReset = _useTeamStore.artistAccessRouteReset,
      goToHomePage = _useTeamStore.goToHomePage,
      layoutType = _useTeamStore.layoutType,
      trackEvent = _useTeamStore.trackEvent;

  var _useState = useState(false),
      showPopover = _useState[0],
      setShowPopover = _useState[1];

  var t = useT();

  var _useParams = useParams(),
      artistId = _useParams.artistId;

  var responsiveStyleProps = useLayoutType(layoutType);
  var selectedArtist = details.selectedArtist;

  if (!selectedArtist) {
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  var hasInstantAccess = !selectedArtist.isClaimed && !!selectedArtist.distributor;
  var artistImageUrl = selectedArtist === null || selectedArtist === void 0 ? void 0 : (_selectedArtist$image = selectedArtist.images[0]) === null || _selectedArtist$image === void 0 ? void 0 : _selectedArtist$image.url;
  return /*#__PURE__*/_jsxs(ParentContainer, {
    "data-testid": "speed-bump-artist-page",
    children: [/*#__PURE__*/_jsxs(Container, {
      children: [/*#__PURE__*/_jsx(AvatarContainer, {
        children: /*#__PURE__*/_jsx(Avatar, {
          size: layoutType === 'compact' ? AvatarSize.SMALL : AvatarSize.LARGE,
          imageUrl: artistImageUrl,
          claimed: true
        })
      }), /*#__PURE__*/_jsx(Heading, {
        children: selectedArtist.name
      }), /*#__PURE__*/_jsx(ParagraphContainer, {
        children: /*#__PURE__*/_jsx(Link, {
          href: "https://open.spotify.com/artist/".concat(selectedArtist.id),
          "data-testid": "link-listen",
          rel: "noopener noreferrer",
          target: "_blank",
          children: t('952fed', 'Listen on Spotify', '')
        })
      }), hasInstantAccess ? /*#__PURE__*/_jsxs(ParagraphContainer, {
        "data-testid": "speedbump-instant-access",
        children: [/*#__PURE__*/_jsx(Type, {
          as: "p",
          variant: Type.body1,
          weight: Type.bold,
          condensed: true,
          children: t('b1aacf', 'Get instant access', '')
        }), (_selectedArtist$distr = selectedArtist.distributor) === null || _selectedArtist$distr === void 0 ? void 0 : _selectedArtist$distr.distributorInstructions]
      }) : /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsxs(ParagraphContainer, {
          children: [/*#__PURE__*/_jsx(Type, {
            as: "p",
            variant: Type.body1,
            weight: Type.bold,
            condensed: true,
            children: t('ARTIST_ACCESS_SPEEDBUMP_PAGE_HEADING', 'This artist profile has already been claimed.', 'This artist team has already been claimed')
          }), t('ARTIST_ACCESS_SPEEDBUMP_PAGE_SUBHEADING', 'Ask your team to invite you to Spotify for Artists.', 'To get access, ask an admin on the team to invite you.')]
        }), /*#__PURE__*/_jsx(PopoverTrigger, {
          placement: PopoverTrigger.bottom,
          onShow: function onShow() {
            return setShowPopover(true);
          },
          onHide: function onHide() {
            return setShowPopover(false);
          },
          overlay: showPopover && /*#__PURE__*/_jsxs(Popover, {
            "data-testid": "speed-bump-popover",
            arrow: Popover.top,
            children: [t('ARTIST_ACCESS_SPEEDBUMP_PAGE_POPOVER_TEXT', "If you don't know how to reach your admin, submit a request and we'll notify them for you.", "If you don't know how to reach your admin, you can submit a request and we'll notify them for you"), /*#__PURE__*/_jsx("div", {
              children: /*#__PURE__*/_jsx(StyledLink, {
                "data-testid": "submit-request-link",
                component: "button",
                onClick: function onClick() {
                  trackEvent({
                    action_target: 'artist-access:speedbump-page-submit-request-link',
                    action_type: 'artist-access:click',
                    action_intent: 'artist-access:speedbump-page-next',
                    action_meta_str_1: 'join-artist-team'
                  });
                  goToArtistAccessFlowStep(ArtistAccessFlowStep.ENTER_EMAIL);
                },
                children: t('ARTIST_ACCESS_SPEEDBUMP_PAGE_SUBMIT_REQUEST_BUTTON', 'Submit a request', 'Button to submit a request to the team admins')
              })
            })]
          }),
          children: /*#__PURE__*/_jsx(Link, {
            component: "button",
            "data-testid": "speed-bump-popover-button",
            children: t('ARTIST_ACCESS_SPEEDBUMP_PAGE_POPOVER_TRIGGER', "Can't reach your team?", "Can't reach your team?")
          })
        })]
      })]
    }), /*#__PURE__*/_jsxs(ButtonRow, {
      children: [/*#__PURE__*/_jsx(ButtonSecondary, {
        "data-testid": "speed-bump-go-back",
        buttonSize: responsiveStyleProps.buttonSize,
        onClick: function onClick() {
          goToArtistAccessFlowStep(ArtistAccessFlowStep.FIND_ARTIST);

          if (artistId) {
            artistAccessRouteReset();
          }
        },
        children: t('ARTIST_ACCESS_GO_BACK', 'Go back', 'Go back')
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(ButtonTertiary, {
          "data-testid": "speed-bump-cancel",
          buttonSize: responsiveStyleProps.buttonSize,
          onClick: function onClick() {
            return hasInstantAccess ? goToArtistAccessFlowStep(ArtistAccessFlowStep.ENTER_EMAIL) : goToHomePage();
          },
          children: hasInstantAccess ? t('ARTIST_ACCESS_SKIP_INSTANT_ACCESS', 'Skip instant access', 'Skip instant access') : t('ARTIST_ACCESS_CANCEL', 'Cancel', 'CANCEL')
        }), hasInstantAccess ? /*#__PURE__*/_jsxs(ButtonPrimary, {
          "data-testid": "instant-access-lets-go",
          as: "a",
          buttonSize: responsiveStyleProps.buttonSize,
          href: (_selectedArtist$distr2 = selectedArtist.distributor) === null || _selectedArtist$distr2 === void 0 ? void 0 : _selectedArtist$distr2.distributorURL,
          onClick: function onClick() {
            return trackEvent({
              action_target: 'artist-access:speedbump-page-instant-access',
              action_type: 'artist-access:click',
              action_intent: 'artist-access:speedbump-page-instant-access-start',
              action_meta_str_1: 'instant-access-start'
            });
          },
          target: "_blank",
          rel: "noopener noreferrer",
          children: [t('ARTIST_ACCESS_LETS_GO', "Let's go", 'Link to get instant access from your distributor'), /*#__PURE__*/_jsx(IconArrowTopRight, {
            height: spacer12
          })]
        }) : /*#__PURE__*/_jsx(ButtonPrimary, {
          as: "a",
          buttonSize: responsiveStyleProps.buttonSize,
          href: "https://artists.spotify.com/help/article/getting-access-to-spotify-for-artists",
          target: "_blank",
          rel: "noopener noreferrer",
          children: t('ARTIST_ACCESS_LEARN_MORE', 'Learn more', 'Learn more. Link to FAQ article.')
        })]
      })]
    })]
  });
};