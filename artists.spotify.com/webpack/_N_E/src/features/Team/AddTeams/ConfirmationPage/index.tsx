import React from 'react';
import styled from 'styled-components';
import { Type, ButtonPrimary, spacer16 } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { isSelectedArtist } from '../store/models';
import { useHistory, useLocation } from 'react-router';
import { clearStoredArtistInfo, clearStoredRequestId, getStoredArtistInfo } from '../utils/stateStorage';
import qs from 'query-string';
import { useCurrentUserDetails } from '../../../UserSettings/lib/useCurrentUserDetails';
import { IconBadge } from '../../components/IconBadge/IconBadge';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledTextContainer = styled.div.withConfig({
  displayName: "ConfirmationPage__StyledTextContainer",
  componentId: "sc-1ohwvpp-0"
})(["margin-bottom:", ";"], spacer16);
var ConfirmationPageContainer = styled.div.withConfig({
  displayName: "ConfirmationPage__ConfirmationPageContainer",
  componentId: "sc-1ohwvpp-1"
})(["text-align:center;", " > div{display:flex;justify-content:space-around;flex-wrap:nowrap;}"], function (props) {
  return props.layoutType === 'full' && 'padding-left: 20%; padding-right: 20%;';
});
var IconBadgeContainer = styled.div.withConfig({
  displayName: "ConfirmationPage__IconBadgeContainer",
  componentId: "sc-1ohwvpp-2"
})(["margin-bottom:", ";"], spacer16);
export var ConfirmationPage = function ConfirmationPage() {
  var _selectedTeam$images$;

  var t = useT();

  var _useTeamStore = useTeamStore(),
      details = _useTeamStore.addTeams.details,
      layoutType = _useTeamStore.layoutType,
      setShowErrors = _useTeamStore.setShowErrors,
      setCanRequestAccessError = _useTeamStore.setCanRequestAccessError,
      setRequestSubmissionError = _useTeamStore.setRequestSubmissionError,
      platform = _useTeamStore.platform;

  var selectedTeam = details.selectedTeam,
      newLabelTeamName = details.newLabelTeamName;

  var _useCurrentUserDetail = useCurrentUserDetails(),
      businessEmail = _useCurrentUserDetail.businessEmail;

  var history = useHistory();
  var location = useLocation(); // for mobile web views, to redirect to the waiting room at the end of the flow
  // we need to provide a stand-in artist URI with an id length of 22 chars
  // https://ghe.spotify.net/creator/mrkt-web/pull/4976#discussion_r1469082

  var mobileClientStandInUri = 'spotify:artist:1234567890123456789012';
  var queryParamContinueOrDefault = !!qs.parse(location.search).continue ? "/c/".concat(qs.parse(location.search).continue.replace(/^(\/)/, '')) : '/c/team/roster';
  var continueUrl = platform && platform.isApp ? "/?ra-success=true&requested-artists=".concat(encodeURIComponent(mobileClientStandInUri)) : queryParamContinueOrDefault;

  var _getStoredArtistInfo = getStoredArtistInfo(),
      storedArtistName = _getStoredArtistInfo.artistName,
      storedArtistImageUrl = _getStoredArtistInfo.artistImageUrl;

  if (!selectedTeam && !newLabelTeamName && !storedArtistName) {
    history.push('/add-team');
  }

  var imageUrlOrUndefined = selectedTeam && isSelectedArtist(selectedTeam) ? (_selectedTeam$images$ = selectedTeam.images[0]) === null || _selectedTeam$images$ === void 0 ? void 0 : _selectedTeam$images$.url : storedArtistImageUrl;
  var artistName = newLabelTeamName || (selectedTeam === null || selectedTeam === void 0 ? void 0 : selectedTeam.name) || storedArtistName;
  var isSendingJoinRequestToAdmins = !!(selectedTeam && isSelectedArtist(selectedTeam) && selectedTeam.isClaimed || selectedTeam && !isSelectedArtist(selectedTeam));
  return /*#__PURE__*/_jsxs(ConfirmationPageContainer, {
    layoutType: layoutType,
    "data-testid": "request-submitted",
    "data-slo-id": "request-submitted",
    children: [/*#__PURE__*/_jsx(IconBadgeContainer, {
      children: /*#__PURE__*/_jsx(IconBadge, {
        imgSrc: imageUrlOrUndefined,
        variant: "label",
        size: "96px"
      })
    }), /*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx(Type, {
        as: "h2",
        variant: Type.heading3,
        semanticColor: "textSubdued",
        children: artistName
      })
    }), /*#__PURE__*/_jsx("div", {
      children: isSendingJoinRequestToAdmins ? /*#__PURE__*/_jsx(Type, {
        as: "h1",
        variant: Type.heading1,
        children: t('ADD_TEAMS_CONFIRMATION_HEADING_JOIN', 'Request submitted', 'Your request has been submitted')
      }) : /*#__PURE__*/_jsx(Type, {
        as: "h1",
        variant: Type.heading1,
        children: t('ADD_TEAMS_CONFIRMATION_HEADING_CS', "We've got your request", 'Your request has been submitted')
      })
    }), /*#__PURE__*/_jsx(StyledTextContainer, {
      children: isSendingJoinRequestToAdmins ? /*#__PURE__*/_jsx(Type, {
        as: "p",
        variant: Type.body2,
        semanticColor: "textSubdued",
        children: t('ADD_TEAMS_CONFIRMATION_JOIN', "We've notified the admin. Don't submit another request for this team until you get a response by email ({businessEmail}).", 'the team admins will see your request', {
          businessEmail: businessEmail
        })
      }) : /*#__PURE__*/_jsx(Type, {
        as: "p",
        variant: Type.body2,
        semanticColor: "textSubdued",
        children: t('ADD_TEAMS_CONFIRMATION_CS', "Thanks for your request. We’ll get back to you by email ({businessEmail}) within 3 days. Don't submit another request until you hear from us.", 'Customer support will review your request and contact you', {
          businessEmail: businessEmail
        })
      })
    }), /*#__PURE__*/_jsx(ButtonPrimary, {
      type: "a",
      "data-slo-id": "got-it-button",
      onClick: function onClick() {
        clearStoredRequestId();
        clearStoredArtistInfo();
        setShowErrors(false);
        setCanRequestAccessError(null);
        setRequestSubmissionError(null);
        window.location.href = continueUrl;
      },
      href: continueUrl,
      children: t('ADD_TEAMS_CONFIRMATION_BUTTON', 'Got it', 'dismiss add teams dialog')
    })]
  });
};