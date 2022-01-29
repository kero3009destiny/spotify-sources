// ignore-string-externalization
import * as React from 'react';
import styled from 'styled-components';
import { cssColorValue, Image, Type, IconAlbum, gray50, spacer12, spacer16 } from '@spotify-internal/encore-web';
import { NMSMobileCell } from '../Prerelease/NMSMobileCell';
import { useCurrentArtist } from '../../../features/artists';
import { useGetReleaseString, daysToRelease } from './formatters';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var THUMB_SMALL = '64px';
var Placeholder = styled.div.withConfig({
  displayName: "UpcomingRowMobileWithState__Placeholder",
  componentId: "sc-1quzl9r-0"
})(["color:", ";background:", ";display:flex;height:", ";justify-content:center;align-items:center;width:", ";"], gray50, cssColorValue('backgroundHighlight'), THUMB_SMALL, THUMB_SMALL);
var EntityLayout = styled.div.withConfig({
  displayName: "UpcomingRowMobileWithState__EntityLayout",
  componentId: "sc-1quzl9r-1"
})(["display:flex;font-size:14px;color:", ";border-bottom:1px solid ", ";padding:", ";align-items:center;"], cssColorValue('textSubdued'), cssColorValue('decorativeSubdued'), spacer12);
var Entity = styled.div.withConfig({
  displayName: "UpcomingRowMobileWithState__Entity",
  componentId: "sc-1quzl9r-2"
})(["flex:1;min-width:0;margin-left:", ";"], spacer16);
export function UpcomingRowMobileWithState(props) {
  var releaseWithState = props.release,
      submission = props.submission;
  var release = releaseWithState.release;
  var artist = useCurrentArtist();
  var releasingString = useGetReleaseString(release.release_date, release.releasing_state);
  var daysUntilRelease = daysToRelease(new Date(release.release_date).getTime());
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(EntityLayout, {
      children: [release.image_url && /*#__PURE__*/_jsx(Image, {
        imageHeight: THUMB_SMALL,
        src: release.image_url
      }), !release.image_url && /*#__PURE__*/_jsx(Placeholder, {
        children: /*#__PURE__*/_jsx(IconAlbum, {
          iconSize: 48
        })
      }), /*#__PURE__*/_jsxs(Entity, {
        children: [/*#__PURE__*/_jsx(Type, {
          as: "h3",
          condensed: true,
          weight: "bold",
          semanticColor: "textBase",
          children: release.name
        }), /*#__PURE__*/_jsx(Type, {
          style: {
            textTransform: 'capitalize'
          },
          children: release.release_type
        }), daysUntilRelease > 0 && releasingString && /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(Type, {
            condensed: true,
            semanticColor: "textSubdued",
            children: "\xA0\xB7\xA0"
          }), /*#__PURE__*/_jsx(Type, {
            semanticColor: "textAnnouncement",
            children: releasingString
          })]
        })]
      })]
    }), /*#__PURE__*/_jsx(NMSMobileCell, {
      artistId: artist.id,
      release: releaseWithState,
      submission: submission
    })]
  });
}