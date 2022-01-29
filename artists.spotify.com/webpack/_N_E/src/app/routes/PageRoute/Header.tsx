import _slicedToArray from "/var/jenkins_home/workspace/tingle.543d68ba-5fcf-4472-afdf-5be54deb05de/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import React, { useEffect } from 'react';
import { ErrorBoundary, useError } from '@mrkt/features/Platform';
import { useCurrentUser } from '../../../features/currentUser';
import { Header, FlyOutToggle } from '../../../shared/components/Header';
import { usePageLocation } from '../../../features/page';
import { jsx as _jsx } from "react/jsx-runtime";

var fallback = /*#__PURE__*/_jsx(Header, {
  children: /*#__PURE__*/_jsx(FlyOutToggle, {
    avatar: null,
    name: null
  })
});

function HeaderError() {
  var _useError = useError(),
      _useError2 = _slicedToArray(_useError, 2),
      clearError = _useError2[1];

  var location = usePageLocation(); // clear error on location change

  useEffect(function () {
    return function () {
      clearError();
    };
  }, [location, clearError]);
  return fallback;
}

export function PageRouteHeader(_ref) {
  var children = _ref.children;
  var currentUser = useCurrentUser(); // don't render header if logged out

  if (!currentUser) {
    return null;
  }

  return /*#__PURE__*/_jsx(React.Suspense, {
    fallback: fallback,
    children: /*#__PURE__*/_jsx(ErrorBoundary, {
      name: "s4a-page-header",
      fallback: /*#__PURE__*/_jsx(HeaderError, {}),
      children: children
    })
  });
}