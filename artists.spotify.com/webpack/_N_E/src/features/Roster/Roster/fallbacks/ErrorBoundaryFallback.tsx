import _slicedToArray from "/var/jenkins_home/workspace/tingle.a074a366-9339-45fe-940a-3742034896fd/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
// ignore-string-externalization
import React from 'react';
import { useError } from '@mrkt/features/Platform';
import { useBannerDispatch, ActionType, BannerType } from '../../../Banner/BannerState';
import { sendRosterSLOError } from '../logging/sloLogger';
import { jsx as _jsx } from "react/jsx-runtime";
export function ErrorBoundaryFallback() {
  // get the actual exception that was thrown
  var _useError = useError(),
      _useError2 = _slicedToArray(_useError, 1),
      error = _useError2[0]; // get a reference to the global banner for mrkt-web


  var dispatch = useBannerDispatch(); // execute this function once the fallback component mounts in the DOM.
  // Show the error banner to the user.

  React.useEffect(function () {
    dispatch({
      type: ActionType.SHOW,
      message: error.message,
      bannerType: BannerType.ERROR,
      bannerOptions: {
        compact: false,
        dismissOnRouteChange: true,
        showDismissButton: false
      }
    });
  }, [dispatch, error.message]); // Additionally, log an SLO error event

  React.useEffect(function () {
    sendRosterSLOError();
  }, []);
  return /*#__PURE__*/_jsx("div", {
    "data-testid": "roster-error"
  });
}