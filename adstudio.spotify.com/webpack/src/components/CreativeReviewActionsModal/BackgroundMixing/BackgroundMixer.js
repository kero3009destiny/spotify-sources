import React, { PureComponent } from 'react';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import i18n from 'i18next';
import styled, { css } from 'styled-components';

import {
  spacer8,
  spacer12,
  spacer24,
} from '@spotify-internal/encore-foundation';
import { IconHeadphones, IconVolume, Type } from '@spotify-internal/encore-web';

import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';

import BackgroundMixerTimeline from './BackgroundMixerTimeline';
import VolumeControl from './VolumeControls';

import {
  TEST_IDS,
  USER_ACTION_ADJUST_MUSIC_START,
  USER_ACTION_ADJUST_VOICE_START,
  USER_ACTION_ADJUST_VOLUME,
  USER_ACTION_CAT_REVISE_BG,
} from './constants';
import { REVISE_DEFAULTS } from 'config/revise';

import PropTypes from 'prop-types';

const I18N_MIXER_BACKGROUND_VOLUME = i18n.t(
  'I18N_MIXER_BACKGROUND_VOLUME',
  'Volume',
);

const I18N_MIXER_VOICEOVER_START_TIME = i18n.t(
  'I18N_MIXER_VOICEOVER_START_TIME',
  'Voiceover start time',
);

const I18N_MIXER_MUSIC_START_TIME = i18n.t(
  'I18N_MIXER_MUSIC_START_TIME',
  'Music start time',
);

const I18N_MIXER_MUSIC_LENGTH = i18n.t(
  'I18N_MIXER_TRACK_LENGTH',
  'Music length',
);

const I18N_MIXER_VOICEOVER_LENGTH = i18n.t(
  'I18N_MIXER_TRACK_LENGTH',
  'Voiceover length',
);

const I18N_MIXER_TRIM_DRAG = i18n.t(
  'I18N_MIXER_TRIM_DRAG',
  'Drag handle to trim track',
);

const TRACK_TYPES = {
  BACKGROUND: 'BACKGROUND',
  VOICEOVER: 'VOICEOVER',
  SUFFIX_DURATION: '_Duration',
  SUFFIX_SELECTORLENGTH: '_SelectorLength',
};

const TRIM_SIDE = {
  LEFT: 'left',
  RIGHT: 'right',
};

const BG_TRACK_LENGTH = 60; // in secs
const BG_SELECTOR_LENGTH = REVISE_DEFAULTS.MUSIC_DURATION; // in seconds
export const BG_SELECTOR_LENGTH_OVER_VOICEOVER = 2; // in seconds
const VO_TRACK_LENGTH = 15;
const BG_MIN_DURATION = 35;
const BG_MAX_DURATION = 60;
const VO_MIN_DURATION = 0;
const VO_MAX_DURATION = 35;
const UPDATE_INTERVAL = 30;

const ICON_COLOR = '#c4c4c4';
const BG_SELECTOR_COLOR = '#dc148c';
const VO_SELECTOR_COLOR = '#4100f5';
const BG_TRACK_COLOR = 'rgb(239 168 206)';

const DisabledCss = css`
  pointer-events: none;
  opacity: 0.5;
`;

const EmptyHeader = styled.div`
  background: #f5f5f5;
`;

const RemixHeader = styled(Type.p)`
  padding-top: ${spacer8};
  padding-bottom: ${spacer8};
`;

const StyledMixHeader = styled(Type.p)`
  padding: 10px 0 6px;
`;

const StyledBgGuideBar = styled.span`
  width: ${spacer24};
  height: ${spacer12};
  display: inline-block;
  background: ${BG_SELECTOR_COLOR};
  border: 1.4px solid #f59b23;
  border-radius: 2px;
`;

const StyledVoGuideBar = styled.span`
  width: ${spacer24};
  height: ${spacer12};
  display: inline-block;
  background: ${VO_SELECTOR_COLOR};
  border-radius: 2px;
`;

const RemixBody = styled.div`
  padding: 0;
  background-color: #f5f5f5;
  display: grid;
  grid-template-columns: auto 1fr;
  border: 1px solid #d2d2d2;
  box-sizing: border-box;
`;

const PLAYER_HEIGHT = '62px';

const PlayerBody = styled.div`
  width: 100px;
  padding: 7px 0 0 7px;
  border-top: 1px solid #d2d2d2;
  border-right: 1px solid #d2d2d2;
  font-family: Circular Sp UI;
  font-size: 13px;
  line-height: ${spacer12};
  letter-spacing: -0.25px;
  color: #181818;
`;

const IconVolumeStyled = styled(IconVolume)`
  color: ${ICON_COLOR};
  margin-top: 5px;
`;

