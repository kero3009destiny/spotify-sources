import React from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';

import { TextLink, Type } from '@spotify-internal/encore-web';

const BannerType = styled(Type)`
  padding-bottom: 2px;
  padding-top: 2px;
  flex: 1;
`;

/**
 * This is used in multiple sagas for accountManagement, and is sent off via displayNotification().
 * It needs to live in a separate TSX file so we can use a <Trans> component to render the email link,
 * as JSX cannot be written in plain typescript files.
 */
const MemberUpdateFailedBannerContent = () => {
  return (
    <BannerType variant="viola">
      <Trans i18nKey="I18N_ADS_COMPLIANCE_BANNER_UPDATE_ERROR">
        Something went wrong. Try again in a few minutes or contact us at
        <TextLink href="mailto:adstudio@spotify.com">
          adstudio@spotify.com
        </TextLink>
        .
      </Trans>
    </BannerType>
  );
};

export default MemberUpdateFailedBannerContent;
