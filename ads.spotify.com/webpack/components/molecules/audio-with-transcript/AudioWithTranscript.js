import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'i18n/nexti18n';
import get from 'lodash/get';
import debounce from 'lodash/debounce';

import {
  eventTrack,
  AUDIO_TRANSCRIPT_PLAY_PAUSE,
  AUDIO_TRANSCRIPT_COMPLETE,
  AUDIO_TRANSCRIPT_PROGRESS,
} from 'utils/google-tag-manager';
import { useAppContext } from 'contexts/app-context';
import { getLinkProps } from 'utils/get-link-props';
import { useComponentSize } from 'utils/use-component-size';
import { breakpointSelect } from 'styles/media-queries';
import { colors } from 'styles/variables';
import { LANG_MAP } from 'constants/auth';

import * as Styled from './AudioWithTranscript.styled';

const RESIZE_DEBOUNCE_DELAY = 250;
const PROGRESS_WAY_POINTS = [0, 25, 50, 75, 100];

/**
 * Removes scripts from text
 * @param {string} text - The text to remove scripts from
 * @returns {string}
 */
const removeScripts = (text = '') =>
  text.replace(/<script>([^<]+)?<\/script>/g, '');

/**
 * Caption
 * @param {string} text - the caption text
 * @param {number} outerHeight - The wrapper height
 * @param {function} onLayout - The layout change listener
 * @returns {ReactElement}
 */
const Caption = ({ text, outerHeight, onLayout = () => {} }) => {
  const captionRef = useRef(null);
  const { height } = useComponentSize(captionRef);

  useEffect(() => {
    if (height !== 0 && typeof height === 'number') {
      onLayout(height);
    }
  }, [height]);

  return (
    <Styled.Caption outerHeight={outerHeight}>
      {/* eslint-disable react/no-danger */}
      <pre
        ref={captionRef}
        dangerouslySetInnerHTML={{
          __html: removeScripts(text),
        }}
      />
    </Styled.Caption>
  );
};

const INITIAL_Y = Styled.CAPTIONS_BOX_SIZE / 2;

/**
 * AudioWithTranscript
 * @param {string|null} className - The component class name.
 * @param {string} eyebrow - The component eyebrow
 * @param {string} title - The component title
 * @param {string} description - The component description
 * @param {object} audio - The component audio
 * @param {object} transcript - The component transcript
 * @param {object} cta - The component cta
 * @param {string} background - The component background
 * @param {string} textColor - The component text color
 * @param {string} headlineColor - The headline color
 * @returns {ReactElement}
 */