const IconHeadphonesStyled = styled(IconHeadphones)`
  ${props =>
    props.trackTypePlaying && props.trackTypePlaying === props.trackType
      ? `color: ${props.theme.colors.primaryColor};`
      : `color: ${ICON_COLOR};`}
  ${props => props.disabled && DisabledCss}
`;

const IconHeadphonesDiv = styled.div`
  cursor: pointer;
  display: block;
  padding-top: 3px;
`;

const VOLUME_CONTROL_WIDTH = '68px';

const StyledDivForVolumeControl = styled.div`
  width: ${VOLUME_CONTROL_WIDTH};
  float: right;
  padding: 6px;
`;

const TrackSVG = `
  <svg width="140" height="21" viewBox="0 0 135 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="70.4219" y="0.52002" width="4.25427" height="20" rx="2.12714" fill="#EDEDED"/>
    <rect x="10.8613" y="0.52002" width="4.25427" height="20" rx="2.12714" fill="#EDEDED"/>
    <rect x="90.2754" y="0.52002" width="4.25427" height="20" rx="2.12714" fill="#EDEDED"/>
    <rect x="60.4951" y="3.02014" width="4.25427" height="13.75" rx="2.12714" fill="#EDEDED"/>
    <rect x="0.935547" y="3.02014" width="4.25427" height="13.75" rx="2.12714" fill="#EDEDED"/>
    <rect x="80.3486" y="3.02014" width="4.25427" height="13.75" rx="2.12714" fill="#EDEDED"/>
    <rect x="30.7158" y="0.52002" width="4.25427" height="20" rx="2.12714" fill="#EDEDED"/>
    <rect x="50.5693" y="0.52002" width="4.25427" height="20" rx="2.12714" fill="#EDEDED"/>
    <rect x="20.7891" y="3.02014" width="4.25427" height="13.75" rx="2.12714" fill="#EDEDED"/>
    <rect x="40.6426" y="3.02014" width="4.25427" height="13.75" rx="2.12714" fill="#EDEDED"/>
    <rect x="110.128" y="0.52002" width="4.25427" height="20" rx="2.12714" fill="#EDEDED"/>
    <rect x="129.981" y="0.52002" width="4.25427" height="20" rx="2.12714" fill="#EDEDED"/>
    <rect x="100.202" y="3.02014" width="4.25427" height="13.75" rx="2.12714" fill="#EDEDED"/>
    <rect x="120.056" y="3.02014" width="4.25427" height="13.75" rx="2.12714" fill="#EDEDED"/>
  </svg>
`;

const TrackSvgUriEncoded = encodeURIComponent(TrackSVG);

const TrackBodyBgBorder = styled.div`
  border: 1px solid #d2d2d2;
  border-right: 0;
  border-left: 0;
`;

const TrackBodyBG = styled.div`
  height: ${PLAYER_HEIGHT};
  background-color: ${BG_TRACK_COLOR};
  background-image: url("data:image/svg+xml;utf8,${TrackSvgUriEncoded}");
  background-repeat: repeat-x;
  background-position: left center;
  border-radius: 6px;
`;

const TrackBodyBgSelection = styled.div`
  position: relative;
  height: ${PLAYER_HEIGHT};
  width: ${props => (props.selectorLength / props.trackLength) * 100}%;
  ${props =>
    props.trackTypePlaying && props.trackTypePlaying === props.trackType
      ? `background-image: url("data:image/svg+xml;utf8,${TrackSvgUriEncoded}"), linear-gradient(to right, ${BG_SELECTOR_COLOR} ${props.playingPercent}%, ${BG_TRACK_COLOR} ${props.playingPercent}%);`
      : `background-image: url("data:image/svg+xml;utf8,${TrackSvgUriEncoded}");
        background-color: ${BG_SELECTOR_COLOR};`}
  background-repeat: repeat-x;
  background-position: left center;
  border: 3px solid #f59b23;
  border-radius: 6px;
  cursor: move;
  ${props => props.disabled && DisabledCss}
`;

const TrimmingHandle = styled.div`
  position: absolute;
  width: 4px;
  height: 60%;
  margin: auto;
  top: 0;
  left: ${props => (props.trimSide === TRIM_SIDE.LEFT ? `-3px` : `100%`)};
  bottom: 0;
  background: #000;
  cursor: col-resize;

  ${props => (props.trimSide === TRIM_SIDE.LEFT ? `&:after` : `&:before`)} {
    position: absolute;
    top: 20%;
    font-weight: bold;
    content: ${props =>
      props.trimSide === TRIM_SIDE.LEFT ? `'\u2192'` : `'\u2190'`};
    left: ${props => (props.trimSide === TRIM_SIDE.LEFT ? `0` : `-13px`)};
  }
`;

