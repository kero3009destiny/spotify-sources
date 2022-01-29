import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { ButtonTertiary, DialogAlert, Popover, Table, TableRow, TableCell, TableHeaderCell, Type, LoadingIndicator, spacer20, spacer12, spacer16, spacer40, screenSmMin } from '@spotify-internal/encore-web';
import { useTeamStore } from '../lib/store/useTeamStore';
import { accessLevelName, groupsToAccessLevel } from '../lib';
import { useT } from '@mrkt/features/i18n';
import { IconBadgeWithText } from '../components/IconBadge/IconBadgeWithText';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var baseShadowStyles = function baseShadowStyles() {
  return css(["transition:opacity 0.2s;position:sticky;content:'';display:block;margin-left:-", ";width:calc(100% + ", ");min-height:", ";z-index:1;"], spacer20, spacer40, spacer12);
};

var MembersPopover = styled(Popover).withConfig({
  displayName: "TeamMembersPopover__MembersPopover",
  componentId: "rl9smu-0"
})(["display:flex;flex-direction:column;width:600px;max-width:calc(100% - ", ");min-height:300px;max-height:90vh;overflow:hidden;border-bottom:0;@media (min-width:", "){max-height:80vh;}"], spacer40, screenSmMin);
var ScrollContainer = styled.div.withConfig({
  displayName: "TeamMembersPopover__ScrollContainer",
  componentId: "rl9smu-1"
})(["overflow-y:auto;margin-left:-", ";margin-right:-", ";padding-left:", ";padding-right:", ";margin-bottom:-", ";flex:1;display:flex;flex-direction:column;&::before{", ";top:0;background-image:linear-gradient( to bottom,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0) 100% );opacity:", ";}&::after{", ";bottom:0;background-image:linear-gradient( to top,rgba(255,255,255,0.3) 0%,rgba(255,255,255,0) 100% );opacity:", ";}"], spacer20, spacer20, spacer20, spacer20, spacer16, baseShadowStyles(), function (props) {
  return props.isScrolledTop ? 1 : 0;
}, baseShadowStyles(), function (props) {
  return props.isScrolledBottom ? 1 : 0;
});
export var TeamMembersPopover = function TeamMembersPopover(_ref) {
  var onClose = _ref.onClose;

  var _useTeamStore = useTeamStore(),
      _useTeamStore$artists = _useTeamStore.artistsTab,
      artistTeamMembers = _useTeamStore$artists.artistTeamMembers,
      currentArtistTeam = _useTeamStore$artists.currentArtistTeam;

  var t = useT();

  var _useState = useState(false),
      isScrolledTop = _useState[0],
      setScrollTop = _useState[1];

  var _useState2 = useState(false),
      isScrolledBottom = _useState2[0],
      setScrollBottom = _useState2[1];

  var ref = useRef(null);

  var setScrollState = function setScrollState() {
    var element = ref.current;

    if (element) {
      setScrollTop(element.scrollTop !== 0);
      setScrollBottom(element.scrollHeight - element.scrollTop !== element.clientHeight);
    }
  };
  /* Apply shadow effect on component render */


  useEffect(function () {
    setScrollState();
  });

  if (!currentArtistTeam || !artistTeamMembers) {
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  if (artistTeamMembers.length === 0) {
    return /*#__PURE__*/_jsx(DialogAlert, {
      body: /*#__PURE__*/_jsx(Type, {
        as: "p",
        condensed: true,
        children: t('ARTISTS_TAB_NO_TEAM_MEMBERS_DIALOG', "There's no one on this team.", 'There are no team members on this team')
      }),
      footer: /*#__PURE__*/_jsx(ButtonTertiary, {
        buttonSize: ButtonTertiary.sm,
        semanticColor: "textBrightAccent",
        condensed: true,
        onClick: onClose,
        children: t('ARTISTS_TAB_NO_TEAM_MEMBERS_DIALOG_DISMISS', 'Ok', 'Dismiss this dialog')
      })
    });
  }

  return /*#__PURE__*/_jsx(MembersPopover, {
    onClose: onClose,
    popoverTitle: t('ARTISTS_TAB_TEAM_MEMBERS_POPOVER_TITLE', '{teamName} - Team members', 'Team member popover title', {
      teamName: currentArtistTeam.name
    }),
    "data-testid": "team-members",
    children: /*#__PURE__*/_jsx(ScrollContainer, {
      ref: ref,
      isScrolledTop: isScrolledTop,
      isScrolledBottom: isScrolledBottom,
      onScroll: setScrollState,
      children: /*#__PURE__*/_jsxs(Table, {
        children: [/*#__PURE__*/_jsx("thead", {
          children: /*#__PURE__*/_jsxs(TableRow, {
            children: [/*#__PURE__*/_jsx(TableHeaderCell, {
              "data-testid": "team-member-name",
              children: t('ARTISTS_TAB_TEAM_MEMBERS_POPOVER_NAME_TABLE_HEADER', 'Name', 'Team member table header for the name of the team member')
            }), /*#__PURE__*/_jsx(TableHeaderCell, {
              align: "right",
              "data-testid": "team-member-access",
              children: t('ARTISTS_TAB_TEAM_MEMBERS_POPOVER_ACCESS_TABLE_HEADER', 'Access', "Team member table header for the team member's access level on the team")
            })]
          })
        }), /*#__PURE__*/_jsx("tbody", {
          children: artistTeamMembers.map(function (teamMember) {
            return /*#__PURE__*/_jsxs(TableRow, {
              children: [/*#__PURE__*/_jsx(TableCell, {
                children: /*#__PURE__*/_jsx(IconBadgeWithText, {
                  text: teamMember.fullName || teamMember.userName
                })
              }), /*#__PURE__*/_jsx(TableCell, {
                align: "right",
                children: accessLevelName(groupsToAccessLevel(teamMember.groups), t)
              })]
            }, teamMember.fullName);
          })
        })]
      })
    })
  });
};