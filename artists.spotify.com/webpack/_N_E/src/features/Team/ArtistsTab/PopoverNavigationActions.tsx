import React, { useState } from 'react';
import { PopoverTrigger, PopoverNavigation, ButtonIcon, IconMore, PopoverNavigationItem, PopoverNavigationLink } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { useArtistsTabManageArtistButtonLogger, useArtistsTabSeeTeamMembersButtonLogger } from './hooks/useArtistsTabUbi';
import { jsx as _jsx } from "react/jsx-runtime";
export var PopoverNavigationActions = function PopoverNavigationActions(_ref) {
  var openTeamMembersPopover = _ref.openTeamMembersPopover;

  var _useState = useState(false),
      navigationIsOpen = _useState[0],
      setNavigationIsOpen = _useState[1];

  var t = useT();
  var logManageArtistButtonClick = useArtistsTabManageArtistButtonLogger();
  var logSeeTeamMembersButtonClick = useArtistsTabSeeTeamMembersButtonLogger();

  var onOpenTeamMembersPopover = function onOpenTeamMembersPopover() {
    setNavigationIsOpen(false);
    openTeamMembersPopover();
    logSeeTeamMembersButtonClick();
  };

  return /*#__PURE__*/_jsx(PopoverTrigger, {
    placement: "bottomLeft",
    onShow: function onShow() {
      setNavigationIsOpen(true);
      logManageArtistButtonClick();
    },
    onHide: function onHide() {
      return setNavigationIsOpen(false);
    },
    overlay: navigationIsOpen && /*#__PURE__*/_jsx(PopoverNavigation, {
      arrow: "topRight",
      children: /*#__PURE__*/_jsx(PopoverNavigationItem, {
        children: /*#__PURE__*/_jsx(PopoverNavigationLink, {
          component: "button",
          "data-testid": "see-team",
          onClick: onOpenTeamMembersPopover,
          children: t('ARTISTS_TAB_ACTION_SEE_TEAM', 'See team members', 'See the team members for this artist team')
        })
      })
    }),
    children: /*#__PURE__*/_jsx(ButtonIcon, {
      "data-testid": "more",
      children: /*#__PURE__*/_jsx(IconMore, {
        "aria-label": "Manage artist team"
      })
    })
  });
};