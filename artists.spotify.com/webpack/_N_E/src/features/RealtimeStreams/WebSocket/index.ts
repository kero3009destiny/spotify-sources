// ignore-string-externalization
import { useEffect } from 'react'; // @ts-ignore

import { PropTypes } from 'prop-types';
import createDebug from 'debug';
var debug = createDebug('shared:WebSocket');
export function WebSocket(_ref) {
  var WebSocketImplementation = _ref.WebSocketImplementation,
      webSocketUrl = _ref.webSocketUrl,
      getDocumentHidden = _ref.getDocumentHidden,
      propsOnSocketMessage = _ref.onSocketMessage,
      children = _ref.children;
  useEffect(function () {
    var errorCount;
    var socket;
    var reconnectTimeout;

    function onVisibilityChange() {
      var hidden = getDocumentHidden();

      if (hidden && socket) {
        socket.close();
        socket = undefined;
      } else if (!hidden && !socket) {
        createSocket();
      }
    }

    function onSocketMessage(res) {
      propsOnSocketMessage(res);
    }

    function createSocket() {
      socket = new WebSocketImplementation(webSocketUrl);
      socket.addEventListener('message', onSocketMessage);
      socket.addEventListener('error', onSocketError);
      socket.addEventListener('open', onSocketOpen);
      socket.addEventListener('close', onSocketClose);
    }

    function onSocketOpen() {
      errorCount = 0;
    }

    function onSocketError(error) {
      debug('websocket:error', error);
    }

    function onSocketClose(_ref2) {
      var wasClean = _ref2.wasClean,
          code = _ref2.code,
          reason = _ref2.reason;
      window.clearTimeout(reconnectTimeout);
      reconnectTimeout = undefined;

      if (!wasClean) {
        debug("websocket closed with code ".concat(code));
        debug("websocket closed with reason ".concat(reason)); // exponential backoff when trying to open a new websocket, maxed at roughly a 2.5 hour timeout

        errorCount = Math.min(errorCount + 1, 16);
        reconnectTimeout = window.setTimeout(createSocket, Math.round(Math.exp(errorCount)));
      }
    }

    createSocket();
    document.addEventListener('visibilitychange', onVisibilityChange); // Specify how to clean up after this effect:

    return function cleanup() {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      socket.removeEventListener('message', onSocketMessage);
      socket.removeEventListener('error', onSocketError);
      socket.removeEventListener('open', onSocketOpen);
      socket.close();
      socket = undefined;
      window.clearTimeout(reconnectTimeout);
    };
  }, [webSocketUrl, WebSocketImplementation, getDocumentHidden, propsOnSocketMessage]);
  return children;
}
WebSocket.propTypes = {
  getDocumentHidden: PropTypes.func,
  WebSocketImplementation: PropTypes.func,
  onSocketMessage: PropTypes.func
};
WebSocket.defaultProps = {
  getDocumentHidden: function getDocumentHidden() {
    return document.hidden;
  },
  onSocketMessage: function onSocketMessage() {},
  WebSocketImplementation: window.WebSocket
};