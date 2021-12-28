import React from 'react';
import PropTypes from 'prop-types';

import { Video, VIDEO_TYPES } from 'components/atoms';

import * as Styled from './VideoSection.styled';

const VideoSection = ({
  type,
  videoId,
  videoName,
  caption,
  pageContext = '',
}) => (
  <Styled.Root className={pageContext}>
    <Video
      type={type}
      videoId={videoId}
      videoName={videoName}
      caption={caption}
    />
  </Styled.Root>
);

VideoSection.propTypes = {
  /**
   * Video Type
   */
  type: PropTypes.oneOf([VIDEO_TYPES.YOUTUBE, VIDEO_TYPES.VIMEO]).isRequired,
  /**
   * Video Id
   */
  videoId: PropTypes.string.isRequired,
  /**
   * Video Name
   */
  videoName: PropTypes.string.isRequired,
  /**
   * An optional caption at the bottom of the video
   */
  caption: PropTypes.string,
  /**
   * Page type
   */
  pageContext: PropTypes.string,
};

export default VideoSection;
