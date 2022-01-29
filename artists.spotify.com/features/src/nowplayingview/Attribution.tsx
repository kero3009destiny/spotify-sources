import React from 'react';
import styled, { css } from 'styled-components';
import {
  spacer8,
  spacer24,
  cssColorValue,
  ButtonSecondary,
} from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';

import { AttributionLine } from '@mrkt/features/attributionline';
const ATTRIBUTION_GRADIENT_HEIGHT = '80px';

const Container = styled.div<{
  condensed?: boolean;
  visible?: boolean;
}>`
  bottom: 0;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  opacity: ${props => (props.visible ? 1 : 0)};
  padding: ${spacer24} ${spacer8} ${spacer8};
  position: absolute;
  top: 0;
  transition: opacity 200ms;
  user-select: none;
  width: 100%;
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) calc(100% - ${ATTRIBUTION_GRADIENT_HEIGHT}),
    rgba(0, 0, 0, 0.5)
  );

  ${props =>
    props.condensed &&
    css`
      padding-left: 0;
      padding-right: 0;
    `}
`;

const AttributionAction = styled.div`
  text-align: center;
`;

const Button = styled(ButtonSecondary)`
  background-color: ${cssColorValue('backgroundPress')};
`;

type AttributionProps = {
  artistName: string;
  artistImage?: string;
  condensed?: boolean;
  hasCanvas: boolean;
  isVideo: boolean;
  isVideoPlaying: boolean;
  onPlayPauseVideo: () => void;
  replaceable?: boolean;
  visible?: boolean;
};

export function Attribution({
  artistName,
  artistImage,
  condensed,
  hasCanvas,
  isVideo,
  isVideoPlaying,
  onPlayPauseVideo,
  replaceable,
  visible,
}: AttributionProps) {
  const t = useT();

  return (
    <Container
      visible={visible}
      condensed={condensed}
      className="encore-over-media-set"
    >
      <AttributionLine
        imageUrl={artistImage}
        text={t(
          'CANVAS_BY_LINE',
          'by {artistName}',
          'byline attributing the artist of the track',
          {
            artistName: artistName,
          },
        )}
      />
      {hasCanvas && replaceable && (
        <AttributionAction>
          <Button buttonSize={ButtonSecondary.sm}>
            {t(
              'CANVAS_REPLACE',
              'Replace',
              'button to replace the uploaded image or video',
            )}
          </Button>
        </AttributionAction>
      )}
      {!replaceable && isVideo && (
        <AttributionAction>
          <Button buttonSize={ButtonSecondary.sm} onClick={onPlayPauseVideo}>
            {isVideoPlaying
              ? t(
                  'CANVAS_PAUSE_VIDEO',
                  'Pause Video',
                  'button to pause the video',
                )
              : t(
                  'CANVAS_PLAY_VIDEO',
                  'Play Video',
                  'button to play the video',
                )}
          </Button>
        </AttributionAction>
      )}
    </Container>
  );
}
