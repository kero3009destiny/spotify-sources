// ignore-string-externalization
import styled from 'styled-components';
import { cssColorValue, Banner, DialogConfirmation, TextLink, Type, spacer4, spacer8, spacer16, spacer12, spacer24, spacer32, screenXsMin } from '@spotify-internal/encore-web';
export var InfoBanner = styled(Banner).withConfig({
  displayName: "styles__InfoBanner",
  componentId: "sc-1ld2379-0"
})(["margin-bottom:", ";span:first-child{display:inherit;}"], spacer32);
export var BannerText = styled(Type).attrs({
  as: Type.span
}).withConfig({
  displayName: "styles__BannerText",
  componentId: "sc-1ld2379-1"
})(["display:inline;"]); // popover

export var Dialog = styled(DialogConfirmation).withConfig({
  displayName: "styles__Dialog",
  componentId: "sc-1ld2379-2"
})(["max-height:43vh;pointer-events:auto;width:375px;> header{border-bottom:1px solid ", ";padding-block-end:", ";}> footer{a{color:", ";}}@media (max-width:", "){> footer{a:first-of-type,button:first-of-type{margin-inline-start:", ";order:0;}}}"], cssColorValue('decorativeSubdued'), spacer4, cssColorValue('textBrightAccent'), screenXsMin, spacer16);
export var PopoverTextLink = styled(TextLink).withConfig({
  displayName: "styles__PopoverTextLink",
  componentId: "sc-1ld2379-3"
})(["display:inline-block;margin-inline-start:", ";font-weight:bold;text-decoration:underline;&:focus{outline:3px solid ", ";outline-offset:4px;}&:focus:not(:focus-visible){outline:none;}"], spacer4, cssColorValue('essentialBase'));
export var CountryList = styled.ul.withConfig({
  displayName: "styles__CountryList",
  componentId: "sc-1ld2379-4"
})(["padding-block-start:", ";"], spacer16);
export var CountryListItem = styled(Type).attrs({
  forwardedAs: 'li',
  variant: 'body3'
}).withConfig({
  displayName: "styles__CountryListItem",
  componentId: "sc-1ld2379-5"
})(["display:flex;"]);
export var CountryName = styled(Type).withConfig({
  displayName: "styles__CountryName",
  componentId: "sc-1ld2379-6"
})(["align-items:center;"]);
export var IconWrapper = styled.span.withConfig({
  displayName: "styles__IconWrapper",
  componentId: "sc-1ld2379-7"
})(["color:", ";display:inline:block;margin-left:", ";"], cssColorValue('textBrightAccent'), spacer8); // 'S' Badge

export var BadgeWrapper = styled.div.withConfig({
  displayName: "styles__BadgeWrapper",
  componentId: "sc-1ld2379-8"
})(["height:", ";margin-inline-end:", ";"], spacer24, spacer12);