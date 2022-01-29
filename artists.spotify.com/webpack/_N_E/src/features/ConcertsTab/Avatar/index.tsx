import React from 'react';
import styled from 'styled-components';
import { IconArtist, gray20 } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
var Wrapper = styled.div.withConfig({
  displayName: "Avatar__Wrapper",
  componentId: "sc-1lj2kwi-0"
})(["border-radius:50%;height:", "px;width:", "px;object-fit:cover;overflow:hidden;"], function (props) {
  return props.size === 'lg' ? 96 : 64;
}, function (props) {
  return props.size === 'lg' ? 96 : 64;
});
var Image = styled.img.withConfig({
  displayName: "Avatar__Image",
  componentId: "sc-1lj2kwi-1"
})(["display:block;height:100%;left:50%;max-width:none;position:relative;transform:translate(-50%);"]);
var Icon = styled.div.withConfig({
  displayName: "Avatar__Icon",
  componentId: "sc-1lj2kwi-2"
})(["align-items:center;background-color:", ";color:$white;display:flex;height:100%;justify-content:center;width:100%;"], gray20);
/* eslint-disable-next-line import/no-default-export */

export default function Avatar(_ref) {
  var imageUrl = _ref.imageUrl,
      size = _ref.size;
  var t = useT();
  return (
    /*#__PURE__*/
    // @ts-ignore
    _jsx(Wrapper, {
      size: size,
      children: imageUrl ? /*#__PURE__*/_jsx(Image, {
        src: imageUrl,
        title: t('1d94f3', 'Artist Avatar', ''),
        alt: t('1d94f3', 'Artist Avatar', '')
      }) : /*#__PURE__*/_jsx(Icon, {
        "data-testid": "default-icon",
        children: /*#__PURE__*/_jsx(IconArtist, {})
      })
    })
  );
}
Avatar.defaultProps = {
  size: 'sm'
};