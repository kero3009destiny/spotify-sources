import _defineProperty from "/var/jenkins_home/workspace/tingle.7e84e585-f525-445b-9096-4feef0190901/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

var _BannerTypeToColorSet;

// ignore-string-externalization
import React, { useEffect, useRef } from 'react';
import { Banner as EncoreBanner, spacer, breakpoint } from '@spotify-internal/encore-web';
import styled, { css } from 'styled-components';
import { appMaxWidth } from '../../shared/styles/variables';
import { navPadding } from '../../shared/components/Header';
import { BannerType } from './BannerState';
import { useBannerActions } from './useBannerActions';
import { jsx as _jsx } from "react/jsx-runtime";
var BannerTypeToColorSet = (_BannerTypeToColorSet = {}, _defineProperty(_BannerTypeToColorSet, BannerType.WARNING, 'warning'), _defineProperty(_BannerTypeToColorSet, BannerType.ANNOUNCEMENT, 'announcement'), _defineProperty(_BannerTypeToColorSet, BannerType.ERROR, 'negative'), _defineProperty(_BannerTypeToColorSet, BannerType.SUCCESS, 'positive'), _defineProperty(_BannerTypeToColorSet, BannerType.INFO, undefined), _BannerTypeToColorSet);
var BannerWrapper = styled.div.withConfig({
  displayName: "Banner__BannerWrapper",
  componentId: "sc-1fbt1g7-0"
})(["@media (min-width:", "){", ";width:100%;padding-top:24px;& > *{border-radius:", ";}}"], breakpoint.screenSmMin, function (props) {
  return props.compact ? css(["margin:0;padding:0;margin-top:", ";"], props.negateNavPadding ? "-".concat(navPadding) : 0) : css(["margin-bottom:", ";margin-left:auto;margin-right:auto;padding-left:", ";padding-right:", ";max-width:", ";"], spacer.spacer24, spacer.spacer48, spacer.spacer48, appMaxWidth);
}, function (props) {
  return props.compact ? '0' : '4px';
});
export var Banner = function Banner(_ref) {
  var singleBannerState = _ref.singleBannerState,
      index = _ref.index;
  var timer = useRef();

  var _useBannerActions = useBannerActions(),
      hide = _useBannerActions.hide;

  var _singleBannerState$op = singleBannerState.options,
      compact = _singleBannerState$op.compact,
      showDismissButton = _singleBannerState$op.showDismissButton,
      timeout = _singleBannerState$op.timeout;
  useEffect(function () {
    if (timeout && !timer.current) {
      timer.current = setTimeout(function () {
        hide(singleBannerState.id);
      }, timeout);
    }

    return function () {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [hide, singleBannerState.id, timeout]);
  var colorSet = BannerTypeToColorSet[singleBannerState.type];
  return /*#__PURE__*/_jsx(BannerWrapper, {
    compact: compact,
    negateNavPadding: compact && index === 0,
    children: /*#__PURE__*/_jsx(EncoreBanner, {
      "data-testid": "banner",
      "data-slo-id": "banner",
      colorSet: colorSet,
      onClose: showDismissButton ? function () {
        return hide(singleBannerState.id);
      } : undefined,
      children: singleBannerState.message
    })
  });
};