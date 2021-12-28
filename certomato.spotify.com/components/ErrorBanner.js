import React from 'react';
import PropTypes from 'prop-types';
import {Backdrop, Banner, DialogConfirmation} from '@spotify-internal/creator-tape';
import { connect } from 'react-redux';
import Utils from '../utils/Utils';
import { dismissApiError } from '../redux/actions/errorsActions';

const ErrorBanner = (props) => {
  const errorStatus = () => {
    return Utils.exists(props.apiErrors.apiErrorStatus) ? (
      <div>
        Api call failed with status {props.apiErrors.apiErrorStatus}. Please refresh your browser.
        <br />
      </div>
    ) : null;
  };

  if (Utils.exists(props, props.apiErrors)) {
    if (props.apiErrors.apiErrorStatus === 401) {
      return (
        <div>
          {<Backdrop center>
            <DialogConfirmation
              style={{width: '800px'}}
              dialogTitle={'Session expired.'}
              body={'Your session has expired. Please Log out and log in again.'}
              footer={
                <button className="btn btn-primary btn-xs btnrunall" onClick={props.logout}>Log out</button>
              }
            />);
          </Backdrop>
          }
        </div>);
    }
    return (<Banner variant={Banner.error} onClose={() => {
      props.dismissApiError();
    }}>
      {errorStatus()}{props.apiErrors.apiErrorMessage}<br />{props.apiErrors.apiErrorUrl}
    </Banner>);
  }
  return null;
};

const mapStateToProps = state => ({
  ...state.apiErrors,
});


ErrorBanner.propTypes = {
  apiErrors: PropTypes.object,
  logout: PropTypes.func.isRequired,
  dismissApiError: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { dismissApiError })(ErrorBanner);
