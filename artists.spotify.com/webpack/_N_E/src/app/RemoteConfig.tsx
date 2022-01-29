import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import React, { useMemo } from 'react';
import { RemoteConfigProvider, createResolver } from '@mrkt/features/RemoteConfig';
import { useCurrentUser } from '../features/currentUser';
import { transport } from '@mrkt/features/transport';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function RemoteConfigResolver(_ref) {
  var _useCurrentUser;

  var children = _ref.children;
  var userKey = (_useCurrentUser = useCurrentUser()) === null || _useCurrentUser === void 0 ? void 0 : _useCurrentUser.username;
  var value = useMemo(function () {
    var resolver = createResolver({
      transport: transport
    });
    resolver.resolve({
      userKey: userKey
    });
    return resolver;
  }, [userKey]);
  return /*#__PURE__*/_jsx(RemoteConfigProvider, {
    value: value,
    children: children
  });
}

export function RemoteConfig(props) {
  // needed for now to get tests working until we figure out transport in tests
  if (false) {
    return /*#__PURE__*/_jsx(_Fragment, {
      children: props.children
    });
  }

  return /*#__PURE__*/_jsx(RemoteConfigResolver, _objectSpread({}, props));
}