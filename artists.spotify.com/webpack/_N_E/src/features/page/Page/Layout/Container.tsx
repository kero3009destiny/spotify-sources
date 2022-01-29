// ignore-string-externalization
import styled, { css } from 'styled-components';
import { white, gray10, gray75 } from '@spotify-internal/encore-web';
export var Container = styled.div.withConfig({
  displayName: "Container",
  componentId: "sc-1nq802m-0"
})(["background:", ";display:flex;flex-direction:column;left:0;min-height:100%;position:absolute;top:0;width:100%;", ";"], white, function (props) {
  return props.theme.app === 'dark' && css(["background:", ";color:", ";a[href]:not([class]){color:", ";text-decoration:none;&:hover,&:focus{color:", ";text-decoration:underline;}&:active{color:", ";}&:focus{outline:thin dotted;outline:5px auto -webkit-focus-ring-color;outline-offset:-2px;}}"], gray10, gray75, white, white, white);
});