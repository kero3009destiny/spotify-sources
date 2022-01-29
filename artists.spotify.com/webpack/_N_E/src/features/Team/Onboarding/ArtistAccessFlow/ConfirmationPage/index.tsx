import React from 'react';
import styled from 'styled-components';
import { LoadingIndicator } from '../../../../../shared/components/LoadingIndicator';
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
  componentId: "sc-1vhjl2e-0"
})(["margin-bottom:", ";text-align:center;"], spacer24);
var IconContainer = styled.div.withConfig({
  displayName: "ConfirmationPage__IconContainer",
  componentId: "sc-1vhjl2e-1"
})(["display:flex;justify-content:center;align-items:center;margin-bottom:", ";"], spacer24);
var ListContainer = styled.div.withConfig({
  displayName: "ConfirmationPage__ListContainer",
  componentId: "sc-1vhjl2e-2"
})(["margin-bottom:96px;"]);
var ButtonContainer = styled.div.withConfig({
  displayName: "ConfirmationPage__ButtonContainer",
  componentId: "sc-1vhjl2e-3"
})(["display:flex;justify-content:center;"]);
var TextContainer = styled.div.withConfig({
  displayName: "ConfirmationPage__TextContainer",
  componentId: "sc-1vhjl2e-4"
})(["width:75%;margin:auto;text-align:center;"]);
export var ConfirmationPage = function ConfirmationPage() {
  var _useTeamStore = useTeamStore(),
      details = _useTeamStore.onboarding.artistAccessFlow.details,
      platform = _useTeamStore.platform;

  var t = useT();
  var selectedArtist = details.selectedArtist;
  var isClaimingArtist = !(selectedArtist !== null && selectedArtist !== void 0 && selectedArtist.isClaimed);
  var isJoinRequest = !isClaimingArtist;

  if (!platform || !selectedArtist) {
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  var getRedirectUrl = function getRedirectUrl() {
    var url = "/?".concat(isJoinRequest && !platform.isApp ? 'jr' : 'ra', "-success=true&claim-flow-submission=true'");
    return platform.isApp ? "".concat(url, "&requested-artists=").concat(encodeURIComponent(selectedArtist.uri)) : url;
  };

  return /*#__PURE__*/_jsxs("div", {
    "data-testid": "confirmation-page",
    children: [/*#__PURE__*/_jsx(IconContainer, {
      children: /*#__PURE__*/_jsx(IconCheck, {
        iconSize: 64
      })
    }), /*#__PURE__*/_jsx(HeadingContainer, {
      children: isJoinRequest ? t('ARTIST_ACCESS_JOIN_REQUEST_CONFIRMATION_TITLE', 'Request submitted', 'Your request has been sent to the team admins') : t('ARTIST_ACCESS_CLAIM_CONFIRMATION_TITLE', "We've got your request", 'Your request has been sent to the Creator Support team')
    }), /*#__PURE__*/_jsx(ListContainer, {
      children: isJoinRequest ? /*#__PURE__*/_jsx(TextContainer, {
        children: /*#__PURE__*/_jsx(Type, {
          as: Type.p,
          variant: Type.heading4,
          children: t('ARTIST_ACCESS_JOIN_REQUEST_DESCRIPTION', "Contact {name}'s admin if you have questions about your request.", "Contact the team's admin if you have questions about your request", selectedArtist || {})
        })
      }) : /*#__PURE__*/_jsxs(TypeList, {
        children: [/*#__PURE__*/_jsx(TypeListItem, {
          variant: "body1",
          condensed: true,
          children: t('ARTIST_ACCESS_CLAIM_DESCRIPTION_1', 'Our support team will review it and send you an email within 3 days.', 'Our support team will email you within 3 days')
        }), /*#__PURE__*/_jsx(TypeListItem, {
          variant: "body1",
          condensed: true,
          children: t('ARTIST_ACCESS_CLAIM_DESCRIPTION_2', 'Don’t submit another request until you hear from us.', 'Don’t submit another request until you hear from us.')
        }), /*#__PURE__*/_jsx(TypeListItem, {
          variant: "body1",
          condensed: true,
          children: t('ARTIST_ACCESS_CLAIM_DESCRIPTION_3', 'If this artist profile is already claimed, ask an admin on your team to invite you.', 'You can also ask an admin on the team to invite you.')
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
        children: t('ARTIST_ACCESS_GOT_IT', 'Got it', 'Got it')
      })
    })]
  });
};