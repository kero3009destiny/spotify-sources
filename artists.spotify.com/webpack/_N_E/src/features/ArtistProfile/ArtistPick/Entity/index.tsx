import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React from 'react';
import classNames from 'classnames';
import { IconChevronRight, IconTrack, IconX } from '@spotify-internal/encore-web';
import CalendarIcon from '../../../ConcertsTab/CalendarIcon';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function Entity(_ref) {
  var image = _ref.image,
      title = _ref.title,
      subtitle = _ref.subtitle,
      className = _ref.className,
      exitIcon = _ref.exitIcon,
      switchEntity = _ref.switchEntity,
      link = _ref.link,
      type = _ref.type;
  var Element = link && !exitIcon ? 'a' : 'div';
  var isConcert = type === 'concert_local';
  return /*#__PURE__*/_jsx(Element, _objectSpread(_objectSpread({}, link && {
    href: link
  }), {}, {
    className: styles.entity__link,
    "data-testid": "artist-pick-entity",
    children: /*#__PURE__*/_jsxs("div", {
      className: classNames(styles.entity, className),
      children: [isConcert && /*#__PURE__*/_jsx(CalendarIcon, {
        day: "DD",
        month: "MM",
        size: "ap"
      }), !isConcert && (image ? /*#__PURE__*/_jsx("div", {
        className: styles.entity__image,
        style: {
          backgroundImage: "url(".concat(image, ")")
        },
        "data-testid": "artist-pick-entity-image"
      }) : /*#__PURE__*/_jsx("div", {
        className: styles.entity__image_placeholder,
        children: /*#__PURE__*/_jsx(IconTrack, {
          "aria-hidden": true,
          focusable: false
        })
      })), /*#__PURE__*/_jsxs("div", {
        className: styles.entity__info,
        children: [/*#__PURE__*/_jsx("div", {
          className: styles.entity__info_title,
          children: title
        }), /*#__PURE__*/_jsx("div", {
          className: styles.entity__info_subtitle,
          children: subtitle
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: styles.entity__icon_right,
        children: exitIcon ? /*#__PURE__*/_jsx(IconX, {
          "aria-hidden": true,
          focusable: false,
          className: styles.entity__icon,
          iconSize: 16,
          onClick: switchEntity
        }) : /*#__PURE__*/_jsx(IconChevronRight, {
          "aria-hidden": true,
          focusable: false,
          className: classNames(styles.entity__icon, styles.entity__icon_visible),
          iconSize: 16
        })
      })]
    })
  }));
}