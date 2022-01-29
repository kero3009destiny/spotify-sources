import styled, { css } from 'styled-components';
import { Type, spacer20, white, red, spacer8, FormHelpText } from '@spotify-internal/encore-web';
export var TermsAndConditionsWrapper = styled.div.withConfig({
  displayName: "TermsAndConditions__TermsAndConditionsWrapper",
  componentId: "sc-1flcqsv-0"
})(["display:inline;padding-right:", ";> label{display:inline;}"], spacer20);
var textLinkStyle = css(["color:", ";text-decoration:underline;&:hover{opacity:0.7;}&:focus:not([disabled]){color:", ";text-decoration:underline;outline:thin dotted;}"], white, white);
export var StyledTextLink = styled(Type).attrs({
  forwardedAs: 'a',
  variant: Type.body2
}).withConfig({
  displayName: "TermsAndConditions__StyledTextLink",
  componentId: "sc-1flcqsv-1"
})(["", ""], textLinkStyle);
export var RequiredFieldsAsterisk = styled.span.attrs({
  'aria-hidden': 'true'
}).withConfig({
  displayName: "TermsAndConditions__RequiredFieldsAsterisk",
  componentId: "sc-1flcqsv-2"
})(["color:", ";margin-right:", ";"], red, spacer8);
export var ErrorText = styled(FormHelpText).withConfig({
  displayName: "TermsAndConditions__ErrorText",
  componentId: "sc-1flcqsv-3"
})(["height:20px;margin-bottom:", ";text-align:left;"], spacer8);