import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Slide from '../03_organisms/slide';
import ProgressIndicator from '../02_molecules/progressCircle';
import Throbber from '../../common/01_atoms/throbber';

import {
  setGlobalTrackUrl,
  setGlobalTrackPlaying,
  setGlobalTrackStopped,
  setGlobalTrackVolume,
  setGlobalTrackDuration
} from '../../../actions/globalTrackActions';

import {
  setGlobalVoiceOverPlaying,
  setGlobalVoiceOverStopped,
  setGlobalVoiceOverUrl,
  setGlobalVoiceOverVolume,
  setGlobalVoiceOverDuration
} from '../../../actions/globalVoiceOverActions';

const StyledProgressIndicator = styled.div`
  position: fixed;
  z-index: 100;
  bottom: 80px;
  right: 10px;
  @media screen and (max-width: 1024px) {
    bottom: 10px;
  }
`;

const StyledSkipButton = styled.button`
  background: var(--color-DARKNESS);
  border-radius: 50%;
  right: 10px;
  bottom: 160px;
  width: 40px;
  height: 40px;
  color: var(--color-SNOW);
  font-weight: bold;
  text-transform: uppercase;
  position: fixed;
  z-index: 100;
  @media screen and (max-width: 1024px) {
    bottom: 80px;
  }
`;

interface IModuleProps {
  currentModule: any;
  onModuleComplete: any;
  spotifyAccessToken: string;
  isAudioPlaying: boolean;
  globalVoiceOver: {
    duration: number;
    status: 'PLAYING' | 'STOPPED' | 'PAUSED';
    volume: number;
    url: string;
  };
  setAdminBarShown: (isShown: boolean) => void;
  setLessonBarShown: (isShown: boolean) => void;
  updateGlobalTrackURL: (trackURL: string) => void;
  setTrackPlaying: () => void;
  setTrackStopped: () => void;
  updateGlobalVOURL: (voURL: string) => void;
  setVOPlaying: () => void;
  setVOStopped: () => void;
  setTrackVolume: (volumeInteger: number) => void;
  setVOVolume: (volumeInteger: number) => void;
  setTrackDuration: (duration: number) => void;
  setVODuration: (duration: number | null) => void;
}

