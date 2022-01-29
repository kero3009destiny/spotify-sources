import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["artist", "authorizedUser", "isSingle", "release", "user"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import { Type, IconAlbum, gray60, white } from '@spotify-internal/encore-web';
import classNames from 'classnames';
import { UnstyledButton } from '@mrkt/features/UnstyledButton';
import { EntityContextMenu } from '../EntityContextMenu';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function CatalogRelease(_ref) {
  var artist = _ref.artist,
      authorizedUser = _ref.authorizedUser,
      isSingle = _ref.isSingle,
      release = _ref.release,
      user = _ref.user,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var name = release.name,
      year = release.year;
  var artworkUri = release.artwork ? release.artwork.uri : null;
  var isPlaceholder = !release.artwork;
  var controlsId = "catalog-release-controls-".concat(release.uri);
  return /*#__PURE__*/_jsxs("div", _objectSpread(_objectSpread({
    className: styles.catalog_release
  }, restProps), {}, {
    children: [/*#__PURE__*/_jsxs("div", {
      id: controlsId,
      className: classNames(styles.catalog_release__controls, _defineProperty({}, styles.catalog_release__controls__is_single, isSingle)),
      children: [/*#__PURE__*/_jsx(EntityContextMenu, {
        authorizedUser: authorizedUser,
        controlsId: controlsId,
        entity: release,
        artist: artist,
        user: user,
        isPlaceholder: isPlaceholder
      }), artworkUri ? /*#__PURE__*/_jsx("img", {
        alt: "",
        className: styles.catalog_release__artwork,
        src: artworkUri
      }) : /*#__PURE__*/_jsx("div", {
        className: styles.catalog_release__artwork_placeholder,
        children: /*#__PURE__*/_jsx("div", {
          className: styles.catalog_release__artwork_placeholder_icon,
          children: /*#__PURE__*/_jsx(IconAlbum, {
            "aria-hidden": true,
            focusable: false,
            iconSize: 64
          })
        })
      })]
    }), /*#__PURE__*/_jsx(Type, {
      as: Type.p,
      color: white,
      children: /*#__PURE__*/_jsx(UnstyledButton, {
        type: "button",
        children: name
      })
    }), /*#__PURE__*/_jsx(Type, {
      as: Type.p,
      color: gray60,
      children: year
    })]
  }));
}

/* eslint-disable-next-line import/no-default-export */
export default CatalogRelease;