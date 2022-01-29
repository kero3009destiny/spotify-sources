// ignore-string-externalization
import styled from 'styled-components';
import { gray70, gray20, screenXsMax, screenSmMin, spacer24, spacer20, spacer12, white } from '@spotify-internal/encore-web';
import { buttonReset } from '../../../../shared/styles/mixins/buttons';
export var ButtonUser = styled.button.withConfig({
  displayName: "ButtonUser",
  componentId: "sc-12h3ljn-0"
})(["", " color:", ";padding-left:", ";padding-right:", ";width:100%;position:relative;height:80px;flex-shrink:0;@media (max-width:", "){padding-top:", ";padding-bottom:", ";}@media (min-width:", "){padding-top:", ";padding-bottom:", ";}&:hover,&:focus{color:", ";background:", ";box-shadow:0 1px 0 0 ", ",0 -1px 0 0 ", ";z-index:1;}"], buttonReset(), gray70, spacer24, spacer24, screenXsMax, spacer12, spacer12, screenSmMin, spacer20, spacer20, white, gray20, gray20, gray20);