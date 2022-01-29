import _classCallCheck from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import styled from 'styled-components';
import { useT } from '@mrkt/features/i18n';
import { ButtonTertiary, Backdrop, DialogConfirmation, IconArrowTopRight, Type } from '@spotify-internal/encore-web';
import CalendarIcon from '../../../CalendarIcon';
import Avatar from '../../../Avatar';
import MediaWithDescription from '../../../MediaWithDescription';
import { ModalButton } from '../../../ModalButton';
import partnerConfig from '../../../partnerConfig';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var AccentedButtonTertiary = styled(ButtonTertiary).attrs({
  condensed: true
}).withConfig({
  displayName: "ConcertDetails__AccentedButtonTertiary",
  componentId: "oz7x5m-0"
})(["color:var(--text-bright-accent);"]);
export var ConcertDetails = /*#__PURE__*/function (_Component) {
  _inherits(ConcertDetails, _Component);

  var _super = _createSuper(ConcertDetails);

  function ConcertDetails() {
    var _this;

    _classCallCheck(this, ConcertDetails);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "reportAProblem", function () {
      var _this$props = _this.props,
          onReportAProblem = _this$props.onReportAProblem,
          connectedPartner = _this$props.connectedPartner;
      onReportAProblem(connectedPartner);
    });

    _defineProperty(_assertThisInitialized(_this), "openPartnerSettings", function () {
      var onOpenPartnerSettings = _this.props.onOpenPartnerSettings;
      onOpenPartnerSettings();
    });

    return _this;
  }

  _createClass(ConcertDetails, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          onClose = _this$props2.onClose,
          connectedPartner = _this$props2.connectedPartner,
          month = _this$props2.month,
          day = _this$props2.day,
          venue = _this$props2.venue,
          startTime = _this$props2.startTime,
          date = _this$props2.date,
          ticketingClickThru = _this$props2.ticketingClickThru,
          t = _this$props2.t;
      var partnerName = // @ts-ignore
      partnerConfig.partnersById[connectedPartner.partnerName].displayName;
      var messages = {
        title: {
          id: 'ConcertDetails.title',
          defaultMessage: t('e94635', 'Concert details', '')
        },
        desc: {
          id: 'ConcertDetails.desc',
          defaultMessage: t('02a5ed', 'This listing comes from {partnerName}. Contact them directly with problems, or let us know if this artist ID is wrong.', '', {
            partnerName: partnerName
          })
        },
        contactPartner: {
          id: 'ConcertDetails.contactPartner',
          defaultMessage: t('27aab2', 'contact {partnerName}', '', {
            partnerName: partnerName
          })
        },
        reportProblem: {
          id: 'ConcertDetails.reportProblem',
          defaultMessage: t('d21fa6', 'report a problem', '')
        },
        done: {
          id: 'ConcertDetails.done',
          defaultMessage: t('b4f445', 'done', '')
        }
      };
      return /*#__PURE__*/_jsx(Backdrop, {
        center: true,
        onClose: onClose,
        children: /*#__PURE__*/_jsx(DialogConfirmation, {
          dialogTitle: messages.title.defaultMessage,
          body: /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx(Type.p, {
              className: styles.desc,
              children: messages.desc.defaultMessage
            }), /*#__PURE__*/_jsxs("div", {
              className: styles.card_group,
              children: [/*#__PURE__*/_jsx("button", {
                type: "button",
                className: styles.card,
                onClick:
                /* istanbul ignore next */
                function onClick() {
                  return window.open(ticketingClickThru, '_blank');
                },
                children: /*#__PURE__*/_jsx(MediaWithDescription, {
                  media: /*#__PURE__*/_jsx(CalendarIcon, {
                    month: month,
                    day: day
                  }),
                  description: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx(Type.h3, {
                      className: styles.card_title,
                      children: date
                    }), /*#__PURE__*/_jsxs(Type.p, {
                      semanticColor: "textSubdued",
                      className: styles.card_desc,
                      children: [venue, ", ", startTime]
                    })]
                  })
                })
              }), /*#__PURE__*/_jsxs(AccentedButtonTertiary, {
                href: ticketingClickThru,
                target: "_blank",
                rel: "noopener noreferrer",
                children: [messages.contactPartner.defaultMessage, ' ', /*#__PURE__*/_jsx(IconArrowTopRight, {
                  iconSize: 16,
                  className: styles.arrow
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: styles.card_group,
              children: [/*#__PURE__*/_jsx("button", {
                type: "button",
                className: styles.card,
                onClick: this.openPartnerSettings,
                "data-testid": "open-partner-settings",
                children: /*#__PURE__*/_jsx(MediaWithDescription, {
                  media: /*#__PURE__*/_jsx(Avatar, {
                    imageUrl: connectedPartner.mappedPartnerImage.imageUrl
                  }),
                  description: /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx(Type.h3, {
                      className: styles.card_title,
                      children: connectedPartner.name
                    }), /*#__PURE__*/_jsxs(Type.p, {
                      className: styles.card_desc,
                      children: [// @ts-ignore
                      partnerConfig.partnersById[connectedPartner.partnerName].displayName, ' ', "ID: ", connectedPartner.partnerId]
                    })]
                  })
                })
              }), /*#__PURE__*/_jsx(AccentedButtonTertiary, {
                onClick: this.reportAProblem,
                "data-testid": "report-a-problem",
                children: messages.reportProblem.defaultMessage
              })]
            })]
          }),
          footer:
          /*#__PURE__*/
          // @ts-ignore
          _jsx(ModalButton, {
            primary: true,
            onClick: onClose,
            children: messages.done.defaultMessage
          })
        })
      });
    }
  }]);

  return ConcertDetails;
}(Component);
export var ConcertDetailsHOC = function ConcertDetailsHOC(props) {
  var t = useT();
  return /*#__PURE__*/_jsx(ConcertDetails, _objectSpread(_objectSpread({}, props), {}, {
    t: t
  }));
};
/* eslint-disable-next-line import/no-default-export */

export default ConcertDetailsHOC;