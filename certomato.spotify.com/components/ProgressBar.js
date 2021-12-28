import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../utils/Utils';

import './ProgressBar.less';

const position = (props) => {
  if (Utils.exists(props.playerState) && props.playerState.position !== 0) {
    return Utils.formattedSongTime(props.playerState.position);
  }
  return '';
};

const duration = (props) => {
  if (Utils.exists(props.playerState) && props.playerState.duration !== 0) {
    return Utils.formattedSongTime(props.playerState.duration);
  }
  return '';
};

const percentage = (props) => {
  if (Utils.exists(props.playerState) && props.playerState.duration !== 0 && props.playerState.position !== 0) {
    return `${(props.playerState.position / props.playerState.duration) * 100}%`;
  }
  return '0%';
};

const ProgressBar = (props) => {
  return (
    <div className="progressBar">
      <div className="progressBarLeft">
        {position(props)}
      </div>
      <div className="progressBarMid">
        <div className="progressBarMidProgress" style={{ width: percentage(props)}} >
          &nbsp;
        </div>
      </div>
      <div className="progressBarRight">
        {duration(props)}
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  playerState: PropTypes.object,
};

export default ProgressBar;
