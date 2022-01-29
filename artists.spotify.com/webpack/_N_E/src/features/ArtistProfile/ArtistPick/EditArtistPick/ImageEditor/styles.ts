// ignore-string-externalization
import styled from 'styled-components';
import { gray10, spacer16, spacer24 } from '@spotify-internal/encore-web';
import { ImageMove } from '@mrkt/features/imagecapture';
export var Image = styled.div.withConfig({
  displayName: "styles__Image",
  componentId: "sc-67i20q-0"
})(["user-select:none;"]);
export var ImageArrows = styled.div.withConfig({
  displayName: "styles__ImageArrows",
  componentId: "sc-67i20q-1"
})(["background:linear-gradient(transparent,", ");bottom:0;display:flex;justify-content:center;left:0;pointer-events:none;position:absolute;right:0;top:0;align-items:center;"], gray10);
export var ImageArrowsInner = styled(ImageMove).withConfig({
  displayName: "styles__ImageArrowsInner",
  componentId: "sc-67i20q-2"
})(["width:10%;"]);
export var ImageControls = styled.div.withConfig({
  displayName: "styles__ImageControls",
  componentId: "sc-67i20q-3"
})(["display:flex;justify-content:space-between;padding:", " 0 ", ";"], spacer16, spacer24);