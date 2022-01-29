import React from 'react';
import { useT } from '@mrkt/features/i18n';
import { spacer12, spacer16, spacer40, Type, screenXxsMax, Banner, TextLink, red, spacer8 } from '@spotify-internal/encore-web';
import { TeamType } from '../../lib';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { LoadingIndicator } from '../../../../shared/components/LoadingIndicator';
import { LoggedInAsFormLayout } from '../../../UserSettings/components/LoggedInAsForm';
import { getAccountsDomain } from '@mrkt/features/auth';
import styled from 'styled-components';
import { RoleInput } from '../../components/TeamMemberDetailsForm/RoleInput';
import { Input } from '../../components/TeamMemberDetailsForm/Input';
import { InstagramVerificationButton } from '../components/InstagramVerificationButton';
import { TwitterVerificationButton } from '../components/TwitterVerificationButton';
import { useGetDetailsFromRequestId } from '../store/hooks/useGetDetailsFromRequestId';
import { useQueryClient } from 'react-query';
import { AccessLevelPopover, RolePopover } from '../../components/FormPopovers';
import { useLocation } from 'react-router';
import { getStoredArtistInfo, getStoredRequestId } from '../utils/stateStorage';
import { IconBadge } from '../../components/IconBadge/IconBadge';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var LoggedInAsFormContainer = styled.div.withConfig({
  displayName: "SocialVerificationPage__LoggedInAsFormContainer",
  componentId: "sc-1jics-0"
})(["margin-top:30px;"]);
var SocialLinksContainer = styled.div.withConfig({
  displayName: "SocialVerificationPage__SocialLinksContainer",
  componentId: "sc-1jics-1"
})(["margin-top:30px;max-width:550px;"]);
var ButtonContainer = styled.div.withConfig({
  displayName: "SocialVerificationPage__ButtonContainer",
  componentId: "sc-1jics-2"
})(["display:flex;margin-bottom:", ";height:", ";@media (max-width:", "){display:block;height:106px;}"], spacer12, spacer40, screenXxsMax);
var InputGroup = styled.div.withConfig({
  displayName: "SocialVerificationPage__InputGroup",
  componentId: "sc-1jics-3"
})(["flex-wrap:wrap;display:block;> *{width:100%;padding:0;}"]);
var TeamTypeFaqContainer = styled.div.withConfig({
  displayName: "SocialVerificationPage__TeamTypeFaqContainer",
  componentId: "sc-1jics-4"
})(["padding-top:", ";"], spacer16);
var RequiredFieldsAsterisk = styled.span.attrs({
  'aria-hidden': 'true'
}).withConfig({
  displayName: "SocialVerificationPage__RequiredFieldsAsterisk",
  componentId: "sc-1jics-5"
})(["color:", ";margin-right:", ";"], red, spacer8);
export var SocialVerificationPage = function SocialVerificationPage() {
  var _details$selectedTeam, _getStoredArtistInfo, _getStoredArtistInfo$, _details$selectedTeam2, _details$selectedTeam3, _getStoredArtistInfo2, _details$selectedTeam4, _getStoredArtistInfo3;

  var _useTeamStore = useTeamStore(),
      _useTeamStore$addTeam = _useTeamStore.addTeams,
      details = _useTeamStore$addTeam.details,
      formErrors = _useTeamStore$addTeam.formErrors,
      showError = _useTeamStore$addTeam.showError,
      requestSubmissionError = _useTeamStore$addTeam.requestSubmissionError,
      stateRequestId = _useTeamStore$addTeam.requestId,
      currentUser = _useTeamStore.currentUser,
      setAddTeamsFlowDetails = _useTeamStore.setAddTeamsFlowDetails,
      platform = _useTeamStore.platform;

  var t = useT();
  var location = useLocation();
  var hasErrors = formErrors.get('role') || formErrors.get('websiteLink') || formErrors.get('socialVerification');
  var visibleErrors = showError && hasErrors; // if requestId and artistInfo aren't in the TeamState, get them from session storage

  var requestId = stateRequestId || getStoredRequestId();
  var artistId = ((_details$selectedTeam = details.selectedTeam) === null || _details$selectedTeam === void 0 ? void 0 : _details$selectedTeam.uri.split(':')[2]) || ((_getStoredArtistInfo = getStoredArtistInfo()) === null || _getStoredArtistInfo === void 0 ? void 0 : (_getStoredArtistInfo$ = _getStoredArtistInfo.artistUri) === null || _getStoredArtistInfo$ === void 0 ? void 0 : _getStoredArtistInfo$.split(':')[2]);
  var artistImageUrl = ((_details$selectedTeam2 = details.selectedTeam) === null || _details$selectedTeam2 === void 0 ? void 0 : (_details$selectedTeam3 = _details$selectedTeam2.images[0]) === null || _details$selectedTeam3 === void 0 ? void 0 : _details$selectedTeam3.url) || ((_getStoredArtistInfo2 = getStoredArtistInfo()) === null || _getStoredArtistInfo2 === void 0 ? void 0 : _getStoredArtistInfo2.artistImageUrl);
  var artistName = ((_details$selectedTeam4 = details.selectedTeam) === null || _details$selectedTeam4 === void 0 ? void 0 : _details$selectedTeam4.name) || ((_getStoredArtistInfo3 = getStoredArtistInfo()) === null || _getStoredArtistInfo3 === void 0 ? void 0 : _getStoredArtistInfo3.artistName);

  var _useGetDetailsFromReq = useGetDetailsFromRequestId(requestId),
      twitterUsername = _useGetDetailsFromReq.twitterUsername,
      instagramUsername = _useGetDetailsFromReq.instagramUsername,
      requestIsValidating = _useGetDetailsFromReq.requestIsValidating;

  var queryClient = useQueryClient();
  var isArtistImageLoading = !artistImageUrl && !artistId;

  if (!artistId || isArtistImageLoading || !artistName || requestIsValidating || !requestId) {
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  var homepageUrl = "".concat(window.location.protocol, "//").concat(window.location.host, "/c/add-team");
  var logoutUrl = "".concat(getAccountsDomain(), "/logout?continue=").concat(encodeURIComponent(homepageUrl));
  return /*#__PURE__*/_jsxs("div", {
    "data-slo-id": "social-verification-page",
    "data-testid": "social-verification-page",
    children: [/*#__PURE__*/_jsx(IconBadge, {
      imgSrc: artistImageUrl,
      size: "72px",
      circle: true
    }), /*#__PURE__*/_jsx(Type, {
      as: "h1",
      variant: Type.heading2,
      condensed: true,
      children: t('ADD_TEAMS_SOCIAL_PAGE_TITLE', 'Create a team for {artistName}', 'send a request to support to claim an artist team', {
        artistName: artistName
      })
    }), /*#__PURE__*/_jsx(Type, {
      as: "p",
      variant: Type.body2,
      children: t('ADD_TEAMS_SOCIAL_SUBTITLE', 'We’ll need some info to confirm that you have the right to set up this artist’s team.', "Enter your information so we can confirm you have the right to set up this artist's team")
    }), /*#__PURE__*/_jsxs(TeamTypeFaqContainer, {
      children: [/*#__PURE__*/_jsx(Type, {
        as: "h2",
        variant: Type.body2,
        weight: Type.bold,
        condensed: true,
        children: t('ADD_TEAMS_SOCIAL_ARTIST_TEAM_FAQ_TITLE', 'Not on an artist team?', 'are you on an artist team?')
      }), /*#__PURE__*/_jsx(Type, {
        as: "h2",
        variant: Type.body2,
        condensed: true,
        children: /*#__PURE__*/_jsx(TextLink, {
          href: "/c/add-artist/label-search".concat(location.search),
          children: t('ADD_LABEL_REDIRECT_LINK', "If you're a label team member, go here instead.", 'Are you a label team member, not an artist? Click the following link to select a label instead.')
        })
      })]
    }), /*#__PURE__*/_jsx(LoggedInAsFormContainer, {
      children: /*#__PURE__*/_jsx(LoggedInAsFormLayout, {
        addTeams: true,
        currentUser: currentUser,
        actionText: t('LOG_OUT', 'Log out', 'log out'),
        actionUrl: logoutUrl,
        platform: platform
      })
    }), /*#__PURE__*/_jsxs(InputGroup, {
      children: [/*#__PURE__*/_jsx(RoleInput, {
        id: "role",
        "data-testid": "role",
        label: t('ADD_TEAMS_SOCIAL_ROLE_INPUT', 'Role', 'the user selects their role on the team'),
        onChange: function onChange(role) {
          setAddTeamsFlowDetails({
            role: role
          });
          formErrors.delete('role');
        },
        value: details.role,
        teamType: TeamType.artist,
        required: true,
        error: formErrors.get('role'),
        forceShowErrors: !!visibleErrors,
        popover: /*#__PURE__*/_jsx(RolePopover, {}),
        popoverPlacement: "bottomLeft"
      }), /*#__PURE__*/_jsx(Input, {
        id: "company",
        "data-testid": "company",
        label: t('ADD_TEAMS_SOCIAL_COMPANY_INPUT', 'Company (optional)', 'the user enters their company'),
        onChange: function onChange(company) {
          return setAddTeamsFlowDetails({
            company: company
          });
        },
        value: details.company
      }), /*#__PURE__*/_jsx(Input, {
        disabled: true,
        id: "accessLevel",
        "data-testid": "access-level",
        label: t('ADD_TEAMS_SOCIAL_ACCESS_LEVEL_INPUT_LABEL', 'Access level', 'Access level input label'),
        onChange: function onChange() {},
        value: t('ADD_TEAMS_SOCIAL_ACCESS_LEVEL_INPUT_VALUE', 'Admin', 'Access level input value- Admin access'),
        popover: /*#__PURE__*/_jsx(AccessLevelPopover, {}),
        popoverPlacement: "bottomLeft"
      })]
    }), /*#__PURE__*/_jsxs(SocialLinksContainer, {
      children: [/*#__PURE__*/_jsxs(Type, {
        weight: Type.bold,
        as: "h2",
        variant: Type.body2,
        children: [t('ADD_TEAMS_SOCIAL_SOCIAL_ACCOUNTS_HEADER', "Verify by connecting to the artist's social accounts or entering their website", 'header for artist social accounts section'), /*#__PURE__*/_jsx(RequiredFieldsAsterisk, {
          children: "*"
        })]
      }), /*#__PURE__*/_jsxs(ButtonContainer, {
        children: [/*#__PURE__*/_jsx(TwitterVerificationButton, {
          requestId: requestId,
          artistId: artistId,
          username: twitterUsername,
          onRemoved: function onRemoved() {
            return queryClient.invalidateQueries('requestData');
          }
        }), /*#__PURE__*/_jsx(InstagramVerificationButton, {
          requestId: requestId,
          artistId: artistId,
          username: instagramUsername,
          onRemoved: function onRemoved() {
            return queryClient.invalidateQueries('requestData');
          }
        })]
      }), /*#__PURE__*/_jsx(InputGroup, {
        children: /*#__PURE__*/_jsx(Input, {
          id: "otherLinks",
          "data-testid": "other-links",
          label: t('ADD_TEAMS_SOCIAL_OTHER_LINKS_INPUT', "Artist's website link", 'the user enters any additional links to be included in their request'),
          onChange: function onChange(websiteLink) {
            setAddTeamsFlowDetails({
              websiteLink: websiteLink
            });
            formErrors.delete('websiteLink');
            formErrors.delete('socialVerification');
          },
          value: details.websiteLink,
          error: formErrors.get('websiteLink') || formErrors.get('socialVerification'),
          forceShowErrors: !!visibleErrors,
          helpText: t('ADD_TEAMS_SOCIAL_ACCOUNTS_HELP_TEXT', 'Site should include your name and email address.', 'description for artist social accounts section')
        })
      })]
    }), requestSubmissionError && /*#__PURE__*/_jsx(Banner, {
      contextual: true,
      colorSet: "negative",
      children: requestSubmissionError
    })]
  });
};