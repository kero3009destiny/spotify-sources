// ignore-string-externalization
import styled from 'styled-components';
import { cssColorValue, Type, white } from '@spotify-internal/encore-web';
import { PencilButton } from '../PencilButton';
export var Bio = styled.div.withConfig({
  displayName: "indexstyles__Bio",
  componentId: "sc-133xsvg-0"
})(["padding-bottom:50px;opacity:", ";&:hover::after{opacity:1;}"], function (props) {
  return props.dimmed ? '0.4' : '1';
});
export var BioHeader = styled.header.withConfig({
  displayName: "indexstyles__BioHeader",
  componentId: "sc-133xsvg-1"
})(["align-items:flex-start;display:flex;justify-content:space-between;"]);
export var BioHeaderTitle = styled(Type).attrs({
  forwardedAs: 'h3',
  variant: Type.heading3
}).withConfig({
  displayName: "indexstyles__BioHeaderTitle",
  componentId: "sc-133xsvg-2"
})(["align-items:center;color:", ";display:flex;"], white);
export var BioWithImagesEmptyImages = styled.div.withConfig({
  displayName: "indexstyles__BioWithImagesEmptyImages",
  componentId: "sc-133xsvg-3"
})(["align-items:center;border:1px solid ", ";color:", ";display:flex;flex-direction:column;height:200px;justify-content:center;margin-bottom:20px;opacity:", ";pointer-events:", ";&:focus{outline:none;}"], cssColorValue('essentialSubdued'), cssColorValue('backgroundPress'), function (props) {
  return props.disabled ? '0.5' : '1';
}, function (props) {
  return props.disabled ? 'none' : null;
});
export var BioEditButton = styled(PencilButton).withConfig({
  displayName: "indexstyles__BioEditButton",
  componentId: "sc-133xsvg-4"
})(["@media (min-width:768px){padding-right:24px;}"]);