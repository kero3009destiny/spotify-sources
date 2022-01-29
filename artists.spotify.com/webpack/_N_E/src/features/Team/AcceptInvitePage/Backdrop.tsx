// ignore-string-externalization
import styled from 'styled-components';
import { screenXsMax, gray10 as backgroundColor } from '@spotify-internal/encore-web';
import backgroundUrl from './activationBackground.svg';
export var Backdrop = styled.div.withConfig({
  displayName: "Backdrop",
  componentId: "sc-1v4oyqz-0"
})(["align-items:center;background:url(", ") ", ";background-size:100vw 100vh;bottom:0;display:flex;justify-content:center;left:0;position:fixed;right:0;top:0;@media (max-width:", "){background-size:200vw 100vh;}"], backgroundUrl, backgroundColor, screenXsMax);