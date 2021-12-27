import React from 'react';
import { Trans } from 'react-i18next';
import i18n from 'i18next';
import styled from 'styled-components';

import {
  ButtonPrimary,
  ButtonTertiary,
} from '@spotify-internal/adstudio-shared/lib/components/CustomEncore';
import { azure, Backdrop, IconX, Type } from '@spotify-internal/encore-web';

import { CloseButton } from '../OnboardingModal/Main';

const ModalBody = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 800px;
  height: 655px;
  background: white;
  padding: 46px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const ButtonContainer = styled.div`
  > * {
    display: block;
    margin: 0 auto;
  }
`;

const AnnouncementImage = styled.img`
  height: 50%;
  width: auto;
`;

export interface VideoAnnouncementProps {
  onClickLearnMore: () => void;
  onClickCreateAd: () => void;
  onClickExit: () => void;
}

const VideoAnnouncement = ({
  onClickLearnMore,
  onClickCreateAd,
  onClickExit,
}: VideoAnnouncementProps) => (
  <Backdrop center data-test="video-announcement-modal">
    <ModalBody>
      <CloseButton onClick={onClickExit} data-test="video-announcement-x">
        <IconX />
      </CloseButton>
      <AnnouncementImage
        alt={i18n.t('I18N_VIDEO_PREVIEW', 'A preview of the Video feature')}
        src="https://adstudio.scdn.co/assets/announcement/video-announcement.gif"
      />
      <Type.h1 variant={Type.heading1} condensed>
        {i18n.t('I18N_INTRODUCING_VIDEO_ADS', 'Introducing video ads')}
      </Type.h1>
      <Type as="p" variant={Type.body1} condensed>
        <Trans i18nKey="I18N_VIDEO_ON_SPOTIFY_REACHES">
          Video on Spotify reaches your audience between songs or podcasts, so
          it’s played with <br /> the sound on. That means your audience will
          both <strong>hear and see</strong> your message.
        </Trans>
      </Type>
      <ButtonContainer>
        <ButtonPrimary
          onClick={onClickLearnMore}
          buttonSize="lg"
          data-test="video-announcement-learn-more"
          buttonLegacy
        >
          {i18n.t('I18N_LEARN_ABOUT_VIDEO', 'Learn about Video')}
        </ButtonPrimary>
        <ButtonTertiary
          color={azure}
          onClick={onClickCreateAd}
          buttonSize="lg"
          data-test="video-announcement-create-ad"
          buttonLegacy
        >
          {i18n.t('I18N_CREATE_AD1', 'Create Ad')}
        </ButtonTertiary>
      </ButtonContainer>
    </ModalBody>
  </Backdrop>
);

export default VideoAnnouncement;
