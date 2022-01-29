// ignore-string-externalization
import styled from 'styled-components';
import { gray90, gray95, black10, redLight, spacer24, warning } from '@spotify-internal/encore-web';
export var Card = styled.div.withConfig({
  displayName: "Card",
  componentId: "sc-1ealpgk-0"
})(["align-items:center;border:solid 1px ", ";box-shadow:0 0 0 0 ", ";cursor:", ";display:flex;border-radius:8px;justify-content:stretch;margin-bottom:", ";transition:box-shadow 0.5s;", " *.truncate *{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}& > *{padding:", ";flex-basis:100%;flex-grow:0;flex-shrink:1;}& > .status{flex-basis:88px;flex-shrink:0;}& > .status.editing{align-self:stretch;padding:0;button{cursor:pointer;height:100%;text-align:center;text-transform:uppercase;width:100%;&:hover{background-color:", ";}&:active,&:focus{background-color:", ";outline:none;}}}&.error{border-color:", ";}&.warning{border-color:", ";}"], gray90, black10, function (p) {
  return p.raisesOnHover ? 'pointer' : 'default';
}, spacer24, function (p) {
  return p.raisesOnHover ? "&:hover { box-shadow: 0 8px 16px 0 ".concat(black10, "; }") : '';
}, spacer24, gray95, gray90, redLight, warning);