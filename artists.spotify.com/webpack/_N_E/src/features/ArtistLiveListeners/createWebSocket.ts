export var createWebSocket = function createWebSocket(url, WebSocketImplementation) {
  return new WebSocketImplementation(url);
};