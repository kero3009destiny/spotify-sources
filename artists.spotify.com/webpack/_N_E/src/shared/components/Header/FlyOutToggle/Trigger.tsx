// ignore-string-externalization
import styled from 'styled-components';
import { spacer, color, breakpoint } from '@spotify-internal/encore-web';
import { UnstyledButton } from '@mrkt/features/UnstyledButton';
export var Trigger = styled(UnstyledButton).withConfig({
  displayName: "Trigger",
  componentId: "sc-1e9m45h-0"
})(["display:flex;align-items:center;text-align:left;height:100%;margin-right:", ";padding-left:", ";padding-right:28px;outline:none;color:", ";z-index:1;&:hover{background-color:", ";}&:focus{background-color:", ";}&:active{background-color:transparent;}@media (min-width:", "){position:absolute;left:0;}@media (max-width:", "){margin-left:-", ";}"], spacer.spacer12, spacer.spacer20, color.white, color.gray15, color.gray20, breakpoint.screenMdMin, breakpoint.screenSmMax, spacer.spacer20);