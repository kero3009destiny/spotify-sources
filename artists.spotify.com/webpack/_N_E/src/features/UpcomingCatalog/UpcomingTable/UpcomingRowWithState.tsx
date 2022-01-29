import _slicedToArray from "/var/jenkins_home/workspace/tingle.a145e465-b651-44f5-9906-e1b8a08e07b5/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { TableRow, TableCell, TableThumbnail, Type, PopoverTrigger, ButtonIcon, IconMore, PopoverNavigation, TextLink } from '@spotify-internal/encore-web';
import { ErrorBoundary } from '@mrkt/features/Platform';
import { NMSTableCell } from '../Prerelease/NMSTableCell';
import { useCurrentArtist, useCurrentArtistPermissions, EDITOR } from '../../../features/artists';
import { EnhanceCell } from '../Enhance/EnhanceCell';
import { useEnhanceFeatures } from '../../enhanceFeatures';
import { useAlertDispatch } from '../../../shared/store';
import { NMSMenuItems } from '../Prerelease/NMSMenuItems';
import { daysToRelease, useGetReleaseString, useReleaseDateFormatter } from './formatters';
import { copy } from '@mrkt/features/copy-to-clipboard';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function computeHasMenuItems(state) {
  switch (state) {
    case 'DETAILS':
    case 'REPLACE':
    case 'SUBMIT':
    case 'REPLACE_NO_ACCESS_TO_SUBMISSION':
      return true;

    default:
      return false;
  }
}

export function UpcomingRowWithState(props) {
  var t = useT();

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      menuOpen = _React$useState2[0],
      setMenuOpen = _React$useState2[1];

  var releaseWithState = props.release,
      submission = props.submission;
  var release = releaseWithState.release;
  var setAlert = useAlertDispatch();

  var _useEnhanceFeatures = useEnhanceFeatures(),
      hasCanvasAccess = _useEnhanceFeatures.hasCanvasAccess,
      hasStorylineAccess = _useEnhanceFeatures.hasStorylineAccess;

  var hasEnhancedAccess = hasCanvasAccess || hasStorylineAccess; // TODO: remove with updates to permissioning

  var artist = useCurrentArtist();
  var permissions = useCurrentArtistPermissions();
  var daysUntilRelease = daysToRelease(new Date(release.release_date).getTime());
  var releasingString = useGetReleaseString(release.release_date, release.releasing_state);
  var releaseDate = useReleaseDateFormatter(release.release_date);
  var hasNMSMenuItem = computeHasMenuItems(releaseWithState.state);
  var releaseTypes = {
    album: t('URP-a0a2cb', 'Album', ''),
    single: t('URP-1bb8e4', 'Single', 'An album with only 1 track'),
    ep: t('URP-157102', 'Ep', 'An album with only a few tracks. EP stands for Extended Play')
  };
  return /*#__PURE__*/_jsxs(TableRow, {
    "data-slo-id": "upcoming-row-".concat(release.id),
    children: [/*#__PURE__*/_jsx(TableCell, {
      truncate: true,
      children: /*#__PURE__*/_jsx(TableThumbnail, {
        truncate: true,
        img: release.image_url,
        imgAlt: release.name,
        thumbnailTitle: release.name,
        subtitle: /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(Type, {
            condensed: true,
            variant: Type.body2,
            semanticColor: "textSubdued",
            children: releaseTypes[release.release_type]
          }), /*#__PURE__*/_jsx(Type, {
            condensed: true,
            variant: Type.body3,
            semanticColor: "textSubdued",
            children: /*#__PURE__*/_jsx(TextLink, {
              "data-copy-text": "spotify:album:".concat(release.id),
              onClick: function onClick(event) {
                return copy(event.currentTarget);
              },
              children: t('URP-copy-uri', 'Copy URI', "A button to click that will copy the Album URI to the user's clipboard")
            })
          }), daysUntilRelease <= 7 && daysUntilRelease >= 0 && releasingString && /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(Type, {
              condensed: true,
              semanticColor: "textSubdued",
              children: "\xA0\xB7\xA0"
            }), /*#__PURE__*/_jsx(Type, {
              semanticColor: "textAnnouncement",
              "data-testid": "upcoming-row--release-date-reminder",
              children: releasingString
            })]
          })]
        })
      })
    }), /*#__PURE__*/_jsx(TableCell, {
      children: /*#__PURE__*/_jsx(NMSTableCell, {
        artistId: artist.id,
        release: releaseWithState,
        submission: submission
      })
    }), hasEnhancedAccess && /*#__PURE__*/_jsx(TableCell, {
      children: /*#__PURE__*/_jsx(ErrorBoundary, {
        name: "enhance-upcoming-release",
        fallback: null,
        children: /*#__PURE__*/_jsx(EnhanceCell, {
          "data-testid": "upcoming-row--enhanced-cell",
          artist: artist,
          hasEditAccess: permissions.includes(EDITOR),
          hasCanvasAccess: hasCanvasAccess,
          hasStorylinesAccess: hasStorylineAccess,
          parentUri: "spotify:album:".concat(release.id),
          parentName: release.name,
          parentType: release.release_type,
          dialogRootRef: props.dialogRootRef,
          setAlert: setAlert
        })
      })
    }), /*#__PURE__*/_jsx(TableCell, {
      align: "right",
      numerical: true,
      children: releaseDate
    }), /*#__PURE__*/_jsx(TableCell, {
      children: hasNMSMenuItem && /*#__PURE__*/_jsx(PopoverTrigger, {
        "data-qa": "more-trigger",
        className: "tooltip",
        placement: PopoverTrigger.topLeft,
        onShow: function onShow() {
          return setMenuOpen(true);
        },
        onHide: function onHide() {
          return setMenuOpen(false);
        },
        overlay: menuOpen && /*#__PURE__*/_jsx(PopoverNavigation, {
          onClick: function onClick(e) {
            e.stopPropagation();
            setMenuOpen(false);
          },
          arrow: PopoverNavigation.bottomRight,
          children: /*#__PURE__*/_jsx(NMSMenuItems, {
            release: releaseWithState
          })
        }),
        children: /*#__PURE__*/_jsx(ButtonIcon, {
          "data-testid": "upcoming-row--menu",
          children: /*#__PURE__*/_jsx(IconMore, {})
        })
      })
    })]
  });
}