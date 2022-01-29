import React from 'react';
import classnames from 'classnames';
import { IconX, IconMenu, IconRefresh, ButtonTertiary } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { LoadingIndicator } from '../../../../shared/components/LoadingIndicator';
import styles from './Media.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function MediaItem(_ref) {
  var index = _ref.index,
      image = _ref.image,
      _ref$isDragging = _ref.isDragging,
      isDragging = _ref$isDragging === void 0 ? false : _ref$isDragging,
      _ref$hasControls = _ref.hasControls,
      hasControls = _ref$hasControls === void 0 ? false : _ref$hasControls,
      onRemoveImage = _ref.onRemoveImage,
      onRetry = _ref.onRetry;
  var t = useT();
  var className = classnames(styles.media_inner, isDragging && styles.media_is_dragging, hasControls && styles.media_has_controls);
  if (!image) return null;
  var isLoading = image && image.loading && !image.error;
  var imgStyle = !image.loading && !image.error && image.src ? {
    backgroundImage: "url(".concat(image.src, ")")
  } : null;
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [isLoading && /*#__PURE__*/_jsx("div", {
      className: styles.media_loading,
      children: /*#__PURE__*/_jsx(LoadingIndicator, {})
    }), /*#__PURE__*/_jsx("div", {
      className: styles.media_img,
      style: imgStyle || {}
    }), image.error && /*#__PURE__*/_jsxs("div", {
      className: styles.media_error,
      children: [/*#__PURE__*/_jsx(IconRefresh, {
        "aria-hidden": true,
        focusable: false,
        color: "red",
        iconSize: 24
      }), /*#__PURE__*/_jsx(ButtonTertiary, {
        condensed: true,
        buttonSize: ButtonTertiary.sm,
        className: styles.retry_button,
        onClick: function onClick() {
          if (onRetry) {
            if (typeof index === 'number') {
              onRetry(index);
            }
          }
        },
        children: "Retry"
      })]
    }), !image.error && /*#__PURE__*/_jsxs("div", {
      className: styles.media_controls,
      children: [/*#__PURE__*/_jsx(ButtonTertiary, {
        condensedAll: true,
        className: styles.media_remove,
        "aria-label": t('artistprofile_imageuploadmodal_media_mediaitem_1', 'delete image', ''),
        iconOnly: IconX,
        onClick: function onClick() {
          if (onRemoveImage) {
            if (typeof index === 'number') {
              onRemoveImage(index);
            }
          }
        },
        "data-qa": "remove-button-".concat((index !== null && index !== void 0 ? index : '').toString()),
        "aria-hidden": true
      }), /*#__PURE__*/_jsx(IconMenu, {
        "aria-hidden": true,
        focusable: false,
        color: "white",
        iconSize: 24
      })]
    })]
  });
}