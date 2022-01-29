import _classCallCheck from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import React from 'react';
import { screenXsMin, screenLgMin } from '@spotify-internal/encore-web';
import { uploadImage2 } from '../utils/uploadImage2';
import { updateOrderById } from './lib/actions';
import { ImageUploadModal } from './index';
import { jsx as _jsx } from "react/jsx-runtime";
export var VIEWPORT_XS = parseInt(screenXsMin, 10);
export var VIEWPORT_LG = parseInt(screenLgMin, 10);

/** ImageUploadModal component with default functionality for adding, deleting, and moving images built in */
export var DefaultImageUploadModal = /*#__PURE__*/function (_React$Component) {
  _inherits(DefaultImageUploadModal, _React$Component);

  var _super = _createSuper(DefaultImageUploadModal);

  function DefaultImageUploadModal() {
    var _this;

    _classCallCheck(this, DefaultImageUploadModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onSelectImage", function (_ref) {
      var binary = _ref.binary,
          artistId = _ref.artistId,
          image = _ref.image;
      return uploadImage2({
        source: image,
        binary: binary,
        offset: {},
        capture: image,
        type: 'gallery'
      }, artistId, _this.props.organizationUri).then(function (response) {
        return {
          payload: {
            // Getting these types too correct is more work than it's worth given
            // the upcoming migration to a new image uploading API and the high
            // reliance on dynamic types in the current interfaces
            image: response.gallery
          }
        };
      }).catch(function (error) {
        return {
          payload: {
            error: error
          }
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onUpdateOrder", function (artistId, images) {
      if (images != null) {
        updateOrderById(artistId, _this.props.organizationUri, images).then(_this.props.onSave).catch(_this.props.onError);
      }
    });

    return _this;
  }

  _createClass(DefaultImageUploadModal, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_jsx(ImageUploadModal, {
        artistId: this.props.artistId,
        extraSmall: this.props.viewport <= VIEWPORT_XS,
        initialImages: this.props.images,
        onClose: this.props.onClose,
        uploadGalleryImage: this.onSelectImage,
        updateGalleryImages: this.onUpdateOrder
      });
    }
  }]);

  return DefaultImageUploadModal;
}(React.Component);

_defineProperty(DefaultImageUploadModal, "defaultProps", {
  onClose: function onClose() {},
  onSave: function onSave() {},
  onError: function onError() {},
  images: [],
  artistId: '',
  viewport: VIEWPORT_LG,
  organizationUri: ''
});