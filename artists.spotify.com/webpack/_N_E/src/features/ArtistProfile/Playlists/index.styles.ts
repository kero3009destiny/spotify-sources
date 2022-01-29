// ignore-string-externalization
import styled from 'styled-components';
import { Type, white, screenMdMin } from '@spotify-internal/encore-web';
export var PlaylistsContainer = styled.div.withConfig({
  displayName: "indexstyles__PlaylistsContainer",
  componentId: "sc-1m37jf1-0"
})(["flex-basis:100%;order:3;@media (min-width:", "){flex:0 0 ", "%;max-width:", "%;}"], screenMdMin, 2 / 3 * 100, 2 / 3 * 100);
export var PlaylistsHeaderTitle = styled(Type).attrs({
  forwardedAs: 'h3',
  variant: 'heading4',
  weight: Type.bold
}).withConfig({
  displayName: "indexstyles__PlaylistsHeaderTitle",
  componentId: "sc-1m37jf1-1"
})(["color:", ";display:flex;justify-content:space-between;"], white);