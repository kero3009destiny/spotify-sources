import * as QuestionActions from '../actions/QuestionActions';
import * as SurveyActions from '../actions/SurveyActions';

import React, { Component } from 'react';

import Alert from 'react-bootstrap/lib/Alert';
import MultiTrackConfirm from '../components/questions/MultiTrackConfirm';
import PropTypes from 'prop-types';
import TrackRating from '../components/questions/TrackRating';
import TrackDescriptor from '../components/questions/TrackDescriptor';
import { connect } from 'react-redux';
import get from 'lodash/get';

const QUESTION_COMPONENTS = {
  track_rating: TrackRating,
  multi_track_confirm: MultiTrackConfirm,
  track_descriptor: TrackDescriptor,
};

class QuestionViewer extends Component {
  componentDidMount() {
    const {
      questionId,
      surveyId,
      fetchSurveyQuestionDetails,
      questionDetails,
    } = this.props;

    if (!questionDetails) {
      fetchSurveyQuestionDetails(surveyId, questionId);
    }
  }

  renderQuestionError() {
    const { question: { type } } = this.props;

    return (
      <Alert bsStyle="danger">
        Invalid question type: <code>{type}</code>
      </Alert>
    );
  }

  render() {
    const {
      questionId,
      surveyId,
      questionDetails,
      questionMeta,
      updateAnswer,
      ...transferredProps
    } = this.props;
    const { question: { type } } = this.props;

    const QuestionComponent = QUESTION_COMPONENTS[type];

    return (
      <div className="survey-question">
        {QuestionComponent ? (
          <QuestionComponent
            questionId={questionId}
            surveyId={surveyId}
            details={questionDetails}
            onChange={updateAnswer}
            {...questionMeta}
            {...transferredProps}
          />
        ) : (
          this.renderQuestionError()
        )}
      </div>
    );
  }
}

QuestionViewer.propTypes = {
  question: PropTypes.object,
  questionId: PropTypes.number,
  surveyId: PropTypes.string,
  fetchSurveyQuestionDetails: PropTypes.func,
  updateAnswer: PropTypes.func,
  questionDetails: PropTypes.any,
  questionMeta: PropTypes.object,
};

function mapStateToProps(state, { questionId, surveyId }) {
  return {
    questionDetails: get(state.surveyQuestionDetails, [surveyId, questionId]),
    questionMeta: get(state.surveyQuestionMeta, [surveyId, questionId]),
  };
}

export default connect(mapStateToProps, {
  fetchSurveyQuestionDetails: SurveyActions.fetchSurveyQuestionDetails,
  updateAnswer: QuestionActions.updateAnswer,
})(QuestionViewer);



// WEBPACK FOOTER //
// ./src/containers/QuestionViewer.js