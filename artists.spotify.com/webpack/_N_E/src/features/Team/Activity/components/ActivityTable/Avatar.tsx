// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { IconFollow, screenSmMin, spacer8, spacer24, spacer12 } from '@spotify-internal/encore-web';
import { IconBadge } from '../../../components/IconBadge/IconBadge';
import { jsx as _jsx } from "react/jsx-runtime";
var BadgeStyled = styled(IconBadge).withConfig({
  displayName: "Avatar__BadgeStyled",
  componentId: "sc-12xcsba-0"
})(["margin-inline-end:", ";"], spacer12);
var StyledIconFollow = styled(IconFollow).attrs({
  iconSize: 16
}).withConfig({
  displayName: "Avatar__StyledIconFollow",
  componentId: "sc-12xcsba-1"
})(["@media (min-width:", "){margin-left:", ";margin-right:", ";}margin-left:10px;margin-right:22px;"], screenSmMin, spacer8, spacer24);
export var Avatar = function Avatar(_ref) {
  var imageUrl = _ref.imageUrl,
      showTeamIcon = _ref.showTeamIcon,
      isLabelTeam = _ref.isLabelTeam;

  if (showTeamIcon) {
    return /*#__PURE__*/_jsx(StyledIconFollow, {
      "data-testid": "team-icon"
    });
  }

  if (imageUrl && imageUrl.match(/(^https?:\/\/)|(^\/\/)/)) {
    return /*#__PURE__*/_jsx(BadgeStyled, {
      imgSrc: imageUrl,
      "data-testid": "activity-image",
      circle: true
    });
  }

  return /*#__PURE__*/_jsx(IconBadge, {
    "data-testid": "activity-badge",
    variant: isLabelTeam ? 'label' : 'user'
  });
};