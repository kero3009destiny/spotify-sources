import styled from 'styled-components';
import { Dropdown, PopoverNavigation, PopoverNavigationItem, PopoverNavigationLink, PopoverTrigger, Type, screenXsMax, spacer24 } from '@spotify-internal/encore-web';
import React, { useState } from 'react';
import AdminSvg from '../TeamMemberDetailsForm/images/Admin.svg';
import EditorSvg from '../TeamMemberDetailsForm/images/Editor.svg';
import ReaderSvg from '../TeamMemberDetailsForm/images/Reader.svg';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { AccessLevel, accessLevelName } from '../../lib/model/AccessLevel';
import { gray50 } from '@spotify-internal/tokens';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var AccessDescriptionContainer = styled.div.withConfig({
  displayName: "AccessLevelDropdown__AccessDescriptionContainer",
  componentId: "sc-8y8gg9-0"
})(["display:grid;grid-template-columns:125px 2fr 0.3fr;margin-top:", ";"], spacer24);
var ImageContainer = styled.img.withConfig({
  displayName: "AccessLevelDropdown__ImageContainer",
  componentId: "sc-8y8gg9-1"
})(["flex-shrink:0;width:48px;@media (max-width:", "){margin-right:", ";width:44px;}"], screenXsMax, spacer24);
var AccessTextContainer = styled.div.withConfig({
  displayName: "AccessLevelDropdown__AccessTextContainer",
  componentId: "sc-8y8gg9-2"
})(["padding-left:", ";padding-right:", ";"], spacer24, spacer24);
var PopoverTitle = styled(PopoverNavigationItem).withConfig({
  displayName: "AccessLevelDropdown__PopoverTitle",
  componentId: "sc-8y8gg9-3"
})(["color:", ";"], gray50);
var StyledPopover = styled(PopoverNavigation).withConfig({
  displayName: "AccessLevelDropdown__StyledPopover",
  componentId: "sc-8y8gg9-4"
})(["min-width:418px;align-items:left;margin-right:-59px;"]);
var StyledDropdown = styled(Dropdown).withConfig({
  displayName: "AccessLevelDropdown__StyledDropdown",
  componentId: "sc-8y8gg9-5"
})(["width:150px;"]);
export var AccessDescription = function AccessDescription(_ref) {
  var id = _ref.id,
      image = _ref.image,
      title = _ref.title,
      description = _ref.description;
  return /*#__PURE__*/_jsxs(AccessDescriptionContainer, {
    children: [/*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx(Type, {
        "data-testid": "access-description-title",
        variant: Type.heading4,
        children: /*#__PURE__*/_jsx("b", {
          children: title
        })
      })
    }), /*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx(AccessTextContainer, {
        id: id,
        children: /*#__PURE__*/_jsx(Type, {
          as: Type.p,
          variant: Type.body1,
          children: description
        })
      })
    }), /*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx(ImageContainer, {
        src: image,
        alt: "admin"
      })
    })]
  });
};
export var AccessLevelDropdown = function AccessLevelDropdown(_ref2) {
  var request = _ref2.request;

  var _useTeamStore = useTeamStore(),
      setJoinRequestAccessLevel = _useTeamStore.setJoinRequestAccessLevel;

  var _useState = useState(false),
      showDropdown = _useState[0],
      setShowDropdown = _useState[1];

  var requestId = "".concat(request.id, "-access-level");
  var t = useT();
  var accessLevelData = [{
    id: AccessLevel.Reader,
    title: t('ACCESS_LEVEL_READER_TITLE', 'Reader', 'Reader access level title'),
    description: t('ACCESS_LEVEL_READER_DESCRIPTION', 'Readers can check out stats and artist profiles.', 'Reader access level description'),
    icon: ReaderSvg
  }, {
    id: AccessLevel.Editor,
    title: t('ACCESS_LEVEL_EDITOR_TITLE', 'Editor', 'Editor access level title'),
    description: t('ACCESS_LEVEL_EDITOR_DESCRIPTION', 'Editors can add, update, and remove artist info, pitches, and campaigns.', 'Editor access level description'),
    icon: EditorSvg
  }, {
    id: AccessLevel.Admin,
    title: t('ACCESS_LEVEL_ADMIN_TITLE', 'Admin', 'Admin access level title'),
    description: t('ACCESS_LEVEL_ADMIN_DESCRIPTION', 'Admins can add, update, and remove team members, billing info, and artist info. Limit use.', 'Admin access level description'),
    icon: AdminSvg
  }];
  return /*#__PURE__*/_jsx(PopoverTrigger, {
    onShow: function onShow() {
      return setShowDropdown(true);
    },
    onHide: function onHide() {
      return setShowDropdown(false);
    },
    placement: "bottomLeft",
    overlay: showDropdown && /*#__PURE__*/_jsxs(StyledPopover, {
      id: requestId,
      children: [/*#__PURE__*/_jsx(PopoverTitle, {
        children: t('ACCESS_LEVEL_POPOVER_TITLE', 'Access level', 'Access level title')
      }), accessLevelData.map(function (accessLevel) {
        return /*#__PURE__*/_jsx(PopoverNavigationItem, {
          children: /*#__PURE__*/_jsx(PopoverNavigationLink, {
            tabIndex: 0,
            "data-testid": "popover-item",
            component: "button",
            onClick: function onClick() {
              setShowDropdown(false);
              setJoinRequestAccessLevel(request, accessLevel.id);
            },
            children: /*#__PURE__*/_jsx(AccessDescription, {
              id: accessLevel.id,
              image: accessLevel.icon,
              title: accessLevel.title,
              description: accessLevel.description
            })
          })
        }, accessLevel.id);
      })]
    }),
    children: /*#__PURE__*/_jsx(StyledDropdown, {
      "data-testid": "access-level-dropdown",
      "aria-label": "Choose access level",
      "aria-controls": requestId,
      "aria-expanded": showDropdown,
      children: request.accessLevel ? accessLevelName(request.accessLevel, t) : t('ACCESS_LEVEL_DROPDOWN_PLACEHOLDER', 'Choose', 'Choose an access level')
    })
  });
};