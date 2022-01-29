import _classCallCheck from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.f39d079b-c786-470e-8124-0fbd7c8dd4b9/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import React from 'react';
import { spacer48, spacer32, screenXlMin } from '@spotify-internal/encore-web';
import { Screen } from '../../lib/useViewport';
var PADDING_NONMOBILE = parseInt(spacer48, 10);
var PADDING_MOBILE = parseInt(spacer32, 10);
var MAX_WIDTH_CONTAINER = parseInt(screenXlMin, 10);
var MAX_CONTENT_CONTAINER_WIDTH = 1680;

var getWidthByViewport = function getWidthByViewport(viewport) {
  var width = Math.min(window.innerWidth, MAX_WIDTH_CONTAINER);

  if (viewport <= Screen.XS) {
    return width - PADDING_MOBILE;
  }

  return Math.min(width, MAX_CONTENT_CONTAINER_WIDTH) - 2 * PADDING_NONMOBILE;
};

export var ResizeContainer = /*#__PURE__*/function (_React$Component) {
  _inherits(ResizeContainer, _React$Component);

  var _super = _createSuper(ResizeContainer);

  function ResizeContainer() {
    var _this;

    _classCallCheck(this, ResizeContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      width: getWidthByViewport(_this.props.viewport)
    });

    _defineProperty(_assertThisInitialized(_this), "resize", function () {
      _this.setState({
        width: getWidthByViewport(_this.props.viewport)
      });
    });

    return _this;
  }

  _createClass(ResizeContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.resize();
      window.addEventListener('resize', this.resize, false);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps !== this.props || nextProps.viewport !== this.props.viewport || nextState.width !== this.state.width;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.resize, false);
    }
  }, {
    key: "render",
    value: function render() {
      var width = this.state.width;
      var render = this.props.render;
      return render(width);
    }
  }]);

  return ResizeContainer;
}(React.Component);