import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { useMemo } from 'react';
import { ActionType, BannerType, useBannerDispatch } from './BannerState';
import { defaultOptions } from './BannerOptions';
export var useBannerActions = function useBannerActions() {
  var dispatch = useBannerDispatch();
  return useMemo(function () {
    var hideAll = function hideAll() {
      return dispatch({
        type: ActionType.HIDE
      });
    };

    var hide = function hide(bannerId) {
      return dispatch({
        type: ActionType.HIDE,
        bannerId: bannerId
      });
    };

    var curriedShow = function curriedShow(bannerType) {
      return function (message) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return dispatch({
          type: ActionType.SHOW,
          bannerType: bannerType,
          message: message,
          bannerOptions: _objectSpread(_objectSpread({}, defaultOptions), options)
        });
      };
    };

    return {
      hideAll: hideAll,
      hide: hide,
      showSuccess: curriedShow(BannerType.SUCCESS),
      showError: curriedShow(BannerType.ERROR),
      showInfo: curriedShow(BannerType.INFO),
      showWarning: curriedShow(BannerType.WARNING),
      showAnnouncement: curriedShow(BannerType.ANNOUNCEMENT)
    };
  }, [dispatch]);
};