import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Table, TableCell, TableHeaderCell, TableRow, gray75, screenXsMax, spacer16 } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { textOverflow } from '../../../../shared/styles/mixins/textOverflow';
import { useGetString } from '../../../../shared/messages/strings';
import { generateSongDetailUrl } from '../../../CatalogUtils/urls';
import { SplitRightsBadge } from '../../SplitRightsBadge';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledTable = styled(Table).withConfig({
  displayName: "SongsInPlaylistTable__StyledTable",
  componentId: "f420yi-0"
})(["&&{margin-bottom:", ";}"], spacer16);
var StyledTableRow = styled(TableRow).withConfig({
  displayName: "SongsInPlaylistTable__StyledTableRow",
  componentId: "f420yi-1"
})(["&[disabled]{opacity:0.3;}"]);
var StyledMoreSongs = styled.p.withConfig({
  displayName: "SongsInPlaylistTable__StyledMoreSongs",
  componentId: "f420yi-2"
})(["color:", ";font-size:14px;padding:0 0 0 5px;@media (max-width:", "){padding-left:0;}"], gray75, screenXsMax);
var StyledTrackName = styled.span.withConfig({
  displayName: "SongsInPlaylistTable__StyledTrackName",
  componentId: "f420yi-3"
})(["", ";display:inline-block;text-decoration:none;width:145px;"], textOverflow());
export function SongsInPlaylistTable(_ref) {
  var _data$formatted, _data$formatted$track;

  var artistId = _ref.artistId,
      data = _ref.data,
      history = _ref.history;
  var t = useT();
  var strings = useGetString();
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsxs(StyledTable, {
      "data-testid": "table",
      children: [/*#__PURE__*/_jsx("thead", {
        children: /*#__PURE__*/_jsxs(TableRow, {
          children: [/*#__PURE__*/_jsx(TableHeaderCell, {
            children: /*#__PURE__*/_jsx("span", {
              children: strings.songs
            })
          }), /*#__PURE__*/_jsx(TableHeaderCell, {
            align: "right",
            children: /*#__PURE__*/_jsx("span", {
              children: "\xA0"
            })
          }), /*#__PURE__*/_jsx(TableHeaderCell, {
            align: "right",
            children: /*#__PURE__*/_jsx("span", {
              children: strings.streams
            })
          })]
        })
      }), /*#__PURE__*/_jsx("tbody", {
        children: (_data$formatted = data.formatted) === null || _data$formatted === void 0 ? void 0 : (_data$formatted$track = _data$formatted.trackStats) === null || _data$formatted$track === void 0 ? void 0 : _data$formatted$track.map(function (track) {
          var trackURI = track.trackURI,
              isDisabled = track.isDisabled,
              showSplitRightsBadge = track.showSplitRightsBadge,
              streams = track.streams,
              streamsFull = track.streamsFull,
              trackName = track.trackName;
          return /*#__PURE__*/_jsxs(StyledTableRow, {
            "data-testid": "tbody-table-row",
            hover: !isDisabled ? true : undefined,
            onClick: function onClick() {
              return !isDisabled ? history.push(generateSongDetailUrl(track, artistId)) : null;
            },
            disabled: isDisabled ? true : false,
            title: isDisabled ? t('MUSIC_PLAYLISTS_73b3f3', "This song isn't part of your current catalog", '') : undefined,
            children: [/*#__PURE__*/_jsx(TableCell, {
              title: !isDisabled ? trackName : undefined,
              highlight: true,
              children: /*#__PURE__*/_jsx(StyledTrackName, {
                children: trackName
              })
            }), /*#__PURE__*/_jsx(TableCell, {
              children: showSplitRightsBadge && /*#__PURE__*/_jsx(SplitRightsBadge, {})
            }), /*#__PURE__*/_jsx(TableCell, {
              align: "right",
              title: !isDisabled ? streamsFull : undefined,
              numerical: true,
              children: streams
            })]
          }, trackURI);
        })
      })]
    }), data.formatted.numTracks > 10 && data.formatted.trackStats && /*#__PURE__*/_jsx(StyledMoreSongs, {
      children: /*#__PURE__*/_jsx("span", {
        children: function (numTracksMore) {
          return numTracksMore === 1 ? t('MUSIC_PLAYLISTS_5532be', '{numTracksMore} more song', '', {
            numTracksMore: numTracksMore
          }) : t('MUSIC_PLAYLISTS_8967fa', '{numTracksMore} more songs', '', {
            numTracksMore: numTracksMore
          });
        }(data.formatted.numTracks - data.formatted.trackStats.length)
      })
    })]
  });
}
/* eslint-disable-next-line import/no-default-export */

export default withRouter(SongsInPlaylistTable);