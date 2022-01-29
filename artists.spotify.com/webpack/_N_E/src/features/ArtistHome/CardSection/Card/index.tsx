import _classCallCheck from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Type, screenSmMax, screenMdMin, spacer8, spacer12, spacer16, spacer24, spacer40, black, ButtonPrimary } from '@spotify-internal/encore-web';
import { isInternalUrl, getRelativeUrl } from '../../HomeHelper';
import { CTABtnAsLink, CTABtnArrow } from '../../Style';
import { formatString } from '../../formatters';
import { webgateFetch } from '@mrkt/features/webgate-fetch';
import { CardFadeInAnimation, CardGrayAnimation, CardShadowAnimation } from './Animation';
import CardHeader from './CardHeader';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var CardCtaBtn = styled(CTABtnAsLink).withConfig({
  displayName: "Card__CardCtaBtn",
  componentId: "sc-1kffm4o-0"
})(["transform:none;&::after{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;cursor:pointer;content:'';}"]);
var CardPrimaryCtaBtn = styled(ButtonPrimary).attrs({
  buttonSize: 'sm'
}).withConfig({
  displayName: "Card__CardPrimaryCtaBtn",
  componentId: "sc-1kffm4o-1"
})(["display:flex;align-items:center;padding-left:", ";padding-right:", ";line-height:1;margin:0 ", " ", " 0;"], spacer16, spacer16, spacer12, spacer12);
var CardSecondaryCtaBtn = styled(CTABtnAsLink).attrs({
  buttonSize: 'sm'
}).withConfig({
  displayName: "Card__CardSecondaryCtaBtn",
  componentId: "sc-1kffm4o-2"
})(["display:flex;align-items:center;padding:0;line-height:1;margin:0 ", " ", " 0;"], spacer12, spacer12);
var CardContainer = styled(CardFadeInAnimation).withConfig({
  displayName: "Card__CardContainer",
  componentId: "sc-1kffm4o-3"
})(["", ";@media (max-width:", "){margin-bottom:", ";}@media (min-width:", "){margin-bottom:", ";}"], function (props) {
  return props.displayType === 'ICON' || props.displayType === 'STAT' ? "border-top: 1px solid ".concat(black) : null;
}, screenSmMax, spacer24, screenMdMin, spacer40);
var CardTextArea = styled.div.withConfig({
  displayName: "Card__CardTextArea",
  componentId: "sc-1kffm4o-4"
})(["padding:", " ", " 0 ", ";"], spacer24, spacer24, spacer24);
var CardTitle = styled(Type.h1).attrs({
  variant: Type.heading3,
  weight: Type.bold,
  condensed: true
}).withConfig({
  displayName: "Card__CardTitle",
  componentId: "sc-1kffm4o-5"
})([""]);
var CardBody = styled(Type.p).attrs({
  variant: Type.body2,
  condensed: true
}).withConfig({
  displayName: "Card__CardBody",
  componentId: "sc-1kffm4o-6"
})(["padding-top:", ";"], spacer8);
var CardWrapper = styled.div.withConfig({
  displayName: "Card__CardWrapper",
  componentId: "sc-1kffm4o-7"
})(["display:flex;flex-direction:row;justify-content:flex-start;padding-top:", ";padding-bottom:", ";flex-wrap:wrap;"], spacer24, spacer12); // By default, secondaryCta will contain empty strings for url & text if unavailable

var secondaryCtaExists = function secondaryCtaExists(secondaryCta) {
  var _secondaryCta$url, _secondaryCta$text;

  return secondaryCta && ((_secondaryCta$url = secondaryCta.url) === null || _secondaryCta$url === void 0 ? void 0 : _secondaryCta$url.length) && ((_secondaryCta$text = secondaryCta.text) === null || _secondaryCta$text === void 0 ? void 0 : _secondaryCta$text.length);
};

