import React, { Component } from 'react';
import classnames from 'classnames';

import {
  AudioHOC as audioHOC,
  PlayPauseButton,
} from '@spotify-internal/adstudio-tape';

import PropTypes from 'prop-types';

export class WrappedPlayButton extends Component {
  handleClick = e => {
    const { handleClickPlay, sound, track } = this.props;

    e.stopPropagation();
    handleClickPlay(track, sound.currentTime);
    sound.play();
  };

  componentWillUpdate() {
    const { sound, track, playingTrack } = this.props;
    if (sound.playing && playingTrack.uri !== track.uri) {
      sound.pause();
    }
  }

  render() {
    const { sound, ...remainingProps } = this.props;
    return (
      <PlayPauseButton
        className={classnames('btn btn-play', { playing: sound.playing })}
        {...remainingProps}
        playing={sound.playing}
        onClick={this.handleClick}
      />
    );
  }
}

WrappedPlayButton.propTypes = {
  sound: PropTypes.object,
  track: PropTypes.object,
  playingTrack: PropTypes.object,
  handleClickPlay: PropTypes.func,
};

export default audioHOC(WrappedPlayButton);
