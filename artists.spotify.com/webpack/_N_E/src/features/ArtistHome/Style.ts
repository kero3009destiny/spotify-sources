// ignore-string-externalization
import styled from 'styled-components';
import { ButtonTertiary, IconArrowRight, spacer8, spacer24 } from '@spotify-internal/encore-web';
import { ButtonTertiaryAsLink } from '../EncoreCreatorWebHelpers';
export var CTABtnArrow = styled(IconArrowRight).attrs({
  iconSize: 16
}).withConfig({
  displayName: "Style__CTABtnArrow",
  componentId: "l8qfuy-0"
})(["margin-left:", ";"], spacer8);
export var CTABtn = styled(ButtonTertiary).attrs({
  buttonSize: 'sm',
  condensed: true
}).withConfig({
  displayName: "Style__CTABtn",
  componentId: "l8qfuy-1"
})(["align-items:center;display:flex;padding-bottom:", ";padding-top:", ";"], spacer24, spacer24);
export var CTABtnAsLink = styled(ButtonTertiaryAsLink).attrs({
  buttonSize: 'sm',
  condensed: true
}).withConfig({
  displayName: "Style__CTABtnAsLink",
  componentId: "l8qfuy-2"
})(["align-items:center;display:flex;padding-bottom:", ";padding-top:", ";"], spacer24, spacer24);