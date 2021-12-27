import React, { Component } from 'react';

import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import PropTypes from 'prop-types';

let audioPlayer;

export default class PreviewPlayer extends Component {
  constructor(props, context) {
    super(props, context);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handlePreviewEnded = this.handlePreviewEnded.bind(this);
    this.handleCanPlayThrough = this.handleCanPlayThrough.bind(this);
  }

  componentDidMount() {
    if (!audioPlayer) {
      audioPlayer = new Audio();
    }

    audioPlayer.addEventListener(
      'canplaythrough',
      this.handleCanPlayThrough,
      false
    );
    audioPlayer.addEventListener('ended', this.handlePreviewEnded, false);

    this.ensurePlayingState({});
  }

  componentDidUpdate(prevProps) {
    this.ensurePlayingState(prevProps);
  }

  componentWillUnmount() {
    if (audioPlayer) {
      const { url } = this.props;
      const currentUrl = audioPlayer.getAttribute('src');
      audioPlayer.removeEventListener(
        'canplaythrough',
        this.handleCanPlayThrough
      );
      audioPlayer.removeEventListener('ended', this.handlePreviewEnded);

      if (url === currentUrl) {
        audioPlayer.pause();
      }
    }
  }

  ensurePlayingState(prevProps) {
    const { playing, url } = this.props;
    const { url: prevUrl } = prevProps;

    if (url && url !== prevUrl) {
      audioPlayer.pause();
      audioPlayer.setAttribute('src', url);
      audioPlayer.load();
    }

    if (!audioPlayer.paused && (!url || url.lengh === 0 || !playing)) {
      audioPlayer.pause();
    } else if (playing && audioPlayer.paused) {
      audioPlayer.play();
    }
  }

  handlePlayClick(event) {
    event.preventDefault();
    const { playing, onPlayingChange } = this.props;

    if (!this.props.url) {
      return;
    }

    onPlayingChange(!playing);
  }

  handlePreviewEnded() {
    const { onPlayingChange } = this.props;
    onPlayingChange(false);
  }

  handleCanPlayThrough() {
    const { playing } = this.props;
    if (playing && audioPlayer.paused) {
      audioPlayer.play();
    }
  }

  render() {
    const { url, playing } = this.props;

    let glyph = 'play';
    let label = 'Preview';

    if (!url) {
      glyph = 'ban-circle';
      label = 'No preview available';
    } else if (playing) {
      glyph = 'pause';
      label = 'Pause';
    }

    return (
      <span>
        <button
          className="preview-player"
          disabled={!url}
          onClick={this.handlePlayClick}
        >
          <Glyphicon glyph={glyph} />{' '}
          {label}
        </button>
      </span>
    );
  }
}

PreviewPlayer.propTypes = {
  url: PropTypes.string,
  playing: PropTypes.bool,
  onPlayingChange: PropTypes.func,
};



// WEBPACK FOOTER //
// ./src/components/PreviewPlayer.js