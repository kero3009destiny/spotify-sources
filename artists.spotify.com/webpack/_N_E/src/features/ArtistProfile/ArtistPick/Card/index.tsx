import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
// ignore-string-externalization
import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function Card(_ref) {
  var _classNames;

  var bottom = _ref.bottom,
      className = _ref.className,
      image = _ref.image,
      middle = _ref.middle,
      onClick = _ref.onClick,
      outline = _ref.outline,
      top = _ref.top;
  var buttonLike = typeof onClick !== 'undefined';
  var cardClassName = classNames(styles.card, className, (_classNames = {}, _defineProperty(_classNames, styles.card__with_background, image), _defineProperty(_classNames, styles.card__outline, outline), _classNames));
  var role = buttonLike ? 'button' : undefined;
  var style = image ? {
    backgroundImage: "url(".concat(image, ")")
  } : undefined;
  var tabIndex = buttonLike ? 0 : undefined;
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    _jsx("div", {
      "data-testid": "card",
      className: cardClassName,
      onClick: onClick,
      role: role,
      tabIndex: tabIndex,
      style: style,
      children: /*#__PURE__*/_jsxs("div", {
        className: styles.card__wrapper,
        children: [top && /*#__PURE__*/_jsx("div", {
          className: styles.card__top,
          children: top
        }), middle && /*#__PURE__*/_jsx("div", {
          className: styles.card__middle,
          children: middle
        }), bottom && /*#__PURE__*/_jsx("div", {
          className: styles.card__bottom,
          children: bottom
        })]
      })
    })
  );
}