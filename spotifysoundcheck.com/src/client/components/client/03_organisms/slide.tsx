import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Media from 'react-media';
import {
  GeneralSlide,
  VideoSlide,
  QuizSlide,
  QuizSlideMobile,
  StatSlide,
  SpotifySlide,
  RouletteSlide,
  RollingTextSlide,
  AudioFeaturesSlide,
  TwoColumnSlide,
  SplitLayoutSlide
} from './slideTypes';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { updateSpotifyAccess } from '../../../actions/updateSpotifyUserAction';
import { setUserAccount } from '../../../actions/setUserAccountDetailsAction';
import { setGlobalTrackUrl, setGlobalTrackPlaying, setGlobalTrackVolume } from '../../../actions/globalTrackActions';

interface IStyledContainer {
  background: string;
}

const StyledSlideContainer = styled.div`
  position: relative;
  .slide-animation {
    background: ${(p: IStyledContainer) => p.background};
    .slide-enter {
      opacity: 0.01;
      z-index: 1;
    }
    .slide-enter-done {
      opacity: 1;
      transition: all 0.4s;
    }
    .slide-exit {
      opacity: 0.01;
      z-index: 0;
      transition: all 0.4s;
    }
    .slide-exit-active {
      opacity: 0.01;
    }
  }
`;

interface ISlideProps {
  // Needed props
  slide: any;
  activeLessonID: string;
  lessons: any;
  onSlideEnd: any;
  onSlideError: any;
  slideTime: number;
  updateTrackURL: (trackURL: string) => void;
  setTrackPlaying: () => void;
  updateTrackVolume: (volumeInteger: number) => void;
  spotifyAccessToken: string;
  lessonNumber: number;
}

const Slide = (props: ISlideProps) => {
  const palette = props.lessons.find((lesson: any) => lesson.lessonID === props.activeLessonID).fields.palette;

  const setAndPlayTrack = (trackURL: string) => {
    props.updateTrackURL(trackURL);
    // props.setTrackPlaying();
    props.updateTrackVolume(50);
  }

  const getSlide = (type: string) => {
    switch (type) {
      case 'slide_text':
        return (
          <CSSTransition timeout={400} classNames="general-item slide">
            <GeneralSlide
              spotifyAccessToken={props.spotifyAccessToken}
              slide={props.slide}
              palette={palette}
              isSlideDone={props.onSlideEnd}
            />
          </CSSTransition>
        );
      case 'slide_video':
        return (
          <CSSTransition timeout={400} classNames="video-item slide">
            <VideoSlide
              slide={props.slide}
              palette={palette}
              onVideoEnd={props.onSlideEnd}
            />
          </CSSTransition>
        );
      case 'slide_quiz':
        return (
          <CSSTransition timeout={400} classNames="quiz-item slide">
            <Media query="(min-width: 1025px)">
              {
                matches => (
                  matches
                    ? <QuizSlide
                        slide={props.slide}
                        palette={palette}
                        onSlideEnd={props.onSlideEnd}
                        lessonNumber={props.lessonNumber}
                      />
                    : <QuizSlideMobile
                        slide={props.slide}
                        palette={palette}
                        onSlideEnd={props.onSlideEnd}
                        lessonNumber={props.lessonNumber}
                      />
                )
              }
            </Media>
          </CSSTransition>
        );
      case 'slide_stats':
        return (
          <CSSTransition timeout={400} classNames="stats-item slide">
            <StatSlide
              spotifyAccessToken={props.spotifyAccessToken}
              slide={props.slide}
              palette={palette}
            />
          </CSSTransition>
        );
      case 'slide_spotify':
        return (
          <CSSTransition timeout={400} classNames="spotify-item slide">
            <SpotifySlide
              handleSetTrack={setAndPlayTrack}
              spotifyAccessToken={props.spotifyAccessToken}
              slide={props.slide}
              handleSlideError={props.onSlideError}
              palette={palette}
            />
          </CSSTransition>
        );
      case 'slide_roulette':
        return (
          <CSSTransition timeout={400} classNames="spotify-item slide">
            <RouletteSlide
              slide={props.slide}
              palette={palette}
              onSlideEnd={props.onSlideEnd}
            />
          </CSSTransition>
        );
      case 'slide_rolling':
        return (
          <CSSTransition timeout={400} classNames="spotify-item slide">
            <RollingTextSlide
              slide={props.slide}
              palette={palette}
              slideTime={props.slideTime}
              onSlideEnd={props.onSlideEnd}
            />
          </CSSTransition>
        );
      case 'slide_audio_features':
        return (
          <CSSTransition timeout={400} classNames="spotify-item slide">
            <AudioFeaturesSlide
              palette={palette}
              slide={props.slide}
              slideTime={props.slideTime}
            />
          </CSSTransition>
        );
        case 'slide_two_column':
          return (
            <CSSTransition timeout={400} classNames="spotify-item slide">
              <TwoColumnSlide
                palette={palette}
                slide={props.slide}
              />
            </CSSTransition>
          );
        case 'slide_split_layout':
          return (
            <CSSTransition timeout={400} classNames="spotify-item slide">
              <SplitLayoutSlide
                palette={palette}
                slide={props.slide}
              />
            </CSSTransition>
          );
      default:
        return (
          <CSSTransition timeout={400} classNames="no-item">
            <p>
              The type for slide {props.slide.id} is not implemented (slide type: {props.slide.type}
            </p>
          </CSSTransition>
        );
    }
  };

  return (
    <StyledSlideContainer background={palette.background}>
      <TransitionGroup className="slide-animation">{getSlide(props.slide.type)}</TransitionGroup>
    </StyledSlideContainer>
  );
};

const mapStateToProps = (state: any) => ({
  spotifyAccessToken: state.user.access_token,
  spotifyLoading: state.user.spotifyLoading,
  user: state.user,
  activeLessonID: state.activeLesson,
  lessons: state.lessons.data
});

const mapDispatchToProps = (dispatch: any) => ({
  updateSpotifyAccess: (token: string) => dispatch(updateSpotifyAccess(token)),
  setUserAccount: (token: string, cb: () => void) => dispatch(setUserAccount(token, cb)),
  updateTrackURL: (trackURL: string) => dispatch(setGlobalTrackUrl(trackURL)),
  setTrackPlaying: () => dispatch(setGlobalTrackPlaying()),
  updateTrackVolume: (volumeInteger: number) => dispatch(setGlobalTrackVolume(volumeInteger))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slide);
