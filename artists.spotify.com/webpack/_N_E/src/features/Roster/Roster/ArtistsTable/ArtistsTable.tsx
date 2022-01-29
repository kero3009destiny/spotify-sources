import _defineProperty from "/var/jenkins_home/workspace/tingle.95d1c772-977c-47f0-ae13-caaa6a239f46/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.95d1c772-977c-47f0-ae13-caaa6a239f46/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableRow, TableHeaderCell, TableCell, TableSortIcon, TablePagination, PaginationControls, IconHelpAlt, Tooltip, spacer4, ButtonIcon } from '@spotify-internal/encore-web';
import { BadgeWithText } from '@mrkt/features/badge';
import { TooltipTrigger } from '@mrkt/features/TooltipTrigger';
import { useRosterSearch } from '../data/useRosterSearch';
import { usePitchActionArtistId } from '../data/usePitchActionArtistId';
import { Forbidden } from './Forbidden';
import { PitchCell } from './PitchCell';
import { DateCell } from './DateCell';
import { TimeAgo } from './TimeAgo';
import { useRosterSearchParams } from '../data/useRosterSearchParams';
import { useT } from '@mrkt/features/i18n';
import { useRosterNavigateToArtistPageLogger, useRosterPaginationNextLogger, useRosterPaginationPreviousLogger, useRosterPitchHeaderTooltipLogger } from '../logging/useRosterUbi';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function PitchHelpTooltip(props) {
  var t = useT();
  var placement = props.isMobile ? 'bottom' : 'right';
  var logTooltipMouseover = useRosterPitchHeaderTooltipLogger();
  return /*#__PURE__*/_jsx(TooltipTrigger, {
    placement: placement,
    tooltipId: "pitch-help",
    tooltip: /*#__PURE__*/_jsx(Tooltip, {
      id: "pitch-help",
      children: t('ROSTER_PITCH_HELP_TOOLTIP', 'Only editors and admins have access to pitching.', 'Tool tip to explain which access levels are able to pitch music')
    }),
    children: /*#__PURE__*/_jsx(ButtonIcon, {
      onMouseEnter: function onMouseEnter() {
        return logTooltipMouseover();
      },
      "aria-label": t('ROSTER_PITCH_HELP', 'Which access levels can pitch?', 'Explain which access levels are able to pitch music'),
      children: /*#__PURE__*/_jsx(IconHelpAlt, {
        "aria-hidden": "true",
        focusable: "false",
        iconSize: 16
      })
    })
  });
}

