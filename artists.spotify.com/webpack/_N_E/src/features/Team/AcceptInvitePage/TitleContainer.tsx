// ignore-string-externalization
import styled from 'styled-components';
import { screenSmMin, spacer24, spacer8 } from '@spotify-internal/encore-web';
export var TitleContainer = styled.div.withConfig({
  displayName: "TitleContainer",
  componentId: "sc-1comng-0"
})(["line-height:30px;font-weight:bold;margin-bottom:", ";margin-top:", ";text-align:center;@media (min-width:", "){font-size:24px;}"], spacer8, spacer24, screenSmMin);