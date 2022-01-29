// ignore-string-externalization
import styled from 'styled-components';
import { red, warning } from '@spotify-internal/encore-web';
export var ErrSpan = styled.span.withConfig({
  displayName: "ErrSpan",
  componentId: "sc-199f9es-0"
})(["color:", ";font-weight:bold;"], red);
export var WarnSpan = styled.span.withConfig({
  displayName: "ErrSpan__WarnSpan",
  componentId: "sc-199f9es-1"
})(["color:", ";"], warning);