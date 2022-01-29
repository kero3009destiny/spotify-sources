import _slicedToArray from "/var/jenkins_home/workspace/tingle.543d68ba-5fcf-4472-afdf-5be54deb05de/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ErrorBoundary, useError } from '@mrkt/features/Platform';
import { KeyboardDetectionContext } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { LoadingIndicator } from '../../../shared/components/LoadingIndicator';
import { useBannerActions } from '../../../features/Banner';
import { usePageLocation } from '../../../features/page';
import { jsx as _jsx } from "react/jsx-runtime";
export var MAIN_CONTENT_ID = 's4a-page-main-content';

function BodyError() {
  var _useBannerActions = useBannerActions(),
      showError = _useBannerActions.showError,
      hide = _useBannerActions.hide;

  var _useError = useError(),
      _useError2 = _slicedToArray(_useError, 2),
      clearError = _useError2[1];

  var location = usePageLocation();
  var t = useT();
  useEffect(function () {
    var id = 'body-error';
    showError(t('PAGE_BODY_ERROR', 'Something went wrong', 'Displayed in a banner in the page body when there is an error'), {
      id: id,
      dismissOnRouteChange: false
    });
    return function () {
      hide(id);
    };
  }, [showError, hide, t]); // clear error on location change

  useEffect(function () {
    return function () {
      clearError();
    };
  }, [location, clearError]);
  return null;
}

var MainContent = styled.div.withConfig({
  displayName: "Body__MainContent",
  componentId: "sc-1a568tz-0"
})(["", ""], function (_ref) {
  var $isUsingKeyboard = _ref.$isUsingKeyboard;
  return !$isUsingKeyboard && "\n    &:focus {\n      outline: 0;\n    }\n  ";
});
export function PageRouteBody(_ref2) {
  var children = _ref2.children;

  var _useContext = useContext(KeyboardDetectionContext),
      isUsingKeyboard = _useContext.isUsingKeyboard;

  return /*#__PURE__*/_jsx(React.Suspense, {
    fallback: /*#__PURE__*/_jsx(LoadingIndicator, {}),
    children: /*#__PURE__*/_jsx(ErrorBoundary, {
      name: "s4a-page-body",
      fallback: /*#__PURE__*/_jsx(BodyError, {}),
      children: /*#__PURE__*/_jsx(MainContent, {
        id: MAIN_CONTENT_ID,
        tabIndex: -1,
        $isUsingKeyboard: isUsingKeyboard,
        children: children
      })
    })
  });
}