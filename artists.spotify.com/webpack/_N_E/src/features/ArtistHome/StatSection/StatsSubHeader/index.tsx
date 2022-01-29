// ignore-string-externalization
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { cssColorValue, Type, spacer12, spacer32 } from '@spotify-internal/encore-web';
import { jsxs as _jsxs } from "react/jsx-runtime";
var HeaderContainer = styled.div.withConfig({
  displayName: "StatsSubHeader__HeaderContainer",
  componentId: "sc-1o3asv7-0"
})(["align-items:baseline;border-bottom:1px solid ", ";display:flex;flex-direction:row;justify-content:space-between;margin-top:", ";padding-bottom:", ";"], cssColorValue('essentialBase'), spacer32, spacer12);
var HeaderTitleText = styled(Type.h1).attrs({
  condensed: true,
  variant: Type.heading4,
  weight: Type.bold
}).withConfig({
  displayName: "StatsSubHeader__HeaderTitleText",
  componentId: "sc-1o3asv7-1"
})([""]);
var DataTitleText = styled(Type.p).attrs({
  color: cssColorValue('textSubdued'),
  condensed: true,
  variant: Type.cta4
}).withConfig({
  displayName: "StatsSubHeader__DataTitleText",
  componentId: "sc-1o3asv7-2"
})([""]);
var StatsSubHeader = /*#__PURE__*/React.memo(function (props) {
  return /*#__PURE__*/_jsxs(HeaderContainer, {
    children: [/*#__PURE__*/_jsxs(HeaderTitleText, {
      children: [" ", props.title, " "]
    }), /*#__PURE__*/_jsxs(DataTitleText, {
      children: [" ", props.dataTitle, " "]
    })]
  });
});
StatsSubHeader.propTypes = {
  title: PropTypes.string.isRequired,
  dataTitle: PropTypes.string.isRequired
};
/* eslint-disable-next-line import/no-default-export */

export default StatsSubHeader;