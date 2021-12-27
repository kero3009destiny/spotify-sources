import * as QuestionActions from '../../actions/QuestionActions';
import * as SurveyActions from '../../actions/SurveyActions';

import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';

import PropTypes from 'prop-types';
import SingleDescriptorTrackRatingInput
  from '../SingleDescriptorTrackRatingInput';
import YesNoDescriptorButtonBar from '../YesNoDescriptorButtonBar';
import {connect} from 'react-redux';
import iconUrl from '../../images/spotify-icon-white.svg';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

class TrackDescriptor extends Component {
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

  handleRatingChange(surveyId, questionId, trackUri, descriptor, { rating }) {
    const { onChange, question } = this.props;

    onChange(surveyId, questionId, question.type, {
      [trackUri]: [rating, descriptor],
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
      currentTrack, // Where is this coming from its undefined
      ratings, // Where is this coming from its undefined
      surveyId,
      questionId,
      loading,
    } = this.props;
    const { previewPlaying } = this.state;
    const track = tracks[currentTrack] || {};

    if (track === null) {
      return <noscript />;
    }

    const rating = ratings[track.uri];

    const descriptorItem = track && track.descriptors;
    const descriptor = (descriptorItem && descriptorItem.text) || '';
    const startQuestion = 'Does ';
    const endQuestion = ' describe this track?';

    const inputField = (
      <div>
        <h4 style={{ margin: '20px', display: 'inline-block' }}>{startQuestion} <strong>{descriptor}</strong> {endQuestion}
        <div className="back-btn-wrapper btn-group">
          <OverlayTrigger
              key={'backButton'}
              placement={'top'}
              overlay={
                <Tooltip id={'tooltip-top'}>
                  Go to previous question
                </Tooltip>
              }
          >
            <Button
              onClick={this.handleRetractTrack}
              disabled={loading}
              className={'btn-xs'}
            >
              <svg className="bi bi-arrow-left" width="1.5em" height="1.5em"
                   viewBox="0 0 20 20" fill="currentColor"
                   xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                      d="M7.854 6.646a.5.5 0 010 .708L5.207 10l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
                      clipRule="evenodd"/>
                <path fillRule="evenodd"
                      d="M4.5 10a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z"
                      clipRule="evenodd"/>
              </svg>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
              key={'skipTrackButton'}
              placement={'top'}
              overlay={
                <Tooltip id={'tooltip-top'}>
                  Skip this track
                </Tooltip>
              }
          >
            <Button
                onClick={this.handleSkipTrack}
                disabled={loading}
                className={'btn-xs'}
            >
              <svg className="bi bi-skip-forward" width="1.5em" height="1.5em"
                   viewBox="0 0 20 20" fill="currentColor"
                   xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                      d="M17.5 5.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-3.248l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C2.713 14.69 2 14.345 2 13.692V6.308c0-.653.713-.998 1.233-.696L9.5 9.248v-2.94c0-.653.713-.998 1.233-.696L17 9.248V6a.5.5 0 01.5-.5zM3 6.633v6.734L8.804 10 3 6.633zm7.5 0v6.734L16.304 10 10.5 6.633z"
                      clipRule="evenodd"/>
              </svg>
            </Button>
          </OverlayTrigger>
        </div>
        </h4>
        <YesNoDescriptorButtonBar
          onChange={this.handleRatingChange.bind(
            this,
            surveyId,
            questionId,
            track.uri,
            descriptor
          )
        }
          loading={loading}
          value= {rating}
        />
      </div>
    );

    const questionInput = (
      <SingleDescriptorTrackRatingInput
        track={track}
        rating={rating}
        playing={previewPlaying}
        onPlayingChange={this.handlePlayingChange}
        inputField={inputField}
      />
    );

    const nav = (
      <nav>
        <ul className="list-unstyled">
          <li />
          <li className="text-center">
            {currentTrack + 1} / {tracks.length}
          </li>
          <li className="ProgressBar">
            <progress
              value={((currentTrack + 1) / (tracks.length) * 100).toString()}
              max={'100'}>
              (tracks.length) / (currentTrack + 1) %</progress>
          </li>
        </ul>
      </nav>
    );

    return (
      <section className="question question--track-descriptor">
        <header className="question__header">
          <div className="question__header-icon">
            <img alt="Spotify icon" src={iconUrl} />
          </div>
          <div className="question__actions">
            <ul>
              <li>
                <button onClick={this.handleFinishSurvey.bind(this, surveyId)}>
                  Finish
                </button>
              </li>
            </ul>
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

TrackDescriptor.propTypes = {
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

TrackDescriptor.defaultProps = {
  details: [],
};

export default connect(null, {
  incrementCurrentTrack: QuestionActions.incrementTrackRatingTrack,
  decrementCurrentTrack: QuestionActions.decrementTrackRatingTrack,
  finishSurvey: SurveyActions.finishSurvey,
})(TrackDescriptor);



// WEBPACK FOOTER //
// ./src/components/questions/TrackDescriptor.js