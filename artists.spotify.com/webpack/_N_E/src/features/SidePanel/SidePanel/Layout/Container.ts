// ignore-string-externalization
import styled, { css } from 'styled-components';
import { gray10, screenXsMax, screenSmMin } from '@spotify-internal/encore-web';
import { zIndexNav } from '../../../../shared/styles/variables';
var transition = {
  entering: css(["left:0;transition:all 0.1s ease-in;"]),
  entered: css(["left:0;"]),
  exiting: css(["left:-100%;transition:all 0.1s ease-in;"]),
  exited: css(["left:-100%;visibility:hidden;"]),
  unmounted: css([""])
};
export var Container = styled.div.withConfig({
  displayName: "Container",
  componentId: "sc-1oqsxas-0"
})(["background-color:", ";position:fixed;left:0;top:0;z-index:", ";display:flex;flex-direction:column;justify-content:flex-start;box-shadow:0 0 14px 0 rgba(0,0,0,1);@media (max-width:", "){height:100%;width:100%;}@media (min-width:", "){height:100vh;width:336px;}", ""], gray10, zIndexNav, screenXsMax, screenSmMin, function (props) {
  return transition[props.transitionState];
});