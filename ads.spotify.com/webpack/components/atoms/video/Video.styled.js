import styled from 'styled-components';

import { colors, ratioPercentage } from 'styles/variables';

export const Root = styled.div``;

export const VideoContainer = styled.div`
  height: 0;
  overflow: hidden;
  padding-top: ${ratioPercentage.sixteenNine}%;
  position: relative;
  width: 100%;
`;

export const Video = styled.div`
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const Caption = styled.span`
  color: ${colors.grey400};
  display: block;
  font-size: 1.6rem;
  line-height: 2.4rem;
  margin-top: 1.9rem;
`;
