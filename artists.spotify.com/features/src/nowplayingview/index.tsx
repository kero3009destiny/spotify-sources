// ignore-string-externalization
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white, gray50, spacer20 } from '@spotify-internal/encore-web';

import { CropInfo } from '@mrkt/features/mediahelpers/types';

import { Attribution } from './Attribution';
import { Canvas, CanvasType } from './Canvas';
import { Player } from './Player';
import {
  CANVAS_TYPE_VIDEO,
  CANVAS_TYPE_VIDEO_LOOPING,
  CANVAS_TYPE_VIDEO_LOOPING_RANDOM,
} from '@mrkt/features/canvas/lib/constants';

const NPV_ASPECT_RATIO = 9 / 16;
export const NPV_WIDTH = 280;
export const NPV_HEIGHT = NPV_WIDTH / NPV_ASPECT_RATIO;
const DEVICE_GUIDELINE_WIDTH = parseInt(spacer20, 10);

const Container = styled.div`
  background: ${gray50};
  border-radius: 6px;
  height: ${NPV_HEIGHT}px;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  width: ${NPV_WIDTH}px;
`;

const DeviceGuidelines = styled.div<{ showContentGuidelines?: boolean }>`
  bottom: 0;
  left: ${props =>
    props.showContentGuidelines ? `${DEVICE_GUIDELINE_WIDTH}px` : 0};
  position: absolute;
  right: ${props =>
    props.showContentGuidelines ? `${DEVICE_GUIDELINE_WIDTH}px` : 0};
  top: 0;

  &::before,
  &::after {
    background: ${white};
    content: '';
    height: 100%;
    opacity: 0.7;
    position: absolute;
    top: 0;
    width: ${DEVICE_GUIDELINE_WIDTH}px;
  }
  &::before {
    left: -${DEVICE_GUIDELINE_WIDTH}px;
  }
  &::after {
    right: -${DEVICE_GUIDELINE_WIDTH}px;
  }
`;

type NowPlayingViewProps = {
  canvas?: {
    type: CanvasType;
    url: string;
    cropInfo?: CropInfo;
  };
  artist: {
    name: string;
    imageUrl?: string;
  };
  entity: {
    name: string;
    imageUrl: string;
  };
  replaceable?: boolean;
  showContentGuidelines?: boolean;
};

export function NowPlayingView({
  canvas,
  artist,
  entity,
  replaceable,
  showContentGuidelines,
}: NowPlayingViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [attributionVisible, setAttributionVisible] = useState(false);
  const showAttribution = () => canvas && setAttributionVisible(true);
  const hideAttribution = () => canvas && setAttributionVisible(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const isVideo =
    canvas?.type === CANVAS_TYPE_VIDEO ||
    canvas?.type === CANVAS_TYPE_VIDEO_LOOPING ||
    canvas?.type === CANVAS_TYPE_VIDEO_LOOPING_RANDOM;
  const playPauseVideo = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsVideoPlaying(false);
    }
  };

  return (
    <Container
      onFocus={showAttribution}
      onBlur={hideAttribution}
      onMouseEnter={showAttribution}
      onMouseLeave={hideAttribution}
    >
      <Canvas canvas={canvas} videoRef={videoRef} />

      <DeviceGuidelines
        showContentGuidelines={showContentGuidelines}
        data-testid={
          showContentGuidelines
            ? 'npv--guidelines--enabled'
            : 'npv--guidelines--disabled'
        }
      >
        <Player
          artistName={artist.name}
          trackName={entity.name}
          trackImage={entity.imageUrl}
          condensed={showContentGuidelines}
          visible={!attributionVisible}
          showAddCanvas={replaceable && !canvas}
          showAlbumArt={!replaceable && !canvas}
        />

        <Attribution
          artistName={artist.name}
          artistImage={artist.imageUrl}
          replaceable={replaceable}
          hasCanvas={!!canvas}
          isVideo={isVideo}
          isVideoPlaying={isVideoPlaying}
          onPlayPauseVideo={playPauseVideo}
          condensed={showContentGuidelines}
          visible={attributionVisible}
        />
      </DeviceGuidelines>
    </Container>
  );
}

NowPlayingView.propTypes = {
  canvas: PropTypes.shape({
    url: PropTypes.string.isRequired,
    cropInfo: PropTypes.shape({
      height: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }),
  }),
  artist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  entity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  replaceable: PropTypes.bool,
  showContentGuidelines: PropTypes.bool,
};
