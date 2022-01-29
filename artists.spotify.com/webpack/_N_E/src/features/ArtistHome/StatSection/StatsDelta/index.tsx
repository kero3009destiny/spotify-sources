import React from 'react';
import styled from 'styled-components';
import { ButtonIcon, IconChartDown, IconChartUp, spacer4, Tooltip } from '@spotify-internal/encore-web';
import { TooltipTrigger } from '@mrkt/features/TooltipTrigger';
import { useNumberFormatter, useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
var DeltaDirection;

(function (DeltaDirection) {
  DeltaDirection["POSITIVE"] = "POSITIVE";
  DeltaDirection["NEGATIVE"] = "NEGATIVE";
  DeltaDirection["ZERO"] = "ZERO";
})(DeltaDirection || (DeltaDirection = {}));

var SubduedIconChartUp = styled(IconChartUp).attrs({
  iconSize: 16
}).withConfig({
  displayName: "StatsDelta__SubduedIconChartUp",
  componentId: "sc-16kdlu9-0"
})(["color:var(--text-subdued);"]);
var NegativeIconChartDown = styled(IconChartDown).attrs({
  iconSize: 16
}).withConfig({
  displayName: "StatsDelta__NegativeIconChartDown",
  componentId: "sc-16kdlu9-1"
})(["color:var(--text-negative);"]);
var PositiveIconChartUp = styled(IconChartUp).attrs({
  iconSize: 16
}).withConfig({
  displayName: "StatsDelta__PositiveIconChartUp",
  componentId: "sc-16kdlu9-2"
})(["color:var(--essential-positive);"]);
var DeltaButton = styled(ButtonIcon).withConfig({
  displayName: "StatsDelta__DeltaButton",
  componentId: "sc-16kdlu9-3"
})(["margin-left:", ";margin-top:-6px;"], spacer4);

var createDeltaObject = function createDeltaObject(delta) {
  var sign = DeltaDirection.POSITIVE;

  if (isNaN(delta)) {
    sign = DeltaDirection.ZERO;
  }

  var roundedAbsValue = Math.floor(Math.abs(delta));

  if (roundedAbsValue === 0) {
    sign = DeltaDirection.ZERO;
  }

  if (delta < 0 && roundedAbsValue !== 0) {
    sign = DeltaDirection.NEGATIVE;
  }

  return {
    sign: sign,
    roundedAbsValue: roundedAbsValue
  };
};

var getDeltaArrow = function getDeltaArrow(sign) {
  switch (sign) {
    case DeltaDirection.ZERO:
      return /*#__PURE__*/_jsx(SubduedIconChartUp, {
        "aria-hidden": "true",
        "data-testid": "upward"
      });

    case DeltaDirection.NEGATIVE:
      return /*#__PURE__*/_jsx(NegativeIconChartDown, {
        "aria-hidden": "true",
        "data-testid": "downward"
      });

    default:
      return /*#__PURE__*/_jsx(PositiveIconChartUp, {
        "aria-hidden": "true",
        "data-testid": "upward"
      });
  }
};

var createDeltaPctTooltip = function createDeltaPctTooltip(delta, t, numberFormat) {
  var deltaPctValue = numberFormat.format(Number(delta.roundedAbsValue) || 0);

  switch (delta.sign) {
    case DeltaDirection.NEGATIVE:
      return "".concat(t('S4A_LOGGED_IN_HOME_1c5c9c', '{delta}% decrease compared to last week.', '', {
        delta: deltaPctValue
      }));

    case DeltaDirection.POSITIVE:
      return "".concat(t('S4A_LOGGED_IN_HOME_482fa1', '{delta}% increase compared to last week.', '', {
        delta: deltaPctValue
      }));

    default:
      return "".concat(t('S4A_LOGGED_IN_HOME_19f891', '{delta}% compared to last week.', '', {
        delta: deltaPctValue
      }));
  }
};

var createFollowersTooltip = function createFollowersTooltip(delta, t, numberFormat) {
  var deltaValue = numberFormat.format(Number(delta.roundedAbsValue) || 0);

  switch (delta.sign) {
    case DeltaDirection.NEGATIVE:
      return "".concat(t('S4A_LOGGED_IN_HOME_66cd1c', "-{delta, plural,\n            one {{delta} follower}\n            other {{delta} followers}\n          }", 'Tells the user that they have a decrease in number of followers', {
        delta: deltaValue
      }));

    case DeltaDirection.POSITIVE:
      return "".concat(t('S4A_LOGGED_IN_HOME_006e1e', "+{delta, plural,\n            one {{delta} follower}\n            other {{delta} followers}\n          }", 'Tells the user that they have an increase in number of followers', {
        delta: deltaValue
      }));

    default:
      return "".concat(t('S4A_LOGGED_IN_HOME_9b180c', "{delta, plural,\n            one {{delta} follower}\n            other {{delta} followers}\n          }", 'Tells the user that they have no change in number of followers', {
        delta: deltaValue
      }));
  }
};

export var StatsDelta = /*#__PURE__*/React.memo(function (props) {
  var delta = props.delta,
      isDeltaPct = props.isDeltaPct,
      id = props.id,
      isDisabled = props.isDisabled;
  var deltaInfo = createDeltaObject(delta);
  var deltaArrow = getDeltaArrow(deltaInfo.sign);
  var t = useT();
  var numberFormatter = useNumberFormatter();

  if (isDisabled) {
    return /*#__PURE__*/_jsx(DeltaButton, {
      disabled: true,
      children: deltaArrow
    });
  }

  return /*#__PURE__*/_jsx(TooltipTrigger, {
    tooltipId: "tooltip-".concat(id),
    tooltip: /*#__PURE__*/_jsx(Tooltip, {
      children: isDeltaPct ? createDeltaPctTooltip(deltaInfo, t, numberFormatter) : createFollowersTooltip(deltaInfo, t, numberFormatter)
    }),
    placement: "left",
    children: /*#__PURE__*/_jsx(DeltaButton, {
      "aria-label": "Change in listeners",
      children: deltaArrow
    })
  });
});