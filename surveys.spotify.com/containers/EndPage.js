import * as SurveyActions from '../actions/SurveyActions';

import React, { Component } from 'react';

import Button from 'react-bootstrap/lib/Button';
import PropTypes from 'prop-types';
import SplashScreenModal from '../components/SplashScreenModal';
import classNames from 'classnames';
import { connect } from 'react-redux';
import spotifyIconUrl from '../images/spotify-icon-white.svg';
import { spotifyUrl } from '../lib/urls';

const MINIMUM_RATINGS = 10;

function goToSpotify() {
  window.location.href = spotifyUrl();
}

class EndPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleResumeSurveyClick = this.handleResumeSurveyClick.bind(this);
  }

  handleResumeSurveyClick() {
    const { resumeSurvey, surveyId } = this.props;

    resumeSurvey(surveyId, 0);
  }

  renderModalContent() {
    const { ratedTracks, questionMeta } = this.props;
    const playlistUnlocked = ratedTracks.length >= MINIMUM_RATINGS;
    const copy = {};

    if (playlistUnlocked) {
      copy.title = 'You have great taste.';
      if (questionMeta.playlistUrl) {
        copy.description = (
          <span>
            Thanks for the help.
            You can find
            {' '}
            <a
              href={questionMeta.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              your new playlist
            </a>
            {' '}
            in Your Library.
          </span>
        );
      } else {
        copy.description =
          'Thanks for the help. You can find your new playlist in Your Library.';
      }
      copy.primaryButton = 'Rate more songs';
      copy.secondaryButton = 'Finish';
    } else {
      copy.title = 'Keep Going?';
      copy.description = 'To unlock a new playlist, rate some more songs.';
      copy.primaryButton = 'Rate more songs';
      copy.secondaryButton = 'I\'ll come back later';
    }

    const buttonDisabled = questionMeta.latestBatchSize <= 0;
    const primaryButtonClassNames = classNames({
      'text-black': !buttonDisabled,
      'bg-white': !buttonDisabled,
    });

    return (
      <div>
        <header>
          <img
            src={spotifyIconUrl}
            alt="Spotify Icon"
            style={{ height: '48px', width: '48px', margin: '0 auto' }}
          />
          <h2>{copy.title}</h2>
        </header>
        <article>
          <p>
            {copy.description}
          </p>
        </article>
        <div className="cta">
          <Button
            className={primaryButtonClassNames}
            onClick={this.handleResumeSurveyClick}
            disabled={buttonDisabled}
          >
            {copy.primaryButton}
          </Button>
          <Button
            className="bg-clear text-white secondary"
            onClick={goToSpotify.bind()}
          >
            {copy.secondaryButton}
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const { questionMeta, open } = this.props;

    return (
      <SplashScreenModal className="end-page" open={open}>
        {questionMeta && this.renderModalContent()}
      </SplashScreenModal> //
    );
  }
}

EndPage.propTypes = {
  auth: PropTypes.shape({
    accessToken: PropTypes.string,
    expired: PropTypes.bool,
  }).isRequired,
  resumeSurvey: PropTypes.func.isRequired,
  fetchSurveyMetadata: PropTypes.func.isRequired,
  surveyId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  surveyMeta: PropTypes.object,
  ratedTracks: PropTypes.arrayOf(PropTypes.string),
  questionMeta: PropTypes.object,
};

export default connect(
  (state, props) => {
    let questionMeta = state.surveyQuestionMeta[props.surveyId];

    // Hardcoding '0' for now given we only have one question in the survey
    questionMeta = questionMeta && questionMeta[0];

    return {
      auth: state.auth,
      surveyMeta: state.surveyMeta[props.surveyId],

      ratedTracks: questionMeta
        ? Object.keys(questionMeta.ratings).filter(
            key =>
                (questionMeta.ratings[key] !== null) &&
                ((typeof questionMeta.ratings[key] === 'number') ||
              (typeof questionMeta.ratings[key] ? questionMeta.ratings[key][0] : questionMeta.ratings[key] === 'number'))
        )
        : [],
      questionMeta,
    };
  },
  {
    resumeSurvey: SurveyActions.resumeSurvey,
    fetchSurveyMetadata: SurveyActions.fetchSurveyMetadata,
  }
)(EndPage);



// WEBPACK FOOTER //
// ./src/containers/EndPage.js