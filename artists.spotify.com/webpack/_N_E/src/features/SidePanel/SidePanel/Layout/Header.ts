// ignore-string-externalization
import styled from 'styled-components';
import { screenXsMax, screenSmMin, spacer20, spacer24, white } from '@spotify-internal/encore-web';
import { navPadding } from '../../../../shared/components/Header';
export var Header = styled.header.withConfig({
  displayName: "Header",
  componentId: "sc-1d8a76o-0"
})(["color:", ";display:flex;justify-content:space-between;align-items:center;flex-shrink:0;flex-wrap:wrap;@media (max-width:", "){padding:", " ", ";}@media (min-width:", "){height:76px;margin:2px ", " 0;}"], white, screenXsMax, spacer20, spacer24, screenSmMin, navPadding);