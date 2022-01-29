// ignore-string-externalization
import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Type } from '@spotify-internal/encore-web-v3';
import { useViewport, Viewport } from '../../shared/lib/useViewport';
import { StyledSection, StyledTitle, StyledTitleContainer, StyledToolIconContainer, StyledSubtitle } from './styles';
import { scrollIntoView } from './helpers';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function Section(_ref) {
  var id = _ref.id,
      title = _ref.title,
      toolIcons = _ref.toolIcons,
      subtitle = _ref.subtitle,
      className = _ref.className,
      children = _ref.children;
  var ref = useRef(null);
  var location = useLocation();
  var viewport = useViewport();
  var isMobileViewport = viewport === Viewport.XS;
  useEffect(function () {
    var hash = location.hash;

    if (ref && id && hash.substr(1) === id) {
      scrollIntoView(ref.current);
    }
  }, []);
  /* eslint-disable-line react-hooks/exhaustive-deps */

  return /*#__PURE__*/_jsxs(StyledSection, {
    ref: ref,
    className: className,
    id: id,
    children: [(title || toolIcons) && /*#__PURE__*/_jsxs(StyledTitleContainer, {
      hasToolIcons: !!toolIcons,
      hasSubtitle: !!subtitle,
      children: [title && /*#__PURE__*/_jsx(StyledTitle, {
        variant: isMobileViewport ? Type.heading3 : Type.heading2,
        hasToolIcons: !!toolIcons,
        hasSubtitle: !!subtitle,
        children: title
      }), toolIcons && /*#__PURE__*/_jsx(StyledToolIconContainer, {
        children: toolIcons
      })]
    }), subtitle && /*#__PURE__*/_jsx(StyledSubtitle, {
      children: subtitle
    }), children]
  });
}