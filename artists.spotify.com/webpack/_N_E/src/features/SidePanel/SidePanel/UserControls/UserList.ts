// ignore-string-externalization
import styled, { css } from 'styled-components';
var transition = {
  entering: css(["margin-bottom:0;visibility:visible;transition:margin-bottom 0.1s ease-in;"]),
  entered: css(["margin-bottom:0;visibility:visible;"]),
  exiting: css(["margin-bottom:-", "px;visibility:hidden;transition:margin-bottom 0.1s ease-in;"], function (props) {
    return props.listHeight;
  }),
  exited: css(["margin-bottom:-", "px;visibility:hidden;"], function (props) {
    return props.listHeight;
  }),
  unmounted: css([""])
};
export var UserList = styled.ul.withConfig({
  displayName: "UserList",
  componentId: "sc-16zhgs5-0"
})(["padding-bottom:0;", ""], function (_ref) {
  var transitionState = _ref.transitionState;
  return transition[transitionState];
});