import * as AppActions from '../actions/AppActions';

import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AppErrors from './AppErrors';
import OAuthCallbackHandler from '../containers/OAuthCallbackHandler';
import PropTypes from 'prop-types';
import { ConnectedRouter as Router } from 'react-router-redux';
import SurveyViewer from '../containers/SurveyViewer';
import { connect } from 'react-redux';
import createHistory from '../lib/createHistory';

const DEFAULT_SURVEY_ID = 'affinity';

class App extends Component {
  render() {
    const { onAuthError, onAuthorized } = this.props;

    return (
      <div className="App">
        <AppErrors />
        <Router history={createHistory()}>
          <Switch>
            <Route
              path="/oauth/callback"
              render={match =>
                (<OAuthCallbackHandler
                  match={match}
                  onAuthError={onAuthError}
                  onAuthorized={onAuthorized}
                />)}
            />
            <Route path="/:surveyId" component={SurveyViewer} />
            <Redirect exact from="/" to={`/${DEFAULT_SURVEY_ID}`} />
          </Switch>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  onAuthError: PropTypes.func.isRequired,
  onAuthorized: PropTypes.func.isRequired,
};

export default connect(null, {
  onAuthError: AppActions.oauthTokenAquireError,
  onAuthorized: AppActions.oauthTokenAcquired,
})(App);



// WEBPACK FOOTER //
// ./src/containers/App.js