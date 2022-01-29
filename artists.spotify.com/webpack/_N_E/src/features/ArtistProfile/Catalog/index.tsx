import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import { IconHelpAlt, ButtonIcon, Tooltip, Type } from '@spotify-internal/encore-web';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { TooltipTrigger } from '@mrkt/features/TooltipTrigger';
import { withT } from '@mrkt/features/i18n';
import { get, S4X_DATA_API } from '../../../shared/lib/api';
import { matchUri } from '../../../shared/lib/urlHelpers';
import CatalogRelease from './CatalogRelease';
import ReleaseDialog from './ReleaseDialog';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var SET_ALBUM_DATA = 'SET_ALBUM_DATA';
var SET_SONGS_DATA = 'SET_SONGS_DATA';
export var CatalogClassComponent = /*#__PURE__*/function (_Component) {
  _inherits(CatalogClassComponent, _Component);

  var _super = _createSuper(CatalogClassComponent);

  function CatalogClassComponent() {
    var _this;

    _classCallCheck(this, CatalogClassComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      albumData: null,
      songsData: null
    });

    _defineProperty(_assertThisInitialized(_this), "handleAction", function (eventType, payload) {
      switch (eventType) {
        case SET_ALBUM_DATA:
          {
            _this.setState({
              albumData: payload.albumData
            });

            break;
          }

        case SET_SONGS_DATA:
          {
            _this.setState({
              songsData: payload.songsData
            });

            break;
          }

        default:
          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onShowReleaseDialog", function (collectionType, release) {
      if (collectionType === 'albums') {
        sendEvent({
          eventCategory: 'ArtistProfileCatalog',
          eventAction: 'click',
          eventLabel: 'viewModal'
        });
        var album = matchUri(release.uri);

        _this.getSongs(album.id);

        _this.handleAction(SET_ALBUM_DATA, {
          albumData: release
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onHideReleaseDialog", function () {
      _this.handleAction(SET_ALBUM_DATA, {
        albumData: null
      });

      _this.handleAction(SET_SONGS_DATA, {
        songsData: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getSongs", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(albumId) {
        var retry,
            delay,
            artist,
            endpoint,
            payload,
            isPayloadEmpty,
            timeout,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                retry = _args.length > 1 && _args[1] !== undefined ? _args[1] : 3;
                delay = _args.length > 2 && _args[2] !== undefined ? _args[2] : 500;
                artist = _this.props.artist;
                endpoint = "".concat(S4X_DATA_API, "/v1/artist/").concat(artist.id, "/release/").concat(albumId, "/overview?time-filter=28day");
                _context.next = 6;
                return get(endpoint);

              case 6:
                payload = _context.sent;
                isPayloadEmpty = !payload || !(payload.recordingStats && payload.recordingStats.length);

                if (!isPayloadEmpty) {
                  _context.next = 11;
                  break;
                }

                timeout = setTimeout(function () {
                  if (retry > 0) {
                    var newRetry = retry - 1;
                    var newDelay = Math.min(delay * 2, 4000);

                    _this.getSongs(albumId, newRetry, newDelay);
                  }

                  clearTimeout(timeout);
                }, delay);
                return _context.abrupt("return");

              case 11:
                _this.setSongs(payload);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "setSongs", function (payload) {
      var songs = payload.recordingStats.map(function (song) {
        return {
          streams: song.numStreams || 0,
          name: song.trackName,
          uri: song.trackUri
        };
      });

      _this.handleAction(SET_SONGS_DATA, {
        songsData: songs
      });
    });

    return _this;
  }

  _createClass(CatalogClassComponent, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          artist = _this$props.artist,
          authorizedUser = _this$props.authorizedUser,
          catalog = _this$props.catalog,
          user = _this$props.user,
          t = _this$props.t;
      var _this$state = this.state,
          albumData = _this$state.albumData,
          songsData = _this$state.songsData;
      var catalogTooltipText = t('artistprofile_catalog_1', 'To qualify as an album, your release must have a minimum of 7 tracks and a duration of 30 mins. Everything else will be considered a single or an EP.', '');
      var COLLECTION_NAMES = {
        albums: t('artistprofile_catalog_2', 'Albums', 'Albums refers to releases above 30 minutes or with 7 or more tracks.'),
        appearsOn: t('artistprofile_catalog_3', 'Appears On', ''),
        singles: t('artistprofile_catalog_4', 'Singles and EPs', 'Singles refers to releases under 30 minutes with 3 or fewer tracks. EPs refers to releases under 30 minutes with 4-6 tracks.'),
        compilations: t('artistprofile_catalog_5', 'Compilations', 'Refers to music releases put together by assembling previously separate releases')
      };
      /*
        Determine which catalog collection gets the tooltip.
        We only want to add it to the *first* collection that
        contains tracks.
      */

      var collectionWithTooltip = Object.keys(catalog).find(function (collectionType) {
        return catalog[collectionType].totalCount > 0;
      });
      return /*#__PURE__*/_jsxs("div", {
        className: styles.catalog,
        children: [Object.keys(catalog).map(function (collectionType) {
          var collection = catalog[collectionType];

          if (collection.totalCount > 0) {
            return /*#__PURE__*/_jsxs("div", {
              children: [collectionType === collectionWithTooltip && /*#__PURE__*/_jsx(TooltipTrigger, {
                className: styles.catalog_tooltip,
                tooltip: /*#__PURE__*/_jsx(Tooltip, {
                  children: catalogTooltipText
                }),
                placement: "left",
                tooltipId: "profile-catalog-help",
                children: /*#__PURE__*/_jsx(ButtonIcon, {
                  children: /*#__PURE__*/_jsx(IconHelpAlt, {
                    "aria-label": t('artistprofile_catalog_6', 'catalog help', ''),
                    focusable: false
                  })
                })
              }), /*#__PURE__*/_jsx(Type, {
                as: "h3",
                variant: "heading4",
                weight: Type.bold,
                className: styles.catalog_header_title,
                children: COLLECTION_NAMES[collectionType]
              }), /*#__PURE__*/_jsx("div", {
                className: styles.catalog_collection,
                children: collection.releases && collection.releases.length > 0 && collection.releases.map(function (release) {
                  return /*#__PURE__*/_jsx(CatalogRelease, {
                    artist: artist,
                    authorizedUser: authorizedUser,
                    isSingle: Boolean(collectionType === 'singles') // @ts-ignore
                    ,
                    onClick: function onClick() {
                      return _this2.onShowReleaseDialog(collectionType, release);
                    },
                    release: release,
                    user: user
                  }, release.uri);
                })
              })]
            }, collectionType);
          }

          return null;
        }), albumData && songsData && songsData.length > 0 && /*#__PURE__*/_jsx(ReleaseDialog // @ts-ignore
        , {
          artistId: artist.id,
          album: albumData,
          songs: songsData,
          onClose: this.onHideReleaseDialog
        })]
      });
    }
  }]);

  return CatalogClassComponent;
}(Component);

_defineProperty(CatalogClassComponent, "defaultProps", {});

var Catalog = withT(CatalogClassComponent);
/* eslint-disable-next-line import/no-default-export */

export default Catalog;