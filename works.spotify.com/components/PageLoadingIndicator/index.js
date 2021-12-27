import { LoadingIndicator, Type, gray20 } from '@spotify-internal/encore-web';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import styles from './index.module.scss';

const DEFAULT_LOADING_INDICATOR_DELAY = 500;

const BlurredBackground = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1060;
  filter: blur(16px);
  transform: scale(1.1);
  background-color: ${gray20};

  &::before {
    background-image: ${(props) => `url(${props.bgImage})`};
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    position: absolute;
    content: '';
    display: block;
    z-index: -1;
  }
`;

const BackgroundGradient = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, #000000, rgba(24, 24, 24, 0));
  z-index: 1031;
`;

function PageLoadingIndicator(props) {
  const [state, setState] = useState({
    showLoadingIndicator: false,
    showLoadingIndicatorTimeout: null,
  });

  const { failed, errorMessageHeader, errorMessageBody, loadingMessage, bgImage } = props;
  const { showLoadingIndicator } = state;

  useEffect(() => {
    const timeoutId = setTimeout(
      () => setState({ showLoadingIndicator: true }),
      props.delay || DEFAULT_LOADING_INDICATOR_DELAY,
    );

    return () => clearTimeout(timeoutId);
  }, [props.delay]);

  return (
    <div className={styles.pageLoadingIndicatorContainer} data-testid="page-loading-indicator">
      {bgImage && (
        <>
          <BlurredBackground data-qa="success" bgImage={bgImage} />
          <BackgroundGradient />
        </>
      )}
      {!failed ? (
        showLoadingIndicator && (
          <div className={bgImage && styles.imageMessage}>
            <Type as="p">{loadingMessage}</Type>
            <LoadingIndicator
              indicatorSize="md"
              theme={bgImage ? { loadingIndicator: 'dark' } : undefined}
            />
          </div>
        )
      ) : (
        <div>
          <Type as="p">
            <b>{errorMessageHeader || 'Oops!'}</b>
          </Type>
          <Type as="p">{errorMessageBody || 'Something went wrong.'}</Type>
        </div>
      )}
    </div>
  );
}

PageLoadingIndicator.propTypes = {
  failed: PropTypes.bool,
  delay: PropTypes.number,
  errorMessageHeader: PropTypes.string,
  errorMessageBody: PropTypes.string,
  loadingMessage: PropTypes.string,
  bgImage: PropTypes.string,
};

export default PageLoadingIndicator;
