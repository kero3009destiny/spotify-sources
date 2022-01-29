// ignore-string-externalization
import styled from 'styled-components';
import { IconMoreAndroid, color, spacer } from '@spotify-internal/encore-web';
export var IconMore = styled(IconMoreAndroid).attrs({
  color: color.white,
  size: 24
}).withConfig({
  displayName: "IconMore",
  componentId: "sc-1vuhal4-0"
})(["margin-right:", ";"], spacer.spacer4);