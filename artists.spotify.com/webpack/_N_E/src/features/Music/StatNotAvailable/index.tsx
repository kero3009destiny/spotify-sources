import React, { useState } from 'react';
import styled from 'styled-components';
import { TooltipTrigger, Tooltip } from '@spotify-internal/encore-web-v3';
import { EMDASH } from '../../../features/CatalogUtils/constants';
import { isTouchDevice } from '../../../shared/lib/isTouchDevice';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
var StyledToolip = styled(Tooltip).withConfig({
  displayName: "StatNotAvailable__StyledToolip",
  componentId: "sc-1r5omj6-0"
})(["font-feature-settings:normal;"]);
export function StatNotAvailable() {
  var _useState = useState(false),
      show = _useState[0],
      toggleShow = _useState[1];

  var t = useT();
  return /*#__PURE__*/_jsx(TooltipTrigger, {
    overlay: show && /*#__PURE__*/_jsx(StyledToolip, {
      children: t('MUSIC_NOT_AVAILABLE_c18bfb', 'Not available for songs with split rights', '')
    }),
    onClick: function onClick(e) {
      e.stopPropagation();
    },
    onShow: function onShow() {
      toggleShow(true);
    },
    isTouch: isTouchDevice(),
    onHide: function onHide() {
      toggleShow(false);
    },
    placement: TooltipTrigger.left,
    children: EMDASH
  });
}