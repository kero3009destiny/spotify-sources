import React from 'react';
import ReactDOM from 'react-dom';

export const CoachmarkRootStylesDisabled =
  'position: absolute; width: 100%; height: 100%; top: 0; pointer-events: none;';
export const CoachmarkRootStylesEnabled =
  'position: absolute; width: 100%; height: 100%; top: 0;';

export interface CoachmarkPortalProps {
  disablePointerEvents?: boolean;
}

// Create a Coachmark component as an abstraction around the portal API.
export class CoachmarkPortal extends React.Component<CoachmarkPortalProps> {
  el: Element = document.createElement('div');
  coachmarkPortalRoot: HTMLElement = document.getElementById('coachmark-root')!;

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    // Enable pointer events for the coachmark portal root.
    this.el.setAttribute('style', 'height: 100%');
    this.coachmarkPortalRoot.appendChild(this.el);
    this.togglePointerEvents(!this.props.disablePointerEvents);
  }

  componentDidUpdate(prevProps: Readonly<CoachmarkPortalProps>) {
    if (prevProps.disablePointerEvents !== this.props.disablePointerEvents) {
      this.togglePointerEvents(!this.props.disablePointerEvents);
    }
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount and disable pointer events
    this.togglePointerEvents(false);
    this.coachmarkPortalRoot.removeChild(this.el);
  }

  togglePointerEvents = (pointerEventsEnabled: boolean) => {
    if (pointerEventsEnabled) {
      this.coachmarkPortalRoot.setAttribute(
        'style',
        CoachmarkRootStylesEnabled,
      );
    } else {
      this.coachmarkPortalRoot.setAttribute(
        'style',
        CoachmarkRootStylesDisabled,
      );
    }
  };

  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      this.props.children,
      // A DOM element
      this.el,
    );
  }
}