const TrackBodyVO = styled.div`
  height: ${PLAYER_HEIGHT};
`;

const TrackBodyVoSelection = styled.div`
  position: relative;
  height: ${PLAYER_HEIGHT};
  width: ${props => (props.trackLength / props.bgTrackLength) * 100}%;
  ${props =>
    props.trackTypePlaying && props.trackTypePlaying === props.trackType
      ? `background-image: url("data:image/svg+xml;utf8,${TrackSvgUriEncoded}"), linear-gradient(to right, ${VO_SELECTOR_COLOR} ${props.playingPercent}%, #AD93F5 ${props.playingPercent}%);`
      : `background-image: url("data:image/svg+xml;utf8,${TrackSvgUriEncoded}");
        background-color: ${VO_SELECTOR_COLOR};`}
  background-repeat: repeat-x;
  background-position: left center;
  border-radius: 6px;
  cursor: move;
  ${props => props.disabled && DisabledCss}
`;

export class BackgroundMixer extends PureComponent {
  state = {
    targetType: null,
    [`${TRACK_TYPES.BACKGROUND}${TRACK_TYPES.SUFFIX_DURATION}`]: BG_TRACK_LENGTH,
    [`${TRACK_TYPES.VOICEOVER}${TRACK_TYPES.SUFFIX_DURATION}`]: VO_TRACK_LENGTH,
    trackTypePlaying: null,
    playingPercent: null,
    musicUrl: this.props.musicUrl,
    voiceoverUrl: this.props.voiceoverUrl,
    [`${TRACK_TYPES.BACKGROUND}${TRACK_TYPES.SUFFIX_SELECTORLENGTH}`]:
      this.props.musicDuration || BG_SELECTOR_LENGTH, // in seconds,
    playbackInterval: null,
  };
  trackSettings = {
    [TRACK_TYPES.BACKGROUND]: {
      player: React.createRef(),
      selector: React.createRef(),
      trackLength: BG_TRACK_LENGTH,
      startTime: this.props.musicStart || REVISE_DEFAULTS.MUSIC_START,
      backgroundVolume:
        this.props.backgroundVolume || REVISE_DEFAULTS.BACKGROUND_VOLUME,
    },
    [TRACK_TYPES.VOICEOVER]: {
      player: React.createRef(),
      selector: React.createRef(),
      trackLength: VO_TRACK_LENGTH,
      startTime: this.props.voiceStart || REVISE_DEFAULTS.VOICE_START,
    },
  };

  componentDidMount() {
    const bgTrackSettings = this.getTrackSettings(TRACK_TYPES.BACKGROUND);
    bgTrackSettings.elSelector = bgTrackSettings.selector.current;
    const {
      left: parentLeft,
      right: parentRight,
      width: parentWidth,
    } = this.getParentClientRect(bgTrackSettings.elSelector);
    bgTrackSettings.parentLeft = parentLeft;
    bgTrackSettings.parentRight = parentRight;
    bgTrackSettings.parentWidth = parentWidth;
    bgTrackSettings.pixelsPerSecond = Math.floor(
      parentWidth / (bgTrackSettings.trackLength || 1),
    );
    bgTrackSettings.startTime = this.props.musicStart;
    this.setSelectorLengthBg(this.props.musicDuration || BG_SELECTOR_LENGTH);

    const voTrackSettings = this.getTrackSettings(TRACK_TYPES.VOICEOVER);
    voTrackSettings.elSelector = voTrackSettings.selector.current;
    voTrackSettings.parentLeft = parentLeft; // same as bg
    voTrackSettings.parentRight = parentRight;
    voTrackSettings.parentWidth = parentWidth;
    voTrackSettings.pixelsPerSecond = bgTrackSettings.pixelsPerSecond; // same rate as bg (?)
    voTrackSettings.parentStartTime = bgTrackSettings.startTime; // used to adjust calculations off bg
    voTrackSettings.startTime = this.props.voiceStart;

    this.updateSelectors(bgTrackSettings, voTrackSettings);
  }

  componentWillUnmount() {
    this.resetPlaybackInterval();
  }

  onMouseDown = e => {
    // TODO(milko): add for touchstart
    e.preventDefault();
    e.stopPropagation();
    const { clientX, target } = e;
    const targetType = target.dataset.type;
    this.setState({ targetType });
    const trackSettings = this.getTrackSettings(targetType);
    const elSelector = trackSettings.elSelector;
    const { left } = elSelector.getBoundingClientRect();
    trackSettings.dragStartLeft = left - trackSettings.parentLeft;
    trackSettings.dragStartX = clientX;
    window.addEventListener('mousemove', this.onMouseMove, false);
    window.addEventListener('mouseup', this.onMouseUp, false);
  };

  onMouseUp = e => {
    // TODO(milko): add for touchend
    e.preventDefault();
    e.stopPropagation();
    window.removeEventListener('mousemove', this.onMouseMove, false);
    window.removeEventListener('mouseup', this.onMouseUp, false);
    const oldTargetType = this.state.targetType;
    this.setState({ targetType: null });
    const bgTrackSettings = this.getTrackSettings(TRACK_TYPES.BACKGROUND);
    const voTrackSettings = this.getTrackSettings(TRACK_TYPES.VOICEOVER);
    this.props.updateFormFields(
      voTrackSettings.startTime,
      bgTrackSettings.startTime,
      bgTrackSettings.backgroundVolume,
      this.getSelectorLengthBg(),
    );
    if (oldTargetType === TRACK_TYPES.BACKGROUND) {
      this.logMixParamAdjustment(
        USER_ACTION_ADJUST_MUSIC_START,
        bgTrackSettings.startTime,
      );
    } else if (oldTargetType === TRACK_TYPES.VOICEOVER) {
      this.logMixParamAdjustment(
        USER_ACTION_ADJUST_VOICE_START,
        voTrackSettings.startTime,
      );
    }
  };

  onMouseMove = e => {
    // TODO(milko): add for touchmove
    e.preventDefault();
    e.stopPropagation();
    const targetType = this.state.targetType; // moving background of voiceover selector?
    const { clientX } = e; // movementX from event object is not reliable
    const movementX = clientX - (this.trackSettings.clientX || 0);

    const bgTrackSettings = this.getTrackSettings(TRACK_TYPES.BACKGROUND);
    const bgSelector = bgTrackSettings.elSelector;
    const {
      left: bgLeft,
      right: bgRight,
      width: bgWidth,
    } = bgSelector.getBoundingClientRect();

    const voTrackSettings = this.getTrackSettings(TRACK_TYPES.VOICEOVER);
    const voSelector = voTrackSettings.elSelector;

    if (targetType === TRACK_TYPES.BACKGROUND) {
      if (
        !this.checkBoundaries(
          bgLeft,
          bgRight,
          bgTrackSettings.parentLeft,
          bgTrackSettings.parentRight,
          movementX,
          clientX,
        )
      ) {
        return false;
      }
      const leftNew = this.getLeft(
        bgTrackSettings,
        clientX,
        null,
        bgRight,
        bgWidth,
      );
      bgSelector.style.left = `${leftNew}px`;
      this.updateMixingParams(bgTrackSettings, bgLeft);

      // now move vo selector at the same rate
      voTrackSettings.parentStartTime = bgTrackSettings.startTime; // used to adjust calculations off bg
      voSelector.style.left = `${leftNew +
        this.secondsToPixels(voTrackSettings, voTrackSettings.startTime)}px`;
    } else {
      // targetType === TRACK_TYPES.VOICEOVER
      const {
        left: voLeft,
        right: voRight,
      } = voSelector.getBoundingClientRect();
      if (
        !this.checkBoundaries(
          voLeft,
          voRight,
          bgLeft,
          bgRight,
          movementX,
          clientX,
        )
      ) {
        return false;
      }
      const leftNew = this.getLeft(
        voTrackSettings,
        clientX,
        null,
        bgRight,
        bgWidth,
      );
      voSelector.style.left = `${leftNew}px`;
      this.updateMixingParams(voTrackSettings, voLeft);
    }
    this.trackSettings.clientX = clientX;
  };

  onMouseLeave = e => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ trimShow: false });
  };

  onVolumeChange = value => {
    const bgTrackSettings = this.getTrackSettings(TRACK_TYPES.BACKGROUND);
    const voTrackSettings = this.getTrackSettings(TRACK_TYPES.VOICEOVER);
    bgTrackSettings.backgroundVolume = value;
    this.props.updateFormFields(
      voTrackSettings.startTime,
      bgTrackSettings.startTime,
      value,
      this.getSelectorLengthBg(),
    );
  };

  onVolumeBlur = evt => {
    this.logMixParamAdjustment(
      USER_ACTION_ADJUST_VOLUME,
      evt.currentTarget.value,
    );
  };

  logMixParamAdjustment(label, value) {
    this.props.logUserAction({
      category: USER_ACTION_CAT_REVISE_BG,
      label,
      params: {
        value,
      },
    });
  }

  audioLoader = (trackType, url, min, max) => {
    if (!url) {
      return null;
    }
    return (
      <audio
        ref={this.getTrackSettings(trackType).player}
        src={url}
        preload="metadata"
        onLoadedMetadata={e => {
          this.setTrackDuration(
            trackType,
            this.constrainFloat(e.currentTarget.duration, min, max),
          );
        }}
        onPause={() => this.playPausedTrack(trackType)}
      />
    );
  };

  checkBoundaries = (left, right, parentLeft, parentRight, movementX) => {
    return !(
      (left <= parentLeft && movementX < 0) ||
      (right >= parentRight && movementX > 0)
    );
  };

  componentWillReceiveProps(nextProps) {
    const {
      voiceStart,
      musicStart,
      backgroundVolume,
      musicDuration,
      musicUrl,
      voiceoverUrl,
    } = nextProps;
    const bgTrackSettings = this.getTrackSettings(TRACK_TYPES.BACKGROUND);

    this.setState({ musicUrl, voiceoverUrl });

    bgTrackSettings.startTime = musicStart;
    bgTrackSettings.backgroundVolume = backgroundVolume;
    bgTrackSettings.trackLength = this.getTrackDurationBg();
    bgTrackSettings.pixelsPerSecond = Math.floor(
      bgTrackSettings.parentWidth / (bgTrackSettings.trackLength || 1),
    );
    this.setSelectorLengthBg(musicDuration || BG_SELECTOR_LENGTH);

    const voTrackSettings = this.getTrackSettings(TRACK_TYPES.VOICEOVER);
    voTrackSettings.startTime = voiceStart;
    voTrackSettings.parentStartTime = bgTrackSettings.startTime; // used to adjust calculations off bg
    voTrackSettings.trackLength = this.getTrackDurationVO();
    voTrackSettings.pixelsPerSecond = bgTrackSettings.pixelsPerSecond; // same rate as bg

    this.updateSelectors(bgTrackSettings, voTrackSettings);
  }

  getLeft = (trackSettings, clientX, left, right, width) => {
    let leftNew =
      trackSettings.dragStartLeft + clientX - trackSettings.dragStartX;
    // this fixes mouse jumping out of bounds & dragging sliding element with it
    if (leftNew < 0) {
      leftNew = 0;
    } else if (left !== null && leftNew < left) {
      leftNew = left - trackSettings.parentLeft + 1;
    } else if (right >= trackSettings.parentRight) {
      leftNew = trackSettings.parentWidth - width - 1;
    }
    return leftNew;
  };

  getParentClientRect = element => {
    const rect = element.parentNode.getBoundingClientRect();
    if (rect.right === 0) {
      // FIXME(milko): needed for testing, as RTL doesn't render parent
      rect.right = 200;
      rect.width = 200;
    }
    return rect;
  };

  getTrackDuration = trackType => {
    return this.state[`${trackType}${TRACK_TYPES.SUFFIX_DURATION}`];
  };

  setTrackDuration = (trackType, value) => {
    const stateProp = {
      [`${trackType}${TRACK_TYPES.SUFFIX_DURATION}`]: this.roundDecimals(value),
    };
    this.setState({ ...stateProp });
  };

  getTrackDurationBg = () => {
    return this.getTrackDuration(TRACK_TYPES.BACKGROUND);
  };

  getTrackDurationVO = () => {
    return this.getTrackDuration(TRACK_TYPES.VOICEOVER);
  };

  getSelectorLength = trackType => {
    return this.state[`${trackType}${TRACK_TYPES.SUFFIX_SELECTORLENGTH}`];
  };

  setSelectorLength = (trackType, value) => {
    const stateProp = {
      [`${trackType}${TRACK_TYPES.SUFFIX_SELECTORLENGTH}`]: value,
    };
    this.setState({ ...stateProp });
  };

  getSelectorLengthBg = () => {
    return this.getSelectorLength(TRACK_TYPES.BACKGROUND);
  };

  setSelectorLengthBg = value => {
    this.setSelectorLength(TRACK_TYPES.BACKGROUND, value);
  };

  getTrackSettings = trackType => {
    return this.trackSettings[trackType];
  };

  pixelsToSeconds = (trackSettings, pixels) => {
    return this.roundDecimals(pixels / (trackSettings.pixelsPerSecond || 1));
  };

  getPlayIcon = trackType => {
    const { musicUrl, voiceoverUrl } = this.state;
    const src = trackType === TRACK_TYPES.BACKGROUND ? musicUrl : voiceoverUrl;
    const disabled = !src;
    const title = !disabled
      ? i18n.t('I18N_MIXER_CLICK_TO_PLAY_TRACK', 'Click to play this track')
      : i18n.t(
          'I18N_MIXER_CLICK_TO_PLAY_TRACK_DISABLED',
          'Playback is disabled until a background music track is selected',
        );
    const props = {
      iconSize: 16,
      onClick: e => this.playTrack(e, trackType),
      trackType,
      trackTypePlaying: this.state.trackTypePlaying,
      disabled,
    };
    return (
      <IconHeadphonesDiv title={`${title}`}>
        <IconHeadphonesStyled {...props} />
      </IconHeadphonesDiv>
    );
  };

  resetPlaybackInterval() {
    clearInterval(this.state.playbackInterval);
    this.setState({ playbackInterval: null });
  }

  playTrack = (e, trackType) => {
    this.resetPlaybackInterval();
    // stop currently playing track when switching tracks to play
    const trackTypePlaying = this.state.trackTypePlaying;
    if (trackTypePlaying && trackTypePlaying !== trackType) {
      const playerActive = this.getTrackSettings(trackTypePlaying).player
        .current;
      playerActive.pause();
    }
    // now play new track or stop currently playing track
    const trackSettings = this.getTrackSettings(trackType);
    const startTime =
      trackType === TRACK_TYPES.BACKGROUND ? trackSettings.startTime : 0;
    const player = trackSettings.player.current;
    if (player.paused) {
      player.src = `${player.src.split('#')[0]}#t=${startTime},${startTime +
        (this.getSelectorLength(trackType) || trackSettings.trackLength)}`;
      player.play();
      this.setState({
        trackTypePlaying: trackType,
        playbackInterval: setInterval(() => {
          if (player) {
            this.playTimeUpdate(player, trackType);
          }
        }, UPDATE_INTERVAL),
      });
    } else {
      player.pause();
    }
  };

  playPausedTrack = trackType => {
    if (this.state.trackTypePlaying === trackType) {
      this.setState({ trackTypePlaying: null });
      this.resetPlaybackInterval();
    }
  };

  playTimeUpdate = (player, trackType) => {
    const trackSettings = this.getTrackSettings(trackType);
    const currentTime = player.currentTime;
    const trackLength =
      this.getSelectorLength(trackType) || trackSettings.trackLength;
    const startTime =
      trackType === TRACK_TYPES.BACKGROUND ? trackSettings.startTime : 0;
    const playingPercent = ((currentTime - startTime) / trackLength) * 100;
    this.setState({ playingPercent });
  };

  constrainFloat = (value, min, max) => {
    return Math.max(Math.min(value, max), min);
  };

  // rounding to 1 decimal as this is used here
  roundDecimals = number => {
    return Math.round(number * 10) / 10;
  };

  secondsToPixels = (trackSettings, seconds) => {
    return seconds * trackSettings.pixelsPerSecond;
  };

  selectorDisabled = trackType => {
    const trackTypePlaying = this.state.trackTypePlaying;
    return trackTypePlaying && trackTypePlaying !== trackType;
  };

  tooltipShow = e => {
    const { type: targetType, tooltipvar } = e.target.dataset;
    if (!targetType) {
      return;
    }
    const trackSettings = this.getTrackSettings(targetType);
    let tooltip;
    // volume control is an exception with var in dataset props
    // other others, tooltip is: Music start time: #s. Music length: #s
    if (!tooltipvar) {
      const startTimeLabel =
        targetType === TRACK_TYPES.BACKGROUND
          ? I18N_MIXER_MUSIC_START_TIME
          : I18N_MIXER_VOICEOVER_START_TIME;
      const trackLengthLabel =
        targetType === TRACK_TYPES.BACKGROUND
          ? I18N_MIXER_MUSIC_LENGTH
          : I18N_MIXER_VOICEOVER_LENGTH;
      tooltip = `${startTimeLabel}: ${trackSettings.startTime}s.
