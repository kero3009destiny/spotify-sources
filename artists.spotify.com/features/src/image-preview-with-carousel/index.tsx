// ignore-string-externalization
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ImagePreview } from './ImagePreview';
import { ImageCarousel } from './ImageCarousel';

import styles from './ImagePreviewWithCarousel.module.scss';

/** component that contains image carousel and preview of those images */
export class ImagePreviewWithCarousel extends Component<$TSFixMe, $TSFixMe> {
  static propTypes = {
    /** array of images that you want to display */
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    /** title of gallery section */
    galleryHeaderTitle: PropTypes.node,
  };

  static defaultProps = {
    imageUrls: [],
    galleryHeaderTitle: 'Image Gallery',
  };

  constructor(props: $TSFixMe) {
    super(props);
    this.state = {
      galleryOpen: false,
      galleryIndex: 0,
    };
  }

  openGallery = (index: $TSFixMe) => {
    this.setState({ galleryOpen: true, galleryIndex: index });
  };
  closeGallery = () => {
    this.setState({ galleryOpen: false });
  };

  render() {
    const { imageUrls } = this.props;
    if (imageUrls && imageUrls.length) {
      const carouselItems = imageUrls
        .slice(0, 3)
        .map((imageUrl: $TSFixMe, i: $TSFixMe) => (
          /* eslint-disable react/no-array-index-key */
          <ImagePreview
            index={i}
            key={`${imageUrl}-${i}`}
            imageUri={imageUrl}
            imagesShown={imageUrls.slice(0, 3).length}
            imagesCount={imageUrls.length}
            openGallery={this.openGallery}
          />
          /* eslint-enable react/no-array-index-key */
        ));

      return (
        <div>
          {this.props.galleryHeaderTitle}
          <div className={styles.images}>{carouselItems}</div>
          {this.state.galleryOpen ? (
            <ImageCarousel
              images={imageUrls}
              startIndex={this.state.galleryIndex}
              onClose={this.closeGallery}
            />
          ) : null}
        </div>
      );
    }
    return null;
  }
}
