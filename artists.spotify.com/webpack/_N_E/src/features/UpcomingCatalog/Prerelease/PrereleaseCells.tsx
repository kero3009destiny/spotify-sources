import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Type, gray50, cssColorValue } from '@spotify-internal/encore-web';
import { ButtonTertiaryAsLink } from '../../EncoreCreatorWebHelpers';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var OverflowTitle = styled(Type.h2).withConfig({
  displayName: "PrereleaseCells__OverflowTitle",
  componentId: "sc-1s8i4q6-0"
})(["font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"]);
var GrayLink = styled.a.withConfig({
  displayName: "PrereleaseCells__GrayLink",
  componentId: "sc-1s8i4q6-1"
})(["color:", ";text-decoration:underline;&:hover{color:", ";}"], cssColorValue('backgroundPress'), gray50);

var formatSubmittedByString = function formatSubmittedByString(t, submissionTimeAgo, submitter, submitterRole) {
  if (submitter) {
    if (submitterRole && submitterRole !== 'Other') {
      return t('URP-pitchedby-full', "Pitched {submissionTimeAgo} by {submitter} ({submitterRole})", 'How long ago a user pitched, by whom (their full name), and their role on the team', {
        submitter: submitter,
        submitterRole: submitterRole,
        submissionTimeAgo: submissionTimeAgo
      });
    }

    return t('URP-pitchedby-short', "Pitched {submissionTimeAgo} by {submitter}", 'How long ago a user pitched and by whom (their full name)', {
      submitter: submitter,
      submissionTimeAgo: submissionTimeAgo
    });
  }

  return t('URP-f65201', 'Pitched {submissionTimeAgo}', 'This describes how long ago the user pitched', {
    submissionTimeAgo: submissionTimeAgo
  });
};

export var NMSCellTemplate = function NMSCellTemplate(_ref) {
  var headline = _ref.headline,
      body = _ref.body,
      semanticColor = _ref.semanticColor;
  return /*#__PURE__*/_jsxs("div", {
    children: [headline && /*#__PURE__*/_jsx(Type.p, {
      condensed: true,
      variant: Type.body2,
      weight: Type.bold,
      semanticColor: semanticColor,
      children: headline
    }), /*#__PURE__*/_jsx(Type.p, {
      condensed: true,
      variant: Type.body2,
      semanticColor: semanticColor || 'textBase',
      children: body
    })]
  });
};
export var SubmittedTrackCell = function SubmittedTrackCell(props) {
  var t = useT();
  return /*#__PURE__*/_jsxs(Fragment, {
    children: [/*#__PURE__*/_jsx(OverflowTitle, {
      variant: Type.body2,
      condensed: true,
      children: /*#__PURE__*/_jsx("strong", {
        children: props.trackName
      })
    }), /*#__PURE__*/_jsx(Type.p, {
      variant: Type.body2,
      semanticColor: "textSubdued",
      condensed: true,
      children: formatSubmittedByString(t, props.submissionTimeAgo, props.submitterName, props.submitterRole)
    }), props.submissionLocked && /*#__PURE__*/_jsxs(Type.p, {
      condensed: props.hasPermissionToView,
      variant: Type.body3,
      semanticColor: "textSubdued",
      children: [t('URP-423be7', 'Only your label can see pitch details. ', ''), /*#__PURE__*/_jsx(GrayLink, {
        href: "/help/article/pitching-music-to-playlist-editors",
        target: "_blank",
        rel: "noopener noreferrer",
        children: t('URP-b78e4a', 'Learn more', '')
      })]
    }), !props.hasPermissionToView && /*#__PURE__*/_jsx(Type.p, {
      condensed: true,
      variant: Type.body3,
      semanticColor: "textSubdued",
      style: {
        paddingTop: '1em'
      },
      children: t('URP-865d76', "You don't have permission to view this pitch.", '')
    })]
  });
};
export var SubmitATrackCell = function SubmitATrackCell(props) {
  return /*#__PURE__*/_jsxs(Fragment, {
    children: [/*#__PURE__*/_jsx(Type.p, {
      variant: Type.body2,
      condensed: true,
      children: props.headline
    }), /*#__PURE__*/_jsx(ButtonTertiaryAsLink, {
      condensed: true,
      semanticColor: "textBrightAccent",
      buttonSize: "sm",
      to: props.url,
      onClick: props.onClick,
      children: props.cta
    })]
  });
};