${trackLengthLabel}: ${this.getSelectorLength(targetType) ||
        this.getTrackDuration(targetType)}s`;
    } else {
      // for volume control here
      tooltip = `${I18N_MIXER_BACKGROUND_VOLUME}: ${Math.floor(
        trackSettings[tooltipvar] * 100,
      )}%`;
    }
    // now showing tooltip on the cheap! using browser's native one
    e.target.title = tooltip;
  };

  trimShow = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ trimShow: true });
  };

  trimStart = (e, side) => {
    e.preventDefault();
    e.stopPropagation();
    const targetType = TRACK_TYPES.BACKGROUND; // TODO(milko): for more general target.dataset.type;
    this.setState({
      trimTargetType: targetType,
      trimSide: side,
    });
    window.addEventListener('mousemove', this.trimMove, false);
    window.addEventListener('mouseup', this.trimEnd, false);
  };

  trimEnd = e => {
    e.preventDefault();
    e.stopPropagation();

    // disable listeners
    window.removeEventListener('mousemove', this.trimMove, false);
    window.removeEventListener('mouseup', this.trimEnd, false);

    // update track params here
    // const trimSide = this.state.trimSide;
    const trimTargetType = this.state.trimTargetType;
    this.setState({
      trimTargetType: null,
    });
    const trackSettings = this.getTrackSettings(trimTargetType);
    const widthInPixels = parseFloat(trackSettings.elSelector.style.width);
    // used when testing when trim should not change anything (validation)
    if (isNaN(widthInPixels)) {
      return;
    }
    const selectorLength = this.pixelsToSeconds(trackSettings, widthInPixels);
    this.setSelectorLengthBg(selectorLength); // for bg track

    const voTrackSettings = this.getTrackSettings(TRACK_TYPES.VOICEOVER);
    const bgTrackSettings = this.getTrackSettings(TRACK_TYPES.BACKGROUND);
    this.props.updateFormFields(
      voTrackSettings.startTime,
      bgTrackSettings.startTime,
      bgTrackSettings.backgroundVolume,
      selectorLength,
    );
  };

  trimMove = e => {
    e.preventDefault();
    e.stopPropagation();
    const trimSide = this.state.trimSide;
    const { clientX } = e;
    const bgTrackSettings = this.getTrackSettings(TRACK_TYPES.BACKGROUND);
    const bgSelector = bgTrackSettings.elSelector;
    // these getBoundingClientRect calls must match tests order in mock fn (1st for bg selector)
    const { left: bgLeft, right: bgRight } = bgSelector.getBoundingClientRect();
    const voTrackSettings = this.getTrackSettings(TRACK_TYPES.VOICEOVER);
    const voSelector = voTrackSettings.elSelector;
    const { left: voLeft, right: voRight } = voSelector.getBoundingClientRect();

    if (trimSide === TRIM_SIDE.RIGHT) {
      const newWidth = clientX - bgLeft;

      // validations
      if (!this.trimValidateDuration(newWidth)) {
        return;
      }
      // right side cannot be less than voiceover's
      if (bgLeft + newWidth < voRight) {
        return;
      }
      // right side cannot be greater than parent element's
      if (bgLeft + newWidth > bgTrackSettings.parentRight) {
        return;
      }

      // setting the value, changing element/selector
      bgSelector.style.width = `${newWidth}px`;
    } else {
      const newWidth = bgRight - clientX;

      // validations
      if (!this.trimValidateDuration(newWidth)) {
        return;
      }
      // left side cannot greater than voiceover's
      if (clientX > voLeft) {
        return;
      }
      // left side cannot be less than parent element's
      if (clientX < bgTrackSettings.parentLeft) {
        return;
      }

      // setting the value, changing element/selector
      bgSelector.style.width = `${newWidth}px`;
      bgSelector.style.left = `${clientX - bgTrackSettings.parentLeft}px`;
    }
  };

  trimValidateDuration = widthInPixels => {
    const bgTrackSettings = this.getTrackSettings(TRACK_TYPES.BACKGROUND);
    const voTrackSettings = this.getTrackSettings(TRACK_TYPES.VOICEOVER);
    const widthInSeconds = this.pixelsToSeconds(bgTrackSettings, widthInPixels);

    // bg track cannot be greater than defined max
    if (widthInSeconds > BG_SELECTOR_LENGTH) {
      return false;
    }
    // bg track duration cannot be less than voiceover track + few secs
    return (
      widthInSeconds >=
      voTrackSettings.trackLength + BG_SELECTOR_LENGTH_OVER_VOICEOVER
    );
  };

  updateMixingParams = (trackSettings, left) => {
    const pixelsMoved = left - trackSettings.parentLeft;
    trackSettings.startTime = this.roundDecimals(
      this.pixelsToSeconds(trackSettings, pixelsMoved) -
        (trackSettings.parentStartTime || 0),
    );
  };

  updateSelectors = (bgTrackSettings, voTrackSettings) => {
    // set start positions for 2 sliding selectors
    const bgStartTimeInPixels = this.secondsToPixels(
      bgTrackSettings,
      bgTrackSettings.startTime,
    );
    bgTrackSettings.elSelector.style.left = `${bgStartTimeInPixels}px`;
    voTrackSettings.elSelector.style.left = `${bgStartTimeInPixels +
      this.secondsToPixels(voTrackSettings, voTrackSettings.startTime)}px`;
  };

  render() {
    const { backgroundVolume } = this.props;
    const { musicUrl, voiceoverUrl } = this.state;
    const bgTrackSettings = this.getTrackSettings(TRACK_TYPES.BACKGROUND);
    const voTrackSettings = this.getTrackSettings(TRACK_TYPES.VOICEOVER);
    const playIconBg = this.getPlayIcon(TRACK_TYPES.BACKGROUND);
    const playIconVo = this.getPlayIcon(TRACK_TYPES.VOICEOVER);

    return (
      <>
        {this.audioLoader(
          TRACK_TYPES.BACKGROUND,
          musicUrl,
          BG_MIN_DURATION,
          BG_MAX_DURATION,
        )}
        {this.audioLoader(
          TRACK_TYPES.VOICEOVER,
          voiceoverUrl,
          VO_MIN_DURATION,
          VO_MAX_DURATION,
        )}
        <RemixHeader>
          <StyledMixHeader weight={Type.bold}>
            {i18n.t('I18N_MIXER_REMIX_AUDIO', 'Remix audio')}
          </StyledMixHeader>
          <Trans i18nKey="I18N_MIXER_MUSIC_DRAG_INSTRUCTIONS">
            Drag
            <StyledBgGuideBar />
            to select your music clip (30s max)
          </Trans>
          <br />
          <Trans i18nKey="I18N_MIXER_VO_DRAG_INSTRUCTIONS">
            Drag
            <StyledVoGuideBar />
            to adjust when the voiceover starts during the music clip
          </Trans>
        </RemixHeader>
        <RemixBody>
          <EmptyHeader />
          <BackgroundMixerTimeline maxSeconds={this.getTrackDurationBg()} />
          <PlayerBody>
            {i18n.t('I18N_MIXER_MUSIC', 'Music')}
            <br />
            <IconVolumeStyled iconSize={16} />
            <StyledDivForVolumeControl
              data-type={TRACK_TYPES.BACKGROUND}
              data-tooltipvar="backgroundVolume"
              onMouseEnter={this.tooltipShow}
            >
              <VolumeControl
                initialValue={backgroundVolume}
                onChange={this.onVolumeChange}
                onBlur={this.onVolumeBlur}
                dataTestId={TEST_IDS.MIXER_VOLUME_SELECTOR}
              />
            </StyledDivForVolumeControl>
            {playIconBg}
          </PlayerBody>
          <TrackBodyBgBorder>
            <TrackBodyBG>
              <TrackBodyBgSelection
                data-type={TRACK_TYPES.BACKGROUND}
                ref={bgTrackSettings.selector}
                onMouseDown={this.onMouseDown}
                trackLength={this.getTrackDurationBg()}
                selectorLength={this.getSelectorLengthBg()}
                onMouseEnter={e => {
                  this.tooltipShow(e);
                  this.trimShow(e);
                }}
                onMouseLeave={this.onMouseLeave}
                data-test={TEST_IDS.MIXER_BACKGROUND_SELECTOR}
                trackType={TRACK_TYPES.BACKGROUND}
                disabled={this.selectorDisabled(TRACK_TYPES.BACKGROUND)}
                trackTypePlaying={this.state.trackTypePlaying}
                playingPercent={this.state.playingPercent}
              >
                {(this.state.trimShow || this.state.trimTargetType) && (
                  <>
                    <TrimmingHandle
                      trimSide={TRIM_SIDE.RIGHT}
                      onMouseDown={e => {
                        this.trimStart(e, TRIM_SIDE.RIGHT);
                      }}
                      title={I18N_MIXER_TRIM_DRAG}
                      data-test={TEST_IDS.MIXER_BACKGROUND_TRIM_RIGHT}
                    />
                  </>
                )}
              </TrackBodyBgSelection>
            </TrackBodyBG>
          </TrackBodyBgBorder>
          <PlayerBody>
            {i18n.t('I18N_MIXER_VOICEOVER', 'Voiceover')}
            {playIconVo}
          </PlayerBody>
          <TrackBodyVO>
            <TrackBodyVoSelection
              data-type={TRACK_TYPES.VOICEOVER}
              ref={voTrackSettings.selector}
              onMouseDown={this.onMouseDown}
              trackLength={this.getTrackDurationVO()}
              bgTrackLength={this.getTrackDurationBg()}
              onMouseEnter={this.tooltipShow}
              data-test={TEST_IDS.MIXER_VOICEOVER_SELECTOR}
              trackType={TRACK_TYPES.VOICEOVER}
              disabled={this.selectorDisabled(TRACK_TYPES.VOICEOVER)}
              trackTypePlaying={this.state.trackTypePlaying}
              playingPercent={this.state.playingPercent}
            />
          </TrackBodyVO>
        </RemixBody>
      </>
    );
  }
}

BackgroundMixer.propTypes = {
  voiceStart: PropTypes.number.isRequired,
  musicStart: PropTypes.number.isRequired,
  backgroundVolume: PropTypes.number.isRequired,
  musicDuration: PropTypes.number.isRequired,
  updateFormFields: PropTypes.func.isRequired,
  createMixPreviewUrl: PropTypes.string.isRequired,
  logUserAction: PropTypes.func.isRequired,
  voiceoverUrl: PropTypes.string.isRequired,
  musicUrl: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    logUserAction: argHash => {
      dispatch(logUserActionAC(argHash));
    },
  };
}

export default connect(null, mapDispatchToProps)(BackgroundMixer);
