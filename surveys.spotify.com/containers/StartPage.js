import * as SurveyActions from '../actions/SurveyActions';

import React, { Component } from 'react';

import Button from 'react-bootstrap/lib/Button';
import PropTypes from 'prop-types';
import SplashScreenModal from '../components/SplashScreenModal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const ContentComponents = [

  // Example survey for future usage
  // {
  //   test: /^example-survey.*/,
  //   isActive: () => true,
  //   title: () => <h2>Tell us about your music taste!</h2>,
  //   component() {
  //     return (
  //         <p>
  //           Help us tune the algorithms to identify content to exclude
  //           from recommendations.
  //         </p>
  //     );
  //   },
  //   // eslint-disable-next-line
  //   footer({ buttonLabel }) {
  //     return (
  //         <div>
  //             By clicking "{buttonLabel}", you are agreeing to our{' '}
  //             <a
  //                 href="https://www.spotify.com/legal/end-user-agreement/"
  //                 rel="noopener noreferrer"
  //                 target="_blank"
  //             >
  //                 Terms of Service
  //             </a>
  //             . You must be 18 years old to participate.
  //         </div>
  //     );
  //   },
  // },

  // Affinity survey -- DEPRECATED
  {
    isActive: () => true,
    test: /^track-descriptor.*/,
    title: () => <h2>Annotate Track Descriptors.</h2>,
    component() {
      return (
        <p>
          Help us tune the algorithms to describe music.
        </p>
      );
    },
  },

  {
    test: () => true,
    isActive: () => false,
    title: () => <h2>Thank you!</h2>,

    component() {
      return (
        <p>
          Thank you for helping us improve our recommendations!
          <br/>
          We are unfortunately no longer supporting this survey, but may issue other surveys to our users in the future.
        </p>
      );
    },
  },
];

class StartPage extends Component {
  componentDidMount() {
    const { fetchSurveyMetadata, surveyId } = this.props;
    fetchSurveyMetadata(surveyId);
  }

  get loggedIn() {
    const { auth } = this.props;
    return !!(auth.accessToken && !auth.expired);
  }

  render() {
    const {
      startSurvey,
      surveyId,
      surveyMeta,
      open,
      firstQuestionDetails,
    } = this.props;

    const buttonLabel = this.loggedIn ? 'Start' : 'Log in';

    const buttonProps = {
      children: this.loggedIn ? 'Start' : 'Log in',
      disabled: this.loggedIn ? !(surveyMeta || firstQuestionDetails) : false,
    };

    const contentComponent = ContentComponents.filter(
      c =>
        typeof c.test === 'function'
          ? c.test.call(undefined, this.props)
          : c.test.test(surveyId)
    )[0];
    const footer =
      contentComponent && contentComponent.footer ? (
        <contentComponent.footer buttonLabel={buttonLabel} />
      ) : null;

    return (
      <SplashScreenModal open={open} className="start-page" footer={footer}>
        <header>
          <div className="logo">&nbsp;</div>
          <contentComponent.title />
        </header>
        <article>
          <contentComponent.component />
        </article>
        {contentComponent.isActive() &&
        <div className="cta">
          <Button
              className="bg-white text-black"
              onClick={() => startSurvey(surveyId)}
              {...buttonProps}
          />
        </div>
        }
      </SplashScreenModal>
    );
  }
}

StartPage.propTypes = {
  auth: PropTypes.shape({
    accessToken: PropTypes.string,
    expired: PropTypes.bool,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  startSurvey: PropTypes.func.isRequired,
  fetchSurveyMetadata: PropTypes.func.isRequired,
  surveyId: PropTypes.string.isRequired,
  surveyMeta: PropTypes.object,
  firstQuestionDetails: PropTypes.any,
  open: PropTypes.bool.isRequired,
};

export default withRouter(
  connect(
    (state, props) => {
      const questionDetails = state.surveyQuestionDetails[props.surveyId];
      return {
        auth: state.auth,
        surveyMeta: state.surveyMeta[props.surveyId],
        firstQuestionDetails:
          questionDetails && questionDetails.length ? questionDetails[0] : null,
      };
    },
    {
      startSurvey: SurveyActions.startSurvey,
      fetchSurveyMetadata: SurveyActions.fetchSurveyMetadata,
    }
  )(StartPage)
);



// WEBPACK FOOTER //
// ./src/containers/StartPage.js