// ignore-string-externalization
import styled from 'styled-components';
import { Type, gray70, white } from '@spotify-internal/encore-web';
import { navPadding } from '../../../../shared/components/Header';

/* eslint-disable-next-line import/no-default-export */
export default styled.li.withConfig({
  displayName: "Item",
  componentId: "sc-118a68d-0"
})(["margin-left:-", ";margin-right:-", ";color:", ";font-weight:", ";"], navPadding, navPadding, function (props) {
  return props.active ? white : gray70;
}, function (props) {
  return props.active ? Type.bold : undefined;
});