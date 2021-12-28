import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import { Tween, Timeline } from 'react-gsap';
import useIsInViewport from 'utils/use-is-in-viewport/useIsInViewport';
import { visibilityThreshold } from 'styles/variables';
import { ACTIVATE_ANIMATION_CLASS } from 'styles/animations';

import { Controller, Scene } from 'components/atoms/scroll-magic';
import { getLinkProps } from 'utils/get-link-props';
import { useImageSupport } from 'utils/use-image-support';
import { useTextFit } from 'utils/use-text-fit';

import * as Styled from './AdExperiences.desktop.styled';

const FADE_Y_TRANSLATE = 50;

const AdExperiencesDesktopScene = forwardRef(
  (
    {
      introTitle: introTitleProp,
      introImage: introImageProp,
      eyebrow,
      title1,
      description1,
      title2,
      description2,
      title3,
      description3,
      ctaHelpText,
      cta,
      playVideo,
      btnWave,
      hideUnmuteText,
      mediaAssets,
      stopAudioFromScroll,
      audioAssetVolume,
      videoAssetVolume,
      audioProgress,
    },
    ref,
  ) => {
    const introImage = useRef(null);
    const introImageOut = useRef(null);
    const introTitle = useRef(null);
    const leftSections = useRef(null);
    const group1 = useRef(null);
    const group2 = useRef(null);
    const group2Out = useRef(null);
    const group3 = useRef(null);
    const mobileAsset = useRef(null);
    const mobileAssetOut = useRef(null);
    const videoAsset = useRef(null);
    const laptopAsset = useRef(null);
    const laptopVideoBar = useRef(null);
    const mobileImageOne = useRef(null);
    const mobileImageTwo = useRef(null);
    const mobileImageThree = useRef(null);
    const mobileImagesout = useRef(null);
    const laptopImagesContainer = useRef(null);
    const laptopImageOne = useRef(null);
    const laptopImageTwo = useRef(null);
    const laptopImageThree = useRef(null);
    const laptopImageFour = useRef(null);
    const muteBtnRef = useRef(null);
    const muteBtnOutRef = useRef(null);
    const burstAssetOut = useRef(null);
    const audioAsset = useRef(null);
    const { queryUrl } = useImageSupport();
    const [muted, setMuted] = useState(true);
    const [playAudioFromUnmute, setPlayAudioFromUnmute] = useState(false);
    const [muteCounter, setMuteCounter] = useState(0);
    const [inViewport, inViewportRef] = useIsInViewport({
      threshold: visibilityThreshold.oneHalf,
      disconnect: false,
    });
    const { style, textFitRef } = useTextFit({
      paddingBreakpoints: { sm: 0, lg: 85 },
      containerToFitRef: introTitle,
    });

    useImperativeHandle(ref, () => ({
      introImage,
      introImageOut,
      introTitle,
      leftSections,
      group1,
      group2,
      group2Out,
      group3,
      mobileAsset,
      mobileAssetOut,
      videoAsset,
      laptopAsset,
      laptopVideoBar,
      mobileImageOne,
      mobileImageTwo,
      mobileImagesout,
      mobileImageThree,
      laptopImagesContainer,
      laptopImageOne,
      laptopImageTwo,
      laptopImageThree,
      laptopImageFour,
      muteBtnRef,
      muteBtnOutRef,
      burstAssetOut,
      audioAsset,
    }));

    const handleMute = event => {
      event.preventDefault();
      // if it's currently muted and the muteCounter is 0, this is the first
      // time the user has unmuted so we can trigger an audio play event
      // we are tying where we begin playing the audio based on where in the
      // scrolling the user clicked the unmute button
      if (muted && muteCounter === 0) {
        audioAsset.current.seekTo(audioProgress);
        setPlayAudioFromUnmute(true);
      }
      setMuted(!muted);
      setMuteCounter(muteCounter + 1);
    };

    const {
      ImageSearch,
      ImageCreativeTwo,
      ImageCreativeThree,
      ImageStudioUI,
      ImageUIBlue,
      ImageUIVoice,
      ImageUIWhite,
      ImageVideoBar,
      Video,
      Audio,
      LaptopSVG,
      MobileSVG,
      BurstGreen,
    } = mediaAssets;

    return (
      <>
        <Styled.AudioToggleSection>
          <Styled.AudioToggleWrapper ref={muteBtnRef}>
            <div ref={muteBtnOutRef}>
              <Styled.AudioToggle
                onClick={handleMute}
                playWave={btnWave}
                muted={muted}
                hideUnmuteText={hideUnmuteText}
              />
            </div>
          </Styled.AudioToggleWrapper>
        </Styled.AudioToggleSection>
        <Styled.Container
          ref={inViewportRef}
          className={inViewport && ACTIVATE_ANIMATION_CLASS}
        >
          <div ref={burstAssetOut}>
            <Styled.BurstBackground>
              <BurstGreen />
            </Styled.BurstBackground>
          </div>
          <Styled.Content>
            <Styled.ContentLeft>
              <Styled.IntroSection>
                <Styled.IntroTitleContainer ref={introTitle}>
                  <Styled.IntroTitle ref={textFitRef} style={style}>
                    {introTitleProp}
                  </Styled.IntroTitle>
                </Styled.IntroTitleContainer>
                <Styled.CtaWrapper>
                  <Styled.CtaHelpText>{ctaHelpText}</Styled.CtaHelpText>
                  <Styled.Cta
                    {...getLinkProps(cta.url)}
                    type={cta.type}
                    overrideFunctionality={cta.overrideFunctionality}
                  >
                    {cta.title}
                  </Styled.Cta>
                </Styled.CtaWrapper>
              </Styled.IntroSection>
              <Styled.TextSection ref={leftSections}>
                <Styled.Eyebrow>{eyebrow}</Styled.Eyebrow>
                <Styled.GroupWrapper>
                  <Styled.TextGroup ref={group1}>
                    <Styled.Title>{title1}</Styled.Title>
                    <Styled.Description>{description1}</Styled.Description>
                  </Styled.TextGroup>
                  <Styled.TextGroup ref={group2}>
                    <div ref={group2Out}>
                      <Styled.Title>{title2}</Styled.Title>
                      <Styled.Description>{description2}</Styled.Description>
                    </div>
                  </Styled.TextGroup>
                  <Styled.TextGroup ref={group3}>
                    <Styled.Title>{title3}</Styled.Title>
                    <Styled.Description>{description3}</Styled.Description>
                  </Styled.TextGroup>
                </Styled.GroupWrapper>
              </Styled.TextSection>
            </Styled.ContentLeft>
            <Styled.ContentRightIntro>
              <Styled.Group ref={introImageOut}>
                <Styled.IntroImage>
                  <Styled.Image
                    src={introImageProp[queryUrl]}
                    alt={introImageProp.description}
                  />
                </Styled.IntroImage>
              </Styled.Group>
            </Styled.ContentRightIntro>
            <Styled.ContentRight>
              <Styled.AssetMobile ref={mobileAsset}>
                <Styled.AudioAsset
                  ref={audioAsset}
                  url={Audio}
                  playing={stopAudioFromScroll ? false : playAudioFromUnmute}
                  muted={muted}
                  volume={audioAssetVolume}
                />
                <Styled.MobileWrapper ref={mobileAssetOut}>
                  <Styled.AssetWrapper>
                    <Styled.Asset>
                      <MobileSVG />
                    </Styled.Asset>
                  </Styled.AssetWrapper>
                </Styled.MobileWrapper>
                <Styled.MobileImages ref={mobileImagesout}>
                  <Styled.ImageMobile
                    ref={mobileImageOne}
                    src={ImageSearch.src}
                    alt={ImageSearch.alt}
                  />
                  <Styled.ImageMobile
                    ref={mobileImageTwo}
                    src={ImageCreativeTwo.src}
                    alt={ImageCreativeTwo.alt}
                  />
                  <Styled.ImageMobile
                    ref={mobileImageThree}
                    src={ImageCreativeThree.src}
                    alt={ImageCreativeThree.alt}
                  />
                </Styled.MobileImages>
              </Styled.AssetMobile>
              <Styled.GroupVideo ref={videoAsset}>
                <div ref={laptopAsset}>
                  <LaptopSVG />
                </div>
                <Styled.Video
                  url={Video}
                  playing={playVideo}
                  controls={false}
                  muted={muted}
                  volume={videoAssetVolume}
                />
                <Styled.VideoBar
                  ref={laptopVideoBar}
                  src={ImageVideoBar.src}
                  alt={ImageVideoBar.alt}
                />
                <Styled.LaptopImagesContainer ref={laptopImagesContainer}>
                  <Styled.LaptopImage
                    className="one"
                    ref={laptopImageOne}
                    src={ImageStudioUI.src}
                    alt={ImageStudioUI.alt}
                  />
                  <Styled.LaptopImage
                    className="two"
                    ref={laptopImageTwo}
                    src={ImageUIVoice.src}
                    alt={ImageUIVoice.alt}
                  />
                  <Styled.LaptopImage
                    className="three"
                    ref={laptopImageThree}
                    src={ImageUIWhite.src}
                    alt={ImageUIWhite.alt}
                  />
                  <Styled.LaptopImage
                    className="four"
                    ref={laptopImageFour}
                    src={ImageUIBlue.src}
                    alt={ImageUIBlue.alt}
                  />
                </Styled.LaptopImagesContainer>
              </Styled.GroupVideo>
            </Styled.ContentRight>
          </Styled.Content>
        </Styled.Container>
      </>
    );
  },
);

