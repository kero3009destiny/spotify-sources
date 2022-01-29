// ignore-string-externalization
import { withRouter } from 'react-router';
import React, { useEffect } from 'react';
import { useBannerActions } from './useBannerActions';
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
export var RouteChangeDismisserComponent = function RouteChangeDismisserComponent(_ref) {
  var history = _ref.history,
      state = _ref.state;

  var _useBannerActions = useBannerActions(),
      hide = _useBannerActions.hide;

  var dismissRelevantBanners = function dismissRelevantBanners() {
    // Use history.listen instead of useEffect(..., [path, get]) to prevent dismissal from
    // initial load.
    return history.listen(function () {
      state.banners.forEach(function (banner) {
        if (banner.options.dismissOnRouteChange) {
          hide(banner.id);
        }
      });
    });
  };

  useEffect(dismissRelevantBanners, [history, state]);
  return /*#__PURE__*/_jsx(_Fragment, {});
};
export var RouteChangeDismisser = withRouter(RouteChangeDismisserComponent);