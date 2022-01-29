// ignore-string-externalization
import styled, { css } from 'styled-components';
import { Type, gray25, screenXsMax, spacer8 } from '@spotify-internal/encore-web';
export var ListItem = styled.li.withConfig({
  displayName: "ListItem",
  componentId: "vhw4zm-0"
})(["font-weight:", ";position:relative;@media (max-width:", "){font-size:18px;line-height:26px;}", ""], Type.bold, screenXsMax, function (props) {
  return props.isDisabled && css(["color:", ";cursor:not-allowed;@media (max-width:", "){margin-right:", ";}"], gray25, screenXsMax, spacer8);
});