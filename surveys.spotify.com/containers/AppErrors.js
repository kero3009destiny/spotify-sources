import Alert from 'react-bootstrap/lib/Alert';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { dismissError } from '../actions/AppActions';

function getErrorMessage(error) {
  return error.message || String(error);
}

function AppErrors({ error, dismissError: onDismiss }) {
  return (
    <CSSTransitionGroup
      transitionName="top-app-errors"
      transitionLeaveTimeout={500}
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionAppear
      transitionEnter
      transitionLeave
    >
      {error &&
        <div className="app-errors" key="app-errors">
          <Alert bsStyle="danger" onDismiss={onDismiss}>
            {getErrorMessage(error)}
          </Alert>
        </div>}
    </CSSTransitionGroup>
  );
}

AppErrors.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      message: PropTypes.string,
    }),
  ]),
  dismissError: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    error: state.appErrors.error,
  };
};

export default connect(mapStateToProps, {
  dismissError,
})(AppErrors);



// WEBPACK FOOTER //
// ./src/containers/AppErrors.js