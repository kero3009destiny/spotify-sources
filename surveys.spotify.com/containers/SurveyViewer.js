import * as SurveyActions from '../actions/SurveyActions';

import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import EndPage from './EndPage';
import PropTypes from 'prop-types';
import QuestionViewer from './QuestionViewer';
import StartPage from './StartPage';
import { connect } from 'react-redux';

class SurveyViewer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showStartPage: true,
    };
  }
  componentDidMount() {
    const { loadSurveyMetadata, match: { params: { surveyId } } } = this.props;
    loadSurveyMetadata(surveyId);
  }

  // TODO write a componentWillUpdate that takes surveyMeta and dispatches a load question for the first question
  componentWillUpdate(nextProps) {
    const { firstQuestionDetails, surveyMeta } = nextProps;
    const { match: { params: { surveyId } } } = this.props;

    if (firstQuestionDetails === null && surveyMeta) {
      this.props.fetchSurveyQuestionDetails(surveyId, 0);
    }
  }

  render() {
    const {
      match: { url, params: { surveyId } },
      surveyMeta: { questions, hideStartPage, showEndPage } = {},
    } = this.props;

    const modalsVisible = !hideStartPage || !!showEndPage;

    return (
      <div className="survey">
        <StartPage
          open={!hideStartPage}
          surveyId={surveyId}
          onStart={this.handle}
        />
        <EndPage open={!!showEndPage} surveyId={surveyId} />
        <Switch>
          {questions &&
            questions.length > 1 &&
            <Redirect exact from={`${url}`} to={`${url}/0`} />}
          {!modalsVisible &&
            questions &&
            questions.map((question, index) =>
              (<Route
                key={index}
                path={`${url}/${questions.length === 1 ? '' : index}`}
                render={() =>
                  (<QuestionViewer
                    surveyId={surveyId}
                    questionId={index}
                    question={question}
                  />)}
              />)
            )}
        </Switch>
      </div>
    );
  }
}

SurveyViewer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      surveyId: PropTypes.string.isRequired,
    }),
    url: PropTypes.string.isRequired,
  }).isRequired,
  loadSurveyMetadata: PropTypes.func,
  fetchSurveyQuestionDetails: PropTypes.func,
  surveyMeta: PropTypes.object,
};

function mapStateToProps(state, props) {
  const { match: { params: { surveyId } } } = props;
  const questionDetails = state.surveyQuestionDetails[surveyId];

  return {
    surveyMeta: state.surveyMeta[surveyId],
    firstQuestionDetails: questionDetails && questionDetails.length
      ? questionDetails[0]
      : null,
  };
}

export default connect(mapStateToProps, {
  loadSurveyMetadata: SurveyActions.fetchSurveyMetadata,
  fetchSurveyQuestionDetails: SurveyActions.fetchSurveyQuestionDetails,
})(SurveyViewer);



// WEBPACK FOOTER //
// ./src/containers/SurveyViewer.js