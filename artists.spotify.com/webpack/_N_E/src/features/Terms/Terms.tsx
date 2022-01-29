import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.543d68ba-5fcf-4472-afdf-5be54deb05de/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "/var/jenkins_home/workspace/tingle.543d68ba-5fcf-4472-afdf-5be54deb05de/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.543d68ba-5fcf-4472-afdf-5be54deb05de/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import React, { useState } from 'react';
import styled from 'styled-components';
import { Backdrop, ButtonPrimary, ButtonTertiary, DialogConfirmation, FormCheckbox, Type, kleinBlue } from '@spotify-internal/encore-web';
import { Logger, useError } from '@mrkt/features/Platform';
import { useT } from '@mrkt/features/i18n';
import { getTermsUrl } from './getTermsUrl';
import { useShouldShowTerms } from './hooks/useShouldShowTerms';
import { WEBGATE_DOMAIN, webgateFetch } from '../../shared/lib/api';
import { ActionType, BannerType, useBannerDispatch } from '../Banner/BannerState';
import { logout } from '@mrkt/features/auth';
import { useLocalOverrides } from './hooks/useLocalOverrides';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var ACCEPT_TERMS_URL = "".concat(WEBGATE_DOMAIN, "/s4x-me/v0/accept_terms");
var StyledLinkWrapper = styled.span.withConfig({
  displayName: "Terms__StyledLinkWrapper",
  componentId: "sc-1lsog2m-0"
})(["&&& a,&&& a:hover{color:", ";text-decoration:none;}"], function (_ref) {
  var theme = _ref.theme;
  return theme && theme.colors && theme.colors.primaryColor || kleinBlue;
});

var Fallback = function Fallback(_ref2) {
  var children = _ref2.children;
  var t = useT(); // get the actual exception that was thrown

  var _useError = useError(),
      _useError2 = _slicedToArray(_useError, 1),
      error = _useError2[0]; // get a reference to the global banner for mrkt-web


  var dispatch = useBannerDispatch(); // execute this function once the fallback component mounts in the DOM.
  // Show the error banner to the user.

  React.useEffect(function () {
    dispatch({
      type: ActionType.SHOW,
      message: t('PAGE_BODY_ERROR', 'Something went wrong', 'Displayed in a banner in the page body when there is an error'),
      bannerType: BannerType.ERROR,
      bannerOptions: {
        compact: false,
        dismissOnRouteChange: true,
        showDismissButton: false
      }
    });
  }, [dispatch, error.message, t]);
  return children;
};

export function Terms(props) {
  var t = useT();
  var overrides = useLocalOverrides();

  var _useState = useState(true),
      submitIsDisabled = _useState[0],
      setSubmitIsDisabled = _useState[1];

  var _useState2 = useState(overrides.showTermsError || false),
      isError = _useState2[0],
      setIsError = _useState2[1]; // Render children if don't need to accept terms.


  if (!useShouldShowTerms()) {
    return props.children;
  }

  if (isError) {
    return (
      /*#__PURE__*/
      // Render the original page, but include an error banner.
      _jsx(Fallback, {
        children: props.children
      })
    );
  }

  var toggleAcceptTerms = function toggleAcceptTerms() {
    setSubmitIsDisabled(!submitIsDisabled);
  };

  function onAcceptTerms() {
    return _onAcceptTerms.apply(this, arguments);
  }

  function _onAcceptTerms() {
    _onAcceptTerms = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var response;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setSubmitIsDisabled(true);
              _context.prev = 1;
              _context.next = 4;
              return webgateFetch(ACCEPT_TERMS_URL, {
                method: 'POST'
              });

            case 4:
              response = _context.sent;

              if (response.ok) {
                _context.next = 7;
                break;
              }

              throw new Error('Submitting to accept terms failed');

            case 7:
              window.location.reload();
              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](1);
              Logger.logError('s4a-accept-terms', _context.t0);
              setIsError(true);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 10]]);
    }));
    return _onAcceptTerms.apply(this, arguments);
  }

  var homepageUrl = "".concat(window.location.protocol, "//").concat(window.location.host);
  return /*#__PURE__*/_jsx(Backdrop, {
    center: true,
    "data-testid": "terms",
    children: /*#__PURE__*/_jsx(DialogConfirmation, {
      dialogTitle: t('TERMS_SPOTIFY_TERMS_UPDATED', 'We updated our terms and conditions', 'Notify user terms have been updated'),
      body: /*#__PURE__*/_jsx(Type, {
        as: "p",
        children: /*#__PURE__*/_jsx(StyledLinkWrapper, {
          dangerouslySetInnerHTML: {
            __html: t('TERMS_SPOTIFY_LOGGED_IN_TERMS', "\n                  To continue using Spotify for Artists, please accept\n                    <a\n                      href={termsUrl}\n                      target=\"_blank\"\n                      rel=\"noopener noreferrer\"\n                    >\n                      the updated terms\n                    </a>.\n                ", 'Terms user needs to agree to', {
              termsUrl: getTermsUrl()
            })
          }
        })
      }),
      footer: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(ButtonTertiary, {
          buttonSize: ButtonTertiary.sm,
          condensed: true,
          onClick: function onClick() {
            return logout(homepageUrl);
          },
          children: t('TERMS_LOG_OUT', 'Log Out', 'Log out text')
        }), /*#__PURE__*/_jsx(ButtonPrimary, {
          "data-testid": "terms-submit",
          disabled: submitIsDisabled,
          buttonSize: ButtonPrimary.sm,
          onClick: function onClick() {
            return onAcceptTerms();
          },
          children: t('TERMS_I_ACCEPT', 'I Accept', 'I accept')
        })]
      }),
      legal: /*#__PURE__*/_jsx(FormCheckbox, {
        "data-testid": "terms-accept-checkbox",
        id: "terms",
        onClick: function onClick() {
          return toggleAcceptTerms();
        },
        small: true,
        children: t('TERMS_HAVE_READ_TERMS', 'I have read and agree to the terms and conditions.', 'User confirms theyve read terms')
      }),
      legalStrict: true
    })
  });
}