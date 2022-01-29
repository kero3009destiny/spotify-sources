import _defineProperty from "/var/jenkins_home/workspace/tingle.a145e465-b651-44f5-9906-e1b8a08e07b5/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.a145e465-b651-44f5-9906-e1b8a08e07b5/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint-disable react/prop-types */
import * as React from 'react';
import { IconCheck, TooltipTrigger, Tooltip, spacer8, spacer20 } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { NMSCellTemplate, SubmittedTrackCell, SubmitATrackCell } from './PrereleaseCells';
import { useT } from '@mrkt/features/i18n';
import { useTimeAgo } from '@mrkt/features/date-helpers';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var PrereleaseCell = styled.div.withConfig({
  displayName: "NMSTableCell__PrereleaseCell",
  componentId: "tnn8nx-0"
})(["position:relative;max-width:250px;padding-right:", ";"], spacer20);
var OffsetCheck = styled.div.withConfig({
  displayName: "NMSTableCell__OffsetCheck",
  componentId: "tnn8nx-1"
})(["position:absolute;left:-", ";top:0;transform:translateX(-100%);"], spacer8); // eslint-disable-next-line @typescript-eslint/no-redeclare

export function NMSTableCell(props) {
  var formatTimeAgo = useTimeAgo();
  var t = useT();
  var locked = {
    body: t('URP-756843', 'You already have a pitch', '')
  };
  var replace = {
    body: t('URP-756843', 'You already have a pitch', '')
  };
  var submit = {
    headline: t('URP-90b1d0', 'Get heard by our editors', ''),
    cta: t('URP-f74baf', 'Pitch a song', '')
  };
  var insufficientPermissions = {
    body: t('URP-2345c6', "You don't have permission to submit from this release.", '')
  };
  var ineligible = {
    body: t('URP-9a55ce', 'Not eligible to pitch', '')
  };
  var pending = {
    body: t('URP-2b280d', 'Available soon', '')
  };
  var releaseWithState = props.release,
      submission = props.submission,
      artistId = props.artistId;
  var release = releaseWithState.release;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      showTooltip = _React$useState2[0],
      setShowTooltip = _React$useState2[1];

  var albumId = release.id;

  switch (releaseWithState.state) {
    case 'DETAILS':
      return /*#__PURE__*/_jsxs(PrereleaseCell, {
        children: [/*#__PURE__*/_jsx(OffsetCheck, {
          children: /*#__PURE__*/_jsx(IconCheck, {
            semanticColor: "textBrightAccent"
          })
        }), /*#__PURE__*/_jsx(SubmittedTrackCell, {
          submissionLocked: false,
          submissionTimeAgo: formatTimeAgo(Number(submission.submission_epoch_ms)),
          trackName: submission.track_name,
          submitterName: submission.submitter_name,
          submitterRole: submission.submitter_role || undefined,
          hasPermissionToView: true
        })]
      });

    case 'DETAILS_LOCKED':
      return /*#__PURE__*/_jsxs(PrereleaseCell, {
        children: [/*#__PURE__*/_jsx(OffsetCheck, {
          children: /*#__PURE__*/_jsx(IconCheck, {
            semanticColor: "textBrightAccent"
          })
        }), /*#__PURE__*/_jsx(SubmittedTrackCell, {
          submissionLocked: true,
          submissionTimeAgo: formatTimeAgo(Number(submission.submission_epoch_ms)),
          trackName: submission.track_name,
          submitterName: submission.submitter_name,
          submitterRole: submission.submitter_role || undefined,
          hasPermissionToView: true
        })]
      });

    case 'DETAILS_NO_PERMISSION':
      return /*#__PURE__*/_jsxs(PrereleaseCell, {
        children: [/*#__PURE__*/_jsx(OffsetCheck, {
          children: /*#__PURE__*/_jsx(IconCheck, {
            semanticColor: "textBrightAccent"
          })
        }), /*#__PURE__*/_jsx(SubmittedTrackCell, {
          submissionLocked: submission.locked,
          submissionTimeAgo: formatTimeAgo(Number(submission.submission_epoch_ms)),
          trackName: submission.track_name,
          submitterName: submission.submitter_name,
          submitterRole: submission.submitter_role || undefined,
          hasPermissionToView: false
        })]
      });
    // locked submission that isn't on this release

    case 'HAS_SUBMISSION_LOCKED':
      return /*#__PURE__*/_jsx(PrereleaseCell, {
        children: /*#__PURE__*/_jsx(NMSCellTemplate, _objectSpread(_objectSpread({}, locked), {}, {
          semanticColor: "textSubdued"
        }))
      });

    case 'INELIGIBLE':
      return /*#__PURE__*/_jsx(TooltipTrigger, {
        onShow: function onShow() {
          return setShowTooltip(true);
        },
        onHide: function onHide() {
          return setShowTooltip(false);
        },
        placement: TooltipTrigger.top,
        overlay: showTooltip && /*#__PURE__*/_jsx(Tooltip, {
          style: {
            maxWidth: 'none',
            width: '310px'
          },
          children: t('URP-b82113', 'Pitch something that’s never been streamed on Spotify.', '')
        }),
        children: /*#__PURE__*/_jsx(PrereleaseCell, {
          children: /*#__PURE__*/_jsx(NMSCellTemplate, _objectSpread(_objectSpread({}, ineligible), {}, {
            semanticColor: "textSubdued"
          }))
        })
      });

    case 'NO_PERMISSION':
      return /*#__PURE__*/_jsx(PrereleaseCell, {
        children: /*#__PURE__*/_jsx(NMSCellTemplate, _objectSpread({}, insufficientPermissions))
      });

    case 'REPLACE':
      return /*#__PURE__*/_jsx(PrereleaseCell, {
        children: /*#__PURE__*/_jsx(NMSCellTemplate, _objectSpread(_objectSpread({}, replace), {}, {
          semanticColor: "textSubdued"
        }))
      });
    // artist has a submission, but you can't see it. But can replace it.

    case 'REPLACE_NO_ACCESS_TO_SUBMISSION':
      return /*#__PURE__*/_jsx(TooltipTrigger, {
        onShow: function onShow() {
          return setShowTooltip(true);
        },
        onHide: function onHide() {
          return setShowTooltip(false);
        },
        placement: TooltipTrigger.top,
        overlay: showTooltip && /*#__PURE__*/_jsx(Tooltip, {
          style: {
            maxWidth: 'none',
            width: '310px'
          },
          children: t('URP-1d5414', 'This artist already has a pitch for a release you don’t have access to.', '')
        }),
        children: /*#__PURE__*/_jsx(PrereleaseCell, {
          children: /*#__PURE__*/_jsx(NMSCellTemplate, _objectSpread(_objectSpread({}, replace), {}, {
            semanticColor: "textSubdued"
          }))
        })
      });

    case 'SUBMIT':
      {
        var url = "/artist/".concat(artistId, "/submission/").concat(albumId, "/create?location=catalog");
        return /*#__PURE__*/_jsx(PrereleaseCell, {
          children: /*#__PURE__*/_jsx(SubmitATrackCell, _objectSpread(_objectSpread({}, submit), {}, {
            url: url
          }))
        });
      }

    case 'PENDING':
    case 'UNKNOWN_STATE':
    default:
      return /*#__PURE__*/_jsx(TooltipTrigger, {
        onShow: function onShow() {
          return setShowTooltip(true);
        },
        onHide: function onHide() {
          return setShowTooltip(false);
        },
        placement: TooltipTrigger.top,
        overlay: showTooltip && /*#__PURE__*/_jsx(Tooltip, {
          style: {
            maxWidth: 'none',
            width: '310px'
          },
          children: t('URP-64e3b6', 'We’re checking if these tracks have ever been streamed on Spotify. Stay tuned.', '')
        }),
        children: /*#__PURE__*/_jsx(PrereleaseCell, {
          children: /*#__PURE__*/_jsx(NMSCellTemplate, _objectSpread(_objectSpread({}, pending), {}, {
            semanticColor: "textSubdued"
          }))
        })
      });
  }
}