import _classCallCheck from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import { ButtonSecondary, IconHelpAlt, ButtonIcon, Table, TableContainer, TableHeaderCell, Tooltip, Type, VisuallyHidden } from '@spotify-internal/encore-web';
import { TooltipTrigger } from '@mrkt/features/TooltipTrigger';
import { withT } from '@mrkt/features/i18n';
import PopularTrackRow from './PopularTrackRow';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var VISIBLE_TRACKS_LIMIT = 5;

var PopularClassComponent = /*#__PURE__*/function (_Component) {
  _inherits(PopularClassComponent, _Component);

  var _super = _createSuper(PopularClassComponent);

  function PopularClassComponent() {
    var _this;

    _classCallCheck(this, PopularClassComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      showAllTracks: false
    });

    _defineProperty(_assertThisInitialized(_this), "toggleShowAllTracks", function () {
      _this.setState(function (state) {
        return {
          // @ts-ignore
          showAllTracks: !state.showAllTracks
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderTracks", function () {
      var _this$props = _this.props,
          artist = _this$props.artist,
          topTracks = _this$props.topTracks;
      var showAllTracks = _this.state.showAllTracks;
      return topTracks.map(function (_ref, trackIndex) {
        var artwork = _ref.artwork,
            name = _ref.name,
            playCount = _ref.playCount,
            trackUri = _ref.trackUri;
        return /*#__PURE__*/_jsx(PopularTrackRow // @ts-ignore
        , {
          artist: artist,
          artwork: artwork,
          name: name,
          playCount: playCount,
          trackIndex: trackIndex + 1,
          trackUri: trackUri,
          visible: showAllTracks || trackIndex < VISIBLE_TRACKS_LIMIT
        }, trackUri);
      });
    });

    return _this;
  }

  _createClass(PopularClassComponent, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          topTracks = _this$props2.topTracks,
          t = _this$props2.t;
      var showAllTracks = this.state.showAllTracks;
      var topTracksCount = topTracks.length;
      var shouldShowMoreTracks = topTracksCount > VISIBLE_TRACKS_LIMIT;
      var popularTooltipText = t('artistprofile_popular_1', 'Popular tracks are algorithmically curated, using a mixture of all-time and recent streams. Tracks you are featured on are not eligible.', '');

      if (topTracksCount === 0) {
        return null;
      }

      var extraTracksCount = shouldShowMoreTracks ? topTracksCount - VISIBLE_TRACKS_LIMIT : 0;
      return /*#__PURE__*/_jsxs("div", {
        className: styles.popular,
        children: [/*#__PURE__*/_jsx(TooltipTrigger, {
          className: styles.popular_tracks_tooltip,
          tooltip: /*#__PURE__*/_jsx(Tooltip, {
            children: popularTooltipText
          }),
          tooltipId: "popular-tracks-help",
          placement: "left",
          children: /*#__PURE__*/_jsx(ButtonIcon, {
            children: /*#__PURE__*/_jsx(IconHelpAlt, {
              "aria-label": t('artistprofile_popular_2', 'popular tracks help', ''),
              focusable: false
            })
          })
        }), /*#__PURE__*/_jsx(TableContainer, {
          children: /*#__PURE__*/_jsxs(Table, {
            className: styles['popular-tracks-table'],
            children: [/*#__PURE__*/_jsx("caption", {
              style: {
                display: 'flex',
                alignItems: 'flex-start'
              },
              children: /*#__PURE__*/_jsx(Type, {
                as: "h3",
                variant: "heading4",
                weight: Type.bold,
                className: styles['popular-header-title'],
                children: t('artistprofile_popular_3', 'Popular', '')
              })
            }), /*#__PURE__*/_jsx("thead", {
              children: /*#__PURE__*/_jsxs(VisuallyHidden, {
                component: "tr",
                children: [/*#__PURE__*/_jsx(TableHeaderCell, {
                  scope: "col",
                  children: "#"
                }), /*#__PURE__*/_jsx(TableHeaderCell, {
                  scope: "col",
                  children: t('artistprofile_popular_4', 'Song', '')
                }), /*#__PURE__*/_jsx(TableHeaderCell, {
                  scope: "col",
                  align: "right",
                  children: t('artistprofile_popular_5', 'Total Streams', '')
                })]
              })
            }), /*#__PURE__*/_jsx("tbody", {
              children: this.renderTracks()
            })]
          })
        }), shouldShowMoreTracks && /*#__PURE__*/_jsx("div", {
          className: styles['popular-show-tracks-button'],
          children: /*#__PURE__*/_jsx(ButtonSecondary, {
            buttonSize: ButtonSecondary.sm,
            onClick: this.toggleShowAllTracks,
            children: showAllTracks ? t('artistprofile_popular_6', 'Show Only 5 Songs', '') : t('artistprofile_popular_7', 'Show {extraTracksCount} More', 'This is a button that loads all the tracks that are not visible on the page. The variable is the number of tracks that are not visible.', {
              extraTracksCount: extraTracksCount
            })
          })
        })]
      });
    }
  }]);

  return PopularClassComponent;
}(Component);

_defineProperty(PopularClassComponent, "defaultProps", {});

var Popular = withT(PopularClassComponent);
/* eslint-disable-next-line import/no-default-export */

export default Popular;