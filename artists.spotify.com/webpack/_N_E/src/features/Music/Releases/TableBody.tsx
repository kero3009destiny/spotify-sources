import _classCallCheck from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
import qs from 'query-string';
import { IconAlbum, TableCell, TableThumbnail } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { ICON_SM } from '../../../features/CatalogUtils/constants';
import { SplitRightsBadge, SplitRightsType } from '../SplitRightsBadge';
import * as Style from './TableBody.style';
import { StatNotAvailable } from '../StatNotAvailable';
import { useReleaseRowSelectLogger, useReleaseSongRowSelectLogger } from '../hooks/useMusicUbi';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var TableBodyClassComponent = /*#__PURE__*/function (_React$Component) {
  _inherits(TableBodyClassComponent, _React$Component);

  var _super = _createSuper(TableBodyClassComponent);

  function TableBodyClassComponent() {
    var _this;

    _classCallCheck(this, TableBodyClassComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "noAccessRelease", _this.props.t('MUSIC_RELEASES_20c284', 'This release is not part of your catalog', ''));

    _defineProperty(_assertThisInitialized(_this), "noAccessSong", _this.props.t('MUSIC_RELEASES_92b926', 'This song is not part of your catalog', ''));

    _defineProperty(_assertThisInitialized(_this), "goToSongDetails", function (album, track) {
      _this.props.logSongRowClick(album, track);

      var _this$props = _this.props,
          artist = _this$props.artist,
          history = _this$props.history;
      history.push({
        pathname: "/artist/".concat(artist.id, "/song/").concat(track.trackUri.split(':')[2]),
        query: qs.parse(_this.props.location.search)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "goToReleaseStats", function (albumUri, albumRowIndex) {
      var _this$props2 = _this.props,
          artist = _this$props2.artist,
          history = _this$props2.history,
          isDisabled = _this$props2.isDisabled,
          hasReleaseStatsPageFeature = _this$props2.hasReleaseStatsPageFeature;
      if (!hasReleaseStatsPageFeature) return;
      if (isDisabled) return;

      _this.props.logAlbumRowClick(albumUri, albumRowIndex);

      history.push({
        pathname: "/artist/".concat(artist.id, "/release/").concat(albumUri.split(':')[2])
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseMove", function (e, tooltipText) {
      var setTooltipData = _this.props.setTooltipData;
      setTooltipData({
        top: e.pageY,
        left: e.pageX,
        tooltipText: tooltipText
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function () {
      var setTooltipData = _this.props.setTooltipData;
      setTooltipData();
    });

    return _this;
  }

  _createClass(TableBodyClassComponent, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          albumName = _this$props3.albumName,
          albumUri = _this$props3.albumUri,
          albumRowIndex = _this$props3.albumRowIndex,
          hasReleaseStatsPageFeature = _this$props3.hasReleaseStatsPageFeature,
          formatted = _this$props3.formatted,
          imageUri = _this$props3.imageUri,
          releaseYear = _this$props3.releaseYear,
          isDisabled = _this$props3.isDisabled,
          showSplitRightsBadge = _this$props3.showSplitRightsBadge,
          isSmallScreen = _this$props3.isSmallScreen,
          isXSmallScreen = _this$props3.isXSmallScreen,
          isMediumScreen = _this$props3.isMediumScreen,
          showCanvasColumn = _this$props3.showCanvasColumn,
          t = _this$props3.t;
      var translatedReleaseType = {
        EP: t('MUSIC_RELEASES_17c0ff', 'EP', 'An extended play musical recording.'),
        Album: t('MUSIC_RELEASES_919298', 'Album', ''),
        Single: t('MUSIC_RELEASES_44f470', 'Single', 'A song (or group of songs) within an album collection.')
      };
      return /*#__PURE__*/_jsxs(React.Fragment, {
        children: [/*#__PURE__*/_jsx(Style.ReleaseLevelTableBody, {
          "data-key": "release-level",
          "data-testid": "release-table-body",
          children: /*#__PURE__*/_jsxs(Style.ReleaseLevelTableRow, {
            hover: !isDisabled && hasReleaseStatsPageFeature,
            style: {
              cursor: !isDisabled && hasReleaseStatsPageFeature ? 'pointer' : undefined
            },
            onClick: function onClick() {
              return _this2.goToReleaseStats(albumUri, albumRowIndex);
            },
            "data-testid": "release-table-row",
            onMouseMove: function onMouseMove(e) {
              if (isDisabled) {
                _this2.onMouseMove(e, _this2.noAccessRelease);
              }
            },
            onMouseLeave: function onMouseLeave() {
              if (isDisabled) {
                _this2.onMouseLeave();
              }
            },
            children: [/*#__PURE__*/_jsx(Style.CustomTableCell, {
              colSpan: 2,
              isDisabled: isDisabled,
              truncate: true,
              children: imageUri ? /*#__PURE__*/_jsx(TableThumbnail, {
                small: isXSmallScreen,
                imgAlt: "",
                img: imageUri,
                thumbnailTitle: albumName,
                subtitle: // @ts-ignore
                translatedReleaseType[formatted.releaseType] || formatted.releaseType,
                truncate: true
              }) : /*#__PURE__*/_jsx(IconAlbum, {
                iconSize: ICON_SM
              })
            }), /*#__PURE__*/_jsx(Style.CustomTableCell, {
              isDisabled: isDisabled,
              children: showSplitRightsBadge && /*#__PURE__*/_jsx(SplitRightsBadge, {
                type: SplitRightsType.RELEASE
              })
            }), /*#__PURE__*/_jsx(Style.CustomTableCell, {
              isDisabled: isDisabled,
              align: "right",
              numerical: true,
              children: formatted.totalStreams
            }), !isMediumScreen && /*#__PURE__*/_jsx(Style.CustomTableCell, {
              align: "right",
              numerical: true,
              isDisabled: isDisabled,
              children: "\u2014"
            }), !isSmallScreen && showCanvasColumn && /*#__PURE__*/_jsx(Style.CustomTableCell, {
              align: "right",
              numerical: true,
              isDisabled: isDisabled,
              children: "\u2014"
            }), !isMediumScreen && /*#__PURE__*/_jsx(Style.CustomTableCell, {
              align: "right",
              numerical: true,
              isDisabled: isDisabled,
              children: "\u2014"
            }), !isSmallScreen && /*#__PURE__*/_jsxs(Style.CustomTableCell, {
              align: "right",
              isDisabled: isDisabled,
              children: [releaseYear, ' ']
            })]
          })
        }), /*#__PURE__*/_jsx(Style.TrackListTableBody, {
          "data-key": "track-level",
          children: formatted.recordingStats ? formatted.recordingStats.map(function (track, idx) {
            return /*#__PURE__*/_jsxs(Style.TrackListTableRow, {
              "data-testid": "track-list-".concat(formatted.recordingStats ? 'full' : 'empty'),
              hover: !track.isDisabled,
              onMouseMove: function onMouseMove(e) {
                if (track.isDisabled) {
                  _this2.onMouseMove(e, _this2.noAccessSong);
                }
              },
              onMouseLeave: function onMouseLeave() {
                if (track.isDisabled) {
                  _this2.onMouseLeave();
                }
              },
              onClick: function onClick() {
                if (!track.isDisabled) {
                  _this2.goToSongDetails({
                    albumUri: albumUri,
                    albumRowIndex: albumRowIndex
                  }, {
                    trackUri: track.trackUri,
                    trackRowIndex: idx
                  });
                }
              },
              children: [/*#__PURE__*/_jsx(Style.TrackListTableCell, {
                isDisabled: track.isDisabled,
                children: idx + 1
              }), /*#__PURE__*/_jsx(Style.TrackListTableCell, {
                isDisabled: track.isDisabled,
                highlight: true,
                truncate: true,
                children: track.trackName
              }), /*#__PURE__*/_jsx(Style.TrackListTableCell, {
                isDisabled: track.isDisabled,
                children: track.showSplitRightsBadge && /*#__PURE__*/_jsx(SplitRightsBadge, {})
              }), /*#__PURE__*/_jsx(Style.TrackListTableCell, {
                align: "right",
                isDisabled: track.isDisabled,
                numerical: true,
                children: track.streams
              }), !isMediumScreen && /*#__PURE__*/_jsx(Style.TrackListTableCell, {
                align: "right",
                isDisabled: track.isDisabled,
                numerical: true,
                children: track.showSplitRightsBadge ? /*#__PURE__*/_jsx(StatNotAvailable, {}) : track.listeners
              }), !isSmallScreen && showCanvasColumn && /*#__PURE__*/_jsx(Style.TrackListTableCell, {
                align: "right",
                isDisabled: track.isDisabled,
                "data-testid": "table-canvas-column",
                numerical: true,
                children: track.showSplitRightsBadge ? /*#__PURE__*/_jsx(StatNotAvailable, {}) : track.views
              }), !isMediumScreen && /*#__PURE__*/_jsx(Style.TrackListTableCell, {
                align: "right",
                isDisabled: track.isDisabled,
                numerical: true,
                children: track.showSplitRightsBadge ? /*#__PURE__*/_jsx(StatNotAvailable, {}) : track.savers
              }), !isSmallScreen && /*#__PURE__*/_jsx(Style.TrackListTableCell, {
                align: "right",
                title: track.releaseDateTitle,
                isDisabled: track.isDisabled,
                children: track.releaseDate
              })]
            }, "".concat(track.trackUri, "-").concat(idx + 1));
          }) : /*#__PURE__*/_jsx(Style.TrackListTableRow, {
            children: /*#__PURE__*/_jsx(TableCell, {
              colSpan: 5,
              children: t('MUSIC_RELEASES_d1f270', 'Track list is not available', '')
            })
          })
        })]
      });
    }
  }]);

  return TableBodyClassComponent;
}(React.Component);

_defineProperty(TableBodyClassComponent, "defaultProps", {
  history: {
    push: function push() {}
  },
  hasReleaseStatsFeature: false,
  logSongRowClick: function logSongRowClick() {},
  logAlbumRowClick: function logAlbumRowClick() {}
});

export var TableBody = function TableBody(props) {
  var t = useT();
  var logSongRowClick = useReleaseSongRowSelectLogger();
  var logAlbumRowClick = useReleaseRowSelectLogger();
  return /*#__PURE__*/_jsx(TableBodyClassComponent, _objectSpread(_objectSpread({}, props), {}, {
    t: t,
    logSongRowClick: logSongRowClick,
    logAlbumRowClick: logAlbumRowClick
  }));
};