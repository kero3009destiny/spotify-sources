// ignore-string-externalization
import styled from 'styled-components';
import { cssColorValue, TableRow, TableCell, spacer4, spacer12, spacer16, spacer48 } from '@spotify-internal/encore-web';
export var ReleaseLevelTableBody = styled.tbody.withConfig({
  displayName: "TableBodystyle__ReleaseLevelTableBody",
  componentId: "lolhox-0"
})(["font-size:14px;&:first-child{padding-left:", ";}"], function (props) {
  return props.isXSmallScreen ? spacer4 : spacer12;
});
export var CustomTableCell = styled(TableCell).withConfig({
  displayName: "TableBodystyle__CustomTableCell",
  componentId: "lolhox-1"
})(["opacity:", ";cursor:", ";"], function (props) {
  return props.isDisabled && 0.3;
}, function (props) {
  return props.isDisabled && 'default';
});
export var ReleaseLevelTableRow = styled(TableRow).withConfig({
  displayName: "TableBodystyle__ReleaseLevelTableRow",
  componentId: "lolhox-2"
})(["border-bottom-color:", ";border-top:1px solid ", ";"], cssColorValue('decorativeSubdued'), cssColorValue('decorativeSubdued'));
export var TrackListTableBody = styled.tbody.withConfig({
  displayName: "TableBodystyle__TrackListTableBody",
  componentId: "lolhox-3"
})(["font-size:14px;&::after{content:'';display:block;margin-bottom:", ";}"], spacer48);
export var TrackListTableRow = styled(TableRow).withConfig({
  displayName: "TableBodystyle__TrackListTableRow",
  componentId: "lolhox-4"
})(["cursor:pointer;&:not(:only-child){border-bottom-color:", ";}&:only-child{border-bottom:1px solid ", ";border-top:1px solid ", ";}&:not(:only-child):first-child{border-top-color:", ";}"], cssColorValue('decorativeSubdued'), cssColorValue('decorativeSubdued'), cssColorValue('decorativeSubdued'), cssColorValue('decorativeSubdued'));
export var TrackListTableCell = styled(CustomTableCell).withConfig({
  displayName: "TableBodystyle__TrackListTableCell",
  componentId: "lolhox-5"
})(["padding-bottom:", ";padding-top:", ";&:first-child{padding-right:0;}"], spacer16, spacer16);