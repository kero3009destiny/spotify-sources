/* eslint-disable react/prop-types */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { PopoverNavigationItem } from '@spotify-internal/encore-web';
import { useCurrentArtist } from '../../../features/artists';
import { PopoverNavigationLinkAsLink } from '../../EncoreCreatorWebHelpers';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
export function NMSMenuItems(props) {
  var t = useT();
  var releaseWithState = props.release;
  var release = releaseWithState.release;
  var artist = useCurrentArtist();
  var albumId = release.id;

  switch (releaseWithState.state) {
    case 'DETAILS':
      {
        var url = "/artist/".concat(artist.id, "/submission/").concat(albumId, "/view?location=catalog");
        return /*#__PURE__*/_jsx(PopoverNavigationItem, {
          children: /*#__PURE__*/_jsx(PopoverNavigationLinkAsLink, {
            component: Link,
            to: url,
            className: "view",
            children: t('URP-349e2d', 'View playlist pitch', '')
          })
        }, "view-submission");
      }

    case 'REPLACE_NO_ACCESS_TO_SUBMISSION':
    case 'REPLACE':
      {
        var _url = "/artist/".concat(artist.id, "/submission/").concat(albumId, "/create?location=catalog");

        return /*#__PURE__*/_jsx(PopoverNavigationItem, {
          children: /*#__PURE__*/_jsx(PopoverNavigationLinkAsLink, {
            component: Link,
            to: _url,
            className: "replace",
            children: t('URP-b7b292', 'Replace current pitch', '')
          })
        }, "overwrite");
      }

    case 'SUBMIT':
      {
        var _url2 = "/artist/".concat(artist.id, "/submission/").concat(albumId, "/create?location=catalog");

        return /*#__PURE__*/_jsx(PopoverNavigationItem, {
          children: /*#__PURE__*/_jsx(PopoverNavigationLinkAsLink, {
            component: Link,
            to: _url2,
            className: "submit",
            children: t('URP-b244e7', 'Pitch a song', 'Pitch an upcoming song for spotify editorial playlist consideration.')
          })
        }, "submit");
      }

    default:
      return null;
  }
}