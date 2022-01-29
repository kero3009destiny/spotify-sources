// ignore-string-externalization
import styled from 'styled-components';
import { Banner, screenSmMin, spacer24 } from '@spotify-internal/encore-web';
/* eslint-disable-next-line import/no-default-export */

export default styled(Banner).withConfig({
  displayName: "Alert",
  componentId: "l2zyml-0"
})(["@media (min-width:", "){border-radius:4px;margin-bottom:", ";}"], screenSmMin, spacer24);