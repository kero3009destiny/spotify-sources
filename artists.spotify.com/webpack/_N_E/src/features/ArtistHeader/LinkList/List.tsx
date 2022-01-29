// ignore-string-externalization
import styled from 'styled-components';
import { screenMdMin, screenSmMin, screenXsMax, spacer8 } from '@spotify-internal/encore-web';
export var List = styled.ul.withConfig({
  displayName: "List",
  componentId: "sc-1ljd89p-0"
})(["padding-bottom:0;list-style-type:none;@media (max-width:", "){margin-top:", ";}@media (min-width:", "){display:flex;flex-shrink:0;margin-left:auto;}@media (min-width:", "){margin-right:auto;}"], screenXsMax, spacer8, screenSmMin, screenMdMin);