const Module = (props: IModuleProps) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isSlideDone, setSlideDone] = useState<boolean>(false);
  const [isLastSlide, setLastSlide] = useState<boolean>(false);
  const [isProgressIndicatorShown, setProgressIndicatorShown] = useState<boolean>(false);
  const [isSlideError, setSlideError] = useState<boolean>(false);
  const [isFallbackLoading, setFallbackLoading] = useState<boolean>(true);
  const [fallbackSlide, setFallbackSlide] = useState<any>(null);
  const [skipFallbackSlide, setSkipFallbackSlide] = useState<boolean>(false);

  // These are intentionally not tracking via useState because we want them to be always linked to currentModule
  const nextSlide = props.currentModule.slides[currentSlideIndex + 1];
  const currentSlide = props.currentModule.slides[currentSlideIndex];

  useEffect(() => {
    // Reset global state for track/vo
    props.setVOVolume(0);
    props.setTrackVolume(0);
    props.updateGlobalTrackURL('');
    props.updateGlobalVOURL('');
    props.setTrackDuration(0);
    props.setVODuration(null);

    // Reset slide done state
    setSlideDone(false);
    setSlideError(false);

    // Update our global track if the trackID exists
    // Signal for cancelling asynchronous fetch requests
    const trackController = new AbortController();
    const trackSignal = trackController.signal;
    if (currentSlide.fields.trackID !== null) {
      fetch(`https://api.spotify.com/v1/tracks/${currentSlide.fields.trackID}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${props.spotifyAccessToken}`
        },
        signal: trackSignal
      })
        .then(res => res.json())
        .then(trackData => {
          if (trackData.preview_url) {
            props.updateGlobalTrackURL(trackData.preview_url);
          }
        })
        .catch(err => console.log(err));
    }

    const fallbackController = new AbortController();
    const fallbackSignal = fallbackController.signal;
    if (currentSlide.fields.fallbackSlideID !== null) {
      setFallbackLoading(true);
      fetch(`/api/slide/${currentSlide.fields.fallbackSlideID}`, {
        signal: fallbackSignal
      })
        .then(res => res.json())
        .then(data => {
          setFallbackSlide(data);
          setFallbackLoading(false);
        })
        .catch(() => {
          // If there's an error, we want to just skip the fallback slide if it kicks in
          setSkipFallbackSlide(true);
          setFallbackLoading(false);
        });
    }

    // If the current slide type is a spotify integration slide and doesn't have a fallback, we want to skip on error
    if (currentSlide.type === 'slide_spotify' && currentSlide.fields.fallbackSlideID === null) {
      setSkipFallbackSlide(true);
    }

    // Update the global voice over if it exists
    if (currentSlide.fields.voiceOver !== null) {
      props.updateGlobalVOURL(currentSlide.fields.voiceOver.fields.file.url);
      props.setVOVolume(50);
      props.setVOPlaying();
    }

    if (currentSlide.fields.trackID !== null) {
      props.setTrackPlaying();
      props.setTrackVolume(50);
    }

    // Reduce the track audio if both vo and track exist
    if (currentSlide.fields.voiceOver !== null && currentSlide.fields.trackID !== null) {
      props.setTrackVolume(5);
      props.setVOVolume(50);
    }

    // Special slide specific logic
    switch (currentSlide.type) {
      case 'slide_text':
      case 'slide_split_layout':
        props.setAdminBarShown(true);
        props.setLessonBarShown(true);
        setProgressIndicatorShown(true);
        break;
      // These types don't get timed out at all
      case 'slide_video':
        props.setAdminBarShown(false);
        props.setLessonBarShown(false);
        setProgressIndicatorShown(false);
        break;
      case 'slide_quiz':
        setProgressIndicatorShown(false);
        break;
      default:
        setProgressIndicatorShown(true);
        break;
    }

    // If our next slide is "undefined" it means we're on the last one, update state
    if (nextSlide === undefined) {
      setLastSlide(true);
      setProgressIndicatorShown(false);
    }

    // Cleanup
    return () => {
      fallbackController.abort();
      trackController.abort();
      // Reset global state for track/vo
      props.setVOVolume(0);
      props.setTrackVolume(0);
      props.updateGlobalTrackURL('');
      props.updateGlobalVOURL('');
      props.setTrackDuration(0);
      props.setVODuration(null);
    };
  }, [currentSlideIndex]);

  useEffect(() => {
    let slideTimeout: any;
    const setTimeoutSlideTypeBlacklist = ['slide_video', 'slide_quiz', 'slide_roulette'];
    if (setTimeoutSlideTypeBlacklist.indexOf(currentSlide.type) === -1) {
      if (currentSlide.fields.voiceOver === null) {
        slideTimeout = setTimeout(() => setSlideDone(true), 3000);
      } else if (props.globalVoiceOver.duration !== null) {
        slideTimeout = setTimeout(() => setSlideDone(true), props.globalVoiceOver.duration + 1000);
      }
    }
    return () => clearTimeout(slideTimeout);
  }, [currentSlideIndex, props.globalVoiceOver.duration]);

  useEffect(() => {
    // We want to show the progress indicator (in case it's gone) at the end of a slide (if it's not the last slide)
    const clickToProgressBlacklist = ['slide_quiz'];
    if (isSlideDone && !isLastSlide) {
      if (
        currentSlide.fields.clickToProgress &&
        clickToProgressBlacklist.indexOf(currentSlide.type) === -1
      ) {
        setProgressIndicatorShown(true);
      } else {
        handleNextSlide();
      }
    }
    // For completing a module if we're on the last slide and that last slide is finished
    if (isLastSlide && isSlideDone) {
      props.onModuleComplete();
    }
    // If we're on the last slide, set the progress indicator as not shown
    if (isLastSlide) {
      setProgressIndicatorShown(false);
    }
    if (isSlideDone) {
      // Stop our VO
      props.setVOStopped();
    }
  }, [isLastSlide, isSlideDone]);

  useEffect(() => {
    if (!isFallbackLoading && isSlideError && fallbackSlide !== null) {
      // Update the global voice over if it exists
      if (fallbackSlide.fields.voiceOver !== null) {
        props.updateGlobalVOURL(fallbackSlide.fields.voiceOver.fields.file.url);
        props.setVOVolume(50);
        props.setVOPlaying();
      }
    }
  }, [isSlideError, isFallbackLoading, fallbackSlide]);

  // Function for going to the next slide
  const handleNextSlide = () => {
    if (isSlideDone) {
      props.setTrackStopped();
      props.setVOStopped();
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  // Function for handling a slide erroring out
  const handleSlideError = () => {
    // First reset our VO just in case our fallback has VO
    props.updateGlobalVOURL('');
    props.setVOStopped();
    // Set our module to know our slide errored
    setSlideError(true);
    // If the fallback is null, and the fallback isn't loading, then we'll just skip the slide
    if (fallbackSlide === null && !isFallbackLoading) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  // Function for determining of we should render the skip button
  const renderSkipButton = () => {
    const hostBlacklist = ['spotifysoundcheck.com'];
    if (hostBlacklist.indexOf(location.host) === -1) {
      if (!isLastSlide) {
        return true;
      }
    }
    return false;
  };

  return (
    <Fragment>
      {!isSlideError && (
        <Slide
          key={currentSlideIndex}
          slide={currentSlide}
          onSlideEnd={() => setSlideDone(true)}
          onSlideError={() => (skipFallbackSlide ? handleNextSlide() : handleSlideError())}
          slideTime={currentSlide.fields.voiceOver !== null ? 5000 : props.globalVoiceOver.duration}
        />
      )}
      {isSlideError && !isFallbackLoading && (
        <Slide
          key={currentSlide.fields.fallbackSlideID}
          slide={fallbackSlide}
          onSlideEnd={() => setSlideDone(true)}
          slideTime={currentSlide.fields.voiceOver !== null ? 5000 : props.globalVoiceOver.duration}
        />
      )}
      {isSlideError && isFallbackLoading && <Throbber />}
      {isProgressIndicatorShown && (
        <StyledProgressIndicator>
          <ProgressIndicator
            isClickToContinue={isSlideDone && !currentSlide.clickToProgress}
            isAudioPlaying={props.isAudioPlaying}
            onClick={() => handleNextSlide()}
          />
        </StyledProgressIndicator>
      )}
      {renderSkipButton() && (
        <StyledSkipButton onClick={() => setCurrentSlideIndex(currentSlideIndex + 1)}>
          Skip
        </StyledSkipButton>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  spotifyAccessToken: state.user.access_token,
  isAudioPlaying:
    state.globalTrack.status === 'PLAYING' || state.globalVoiceOver.status === 'PLAYING',
  globalVoiceOver: state.globalVoiceOver
});

const mapDispatchToProps = (dispatch: any) => ({
  updateGlobalTrackURL: (trackURL: string) => dispatch(setGlobalTrackUrl(trackURL)),
  updateGlobalVOURL: (voURL: string) => dispatch(setGlobalVoiceOverUrl(voURL)),
  setTrackPlaying: () => dispatch(setGlobalTrackPlaying()),
  setVOPlaying: () => dispatch(setGlobalVoiceOverPlaying()),
  setTrackStopped: () => dispatch(setGlobalTrackStopped()),
  setVOStopped: () => dispatch(setGlobalVoiceOverStopped()),
  setTrackVolume: (volumeInteger: number) => dispatch(setGlobalTrackVolume(volumeInteger)),
  setVOVolume: (volumeInteger: number) => dispatch(setGlobalVoiceOverVolume(volumeInteger)),
  setTrackDuration: (duration: number) => dispatch(setGlobalTrackDuration(duration)),
  setVODuration: (duration: number | null) => dispatch(setGlobalVoiceOverDuration(duration))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Module);