const AudioWithTranscript = ({
  className = null,
  eyebrow,
  title,
  description,
  audio,
  transcript,
  cta,
  backgroundColor = colors.white,
  textColor = colors.black,
  headlineColor = colors.black,
}) => {
  const [{ locale }] = useAppContext();
  const lang = useMemo(
    () => (LANG_MAP[locale] || LANG_MAP.default).substring(0, 2),
    [locale],
  );
  const { t } = useTranslation();
  const audioRef = useRef(null);
  const trackRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [biggerCaptionHeight, setBiggerCaptionHeight] = useState(-Infinity);
  const [captionMargin, setCaptionMargin] = useState(0);
  const [captions, setCaptions] = useState([]);
  const [currentCaption, setCurrentCaption] = useState(0);
  const [progress, setProgress] = useState(0);
  const setRef = useRef(new Set());
  const onButtonClick = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(prevIsPlaying => !prevIsPlaying);

    eventTrack(AUDIO_TRANSCRIPT_PLAY_PAUSE, {
      audio,
      isPlaying: !isPlaying,
      progress: `${progress}%`,
    });
  }, [audioRef.current, isPlaying, progress]);
  const checkTrackCues = useCallback(() => {
    if (!trackRef.current || !get(trackRef, 'current.track.cues.length'))
      return;

    setCaptions(() => Array.from(get(trackRef, 'current.track.cues', [])));
  }, [trackRef]);
  const onAudioEnded = useCallback(() => {
    setIsPlaying(false);

    eventTrack(AUDIO_TRANSCRIPT_COMPLETE, {
      audio,
      title,
    });
  }, []);

  const onTimeUpdate = useCallback(() => {
    if (!audioRef.current) return;

    const { currentTime, duration } = audioRef.current;
    const progressFromRef = (currentTime / duration) * 100;
    const progressRounded = Math.floor(progressFromRef);

    setProgress(progressRounded);

    if (
      isPlaying &&
      PROGRESS_WAY_POINTS.includes(progressRounded) &&
      !setRef.current.has(progressRounded)
    ) {
      setRef.current.add(progressRounded);
      eventTrack(AUDIO_TRANSCRIPT_PROGRESS, {
        audio,
        title,
        progress: `${progressRounded}%`,
      });
    }
  }, [audioRef.current, isPlaying]);

  useEffect(() => {
    const onResize = debounce(() => {
      setCaptionMargin(breakpointSelect({ sm: 24, lg: 32 }));
    }, RESIZE_DEBOUNCE_DELAY);

    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      onResize.cancel();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (!trackRef.current) return undefined;

    const onCueChange = () => {
      const index = captions.findIndex(
        item =>
          item.startTime ===
          get(trackRef, 'current.track.activeCues[0].startTime'),
      );

      if (index !== -1) {
        setCurrentCaption(index);
      }
    };

    trackRef.current.addEventListener('cuechange', onCueChange);

    return () => {
      trackRef.current.removeEventListener('cuechange', onCueChange);
    };
  }, [trackRef.current, captions]);

  useEffect(() => {
    checkTrackCues();
  }, [trackRef, trackRef.current, get(trackRef, 'current.track.cues.length')]);

  return (
    <Styled.Root className={className} backgroundColor={backgroundColor}>
      <Styled.Wrapper>
        <Styled.Container tabIndex={0}>
          {eyebrow && (
            <Styled.Eyebrow textColor={textColor}>{eyebrow}</Styled.Eyebrow>
          )}
          {title && (
            <Styled.Title textColor={headlineColor}>{title}</Styled.Title>
          )}
          {description && (
            <Styled.Description textColor={textColor}>
              {description}
            </Styled.Description>
          )}
          <Styled.PlayButton onClick={onButtonClick} textColor={textColor}>
            <Styled.PlayButtonContainer>
              <Styled.AudioEqualizer
                isPlaying={isPlaying}
                barColor={textColor}
              />
              <Styled.PlayingText>
                {isPlaying ? t('pauseAudio') : t('playAudio')}
              </Styled.PlayingText>
            </Styled.PlayButtonContainer>
          </Styled.PlayButton>
          <Styled.Audio
            ref={audioRef}
            crossOrigin="anonymous"
            onLoadedMetadata={checkTrackCues}
            preload="metadata"
            onEnded={onAudioEnded}
            onTimeUpdate={onTimeUpdate}
          >
            <source src={get(audio, 'url')} type={get(audio, 'contentType')} />
            <track
              ref={trackRef}
              kind="subtitles"
              label="Transcript"
              src={get(transcript, 'url')}
              srcLang={lang}
              default
            />
            Your browser does not support the audio tag.
          </Styled.Audio>
          <Styled.CaptionsWrapper
            hasCaptions={!!captions.length}
            backgroundColor={backgroundColor}
          >
            <Styled.Captions
              translateY={
                INITIAL_Y -
                biggerCaptionHeight / 2 +
                (biggerCaptionHeight + captionMargin) * -currentCaption
              }
              textColor={textColor}
            >
              {captions.map((caption, index) => (
                <Caption
                  key={`caption-${caption.startTime}`}
                  text={caption.text}
                  index={index}
                  currentCaption={currentCaption}
                  onLayout={height => {
                    setBiggerCaptionHeight(prevHeight =>
                      Math.max(prevHeight, height),
                    );
                  }}
                  outerHeight={biggerCaptionHeight}
                />
              ))}
            </Styled.Captions>
          </Styled.CaptionsWrapper>
          {cta && (
            <Styled.Cta
              {...getLinkProps(cta.url)}
              type={cta.type}
              overrideFunctionality={cta.overrideFunctionality}
              textColor={textColor}
            >
              {cta.title}
            </Styled.Cta>
          )}
        </Styled.Container>
      </Styled.Wrapper>
    </Styled.Root>
  );
};

AudioWithTranscript.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * The component eyebrow
   */
  eyebrow: PropTypes.string,
  /**
   * The component title
   */
  title: PropTypes.string,
  /**
   * The component description
   */
  description: PropTypes.string,
  /**
   * TThe component audio
   */
  audio: PropTypes.shape({ url: PropTypes.string }),
  /**
   * The component transcript
   */
  transcript: PropTypes.shape({ url: PropTypes.string }),
  /**
   * The component cta
   */
  cta: PropTypes.shape({ url: PropTypes.string }),
  /**
   * The component background
   */
  background: PropTypes.string,
  /**
   * The component text color
   */
  textColor: PropTypes.string,
  /**
   * The headline color
   */
  headlineColor: PropTypes.string,
};

export default AudioWithTranscript;
