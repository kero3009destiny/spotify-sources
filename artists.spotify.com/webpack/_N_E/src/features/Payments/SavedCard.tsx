import React from 'react';
import styled from 'styled-components';
import { ButtonTertiary, Type, spacer4, spacer8, spacer12, gray45, gray90, gray7, black10, spacer24, gray95, failure } from '@spotify-internal/encore-web-v3';
import { Visa, Amex, Mastercard, Discover, Default } from './assets';
import { CardIcon, FlexContainer } from './styled';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export var cardMap = {
  MC: {
    title: 'Mastercard',
    svgPath: Mastercard
  },
  DISCOVER: {
    title: 'Discover',
    svgPath: Discover
  },
  AMEX: {
    title: 'Amex',
    svgPath: Amex
  },
  VISA: {
    title: 'Visa',
    svgPath: Visa
  }
};
export var ActionButton = styled(ButtonTertiary).withConfig({
  displayName: "SavedCard__ActionButton",
  componentId: "el71nn-0"
})([""]);
export var CardWithAction = styled.div.withConfig({
  displayName: "SavedCard__CardWithAction",
  componentId: "el71nn-1"
})(["align-items:stretch;border:", ";box-shadow:0 0 0 0 ", ";display:flex;border-radius:8px;justify-content:stretch;max-width:490px;transition:box-shadow 0.5s;&:hover{box-shadow:", ";}& > *{flex-basis:100%;padding:", ";}", "{border-left:solid 1px ", ";border-radius:0 8px 8px 0;flex-basis:auto;color:", " &:hover{background-color:", ";}&:active,&:focus{background-color:", ";&::after{content:none;}}}"], function (p) {
  return p.cardIsInvalid ? "solid 1px ".concat(failure) : "solid 1px ".concat(gray90);
}, black10, function (p) {
  return p.raisesOnHover ? "0 8px 16px 0 ".concat(black10) : "";
}, spacer24, ActionButton, gray90, gray45, gray95, gray90);
var BigCardIcon = styled(CardIcon).withConfig({
  displayName: "SavedCard__BigCardIcon",
  componentId: "el71nn-2"
})(["margin-right:", ";height:25px;width:36px;"], spacer12);
export var SavedCard = function SavedCard(_ref) {
  var paymentMethod = _ref.paymentMethod,
      teamName = _ref.teamName,
      isAdmin = _ref.isAdmin,
      onClick = _ref.onClick;
  var lastFour = paymentMethod.lastFour,
      network = paymentMethod.network,
      user = paymentMethod.user,
      paymentStatus = paymentMethod.paymentStatus;
  var svg = network ? cardMap[network].svgPath : Default;
  var cardTitle = network ? cardMap[network].title : 'Card';

  var handleClick = function handleClick() {
    onClick();
  };

  var t = useT();
  var fullName = user ? user.fullName : '';
  var cardIsInvalid = paymentStatus === 'FAILED';
  var CardAdded = cardIsInvalid && teamName ? /*#__PURE__*/_jsx("span", {
    style: {
      color: failure
    },
    dangerouslySetInnerHTML: {
      __html: t('PAYMENTS_CARD_ERROR', 'Card added by <strong>{fullName}</strong> for <strong>{teamName}</strong> is invalid.', 'Informs user when a saved credit card is invalid. fullName refers to the users name and teamName refers to the team this card is for', {
        fullName: fullName,
        teamName: teamName
      })
    }
  }) : teamName && /*#__PURE__*/_jsx("span", {
    dangerouslySetInnerHTML: {
      __html: t('PAYMENTS_CARD_DESCRIPTION', 'Card added by <strong>{fullName}</strong> for <strong>{teamName}</strong>.', 'Describes who saved a credit card for what team. fullName refers to the users name and teamName refers to the team this card is for', {
        fullName: fullName,
        teamName: teamName
      })
    }
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(CardWithAction, {
      "data-testid": "saved-card",
      raisesOnHover: isAdmin,
      cardIsInvalid: cardIsInvalid,
      children: [/*#__PURE__*/_jsxs(FlexContainer, {
        children: [/*#__PURE__*/_jsx(BigCardIcon, {
          svg: svg
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Type, {
            as: "div",
            weight: Type.bold,
            color: gray7,
            children: t('PAYMENTS_SAVED_CARD', 'Saved {cardTitle}', 'Describes the type of saved card on file', {
              cardTitle: cardTitle
            })
          }), /*#__PURE__*/_jsx(Type, {
            as: "div",
            color: gray45,
            children: t('PAYMENTS_CARD_ENDING', 'Ending in {lastFour}', 'Describes the last four digits of the saved card', {
              lastFour: lastFour
            })
          })]
        })]
      }), isAdmin && /*#__PURE__*/_jsx(ActionButton, {
        onClick: handleClick,
        "data-testid": "edit-card",
        children: t('PAYMENTS_CARD_UPDATE', 'Update', 'Button to update a credit card')
      })]
    }), (user === null || user === void 0 ? void 0 : user.fullName) && /*#__PURE__*/_jsx(Type, {
      as: "p",
      variant: Type.body3,
      color: gray45,
      style: {
        padding: "".concat(spacer8, " ").concat(spacer4)
      },
      "data-testid": "saved-card-added-by",
      children: CardAdded
    })]
  });
};