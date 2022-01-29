import React from 'react';
import styled from 'styled-components';
import { ButtonPrimary, IconCheck, Type, TypeList, TypeListItem, spacer24 } from '@spotify-internal/encore-web';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var HeadingContainer = styled(Type.h1).attrs({
  variant: 'heading1',
  condensed: true
}).withConfig({
  displayName: "ConfirmationPage__HeadingContainer",
  componentId: "sc-11ybt7b-0"
})(["margin-bottom:", ";text-align:center;"], spacer24);
var IconContainer = styled.div.withConfig({
  displayName: "ConfirmationPage__IconContainer",
  componentId: "sc-11ybt7b-1"
})(["display:flex;justify-content:center;align-items:center;margin-bottom:", ";"], spacer24);
var ListContainer = styled.div.withConfig({
  displayName: "ConfirmationPage__ListContainer",
  componentId: "sc-11ybt7b-2"
})(["margin-bottom:96px;"]);
var ButtonContainer = styled.div.withConfig({
  displayName: "ConfirmationPage__ButtonContainer",
  componentId: "sc-11ybt7b-3"
})(["display:flex;justify-content:center;"]);
var TextContainer = styled.div.withConfig({
  displayName: "ConfirmationPage__TextContainer",
  componentId: "sc-11ybt7b-4"
})(["width:75%;margin:auto;text-align:center;"]);
export var ConfirmationPage = function ConfirmationPage() {
  var _useTeamStore = useTeamStore(),
      details = _useTeamStore.onboarding.labelAccessFlow.details,
      platform = _useTeamStore.platform;

  var t = useT();
  var isCreatingNewTeam = !details.selectedLabel;
  var isJoinRequest = !isCreatingNewTeam; // for mobile web views, to redirect to the waiting room at the end of the flow
  // we need to provide a stand-in artist URI with an id length of 22 chars
  // https://ghe.spotify.net/creator/mrkt-web/pull/4976#discussion_r1469082

  var mobileClientStandInUri = 'spotify:artist:1234567890123456789012';

  var getRedirectUrl = function getRedirectUrl() {
    var url = "/?".concat(isJoinRequest && !(platform !== null && platform !== void 0 && platform.isApp) ? 'jr' : 'ra', "-success=true&claim-flow-submission=true'");
    return platform !== null && platform !== void 0 && platform.isApp ? "".concat(url, "&requested-artists=").concat(encodeURIComponent(mobileClientStandInUri)) : url;
  };

  return /*#__PURE__*/_jsxs("div", {
    "data-testid": "confirmation-page",
    children: [/*#__PURE__*/_jsx(IconContainer, {
      children: /*#__PURE__*/_jsx(IconCheck, {
        iconSize: 64
      })
    }), /*#__PURE__*/_jsx(HeadingContainer, {
      children: isJoinRequest ? t('LABEL_ACCESS_CONFIRMATION_PAGE_HEADING_JOIN', 'Request sent', 'Your request was sent to the admins on the team') : t('LABEL_ACCESS_CONFIRMATION_PAGE_HEADING_CREATE', "We've got your request", "Your request was sent to Spotify's support team")
    }), /*#__PURE__*/_jsx(ListContainer, {
      children: isJoinRequest ? /*#__PURE__*/_jsx(TextContainer, {
        children: /*#__PURE__*/_jsx(Type, {
          as: Type.p,
          variant: Type.heading4,
          children: t('LABEL_ACCESS_CONFIRMATION_PAGE_DESCRIPTION_JOIN', "We've notified your admin. Don't submit another request for this team until you hear back.", 'We have notified the admins of the team you have requested to join. Please wait to hear from us if you have been approved before submitting another request.')
        })
      }) : /*#__PURE__*/_jsxs(TypeList, {
        children: [/*#__PURE__*/_jsx(TypeListItem, {
          variant: "body1",
          condensed: true,
          children: t('LABEL_ACCESS_CONFIRMATION_PAGE_DESCRIPTION_CREATE_1', 'Our support team will review it and send you an email within 3 days.', "Spotify's support team will review your request and send you an email within 3 days")
        }), /*#__PURE__*/_jsx(TypeListItem, {
          variant: "body1",
          condensed: true,
          children: t('LABEL_ACCESS_CONFIRMATION_PAGE_DESCRIPTION_CREATE_2', 'Don’t submit another request for this team until you hear from us.', "Don't submit another request until you hear from us")
        }), /*#__PURE__*/_jsx(TypeListItem, {
          variant: "body1",
          condensed: true,
          children: t('LABEL_ACCESS_CONFIRMATION_PAGE_DESCRIPTION_CREATE_3', 'If this team already exists, you should still ask an admin on your team to invite you.', 'If this team already exists, ask an admin on the team to invite you')
        })]
      })
    }), /*#__PURE__*/_jsx(ButtonContainer, {
      children: /*#__PURE__*/_jsx(ButtonPrimary, {
        type: "a",
        onClick: function onClick(e) {
          // for a11y purposes, we want to keep this element as a link with an href to indicate that the user will be taken somewhere else
          // however, in order to clear session storage, we need to prevent the default action of this link and then redirect.
          e.preventDefault();
          window.location.href = getRedirectUrl();
        },
        href: getRedirectUrl(),
        children: t('LABEL_ACCESS_CONFIRMATION_PAGE_ACTION', 'Got it', 'This button dismisses the page. The user confirms that they understand.')
      })
    })]
  });
};