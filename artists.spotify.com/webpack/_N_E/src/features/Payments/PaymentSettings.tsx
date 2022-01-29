import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.edb4648f-e97c-4fc3-81e7-9c46d49557bb/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LoadingIndicator, Banner, spacer80, spacer24 } from '@spotify-internal/encore-web';
import { createErrorBoundary } from '@mrkt/features/Platform';
import { paymentsExperience } from '@mrkt/features/experience-definitions';
import { useCanManageCurrentTeam, useCurrentTeamDetails } from '../Team/hooks';
import { BillingInformation } from './BillingInformation';
import { PaymentsError } from './PaymentsError';
import { PaymentMethod } from './PaymentMethod';
import { usePaymentMethod } from './lib/hooks/usePaymentMethod';
import { useBillingInformation } from './lib/hooks/useBillingInformation';
import { CARD_ADDED_SEARCH_PARAM } from './constants';
import { useCurrentTeamUri } from './lib/hooks/useCurrentTeamUri';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var LoadingContainer = styled.div.withConfig({
  displayName: "PaymentSettings__LoadingContainer",
  componentId: "dzqqws-0"
})(["display:flex;align-items:center;justify-content:center;padding:", ";"], spacer80);
var StyledBanner = styled(Banner).withConfig({
  displayName: "PaymentSettings__StyledBanner",
  componentId: "dzqqws-1"
})(["margin-top:-50px;margin-bottom:", ";"], spacer24);

var _createErrorBoundary = createErrorBoundary({
  view: 'payment-settings',
  experience: paymentsExperience
}),
    _createErrorBoundary2 = _slicedToArray(_createErrorBoundary, 1),
    ErrorBoundary = _createErrorBoundary2[0];

var AuthorizedPaymentSettings = function AuthorizedPaymentSettings(_ref) {
  var onShowBanner = _ref.onShowBanner,
      team = _ref.team,
      onUpdate = _ref.onUpdate;
  var currTeamUri = useCurrentTeamUri();
  var t = useT();
  var teamUri = team !== null && team !== void 0 && team.uri ? team.uri : currTeamUri;
  var currentTeamDetails = useCurrentTeamDetails(team === null || team === void 0 ? void 0 : team.uri);

  var _usePaymentMethod = usePaymentMethod(teamUri),
      cards = _usePaymentMethod.cards,
      setCards = _usePaymentMethod.setCards;

  var _useBillingInformatio = useBillingInformation(teamUri),
      _useBillingInformatio2 = _useBillingInformatio.billingSettings,
      savedEmail = _useBillingInformatio2.email,
      savedBillingContactId = _useBillingInformatio2.billingContactId,
      savedCountry = _useBillingInformatio2.country,
      isInvoiced = _useBillingInformatio2.isInvoiced,
      setBillingInformation = _useBillingInformatio.setBillingInformation;

  var _useState = useState({
    message: '',
    colorSet: 'positive'
  }),
      banner = _useState[0],
      setBanner = _useState[1];

  var closeBanner = useCallback(function () {
    return setBanner({
      message: '',
      colorSet: 'positive'
    });
  }, [setBanner]);
  var onError = useCallback(function () {
    var errorBannerMetaData = {
      message: t('PAYMENTS_BANNER_BILLING_ERROR', 'Something went wrong.', 'Describes an update that was not successful'),
      colorSet: 'negative'
    };
    onShowBanner ? onShowBanner(errorBannerMetaData) : setBanner(errorBannerMetaData);
  }, [setBanner, onShowBanner]);
  var onBillingSubmit = useCallback( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(value) {
      var successBannerMetaData;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return setBillingInformation(value);

            case 3:
              successBannerMetaData = {
                message: t('PAYMENTS_BANNER_BILLING_SAVED', 'Your billing information has been saved.', 'Updating customer billing information was successful'),
                colorSet: 'positive'
              };
              onShowBanner ? onShowBanner(successBannerMetaData) : setBanner(successBannerMetaData);

              if (onUpdate) {
                onUpdate(cards, value.billingContactId, value.country, value.billingContactId);
              }

              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              onError();

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [onError, setBanner, setBillingInformation, onUpdate, cards, onShowBanner]);
  var cardSavedMessage = t('PAYMENTS_BANNER_CARD_SAVED', 'Your card has been saved.', 'Updating customer card was successful');
  var cardErrorMessage = t('PAYMENTS_BANNER_CARD_ERROR', 'There was an error adding your card.', 'Updating customer card was not successful');
  var onPaymentSuccess = useCallback(function (updatedCards) {
    setCards(updatedCards);
    var cardSuccessBannerMetaData = {
      message: cardSavedMessage,
      colorSet: 'positive'
    };
    onShowBanner ? onShowBanner(cardSuccessBannerMetaData) : setBanner(cardSuccessBannerMetaData);

    if (onUpdate) {
      onUpdate(updatedCards, savedEmail, savedCountry);
    }
  }, [setBanner, setCards, onUpdate, savedEmail, savedCountry, onShowBanner]);

  var getTeamName = function getTeamName() {
    if (team) {
      return team.name;
    } else if (currentTeamDetails) {
      return currentTeamDetails.name;
    }

    return 'this team';
  }; // use most recently added card


  var paymentMethod = cards[cards.length - 1];
  var isAdmin = useCanManageCurrentTeam(team);
  var teamName = getTeamName();
  var href = window.location.href;
  useEffect(function () {
    var cardAdded = new URL(href).searchParams.get(CARD_ADDED_SEARCH_PARAM);

    if (cardAdded === 'true') {
      setBanner({
        message: cardSavedMessage,
        colorSet: 'positive'
      });
    } else if (cardAdded === 'false') {
      setBanner({
        message: cardErrorMessage,
        colorSet: 'negative'
      });
    }
  }, [href]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [banner.message && /*#__PURE__*/_jsx(StyledBanner, {
      colorSet: banner.colorSet,
      onClose: closeBanner,
      children: banner.message
    }), /*#__PURE__*/_jsx(BillingInformation, {
      savedBillingContactId: savedBillingContactId,
      paymentMethod: paymentMethod,
      savedCountry: savedCountry,
      savedEmail: savedEmail,
      isAdmin: isAdmin,
      orgUri: teamUri,
      teamName: teamName,
      onSubmit: onBillingSubmit,
      isInvoiced: isInvoiced
    }), /*#__PURE__*/_jsx(PaymentMethod, {
      isInvoiced: isInvoiced,
      paymentMethod: paymentMethod,
      savedCountry: savedCountry,
      savedBillingContactId: savedBillingContactId,
      savedEmail: savedEmail,
      teamName: teamName,
      orgUri: teamUri,
      isAdmin: isAdmin,
      onSuccess: onPaymentSuccess
    })]
  });
};

export var PaymentSettings = function PaymentSettings(_ref3) {
  var team = _ref3.team,
      onUpdate = _ref3.onUpdate,
      onShowBanner = _ref3.onShowBanner;

  var loading = /*#__PURE__*/_jsx(LoadingContainer, {
    children: /*#__PURE__*/_jsx(LoadingIndicator, {})
  });

  return /*#__PURE__*/_jsx(ErrorBoundary, {
    fallback: /*#__PURE__*/_jsx(PaymentsError, {}),
    children: /*#__PURE__*/_jsx(Suspense, {
      fallback: loading,
      children: /*#__PURE__*/_jsx(AuthorizedPaymentSettings, {
        team: team,
        onShowBanner: onShowBanner,
        onUpdate: onUpdate
      })
    })
  });
};