import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["variant", "bgColor", "imgSrc", "size"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ignore-string-externalization
import { blue, forest, tangerine, violet, Image as ImageComponent, IconUser } from '@spotify-internal/encore-web';
import React from 'react';
import styled from 'styled-components';
import { spacer12, Type } from '@spotify-internal/encore-web-v3';
import { IconTeam } from '../images/IconTeam';
import { IconLabelTeam } from '../images/IconLabelTeam';
import { IconRoster } from '../images/IconRoster';
import { jsx as _jsx } from "react/jsx-runtime";
export var Image = styled(ImageComponent).attrs(function (props) {
  var _props$circle;

  return {
    imageHeight: props.size || '36px',
    imageWidth: props.size || '36px',
    crop: true,
    circle: (_props$circle = props.circle) !== null && _props$circle !== void 0 ? _props$circle : undefined,
    alt: ''
  };
}).withConfig({
  displayName: "IconBadge__Image",
  componentId: "sc-2wgide-0"
})(["flex-shrink:0;margin-right:", ";"], spacer12);

var backgroundShape = function backgroundShape(_ref) {
  var variant = _ref.variant,
      avatarColor = _ref.avatarColor;

  switch (variant) {
    case 'user':
    case 'artist':
    case 'label':
    default:
      return "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2236%22%20height%3D%2236%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M18%2036c9.9411%200%2018-8.0589%2018-18%200-9.94113-8.0589-18-18-18C8.05887%200%200%208.05887%200%2018c0%209.9411%208.05887%2018%2018%2018z%22%20fill%3D%22".concat(encodeURIComponent(avatarColor), "%22%2F%3E%3C%2Fsvg%3E\")");

    case 'roster':
      return "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2236%22%20height%3D%2236%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M1.07618%207.09426C1.66028%204.105%203.9551%201.80897%206.94135%201.20967%209.92268.611366%2013.958%200%2018%200c4.1147%200%208.2296.633571%2011.2323%201.24196%202.9034.58827%205.1561%202.7855%205.7293%205.69193C35.4881%209.60339%2036%2013.2216%2036%2017.1998c0%204.1208-.5492%208.2452-1.095%2011.3267-.5597%203.1598-2.9771%205.6023-6.1271%206.2148C25.5925%2035.3606%2021.3523%2036%2017.4225%2036c-3.7446%200-7.48603-.5806-10.32308-1.1711-3.07617-.6403-5.37079-3.0936-5.92152-6.187C.603632%2025.4162%200%2021.0983%200%2017.1998c0-3.6687.534572-7.33373%201.07618-10.10554z%22%20fill%3D%22".concat(encodeURIComponent(avatarColor), "%22%2F%3E%3C%2Fsvg%3E\")");

    case 'team':
      return "url(\"data:image/svg+xml,%3Csvg%20width%3D%2236%22%20height%3D%2236%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M34.0218914%209.9604218l1.857158%2010.2575394c.4931977%202.7240521-.5432843%205.4974298-2.7190134%207.2754286l-8.1928044%206.6951334c-2.1757291%201.7779987-5.1601602%202.2904982-7.8290869%201.3444448L7.0881822%2031.970562c-2.6689268-.9460534-4.6168758-3.2069316-5.1100736-5.9309838L.1209506%2015.7820388C-.372247%2013.0579867.664235%2010.284609%202.839964%208.5066102l8.1928044-6.6951334C13.2084975.0334781%2016.1929286-.4790214%2018.8618553.467032l10.0499625%203.562406c2.6689268.9460534%204.6168758%203.2069316%205.1100736%205.9309838z%22%20fill%3D%22".concat(encodeURIComponent(avatarColor), "%22%20fill-rule%3D%22evenodd%22%20%2F%3E%3C%2Fsvg%3E\")");
  }
};

var Avatar = styled.div.withConfig({
  displayName: "IconBadge__Avatar",
  componentId: "sc-2wgide-1"
})(["align-items:center;background-image:", ";background-repeat:no-repeat;background-size:contain;display:flex;flex-shrink:0;font-size:10px;font-weight:", ";justify-content:center;line-height:10px;margin-right:", ";text-transform:uppercase;height:", ";width:", ";"], function (_ref2) {
  var variant = _ref2.variant,
      avatarColor = _ref2.avatarColor;
  return backgroundShape({
    variant: variant,
    avatarColor: avatarColor
  });
}, Type.bold, spacer12, function (_ref3) {
  var size = _ref3.size;
  return size || '36px';
}, function (_ref4) {
  var size = _ref4.size;
  return size || '36px';
});

var getBgColorDefault = function getBgColorDefault(_ref5) {
  var variant = _ref5.variant;

  switch (variant) {
    case 'user':
    case 'label':
      return violet;

    case 'artist':
      return forest;

    case 'roster':
      return blue;

    case 'team':
      return tangerine;

    default:
      return violet;
  }
};

var getIconDefault = function getIconDefault(_ref6) {
  var variant = _ref6.variant,
      size = _ref6.size;

  // const iconSize = 16 | 24 | 32 | 48 | 64 (24 default)
  var iconSize = function iconSize() {
    switch (size && parseInt(size, 10)) {
      case 48:
      case 72:
      case 96:
        return 24;

      case 132:
        return 32;

      default:
        return 16;
    }
  };

  switch (variant) {
    case 'user':
      return /*#__PURE__*/_jsx(IconUser, {
        semanticColor: "textBase",
        iconSize: iconSize()
      });

    case 'team':
    case 'artist':
      return /*#__PURE__*/_jsx(IconTeam, {
        iconSize: iconSize()
      });

    case 'label':
      return /*#__PURE__*/_jsx(IconLabelTeam, {
        iconSize: iconSize()
      });

    case 'roster':
      return /*#__PURE__*/_jsx(IconRoster, {
        iconSize: iconSize()
      });

    default:
      return /*#__PURE__*/_jsx(IconUser, {
        semanticColor: "textBase",
        iconSize: iconSize()
      });
  }
};

export var IconBadge = function IconBadge(_ref7) {
  var _ref7$variant = _ref7.variant,
      variant = _ref7$variant === void 0 ? 'user' : _ref7$variant,
      bgColor = _ref7.bgColor,
      imgSrc = _ref7.imgSrc,
      size = _ref7.size,
      props = _objectWithoutProperties(_ref7, _excluded);

  var bgColorDefault = getBgColorDefault({
    variant: variant
  });
  /*
     If imgSrc is set, return the image
     If not, return appropriate generic badge with icon.
  */

  if (imgSrc) {
    return /*#__PURE__*/_jsx(Image, _objectSpread({
      src: imgSrc,
      size: size
    }, props));
  }

  return /*#__PURE__*/_jsx(Avatar, _objectSpread(_objectSpread({
    className: "encore-creator-dark-theme",
    variant: variant,
    avatarColor: bgColor || bgColorDefault,
    size: size
  }, props), {}, {
    children: getIconDefault({
      variant: variant,
      size: size
    })
  }));
};