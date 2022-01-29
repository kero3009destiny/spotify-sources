// ignore-string-externalization
import styled from 'styled-components';
import { screenXsMax, screenSmMin, spacer24, spacer48 } from '@spotify-internal/encore-web';
import { appMaxWidth } from '../../../shared/styles/variables';
export var PageContainer = styled.div.withConfig({
  displayName: "Container__PageContainer",
  componentId: "sc-1nh3l8p-0"
})(["@media (max-width:", "){padding-left:", ";padding-right:", ";}@media (min-width:", "){padding-left:", ";padding-right:", ";max-width:", ";margin-left:auto;margin-right:auto;width:100%;}"], screenXsMax, spacer24, spacer24, screenSmMin, spacer48, spacer48, function (props) {
  return props.fluid ? '100%' : appMaxWidth;
});