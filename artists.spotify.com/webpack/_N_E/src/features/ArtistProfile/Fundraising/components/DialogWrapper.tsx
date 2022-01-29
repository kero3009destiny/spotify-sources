// ignore-string-externalization
import styled from 'styled-components';
import { screenXsMax } from '@spotify-internal/encore-web';
export var DialogWrapper = styled.div.withConfig({
  displayName: "DialogWrapper",
  componentId: "ekzujj-0"
})(["display:flex;flex-direction:column;@media (min-width:", "){flex-direction:row;margin:0 auto;max-width:80%;}"], screenXsMax);