export function ArtistsTable(props) {
  var isMobile = props.isMobile;

  var _useRosterSearchParam = useRosterSearchParams(),
      _useRosterSearchParam2 = _slicedToArray(_useRosterSearchParam, 2),
      params = _useRosterSearchParam2[0],
      setParams = _useRosterSearchParam2[1];

  var t = useT();

  var _useRosterSearch = useRosterSearch(params),
      data = _useRosterSearch.data,
      isValidating = _useRosterSearch.isValidating;

  var _usePitchActionArtist = usePitchActionArtistId(),
      artistId = _usePitchActionArtist.artistId;

  var logArtistPageNavigation = useRosterNavigateToArtistPageLogger();
  var logPageForward = useRosterPaginationNextLogger();
  var logPageBack = useRosterPaginationPreviousLogger(); // check for completely invalid states
  // this data will exist because we are using suspense,
  // but my hook doesn't know that :(

  if (!data) return null;
  if (data.status === 'forbidden') return /*#__PURE__*/_jsx(Forbidden, {});
  if (data.status === 'unknown') throw new Error(t('ROSTER_SEARCH_ERROR', 'Failed to roster search', 'Roster search failed')); // this needs to be here and can't be in a react hook because
  // hooks cannot be conditional, they must execute. Since the data
  // could be forbidden (which you cannot paginate on) this logic
  // must live exactly here.

  var total = Number(data.payload.total);
  var offset = params.offset,
      limit = params.limit;
  var from = offset + 1;
  var to = Math.min(offset + limit, total);
  var canPageForward = to < total;
  var canPageBack = offset !== 0;

  function handlePageForward() {
    var incrementOffset = Math.min(offset + limit, total);
    logPageForward(incrementOffset);
    setParams(_objectSpread(_objectSpread({}, params), {}, {
      offset: incrementOffset
    }));
  }

  function handlePageBack() {
    var decrementOffset = Math.max(offset - limit, 0);
    logPageBack(decrementOffset);
    setParams(_objectSpread(_objectSpread({}, params), {}, {
      offset: decrementOffset
    }));
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(Table, {
      "data-slo-id": "roster-table",
      style: {
        tableLayout: 'fixed'
      },
      children: [/*#__PURE__*/_jsxs("colgroup", {
        children: [/*#__PURE__*/_jsx("col", {
          width: "45%"
        }), /*#__PURE__*/_jsx("col", {
          width: "*"
        }), !isMobile && /*#__PURE__*/_jsx("col", {
          width: "*"
        })]
      }), /*#__PURE__*/_jsx("thead", {
        children: /*#__PURE__*/_jsxs(TableRow, {
          children: [/*#__PURE__*/_jsx(TableHeaderCell, {
            scope: "col",
            children: t('ROSTER_ARTIST_COLUMN', 'artist', 'artist column header')
          }), /*#__PURE__*/_jsx(TableHeaderCell, {
            children: /*#__PURE__*/_jsxs("div", {
              style: {
                display: 'flex',
                alignItems: 'center'
              },
              children: [/*#__PURE__*/_jsx("span", {
                style: {
                  paddingRight: spacer4,
                  paddingLeft: spacer4
                },
                children: t('ROSTER_PITCH_COLUMN', 'pitch', 'pitch column header')
              }), /*#__PURE__*/_jsx(PitchHelpTooltip, {
                isMobile: isMobile
              })]
            })
          }), !isMobile && /*#__PURE__*/_jsxs(TableHeaderCell, {
            align: "right",
            children: [/*#__PURE__*/_jsx(TableSortIcon, {
              direction: "up"
            }), t('ROSTER_NEXT_RELEASE', 'next release', 'next release column header')]
          })]
        })
      }), /*#__PURE__*/_jsx("tbody", {
        children: data.payload.artists.map(function (artist) {
          return /*#__PURE__*/_jsxs(TableRow, {
            "data-slo-id": "roster-artist:".concat(artist.id),
            children: [/*#__PURE__*/_jsx(TableCell, {
              children: /*#__PURE__*/_jsx(Link, {
                onClick: function onClick() {
                  return logArtistPageNavigation(artist.id);
                },
                to: "/artist/".concat(artist.id, "/home"),
                className: "no-underline",
                style: {
                  display: isMobile ? 'block' : 'inline-block'
                },
                "aria-label": "".concat(artist.name, " artist home page"),
                children: /*#__PURE__*/_jsx(BadgeWithText, {
                  variant: "artist",
                  imgSrc: artist.image_url,
                  text: artist.name
                })
              })
            }), /*#__PURE__*/_jsx(PitchCell, {
              artist: artist,
              animate: artist.id === artistId,
              offset: params.offset
            }), !isMobile && /*#__PURE__*/_jsx(DateCell, {
              displayDate: artist.display_date
            })]
          }, artist.id);
        })
      })]
    }), /*#__PURE__*/_jsxs(TablePagination, {
      children: [/*#__PURE__*/_jsx(TimeAgo, {
        isMobile: isMobile,
        updating: isValidating,
        time: data.requestTime
      }), /*#__PURE__*/_jsx(PaginationControls, {
        onIncrement: canPageForward ? handlePageForward : undefined,
        onDecrement: canPageBack ? handlePageBack : undefined,
        children: t('ROSTER_PAGINATION', '{from} - {to} of {total}', 'Phrase for showing pagination/number of results', {
          from: from,
          to: to,
          total: total
        })
      })]
    })]
  });
}