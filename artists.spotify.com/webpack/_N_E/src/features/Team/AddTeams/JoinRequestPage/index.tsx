import React from 'react';
import { useT } from '@mrkt/features/i18n';
import { Banner, screenSmMin, spacer16, spacer8, TextLink, Type } from '@spotify-internal/encore-web';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { TeamType } from '../../lib';
import { LoadingIndicator } from '../../../../shared/components/LoadingIndicator';
import { LoggedInAsFormLayout } from '../../../UserSettings/components/LoggedInAsForm';
import { getAccountsDomain } from '@mrkt/features/auth';
import styled from 'styled-components';
import { RoleInput } from '../../components/TeamMemberDetailsForm/RoleInput';
import { Input } from '../../components/TeamMemberDetailsForm/Input';
import { isSelectedArtist } from '../store/models';
import { useHistory, useLocation } from 'react-router';
import { RolePopover } from '../../components/FormPopovers';
import { IconBadge } from '../../components/IconBadge/IconBadge';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var LoggedInAsFormContainer = styled.div.withConfig({
  displayName: "JoinRequestPage__LoggedInAsFormContainer",
  componentId: "sc-9mctn6-0"
})(["margin-top:30px;margin-right:", ";"], spacer8);
var InputGroup = styled.div.withConfig({
  displayName: "JoinRequestPage__InputGroup",
  componentId: "sc-9mctn6-1"
})(["display:block;> *{width:100%;padding-left:0;padding-bottom:0;padding-right:", ";}"], spacer8);
var TeamTypeFaqContainer = styled.div.withConfig({
  displayName: "JoinRequestPage__TeamTypeFaqContainer",
  componentId: "sc-9mctn6-2"
})(["padding-top:", ";"], spacer16);
var JoinRequestPageContainer = styled.div.withConfig({
  displayName: "JoinRequestPage__JoinRequestPageContainer",
  componentId: "sc-9mctn6-3"
})(["@media (min-width:", "){min-width:550px;}"], screenSmMin);
export var JoinRequestPage = function JoinRequestPage() {
  var _selectedTeam$images$;

  var _useTeamStore = useTeamStore(),
      _useTeamStore$addTeam = _useTeamStore.addTeams,
      details = _useTeamStore$addTeam.details,
      formErrors = _useTeamStore$addTeam.formErrors,
      showError = _useTeamStore$addTeam.showError,
      requestSubmissionError = _useTeamStore$addTeam.requestSubmissionError,
      currentUser = _useTeamStore.currentUser,
      setAddTeamsFlowDetails = _useTeamStore.setAddTeamsFlowDetails,
      platform = _useTeamStore.platform;

  var t = useT();
  var location = useLocation();
  var selectedTeam = details.selectedTeam;
  var history = useHistory();

  if (!selectedTeam) {
    history.push('/add-artist');
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  var isArtistTeam = isSelectedArtist(selectedTeam);
  var hasErrors = formErrors.get('role') || !isArtistTeam && formErrors.get('company');
  var visibleErrors = showError && hasErrors;
  var imageUrlOrUndefined = isSelectedArtist(selectedTeam) ? (_selectedTeam$images$ = selectedTeam.images[0]) === null || _selectedTeam$images$ === void 0 ? void 0 : _selectedTeam$images$.url : undefined;
  var homepageUrl = "".concat(window.location.protocol, "//").concat(window.location.host, "/c/add-artist");
  var logoutUrl = "".concat(getAccountsDomain(), "/logout?continue=").concat(encodeURIComponent(homepageUrl));
  return /*#__PURE__*/_jsxs(JoinRequestPageContainer, {
    "data-slo-id": "join-request-page",
    "data-testid": "join-request-page",
    children: [isArtistTeam && /*#__PURE__*/_jsx(IconBadge, {
      variant: "artist",
      imgSrc: imageUrlOrUndefined,
      size: "72px",
      circle: true
    }), /*#__PURE__*/_jsx(Type, {
      as: "h1",
      variant: Type.heading2,
      condensed: true,
      children: t('ADD_TEAMS_JOIN_PAGE_TITLE', 'Join {teamName}', 'send a request to support to claim an artist team', {
        teamName: selectedTeam.name
      })
    }), /*#__PURE__*/_jsx(Type, {
      as: "p",
      variant: Type.body2,
      children: isArtistTeam ? t('ADD_TEAMS_JOIN_ARTIST_SUBTITLE', 'The team already exists so your request will go to the admin.', 'This team already exists or has already been claimed, so your request will go to the team admins for consideration') : t('ADD_TEAMS_JOIN_LABEL_SUBTITLE', 'Tell us about yourself', 'Enter your information to request access')
    }), /*#__PURE__*/_jsxs(TeamTypeFaqContainer, {
      children: [/*#__PURE__*/_jsx(Type, {
        as: "h2",
        variant: Type.body2,
        weight: Type.bold,
        condensed: true,
        children: isArtistTeam ? t('ARTIST_TEAM_FAQ_TITLE', 'Not on an artist team?', 'are you on an artist team?') : t('LABEL_TEAM_FAQ_TITLE', 'Not a label or distributor?', 'are you on a label team?')
      }), isArtistTeam ? /*#__PURE__*/_jsx(Type, {
        as: "h2",
        variant: Type.body2,
        condensed: true,
        children: /*#__PURE__*/_jsx(TextLink, {
          href: "/c/add-artist/label-search".concat(location.search),
          children: t('ADD_LABEL_REDIRECT_LINK', "If you're a label team member, go here instead.", 'Are you a label team member, not an artist? Click the following link to select a label instead.')
        })
      }) : /*#__PURE__*/_jsx(Type, {
        as: "h2",
        variant: Type.body2,
        children: /*#__PURE__*/_jsx(TextLink, {
          href: "/c/add-artist/artist-search".concat(location.search),
          children: t('ADD_ARTIST_REDIRECT_LINK', "If you're an artist team member, go here instead.", 'Are you an artist team member, not a label? Click the following link to select an artist instead')
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
        label: t('ADD_TEAMS_JOIN_ROLE_INPUT', 'Role', 'the user selects their role on the team'),
        onChange: function onChange(role) {
          setAddTeamsFlowDetails({
            role: role
          });
          formErrors.delete('role');
        },
        value: details.role,
        teamType: isArtistTeam ? TeamType.artist : TeamType.label,
        required: true,
        error: formErrors.get('role'),
        forceShowErrors: !!visibleErrors,
        popover: /*#__PURE__*/_jsx(RolePopover, {}),
        popoverPlacement: "bottomLeft"
      }), /*#__PURE__*/_jsx(Input, {
        id: "company",
        "data-testid": "company",
        label: isArtistTeam ? t('ADD_TEAMS_JOIN_COMPANY_INPUT_OPTIONAL', 'Company (optional)', 'the user enters their company') : t('ADD_TEAMS_JOIN_COMPANY_INPUT_REQUIRED', 'Company', 'the user enters their company'),
        onChange: function onChange(company) {
          setAddTeamsFlowDetails({
            company: company
          });
          formErrors.delete('company');
        },
        value: details.company,
        required: !isArtistTeam,
        error: !isArtistTeam ? formErrors.get('company') : undefined,
        forceShowErrors: !!(!isArtistTeam && visibleErrors)
      })]
    }), requestSubmissionError && /*#__PURE__*/_jsx(Banner, {
      contextual: true,
      colorSet: "negative",
      children: requestSubmissionError
    })]
  });
};