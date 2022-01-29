// ignore-string-externalization
import React from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
export var PageLocation = withRouter(function PageLocationComponent(_ref) {
  var location = _ref.location,
      children = _ref.children;
  useScrollToTop(location.pathname);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: children
  });
});
/** @deprecated use useLocation() from 'react-router-dom' instead */

export function usePageLocation() {
  return useLocation();
}

function useScrollToTop() {
  var pathname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
  React.useEffect(function () {
    window.scrollTo(0, 0);
  }, [pathname]);
}