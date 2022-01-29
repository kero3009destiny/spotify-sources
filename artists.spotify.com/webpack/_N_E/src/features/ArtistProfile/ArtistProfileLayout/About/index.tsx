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
import { BiographyWithImages } from '../../BiographyWithImages';
import { DefaultSocialLinks } from '../../SocialLinks/DefaultSocialLinks';
import styles from './index.module.scss';
import { withT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var AboutClassComponent = /*#__PURE__*/function (_Component) {
  _inherits(AboutClassComponent, _Component);

  var _super = _createSuper(AboutClassComponent);

  function AboutClassComponent() {
    var _this;

    _classCallCheck(this, AboutClassComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onSaveSocialLinks", function (links) {
      var t = _this.props.t;

      _this.props.updateSocialLinks(links);

      _this.props.setAlert({
        title: t('artistprofile_artistprofilelayout_about_1', 'We saved your links. Fans can see them on your profile now.', 'Links refers to links to social media accounts associated with the artist')
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSocialLinksError", function () {
      var t = _this.props.t;

      _this.props.setAlert({
        title: t('artistprofile_artistprofilelayout_about_2', 'Something went wrong, please try again later.', 'Refers to an unspecified error that occurred'),
        error: true
      });
    });

    return _this;
  }

  _createClass(AboutClassComponent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          artist = _this$props.artist,
          authorized = _this$props.authorized,
          data = _this$props.data,
          saveBio = _this$props.saveBio,
          setAlert = _this$props.setAlert,
          updateGalleryImages = _this$props.updateGalleryImages,
          viewport = _this$props.viewport;
      var biographyText = data.autobiography && data.autobiography.body ? data.autobiography.body : data.biography;
      return /*#__PURE__*/_jsxs("div", {
        className: styles.about,
        "data-testid": "about-tab-content",
        children: [/*#__PURE__*/_jsx("div", {
          className: styles.about__main,
          children: /*#__PURE__*/_jsx(BiographyWithImages, {
            text: biographyText,
            autoBiographyOrigin: data === null || data === void 0 ? void 0 : data.autobiography,
            artistId: artist.id,
            saveBio: saveBio,
            setAlert: setAlert,
            updateGalleryImages: updateGalleryImages,
            authorizedUser: authorized,
            gallery: data === null || data === void 0 ? void 0 : data.gallery,
            gallerySource: data === null || data === void 0 ? void 0 : data.gallerySource,
            viewport: viewport
          })
        }), /*#__PURE__*/_jsx("div", {
          className: styles.about__aside,
          children: /*#__PURE__*/_jsx(DefaultSocialLinks, {
            artistId: artist.id,
            autobiography: data === null || data === void 0 ? void 0 : data.autobiography,
            authorizedUser: authorized,
            onError: this.onSocialLinksError,
            onSave: this.onSaveSocialLinks
          })
        })]
      });
    }
  }]);

  return AboutClassComponent;
}(Component);

_defineProperty(AboutClassComponent, "defaultProps", {
  viewport: 0,
  saveBio: function saveBio() {},
  updateSocialLinks: function updateSocialLinks() {},
  updateGalleryImages: function updateGalleryImages() {}
});

export var About = withT(AboutClassComponent);