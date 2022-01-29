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
import { Biography } from '../Biography';
import { save } from '../lib/actions';
import { sanitizeHTML } from '../lib/htmlHelpers';
import { jsx as _jsx } from "react/jsx-runtime";

/** Biography component with default functionality for adding, deleting, and moving images built in */
export var DefaultBiography = /*#__PURE__*/function (_React$Component) {
  _inherits(DefaultBiography, _React$Component);

  var _super = _createSuper(DefaultBiography);

  function DefaultBiography() {
    var _this;

    _classCallCheck(this, DefaultBiography);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      savedBio: null
    });

    _defineProperty(_assertThisInitialized(_this), "save", function (artistId, _ref, organizationUri) {
      var body = _ref.body,
          displayText = _ref.displayText;
      return save(artistId, body, organizationUri).then(function () {
        _this.props.onSave(displayText);

        _this.setState({
          savedBio: displayText
        });
      }).catch(_this.props.onError);
    });

    return _this;
  }

  _createClass(DefaultBiography, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          artistId = _this$props.artistId,
          authorizedUser = _this$props.authorizedUser,
          autobiography = _this$props.autobiography,
          roviBio = _this$props.roviBio,
          viewport = _this$props.viewport;
      var savedBio = this.state.savedBio;
      var autobioBody = savedBio || autobiography;
      var biography = autobiography || roviBio;
      var sanitizedBiography = sanitizeHTML(biography);
      return /*#__PURE__*/_jsx(Biography, {
        text: sanitizedBiography || '',
        artistId: artistId,
        saveBio: this.save,
        authorizedUser: authorizedUser,
        autoBiographyOrigin: autobioBody ? {
          body: autobioBody
        } : null,
        viewport: viewport
      });
    }
  }]);

  return DefaultBiography;
}(React.Component);

_defineProperty(DefaultBiography, "defaultProps", {
  roviBio: '',
  autobiography: '',
  artistId: '',
  authorizedUser: false,
  viewport: 0,
  onSave: function onSave() {},
  onError: function onError() {}
});