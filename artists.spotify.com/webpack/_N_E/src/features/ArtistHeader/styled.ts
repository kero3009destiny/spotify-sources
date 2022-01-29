import { body1FontWeight, spacer4, Tag } from '@spotify-internal/encore-web';
import styled from 'styled-components';
export var NavLinkTag = styled(Tag).withConfig({
  displayName: "styled__NavLinkTag",
  componentId: "sc-3dr6a9-0"
})(["margin-left:", ";font-weight:", ";&:hover:not(:focus):not([disabled]):not(:active){", "}&:active{", "}"], spacer4, body1FontWeight, function (props) {
  return props.color && "background-color: ".concat(props.color, ";");
}, function (props) {
  return props.color && "background-color: ".concat(props.color, ";");
});