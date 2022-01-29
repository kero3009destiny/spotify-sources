// ignore-string-externalization
import styled from 'styled-components';
import { screenMdMin, spacer32 } from '@spotify-internal/encore-web'; // Create a gap between items in the same row, but eliminate the gap if an item
// is alone in a row (e.g. when a two-item row wraps)

export var GapRow = styled.div.withConfig({
  displayName: "Elements__GapRow",
  componentId: "sc-1jszbgo-0"
})(["display:inline-flex;flex-wrap:wrap;margin-right:-", ";width:calc(100% + ", ");"], spacer32, spacer32);
export var GapCol = styled.div.withConfig({
  displayName: "Elements__GapCol",
  componentId: "sc-1jszbgo-1"
})(["flex-grow:1;margin-right:", ";min-width:fit-content;@media (min-width:", "){max-width:50%;}"], spacer32, screenMdMin);