import styled, { css } from 'styled-components';
import { Type, DropdownList, cssColorValue, spacer8, spacer12, spacer16, spacer24, spacer48, spacer4, spacer40 } from '@spotify-internal/encore-web';
import { Text } from '@mrkt/features/badge/BadgeWithText/Text';
export var visuallyHidden = function visuallyHidden() {
  return css(["border:0;clip:rect(0,0,0,0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;"]);
};
export var ToggleChildrenVisibility = styled.div.withConfig({
  displayName: "styled__ToggleChildrenVisibility",
  componentId: "sc-1cz2ee8-0"
})(["", ";"], function (props) {
  return props['aria-hidden'] && visuallyHidden;
});
export var CardIcon = styled.span.withConfig({
  displayName: "styled__CardIcon",
  componentId: "sc-1cz2ee8-1"
})(["", " background-repeat:no-repeat;background-size:contain;height:18px;width:26px;margin-right:2px;"], function (props) {
  return "background-image: url(".concat(props.svg, ");");
});
export var Container = styled.div.withConfig({
  displayName: "styled__Container",
  componentId: "sc-1cz2ee8-2"
})(["max-width:1000px;"]);
export var FlexContainer = styled.div.withConfig({
  displayName: "styled__FlexContainer",
  componentId: "sc-1cz2ee8-3"
})(["display:flex;flex-direction:row;align-items:center;button{flex-grow:0;}"]);
export var StyledHeader = styled(Type.h3).withConfig({
  displayName: "styled__StyledHeader",
  componentId: "sc-1cz2ee8-4"
})(["padding-bottom:", ";"], spacer8);
export var BADGE_HEIGHT = '68px';
export var StyledDropdownlist = styled(DropdownList).withConfig({
  displayName: "styled__StyledDropdownlist",
  componentId: "sc-1cz2ee8-5"
})(["margin-top:", ";width:100%;"], spacer4);
export var EmptyStateContainer = styled.li.withConfig({
  displayName: "styled__EmptyStateContainer",
  componentId: "sc-1cz2ee8-6"
})(["display:flex;align-items:center;min-height:", ";min-width:0;padding-top:", ";padding-bottom:", ";padding-left:", ";"], spacer40, spacer16, spacer16, spacer48);
export var EmptyStateText = styled(Text).withConfig({
  displayName: "styled__EmptyStateText",
  componentId: "sc-1cz2ee8-7"
})(["margin-left:", ";"], spacer12);
export var PaymentMethodContainer = css(["align-items:stretch;border:solid 1px ", ";display:flex;border-radius:8px;justify-content:stretch;max-width:490px;& > *{flex-basis:100%;padding:", ";}"], cssColorValue('essentialSubdued'), spacer24);