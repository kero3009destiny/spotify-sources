// ignore-string-externalization
import styled, { css } from 'styled-components';
import { Backdrop as EncoreBackdrop } from '@spotify-internal/encore-web';
import { zIndexNav } from '../../../../shared/styles/variables';
var transition = {
  entering: css(["opacity:1;pointer-events:initial;transition:opacity 0.1s ease-in;"]),
  entered: css(["opacity:1;pointer-events:initial;"]),
  exiting: css(["opacity:0;pointer-events:none;transition:opacity 0.1s ease-in;"]),
  exited: css(["opacity:0;pointer-events:none;"]),
  unmounted: css([""])
};
// We need a lower z-index value than usual so that the navigational elements can appear on top it,
// while altogether remaining at a lower zindex value than popups, dialogs, etc elsewhere in the application.
export var Backdrop = styled(EncoreBackdrop).withConfig({
  displayName: "Backdrop",
  componentId: "sc-14ktqe5-0"
})(["", " z-index:", ";"], function (_ref) {
  var transitionState = _ref.transitionState;
  return transition[transitionState];
}, zIndexNav);