var CardCtaSection = function CardCtaSection(props) {
  if (secondaryCtaExists(props.secondaryCta) && props.cta) {
    return /*#__PURE__*/_jsxs(CardWrapper, {
      children: [/*#__PURE__*/_jsx(CardPrimaryCtaBtn, {
        onClick: function onClick(ev) {
          return props.clickHandler(ev, props.cta.url);
        },
        "aria-describedby": props.uuid,
        role: "button",
        children: formatString(props.cta.text)
      }), /*#__PURE__*/_jsxs(CardSecondaryCtaBtn, {
        to: "#",
        href: props.secondaryCta.url,
        onClick: function onClick(ev) {
          return props.clickHandler(ev, props.secondaryCta.url);
        },
        "aria-describedby": props.uuid,
        role: "button",
        children: [formatString(props.secondaryCta.text), /*#__PURE__*/_jsx(CTABtnArrow, {
          focusable: "false",
          "aria-hidden": "true"
        })]
      })]
    });
  }

  if (props.cta) {
    return /*#__PURE__*/_jsxs(CardCtaBtn, {
      to: "#",
      onClick: function onClick(ev) {
        return ev.preventDefault();
      },
      "aria-describedby": props.uuid,
      role: "button",
      children: [formatString(props.cta.text), /*#__PURE__*/_jsx(CTABtnArrow, {
        focusable: "false",
        "aria-hidden": "true"
      })]
    });
  }

  return null;
};

var Card = /*#__PURE__*/function (_PureComponent) {
  _inherits(Card, _PureComponent);

  var _super = _createSuper(Card);

  function Card() {
    var _this;

    _classCallCheck(this, Card);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleCardClick", function (ev, ctaUrl) {
      var _this$props = _this.props,
          uuid = _this$props.uuid,
          cardSource = _this$props.cardSource,
          resourceUri = _this$props.resourceUri,
          notificationClass = _this$props.notificationClass;
      ev.preventDefault();
      ev.stopPropagation();

      _this.props.tracker.trackInteraction(_this.props.tracker.makeHomeCardEvent(uuid, cardSource, ctaUrl, resourceUri, notificationClass));

      webgateFetch("https://generic.wg.spotify.com/s4x-home-service/v2/card/".concat(uuid, "/expire-buffered"), {
        method: 'PUT'
      });
      isInternalUrl(ctaUrl) ? _this.props.history.push(getRelativeUrl(ctaUrl)) : window.open(ctaUrl, '_blank');
      return null;
    });

    return _this;
  }

  _createClass(Card, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          resourceUri = _this$props2.resourceUri,
          displayCard = _this$props2.displayCard,
          cardSource = _this$props2.cardSource,
          uuid = _this$props2.uuid,
          notificationClass = _this$props2.notificationClass,
          cardNum = _this$props2.cardNum;
      this.props.tracker.trackImpression(this.props.tracker.makeHomeCardEvent(uuid, cardSource, displayCard.callToAction ? displayCard.callToAction.url : '', resourceUri, notificationClass, cardNum));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          uuid = _this$props3.uuid,
          cardNum = _this$props3.cardNum,
          totalCardNum = _this$props3.totalCardNum,
          viewport = _this$props3.viewport,
          displayCard = _this$props3.displayCard;
      var CardHeaderProps = {
        displayType: displayCard.displayType,
        header: displayCard.header,
        fallbackImageUrl: displayCard.fallbackImageUrl,
        cardColorList: displayCard.cardColorList,
        viewport: viewport,
        headerType: displayCard.headerType
      };
      return /*#__PURE__*/_jsx(CardGrayAnimation, {
        cardNum: cardNum,
        children: /*#__PURE__*/_jsx(CardShadowAnimation, {
          cardNum: cardNum,
          totalCardNum: totalCardNum,
          children: /*#__PURE__*/_jsxs(CardContainer, {
            displayType: displayCard.displayType,
            cardNum: cardNum,
            onClick: function onClick(ev) {
              // A card click should navigate to whichever CTA is displayed as
              // a CTABtnAsLink. In the one-cta case, that's the primary cta, and in the two-cta case, that's the secondary cta.
              if (secondaryCtaExists(displayCard.secondaryCallToAction)) {
                return _this2.handleCardClick(ev, displayCard.secondaryCallToAction.url);
              } else if (displayCard.callToAction) {
                return _this2.handleCardClick(ev, displayCard.callToAction.url);
              }

              return undefined;
            },
            children: [/*#__PURE__*/_jsx(CardHeader, _objectSpread({}, CardHeaderProps)), /*#__PURE__*/_jsxs(CardTextArea, {
              children: [/*#__PURE__*/_jsx(CardTitle, {
                id: uuid,
                children: formatString(displayCard.title)
              }), /*#__PURE__*/_jsx(CardBody, {
                children: formatString(displayCard.subtitle)
              }), /*#__PURE__*/_jsx(CardCtaSection, {
                cta: displayCard.callToAction,
                secondaryCta: displayCard.secondaryCallToAction,
                uuid: uuid,
                clickHandler: this.handleCardClick
              })]
            })]
          })
        })
      });
    }
  }]);

  return Card;
}(PureComponent);
/* eslint-disable-next-line import/no-default-export */


export default Card;