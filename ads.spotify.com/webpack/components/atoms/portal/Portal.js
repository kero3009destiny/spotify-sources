import ReactDOM from 'react-dom';
import { useContext } from 'react';
import PropTypes from 'prop-types';

import { PortalHostContext, PortalHost } from './PortalHost';

/**
 * Portal component - Renders a component outside of the DOM hierarchy
 * of the parent component to the <Portal.Host> tree level
 * @param {object} props
 * @param {object} props.children - The nodes to be rendered
 * @returns {ReactElement}
 */
const Portal = ({ children = null }) => {
  const portalHost = useContext(PortalHostContext);

  return portalHost
    ? ReactDOM.createPortal(children, portalHost.parentNode)
    : null;
};

Portal.Host = PortalHost;

Portal.propTypes = {
  /**
   * The nodes to be rendered
   */
  children: PropTypes.node,
};

export default Portal;
