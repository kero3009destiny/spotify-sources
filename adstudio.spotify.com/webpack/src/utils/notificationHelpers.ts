import i18n from 'i18next';
import { css, keyframes } from 'styled-components';

import { BannerCustomization } from 'ducks/notifications/types';
import {
  DEFAULT_DISPLAY_TIME,
  displayNotification,
} from 'ducks/notifications/actions';

const bannerKeyframe = keyframes`
  0% {
    opacity: 0.5;
    top: -45px;
  }

  100% {
    opacity: 1;
    top: 0;
  }
`;

export const DEFAULT_BANNER_CUSTOMIZATION: BannerCustomization = {
  styles: `
    width: 100vw;
  `,
  transition: css`
    animation: ${bannerKeyframe} ease-in-out 0.3s;
  `,
  props: {},
};

/* These helpers return a redux action which must be called using dispatch() */

const displayWarningNotification = (message: string) =>
  displayNotification(
    message,
    'warning',
    DEFAULT_DISPLAY_TIME,
    DEFAULT_BANNER_CUSTOMIZATION,
  );

export const displaySuperUserCSVExportNotification = () =>
  displayWarningNotification(
    i18n.t(
      'I18N_SUPER_USER_CSV_EXPORT_NOT_SUPPORTED',
      'CSV export from super user admin account is not supported',
    ),
  );

export const displaySuperUserDatePickerNotification = () =>
  displayWarningNotification(
    i18n.t(
      'I18N_SUPER_USER_DATE_FILTER_NOT_SUPPORTED',
      'Date filtering from super user admin account is not supported',
    ),
  );
