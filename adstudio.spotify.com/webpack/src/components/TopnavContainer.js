import React from 'react';
import { StickyContainer } from 'sp-react-sticky';

import NavBar from './AdStudioBootstrap/NavBar';

import PropTypes from 'prop-types';

export const TopnavContainer = ({ children }) => (
  <main role="main">
    <NavBar />
    <StickyContainer className="main">
      <div className="content">{children}</div>
    </StickyContainer>
  </main>
);

TopnavContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
  ]),
};

export default TopnavContainer;
