import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { black } from '@spotify-internal/encore-web';

import { CropInfo } from '@mrkt/features/mediahelpers/types';
import { useT } from '@mrkt/features/i18n';
import { NPV_WIDTH, NPV_HEIGHT } from './';

export type CanvasType =
  | 'IMAGE'
  | 'VIDEO'
  | 'VIDEO_LOOPING'
  | 'VIDEO_LOOPING_RANDOM'
  | 'GIF';
const VALID_VIDEO_TYPES = ['VIDEO', 'VIDEO_LOOPING', 'VIDEO_LOOPING_RANDOM'];

const Container = styled.div`
  background: ${black};
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const Preview = styled.video<{ crop?: PreviewCrop }>`
  position: absolute;
  inset-inline-start: 0;

  ${props =>
    !props.crop
      ? css`
          height: 100%;
          object-fit: cover;
          width: 100%;
        `
      : css`
          transform: scale(${props.crop.scale})
            translate(${props.crop.left}px, ${props.crop.top}px);
          transform-origin: top left;

          [dir='rtl'] & {
            transform-origin: top right;
          }
        `};
`;

type PreviewCrop = {
  left: number;
  top: number;
  scale: number;
};

type CanvasProps = {
  canvas?: {
    type: CanvasType;
    url: string;
    cropInfo?: CropInfo;
  };
  videoRef: React.RefObject<HTMLVideoElement>;
};

export function Canvas({ canvas, videoRef }: CanvasProps) {
  const t = useT();

  useEffect(() => {
    // React doesn't guarantee that props will be set:
    // https://github.com/facebook/react/issues/10389
    if (videoRef.current) videoRef.current.muted = true;
  }, [videoRef]);

  if (!canvas) {
    return null;
  }

  let crop: PreviewCrop | undefined;
  if (canvas.cropInfo) {
    crop = {
      top: canvas.cropInfo.top * -1,
      left: canvas.cropInfo.left * -1,
      scale:
        canvas.cropInfo.left > 0
          ? NPV_HEIGHT / canvas.cropInfo.height
          : NPV_WIDTH / canvas.cropInfo.width,
    };
  }

  return (
    <Container>
      {VALID_VIDEO_TYPES.includes(canvas.type) ? (
        <Preview
          ref={videoRef}
          as="video"
          src={canvas.url}
          autoPlay
          loop
          playsInline
          muted
          crop={crop}
          data-testid="npv--canvas-video"
        />
      ) : (
        <Preview
          as="img"
          alt={t('ac0f98', 'current canvas image', '')}
          src={canvas.url}
          crop={crop}
          data-testid="npv--canvas-image"
        />
      )}
    </Container>
  );
}
