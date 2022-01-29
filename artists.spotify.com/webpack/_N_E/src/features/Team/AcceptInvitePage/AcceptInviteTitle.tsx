import React from 'react';
import { TitleContainer } from './TitleContainer';
import { TeamType } from '../lib/model/Team';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
export var AcceptInviteTitle = function AcceptInviteTitle(_ref) {
  var teamName = _ref.teamName,
      teamType = _ref.teamType;
  var t = useT();
  var welcomeText = teamType === TeamType.artist ? t('ACCEPT_INVITE_WELCOME_TEXT_ARTIST_TEAM', "Welcome to <strong>{teamName}'s</strong> team. <br/> Does everything look right?", 'Welcome to the team, does everything look right?', {
    teamName: teamName
  }) : t('ACCEPT_INVITE_WELCOME_TEXT_LABEL_TEAM', 'Welcome to <strong>{teamName}</strong> <br/> Does everything look right?', 'Welcome to the team, does everything look right?', {
    teamName: teamName
  });
  return /*#__PURE__*/_jsx(TitleContainer, {
    "data-testid": "accept-invite-title",
    dangerouslySetInnerHTML: {
      __html: welcomeText
    }
  });
};