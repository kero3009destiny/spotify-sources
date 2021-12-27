import * as QuestionActions from '../../actions/QuestionActions';
import * as SurveyActions from '../../actions/SurveyActions';

import React, { Component } from 'react';

import { MULTI_TRACK_CONFIRM_QUESTION_LABELS as LABELS } from '../../constants';
import PropTypes from 'prop-types';
import SingleTrackRatingInput from '../SingleTrackRatingInput';
import YesNoButtonBar from '../YesNoButtonBar';
import { connect } from 'react-redux';
import iconUrl from '../../images/spotify-icon-white.svg';

class MultiTrackConfirm extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSkipTrack = this.handleSkipTrack.bind(this);
    this.handleRetractTrack = this.handleRetractTrack.bind(this);
    this.handlePlayingChange = this.handlePlayingChange.bind(this);

    this.state = {
      previewPlaying: false,
    };
  }

  handlePlayingChange(playing) {
    this.setState({ previewPlaying: playing });
  }

  handleRantingChange(surveyId, questionId, trackUri, { rating }) {
    const { onChange, question } = this.props;

    onChange(surveyId, questionId, question.type, {
      [trackUri]: rating,
    });
  }

  handleSkipTrack(event) {
    event.preventDefault();

    const {
      surveyId,
      questionId,
      details: tracks,
      currentTrack,
      onChange,
      question,
    } = this.props;
    const track = tracks.length && tracks[currentTrack];

    if (!track) {
      return;
    }

    onChange(surveyId, questionId, question.type, {
      [track.uri]: null,
    });
  }

  handleRetractTrack(event) {
    const {
      surveyId,
      questionId,
      currentTrack,
      decrementCurrentTrack,
    } = this.props;
    event.preventDefault();

    if (currentTrack > 0) {
      decrementCurrentTrack(surveyId, questionId);
    }
  }

  handleFinishSurvey(surveyId) {
    const { finishSurvey } = this.props;

    finishSurvey(surveyId);
  }

  render() {
    const {
      details: tracks,
      currentTrack,
      ratings,
      surveyId,
      questionId,
      loading,
      canUndoRating,
      question,
    } = this.props;
    const { previewPlaying } = this.state;
    const track = tracks.length ? tracks[currentTrack] : null;

    if (track === null) {
      return <noscript />;
    }
    const rating = ratings[track.uri];
    const questionLabel = LABELS[question.params.subject];

    const inputField = (
      <div>
        <h4 style={{ margin: '20px' }}>{questionLabel}</h4>
        <YesNoButtonBar
          onChange={this.handleRantingChange.bind(
            this,
            surveyId,
            questionId,
            track.uri
          )}
          loading={loading}
          value={rating}
        />
      </div>
    );

    const questionInput = (
      <SingleTrackRatingInput
        track={track}
        rating={rating}
        playing={previewPlaying}
        onPlayingChange={this.handlePlayingChange}
        inputField={inputField}
      />
    );

    const trackRatingCount = currentTrack;

    const nav = (
      <nav>
        <ul>
          <li>
            <button
              onClick={this.handleRetractTrack}
              disabled={loading || !canUndoRating}
            >
              Back
            </button>
          </li>
          <li className="text-center">
            {trackRatingCount} track{trackRatingCount === 1 ? '' : 's'}{' '}
            confirmed
          </li>
          <li className="text-right">
            <button
              className="skip"
              onClick={this.handleSkipTrack}
              disabled={loading}
            >
              Not sure
            </button>
          </li>
        </ul>
      </nav>
    );

    return (
      <section className="question question--multi-track-confirm">
        <header className="question__header">
          <div className="question__header-icon">
            <img alt="Spotify icon" src={iconUrl} />
          </div>
          <div className="question__actions">
            <ul />
          </div>
        </header>
        <div className="question__input">
          {!!tracks.length && questionInput}
        </div>
        {!!tracks.length && nav}
      </section>
    );
  }
}

MultiTrackConfirm.propTypes = {
  details: PropTypes.array,
  currentTrack: PropTypes.number,
  error: PropTypes.object,
  loading: PropTypes.bool,
  questionId: PropTypes.number.isRequired,
  surveyId: PropTypes.string.isRequired,
  ratings: PropTypes.object,
  onChange: PropTypes.func,
  incrementCurrentTrack: PropTypes.func,
  decrementCurrentTrack: PropTypes.func,
  finishSurvey: PropTypes.func,
  canUndoRating: PropTypes.bool,
  question: PropTypes.shape({
    scale: PropTypes.number,
  }),
};

MultiTrackConfirm.defaultProps = {
  details: [],
};

export default connect(null, {
  incrementCurrentTrack: QuestionActions.incrementTrackRatingTrack,
  decrementCurrentTrack: QuestionActions.decrementTrackRatingTrack,
  finishSurvey: SurveyActions.finishSurvey,
})(MultiTrackConfirm);



// WEBPACK FOOTER //
// ./src/components/questions/MultiTrackConfirm.js