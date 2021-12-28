import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProgressBar from '../components/ProgressBar';
import pauseIcon from '../images/player/pause-alt.svg';
import playIcon from '../images/player/play-alt.svg';
import shuffleIcon from '../images/player/shuffle.svg';
import repeatIcon from '../images/player/repeat.svg';
import repeatOnceIcon from '../images/player/repeat-once.svg';

import './NowPlayingBar.less';

const REPEAT = 1;
const REPEAT_ONCE = 2;

function mapStateToProps(state) {
  return {
    ...state.playerState,
  };
}

const NowPlayingBarContainer = (props) => {
  const iconForRepeatMode = () => {
    if (props.playerState && props.playerState.repeatMode === REPEAT) {
      return <img src={repeatIcon} className="spotifyGreen" style={{width: 18, height: 18}} />;
    } else if (props.playerState && props.playerState.repeatMode === REPEAT_ONCE) {
      return <img src={repeatOnceIcon} className="spotifyGreen" style={{width: 18, height: 18}} />;
    }
    return <span>&nbsp;</span>;
  };

  const volume = () => {
    const volumeString = `Volume: ${Math.round(props.playerState.volume * 100)}%`;
    return props.playerState.volume > 0.7 ? (
      <h1><span style={{color: '#f00'}}>{volumeString}</span></h1>
    ) : <h2>{volumeString}</h2>;
  };

  return (
    <div className="nowPlayingBar">
      <div className="nowPlayingBarLeft">
        <h1>{props.playerState && props.playerState.song}<br/></h1>
        <h2>{props.playerState && props.playerState.artist}</h2>
      </div>
      <div className="nowPlayingBarMid">
        <div className="nowPlayingBarMidTop">
          <div className="playerStateIconsLeft">
            {props.playerState.shuffle ? <img src={shuffleIcon} className="spotifyGreen" style={{width: 18, height: 18}} /> : <span>&nbsp;</span>}
          </div>
          <div className="playerStateIconsMid">
            <img
              onClick={props.playerState.paused ? props.resume : props.pause}
              src={props.playerState.paused || props.playerState.song.length === 0 ? playIcon : pauseIcon}
              className="iconWhite controlsButton"
            />
          </div>
          <div className="playerStateIconsRight">
            {iconForRepeatMode()}
          </div>
        </div>
        <div className="nowPlayingBarMidBottom">
          <ProgressBar playerState={props.playerState}/>
        </div>
      </div>
      <div className="nowPlayingBarRight">
        <h1>{props.playerState.device}</h1>
        {volume()}
      </div>
    </div>
  );
};

NowPlayingBarContainer.propTypes = {
  playerState: PropTypes.object,
  pause: PropTypes.func.isRequired,
  resume: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(NowPlayingBarContainer);
