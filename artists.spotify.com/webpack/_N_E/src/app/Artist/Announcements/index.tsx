import _classCallCheck from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _inherits from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import qs from 'query-string';
import { loadAnnouncements, updateAnnouncements, showS4AOnboardingSelector, WELCOME_MODAL } from '../../../shared/store';
import { S4AOnboardingModal } from './Onboarding/S4AOnboardingModal';
import { jsx as _jsx } from "react/jsx-runtime";
export var Announcements = /*#__PURE__*/function (_Component) {
  _inherits(Announcements, _Component);

  var _super = _createSuper(Announcements);

  function Announcements() {
    _classCallCheck(this, Announcements);

    return _super.apply(this, arguments);
  }

  _createClass(Announcements, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.loadAnnouncements([WELCOME_MODAL]);
    }
  }, {
    key: "twitterInstantAccess",
    value: function twitterInstantAccess() {
      var instantAccess = 'instant-access';
      var query = qs.parse(this.props.location.search);
      return instantAccess in query && query[instantAccess] === 'twitter';
    }
    /** Force onboarding modal open for testing purposes */

  }, {
    key: "showS4AOnboardingOverride",
    value: function showS4AOnboardingOverride() {
      var searchParams = new URLSearchParams(this.props.location.search);
      return searchParams.has('_s4a_onboarding');
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var showS4AOnboarding = this.props.showS4AOnboarding;

      if (this.showS4AOnboardingOverride() || showS4AOnboarding) {
        return /*#__PURE__*/_jsx(S4AOnboardingModal, {
          updateAnnouncements:
          /* istanbul ignore next */
          function updateAnnouncements() {
            return _this.props.updateAnnouncements([WELCOME_MODAL]);
          },
          twitterInstantAccess: this.twitterInstantAccess()
        });
      }

      return null;
    }
  }]);

  return Announcements;
}(Component);

_defineProperty(Announcements, "defaultProps", {
  loadAnnouncements: function loadAnnouncements() {},
  updateAnnouncements: function updateAnnouncements() {}
});

var mapStateToProps = createStructuredSelector({
  showS4AOnboarding: showS4AOnboardingSelector
});
/* eslint-disable-next-line import/no-default-export */

export default compose(withRouter, connect(mapStateToProps, {
  loadAnnouncements: loadAnnouncements,
  updateAnnouncements: updateAnnouncements
}))(Announcements);