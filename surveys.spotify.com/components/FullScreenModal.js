import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export default function FullScreenModal({
  children,
  rendered,
  transitionName = 'fs-modal',
  transitionEnterTimeout = 500,
  transitionLeaveTimeout = 500,
  transitionAppearTimeout = 500,
}) {
  const onlyChild = typeof children === 'function'
    ? children()
    : React.Children.only(children);

  const child = rendered
    ? React.cloneElement(onlyChild, {
      key: 'full-screen-modal-element',
      className: classNames(
          'full-screen-modal-element',
          onlyChild.props.className
        ),
    })
    : null;

  return (
    <div className="full-screen-modal">
      <CSSTransitionGroup
        transitionName={transitionName}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
        transitionAppearTimeout={transitionAppearTimeout}
        transitionAppear
        transitionEnter
        transitionLeave
      >
        {child}
      </CSSTransitionGroup>
    </div>
  );
}

FullScreenModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  transitionName: PropTypes.string,
  transitionEnterTimeout: PropTypes.number,
  transitionLeaveTimeout: PropTypes.number,
  transitionAppearTimeout: PropTypes.number,
  rendered: PropTypes.bool,
};



// WEBPACK FOOTER //
// ./src/components/FullScreenModal.js