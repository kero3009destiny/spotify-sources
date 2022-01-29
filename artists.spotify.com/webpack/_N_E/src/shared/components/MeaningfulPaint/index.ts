import _classCallCheck from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _inherits from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import React from 'react';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';

function logFirstMeaningfulPaint() {
  if (!logFirstMeaningfulPaint.called && 'Performance' in window) {
    logFirstMeaningfulPaint.called = true;
    sendEvent({
      eventCategory: 'Performance Metrics',
      eventAction: 'first-meaningful-paint',
      eventValue: performance.now(),
      nonInteraction: true
    }
    /* nonInteraction appears not to be in this type, but leaving for now, to be safe */
    );
  }
}

export var MeaningfulPaint = /*#__PURE__*/function (_React$Component) {
  _inherits(MeaningfulPaint, _React$Component);

  var _super = _createSuper(MeaningfulPaint);

  function MeaningfulPaint() {
    _classCallCheck(this, MeaningfulPaint);

    return _super.apply(this, arguments);
  }

  _createClass(MeaningfulPaint, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      logFirstMeaningfulPaint();
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return MeaningfulPaint;
}(React.Component);