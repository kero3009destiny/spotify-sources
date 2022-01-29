import React from 'react';
import styled from 'styled-components';
import {
  ButtonIcon,
  ButtonTertiary,
  IconX,
  Image,
  Type,
  azure,
  royalBlue,
  spacer4,
  spacer20,
  spacer32,
  spacer40,
  white,
} from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';

const StyledContainer = styled.div`
  background: linear-gradient(to right, ${royalBlue}, ${azure});
  border-radius: 4px;
  color: ${white};
  position: relative;
`;

const StyledDesktopContainer = styled(StyledContainer)`
  align-items: center;
  display: flex;
  padding: ${spacer20};
`;

const StyledMobileContainer = styled(StyledContainer)`
  padding: ${spacer40};
`;

const StyledThumbTitleWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${spacer32};
`;

const StyledThumbnail = styled.div`
  height: 111px;
  margin-right: ${spacer32};
  width: 102px;
`;

const StyledContent = styled.div`
  flex: 1;
  max-width: 580px;
`;

const StyledButtonTertiary = styled(ButtonTertiary)`
  color: ${white};
  margin-top: ${spacer4};

  &:hover:not(:focus):not(:disabled) {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const StyledButtonIcon = styled(ButtonIcon)`
  color: inherit;
  position: absolute;
  right: ${spacer20};
  top: ${spacer20};
`;

type BannerProps = {
  closeBannerCallback: () => void;
  isMobileViewport: boolean;
};

export function AlgoPlaylistBanner(props: BannerProps) {
  const { closeBannerCallback, isMobileViewport } = props;
  const t = useT();

  function handleCloseBtnClick(evt: React.MouseEvent) {
    evt.preventDefault();
    closeBannerCallback();
  }

  function handleLinkBtnClick(evt: React.MouseEvent) {
    evt.preventDefault();
    window.open(
      'https://artists.spotify.com/help/article/unique-link',
      '_blank',
    );
  }

  function renderCloseButton() {
    return (
      <StyledButtonIcon
        aria-label="close"
        onClick={handleCloseBtnClick}
        data-testid="close-button"
      >
        <IconX aria-label="IconX" iconSize={24} />
      </StyledButtonIcon>
    );
  }

  function renderImage() {
    return (
      <StyledThumbnail>
        <Image
          src="https://s4a.scdn.co/playlists/editorial_banner_illustration.png"
          alt={t('ALGO_PLAYLIST_BANNER_425d0d', 'Banner illustration', '')}
        />
      </StyledThumbnail>
    );
  }

  function renderTitle() {
    return (
      <Type as="h2" variant={Type.heading4} weight={Type.bold} condensed>
        {t(
          'ALGO_PLAYLIST_BANNER_4c0d56',
          'Use your unique link to be in the top spot!',
          '',
        )}
      </Type>
    );
  }

  function renderBody() {
    return (
      <React.Fragment>
        <Type as="p" weight={Type.book} condensed>
          {t(
            'ALGO_PLAYLIST_BANNER_b4802f',
            'Share the unique link below and anyone who clicks it will see your song at the top of the playlist. This only works for personalized editorial playlists.',
            '',
          )}
        </Type>
        <StyledButtonTertiary
          buttonSize={ButtonTertiary.sm}
          condensed
          onClick={handleLinkBtnClick}
        >
          {t('ALGO_PLAYLIST_BANNER_3cb0d3', 'Go to FAQs', '')}
        </StyledButtonTertiary>
      </React.Fragment>
    );
  }

  return (
    <>
      {isMobileViewport ? (
        <StyledMobileContainer>
          <StyledThumbTitleWrapper>
            {renderImage()}
            {renderTitle()}
          </StyledThumbTitleWrapper>
          {renderBody()}
          {renderCloseButton()}
        </StyledMobileContainer>
      ) : (
        <StyledDesktopContainer>
          {renderImage()}
          <StyledContent>
            {renderTitle()}
            {renderBody()}
          </StyledContent>
          {renderCloseButton()}
        </StyledDesktopContainer>
      )}
    </>
  );
}
