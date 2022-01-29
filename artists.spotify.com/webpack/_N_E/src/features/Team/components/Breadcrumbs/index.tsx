import React, { useRef, useEffect } from 'react';
import { IconChevronRight, Type, screenSmMin, spacer12, spacer16, spacer20, spacer24 } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { useT } from '@mrkt/features/i18n';
import { useWebTeamBreadcrumbLinkLogger } from '../../lib/hooks/useWebTeamUbi';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledBreadcrumbContainer = styled.div.withConfig({
  displayName: "Breadcrumbs__StyledBreadcrumbContainer",
  componentId: "sc-13kq9mi-0"
})(["display:flex;align-items:center;"]);
var StyledLink = styled(Link).withConfig({
  displayName: "Breadcrumbs__StyledLink",
  componentId: "sc-13kq9mi-1"
})(["text-decoration:none;margin-right:", ";"], spacer12);
var StyledChevronRightIcon = styled(IconChevronRight).withConfig({
  displayName: "Breadcrumbs__StyledChevronRightIcon",
  componentId: "sc-13kq9mi-2"
})(["height:", ";width:", ";margin-right:", ";"], spacer12, spacer12, spacer12);
export var StyledBreadcrumbs = styled.div.withConfig({
  displayName: "Breadcrumbs__StyledBreadcrumbs",
  componentId: "sc-13kq9mi-3"
})(["display:flex;position:relative;margin-bottom:", ";white-space:nowrap;overflow-y:auto;min-height:", ";@media (max-width:", "){margin-top:", ";}"], spacer16, spacer24, screenSmMin, spacer20);

var textOverflow = function textOverflow(text) {
  if (text.length <= 30) {
    return text;
  }

  var slicedText = text.slice(0, 30);
  return "".concat(slicedText, "...");
};

export var Breadcrumbs = function Breadcrumbs(props) {
  var scrollRef = useRef(null);
  useEffect(function () {
    if (!scrollRef.current) {
      return;
    }

    scrollRef.current.scrollLeft = 100000;
  }, [scrollRef]);
  return /*#__PURE__*/_jsx(StyledBreadcrumbs, {
    ref: scrollRef,
    children: props.children
  });
};

var Breadcrumb = function Breadcrumb(_ref) {
  var to = _ref.to,
      label = _ref.label;
  var logBreadcrumbNavigate = useWebTeamBreadcrumbLinkLogger('/team/roster');
  return /*#__PURE__*/_jsxs(StyledBreadcrumbContainer, {
    children: [/*#__PURE__*/_jsx(StyledLink, {
      to: to,
      onClick: logBreadcrumbNavigate,
      children: /*#__PURE__*/_jsx(Type, {
        as: "p",
        condensed: true,
        variant: Type.cta4,
        semanticColor: "textSubdued",
        children: textOverflow(label)
      })
    }), /*#__PURE__*/_jsx(StyledChevronRightIcon, {
      semanticColor: "textSubdued"
    })]
  });
};

export var TeamRosterBreadcrumb = function TeamRosterBreadcrumb() {
  var _useTeamStore = useTeamStore(),
      teams = _useTeamStore.teams;

  var t = useT();

  if (teams && teams.length === 1) {
    return null;
  }

  return /*#__PURE__*/_jsx(Breadcrumb, {
    to: "/team/roster",
    label: t('BREADCRUMB_YOUR_TEAMS', 'Your Teams', 'Link back to Your Teams page')
  });
};
export var TeamBreadcrumb = function TeamBreadcrumb(_ref2) {
  var team = _ref2.team;
  return /*#__PURE__*/_jsx(Breadcrumb, {
    to: "/team/".concat(team.type, "/").concat(team.id),
    label: team.name
  });
};