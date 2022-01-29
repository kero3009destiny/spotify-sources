import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

var _TYPE_TO_COLORS;

import * as React from 'react';
import styled, { css } from 'styled-components';
import throttle from 'lodash/throttle';
import { Link } from 'react-router-dom';
import { black, gray75, white, Tooltip } from '@spotify-internal/encore-web-v3';
import { dataDarkBlue } from '@mrkt/features/creator-color-tokens';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { useT } from '@mrkt/features/i18n';
import { useRtl } from '@mrkt/features/i18n/hooks/useRtl';
import { AnnotationType } from '../types';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var ANNOTATIONS_LEFT_MARGIN = 48;
var TYPE_TO_COLORS = (_TYPE_TO_COLORS = {}, _defineProperty(_TYPE_TO_COLORS, AnnotationType.PLAYLIST_ADD, dataDarkBlue), _defineProperty(_TYPE_TO_COLORS, AnnotationType.MANUAL_ANNOTATION, dataDarkBlue), _TYPE_TO_COLORS);
var sendEventThrottled = throttle(sendEvent, 250);
var StyledContainer = styled.div.withConfig({
  displayName: "AnnotationTooltip__StyledContainer",
  componentId: "w5v5yc-0"
})(["position:absolute;transform:translate(-50%,-28px);z-index:50;", ";"], function (props) {
  return props.isRtl ? css(["right:", "px;"], props.horizontalPos) : css(["left:", "px;;"], props.horizontalPos);
});
var StyledInner = styled.div.withConfig({
  displayName: "AnnotationTooltip__StyledInner",
  componentId: "w5v5yc-1"
})(["width:140px;"]);
var StyledLabel = styled.div.withConfig({
  displayName: "AnnotationTooltip__StyledLabel",
  componentId: "w5v5yc-2"
})(["color:", ";display:inline-block;font-size:10px;letter-spacing:1px;line-height:1em;padding:5px;text-transform:uppercase;background-color:", ";"], white, function (props) {
  return props.backgroundColor;
});
var StyledList = styled.div.withConfig({
  displayName: "AnnotationTooltip__StyledList",
  componentId: "w5v5yc-3"
})(["margin-top:5px;"]);
var StyledCount = styled.div.withConfig({
  displayName: "AnnotationTooltip__StyledCount",
  componentId: "w5v5yc-4"
})(["color:", ";text-decoration:none;"], gray75);
var StyledListItem = styled.div.withConfig({
  displayName: "AnnotationTooltip__StyledListItem",
  componentId: "w5v5yc-5"
})(["overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"]);
var StyledLink = styled(Link).withConfig({
  displayName: "AnnotationTooltip__StyledLink",
  componentId: "w5v5yc-6"
})(["text-decoration:none;&:hover{color:", ";", "{text-decoration:underline;}}"], black, StyledListItem);
export function AnnotationTooltip(props) {
  var _TYPE_TO_TEXT;

  var artist = props.artist,
      _props$data = props.data,
      count = _props$data.count,
      hideLink = _props$data.hideLink,
      metadata = _props$data.metadata,
      type = _props$data.type,
      onMouseLeave = props.onMouseLeave,
      left = props.left;
  var t = useT();
  var rtl = useRtl();
  var tooltipPosition = left + ANNOTATIONS_LEFT_MARGIN - 7;
  var moreItems = count - metadata.length;
  var TYPE_TO_TEXT = (_TYPE_TO_TEXT = {}, _defineProperty(_TYPE_TO_TEXT, AnnotationType.PLAYLIST_ADD, t('ANNOTATION_TOOLTIP_ce6359', 'Added To Playlists', 'This is a heading for a tooltip that appears when a user hovers over a certain a date in a timeline chart. Under the heading are 1 or more playlist titles, and these titles link to the Playlists page in the Music section. Example: "on Monday, July 21st you had 1 or more songs added to this/these playlist(s)".')), _defineProperty(_TYPE_TO_TEXT, AnnotationType.MANUAL_ANNOTATION, t('ANNOTATION_TOOLTIP_741e84', 'Annotation', '')), _TYPE_TO_TEXT);

  function renderTooltipContent(content) {
    return hideLink ? content : /*#__PURE__*/_jsx(StyledLink, {
      to: "/artist/".concat(artist.id, "/music/playlists"),
      onClick: function onClick() {
        return sendEventThrottled({
          eventCategory: 'ArtistAudienceTimeline',
          eventAction: 'clickPlaylistAnnotation',
          eventLabel: artist.name
        });
      },
      children: content
    });
  }

  return /*#__PURE__*/_jsx(StyledContainer, {
    onMouseLeave: onMouseLeave,
    horizontalPos: tooltipPosition,
    isRtl: rtl,
    children: /*#__PURE__*/_jsx(Tooltip, {
      "data-testid": "annotation-tooltip",
      children: renderTooltipContent( /*#__PURE__*/_jsxs(StyledInner, {
        children: [/*#__PURE__*/_jsx(StyledLabel, {
          backgroundColor: TYPE_TO_COLORS[type],
          children: TYPE_TO_TEXT[type]
        }), /*#__PURE__*/_jsx(StyledList, {
          children: metadata.map(function (entry) {
            return /*#__PURE__*/_jsx(StyledListItem, {
              children: entry.name
            }, entry.uri);
          })
        }), count > 3 && /*#__PURE__*/_jsx(StyledCount, {
          children: t('ANNOTATION_TOOLTIP_caaf2c', 'and {moreItems} more.', '{moreItems} refers to other playlists that are not explicitly listed. This appears in a tooltip.', {
            moreItems: moreItems
          })
        })]
      }))
    })
  });
}