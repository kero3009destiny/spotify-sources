import _classCallCheck from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _inherits from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import { Backdrop, ButtonPrimary, Type } from '@spotify-internal/encore-web';
import { DialogConfirmation } from '@mrkt/features/Dialog';
import { withRouter } from 'react-router-dom';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { withT } from '@mrkt/features/i18n';
import { Table, TableRow, TableHeadCell, TableCell } from '../../../../shared/components/Table';
import { MediaObject } from '../../../../shared/components/MediaObject';
import { CoverArt } from '../../../../shared/components/CoverArt';
import { applyMetricSuffix } from '../../../../shared/lib/numberHelpers';
import { matchUri } from '../../../../shared/lib/urlHelpers';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var ReleaseDialogClassComponent = /*#__PURE__*/function (_Component) {
  _inherits(ReleaseDialogClassComponent, _Component);

  var _super = _createSuper(ReleaseDialogClassComponent);

  function ReleaseDialogClassComponent() {
    _classCallCheck(this, ReleaseDialogClassComponent);

    return _super.apply(this, arguments);
  }

  _createClass(ReleaseDialogClassComponent, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          album = _this$props.album,
          songs = _this$props.songs,
          onClose = _this$props.onClose,
          t = _this$props.t;

      var head = /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(MediaObject, {
          alignment: "centered",
          compressed: true,
          thumbnail: /*#__PURE__*/_jsx(CoverArt, {
            className: styles.dialog__artwork,
            imgSrc: album.artwork && album.artwork.uri,
            size: 96
          }),
          title: /*#__PURE__*/_jsx("span", {
            children: /*#__PURE__*/_jsx(Type.h1, {
              variant: "heading3",
              condensed: true,
              children: album.name
            })
          }),
          subtitle: /*#__PURE__*/_jsx("span", {
            children: /*#__PURE__*/_jsxs(Type.p, {
              variant: Type.body2,
              condensed: true,
              children: [album.year, " \xB7 ", songs.length, ' ', songs.length === 1 ? 'Song' : 'Songs']
            })
          })
        }), /*#__PURE__*/_jsx(Table, {
          className: styles.dialog__header,
          head: /*#__PURE__*/_jsxs(TableRow, {
            children: [/*#__PURE__*/_jsx(TableHeadCell, {
              highlight: true,
              className: styles.dialog__no_padding_left,
              children: t('artistprofile_catalog_releasedialog_1', 'Songs', 'Refers to songs that the artist has released')
            }), /*#__PURE__*/_jsx(TableHeadCell, {
              alignRight: true,
              className: styles.dialog__no_padding_right,
              children: t('artistprofile_catalog_releasedialog_2', 'Streams', 'Refers to number of times a song has been played by end-users')
            })]
          })
        })]
      });

      var body = songs.length > 0 && /*#__PURE__*/_jsx(Table, {
        body: songs.map(function (song) {
          return /*#__PURE__*/_jsxs(TableRow, {
            className: styles.dialog__row,
            clickable: true // @ts-ignore
            ,
            onClick: function onClick() {
              sendEvent({
                eventCategory: 'ArtistProfileCatalog',
                eventAction: 'click',
                eventLabel: 'viewSongStats'
              });

              _this.props.history.push("song/".concat(matchUri(song.uri).id));
            },
            children: [/*#__PURE__*/_jsx(TableCell, {
              highlight: true,
              className: styles.dialog__no_horizontal_padding,
              children: song.name
            }), /*#__PURE__*/_jsx(TableCell, {
              alignRight: true,
              className: styles.dialog__no_horizontal_padding,
              children: song.error ? song.error : applyMetricSuffix(song.streams)
            })]
          }, "".concat(song.name, "-").concat(song.uri));
        })
      });

      var dialog = /*#__PURE__*/_jsx("div", {
        className: styles.dialog,
        children: /*#__PURE__*/_jsx(Backdrop, {
          onClose: onClose,
          center: true,
          children: /*#__PURE__*/_jsx(DialogConfirmation, {
            dialogId: "profile-catalog-release-dialog",
            body: body,
            dialogTitle: head,
            footer: /*#__PURE__*/_jsx("div", {
              children: /*#__PURE__*/_jsx(ButtonPrimary, {
                buttonSize: ButtonPrimary.sm,
                onClick: onClose,
                children: t('artistprofile_catalog_releasedialog_3', 'Close', 'Refers to closing the open dialog')
              })
            })
          })
        })
      });

      return dialog;
    }
  }]);

  return ReleaseDialogClassComponent;
}(Component);

_defineProperty(ReleaseDialogClassComponent, "defaultProps", {
  album: {},
  songs: [],
  onClose: function onClose() {}
});

var ReleaseDialog = withT(ReleaseDialogClassComponent);
/* eslint-disable-next-line import/no-default-export */

export default withRouter(ReleaseDialog);