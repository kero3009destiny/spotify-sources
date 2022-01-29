import _defineProperty from "/var/jenkins_home/workspace/tingle.a145e465-b651-44f5-9906-e1b8a08e07b5/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.a145e465-b651-44f5-9906-e1b8a08e07b5/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { cssColorValue, TooltipTrigger, Tooltip, IconHelpAlt, IconCheck, IconChevronRight, gray10, spacer12 } from '@spotify-internal/encore-web';
import { NMSCellTemplate, SubmittedTrackCell } from './PrereleaseCells';
import { useT } from '@mrkt/features/i18n';
import { useTimeAgo } from '@mrkt/features/date-helpers';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyleSongSubmissionContainer = styled.div.withConfig({
  displayName: "NMSMobileCell__StyleSongSubmissionContainer",
  componentId: "j364zu-0"
})(["border-bottom:1px solid ", ";padding:", ";"], cssColorValue('decorativeSubdued'), spacer12);
var StyleSongSubmission = styled.div.withConfig({
  displayName: "NMSMobileCell__StyleSongSubmission",
  componentId: "j364zu-1"
})(["align-items:center;color:", ";display:flex;font-size:14px;justify-content:space-between;"], gray10);
export function NMSMobileCell(props) {
  var formatTimeAgo = useTimeAgo();
  var t = useT();
  var locked = {
    body: t('URP-756843', 'You already have a pitch', '')
  };
  var replace = {
    body: t('URP-756843', 'You already have a pitch', '')
  };
  var submit = {
    body: t('URP-112c45', 'Pitch a song to our playlist editors.', ''),
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
      showHelp = _React$useState2[0],
      setShowHelp = _React$useState2[1];

  var albumId = release.id;

  switch (releaseWithState.state) {
    case 'DETAILS':
      {
        var url = "/artist/".concat(artistId, "/submission/").concat(albumId, "/view?location=catalog");
        return /*#__PURE__*/_jsx(Link, {
          to: url,
          className: "overwrite-submission",
          children: /*#__PURE__*/_jsx(StyleSongSubmissionContainer, {
            children: /*#__PURE__*/_jsxs(StyleSongSubmission, {
              children: [/*#__PURE__*/_jsx("div", {
                children: /*#__PURE__*/_jsx(SubmittedTrackCell, {
                  submissionLocked: false,
                  submissionTimeAgo: formatTimeAgo(Number(submission.submission_epoch_ms)),
                  submitterName: submission.submitter_name,
                  submitterRole: submission.submitter_role || undefined,
                  trackName: submission.track_name,
                  hasPermissionToView: true
                })
              }), /*#__PURE__*/_jsx("div", {
                children: /*#__PURE__*/_jsx(IconCheck, {
                  semanticColor: "textBrightAccent"
                })
              })]
            })
          })
        });
      }

    case 'DETAILS_LOCKED':
      return /*#__PURE__*/_jsx(StyleSongSubmissionContainer, {
        children: /*#__PURE__*/_jsxs(StyleSongSubmission, {
          children: [/*#__PURE__*/_jsx("div", {
            children: /*#__PURE__*/_jsx(SubmittedTrackCell, {
              submissionLocked: true,
              submissionTimeAgo: formatTimeAgo(Number(submission.submission_epoch_ms)),
              submitterName: submission.submitter_name,
              submitterRole: submission.submitter_role || undefined,
              trackName: submission.track_name,
              hasPermissionToView: true
            })
          }), /*#__PURE__*/_jsx("div", {
            children: /*#__PURE__*/_jsx(IconCheck, {
              semanticColor: "textBrightAccent"
            })
          })]
        })
      });

    case 'DETAILS_NO_PERMISSION':
      return /*#__PURE__*/_jsx(StyleSongSubmissionContainer, {
        children: /*#__PURE__*/_jsxs(StyleSongSubmission, {
          children: [/*#__PURE__*/_jsx("div", {
            children: /*#__PURE__*/_jsx(SubmittedTrackCell, {
              submissionLocked: submission.locked,
              submissionTimeAgo: formatTimeAgo(Number(submission.submission_epoch_ms)),
              submitterName: submission.submitter_name,
              submitterRole: submission.submitter_role || undefined,
              trackName: submission.track_name,
              hasPermissionToView: false
            })
          }), /*#__PURE__*/_jsx("div", {
            children: /*#__PURE__*/_jsx(IconCheck, {
              semanticColor: "textBrightAccent"
            })
          })]
        })
      });

    case 'HAS_SUBMISSION_LOCKED':
      return /*#__PURE__*/_jsx(StyleSongSubmissionContainer, {
        children: /*#__PURE__*/_jsx(StyleSongSubmission, {
          children: /*#__PURE__*/_jsx(NMSCellTemplate, _objectSpread({}, locked))
        })
      });

    case 'INELIGIBLE':
      return /*#__PURE__*/_jsx(StyleSongSubmissionContainer, {
        children: /*#__PURE__*/_jsxs(StyleSongSubmission, {
          children: [/*#__PURE__*/_jsx("div", {
            children: /*#__PURE__*/_jsx(NMSCellTemplate, _objectSpread(_objectSpread({}, ineligible), {}, {
              semanticColor: "textSubdued"
            }))
          }), /*#__PURE__*/_jsx("div", {
            children: /*#__PURE__*/_jsx(TooltipTrigger, {
              isTouch: true,
              onShow: function onShow() {
                return setShowHelp(true);
              },
              onHide: function onHide() {
                return setShowHelp(false);
              },
              placement: TooltipTrigger.left,
              overlay: showHelp && /*#__PURE__*/_jsx(Tooltip, {
                children: t('URP-b82113', 'Pitch something that’s never been streamed on Spotify.', '')
              }),
              children: /*#__PURE__*/_jsx(IconHelpAlt, {
                semanticColor: "textSubdued"
              })
            })
          })]
        })
      });

    case 'NO_PERMISSION':
      return /*#__PURE__*/_jsx(StyleSongSubmissionContainer, {
        children: /*#__PURE__*/_jsx(StyleSongSubmission, {
          children: /*#__PURE__*/_jsx(NMSCellTemplate, _objectSpread({}, insufficientPermissions))
        })
      });

    case 'REPLACE':
      {
        var _url = "/artist/".concat(artistId, "/submission/").concat(albumId, "/create?location=catalog");

        return /*#__PURE__*/_jsx(Link, {
          to: _url,
          className: "overwrite-submission",
          children: /*#__PURE__*/_jsx(StyleSongSubmissionContainer, {
            children: /*#__PURE__*/_jsxs(StyleSongSubmission, {
              children: [/*#__PURE__*/_jsx(NMSCellTemplate, _objectSpread(_objectSpread({}, replace), {}, {
                semanticColor: "textSubdued"
              })), /*#__PURE__*/_jsx("div", {
                children: /*#__PURE__*/_jsx(IconChevronRight, {
                  semanticColor: "textSubdued"
                })
              })]
            })
          })
        });
      }

    case 'REPLACE_NO_ACCESS_TO_SUBMISSION':
      {
        var _url2 = "/artist/".concat(artistId, "/submission/").concat(albumId, "/create?location=catalog");

        return /*#__PURE__*/_jsx(Link, {
          to: _url2,
          className: "overwrite-submission",
          children: /*#__PURE__*/_jsx(StyleSongSubmissionContainer, {
            children: /*#__PURE__*/_jsxs(StyleSongSubmission, {
              children: [/*#__PURE__*/_jsx("div", {
                children: /*#__PURE__*/_jsx(TooltipTrigger, {
                  isTouch: true,
                  onShow: function onShow() {
                    return setShowHelp(true);
                  },
                  onHide: function onHide() {
                    return setShowHelp(false);
                  },
                  placement: TooltipTrigger.left,
                  overlay: showHelp && /*#__PURE__*/_jsx(Tooltip, {
                    children: t('URP-d8cde6', "This artist already has a pitch for a release you don't have access to.", '')
                  }),
                  children: /*#__PURE__*/_jsx(IconHelpAlt, {
                    semanticColor: "textSubdued"
                  })
                })
              }), /*#__PURE__*/_jsx(NMSCellTemplate, _objectSpread(_objectSpread({}, replace), {}, {
                semanticColor: "textSubdued"
              })), /*#__PURE__*/_jsx("div", {
                children: /*#__PURE__*/_jsx(IconChevronRight, {
                  semanticColor: "textSubdued"
                })
              })]
            })
          })
        });
      }

    case 'SUBMIT':
      {
        var _url3 = "/artist/".concat(artistId, "/submission/").concat(albumId, "/create?location=catalog");

        return /*#__PURE__*/_jsx(Link, {
          to: _url3,
          className: "submission-link",
          children: /*#__PURE__*/_jsx(StyleSongSubmissionContainer, {
            children: /*#__PURE__*/_jsxs(StyleSongSubmission, {
              children: [/*#__PURE__*/_jsx(NMSCellTemplate, _objectSpread({}, submit)), /*#__PURE__*/_jsx("div", {
                children: /*#__PURE__*/_jsx(IconChevronRight, {
                  semanticColor: "textSubdued"
                })
              })]
            })
          })
        });
      }

    case 'PENDING':
    case 'UNKNOWN_STATE':
      return /*#__PURE__*/_jsx(StyleSongSubmissionContainer, {
        children: /*#__PURE__*/_jsxs(StyleSongSubmission, {
          children: [/*#__PURE__*/_jsx("div", {
            children: /*#__PURE__*/_jsx(NMSCellTemplate, _objectSpread(_objectSpread({}, pending), {}, {
              semanticColor: "textSubdued"
            }))
          }), /*#__PURE__*/_jsx("div", {
            children: /*#__PURE__*/_jsx(TooltipTrigger, {
              isTouch: true,
              onShow: function onShow() {
                return setShowHelp(true);
              },
              onHide: function onHide() {
                return setShowHelp(false);
              },
              placement: TooltipTrigger.left,
              overlay: showHelp && /*#__PURE__*/_jsx(Tooltip, {
                children: t('URP-64e3b6', 'We’re checking if these tracks have ever been streamed on Spotify. Stay tuned.', '')
              }),
              children: /*#__PURE__*/_jsx(IconHelpAlt, {
                semanticColor: "textSubdued"
              })
            })
          })]
        })
      });
  }
}