import _slicedToArray from "/var/jenkins_home/workspace/tingle.76eac57e-8374-4b5c-8f0c-04220153cf57/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import styled, { css } from 'styled-components';
import { Popover, spacer24 } from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { loadAnnouncementsPayloadCreator, updateAnnouncementsPayloadCreator } from '../../../shared/store';
import { jsx as _jsx } from "react/jsx-runtime";
var ENGAGEMENT_POPOVER = 'engagement_01';
var StyledPopover = styled(Popover).withConfig({
  displayName: "EngagementPopover__StyledPopover",
  componentId: "sc-1i9x39x-0"
})(["max-width:310px;", ""], function (props) {
  return props.extraSmall && css(["margin-top:", ";"], spacer24);
});
export function EngagementPopover(props) {
  var _props$extraSmall = props.extraSmall,
      extraSmall = _props$extraSmall === void 0 ? false : _props$extraSmall;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      showPopover = _React$useState2[0],
      setShowPopover = _React$useState2[1];

  var t = useT();
  React.useEffect(function () {
    var didCancel = false;
    loadAnnouncementsPayloadCreator([ENGAGEMENT_POPOVER]).then(function (data) {
      if (!data.includes(ENGAGEMENT_POPOVER) && !didCancel) {
        setShowPopover(true);
      }
    }).catch(function () {// swallow errors
    });
    return function () {
      didCancel = true;
    };
  }, []);

  var onClose = function onClose() {
    updateAnnouncementsPayloadCreator([ENGAGEMENT_POPOVER]);
    setShowPopover(false);
  };

  return showPopover ? /*#__PURE__*/_jsx(StyledPopover, {
    arrow: extraSmall ? Popover.top : Popover.leftTop,
    extraSmall: extraSmall,
    onClose: onClose,
    popoverTitle: t('EXPERIMENT_POPOVER_TITLE_ENGAGEMENT_METRICS', 'New: Engagement metrics', ''),
    children: t('EXPERIMENT_POPOVER_BODY_ENGAGEMENT_METRICS', 'Measure your impact with stats like streams/listener, saves, and playlist adds.', 'streams/listener is the number of streams per listener, which is a metric used on the Engagement view')
  }) : null; // need to return null for the component rather than false because TS
}