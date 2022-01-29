// ignore-string-externalization
import styled from 'styled-components';
import { Type, cssColorValue, TextLink, gray10, spacer12, spacer16 } from '@spotify-internal/encore-web';
import { CoverArt } from '../../../shared/components/CoverArt';
export var StatsRowContainer = styled.div.withConfig({
  displayName: "Style__StatsRowContainer",
  componentId: "sc-1o9n5b3-0"
})(["border-bottom:1px solid ", ";min-width:0;", ""], cssColorValue('decorativeSubdued'), function (_ref) {
  var isDisabled = _ref.isDisabled;
  return isDisabled ? "opacity: 0.5" : "&:hover {\n      background-color: ".concat(cssColorValue('backgroundHighlight'), ";\n      cursor: pointer;\n    }");
});
export var CenteredFlexDiv = styled.div.withConfig({
  displayName: "Style__CenteredFlexDiv",
  componentId: "sc-1o9n5b3-1"
})(["align-items:center;display:flex;"]);
export var StatsRow = styled(CenteredFlexDiv).withConfig({
  displayName: "Style__StatsRow",
  componentId: "sc-1o9n5b3-2"
})(["justify-content:space-between;min-width:0;padding-bottom:", ";padding-top:", ";"], spacer12, spacer12);
export var StatsMediaEntity = styled(CenteredFlexDiv).withConfig({
  displayName: "Style__StatsMediaEntity",
  componentId: "sc-1o9n5b3-3"
})(["min-width:0;"]);
export var StatsDeltaContainer = styled(CenteredFlexDiv).withConfig({
  displayName: "Style__StatsDeltaContainer",
  componentId: "sc-1o9n5b3-4"
})(["flex-direction:row;justify-content:flex-end;margin-left:", ";"], spacer12);
export var StatsDeltaTitle = styled(Type.p).attrs({
  variant: Type.body2,
  weight: Type.book,
  condensed: true,
  color: cssColorValue('textSubdued')
}).withConfig({
  displayName: "Style__StatsDeltaTitle",
  componentId: "sc-1o9n5b3-5"
})(["font-feature-settings:'tnum';overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"]);
export var StatsMediaInfo = styled.div.withConfig({
  displayName: "Style__StatsMediaInfo",
  componentId: "sc-1o9n5b3-6"
})(["display:flex;flex-direction:column;margin-left:", ";min-width:0;"], spacer12);
export var StatsMediaTitle = styled(Type.p).attrs({
  variant: Type.body2,
  weight: Type.bold,
  condensed: true
}).withConfig({
  displayName: "Style__StatsMediaTitle",
  componentId: "sc-1o9n5b3-7"
})(["overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"]);
export var StatsEmptyText = styled(Type.p).attrs({
  variant: Type.body2,
  color: gray10
}).withConfig({
  displayName: "Style__StatsEmptyText",
  componentId: "sc-1o9n5b3-8"
})(["margin-top:", ";"], spacer16);
export var StatsMediaCover = styled(CoverArt).withConfig({
  displayName: "Style__StatsMediaCover",
  componentId: "sc-1o9n5b3-9"
})(["flex-shrink:0;"]);
export var StatsTextLink = styled(TextLink).withConfig({
  displayName: "Style__StatsTextLink",
  componentId: "sc-1o9n5b3-10"
})(["&&&{display:initial;text-decoration:none;&:hover{color:inherit;text-decoration:none;}&:focus{outline:none;box-shadow:0 3px 0 0 ", ";transition:box-shadow 200ms ease-in;}}"], gray10);