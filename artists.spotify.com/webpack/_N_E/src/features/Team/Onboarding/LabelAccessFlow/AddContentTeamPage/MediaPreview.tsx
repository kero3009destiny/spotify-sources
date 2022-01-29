import styled from 'styled-components';
import { Image, Type, IconX, spacer12, spacer16, spacer40, spacer8, screenSmMin, spacer32 } from '@spotify-internal/encore-web';
import React from 'react';
import { LoadingIndicator } from '../../../../../shared/components/LoadingIndicator';
import { assertUnreachable } from '../../../lib/util/assertUnreachable';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var PreviewContainer = styled.div.withConfig({
  displayName: "MediaPreview__PreviewContainer",
  componentId: "sc-1c6al76-0"
})(["display:flex;flex-direction:row;padding-top:", ";margin-bottom:", ";@media (min-width:", "){margin-left:", ";padding-left:", ";}"], spacer8, spacer40, screenSmMin, spacer12, spacer12);
var TextContainer = styled.div.withConfig({
  displayName: "MediaPreview__TextContainer",
  componentId: "sc-1c6al76-1"
})(["margin-left:", ";margin-top:auto;margin-bottom:auto;text-align:left;"], spacer16);
var ClearButton = styled(IconX).withConfig({
  displayName: "MediaPreview__ClearButton",
  componentId: "sc-1c6al76-2"
})(["margin-left:auto;flex-shrink:0;@media (min-width:", "){margin-right:", ";}"], screenSmMin, spacer32);
export var MediaPreview = function MediaPreview(_ref) {
  var media = _ref.media,
      clear = _ref.clear;
  var t = useT();

  if (!media || media.status === 'entering') {
    return null;
  }

  if (media.status === 'loading') {
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  if (media.status === 'error') {
    return /*#__PURE__*/_jsx(PreviewContainer, {
      children: t('MEDIA_PREVIEW_LOADING_ERROR_TEXT', "Your album or track was added, we just can't load a preview right now.", 'Your album or track was added, but there was an error loading the preview')
    });
  }

  if (media.status === 'loaded') {
    return /*#__PURE__*/_jsxs(PreviewContainer, {
      "data-testid": "media-preview",
      children: [/*#__PURE__*/_jsx(Image, {
        src: media.imageUrl,
        alt: "Album art for ".concat(media.mediaName),
        imageHeight: "96px",
        imageWidth: "96px",
        crop: true
      }), /*#__PURE__*/_jsxs(TextContainer, {
        children: [/*#__PURE__*/_jsx(Type, {
          as: "h2",
          variant: Type.body2,
          weight: Type.bold,
          condensed: true,
          children: media.mediaName
        }), /*#__PURE__*/_jsx(Type, {
          as: "p",
          variant: Type.body2,
          condensed: true,
          semanticColor: "textSubdued",
          children: media.labelName
        })]
      }), /*#__PURE__*/_jsx(ClearButton, {
        onClick: clear
      })]
    });
  }

  return assertUnreachable(media);
};