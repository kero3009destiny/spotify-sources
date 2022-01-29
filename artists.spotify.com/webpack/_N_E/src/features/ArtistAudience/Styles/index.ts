// ignore-string-externalization
import styled from 'styled-components';
import { Type, spacer32 } from '@spotify-internal/encore-web-v3';
/**
 * Main Title Heading for page
 */

export var PageMainTitle = styled(Type.h1).attrs({
  variant: 'heading1'
}).withConfig({
  displayName: "Styles__PageMainTitle",
  componentId: "mygyhy-0"
})(["padding-bottom:", ";padding-top:", ";"], spacer32, spacer32);
export var StyledBannerWrapper = styled.div.withConfig({
  displayName: "Styles__StyledBannerWrapper",
  componentId: "mygyhy-1"
})(["margin:", "px 0 ", " 0;width:615px;"], function (props) {
  return props.topOffset ? -52 : 0;
}, spacer32);