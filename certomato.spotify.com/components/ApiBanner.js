import React from 'react';
import PropTypes from 'prop-types';
import {Banner} from '@spotify-internal/creator-tape';

const ApiBanner = (props) => {
  return props.apiCallSuccessful !== null ?
    <Banner variant={props.apiCallSuccessful ? Banner.success : Banner.error} onClose={() => {props.dismissApiBanner();}}>
      {props.responseText}
    </Banner>
    : null;
};

ApiBanner.propTypes = {
  dismissApiBanner: PropTypes.func.isRequired,
  apiCallSuccessful: PropTypes.bool,
  responseText: PropTypes.string,
};

export default ApiBanner;
