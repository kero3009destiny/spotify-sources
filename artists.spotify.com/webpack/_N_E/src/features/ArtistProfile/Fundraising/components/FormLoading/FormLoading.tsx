// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { LoadingIndicator } from '@spotify-internal/encore-web';
import { Delay } from '../../../../../shared/components/Delay';
import { LightModeLoadingIndicator } from '../../../Elements';
import { DialogWrapper } from '../DialogWrapper';
import { jsx as _jsx } from "react/jsx-runtime";
var LoadingWrapper = styled(DialogWrapper).withConfig({
  displayName: "FormLoading__LoadingWrapper",
  componentId: "bynmq2-0"
})(["display:flex;align-items:center;justify-content:center;min-height:50vh;"]);
export function FormLoading() {
  return /*#__PURE__*/_jsx(LoadingWrapper, {
    children: /*#__PURE__*/_jsx(Delay, {
      time: 300,
      children: /*#__PURE__*/_jsx(LightModeLoadingIndicator, {
        indicatorSize: LoadingIndicator.lg
      })
    })
  });
}