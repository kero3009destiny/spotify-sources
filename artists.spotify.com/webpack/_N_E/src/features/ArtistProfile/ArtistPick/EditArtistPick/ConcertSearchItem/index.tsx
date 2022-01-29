import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import React from 'react';
import classNames from 'classnames';
import { Type } from '@spotify-internal/encore-web';
import CalendarIcon from '../../../../ConcertsTab/CalendarIcon';
import styles from './index.module.scss';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function ConcertSearchItem(_ref) {
  var _classNames;

  var onSelect = _ref.onSelect,
      concertsMetadata = _ref.concertsMetadata;
  var t = useT();
  var inactive = !(concertsMetadata !== null && concertsMetadata !== void 0 && concertsMetadata.concertsCount) || (concertsMetadata === null || concertsMetadata === void 0 ? void 0 : concertsMetadata.concertsCount) === 0;
  var concertClassNames = classNames((_classNames = {}, _defineProperty(_classNames, styles.concert_item__text, true), _defineProperty(_classNames, styles.concert_item__text__inactive, inactive), _classNames));
  return /*#__PURE__*/_jsx("li", {
    "data-testid": "concert-search-item",
    children: /*#__PURE__*/_jsxs("button", {
      type: "button",
      "data-testid": "concert-button",
      className: styles.concert_button,
      disabled: inactive,
      onClick: onSelect,
      children: [/*#__PURE__*/_jsx(Type, {
        className: styles.concert_header,
        children: t('artistprofile_artistpick_editartistpick_concertsearchitem_1', 'CONCERTS', '')
      }), /*#__PURE__*/_jsxs("div", {
        className: styles.concert_item,
        children: [/*#__PURE__*/_jsx(CalendarIcon, {
          day: "DD",
          month: "MM",
          size: "ap",
          variant: inactive ? 'inactive' : 'default'
        }), /*#__PURE__*/_jsx("div", {
          className: concertClassNames,
          children: /*#__PURE__*/_jsx(Type, {
            children: inactive ? t('artistprofile_artistpick_editartistpick_concertsearchitem_2', 'No upcoming concerts', '') : t('artistprofile_artistpick_editartistpick_concertsearchitem_3', 'Your concerts ({concertsCount})', 'The concerts or shows you are playing.', {
              concertsCount: concertsMetadata === null || concertsMetadata === void 0 ? void 0 : concertsMetadata.concertsCount
            })
          })
        })]
      })]
    })
  }, "concertsHeaderItem");
}