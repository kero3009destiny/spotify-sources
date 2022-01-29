// ignore-string-externalization
import styled, { css } from 'styled-components';
import { gray25, screenXsMax, screenSmMin, spacer24 } from '@spotify-internal/encore-web';
import { navPadding } from '../../../../shared/components/Header';
export var Container = styled.div.withConfig({
  displayName: "Container",
  componentId: "pc9hv1-0"
})(["@media (min-width:", "){", "}@media (max-width:", "){position:relative;width:100vw;padding:14px ", " 0;margin-top:20px;margin-bottom:-6px;margin-left:-", ";margin-right:-", ";border-top:1px solid ", ";}"], screenSmMin, function (_ref) {
  var showSearch = _ref.showSearch;
  return showSearch && css(["left:", ";right:", ";position:absolute;"], spacer24, spacer24);
}, screenXsMax, navPadding, navPadding, navPadding, gray25);