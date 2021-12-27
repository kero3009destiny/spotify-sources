import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';

import { Icons } from '@spotify-internal/adstudio-tape';

import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';

import CustomWayPoint from '../common/CustomWayPoint';

import PropTypes from 'prop-types';

export class VideoPlayer extends Component {
  static propTypes = {
    logUserAction: PropTypes.func.isRequired,
    youtubeVideoUrl: PropTypes.string.isRequired,
    videoBackgroundImageSrc: PropTypes.string.isRequired,
    videoBackgroundImageAlt: PropTypes.string.isRequired,
  };

  state = {
    showVideoPlayer: false,
  };

  onPlayVideo = () => {
    this.setState(() => ({ showVideoPlayer: true }));
    this.props.logUserAction({
      category: 'Video',
      params: { url: this.props.youtubeVideoUrl },
      label: 'play',
    });
  };

  setStateAsync(state) {
    return new Promise(resolve => this.setState(state, resolve));
  }

  render() {
    const {
      youtubeVideoUrl,
      videoBackgroundImageSrc,
      videoBackgroundImageAlt,
    } = this.props;
    const { showVideoPlayer } = this.state;

    const { IconPlayAlt } = Icons;

    if (showVideoPlayer) {
      return (
        <div className="video-player">
          <div className="video-wrapper-container">
            <div className="video-wrapper">
              <iframe
                title={i18n.t('I18N_YOUTUBE_VIDEO', 'YouTube Video')}
                data-test="youtube-video-iframe"
                width="100"
                height="100"
                src={youtubeVideoUrl}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="video-player">
        <div className="video-container">
          <a
            tabIndex="0"
            role="button"
            data-test="video-play-btn"
            aria-label={i18n.t('I18N_PLAY_VIDEO', 'play video')}
            onClick={this.onPlayVideo}
          >
            <CustomWayPoint>
              <img
                className="video-bg-image center-block"
                alt={videoBackgroundImageAlt}
                src={videoBackgroundImageSrc}
              />
            </CustomWayPoint>
            <CustomWayPoint>
              <IconPlayAlt
                className="video-play-svg video-play-btn"
                iconSize={96}
              />
            </CustomWayPoint>
          </a>
        </div>
      </div>
    );
  }
}

export default connect(undefined, { logUserAction: logUserActionAC })(
  VideoPlayer,
);
