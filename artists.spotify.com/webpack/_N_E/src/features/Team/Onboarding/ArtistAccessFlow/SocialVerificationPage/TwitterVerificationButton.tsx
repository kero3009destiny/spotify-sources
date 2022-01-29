import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
// ignore-string-externalization

/* eslint-disable react/prop-types */
import React from 'react';
import { IconTwitter, IconX, Type } from '@spotify-internal/encore-web';
import { logError } from '@mrkt/features/Platform';
import { SocialButton } from '../../components/sharedStyles';
import { ONBOARDING_API, post, del } from '../../../../../shared/lib/api';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var TwitterVerificationButton = function TwitterVerificationButton(_ref) {
  var artistId = _ref.artistId,
      requestId = _ref.requestId,
      username = _ref.username,
      onRemoved = _ref.onRemoved;
  var href = window.location.href;

  var verify = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var data, authURL;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return post("".concat(ONBOARDING_API, "/v0/access/request/").concat(requestId, "/artist/").concat(artistId, "/twitter/oauth"), {
                body: {
                  redirectUrl: "".concat(href)
                }
              });

            case 3:
              data = _context.sent;
              authURL = data && data.authURL;
              window.location.assign(authURL);
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              logError(_context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    return function verify() {
      return _ref2.apply(this, arguments);
    };
  }();

  var remove = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return del("".concat(ONBOARDING_API, "/v0/access/request/").concat(requestId, "/artist/").concat(artistId, "/twitter"));

            case 3:
              onRemoved();
              _context2.next = 9;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              logError(_context2.t0);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6]]);
    }));

    return function remove() {
      return _ref3.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/_jsxs(SocialButton, {
    "data-testid": "twitter-button",
    "aria-label": "IconTwitter",
    onClick: function onClick() {
      return username ? remove() : verify();
    },
    children: [/*#__PURE__*/_jsx(IconTwitter, {
      iconSize: 24
    }), /*#__PURE__*/_jsx(Type, {
      as: "span",
      variant: Type.body2,
      children: username || 'Twitter'
    }), username && /*#__PURE__*/_jsx(IconX, {
      iconSize: 24
    })]
  });
};