// ignore-string-externalization
import styled from 'styled-components';
import { FormGroup, FormHelpText, screenSmMin, spacer8 } from '@spotify-internal/encore-web'; // TODO(TeamsReducerRefactor): use layoutType instead of @media to be consistent

export var InputFormGroup = styled(FormGroup).withConfig({
  displayName: "sharedStyles__InputFormGroup",
  componentId: "sc-1wogglt-0"
})(["text-align:left;@media (min-width:", "){width:33.33%;padding-left:", ";padding-right:", ";}"], screenSmMin, spacer8, spacer8);
export var ErrorText = styled(FormHelpText).withConfig({
  displayName: "sharedStyles__ErrorText",
  componentId: "sc-1wogglt-1"
})(["height:20px;margin-bottom:", ";text-align:left;"], spacer8);