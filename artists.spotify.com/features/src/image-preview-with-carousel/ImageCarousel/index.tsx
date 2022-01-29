// ignore-string-externalization
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  IconChevronLeft,
  IconChevronRight,
  IconX,
} from '@spotify-internal/encore-web';
import classNames from 'classnames';

import styles from './ImageCarousel.module.scss';

const ESCAPE_KEY = 27;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;

/** component to render an image carousel */
export class ImageCarousel extends Component<$TSFixMe, $TSFixMe> {
  static propTypes = {
    /** images that would be rendered by this component */
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    /** index of which image you want the carousel to start */
    startIndex: PropTypes.number.isRequired,
    /** function that should be executed onClose */
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onClose() {},
    startIndex: 1,
    images: [],
  };

  constructor(props: $TSFixMe) {
    super(props);

    this.state = {
      currentSlide: props.startIndex + 1,
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeydown, true);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydown, true);
  }

  onKeydown = (event: $TSFixMe) => {
    switch (event.which) {
      case KEY_RIGHT_ARROW:
        return this.incrementSlide.call(this, event);
      case KEY_LEFT_ARROW:
        return this.decrementSlide.call(this, event);
      case ESCAPE_KEY:
        return this.props.onClose();
      default:
        return null;
    }
  };

  incrementSlide(e: $TSFixMe) {
    e.stopPropagation();
    if (this.isLastSlide()) {
      return;
    }
    this.setState({ currentSlide: this.state.currentSlide + 1 });
  }

  decrementSlide(e: $TSFixMe) {
    e.stopPropagation();
    if (this.isFirstSlide()) {
      return;
    }
    this.setState({ currentSlide: this.state.currentSlide - 1 });
  }

  isFirstSlide() {
    return this.state.currentSlide === 1;
  }

  isLastSlide() {
    return this.state.currentSlide === this.props.images.length;
  }

  hasMultipleSlides() {
    return this.props.images && this.props.images.length >= 1;
  }

  render() {
    const { images, onClose } = this.props;
    const { currentSlide } = this.state;
    const imagesCount = images.length;
    if (!images.length) return null;
    return (
      /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
      <div
        className={styles.modal_background}
        onClick={onClose}
        data-testid="image-carousel"
      >
        {this.hasMultipleSlides() && (
          <div
            className={styles['image-carousel--prev']}
            onClick={e => this.decrementSlide(e)}
          >
            <IconChevronLeft iconSize={32} />
          </div>
        )}
        <div className={classNames(styles['image-carousel'], styles.carousel)}>
          <div>
            <div
              className={styles['crsl-inner']}
              data-testid="carousel-slider"
              style={{ left: `${-100 * (currentSlide - 1)}%` }}
            >
              {imagesCount &&
                images.map((image: $TSFixMe, i: $TSFixMe) => (
                  /* eslint-disable react/no-array-index-key */
                  <div
                    className={classNames(
                      styles['image-carousel-item'],
                      styles['crsl-item'],
                    )}
                    key={`${image}-${i}`}
                  >
                    <div className={styles['image-wrapper']}>
                      <img src={image} alt="" data-testid="carousel-image" />
                    </div>
                  </div>
                  /* eslint-enable react/no-array-index-key */
                ))}
            </div>
          </div>
        </div>

        <div
          className={styles['image-carousel--close']}
          onClick={onClose}
          data-testid="close-carousel"
        >
          <IconX iconSize={32} />
        </div>

        {this.hasMultipleSlides() && (
          <div
            className={styles['image-carousel__count']}
            data-log-click="increment-slide"
          >
            <span className={styles['current-slide']}>{currentSlide}</span>
            {' / '}
            {imagesCount}
          </div>
        )}
        {this.hasMultipleSlides() && (
          <div
            className={styles['image-carousel--next']}
            onClick={e => this.incrementSlide(e)}
          >
            <IconChevronRight iconSize={32} />
          </div>
        )}
      </div>
      /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    );
  }
}
