import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _toConsumableArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component, useState } from 'react';
import URI from 'spotify-liburi';
import { ButtonTertiary, Backdrop } from '@spotify-internal/encore-web-v3';
import { DialogAlert } from '@mrkt/features/Dialog';
import { put, IDENTITY_API } from '../../../shared/lib/api';
import { Screen } from '../../../shared/lib/useViewport';
import { useProfileSwitcheroo } from '../utils/useProfileSwitcheroo';
import { AddPlaylist } from './AddPlaylist';
import { Dimmable } from '../Dimmable';
import { EditControls } from '../EditControls';
import { PencilButton } from '../PencilButton';
import { Playlist } from '../Playlist';
import { DraggablePlaylists } from './DraggablePlaylists';
import { Empty } from './Empty';
import { PlaylistsHeaderTitle, PlaylistsContainer } from './index.styles';
import { withT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export var PlaylistsClassComponent = /*#__PURE__*/function (_Component) {
  _inherits(PlaylistsClassComponent, _Component);

  var _super = _createSuper(PlaylistsClassComponent);

  function PlaylistsClassComponent(props) {
    var _this;

    _classCallCheck(this, PlaylistsClassComponent);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onRemovePlaylist", function (artistPlaylistUri) {
      _this.setState({
        artistPlaylistUriForRemoval: artistPlaylistUri
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onConfirmRemoval", function () {
      var _this$state = _this.state,
          artistPlaylistUriForRemoval = _this$state.artistPlaylistUriForRemoval,
          playlists = _this$state.playlists;
      var filteredPlaylists = playlists.filter(function (playlist) {
        return playlist.uri !== artistPlaylistUriForRemoval;
      });

      _this.setState({
        artistPlaylistUriForRemoval: undefined,
        playlists: filteredPlaylists
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onCancelRemoval", function () {
      _this.setState({
        artistPlaylistUriForRemoval: undefined
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onAddPlaylist", function (artistPlaylist) {
      var _this$props = _this.props,
          setAlert = _this$props.setAlert,
          t = _this$props.t;
      var prevPlaylists = _this.state.playlists;
      var newPlaylistsState = [artistPlaylist].concat(_toConsumableArray(prevPlaylists));

      var hasDuplicates = _this.hasDuplicates(newPlaylistsState);

      if (hasDuplicates) {
        setAlert({
          title: t('artistprofile_playlists_1', 'Try adding a different playlist. That one’s already on your profile.', ''),
          error: true
        });
      } else {
        _this.setState({
          playlists: newPlaylistsState
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMovePlaylist", function (reorderedPlaylists) {
      _this.setState({
        playlists: reorderedPlaylists
      });
    });

    _defineProperty(_assertThisInitialized(_this), "hasDuplicates", function (playlists) {
      var uriIds = (playlists || []).map(function (_ref) {
        var uri = _ref.uri;
        return URI.from(uri).id;
      });
      return new Set(uriIds).size !== uriIds.length;
    });

    _defineProperty(_assertThisInitialized(_this), "updateArtistsPlaylists", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(artistId, filteredPlaylists) {
        var _this$props2, setAlert, updatePlaylists, organizationUri, t, endpoint, filteredPlaylistsUris;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props2 = _this.props, setAlert = _this$props2.setAlert, updatePlaylists = _this$props2.updatePlaylists, organizationUri = _this$props2.organizationUri, t = _this$props2.t;
                endpoint = "".concat(IDENTITY_API, "/v1/profile/").concat(artistId, "/playlists?organizationUri=").concat(organizationUri);
                filteredPlaylistsUris = filteredPlaylists.map(function (_ref3) {
                  var uri = _ref3.uri;
                  return uri;
                }); // TODO implement a simple rollback?

                _context.prev = 3;
                _context.next = 6;
                return put(endpoint, {
                  body: {
                    uris: filteredPlaylistsUris,
                    sortOrder: 'presorted'
                  }
                });

              case 6:
                _this.setState({
                  playlists: filteredPlaylists
                });

                updatePlaylists(filteredPlaylists);
                setAlert({
                  title: t('artistprofile_playlists_2', 'Success!', '')
                });
                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](3);

                _this.setState({
                  playlists: _this.props.playlists
                });

                setAlert({
                  title: t('artistprofile_playlists_3', 'Something went wrong, please try again later.', ''),
                  error: true
                });

              case 15:
                _this.props.stopEditing();

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 11]]);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "confirmMovePlaylist", function () {
      _this.updateArtistsPlaylists(_this.props.artistId, _this.state.playlists);
    });

    _defineProperty(_assertThisInitialized(_this), "renderPlaylists", function () {
      var playlists = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return playlists.map(function (_ref4, index) {
        var uri = _ref4.uri,
            image = _ref4.image,
            title = _ref4.title,
            subtitle = _ref4.subtitle;
        var _this$props3 = _this.props,
            viewport = _this$props3.viewport,
            authorizedUser = _this$props3.authorizedUser,
            editing = _this$props3.editing;
        var mobile = viewport <= Screen.XS;
        return /*#__PURE__*/_jsx(Playlist, {
          uri: uri,
          image: image,
          title: title,
          subtitle: subtitle,
          hasRemoveFeature: authorizedUser && editing,
          onRemove: _this.onRemovePlaylist,
          mobile: mobile,
          index: index
        }, uri);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderPlaylistWithTitle", function () {
      var playlists = _this.state.playlists;
      var authorizedUser = _this.props.authorizedUser;
      return /*#__PURE__*/_jsxs("div", {
        children: [_this.renderPlaylistHeader(), (playlists === null || playlists === void 0 ? void 0 : playlists.length) > 0 ? _this.renderPlaylists(playlists) : /*#__PURE__*/_jsx(Empty, {
          onClick: _this.props.startEditing,
          authorizedUser: authorizedUser
        })]
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderPlaylistHeader", function () {
      var playlists = _this.state.playlists;
      var _this$props4 = _this.props,
          authorizedUser = _this$props4.authorizedUser,
          editing = _this$props4.editing,
          artistId = _this$props4.artistId,
          t = _this$props4.t;
      return /*#__PURE__*/_jsxs(PlaylistsHeaderTitle, {
        children: [/*#__PURE__*/_jsx("span", {
          children: t('artistprofile_playlists_4', 'Artist Playlists', '')
        }), authorizedUser && (!editing && playlists && playlists.length > 0 ? /*#__PURE__*/_jsx(PencilButton, {
          onClick: _this.props.startEditing,
          testIdPrefix: "playlist-",
          "aria-label": "edit artist playlists"
        }) : editing && /*#__PURE__*/_jsx(EditControls, {
          onCancel: function onCancel() {
            _this.props.stopEditing();

            _this.setState({
              playlists: _this.props.playlists
            });
          },
          onSave: function onSave() {
            _this.updateArtistsPlaylists(artistId, playlists);

            _this.props.stopEditing();
          },
          saveable: true,
          cancelable: true
        }))]
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderEditablePlaylists", function () {
      var _this$props5 = _this.props,
          viewport = _this$props5.viewport,
          editing = _this$props5.editing,
          t = _this$props5.t;
      var _this$state2 = _this.state,
          artistPlaylistUriForRemoval = _this$state2.artistPlaylistUriForRemoval,
          playlists = _this$state2.playlists;
      var mobile = Boolean(viewport && viewport <= Screen.XS);
      return /*#__PURE__*/_jsxs(Dimmable, {
        active: editing,
        children: [/*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsxs("div", {
            children: [_this.renderPlaylistHeader(), /*#__PURE__*/_jsx(AddPlaylist, {
              onAddPlaylist: _this.onAddPlaylist
            })]
          }), artistPlaylistUriForRemoval && /*#__PURE__*/_jsx(Backdrop, {
            center: true,
            children: /*#__PURE__*/_jsx(DialogAlert, {
              dialogId: "profile-remove-artist-playlist-dialog",
              dialogTitle: /*#__PURE__*/_jsx("span", {
                children: t('artistprofile_playlists_5', 'Are you sure?', '')
              }),
              body: /*#__PURE__*/_jsx("span", {
                children: t('artistprofile_playlists_6', 'You can still listen to this playlist on Spotify after removing it from your artist profile.', '')
              }),
              footer: /*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx(ButtonTertiary, {
                  buttonSize: ButtonTertiary.sm,
                  condensed: true,
                  onClick: _this.onCancelRemoval,
                  children: /*#__PURE__*/_jsx("span", {
                    children: t('artistprofile_playlists_7', 'Cancel', '')
                  })
                }), /*#__PURE__*/_jsx(ButtonTertiary, {
                  buttonSize: ButtonTertiary.sm,
                  condensed: true,
                  color: "green",
                  onClick: _this.onConfirmRemoval,
                  "data-slo-id": "confirm-remove",
                  children: /*#__PURE__*/_jsx("span", {
                    children: t('artistprofile_playlists_8', 'Remove', '')
                  })
                })]
              })
            })
          })]
        }), /*#__PURE__*/_jsx(DraggablePlaylists, {
          playlists: playlists,
          onRemovePlaylist: _this.onRemovePlaylist,
          onMovePlaylist: _this.onMovePlaylist,
          mobile: mobile
        })]
      });
    });

    _this.state = {
      artistPlaylistUriForRemoval: undefined,
      playlists: props.playlists
    };
    return _this;
  }

  _createClass(PlaylistsClassComponent, [{
    key: "render",
    value: function render() {
      var editing = this.props.editing;
      return /*#__PURE__*/_jsx(PlaylistsContainer, {
        children: editing ? this.renderEditablePlaylists() : this.renderPlaylistWithTitle()
      });
    }
  }]);

  return PlaylistsClassComponent;
}(Component); // eslint-disable-next-line @typescript-eslint/no-redeclare

_defineProperty(PlaylistsClassComponent, "defaultProps", {
  artistId: '',
  authorizedUser: false,
  playlists: [],
  setAlert: function setAlert() {},
  updatePlaylists: function updatePlaylists() {}
});

export var Playlists = withT(PlaylistsClassComponent);

var ConnectedPlaylists = function ConnectedPlaylists(props) {
  var _useState = useState(false),
      editing = _useState[0],
      setEditing = _useState[1];

  var _useProfileSwitcheroo = useProfileSwitcheroo(function () {
    return setEditing(true);
  }),
      showProfileSwitcheroo = _useProfileSwitcheroo.showProfileSwitcheroo,
      organizationUri = _useProfileSwitcheroo.organizationUri,
      renderedProfileSwitcheroo = _useProfileSwitcheroo.renderedProfileSwitcheroo;

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [renderedProfileSwitcheroo, /*#__PURE__*/_jsx(Playlists, _objectSpread(_objectSpread({}, props), {}, {
      editing: editing,
      organizationUri: organizationUri,
      stopEditing: function stopEditing() {
        return setEditing(false);
      },
      startEditing: showProfileSwitcheroo
    }))]
  });
};
/* eslint-disable-next-line import/no-default-export */


export default ConnectedPlaylists;