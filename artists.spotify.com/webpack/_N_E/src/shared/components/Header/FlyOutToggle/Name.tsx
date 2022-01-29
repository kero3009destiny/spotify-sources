// ignore-string-externalization
import styled from 'styled-components';
import { Type, breakpoint } from '@spotify-internal/encore-web';
export var Name = styled(Type).attrs({
  variant: 'body2',
  weight: Type.bold
}).withConfig({
  displayName: "Name",
  componentId: "sc-12ul5z0-0"
})(["overflow-y:hidden;@media (max-width:", "){max-height:38px;}@media (max-width:", "){max-width:200px;}@media (min-width:", "){max-height:58px;}@media (min-width:", ") and (max-width:", "){max-width:160px;}@media (min-width:", "){max-width:200px;}"], breakpoint.screenXsMax, breakpoint.screenSmMax, breakpoint.screenSmMin, breakpoint.screenMdMin, breakpoint.screenMdMax, breakpoint.screenLgMin);