/**
 * AdExperiencesDesktop
 * @param {string|null} className - The component class name.
 * @param {string} introTitle - The intro title
 * @param {object} introImage - The intro image
 * @param {string} eyebrow - The eyebrow
 * @param {string} title1 - The first title
 * @param {string} description1 - The first description
 * @param {string} title2 - The second title
 * @param {string} description2 - The second description
 * @param {string} title3 - The third title
 * @param {string} description3 - The third description
 * @param {string} ctaHelpText - The cta help text
 * @param {object} cta - The cta
 * @param {object} mediaAssets - The media assets
 * @returns {ReactElement}
 */
const AdExperiencesDesktop = ({ className, ...props }) => {
  const [duration, setDuration] = useState();
  const [playing, setPlaying] = useState(false);
  const [btnWave, setBtnWave] = useState(false);
  const [hideUnmuteText, setHideUnmuteText] = useState(false);
  const [stopAudioPlayback, setStopAudioPlayback] = useState(true);
  useEffect(() => {
    setDuration(window.innerHeight * 6);
  }, []);

  /* use a linear interpolation formula to adjust the volume of the media asset 
based on scroll progress: https://theeducationlife.com/interpolation-formula/ */

  const interpolateLinearly = (
    progress,
    startingProgess,
    startingVolume,
    endingProgress,
    endingVolume,
  ) => {
    return (
      startingVolume +
      ((progress - startingProgess) * (endingVolume - startingVolume)) /
        (endingProgress - startingProgess)
    );
  };

  const handleAudioVolume = progress => {
    if (progress >= 0 && progress < 0.25) {
      return 1;
    }
    if (progress > 0.55) {
      return 0;
    }
    return interpolateLinearly(progress, 0.25, 1, 0.55, 0);
  };

  const handleVideoVolume = progress => {
    if (progress < 0.5) {
      return 0;
    }
    if (progress >= 0.7) {
      return 1;
    }
    return interpolateLinearly(progress, 0.5, 0.25, 0.7, 1);
  };

  const handleAudioProgress = progress => {
    if (progress >= 0 && progress < 0.25) {
      return 0;
    }
    if (progress > 0.55) {
      return 1;
    }
    return interpolateLinearly(progress, 0.25, 0, 0.55, 1);
  };

  return (
    <Styled.Root className={className}>
      <Controller>
        <Scene pin triggerHook={0} duration={duration}>
          {progress => (
            <div>
              <Timeline
                target={
                  /* eslint-disable-next-line react/jsx-wrap-multilines */
                  <AdExperiencesDesktopScene
                    {...props}
                    playVideo={playing}
                    btnWave={btnWave}
                    hideUnmuteText={hideUnmuteText}
                    stopAudioFromScroll={stopAudioPlayback}
                    audioAssetVolume={handleAudioVolume(progress)}
                    videoAssetVolume={handleVideoVolume(progress)}
                    audioProgress={handleAudioProgress(progress)}
                  />
                }
                totalProgress={progress}
                paused
              >
                <Tween
                  from={{ opacity: 1, y: 0 }}
                  to={{ opacity: 0, y: -FADE_Y_TRANSLATE }}
                  duration={1}
                  target="introTitle"
                  position="+=1.5"
                />
                <Tween
                  from={{ opacity: 1 }}
                  to={{ opacity: 0 }}
                  duration={1}
                  target="introImageOut"
                  position="<"
                />
                <Tween
                  from={{ opacity: 1 }}
                  to={{ opacity: 0 }}
                  duration={1}
                  target="burstAssetOut"
                  position="<"
                />
                <Tween
                  from={{ opacity: 0, y: FADE_Y_TRANSLATE }}
                  to={{ opacity: 1, y: 0 }}
                  duration={1}
                  target="leftSections"
                  position="-=0.3"
                />
                <Tween
                  from={{ opacity: 0, y: '100%' }}
                  to={{ opacity: 1, y: 0 }}
                  duration={1}
                  target="mobileAsset"
                  position="<"
                />
                <Tween
                  from={{ opacity: 0 }}
                  to={{ opacity: 1 }}
                  duration={1}
                  target="mobileImageOne"
                  position="<"
                />
                <Tween
                  from={{ opacity: 0 }}
                  to={{ opacity: 1 }}
                  duration={1}
                  target="muteBtnRef"
                  position="+=0.5"
                  onComplete={() => {
                    setStopAudioPlayback(false);
                    setBtnWave(true);
                  }}
                  onReverseComplete={() => setStopAudioPlayback(true)}
                />
                <Tween
                  from={{ opacity: 0 }}
                  to={{ opacity: 1 }}
                  duration={1}
                  target="mobileImageTwo"
                  position="+=0.5"
                />
                <Tween
                  from={{ opacity: 0 }}
                  to={{ opacity: 1 }}
                  duration={1}
                  target="mobileImageThree"
                  position="+=0.5"
                  onComplete={() => {
                    setHideUnmuteText(true);
                  }}
                />
                <Tween
                  from={{ opacity: 0, scale: 0 }}
                  to={{ opacity: 1, scale: 1, y: '-50%' }}
                  duration={1}
                  target="videoAsset"
                  position="+=1"
                  onComplete={() => {
                    setPlaying(true);
                  }}
                  onReverseComplete={() => {
                    setPlaying(false);
                  }}
                />
                <Tween
                  from={{ opacity: 1, y: 0 }}
                  to={{ opacity: 0, y: -FADE_Y_TRANSLATE }}
                  duration={1}
                  target="group1"
                  position="+=1"
                  onComplete={() => {
                    setStopAudioPlayback(true);
                  }}
                  onReverseComplete={() => {
                    setStopAudioPlayback(false);
                  }}
                />
                <Tween
                  from={{ opacity: 1 }}
                  to={{ opacity: 0 }}
                  duration={1}
                  target="mobileImagesout"
                  position="<"
                />
                <Tween
                  from={{ opacity: 1 }}
                  to={{ opacity: 0 }}
                  duration={1}
                  target="mobileAssetOut"
                  position="<"
                />
                <Tween
                  from={{ opacity: 0 }}
                  to={{ opacity: 1 }}
                  duration={1}
                  target="laptopAsset"
                  position="<"
                />
                <Tween
                  from={{ opacity: 0 }}
                  to={{ opacity: 1 }}
                  duration={1}
                  target="laptopVideoBar"
                  position="<"
                />
                <Tween
                  from={{ opacity: 0, y: FADE_Y_TRANSLATE }}
                  to={{ opacity: 1, y: 0 }}
                  duration={1}
                  target="group2"
                  position="-=0.3"
                />
                <Tween
                  from={{ opacity: 1, y: 0 }}
                  to={{ opacity: 0, y: -FADE_Y_TRANSLATE }}
                  duration={1}
                  target="group2Out"
                  position="+=1"
                  onComplete={() => setPlaying(false)}
                  onReverseComplete={() => setPlaying(true)}
                />
                <Tween
                  from={{ opacity: 0, y: FADE_Y_TRANSLATE }}
                  to={{ opacity: 1, y: 0 }}
                  duration={1}
                  target="group3"
                  position="-=0.3"
                />
                <Tween
                  from={{ opacity: 1 }}
                  to={{ opacity: 0 }}
                  duration={1}
                  target="muteBtnOutRef"
                  position="<"
                />
                <Tween
                  from={{ opacity: 0 }}
                  to={{ opacity: 1 }}
                  duration={1}
                  target="laptopImagesContainer"
                  position="<"
                />
                <Tween
                  from={{ opacity: 0, scale: 0 }}
                  to={{ opacity: 1, scale: 1 }}
                  duration={1}
                  target="laptopImageOne"
                  position="<"
                />
                <Tween
                  to={{ filter: 'blur(5px)' }}
                  duration={0.5}
                  target="laptopImageOne"
                  position="+=1"
                />
                <Tween
                  from={{ opacity: 0, scale: 0 }}
                  to={{ opacity: 1, scale: 1 }}
                  duration={1}
                  target="laptopImageTwo"
                  position=">"
                />
                <Tween
                  from={{ opacity: 0, scale: 0 }}
                  to={{ opacity: 1, scale: 1 }}
                  duration={1}
                  target="laptopImageThree"
                  position=">"
                />
                <Tween
                  from={{ opacity: 0, scale: 0 }}
                  to={{ opacity: 1, scale: 1 }}
                  duration={1}
                  target="laptopImageFour"
                  position=">"
                />
              </Timeline>
            </div>
          )}
        </Scene>
      </Controller>
    </Styled.Root>
  );
};

AdExperiencesDesktop.propTypes = {
  /**
   * Default className prop
   */
  className: PropTypes.string,
  /**
   * The intro title
   */
  introTitle: PropTypes.string.isRequired,
  /**
   * The intro image
   */
  introImage: PropTypes.shape({}).isRequired,
  /**
   * The eyebrow
   */
  eyebrow: PropTypes.string.isRequired,
  /**
   * The first title
   */
  title1: PropTypes.string.isRequired,
  /**
   * The first description
   */
  description1: PropTypes.string.isRequired,
  /**
   * The second title
   */
  title2: PropTypes.string.isRequired,
  /**
   * The second description
   */
  description2: PropTypes.string.isRequired,
  /**
   * The third title
   */
  title3: PropTypes.string.isRequired,
  /**
   * The third description
   */
  description3: PropTypes.string.isRequired,
  /**
   * The cta help text
   */
  ctaHelpText: PropTypes.string.isRequired,
  /**
   * The cta
   */
  cta: PropTypes.shape({}).isRequired,
  /**
   * The Assests
   */
  mediaAssets: PropTypes.shape({}).isRequired,
};

export default AdExperiencesDesktop;
