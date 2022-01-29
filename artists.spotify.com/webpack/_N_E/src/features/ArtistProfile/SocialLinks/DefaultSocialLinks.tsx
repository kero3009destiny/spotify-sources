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
import { save } from './lib/actions';
import { SocialLinks } from './index';
import { jsx as _jsx } from "react/jsx-runtime";

/** SocialLinks component with default functionality for saving built in */
export var DefaultSocialLinks = /*#__PURE__*/function (_React$Component) {
  _inherits(DefaultSocialLinks, _React$Component);

  var _super = _createSuper(DefaultSocialLinks);

  function DefaultSocialLinks() {
    var _this;

    _classCallCheck(this, DefaultSocialLinks);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "updateSocialLinks", function (artistId, _ref, organizationUri) {
      var links = _ref.links;
      save(links, artistId, organizationUri).then(function (savedLinks) {
        _this.props.onSave(savedLinks);
      }).catch(_this.props.onError);
    });

    return _this;
  }

  _createClass(DefaultSocialLinks, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          artistId = _this$props.artistId,
          autobiography = _this$props.autobiography,
          authorizedUser = _this$props.authorizedUser;
      return /*#__PURE__*/_jsx(SocialLinks, {
        artistId: artistId,
        autobiography: autobiography,
        authorizedUser: authorizedUser,
        updateSocialLinks: this.updateSocialLinks
      });
    }
  }]);

  return DefaultSocialLinks;
}(React.Component);

_defineProperty(DefaultSocialLinks, "defaultProps", {
  authorizedUser: false
});