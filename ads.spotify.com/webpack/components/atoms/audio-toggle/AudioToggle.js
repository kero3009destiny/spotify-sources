import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
import { useTranslation } from 'i18n/nexti18n';

import AudioOffSVG from 'assets/svg/audio-off.svg';
import AudioOnSVG from 'assets/svg/audio-on.svg';

import * as Styled from './AudioToggle.styled';

/**
 * AudioToggle
 * @param {string|null} className - The component class name.
 * @param {boolean} playWave - Whether wave animation should play or not
 * @param {number} repeatWave - The number of times the wave animation is going to play
 * @param {number} repeatDelay - The number of seconds before any wave animation repetition
 * @param {number} duration - The duration of the wave animation
 * @param {boolean} muted - The muted state
 * @param {Function} onClick - The onClick listener
 * @param {boolean} hideUnmuteText - Whether unmute text should hide or not
 * @returns {ReactElement}
 */
const AudioToggle = ({
  className = null,
  playWave = false,
  repeatWave = 0,
  repeatDelay = 0,
  duration = 1,
  muted = true,
  onClick,
  hideUnmuteText: hideUnmuteTextArg = false,
}) => {
  const { t } = useTranslation();
  const [hideUnmuteText, setHideUnmuteText] = useState(false);
  const waveOne = useRef(null);
  const waveTwo = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    if (!waveOne.current || !waveTwo.current || !circleRef.current)
      return undefined;

    const timeline = gsap.timeline({
      smoothChildTiming: true,
      paused: true,
    });
    const circleTween1 = gsap.fromTo(
      circleRef.current,
      { scale: 1 },
      {
        scale: 1.5,
        duration: 0.25,
        repeat: 1,
        yoyo: true,
        ease: 'bounce.easyOut',
      },
    );
    const circleTween2 = gsap.fromTo(
      circleRef.current,
      { scale: 1 },
      {
        scale: 1.4,
        duration: 0.25,
        repeat: 1,
        yoyo: true,
      },
    );
    const waveTween = gsap.fromTo(
      [waveOne.current, waveTwo.current],
      { scale: 0, opacity: 1 },
      {
        scale: 1,
        opacity: 0,
        duration,
        stagger: 0.2,
        repeat: repeatWave,
        repeatDelay,
      },
    );

    timeline.add(circleTween1);
    timeline.add(circleTween2);
    timeline.add(waveTween);

    if (playWave) {
      timeline.pause().play();
    }

    return () => {
      timeline.kill();
    };
  }, [
    waveOne,
    waveOne.current,
    waveTwo,
    waveTwo.current,
    circleRef,
    circleRef.current,
    playWave,
  ]);

  useEffect(() => {
    if (!muted || hideUnmuteTextArg) {
      setHideUnmuteText(true);
    }
  }, [muted, hideUnmuteTextArg]);

  return (
    <Styled.Root>
      <Styled.UnMuteText hideText={hideUnmuteText}>
        {t('unmuteAudio')}
      </Styled.UnMuteText>
      <Styled.Button className={className} onClick={onClick} active={!muted}>
        <Styled.Circle ref={circleRef} />
        <Styled.Wrapper>
          <Styled.Wave ref={waveOne} />
          <Styled.Wave ref={waveTwo} />
        </Styled.Wrapper>
        {muted ? <AudioOffSVG /> : <AudioOnSVG />}
      </Styled.Button>
    </Styled.Root>
  );
};

AudioToggle.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * Whether wave animation should play or not
   */
  playWave: PropTypes.bool,
  /**
   * The number of times the wave animation is going to play
   */
  repeatWave: PropTypes.number,
  /**
   * The number of seconds before any wave animation repetition
   */
  repeatDelay: PropTypes.number,
  /**
   * The duration of the wave animation
   */
  duration: PropTypes.number,
  /**
   * The muted state
   */
  muted: PropTypes.bool,
  /**
   * The onClick listener
   */
  onClick: PropTypes.func,
  /**
   * Whether unmute text should hide or not
   */
  hideUnmuteText: PropTypes.bool,
};

export default AudioToggle;
