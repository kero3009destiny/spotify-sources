import React from 'react';
import styled, { css } from 'styled-components';
import {
  IconChevronDown,
  IconMore,
  IconHeartAlt,
  IconShuffle,
  IconSkipBack,
  IconPauseAltActive,
  IconPlus,
  IconSkipForward,
  IconRepeat,
  IconDevices,
  IconQueue,
  Type,
  spacer12,
  spacer16,
  spacer20,
  spacer24,
  spacer32,
} from '@spotify-internal/encore-web';

const Container = styled.div<{ condensed?: boolean; visible?: boolean }>`
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.45) 44%,
    rgba(0, 0, 0, 0.55) 58%,
    rgba(0, 0, 0, 0.8) 72%,
    rgba(0, 0, 0, 1) 100%
  );
  bottom: 0;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  opacity: ${props => (props.visible ? 1 : 0)};
  padding: ${spacer24} ${spacer20} ${spacer32};
  position: absolute;
  top: 0;
  transition: opacity 200ms;
  width: 100%;

  ${props =>
    props.condensed &&
    css`
      padding-left: ${spacer12};
      padding-right: ${spacer12};
    `}
`;

const VariableHeightRow = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  user-select: initial;
  padding: 28px 0;
  width: 100%;
`;

const ControlsRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const PlayControlsRow = styled(ControlsRow)`
  margin: ${spacer12} 0 ${spacer16};
`;

const CustomIconSize = styled.div<{ size: number }>`
  font-size: ${props => `${props.size}px`};

  svg {
    display: block;
    height: 1em;
    width: 1em;
  }
`;

const AlbumArt = styled.div<{ src: string }>`
  background: transparent url(${props => props.src}) center center no-repeat;
  background-size: contain;
  height: 100%;
  width: 100%;
`;

const ArtistInfo = styled.div`
  overflow: hidden;
  margin-right: 10px;
`;

const TextOverflow = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Divider = styled.hr`
  border-radius: 1px;
  border-top: 2px solid;
  height: 2px;
  margin: 0;
  margin-top: 14px;
  opacity: 0.3;
  width: 100%;
`;

type PlayerProps = {
  artistName: string;
  trackName: string;
  trackImage: string;
  condensed?: boolean;
  visible?: boolean;
  showAddCanvas?: boolean;
  showAlbumArt?: boolean;
};

export function Player({
  artistName,
  trackName,
  trackImage,
  condensed,
  visible,
  showAddCanvas,
  showAlbumArt,
}: PlayerProps) {
  return (
    <Container
      condensed={condensed}
      visible={visible}
      className="encore-muted-accent-set"
    >
      <ControlsRow>
        <IconChevronDown aria-hidden="true" focusable="false" iconSize={16} />
        <IconMore aria-hidden="true" focusable="false" iconSize={16} />
      </ControlsRow>

      <VariableHeightRow>
        {showAddCanvas && (
          <CustomIconSize size={88}>
            <IconPlus
              aria-hidden="true"
              focusable="false"
              iconSize={64}
              semanticColor="textBrightAccent"
              data-testid="npv--add-canvas"
            />
          </CustomIconSize>
        )}
        {showAlbumArt && (
          <AlbumArt src={trackImage} data-testid="npv--albumart" />
        )}
      </VariableHeightRow>

      <ControlsRow>
        <ArtistInfo>
          <Type
            as="p"
            variant={Type.body1}
            weight={Type.bold}
            condensed
            style={{ letterSpacing: '-0.3px' }}
          >
            <TextOverflow>
              <span>{trackName}</span>
            </TextOverflow>
          </Type>
          <Type
            as="p"
            variant={Type.body3}
            weight={Type.book}
            condensed
            style={{ opacity: 0.7 }}
          >
            <TextOverflow>
              <span>{artistName}</span>
            </TextOverflow>
          </Type>
        </ArtistInfo>
        <CustomIconSize size={18}>
          <IconHeartAlt aria-hidden="true" focusable="false" iconSize={16} />
        </CustomIconSize>
      </ControlsRow>

      <Divider />

      <PlayControlsRow>
        <CustomIconSize size={18}>
          <IconShuffle aria-hidden="true" focusable="false" iconSize={16} />
        </CustomIconSize>
        <CustomIconSize size={28}>
          <IconSkipBack aria-hidden="true" focusable="false" iconSize={24} />
        </CustomIconSize>
        <CustomIconSize size={56}>
          <IconPauseAltActive
            aria-hidden="true"
            focusable="false"
            iconSize={48}
          />
        </CustomIconSize>
        <CustomIconSize size={28}>
          <IconSkipForward aria-hidden="true" focusable="false" iconSize={24} />
        </CustomIconSize>
        <CustomIconSize size={18}>
          <IconRepeat aria-hidden="true" focusable="false" iconSize={16} />
        </CustomIconSize>
      </PlayControlsRow>

      <ControlsRow>
        <CustomIconSize size={12}>
          <IconDevices aria-hidden="true" focusable="false" iconSize={16} />
        </CustomIconSize>
        <CustomIconSize size={12}>
          <IconQueue aria-hidden="true" focusable="false" iconSize={16} />
        </CustomIconSize>
      </ControlsRow>
    </Container>
  );
}
