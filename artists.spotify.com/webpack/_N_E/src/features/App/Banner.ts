// ignore-string-externalization
import styled from 'styled-components';
import { screenXxsMax, screenXsMin, screenXsMax, screenSmMin, spacer24 } from '@spotify-internal/encore-web';
import { zIndexSticky } from '../../shared/styles/variables';
import { navMobileHeight, navDesktopHeight } from '../../../src/shared/components/Header'; // Calculate the difference between the navigation height on desktop and the space between it and the banner below it

var bannerDesktopOffset = parseInt(navDesktopHeight, 10) + parseInt(spacer24, 10);
/* eslint-disable-next-line import/no-default-export */

export default styled.div.withConfig({
  displayName: "Banner",
  componentId: "sc-6a8l9s-0"
})(["position:sticky;z-index:", ";@media (max-width:", "){top:", ";}@media (min-width:", ") and (max-width:", "){top:", ";}@media (max-width:", "){margin-left:-", ";margin-right:-", ";}@media (min-width:", "){top:", "px;}"], zIndexSticky, screenXxsMax, navMobileHeight, screenXsMin, screenXsMax, navMobileHeight, screenXsMax, spacer24, spacer24, screenSmMin, bannerDesktopOffset);