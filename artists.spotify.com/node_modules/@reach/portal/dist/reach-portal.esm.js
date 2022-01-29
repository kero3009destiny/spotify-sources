import { useRef, useEffect, createElement } from 'react';
import { useIsomorphicLayoutEffect } from '@reach/utils/use-isomorphic-layout-effect';
import { useForceUpdate } from '@reach/utils/use-force-update';
import { createPortal } from 'react-dom';
import warning from 'tiny-warning';

/**
 * Welcome to @reach/portal!
 *
 * Creates and appends a DOM node to the end of `document.body` and renders a
 * React tree into it. Useful for rendering a natural React element hierarchy
 * with a different DOM hierarchy to prevent parent styles from clipping or
 * hiding content (for popovers, dropdowns, and modals).
 *
 * @see Docs   https://reach.tech/portal
 * @see Source https://github.com/reach/reach-ui/tree/main/packages/portal
 * @see React  https://reactjs.org/docs/portals.html
 */
/**
 * Portal
 *
 * @see Docs https://reach.tech/portal#portal
 */

var Portal = function Portal(_ref) {
  var children = _ref.children,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? "reach-portal" : _ref$type,
      containerRef = _ref.containerRef;
  var mountNode = useRef(null);
  var portalNode = useRef(null);
  var forceUpdate = useForceUpdate();

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(function () {
      if (containerRef != null) {
        process.env.NODE_ENV !== "production" ? warning(typeof containerRef === "object" && "current" in containerRef, "@reach/portal: Invalid value passed to the `containerRef` of a " + "`Portal`. The portal will be appended to the document body, but if " + "you want to attach it to another DOM node you must pass a valid " + "React ref object to `containerRef`.") : void 0;
        process.env.NODE_ENV !== "production" ? warning(containerRef ? containerRef.current != null : true, "@reach/portal: A ref was passed to the `containerRef` prop of a " + "`Portal`, but no DOM node was attached to it. Be sure to pass the " + "ref to a DOM component.\n\nIf you are forwarding the ref from " + "another component, be sure to use the React.forwardRef API. " + "See https://reactjs.org/docs/forwarding-refs.html.") : void 0;
      }
    }, [containerRef]);
  }

  useIsomorphicLayoutEffect(function () {
    // This ref may be null when a hot-loader replaces components on the page
    if (!mountNode.current) return; // It's possible that the content of the portal has, itself, been portaled.
    // In that case, it's important to append to the correct document element.

    var ownerDocument = mountNode.current.ownerDocument;
    var body = (containerRef == null ? void 0 : containerRef.current) || ownerDocument.body;
    portalNode.current = ownerDocument == null ? void 0 : ownerDocument.createElement(type);
    body.appendChild(portalNode.current);
    forceUpdate();
    return function () {
      if (portalNode.current && body) {
        body.removeChild(portalNode.current);
      }
    };
  }, [type, forceUpdate, containerRef]);
  return portalNode.current ? /*#__PURE__*/createPortal(children, portalNode.current) : /*#__PURE__*/createElement("span", {
    ref: mountNode
  });
};
/**
 * @see Docs https://reach.tech/portal#portal-props
 */


if (process.env.NODE_ENV !== "production") {
  Portal.displayName = "Portal";
} ////////////////////////////////////////////////////////////////////////////////

export default Portal;
export { Portal };
