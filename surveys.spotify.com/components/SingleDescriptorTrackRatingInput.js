import React, { Component } from 'react';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import LoadingIndicator from './LoadingIndicator';
import PreviewPlayer from './PreviewPlayer';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class SingleDescriptorTrackRatingInput extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleArtworkLoaded = this.handleArtworkLoaded.bind(this);

    this.state = {
      imageLoading: true,
    };
  }

  componentDidUpdate(prevProps) {
    const newImageUrl = this.getTrackImageUrl();
    const prevImageUrl = this.getTrackImageUrl(prevProps);

    if (newImageUrl !== prevImageUrl && !this.state.isImageLoading) {
      // This logic will never make the component enter in an infinite loop
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ imageLoading: true });
    }
  }

  getTrackImageUrl(props = this.props) {
    const { track: { album: { images } } } = props;
    return images && Array.isArray(images) ? images[1].url : undefined;
  }

  handleArtworkLoaded() {
    this.setState({ imageLoading: false });
  }

  render() {
    const { track, rating, playing, onPlayingChange, inputField } = this.props;

    const backdropStyle = {
      backgroundColor: track.color,
    };

    const imageClassnames = classNames('single-track-rating-input__artwork', {
      loading: this.state.imageLoading,
    });

    const carouselStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
    };

    const containerClassNames = classNames('single-track-rating-input', {
      'single-track-rating-input--skipping': rating === null,
    });

    return (
      <section className={containerClassNames}>
        <CSSTransitionGroup
          transitionName="single-track-rating-skip"
          transitionAppearTimeout={500}
          transitionLeaveTimeout={500}
          transitionEnterTimeout={500}
          transitionAppear
        >
          {rating === null && (
            <div className="single-track-rating-input__skip-overlay" key="skip">
              <LoadingIndicator className="single-track-rating-input__skip-loading" />
            </div>
          )}
        </CSSTransitionGroup>
        <div
          className="single-track-rating-input__backdrop"
          style={backdropStyle}
        />
        <header>
          <CSSTransitionGroup
            transitionName="single-track-rating-track"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            <div key={track.uri} style={carouselStyle}>
              <div className={imageClassnames}>
                <img
                  alt="album artwork"
                  src={this.getTrackImageUrl()}
                  onLoad={this.handleArtworkLoaded}
                />
                {this.state.imageLoading && <LoadingIndicator />}
              </div>
              <hgroup>
                <h3
                  className="single-track-rating-input__track-name"
                  title={track.name}
                >
                  <a
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {track.name}
                  </a>
                </h3>
                <div className="single-track-rating-input__artist">
                  By{' '}
                  <span className="single-track-rating-input__artist-name">
                    {track.artists[0].name}
                  </span>
                </div>
                <div className="single-track-rating-input__preview">
                  <PreviewPlayer
                    url={track.preview_url}
                    playing={!!track.preview_url && playing}
                    onPlayingChange={onPlayingChange}
                  />
                </div>
              </hgroup>
            </div>
          </CSSTransitionGroup>
        </header>
        <aside className="single-track-rating-input__input">
          {typeof ratingInput === 'function' ? (
            inputField(this.props)
          ) : (
            inputField
          )}
        </aside>
      </section>
    );
  }
}

SingleDescriptorTrackRatingInput.propTypes = {
  track: PropTypes.object,
  descriptor: PropTypes.string,
  rating: PropTypes.array,
  playing: PropTypes.bool,
  onPlayingChange: PropTypes.func,
  inputField: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};

export default SingleDescriptorTrackRatingInput;



// WEBPACK FOOTER //
// ./src/components/SingleDescriptorTrackRatingInput.js