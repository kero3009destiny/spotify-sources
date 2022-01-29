// ignore-string-externalization
import React from 'react';
import { IconArtist, IconLock, gray15, gray75, white } from '@spotify-internal/encore-web';
import styled, { css } from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var avatarContainerCss = css(["display:flex;align-items:center;justify-content:center;background-position:50%;background-repeat:no-repeat;background-size:cover;border-radius:50%;overflow:hidden;z-index:1;"]);

var avatarIconBackground = function avatarIconBackground(backgroundColor) {
  return css(["background:", ";color:blue;"], backgroundColor);
};

var avatarImageBackground = function avatarImageBackground(imageUrl, claimed) {
  return css(["background-image:", ";"], "linear-gradient(\n    rgba(0, 0, 0, ".concat(claimed ? '0.5' : '0', "),\n    rgba(0, 0, 0, ").concat(claimed ? '0.5' : '0', ")\n  ), url(").concat(imageUrl, ")"));
};

var avatarSize = function avatarSize(size) {
  return css(["width:", ";height:", ";"], "".concat(size, "px"), "".concat(size, "px"));
};

export var AvatarContainer = styled.div.withConfig({
  displayName: "Avatar__AvatarContainer",
  componentId: "sc-1cg4jkj-0"
})(["", " ", " ", " ", " color:", ";", ""], avatarContainerCss, function (props) {
  return props.imageUrl && avatarImageBackground(props.imageUrl, props.claimed);
}, function (props) {
  return !props.imageUrl && avatarIconBackground(props.backgroundColor || gray15);
}, function (props) {
  return avatarSize(props.size);
}, gray75, function (props) {
  return props.claimed && css(["svg{color:", ";}"], white);
});
export var AvatarSize;

(function (AvatarSize) {
  AvatarSize[AvatarSize["SMALL"] = 125] = "SMALL";
  AvatarSize[AvatarSize["LARGE"] = 160] = "LARGE";
})(AvatarSize || (AvatarSize = {}));

export var Avatar = function Avatar(_ref) {
  var imageUrl = _ref.imageUrl,
      claimed = _ref.claimed,
      backgroundColor = _ref.backgroundColor,
      size = _ref.size;
  return /*#__PURE__*/_jsxs(AvatarContainer, {
    imageUrl: imageUrl,
    claimed: claimed,
    size: size,
    backgroundColor: backgroundColor,
    children: [claimed && /*#__PURE__*/_jsx(IconLock, {
      iconSize: getIconSize(size)
    }), !imageUrl && !claimed && /*#__PURE__*/_jsx(IconArtist, {
      iconSize: getIconSize(size)
    })]
  });
};

var getIconSize = function getIconSize(size) {
  return size < 160 ? 32 : 48;
};