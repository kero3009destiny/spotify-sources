import _classCallCheck from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _inherits from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import { Type } from '@spotify-internal/encore-web';
import { withT } from '@mrkt/features/i18n';
import { EntityContextMenu } from '../EntityContextMenu';
import { MediaWithText } from '../Card/Horizontal/MediaWithText';
import styles from './index.module.scss';
/*
  Formats the displayed release date according to available
  information (varies by release).
  Full date: MON DD, YYYY [MON = short month name e.g. FEB]
*/

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function formatNewReleaseSubtitle(release) {
  var subtitle = '';

  if (release.month) {
    var monthDate = new Date(release.year, release.month - 1);
    var monthInWords = monthDate.toString().split(' ')[1].toUpperCase();
    subtitle += "".concat(monthInWords, " ");
  }

  if (release.month && release.day) subtitle += "".concat(release.day, ", ");
  return subtitle + release.year;
}

var NewReleaseComponent = /*#__PURE__*/function (_Component) {
  _inherits(NewReleaseComponent, _Component);

  var _super = _createSuper(NewReleaseComponent);

  function NewReleaseComponent() {
    _classCallCheck(this, NewReleaseComponent);

    return _super.apply(this, arguments);
  }

  _createClass(NewReleaseComponent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          artist = _this$props.artist,
          newRelease = _this$props.newRelease,
          user = _this$props.user,
          t = _this$props.t;
      var newReleaseTitle = t('artistprofile_newrelease_1', 'Latest Release', 'The most recent music the artist has released. This should be consistent with the consumer product.');
      var newReleaseSubtitle = formatNewReleaseSubtitle(newRelease);
      var controlsId = "catalog-release-controls-".concat(newRelease === null || newRelease === void 0 ? void 0 : newRelease.uri);
      return /*#__PURE__*/_jsxs("div", {
        className: styles.new_release,
        children: [/*#__PURE__*/_jsx(Type, {
          as: "h3",
          variant: "heading4",
          weight: Type.bold,
          semanticColor: "textBase",
          children: newReleaseTitle
        }), /*#__PURE__*/_jsxs("div", {
          className: styles.new_release__content,
          children: [/*#__PURE__*/_jsx(EntityContextMenu, {
            artist: artist,
            className: styles.new_release__context_menu_wrapper,
            controlsId: controlsId,
            entity: newRelease,
            user: user
          }), /*#__PURE__*/_jsx(MediaWithText, {
            title: newRelease.name,
            subtitle: newReleaseSubtitle,
            image: newRelease.artwork && newRelease.artwork.uri,
            href: newRelease.uri,
            hasSmControls: true
          })]
        })]
      });
    }
  }]);

  return NewReleaseComponent;
}(Component);
/* eslint-disable-next-line import/no-default-export */


export default withT(NewReleaseComponent);