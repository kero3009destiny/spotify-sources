import React, { useEffect } from "react";
import { connect } from "react-redux";
import Sound from "react-sound";
import styled from "styled-components";
import PauseIcon from "../../../../static/images/icons/pause-black.svg";
import PlayIcon from "../../../../static/images/icons/play-black.svg";

import {
  setGlobalTrackPlaying,
  setGlobalTrackStopped,
  setGlobalTrackPaused
} from "../../../actions/globalTrackActions";

const StyledPositionWrapper = styled.div`
  display: flex;
`;

const StyledIconWrapper = styled.div`
  img {
    height: 42px;
    width: 42px;
    margin-right: 14px;
  }
`;

const StyledTextWrapper = styled.div``;

interface ISlideAudioPlayerProps {
  artistName: string;
  trackName: string;
  trackStatus: "STOPPED" | "PLAYING";
  trackURL: string;
  voiceOverPlaying: boolean;
  setGlobalTrackPlaying: () => void;
  setGlobalTrackStopped: () => void;
  setGlobalTrackPaused: () => void;
}

const SlideAudioPlayer = (props: ISlideAudioPlayerProps) => {
  const { trackStatus } = props;
  useEffect(() => {
    return () => {
      props.setGlobalTrackStopped();
    };
  }, []);

  const handleClick = () => {
    if (trackStatus === "PLAYING") {
      props.setGlobalTrackPaused();
    } else {
      props.setGlobalTrackPlaying();
    }
  };

  return (
    <StyledPositionWrapper>
      <StyledIconWrapper onClick={handleClick}>
        <img src={trackStatus === "PLAYING" ? PauseIcon : PlayIcon} />
      </StyledIconWrapper>
      <StyledTextWrapper>
        {props.artistName}
        <br />
        {props.trackName}
      </StyledTextWrapper>

      <Sound
        url={props.trackURL}
        playStatus={trackStatus}
        volume={50}
        onFinishedPlaying={props.setGlobalTrackStopped}
      />
    </StyledPositionWrapper>
  );
};

const mapStateToProps = (state: any) => {
  return {
    trackStatus: state.globalTrack.status,
    trackURL: state.globalTrack.url,
    voiceOverPlaying: state.globalVoiceOver.status !== "STOPPED"
  };
};

export default connect(
  mapStateToProps,
  { setGlobalTrackPlaying, setGlobalTrackStopped, setGlobalTrackPaused }
)(SlideAudioPlayer);
