import React from 'react';

import { KeyboardDetectionProvider } from '@spotify-internal/encore-web';

import OnlineEventDetector from 'components/common/OnlineEventDetector';
import DialogRoot from 'components/GlobalDialog';
import RedirectingWrapper from 'components/Redirects/RedirectingWrapper';

import PropTypes from 'prop-types';

export const MainComponent = ({ children }) => (
  <RedirectingWrapper>
    <KeyboardDetectionProvider>
      <OnlineEventDetector />
      <DialogRoot />
      {children}
    </KeyboardDetectionProvider>
  </RedirectingWrapper>
);

MainComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
  ]),
};

export default MainComponent;
