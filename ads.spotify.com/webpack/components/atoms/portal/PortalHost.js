import React, { createContext, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as Styled from './Portal.styled';

export const PortalHostContext = createContext();

/**
 * PortalHost component
 * @param {object} props
 * @param {object} props.children - The nodes to be rendered
 * @returns {ReactElement}
 */
export const PortalHost = ({ children }) => {
  const elementRef = useRef(null);
  const [element, setElement] = useState(null);

  useEffect(() => {
    setElement(elementRef.current);
  }, [elementRef.current]);

  return (
    <PortalHostContext.Provider value={element}>
      {children}
      <Styled.Portal ref={elementRef} />
    </PortalHostContext.Provider>
  );
};

PortalHost.propTypes = {
  /**
   * The nodes to be rendered
   */
  children: PropTypes.node,
};

export default PortalHost;
