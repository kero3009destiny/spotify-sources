// ignore-string-externalization
import styled from 'styled-components';
import { FormInput, screenXsMax } from '@spotify-internal/encore-web';
var inputBackgroundColor = 'rgba(255, 255, 255, 0.1)';
export var Input = styled(FormInput).withConfig({
  displayName: "Input",
  componentId: "tp5sbj-0"
})(["display:block;width:100%;border:0;outline:none;background-color:", ";border-radius:18px;height:36px;&&{padding-left:36px;padding-right:36px;}@media (max-width:", "){background-color:", ";&:hover{background-color:", ";}&&&{padding-bottom:10px;}&:focus:focus,&:hover:focus:focus,&:focus:hover:focus,&:hover:focus:hover:focus{padding-bottom:10px;}}"], function (props) {
  return props.showSearch ? inputBackgroundColor : 'transparent';
}, screenXsMax, inputBackgroundColor, inputBackgroundColor);