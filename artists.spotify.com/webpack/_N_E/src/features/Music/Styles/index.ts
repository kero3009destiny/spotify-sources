// ignore-string-externalization
import styled from 'styled-components';
import { ButtonIcon, Type, gray10, gray90, gray80, spacer12, spacer20, spacer32, spacer40 } from '@spotify-internal/encore-web-v3';
import { TooltipTrigger } from '@mrkt/features/TooltipTrigger';
/*
 * — Song Submission —
 */

export var StyleSongSubmission = styled.div.withConfig({
  displayName: "Styles__StyleSongSubmission",
  componentId: "sc-1uxl9af-0"
})(["align-items:center;border-bottom:1px solid ", ";color:", ";display:flex;font-size:14px;justify-content:space-between;padding:", ";"], gray90, gray10, spacer12);
export var PrereleaseCell = styled.div.withConfig({
  displayName: "Styles__PrereleaseCell",
  componentId: "sc-1uxl9af-1"
})(["position:relative;max-width:250px;padding-right:", ";"], spacer20);
export var Divider = styled.hr.withConfig({
  displayName: "Styles__Divider",
  componentId: "sc-1uxl9af-2"
})(["margin:6px -14px;border-color:", ";"], gray80);
/*
 * - Empty State Container -
 */

export var StyleEmptyStateContainer = styled.div.withConfig({
  displayName: "Styles__StyleEmptyStateContainer",
  componentId: "sc-1uxl9af-3"
})(["margin-top:", ";max-width:", ";text-align:", ";"], spacer40, function (props) {
  return props.isXSmallScreen ? null : '650px';
}, function (props) {
  return props.isXSmallScreen ? 'center' : 'start';
});
export var StyleUpcomingContainer = styled.div.withConfig({
  displayName: "Styles__StyleUpcomingContainer",
  componentId: "sc-1uxl9af-4"
})(["margin-bottom:", ";"], spacer32);
/**
 * Page header - holds title
 */

export var PageHeader = styled.div.withConfig({
  displayName: "Styles__PageHeader",
  componentId: "sc-1uxl9af-5"
})(["display:flex;align-items:center;"]);
/**
 * Main Title Heading for page
 */

export var PageMainTitle = styled(Type.h1).attrs({
  variant: 'heading1'
}).withConfig({
  displayName: "Styles__PageMainTitle",
  componentId: "sc-1uxl9af-6"
})(["padding-bottom:", ";padding-top:", ";flex:1;"], spacer32, spacer32);
/**
 * Tooltip Trigger Table Column Styled Elements
 */

export var StyledTooltipTrigger = styled(TooltipTrigger).withConfig({
  displayName: "Styles__StyledTooltipTrigger",
  componentId: "sc-1uxl9af-7"
})(["inset:", ";"], function (props) {
  return props.isRtl ? '4px 5px 0 0' : '4px 0 0 5px';
});
export var StyledButtonIcon = styled(ButtonIcon).withConfig({
  displayName: "Styles__StyledButtonIcon",
  componentId: "sc-1uxl9af-8"
})(["margin-block-start:25px;"]);
export var WrappedTooltipContent = styled.span.withConfig({
  displayName: "Styles__WrappedTooltipContent",
  componentId: "sc-1uxl9af-9"
})(["min-inline-size:300px;white-space:pre-wrap;"]);