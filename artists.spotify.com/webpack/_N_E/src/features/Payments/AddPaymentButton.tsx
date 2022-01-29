import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonSecondary, TooltipTrigger, Tooltip, spacer16 } from '@spotify-internal/encore-web';
import { useViewport, Viewport } from '../../shared/lib/useViewport';
import { Visa, Amex, Mastercard, Discover } from './assets';
import { FlexContainer, CardIcon } from './styled';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var DisabledButtonSecondary = styled(ButtonSecondary).withConfig({
  displayName: "AddPaymentButton__DisabledButtonSecondary",
  componentId: "sc-1bz8xie-0"
})(["pointer-events:none;"]);
var CardIconList = styled.div.withConfig({
  displayName: "AddPaymentButton__CardIconList",
  componentId: "sc-1bz8xie-1"
})(["display:flex;margin-bottom:0;padding:0;margin-left:", ";"], spacer16);
export var AddPaymentButton = function AddPaymentButton(_ref) {
  var buttonDisabled = _ref.buttonDisabled,
      onClick = _ref.onClick;
  var viewport = useViewport();
  var isMobile = viewport === Viewport.SM || viewport === Viewport.XS;

  var _useState = useState(false),
      showTooltip = _useState[0],
      setShowTooltip = _useState[1];

  var t = useT();
  var addCardCopy = t('PAYMENTS_ADD_CARD_BUTTON', 'Add a credit card', 'Button to add a credit card');
  var Button = buttonDisabled ? /*#__PURE__*/_jsx(TooltipTrigger, {
    isTouch: isMobile,
    overlay: showTooltip && /*#__PURE__*/_jsx(Tooltip, {
      id: "add-payment-tooltip",
      children: t('PAYMENTS_CARD_TOOLTIP', 'To add a card, you must have the US as your primary billing country and a saved billing contact.', 'Describes requirements for adding a credit card. US refers to the country, billing contact the user who manages billing')
    }),
    placement: TooltipTrigger.right,
    onShow: function onShow() {
      return setShowTooltip(true);
    },
    onHide: function onHide() {
      return setShowTooltip(false);
    },
    children: /*#__PURE__*/_jsx(DisabledButtonSecondary, {
      "aria-describedby": "add-payment-tooltip",
      "aria-disabled": true,
      buttonSize: ButtonSecondary.sm,
      disabled: true,
      "data-testid": "add-card",
      children: addCardCopy
    })
  }) : /*#__PURE__*/_jsx(ButtonSecondary, {
    buttonSize: ButtonSecondary.sm,
    onClick: onClick,
    "data-testid": "add-card",
    children: addCardCopy
  });
  return /*#__PURE__*/_jsxs(FlexContainer, {
    children: [Button, /*#__PURE__*/_jsxs(CardIconList, {
      children: [/*#__PURE__*/_jsx(CardIcon, {
        svg: Visa
      }), /*#__PURE__*/_jsx(CardIcon, {
        svg: Mastercard
      }), /*#__PURE__*/_jsx(CardIcon, {
        svg: Amex
      }), /*#__PURE__*/_jsx(CardIcon, {
        svg: Discover
      })]
    })]
  });
};