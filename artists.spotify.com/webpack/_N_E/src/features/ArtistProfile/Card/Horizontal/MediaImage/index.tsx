// ignore-string-externalization
import React from 'react';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
export var MediaImage = function MediaImage(_ref) {
  var image = _ref.image;
  return /*#__PURE__*/_jsx("div", {
    "data-testid": "media-image",
    className: styles.media_image,
    style: {
      backgroundImage: "url(".concat(image, ")")
    }
  });
};
MediaImage.defaultProps = {
  image: ''
};