import React from 'react';
import { PaymentMethodContainer, FlexContainer } from './styled';
import { InvoicingIcon } from './lib/assets/InvoicingIcon';
import { spacer16, Type } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var StyledCard = styled.div.withConfig({
  displayName: "InvoicePaymentMethod__StyledCard",
  componentId: "sc-1ull43r-0"
})(["", ""], PaymentMethodContainer);
export function InvoicePaymentMethod(_ref) {
  var teamName = _ref.teamName;
  var t = useT();
  return /*#__PURE__*/_jsx(StyledCard, {
    children: /*#__PURE__*/_jsxs(FlexContainer, {
      children: [/*#__PURE__*/_jsx(InvoicingIcon, {}), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(Type, {
          as: "div",
          weight: Type.bold,
          style: {
            marginLeft: "".concat(spacer16)
          },
          semanticColor: "textBase",
          children: t('PAYMENTS_INVOICING', 'Invoicing', 'Describes the state where a customer has selected invoicing as a payment method')
        }), /*#__PURE__*/_jsx(Type, {
          as: "div",
          style: {
            marginLeft: "".concat(spacer16)
          },
          semanticColor: "textSubdued",
          children: teamName
        })]
      })]
    })
  });
}