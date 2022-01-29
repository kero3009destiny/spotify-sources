// ignore-string-externalization
import styled from 'styled-components';
import { ButtonSecondary, cssColorValue, PopoverTrigger, Type, screenSmMax, spacer4, spacer8, spacer24, spacer48 } from '@spotify-internal/encore-web';
export var StyledSection = styled.div.withConfig({
  displayName: "styled__StyledSection",
  componentId: "obqz4x-0"
})(["margin-bottom:", ";& > div:first-child{position:relative;}"], spacer48);
export var StyledEmptyMessage = styled.div.withConfig({
  displayName: "styled__StyledEmptyMessage",
  componentId: "obqz4x-1"
})(["border-top:1px solid ", ";padding-top:18px;& > div{max-width:600px;}@media (max-width:", "){&{border:0;}}"], cssColorValue('backgroundPress'), screenSmMax);
export var StyledHeader = styled(Type.h2).withConfig({
  displayName: "styled__StyledHeader",
  componentId: "obqz4x-2"
})(["padding-bottom:", ";"], spacer4);
export var StyledPopoverTrigger = styled(PopoverTrigger).withConfig({
  displayName: "styled__StyledPopoverTrigger",
  componentId: "obqz4x-3"
})(["position:absolute;right:0;top:5px;"]);
export var StyledDescription = styled(Type.p).withConfig({
  displayName: "styled__StyledDescription",
  componentId: "obqz4x-4"
})(["max-width:600px;@media (max-width:", "){&{display:none;}}"], screenSmMax);
export var StyledButtonSecondary = styled(ButtonSecondary).withConfig({
  displayName: "styled__StyledButtonSecondary",
  componentId: "obqz4x-5"
})(["margin-right:", ";"], spacer8);
export var StyledShowMoreSection = styled.div.withConfig({
  displayName: "styled__StyledShowMoreSection",
  componentId: "obqz4x-6"
})(["margin-top:", ";"], spacer24);