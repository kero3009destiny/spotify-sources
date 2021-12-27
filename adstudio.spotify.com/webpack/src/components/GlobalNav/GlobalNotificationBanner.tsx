import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled, { css } from 'styled-components';

import {
  spacer4,
  spacer32,
  spacer64,
} from '@spotify-internal/encore-foundation';
import { Banner } from '@spotify-internal/encore-web';

import { hideNotification as hideNotificationAC } from 'ducks/notifications/actions';
import {
  getBannerCustomization,
  getDisplayTimeMs,
  getNotificationText,
  getNotificationType,
  showNotification as showNotificationSelector,
} from 'ducks/notifications/selectors';

const bannerContainerStyles = css`
  position: fixed;
  z-index: 55;
  margin: 0 ${spacer64};
`;

interface GlobalNotificationBannerProps {
  hideNotification: () => void;
  showNotification: boolean;
  notificationText: string | JSX.Element;
  notificationType: string;
  bannerCustomization: TSFixMe;
  displayTimeMs: number;
  positionStatic?: boolean;
}

export const GlobalNotificationBanner: FunctionComponent<GlobalNotificationBannerProps> = ({
  showNotification,
  hideNotification,
  notificationText,
  notificationType,
  bannerCustomization,
  displayTimeMs,
  positionStatic = false,
}) => {
  // @ts-ignore
  const BannerContainer = styled.div`
    ${bannerContainerStyles}
    ${bannerCustomization.transition}
    ${positionStatic && 'position: static'}
  `;

  const StyledBanner = styled(Banner)`
    margin-top: ${spacer32};
    border-radius: ${spacer4};
    ${bannerCustomization.styles}
  `;

  const shouldRenderAsComponent =
    notificationText && typeof notificationText !== 'string';
  const renderedNotification =
    shouldRenderAsComponent &&
    (notificationText && typeof notificationText === 'function'
      ? notificationText
      : () => notificationText);

  if (!showNotification) return null;

  setTimeout(() => hideNotification(), displayTimeMs);

  return (
    <>
      <BannerContainer
        in={showNotification}
        {...bannerCustomization.transition}
        data-test="global-alert-banner"
      >
        <StyledBanner
          colorSet={notificationType}
          {...bannerCustomization.props}
          renderMessage={
            shouldRenderAsComponent ? renderedNotification : undefined
          }
        >
          {notificationText}
        </StyledBanner>
      </BannerContainer>
    </>
  );
};

export const mapStateToProps = (state: TSFixMe) => {
  return {
    showNotification: showNotificationSelector(state),
    notificationText: getNotificationText(state),
    notificationType: getNotificationType(state),
    displayTimeMs: getDisplayTimeMs(state),
    bannerCustomization: getBannerCustomization(state),
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    hideNotification: () => dispatch(hideNotificationAC()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GlobalNotificationBanner);
