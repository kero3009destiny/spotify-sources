// ignore-string-externalization
import styled, { css } from 'styled-components';
import { gray40, spacer8, failure, screenSmMin } from '@spotify-internal/encore-web';
var PADDING_LARGE_VERTICAL = 10;
export var EditorSection = styled.section.withConfig({
  displayName: "indexstyles__EditorSection",
  componentId: "sc-1jgucsz-0"
})(["color:", ";margin-bottom:", ";"], gray40, PADDING_LARGE_VERTICAL);
export var EditorControlsWrapper = styled.div.withConfig({
  displayName: "indexstyles__EditorControlsWrapper",
  componentId: "sc-1jgucsz-1"
})(["align-items:center;display:block;font-size:12px;margin-top:", "px;@media (min-width:", "px){display:flex;justify-content:space-between;}"], spacer8, screenSmMin);
export var EditorFooter = styled.footer.withConfig({
  displayName: "indexstyles__EditorFooter",
  componentId: "sc-1jgucsz-2"
})(["display:flex;font-size:12px;justify-content:space-between;margin-bottom:", ";"], PADDING_LARGE_VERTICAL);
export var EditorCharLimit = styled.div.withConfig({
  displayName: "indexstyles__EditorCharLimit",
  componentId: "sc-1jgucsz-3"
})(["", ""], function (props) {
  return props.error && css(["color:", ";"], failure);
});