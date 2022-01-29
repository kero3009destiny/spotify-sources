// ignore-string-externalization
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { cssColorValue, Type, IconChartUp, IconChartDown, Image, screenXxsMax, screenXsMin, screenXsMax, screenSmMin, screenSmMax, screenMdMin, screenLgMax, screenXlMin, spacer24, spacer48 } from '@spotify-internal/encore-web';
import { Screen } from '../../../../../shared/lib/useViewport';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var maxCroppedImageSize = '144px';
var defaultBackdropPreset = 'VIBRANT';
var ArtCardBackdrop = styled.div.withConfig({
  displayName: "CardHeader__ArtCardBackdrop",
  componentId: "wd6kpn-0"
})(["background-color:", ";opacity:", ";height:calc( ", "vw / 2 + ", " );grid-column:1;grid-row:1;max-height:calc(", " / 2 + ", ");min-height:", ";"], function (props) {
  return props.backdropColor.color;
}, function (props) {
  return props.backdropColor.opacity;
}, function (props) {
  return getViewportMultiplier(props.viewport);
}, spacer24, maxCroppedImageSize, spacer24, spacer48);
var ArtCardHead = styled.div.withConfig({
  displayName: "CardHeader__ArtCardHead",
  componentId: "wd6kpn-1"
})(["display:grid;"]);
var CardCroppedImage = styled(Image).withConfig({
  displayName: "CardHeader__CardCroppedImage",
  componentId: "wd6kpn-2"
})(["height:", "vw;margin-left:", ";margin-top:", ";max-height:", ";max-width:", ";min-height:", ";min-width:", ";width:", "vw;"], function (props) {
  return getViewportMultiplier(props.viewport);
}, spacer24, spacer24, maxCroppedImageSize, maxCroppedImageSize, spacer48, spacer48, function (props) {
  return getViewportMultiplier(props.viewport);
});
var ArtCardImage = styled(CardCroppedImage).withConfig({
  displayName: "CardHeader__ArtCardImage",
  componentId: "wd6kpn-3"
})(["grid-column:1;grid-row:1;position:relative;"]);
var IconCardImage = styled(CardCroppedImage).withConfig({
  displayName: "CardHeader__IconCardImage",
  componentId: "wd6kpn-4"
})(["border-radius:50%;"]);
var InfoCardImage = styled(Image).withConfig({
  displayName: "CardHeader__InfoCardImage",
  componentId: "wd6kpn-5"
})(["max-height:196px;width:100%;@media (max-width:", "){height:36vw;}@media (min-width:", ") and (max-width:", "){height:32vw;}@media (min-width:", ") and (max-width:", "){height:19vw;}@media (min-width:", ") and (max-width:", "){height:14vw;}@media (min-width:", "){height:10vw;}"], screenXxsMax, screenXsMin, screenXsMax, screenSmMin, screenSmMax, screenMdMin, screenLgMax, screenXlMin);
var StatCardArrowUp = styled(IconChartUp).attrs({
  iconSize: 24,
  color: cssColorValue('textPositive')
}).withConfig({
  displayName: "CardHeader__StatCardArrowUp",
  componentId: "wd6kpn-6"
})(["margin-bottom:-7px;"]);
var StatCardArrowDown = styled(IconChartDown).attrs({
  iconSize: 24,
  color: cssColorValue('textNegative')
}).withConfig({
  displayName: "CardHeader__StatCardArrowDown",
  componentId: "wd6kpn-7"
})(["margin-bottom:-7px;"]);
var StatCardHead = styled(Type.h1).attrs({
  variant: Type.display2,
  weight: Type.bold,
  condensed: true
}).withConfig({
  displayName: "CardHeader__StatCardHead",
  componentId: "wd6kpn-8"
})(["padding:", " ", " 0 ", ";"], spacer24, spacer24, spacer24);

var getViewportMultiplier = function getViewportMultiplier(viewport) {
  if (viewport <= Screen.XS) {
    return 30;
  }

  if (viewport > Screen.XS && viewport < Screen.SM) {
    return 24;
  }

  if (viewport >= Screen.SM && viewport < Screen.MD) {
    return 14;
  }

  if (viewport >= Screen.MD && viewport < Screen.LG) {
    return 12;
  }

  if (viewport >= Screen.LG && viewport < Screen.XL) {
    return 10;
  } // viewport >= Screen.XL


  return 8;
};

export var getBackdropColor = function getBackdropColor(cardColorList) {
  var color = cssColorValue('backgroundHighlight');
  var opacity = 1.0;

  if (Array.isArray(cardColorList) && cardColorList.length > 0) {
    var cardColor = cardColorList.find(function (c) {
      return c.preset === defaultBackdropPreset;
    });

    if (cardColor) {
      color = "#".concat(cardColor.colorHex);
      opacity = 0.3;
    }
  }

  return {
    color: color,
    opacity: opacity
  };
};
var CardHeader = /*#__PURE__*/React.memo(function (props) {
  var displayType = props.displayType,
      header = props.header,
      fallbackImageUrl = props.fallbackImageUrl,
      cardColorList = props.cardColorList,
      viewport = props.viewport,
      headerType = props.headerType;
  var image = header ? header : fallbackImageUrl;
  var placeholder = fallbackImageUrl ? fallbackImageUrl : 'data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw==';
  var backdropColor = getBackdropColor(cardColorList);

  switch (displayType) {
    case 'COVER':
      return /*#__PURE__*/_jsxs(ArtCardHead, {
        children: [/*#__PURE__*/_jsx(ArtCardBackdrop, {
          viewport: viewport,
          backdropColor: backdropColor
        }), /*#__PURE__*/_jsx(ArtCardImage, {
          alt: "",
          src: image,
          viewport: viewport,
          placeholderSrc: placeholder,
          crop: true
        })]
      });

    case 'STAT':
      if (headerType === 'DELTA') {
        var deltaAsNumber = Number(header);
        var isValidNumber = !isNaN(deltaAsNumber);
        return isValidNumber ? /*#__PURE__*/_jsxs(StatCardHead, {
          children: [header, deltaAsNumber > 0 ? /*#__PURE__*/_jsx(StatCardArrowUp, {}) : /*#__PURE__*/_jsx(StatCardArrowDown, {})]
        }) : null;
      }

      return /*#__PURE__*/_jsx(StatCardHead, {
        children: header
      });

    case 'INFO':
      return /*#__PURE__*/_jsx(InfoCardImage, {
        alt: "",
        src: image,
        placeholderSrc: placeholder,
        crop: true
      });

    case 'ICON':
      return /*#__PURE__*/_jsx(IconCardImage, {
        alt: "",
        src: image,
        viewport: viewport,
        placeholderSrc: placeholder,
        crop: true
      });

    default:
      return null;
  }
});
CardHeader.propTypes = {
  displayType: PropTypes.oneOf(['COVER', 'ICON', 'INFO', 'STAT', 'UNKNOWN_DISPLAY_TYPE']).isRequired,
  headerType: PropTypes.oneOf(['IMAGE_URL', 'TEXT', 'DELTA', 'UNKNOWN_HEADER_TYPE']).isRequired,
  header: PropTypes.string.isRequired,
  fallbackImageUrl: PropTypes.string,
  cardColorList: PropTypes.arrayOf(PropTypes.shape({
    preset: PropTypes.string,
    colorHex: PropTypes.string
  })),
  viewport: PropTypes.number.isRequired
};
/* eslint-disable-next-line import/no-default-export */

export default CardHeader;