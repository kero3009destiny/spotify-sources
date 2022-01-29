import _toConsumableArray from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import cn from 'classnames';
import { Banner, Backdrop, ButtonPrimary, ButtonTertiary, Type, IconPlus } from '@spotify-internal/encore-web';
import { DialogConfirmation } from '@mrkt/features/Dialog';
import { Dropzone } from '@mrkt/features/dropzone';
import { withT } from '@mrkt/features/i18n';
import { UnstyledButton } from '@mrkt/features/UnstyledButton';
import { DraggableMediaList } from './MediaList';
import styles from './ImageUploadModal.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var IS_UPLOADED = 'IS_UPLOADED';
var IS_NOT_UPLOADED = 'IS_NOT_UPLOADED';
var IS_UPLOADING = 'IS_UPLOADING';
var MIN_IMAGE_WIDTH = 690;
var MIN_IMAGE_HEIGHT = 500; // Actions

var UPDATE_IMAGES = 'UPDATE_IMAGES';

var ImageUploadModalComponent = /*#__PURE__*/function (_Component) {
  _inherits(ImageUploadModalComponent, _Component);

  var _super = _createSuper(ImageUploadModalComponent);

  function ImageUploadModalComponent(props) {
    var _this;

    _classCallCheck(this, ImageUploadModalComponent);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      window.addEventListener('beforeunload', _this.onCancel);
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      window.removeEventListener('beforeunload', _this.onCancel);
    });

    _defineProperty(_assertThisInitialized(_this), "handleAction", function (eventType, payload) {
      switch (eventType) {
        case UPDATE_IMAGES:
          {
            _this.setState({
              images: payload.images,
              isChanged: true
            });

            break;
          }

        case IS_UPLOADING:
          {
            var isUploading = payload;

            _this.setState({
              isUploading: isUploading
            });

            break;
          }

        default:
          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSave", function () {
      var _this$state$images;

      var images = (_this$state$images = _this.state.images
      /* Find images that IS_NOT_UPLOADED */
      ) === null || _this$state$images === void 0 ? void 0 : _this$state$images.filter(function (image) {
        return image.status === IS_NOT_UPLOADED && image.loading;
      }).map(_this.uploadImage);
      Promise.all(images).then(function () {
        return _this.handleAction(IS_UPLOADING, false);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onClickSave", function () {
      _this.props.updateGalleryImages(_this.props.artistId, _this.state.images);

      _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "onImageLoadComplete", function (status, id, imageId) {
      var errors = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      var images = _this.state.images;
      var files = images === null || images === void 0 ? void 0 : images.map(function (image) {
        var file = image;

        if (image.id === id) {
          file.status = status;
          file.loading = false;
          file.order = 0;
          file.error = !!errors.length; // This is the image ID in the backend image transcoding system
          // See comments in utils/uploadImage.ts for more context. This is kind
          // of hacky but we are planning to migrate image uploading to use a new
          // API in Q3 2020 (This quarter)—so leaving the less-hacky solution to
          // that migration.

          if (imageId != null) {
            file.id = imageId;
          }
        } else if (!errors.length) {
          // TODO refactor to be more type safe so non-null assert isn't needed
          file.order += 1;
        }

        return file;
      }); // TODO refactor to be more type safe so non-null assert isn't needed

      _this.handleAction(UPDATE_IMAGES, {
        images: files
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onReceiveFiles", function (filesData) {
      var images = _this.state.images;
      /**
       * Reset errors from previous attempts
       */

      _this.setState({
        errors: null
      });
      /**
       * Create image format
       */


      var formattedImages = filesData.map(function (imageFile, index) {
        return _this.createImageShape(_objectSpread(_objectSpread({
          file: imageFile.file,
          status: IS_NOT_UPLOADED,
          src: imageFile.source,
          binary: imageFile.binary,
          id: "".concat(imageFile.source, "-").concat(index)
        }, !imageFile.errors.length && {
          loading: true
        }), imageFile.errors.length && {
          errors: imageFile.errors
        }));
      }); //* Display errors alert if image has errors

      var errors = formattedImages.filter(function (image) {
        return image.errors;
      }) // Assert non-null since we're filtering on the truthiness of the
      // image.errors property, which eliminates the possibility that the type
      // at this point is null or undefined
      .reduce(function (acum, image) {
        return [].concat(_toConsumableArray(acum), _toConsumableArray(image.errors));
      }, []);

      if (errors) {
        _this.setState({
          errors: errors
        });
      }

      var filteredImages = formattedImages.filter(function (image) {
        return !image.errors;
      });
      /**
       * Combine images
       */

      var hasImages = images && images.length > 0;
      var combinedImages = hasImages ? filteredImages.concat(images) : filteredImages;

      _this.handleAction(UPDATE_IMAGES, {
        images: combinedImages
      });

      _this.handleAction(IS_UPLOADING, true);

      _this.onSave();
    });

    _defineProperty(_assertThisInitialized(_this), "onRemoveImage", function (imageIndex) {
      var images = _this.state.images;

      if (imageIndex > -1) {
        // TODO refactor to be more type safe so non-null assert isn't needed
        images.splice(imageIndex, 1);

        _this.handleAction(UPDATE_IMAGES, {
          images: images
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onRetry", function (imageIndex) {
      var images = _this.state.images;

      if (imageIndex > -1) {
        _this.setState({
          errors: null
        });

        var imageToRetry = images[imageIndex];
        imageToRetry.loading = true;
        delete imageToRetry.errors; // TODO refactor to be more type safe so non-null assert isn't needed

        _this.handleAction(UPDATE_IMAGES, {
          images: images
        });

        _this.uploadImage(imageToRetry);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onCancel", function () {
      var _this$state$images2;

      var onClose = _this.props.onClose; // Images that have not been just added by the user

      var prevEstablishedImages = ((_this$state$images2 = _this.state.images) === null || _this$state$images2 === void 0 ? void 0 : _this$state$images2.filter(function (img) {
        return img.status !== IS_UPLOADED && img.status !== IS_NOT_UPLOADED;
      })) || [];

      _this.props.updateGalleryImages(_this.props.artistId, prevEstablishedImages);

      onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "onMoveImage", function (images) {
      return _this.handleAction(UPDATE_IMAGES, {
        images: images
      });
    });

    _defineProperty(_assertThisInitialized(_this), "uploadImage", function (image) {
      var _this$props = _this.props,
          artistId = _this$props.artistId,
          uploadGalleryImage = _this$props.uploadGalleryImage;
      return (// TODO remove non-null assertion
        uploadGalleryImage({
          binary: image.binary,
          artistId: artistId,
          image: image
        })
        /* Replace loading state with success message */
        .then(function (response) {
          var payload = response.payload;

          if (payload && payload.error) {
            var errors = ['Something went wrong!'];

            _this.setState({
              errors: errors
            });

            _this.onImageLoadComplete(IS_NOT_UPLOADED, image.id, null, errors);
          } else if (payload && payload.image) {
            _this.onImageLoadComplete(IS_UPLOADED, payload.image.id, payload.image.imageId);
          }
        })
      );
    });

    _defineProperty(_assertThisInitialized(_this), "createImageShape", function (image) {
      return _objectSpread(_objectSpread(_objectSpread(_objectSpread({
        status: image.status,
        id: image.id,
        src: image.src,
        order: image.order
      }, image.file && {
        file: image.file
      }), image.binary && {
        binary: image.binary
      }), image.loading && {
        loading: image.loading
      }), image.errors && {
        errors: image.errors
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderHeader", function () {
      var t = _this.props.t;
      return /*#__PURE__*/_jsx("div", {
        className: styles.modal__header_title,
        children: t('artistprofile_imageuploadmodal_1', 'Image Gallery', '')
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderBody", function () {
      var _images$length;

      var t = _this.props.t;
      var _this$state = _this.state,
          images = _this$state.images,
          errors = _this$state.errors;
      var numImages = (_images$length = images === null || images === void 0 ? void 0 : images.length) !== null && _images$length !== void 0 ? _images$length : 0;
      var numImagesText;

      switch (numImages) {
        case 0:
          numImagesText = t('artistprofile_imageuploadmodal_2', '0 Images', '');
          break;

        case 1:
          numImagesText = t('artistprofile_imageuploadmodal_3', '1 Image', '');
          break;

        default:
          numImagesText = t('artistprofile_imageuploadmodal_4', '{numImages} Images', "The variable refers to how many images you've uploaded.", {
            numImages: numImages
          });
      }

      return /*#__PURE__*/_jsxs("div", {
        className: styles.modal__body,
        "data-qa": "image-upload-modal",
        children: [errors ? errors.map(function (error) {
          return /*#__PURE__*/_jsx(Banner, {
            colorSet: "negative",
            children: error
          }, error);
        }) : null, /*#__PURE__*/_jsx(Dropzone, {
          className: cn(styles.modal__file_selector, _this.state.isHovering && styles.is_hovering),
          onFileSelection: _this.onReceiveFiles,
          acceptsMultiple: true,
          isHovering: function isHovering(_isHovering) {
            return _this.setState({
              isHovering: _isHovering
            });
          },
          children: /*#__PURE__*/_jsxs(UnstyledButton, {
            children: [/*#__PURE__*/_jsx(IconPlus, {
              "aria-hidden": true,
              focusable: false
            }), /*#__PURE__*/_jsx(Type, {
              as: "p",
              className: styles.modal__file_selector_title,
              children: t('artistprofile_imageuploadmodal_5', 'Upload Images', '')
            }), /*#__PURE__*/_jsx(Type, {
              as: "p",
              semanticColor: "textSubdued",
              children: t('artistprofile_imageuploadmodal_6', 'or drag and drop', "Continuation of the phrase Upload images. It's another option on how to upload them. ")
            })]
          })
        }), /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Type, {
            as: "p",
            className: styles.modal__photo_count,
            "data-qa": "image-count",
            children: numImagesText
          }), /*#__PURE__*/_jsx(DraggableMediaList, {
            images: images,
            onMoveImage: _this.onMoveImage,
            onRemoveImage: _this.onRemoveImage,
            onRetry: _this.onRetry
          }), /*#__PURE__*/_jsx("div", {
            className: styles.guidelines,
            children: /*#__PURE__*/_jsx(Type, {
              as: "p",
              semanticColor: "textSubdued",
              dangerouslySetInnerHTML: {
                __html: t('artistprofile_imageuploadmodal_7', "\n                  File format: jpeg, gif or png. Images must be at least&nbsp;{MIN_IMAGE_WIDTH}px x {MIN_IMAGE_HEIGHT}px. Avoid text, logos, and busy backgrounds. By uploading an image, you agree that it\u2019s subject to our\n                <a\n                  href=\"https://www.spotify.com/legal/copyright-policy/\"\n                  className={guidelinesLinkStyles}\n                  rel=\"noopener noreferrer\"\n                  target=\"_blank\"\n                >\n                  copyright policy\n                </a>\n                and\n                <a\n                  href=\"https://www.spotify.com/us/legal/spotify-for-artists-terms-and-conditions/\"\n                  className={guidelinesLinkStyles}\n                  rel=\"noopener noreferrer\"\n                  target=\"_blank\"\n                >terms</a>.\n                ", '', {
                  MIN_IMAGE_HEIGHT: MIN_IMAGE_HEIGHT,
                  MIN_IMAGE_WIDTH: MIN_IMAGE_WIDTH,
                  guidelinesLinkStyles: styles.guidelines_link
                })
              }
            })
          })]
        })]
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderFooter", function () {
      var _this$props2 = _this.props,
          extraSmall = _this$props2.extraSmall,
          t = _this$props2.t;
      var _this$state2 = _this.state,
          isChanged = _this$state2.isChanged,
          images = _this$state2.images;
      var isImageLoading = images && images.some(function (image) {
        return image.loading;
      });
      var ButtonSwitch = extraSmall ? ButtonTertiary : ButtonPrimary;
      return /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(ButtonTertiary, {
          condensed: true,
          onClick: _this.onCancel,
          disabled: Boolean(isImageLoading),
          "data-qa": "cancel-button",
          buttonSize: ButtonTertiary.sm,
          children: t('artistprofile_imageuploadmodal_8', 'Cancel', '')
        }), /*#__PURE__*/_jsx(ButtonSwitch, {
          condensed: extraSmall,
          onClick: _this.onClickSave,
          disabled: Boolean(!isChanged || isImageLoading),
          "data-qa": "save-button",
          buttonSize: ButtonSwitch.sm,
          children: t('artistprofile_imageuploadmodal_9', 'Save', '')
        })]
      });
    });

    var initialImages = props.initialImages;

    var _hasImages = Array.isArray(initialImages) && initialImages.length > 0;

    var _images = null;

    if (_hasImages) {
      var items = initialImages.map(function (image, index) {
        return _this.createImageShape({
          id: image.id,
          order: index,
          src: image.src
        });
      });
      _images = items;
    }

    _this.state = {
      /**
       * `images` is a combination of
       * client and server-side files
       * Array [ Object { id: String, status: String, src: String, file: Object } ]
       */
      images: _images,
      isChanged: false,
      isDragActive: false,
      isUploading: false
    };
    return _this;
  }

  _createClass(ImageUploadModalComponent, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_jsx(Backdrop, {
        center: true,
        onClose: this.onCancel,
        children: /*#__PURE__*/_jsx(DialogConfirmation, {
          dialogId: "profile-image-upload-dialog",
          className: styles.modal,
          dialogTitle: this.renderHeader(),
          body: this.renderBody(),
          footer: this.renderFooter()
        })
      });
    }
  }]);

  return ImageUploadModalComponent;
}(Component);

_defineProperty(ImageUploadModalComponent, "defaultProps", {
  initialImages: [],
  onClose: function onClose() {},
  updateGalleryImages: function updateGalleryImages() {}
});

export var ImageUploadModal = withT(ImageUploadModalComponent);