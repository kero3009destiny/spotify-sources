// ignore-string-externalization
import styled from 'styled-components';
import { spacer24, white, kleinBlue } from '@spotify-internal/encore-web';
export var StepNumber = styled.div.withConfig({
  displayName: "StepNumber",
  componentId: "n33a9j-0"
})(["&:after{background-color:", ";border:solid 2px ", ";border-radius:100%;content:'", "';color:", ";display:block;font-weight:bold;font-size:", ";height:28px;line-height:26px;margin-right:", ";text-align:center;width:28px;}"], function (p) {
  return p.isComplete ? kleinBlue : white;
}, kleinBlue, function (p) {
  return p.isComplete ? '✓' : p.step;
}, function (p) {
  return p.isComplete ? white : kleinBlue;
}, function (p) {
  return p.isComplete ? '12px' : '14px';
}, spacer24);