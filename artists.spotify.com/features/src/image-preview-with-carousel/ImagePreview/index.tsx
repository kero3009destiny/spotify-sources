// ignore-string-externalization
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { UnstyledButton } from './UnstyledButton';

import styles from './ImagePreview.module.scss';

/** component to allow preview of up to 3 images at once */
export class ImagePreview extends Component<$TSFixMe> {
  imageClass() {
    switch (this.props.index) {
      case 0:
        return 'large';
      case 2:
        return 'small last';
      case 1:
        return 'small';
      default:
        return '';
    }
  }

  render() {
    const childElems = [
      <UnstyledButton
        className={styles.image}
        style={{ backgroundImage: `url(${this.props.imageUri})` }}
        key="image"
        onClick={() => this.props.openGallery(this.props.index)}
        data-testid="preview-image"
        type="button"
        aria-label="Preview image"
      />,
    ];
    if (
      this.props.index === this.props.imagesShown - 1 &&
      this.props.imagesCount > this.props.imagesShown
    ) {
      childElems.push(
        <div
          className={styles['image-count-overlay']}
          key="image-count-overlay"
          data-testid="count-overlay"
        >
          +{this.props.imagesCount - this.props.imagesShown} more
        </div>,
      );
    }

    return (
      <div
        className={classNames(
          this.imageClass()
            .split(' ')
            .map(style => styles[style]),
          styles[`images-${this.props.imagesShown}`],
        )}
      >
        {childElems}
      </div>
    );
  }
}

(ImagePreview as $TSFixMe).propTypes = {
  /** used as key for mapping through images */
  index: PropTypes.number,
  /** number of images in total */
  imagesCount: PropTypes.number,
  /** number of images you want to display */
  imagesShown: PropTypes.number,
  /** url that links to image */
  imageUri: PropTypes.string,
  /** function that should be fired when you click on images */
  openGallery: PropTypes.func,
};

(ImagePreview as $TSFixMe).defaultProps = {
  index: 0,
  imagesCount: 0,
  imagesShown: 0,
  imageUri: '',
  openGallery() {},
};
