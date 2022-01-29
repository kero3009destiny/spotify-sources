import _classCallCheck from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import { Component } from 'react';
import { compose } from 'redux';
import createDebug from 'debug';
import { createWebSocket } from './createWebSocket';
import { withDeprecatedCurrentArtist } from '../../features/artists';
var debug = createDebug('components:ArtistLiveListeners');

var ArtistLiveListenersComponent = /*#__PURE__*/function (_Component) {
  _inherits(ArtistLiveListenersComponent, _Component);

  var _super = _createSuper(ArtistLiveListenersComponent);

  function ArtistLiveListenersComponent() {
    var _this;

    _classCallCheck(this, ArtistLiveListenersComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "reconnectTimeout", void 0);

    _defineProperty(_assertThisInitialized(_this), "socket", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      listeners: -1
    });

    _defineProperty(_assertThisInitialized(_this), "errorCount", 0);

    _defineProperty(_assertThisInitialized(_this), "onVisibilityChange", function () {
      var hidden = _this.props.getDocumentHidden();

      if (hidden && _this.socket) {
        _this.closeSocket();
      } else if (!hidden && !_this.socket) {
        _this.createSocket();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSocketMessage", function (_ref) {
      var data = _ref.data;
      var listeners = JSON.parse(data).data;
      if (listeners !== _this.state.listeners) _this.setState({
        listeners: listeners
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSocketClose", function (_ref2) {
      var wasClean = _ref2.wasClean,
          code = _ref2.code,
          reason = _ref2.reason;
      window.clearTimeout(_this.reconnectTimeout);
      _this.reconnectTimeout = undefined;

      if (!wasClean) {
        debug("websocket closed with code ".concat(code));
        debug("websocket closed with reason ".concat(reason)); // exponential backoff when trying to open a new websocket, maxed at roughly a 2.5 hour timeout

        _this.errorCount = Math.min(_this.errorCount + 1, 16);
        _this.reconnectTimeout = window.setTimeout(_this.createSocket, Math.round(Math.exp(_this.errorCount)));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getWebSocketUrl", function () {
      return "wss://artistinsights-realtime3.spotify.com/ws-web/artist/listeners/".concat(_this.props.artist.id);
    });

    _defineProperty(_assertThisInitialized(_this), "createSocket", function () {
      var _this$props$WebSocket = _this.props.WebSocketImplementation,
          WebSocketImplementation = _this$props$WebSocket === void 0 ? window.WebSocket : _this$props$WebSocket; // if no WebSocketImplementation then exit early

      if (!WebSocketImplementation) return;

      var socketUrl = _this.getWebSocketUrl(); // Yes, we are indeed hardcoding that domain here
      // 1) iOS Safari apparently cannot handle the local proxy
      // 2) Staging does not work at all (Shibboleth IdP does not pass through websocket requests)


      _this.socket = createWebSocket(socketUrl, WebSocketImplementation);

      _this.socket.addEventListener('message', _this.onSocketMessage);

      _this.socket.addEventListener('error', function (error) {
        return debug('websocket:error', error);
      });

      _this.socket.addEventListener('open', function () {
        _this.errorCount = 0;
      });

      _this.socket.addEventListener('close', _this.onSocketClose);
    });

    _defineProperty(_assertThisInitialized(_this), "closeSocket", function () {
      _this.socket.close();

      _this.socket = undefined;
    });

    return _this;
  }

  _createClass(ArtistLiveListenersComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.createSocket();
      document.addEventListener('visibilitychange', this.onVisibilityChange);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('visibilitychange', this.onVisibilityChange);

      if (this.socket) {
        this.socket.removeEventListener('message', this.onSocketMessage);
        this.socket.close();
        this.socket = undefined;
      }

      window.clearTimeout(this.reconnectTimeout);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var render = this.props.render;
      var listeners = this.state.listeners;
      return render(listeners, function () {
        return _this2.createSocket();
      }, function () {
        return _this2.closeSocket();
      });
    }
  }]);

  return ArtistLiveListenersComponent;
}(Component);

_defineProperty(ArtistLiveListenersComponent, "defaultProps", {
  getDocumentHidden: function getDocumentHidden() {
    return document.hidden;
  }
});

export var ArtistLiveListeners = compose(withDeprecatedCurrentArtist)( // @ts-ignore
ArtistLiveListenersComponent);