import React, { useCallback, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import { colors } from 'styles/variables';
import { ALLOW_SCROLL } from 'constants/js-css-classes';

import * as Styled from './Modal.styled';

/**
 * Modal component
 * @param {object} props
 * @param {object} props.children - The nodes to be rendered
 * @param {Function} props.onDismiss - The dismiss function callback
 * @param {boolean} props.visible - Determines whether the modal is visible.
 * @returns {ReactElement}
 */
const Modal = ({
  children = null,
  backgroundColor = colors.black,
  visible = false,
  onDismiss = () => {},
  className = '',
}) => {
  const containerElement = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  const closeOverlay = useCallback(() => {
    onDismiss();
    setIsHiding(true);
  }, []);

  useEffect(() => {
    setIsHiding(!visible);
    if (visible) {
      setIsVisible(true);
    }
  }, [visible]);

  // Disable, enable scroll on overlay open / close
  useEffect(() => {
    if (!containerElement.current) return undefined;

    if (isVisible) {
      disableBodyScroll(containerElement.current);
      disableBodyScroll(
        containerElement.current.querySelector(`.${ALLOW_SCROLL}`),
      );
    } else {
      enableBodyScroll(containerElement.current);
    }

    return () => {
      clearAllBodyScrollLocks();
    };
  }, [isVisible, containerElement.current]);

  const onAnimationEnd = useCallback(() => {
    if (isHiding) {
      setIsHiding(false);
      setIsVisible(false);
    }
  }, [isHiding]);

  return (
    isVisible && (
      <FocusTrap
        active={isVisible}
        focusTrapOptions={{
          onDeactivate: closeOverlay, // This function is being triggered on ESC key press.
          allowOutsideClick: () => true,
        }}
      >
        <div>
          <Styled.Modal
            onAnimationEnd={onAnimationEnd}
            className={visible ? 'visible' : 'hide'}
            ref={containerElement}
          >
            <Styled.Background onClick={closeOverlay} />
            <Styled.Container
              backgroundColor={backgroundColor}
              className={className}
            >
              <Styled.CloseCta onClick={closeOverlay} className="close-button">
                <Styled.CloseIcon />
              </Styled.CloseCta>
              {children}
            </Styled.Container>
          </Styled.Modal>
        </div>
      </FocusTrap>
    )
  );
};

Modal.propTypes = {
  /**
   * The nodes to be rendered
   */
  children: PropTypes.node,
};

export default Modal;
