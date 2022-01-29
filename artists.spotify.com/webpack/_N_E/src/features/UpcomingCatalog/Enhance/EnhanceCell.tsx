import _slicedToArray from "/var/jenkins_home/workspace/tingle.a145e465-b651-44f5-9906-e1b8a08e07b5/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Type, spacer20 } from '@spotify-internal/encore-web';
import { createErrorLoggerHook } from '@mrkt/features/Platform';
import { useT } from '@mrkt/features/i18n';
import { canvasExperience, storylinesExperience } from '@mrkt/features/experience-definitions';
import { UpcomingReleaseDialog } from '@mrkt/features/upcoming-release';
import { logGabitoEvent } from '@mrkt/features/gabito';
import { ButtonTertiaryAsLink } from '../../EncoreCreatorWebHelpers';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var PrereleaseCell = styled.div.withConfig({
  displayName: "EnhanceCell__PrereleaseCell",
  componentId: "sc-12pbnhq-0"
})(["position:relative;max-width:250px;padding-right:", ";"], spacer20);

var EnhanceCell = function EnhanceCell(props) {
  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      storylinesError = _React$useState2[0],
      setStorylinesError = _React$useState2[1];

  var _React$useState3 = React.useState(),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      canvasError = _React$useState4[0],
      setCanvasError = _React$useState4[1];

  var _useState = useState(false),
      showDialog = _useState[0],
      setShowDialog = _useState[1];

  var t = useT();
  var useCanvasLogError = createErrorLoggerHook({
    view: 'upcoming-release',
    experience: canvasExperience
  });
  var useStorylinesLogError = createErrorLoggerHook({
    view: 'upcoming-release',
    experience: storylinesExperience
  });

  var showSuccessAlert = function showSuccessAlert(title) {
    return title && props.setAlert({
      title: title
    });
  };

  var showErrorAlert = function showErrorAlert(title) {
    return props.setAlert({
      title: title,
      error: true
    });
  };

  var handleCanvasError = function handleCanvasError(message, err) {
    setCanvasError(err);
    showErrorAlert(message);
  };

  var handleStorylinesError = function handleStorylinesError(message, err) {
    setStorylinesError(err);
    showErrorAlert(message);
  };

  useCanvasLogError(canvasError);
  useStorylinesLogError(storylinesError);
  return /*#__PURE__*/_jsxs(PrereleaseCell, {
    children: [/*#__PURE__*/_jsx(Type, {
      as: "p",
      variant: Type.body2,
      condensed: true,
      children: t('5debf0', 'Enhance your release', 'Release refers to a music release such as an album.')
    }), /*#__PURE__*/_jsx(ButtonTertiaryAsLink, {
      condensed: true,
      buttonSize: "sm",
      semanticColor: "textBrightAccent",
      to: "#",
      onClick: function onClick(e) {
        e.preventDefault();
        setShowDialog(true);
      },
      "data-slo-id": "enhance-upcoming-release",
      "data-testid": "enhance-cell--cta",
      children: t('42edee', 'Manage', '')
    }), showDialog && props.dialogRootRef.current && /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/_jsx(UpcomingReleaseDialog, {
      artist: props.artist,
      hasEditAccess: props.hasEditAccess,
      hasCanvasAccess: props.hasCanvasAccess,
      hasStorylinesAccess: props.hasStorylinesAccess,
      logGabitoEvent: logGabitoEvent,
      onClose: function onClose() {
        return setShowDialog(false);
      },
      onCanvasRemoveError: handleCanvasError,
      onCanvasRemoveSuccess: showSuccessAlert,
      onCanvasUpdateError: handleCanvasError,
      onCanvasUpdateSuccess: showSuccessAlert,
      onStorylineRemoveError: handleStorylinesError,
      onStorylineRemoveSuccess: showSuccessAlert,
      onStorylineUploadError: handleStorylinesError,
      parentName: props.parentName,
      parentType: props.parentType,
      parentUri: props.parentUri
    }), props.dialogRootRef.current)]
  });
};

EnhanceCell.defaultProps = {
  setAlert: function setAlert() {}
};
/* eslint-disable-next-line import/no-default-export */

export { EnhanceCell };