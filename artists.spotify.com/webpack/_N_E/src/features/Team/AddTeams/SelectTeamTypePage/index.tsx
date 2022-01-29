import React from 'react';
import styled from 'styled-components';
import { ButtonTertiary, gray50, gray90, screenXxsMax, spacer12, spacer24, spacer32, Type } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import artistImg from './artist.png';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { AddTeamType } from '../store/AddTeamsState';
import { useHistory, useLocation } from 'react-router';
import { clearStoredArtistInfo, clearStoredRequestId } from '../utils/stateStorage';
import { IconBadge } from '../../components/IconBadge/IconBadge';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Button = styled(ButtonTertiary).withConfig({
  displayName: "SelectTeamTypePage__Button",
  componentId: "sc-1uz8wlt-0"
})(["border-radius:3px;color:#000;display:inline-block;font-size:18px;font-weight:bold;padding:", " ", ";margin:12px;width:328px;border:solid 1px ", ";&:hover{background-color:#f5f5f5;}&:active{background-color:#b7b7b7;}@media (max-width:", "){display:block;width:100%;margin:auto auto 16px auto;}"], spacer32, spacer12, gray50, screenXxsMax);
var ButtonTextContainer = styled.div.withConfig({
  displayName: "SelectTeamTypePage__ButtonTextContainer",
  componentId: "sc-1uz8wlt-1"
})(["padding-top:", ";"], spacer24);
var Image = styled.img.withConfig({
  displayName: "SelectTeamTypePage__Image",
  componentId: "sc-1uz8wlt-2"
})(["background-color:", ";border-radius:100%;height:132px;margin:auto;width:132px;"], gray90);
var StyledIconBadge = styled(IconBadge).withConfig({
  displayName: "SelectTeamTypePage__StyledIconBadge",
  componentId: "sc-1uz8wlt-3"
})(["margin:auto;"]);
export var SelectTeamTypePage = function SelectTeamTypePage() {
  var t = useT();
  var history = useHistory();
  var location = useLocation();

  var _useTeamStore = useTeamStore(),
      selectedTeamType = _useTeamStore.addTeams.selectedTeamType,
      setSelectedTeamType = _useTeamStore.setSelectedTeamType;

  return /*#__PURE__*/_jsxs("div", {
    "data-slo-id": "select-team-page",
    "data-testid": "select-team-type",
    children: [/*#__PURE__*/_jsx(Type, {
      as: "h1",
      variant: Type.heading2,
      children: t('ADD_TEAMS_SELECT_TEAM_TYPE_TITLE', 'What kind of team do you want access to?', 'select a type of team')
    }), /*#__PURE__*/_jsx(Type, {
      as: "p",
      variant: Type.body2,
      children: t('ADD_TEAMS_SELECT_TEAM_TYPE_BODY', 'If you join a label team, you’ll have access to all the artists on that label.', 'artist versus label team education')
    }), /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsxs(Button, {
        "data-testid": "artist-team-type",
        "data-slo-id": "artist-team-button",
        selected: selectedTeamType === AddTeamType.artist,
        onClick: function onClick() {
          setSelectedTeamType(AddTeamType.artist);
          clearStoredRequestId();
          clearStoredArtistInfo();
          history.push("/add-team/artist-search".concat(location.search));
        },
        children: [/*#__PURE__*/_jsx(Image, {
          alt: t('0d25d0', 'Artist', ''),
          src: artistImg
        }), /*#__PURE__*/_jsx(ButtonTextContainer, {
          children: t('14e8e4', 'Artist team', '')
        })]
      }), /*#__PURE__*/_jsxs(Button, {
        "data-testid": "label-team-type",
        "data-slo-id": "label-team-button",
        selected: selectedTeamType === AddTeamType.label,
        onClick: function onClick() {
          setSelectedTeamType(AddTeamType.label);
          clearStoredRequestId();
          clearStoredArtistInfo();
          history.push("/add-team/label-search".concat(location.search));
        },
        children: [/*#__PURE__*/_jsx(StyledIconBadge, {
          size: "132px",
          variant: "label"
        }), /*#__PURE__*/_jsx(ButtonTextContainer, {
          children: t('51150f', 'Label team', '')
        })]
      })]
    })]
  });
};