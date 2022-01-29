import { Type, ButtonPrimary, spacer32, spacer40, spacer8, spacer12, spacer24 } from '@spotify-internal/encore-web';
import React from 'react';
import { AccessLevel } from '../lib';
import { useTeamStore } from '../lib/store/useTeamStore';
import { useT } from '@mrkt/features/i18n';
import { LoadingIndicator } from '../../../shared/components/LoadingIndicator';
import { TextContainer } from '@mrkt/features/badge/BadgeWithText/TextContainer';
import styled from 'styled-components';
import { IconBadge } from '../components/IconBadge/IconBadge';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var MessageContainer = styled.div.withConfig({
  displayName: "AlreadyOnTeamMessage__MessageContainer",
  componentId: "sc-1jnbajt-0"
})(["width:80%;text-align:center;;"]);
var Container = styled.div.withConfig({
  displayName: "AlreadyOnTeamMessage__Container",
  componentId: "sc-1jnbajt-1"
})(["display:flex;align-items:center;min-height:", ";justify-content:center;margin-bottom:", ";"], spacer40, spacer8);
var StyledButtonPrimary = styled(ButtonPrimary).withConfig({
  displayName: "AlreadyOnTeamMessage__StyledButtonPrimary",
  componentId: "sc-1jnbajt-2"
})(["margin-top:", ";"], spacer12);
export var AlreadyOnTeamMessage = function AlreadyOnTeamMessage(_ref) {
  var currentAccess = _ref.currentAccess,
      teamName = _ref.teamName;
  var t = useT();

  var _useTeamStore = useTeamStore(),
      currentUser = _useTeamStore.currentUser;

  if (!currentUser) {
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  return /*#__PURE__*/_jsxs(MessageContainer, {
    className: "encore-creator-dark-theme",
    children: [/*#__PURE__*/_jsxs(Type, {
      as: "h1",
      variant: "bass",
      semanticColor: "textBase",
      paddingBottom: spacer32,
      children: [currentAccess === AccessLevel.Reader && t('ACCEPT_INVITE_ALREADY_ON_TEAM_READER', "You're already a reader on {teamName}", 'You already have reader access to this team.', {
        teamName: teamName
      }), currentAccess === AccessLevel.Editor && t('ACCEPT_INVITE_ALREADY_ON_TEAM_EDITOR', "You're already an editor on {teamName}", 'You already have admin or editor access to this team.', {
        teamName: teamName
      }), currentAccess === AccessLevel.Admin && t('ACCEPT_INVITE_ALREADY_ON_TEAM_ADMIN', "You're already an admin on {teamName}", 'You already have admin or editor access to this team.', {
        teamName: teamName
      })]
    }), /*#__PURE__*/_jsxs(Container, {
      children: [/*#__PURE__*/_jsx(IconBadge, {}), /*#__PURE__*/_jsx(TextContainer, {}), /*#__PURE__*/_jsx(Type, {
        as: "h2",
        variant: "heading4",
        semanticColor: "textBase",
        paddingBottom: "0",
        children: "".concat(currentUser.name, " \xB7 ").concat(currentUser.loginEmail)
      })]
    }), /*#__PURE__*/_jsx(Type, {
      as: "p",
      variant: "body3",
      semanticColor: "textSubdued",
      paddingBottom: spacer24,
      children: t('ACCEPT_INVITE_ALREADY_ON_TEAM_LOGOUT', 'Not {currentUserName}? Log in to your account to accept the invite.', 'If this is not the correct account, please log in with another account to accept the invitation.', {
        currentUserName: currentUser.name
      })
    }), currentAccess !== AccessLevel.Admin && /*#__PURE__*/_jsx(Type, {
      as: "h2",
      variant: "heading4",
      semanticColor: "textBase",
      paddingBottom: spacer24,
      dangerouslySetInnerHTML: {
        __html: t('ACCEPT_INVITE_ALREADY_ON_TEAM_CONTACT_ADMIN', 'If you want to update your access level, contact an admin listed in <b>Your teams</b>.', 'If this is not the correct account, please log in with another account to accept the invitation.')
      }
    }), /*#__PURE__*/_jsx(StyledButtonPrimary, {
      href: "/c",
      children: t('ACCEPT_INVITE_ALREADY_ON_TEAM_ACTION', 'Open Spotify for Artists', 'Go to the Spotify for Artists website.')
    })]
  });
};