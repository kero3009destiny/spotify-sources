import _slicedToArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component, useState } from 'react';
import createDebug from 'debug';
import { Backdrop, Type, ButtonTertiary, IconPlus, IconEdit, FormCheckbox } from '@spotify-internal/encore-web';
import qs from 'query-string';
import { DialogAlert } from '@mrkt/features/Dialog';
import { withT } from '@mrkt/features/i18n';
import { normalizeImageWithMinimumSize, loadImages } from '@mrkt/features/mediahelpers';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { webapiAnonymous } from '../../../../shared/lib/api';
import { matchUri } from '../../../../shared/lib/urlHelpers';
import { ArtistPickCompact } from '../ArtistPickCompact';
import { Card } from '../Card';
import { Comment } from '../Comment';
import { EditControls } from '../../EditControls';
import { Entity } from '../Entity';
import { Search } from '../Search';
import { ArtistPick } from '../index';
import { Dimmable } from '../../Dimmable';
import { PencilButton } from '../../PencilButton';
import { LoadingIndicator } from '../../../../shared/components/LoadingIndicator';
import { ImageEditor } from './ImageEditor';
import { ConcertSearchItem } from './ConcertSearchItem';
import styles from './index.module.scss';
import { deleteArtistPick, saveArtistPick } from '../lib';
import { useProfileSwitcheroo } from '../../utils/useProfileSwitcheroo';
import { useHelpButton } from '../../../HelpWidget';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export var DESIRED_IMAGE_WIDTH = 690;
export var DESIRED_IMAGE_HEIGHT = 500;
var EDIT_FLOW_KEYWORD = 'selectPick';
var EDIT_ARTIST_PICK = 'EDIT_ARTIST_PICK';
var START_EDITING = 'START_EDITING';
var STOP_EDITING = 'STOP_EDITING';
var START_UPLOADING = 'START_UPLOADING';
var SELECT_CONCERTS_ARTIST_PICK = 'SELECT_CONCERTS_ARTIST_PICK';
var UPDATE_CLIENT_ARTIST_PICK = 'UPDATE_CLIENT_ARTIST_PICK';
var REMOVE_CLIENT_ARTIST_PICK = 'REMOVE_CLIENT_ARTIST_PICK';
var SET_DEFAULT_ARTIST_PICK = 'SET_DEFAULT_ARTIST_PICK';
var SHOW_REMOVE_MODAL = 'SHOW_REMOVE_MODAL';
var MIN_IMAGE_WIDTH = 45;
var debug = createDebug('components:EditArtistPick');
export var ClassEditArtistPickClassComponent = /*#__PURE__*/function (_Component) {
  _inherits(ClassEditArtistPickClassComponent, _Component);

  var _super = _createSuper(ClassEditArtistPickClassComponent);

  function ClassEditArtistPickClassComponent(props) {
    var _this;

    _classCallCheck(this, ClassEditArtistPickClassComponent);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "componentWrapper", void 0);

    _defineProperty(_assertThisInitialized(_this), "fileSelector", void 0);

    _defineProperty(_assertThisInitialized(_this), "handleAction", function (eventType) {
      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      switch (eventType) {
        case START_EDITING:
          {
            _this.props.startEditing();

            break;
          }

        case START_UPLOADING:
          {
            _this.setState({
              uploading: true
            });

            break;
          }

        case STOP_EDITING:
          {
            _this.setState({
              uploading: false,
              clientArtistPick: _this.props.artistPick
            });

            _this.props.stopEditing();

            break;
          }

        case SELECT_CONCERTS_ARTIST_PICK:
          {
            _this.setState(function (state) {
              return {
                clientArtistPick: _objectSpread(_objectSpread({}, state.clientArtistPick), {}, {
                  uri: "spotify:artist:".concat(_this.props.artist.id, ":concerts"),
                  type: 'concert_local',
                  title: _this.props.artist.name,
                  subtitle: 'Day, Time • Location'
                }),
                switchingEntity: false
              };
            });

            break;
          }

        case EDIT_ARTIST_PICK:
          {
            _this.setState({
              editedBackgroundImage: null,
              isBackgroundImageEnabled: true,
              switchingEntity: true
            });

            break;
          }

        case SET_DEFAULT_ARTIST_PICK:
          {
            _this.setState({
              // FIXME Refactor to be able to remove type cast
              clientArtistPick: _objectSpread({}, action),
              editedBackgroundImage: null,
              isBackgroundImageEnabled: true,
              switchingEntity: false
            });

            break;
          }

        case UPDATE_CLIENT_ARTIST_PICK:
          {
            _this.setState(function (state) {
              return {
                // FIXME Refactor to be able to remove type cast
                clientArtistPick: _objectSpread(_objectSpread(_objectSpread({}, state.clientArtistPick), action), {}, {
                  secondsToExpiration: undefined
                }),
                switchingEntity: false
              };
            });

            break;
          }

        case REMOVE_CLIENT_ARTIST_PICK:
          {
            _this.setState({
              clientArtistPick: null
            });

            break;
          }

        case SHOW_REMOVE_MODAL:
          {
            _this.setState({
              showRemoveModal: action === true
            });

            break;
          }

        default:
          debug("".concat(eventType, " not handled"));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSave", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _assertThisInitialize, ARTIST_PICK_SUCCESS, DEFAULT_FAILURE, clientArtistPick, _this$props, artist, updateArtistPick, setAlert, organizationUri, result;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _assertThisInitialize = _assertThisInitialized(_this), ARTIST_PICK_SUCCESS = _assertThisInitialize.ARTIST_PICK_SUCCESS, DEFAULT_FAILURE = _assertThisInitialize.DEFAULT_FAILURE;
              clientArtistPick = _this.state.clientArtistPick;
              _this$props = _this.props, artist = _this$props.artist, updateArtistPick = _this$props.updateArtistPick, setAlert = _this$props.setAlert, organizationUri = _this$props.organizationUri;

              _this.handleAction(START_UPLOADING);

              _context.prev = 4;
              _context.next = 7;
              return saveArtistPick(artist.id, clientArtistPick, organizationUri);

            case 7:
              result = _context.sent;
              updateArtistPick(result);
              setAlert({
                title: ARTIST_PICK_SUCCESS
              });
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](4);
              setAlert({
                error: true,
                title: DEFAULT_FAILURE
              });

            case 15:
              _this.handleAction(STOP_EDITING); // exits edit


            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 12]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "onRemove", function () {
      _this.handleAction(REMOVE_CLIENT_ARTIST_PICK);
    });

    _defineProperty(_assertThisInitialized(_this), "onCancelRemoval", function () {
      _this.handleAction(SHOW_REMOVE_MODAL, false);
    });

    _defineProperty(_assertThisInitialized(_this), "onConfirmRemoval", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var t, _assertThisInitialize2, DEFAULT_FAILURE, _this$props2, artist, updateArtistPick, setAlert, organizationUri;

      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              t = _this.props.t;
              _assertThisInitialize2 = _assertThisInitialized(_this), DEFAULT_FAILURE = _assertThisInitialize2.DEFAULT_FAILURE;
              _this$props2 = _this.props, artist = _this$props2.artist, updateArtistPick = _this$props2.updateArtistPick, setAlert = _this$props2.setAlert, organizationUri = _this$props2.organizationUri;
              _context2.prev = 3;
              _context2.next = 6;
              return deleteArtistPick(artist.id, organizationUri);

            case 6:
              updateArtistPick(null);
              setAlert({
                title: t('artistprofile_artistpick_editartistpick_3', 'We removed your pick. It may take up to 24 hours to update on Spotify.', 'Pick refers to the Artist Pick feature')
              });
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](3);
              setAlert({
                error: true,
                title: DEFAULT_FAILURE
              });

            case 13:
              _this.handleAction(STOP_EDITING);

              _this.handleAction(SHOW_REMOVE_MODAL, false);

              _this.handleAction(REMOVE_CLIENT_ARTIST_PICK);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 10]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "onComment", function (_ref3) {
      var comment = _ref3.comment;

      _this.handleAction(UPDATE_CLIENT_ARTIST_PICK, {
        comment: comment
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onEntitySelect", function (entity) {
      _this.handleAction(UPDATE_CLIENT_ARTIST_PICK, _this.formatEntityForArtistPick(entity));
    });

    _defineProperty(_assertThisInitialized(_this), "onConcertSelect", function () {
      _this.handleAction(SELECT_CONCERTS_ARTIST_PICK, {});
    });

    _defineProperty(_assertThisInitialized(_this), "setDefaultArtistPick", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
      var _this$props3, defaultArtistPick, defaultConcertPick, artist, endpoint, entityData, params, uriMatch, uriMatchIsCatalogEntity, uriMatchPlaylist, uriMatchPodcast, entityRequestData, sortedData, _sortedData, defaultClientArtistPick;

      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this$props3 = _this.props, defaultArtistPick = _this$props3.defaultArtistPick, defaultConcertPick = _this$props3.defaultConcertPick, artist = _this$props3.artist;

              if (!(defaultArtistPick === EDIT_FLOW_KEYWORD)) {
                _context3.next = 5;
                break;
              }

              _this.handleAction(EDIT_ARTIST_PICK);

              _this.props.startEditing();

              return _context3.abrupt("return");

            case 5:
              if (!defaultConcertPick) {
                _context3.next = 9;
                break;
              }

              _this.handleAction(SET_DEFAULT_ARTIST_PICK, {
                uri: "spotify:artist:".concat(artist.id, ":concerts"),
                type: 'concert_local',
                title: artist.name,
                subtitle: 'Day, Time • Location'
              });

              _this.props.startEditing();

              return _context3.abrupt("return");

            case 9:
              uriMatch = matchUri(defaultArtistPick);

              if (uriMatch) {
                _context3.next = 13;
                break;
              }

              debug("Failed to match uri for defaultArtistPick: ".concat(defaultArtistPick));
              return _context3.abrupt("return");

            case 13:
              uriMatchIsCatalogEntity = uriMatch && ['album', 'track'].includes(uriMatch.type);
              uriMatchPlaylist = uriMatch && uriMatch.type === 'playlist';
              uriMatchPodcast = uriMatch && ['episode', 'show'].includes(uriMatch.type);

              if (uriMatchIsCatalogEntity) {
                params = {
                  ids: [uriMatch.id]
                };
                endpoint = "/v1/".concat(uriMatch.type, "s?").concat(qs.stringify(params, false));
              }

              if (uriMatchPlaylist) {
                endpoint = "/v1/users/".concat(uriMatch.username, "/playlists/").concat(uriMatch.playlistId);
              }

              if (uriMatchPodcast) {
                endpoint = "/v1/".concat(uriMatch.type, "s/").concat(uriMatch.id);
              }

              _context3.prev = 19;

              if (endpoint) {
                _context3.next = 22;
                break;
              }

              throw new Error('Endpoint not defined');

            case 22:
              _this.setState({
                shouldLoadDefaultArtistPick: false
              });

              _context3.next = 25;
              return webapiAnonymous.get(endpoint);

            case 25:
              entityRequestData = _context3.sent;

              if (uriMatchIsCatalogEntity) {
                sortedData = entityRequestData["".concat(uriMatch.type, "s")].filter( // FIXME What type is this?
                function (entity) {
                  return entity && entity.id;
                });
                _sortedData = _slicedToArray(sortedData, 1);
                entityData = _sortedData[0];
              }

              if (uriMatchPlaylist) {
                entityData = entityRequestData;
              }

              if (uriMatchPodcast) {
                entityData = _objectSpread(_objectSpread({}, entityRequestData), {}, {
                  subtitle: uriMatch.type === 'episode' ? entityRequestData.show.name : entityRequestData.publisher
                });
              }

              if (entityData) {
                _context3.next = 31;
                break;
              }

              throw new Error("Failed to fetch data for enitity: ".concat(defaultArtistPick));

            case 31:
              defaultClientArtistPick = _objectSpread(_objectSpread({}, _this.formatEntityForArtistPick(entityData)), {}, {
                backgroundImage: null,
                comment: undefined
              });

              _this.handleAction(SET_DEFAULT_ARTIST_PICK, defaultClientArtistPick);

              _this.props.startEditing(); // Removes the query string from the URL


              _context3.next = 39;
              break;

            case 36:
              _context3.prev = 36;
              _context3.t0 = _context3["catch"](19);
              debug('webapi request failed', _context3.t0);

            case 39:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[19, 36]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "setImage", function (imageData) {
      var editedBackgroundImage = _this.state.editedBackgroundImage;

      _this.handleAction(UPDATE_CLIENT_ARTIST_PICK, {
        backgroundImage: imageData.backgroundImage,
        binarySource: editedBackgroundImage === null || editedBackgroundImage === void 0 ? void 0 : editedBackgroundImage.imageBinarySource,
        imageElement: editedBackgroundImage === null || editedBackgroundImage === void 0 ? void 0 : editedBackgroundImage.image,
        originalSource: imageData.originalSource,
        offset: imageData.offset
      });

      _this.setState({
        editedBackgroundImage: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getEntitySubtitle", function (entity) {
      if (entity.artists && entity.artists.length) return entity.artists[0].name;
      if (entity.subtitle) return entity.subtitle;
      if (entity.type === 'episode') return entity.show ? entity.show.name : ['EPISODE'];
      if (entity.type === 'show') return entity.publisher;
      return entity.name;
    });

    _defineProperty(_assertThisInitialized(_this), "formatEntityForArtistPick", function (entity) {
      var images = entity.album ? entity.album.images : entity.images;

      var formattedEntity = _objectSpread(_objectSpread({}, _this.state.clientArtistPick), {}, {
        uri: entity.uri,
        type: entity.type,
        subtitle: _this.getEntitySubtitle(entity),
        title: entity.name,
        image: normalizeImageWithMinimumSize(images, MIN_IMAGE_WIDTH)
      });

      return formattedEntity;
    });

    _defineProperty(_assertThisInitialized(_this), "stopEditing", function () {
      _this.handleAction(STOP_EDITING);
    });

    _defineProperty(_assertThisInitialized(_this), "startEditing", function () {
      _this.handleAction(START_EDITING);
    });

    _defineProperty(_assertThisInitialized(_this), "cancelEdit", function () {
      _this.handleAction(STOP_EDITING);
    });

    _defineProperty(_assertThisInitialized(_this), "cancelImageEditing", function () {
      _this.setState({
        editedBackgroundImage: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "openImageEditing", function () {
      var _this$fileSelector$cu;

      (_this$fileSelector$cu = _this.fileSelector.current) === null || _this$fileSelector$cu === void 0 ? void 0 : _this$fileSelector$cu.click();
    });

    _defineProperty(_assertThisInitialized(_this), "backgroundImageCheckboxChanged", function () {
      _this.setState(function (prevState) {
        var isBackgroundImageEnabled = !prevState.isBackgroundImageEnabled;

        if (isBackgroundImageEnabled) {
          return _objectSpread(_objectSpread({}, prevState), {}, {
            isBackgroundImageEnabled: isBackgroundImageEnabled
          });
        }

        return _objectSpread(_objectSpread({}, prevState), {}, {
          clientArtistPick: _objectSpread(_objectSpread({}, prevState.clientArtistPick), {}, {
            backgroundImage: undefined
          }),
          editedBackgroundImage: null,
          isBackgroundImageEnabled: isBackgroundImageEnabled
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "fileSelectorChanged", /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(event) {
        var files, images, error;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                event.preventDefault();
                files = event.target.files;

                _this.setState({
                  loadingImage: true
                });

                if (!files) {
                  _context4.next = 12;
                  break;
                }

                _context4.next = 6;
                return loadImages(files, DESIRED_IMAGE_WIDTH, DESIRED_IMAGE_HEIGHT, _this.props.t);

              case 6:
                images = _context4.sent;

                if (!images[0].error) {
                  _context4.next = 11;
                  break;
                }

                error = {
                  error: true,
                  title: images[0].title
                };

                _this.props.setAlert(error);

                return _context4.abrupt("return");

              case 11:
                _this.setState({
                  editedBackgroundImage: images[0]
                });

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x) {
        return _ref5.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "removeArtistPick", function () {
      _this.handleAction(SHOW_REMOVE_MODAL, true);
    });

    _defineProperty(_assertThisInitialized(_this), "switchEntity", function () {
      _this.setState({
        switchingEntity: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "stopSwitchingEntity", function () {
      _this.setState({
        switchingEntity: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderImageEditor", function () {
      var _this$state$editedBac, _this$state$editedBac2, _this$state$editedBac3;

      var clientArtistPick = _this.state.clientArtistPick;
      var imageSource = (_this$state$editedBac = _this.state.editedBackgroundImage) === null || _this$state$editedBac === void 0 ? void 0 : _this$state$editedBac.imageSource;
      var imageWidth = (_this$state$editedBac2 = _this.state.editedBackgroundImage) === null || _this$state$editedBac2 === void 0 ? void 0 : _this$state$editedBac2.imageWidth;
      var imageHeight = (_this$state$editedBac3 = _this.state.editedBackgroundImage) === null || _this$state$editedBac3 === void 0 ? void 0 : _this$state$editedBac3.imageHeight; // I don't think 0 is a valid height or width in this case, so using a
      // truthiness check should be ok here.

      if (imageSource && imageWidth && imageHeight) {
        return /*#__PURE__*/_jsx(ImageEditor, {
          imageSource: imageSource,
          imageWidth: imageWidth,
          imageHeight: imageHeight,
          cancelImageEditing: _this.cancelImageEditing,
          setImage: _this.setImage,
          desiredWidth: DESIRED_IMAGE_WIDTH,
          desiredHeight: DESIRED_IMAGE_HEIGHT,
          comment: clientArtistPick === null || clientArtistPick === void 0 ? void 0 : clientArtistPick.comment,
          onComment: _this.onComment,
          artist: _this.props.artist
        });
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "renderRemoveModal", function () {
      var t = _this.props.t;

      var handleCancel = function handleCancel() {
        sendEvent({
          eventCategory: 'Header',
          eventAction: 'click',
          eventLabel: t('artistprofile_artistpick_editartistpick_4', 'Cancel Remove Image', 'This action stops the action of removing the image.')
        });

        _this.onCancelRemoval();
      };

      var handleConfirmRemoval = function handleConfirmRemoval() {
        sendEvent({
          eventCategory: 'Header',
          eventAction: 'click',
          eventLabel: 'Confirm Remove Artist Pick'
        });

        _this.onConfirmRemoval();
      };

      return /*#__PURE__*/_jsx(Backdrop, {
        center: true,
        onClose: _this.onCancelRemoval,
        children: /*#__PURE__*/_jsx(DialogAlert, {
          dialogId: "profile-remove-artist-pick-dialog",
          dialogTitle: t('artistprofile_artistpick_editartistpick_5', 'Are you sure?', 'Refers to confirming the deletion of the Artist Pick'),
          body: t('artistprofile_artistpick_editartistpick_6', 'This will remove your Artist Pick from your Spotify profile.', '"Spotify profile" refers to the Artist Profile on Spotify music clients'),
          footer: /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(ButtonTertiary, {
              buttonSize: ButtonTertiary.sm,
              condensed: true,
              onClick: handleCancel,
              children: t('artistprofile_artistpick_editartistpick_7', 'Cancel', 'Refers to cancelling the deletion of the Artist Pick')
            }), /*#__PURE__*/_jsx(ButtonTertiary, {
              condensed: true,
              buttonSize: ButtonTertiary.sm,
              color: "green",
              onClick: handleConfirmRemoval,
              "data-testid": "confirm-remove",
              children: t('artistprofile_artistpick_editartistpick_8', 'Remove', 'Refers to confirming the deletion of the Artist Pick')
            })]
          })
        })
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderEditor", function () {
      var _this$props4 = _this.props,
          artist = _this$props4.artist,
          concertsMetadata = _this$props4.concertsMetadata,
          defaultSearchData = _this$props4.defaultSearchData,
          viewport = _this$props4.viewport,
          t = _this$props4.t;
      var _this$state = _this.state,
          isBackgroundImageEnabled = _this$state.isBackgroundImageEnabled,
          editedBackgroundImage = _this$state.editedBackgroundImage,
          clientArtistPick = _this$state.clientArtistPick,
          uploading = _this$state.uploading,
          showRemoveModal = _this$state.showRemoveModal,
          switchingEntity = _this$state.switchingEntity;

      if (editedBackgroundImage) {
        return _this.renderImageEditor();
      }

      if (switchingEntity) {
        return /*#__PURE__*/_jsx(Search, {
          onSelect: _this.onEntitySelect,
          onCancel: _this.stopSwitchingEntity,
          viewport: viewport,
          defaultSearchData: defaultSearchData,
          headerItem: /*#__PURE__*/_jsx(ConcertSearchItem, {
            concertsMetadata: concertsMetadata,
            onSelect: _this.onConcertSelect
          })
        });
      }

      var concertBehaviorDescription = t('artistprofile_artistpick_editartistpick_9', 'Fans will see the concert nearest their location.', '');
      var backgroundImageValid = !isBackgroundImageEnabled || !!(clientArtistPick !== null && clientArtistPick !== void 0 && clientArtistPick.backgroundImage);
      var isValidArtistPick = !!(clientArtistPick && clientArtistPick.uri && backgroundImageValid);
      return /*#__PURE__*/_jsxs("div", {
        style: {
          pointerEvents: uploading ? 'none' : 'initial'
        },
        "data-testid": "editable-artist-pick",
        className: "encore-muted-accent-set",
        children: [isBackgroundImageEnabled && /*#__PURE__*/_jsx(Card, _objectSpread(_objectSpread({}, !(clientArtistPick !== null && clientArtistPick !== void 0 && clientArtistPick.backgroundImage) && {
          outline: isBackgroundImageEnabled
        }), {}, {
          className: styles.edit_artist_pick__editor,
          image: clientArtistPick === null || clientArtistPick === void 0 ? void 0 : clientArtistPick.backgroundImage,
          top: /*#__PURE__*/_jsx(Comment, {
            editing: true,
            className: styles.edit_artist_pick__comment,
            comment: (clientArtistPick === null || clientArtistPick === void 0 ? void 0 : clientArtistPick.comment) || '',
            image: artist.imageUrl,
            onChange: _this.onComment
          }),
          middle: uploading ? /*#__PURE__*/_jsx(LoadingIndicator, {}) : /*#__PURE__*/_jsxs(ButtonTertiary, {
            onClick: _this.openImageEditing,
            className: styles.edit_artist_pick__card_middle,
            children: [clientArtistPick !== null && clientArtistPick !== void 0 && clientArtistPick.backgroundImage ? /*#__PURE__*/_jsx(IconEdit, {
              "aria-label": "edit image",
              focusable: false,
              className: styles.card__icon
            }) : /*#__PURE__*/_jsx(IconPlus, {
              "aria-label": "add image",
              focusable: false,
              className: styles.card__icon
            }), /*#__PURE__*/_jsx("div", {
              className: styles.edit_artist_pick__card_middle_text,
              children: clientArtistPick !== null && clientArtistPick !== void 0 && clientArtistPick.backgroundImage ? t('artistprofile_artistpick_editartistpick_10', 'Edit Image', 'Refers to editing the image currently included with the Artist Pick') : t('artistprofile_artistpick_editartistpick_11', 'Add Image', 'Refers to adding an image to the Artist Pick')
            })]
          }),
          bottom: clientArtistPick ? /*#__PURE__*/_jsx(Entity, {
            exitIcon: true,
            link: clientArtistPick.uri,
            image: clientArtistPick.image,
            title: clientArtistPick.title,
            subtitle: clientArtistPick.subtitle,
            switchEntity: _this.switchEntity,
            type: clientArtistPick.type
          }) : null
        })), !isBackgroundImageEnabled && (clientArtistPick ? /*#__PURE__*/_jsx(ArtistPickCompact, {
          artistImageUrl: artist.imageUrl,
          artistName: artist.name,
          comment: clientArtistPick.comment,
          editing: _this.props.editing,
          image: clientArtistPick.image,
          onCommentChange: _this.onComment,
          subtitle: clientArtistPick.subtitle,
          title: clientArtistPick.title,
          type: clientArtistPick.type,
          uri: clientArtistPick.uri
        }) : null), /*#__PURE__*/_jsx("input", {
          ref: _this.fileSelector,
          style: {
            display: 'none'
          },
          type: "file",
          accept: "image/*",
          onChange: _this.fileSelectorChanged,
          "data-testid": "background-image-input"
        }), /*#__PURE__*/_jsx(FormCheckbox, {
          checked: isBackgroundImageEnabled,
          onChange: _this.backgroundImageCheckboxChanged,
          "data-testid": "background-image-toggle",
          id: "background-image-toggle",
          children: t('artistprofile_artistpick_editartistpick_12', 'Background image', 'Refers to a background image that can be included with an Artist Pick')
        }), (clientArtistPick === null || clientArtistPick === void 0 ? void 0 : clientArtistPick.type) === 'concert_local' && /*#__PURE__*/_jsx("p", {
          className: styles.edit_artist_pick__concert_behavior,
          children: concertBehaviorDescription
        }), /*#__PURE__*/_jsx(EditControls, {
          category: "edit-artist-pick-2",
          onCancel: _this.cancelEdit,
          onSave: _this.onSave,
          saveable: !!(isValidArtistPick && !uploading),
          cancelable: !uploading,
          testIdPrefix: "artist-pick-"
        }), showRemoveModal && _this.renderRemoveModal()]
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSearchOrEditor", function () {
      var clientArtistPick = _this.state.clientArtistPick;
      return clientArtistPick && clientArtistPick.uri ? _this.renderEditor() : /*#__PURE__*/_jsx(Search, {
        onSelect: _this.onEntitySelect,
        onCancel: _this.stopEditing,
        viewport: _this.props.viewport,
        defaultSearchData: _this.props.defaultSearchData,
        headerItem: /*#__PURE__*/_jsx(ConcertSearchItem, {
          concertsMetadata: _this.props.concertsMetadata,
          onSelect: _this.onConcertSelect
        })
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderAnnouncement", function () {
      var _this$props$artistPic;

      var authorizedUser = _this.props.authorizedUser;
      return /*#__PURE__*/_jsx(ArtistPick, {
        artistPick: (_this$props$artistPic = _this.props.artistPick) !== null && _this$props$artistPic !== void 0 ? _this$props$artistPic : undefined,
        artist: _this.props.artist,
        editing: _this.props.editing,
        onClick: _this.startEditing,
        onCommentChange: _this.onComment,
        authorizedUser: authorizedUser,
        concertsMetadata: _this.props.concertsMetadata
      });
    });

    var artistPick = props.artistPick;
    var isBgImageInitiallyEnabled = !!(artistPick !== null && artistPick !== void 0 && artistPick.uri) ? // if editing an artist pick initialize to whether pick has bg image
    !!(artistPick !== null && artistPick !== void 0 && artistPick.backgroundImage) : // If creating a new artist pick default to bg image enabled
    true;
    _this.state = {
      clientArtistPick: props.artistPick,
      isBackgroundImageEnabled: isBgImageInitiallyEnabled,
      loadingImage: false,
      switchingEntity: !(props.artistPick && props.artistPick.uri),
      uploading: false
    };

    if (props.authorizedUser && (props.defaultArtistPick || props.defaultConcertPick)) {
      _this.state = _objectSpread(_objectSpread({}, _this.state), {}, {
        shouldLoadDefaultArtistPick: true
      });
    }

    _this.componentWrapper = /*#__PURE__*/React.createRef();
    _this.fileSelector = /*#__PURE__*/React.createRef();
    return _this;
  }

  _createClass(ClassEditArtistPickClassComponent, [{
    key: "ARTIST_PICK_SUCCESS",
    get: function get() {
      var t = this.props.t;
      return t('artistprofile_artistpick_editartistpick_1', 'We saved your pick. Listeners can see it on your profile now.', 'Profile refers to the Artist Profile page on Spotify');
    }
  }, {
    key: "DEFAULT_FAILURE",
    get: function get() {
      var t = this.props.t;
      return t('artistprofile_artistpick_editartistpick_2', 'Something went wrong, please try again later.', 'Refers to an unspecified error that occurred');
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.state.shouldLoadDefaultArtistPick) {
        this.setDefaultArtistPick();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.authorizedUser && this.props.defaultArtistPick && this.props.defaultArtistPick !== prevProps.defaultArtistPick) {
        this.setDefaultArtistPick();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          artistPick = _this$props5.artistPick,
          authorizedUser = _this$props5.authorizedUser,
          editing = _this$props5.editing,
          t = _this$props5.t;
      var artistPickExist = artistPick && artistPick.uri;
      return /*#__PURE__*/_jsx(Dimmable, {
        active: editing,
        children: /*#__PURE__*/_jsxs("div", {
          className: "encore-muted-accent-set ".concat(styles.edit_artist_pick),
          children: [/*#__PURE__*/_jsxs("header", {
            className: styles.edit_artist_pick__header,
            children: [/*#__PURE__*/_jsx(Type, {
              as: "h3",
              variant: "heading4",
              weight: Type.bold,
              color: "white",
              className: styles.edit_artist_pick__header_title,
              children: t('artistprofile_artistpick_editartistpick_13', 'Artist Pick', 'Refers to the "Artist Pick" feature')
            }), authorizedUser && artistPickExist && (editing ? /*#__PURE__*/_jsx(ButtonTertiary, {
              condensed: true,
              onClick: this.removeArtistPick,
              className: styles.edit_artist_pick__remove_button,
              buttonSize: ButtonTertiary.sm,
              "data-testid": "remove-button",
              children: t('artistprofile_artistpick_editartistpick_14', 'Remove', 'Refers to removing or deleting an Artist Pick')
            }) : /*#__PURE__*/_jsx(PencilButton, {
              onClick: this.startEditing,
              testIdPrefix: "artist-pick-",
              "aria-label": "edit artist pick"
            }))]
          }), /*#__PURE__*/_jsx("div", {
            className: styles.edit_artist_pick__container,
            ref: this.componentWrapper,
            children: authorizedUser && editing ? this.renderSearchOrEditor() : this.renderAnnouncement()
          })]
        })
      });
    }
  }]);

  return ClassEditArtistPickClassComponent;
}(Component);
export function EditArtistPick(props) {
  var _props$artistPick;

  var _useState = useState(false),
      editing = _useState[0],
      setEditing = _useState[1];

  var _useHelpButton = useHelpButton(),
      setHelpVisible = _useHelpButton.setVisible,
      helpVisible = _useHelpButton.visible;

  var helpWasVisible = React.useRef(helpVisible);

  var _useProfileSwitcheroo = useProfileSwitcheroo(function () {
    setEditing(true);
    helpWasVisible.current = helpVisible;
    setHelpVisible(false);
  }, function () {
    return setEditing(false);
  }),
      _useProfileSwitcheroo2 = _useProfileSwitcheroo.organizationUri,
      organizationUri = _useProfileSwitcheroo2 === void 0 ? '' : _useProfileSwitcheroo2,
      renderedProfileSwitcheroo = _useProfileSwitcheroo.renderedProfileSwitcheroo,
      showProfileSwitcheroo = _useProfileSwitcheroo.showProfileSwitcheroo;

  var stopEditing = function stopEditing() {
    setEditing(false);
    setHelpVisible(helpWasVisible.current);
  };

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [renderedProfileSwitcheroo, /*#__PURE__*/_jsx(ClassEditArtistPick, {
      artist: props.artist,
      artistPick: props.artistPick,
      authorizedUser: props.authorizedUser,
      concertsMetadata: props.concertsMetadata,
      defaultArtistPick: props.defaultArtistPick,
      defaultConcertPick: props.defaultConcertPick,
      defaultSearchData: props.defaultSearchData,
      editing: editing // This key is important for resetting the uncontrolled draft state of
      // the Artist Pick. See this blog post for more details on this
      // technique: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
      ,
      organizationUri: organizationUri,
      setAlert: props.setAlert,
      stopEditing: stopEditing,
      startEditing: showProfileSwitcheroo,
      updateArtistPick: props.updateArtistPick,
      viewport: props.viewport
    }, (_props$artistPick = props.artistPick) === null || _props$artistPick === void 0 ? void 0 : _props$artistPick.uri)]
  });
}
export var ClassEditArtistPick = withT(ClassEditArtistPickClassComponent);