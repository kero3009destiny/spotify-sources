import _classCallCheck from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _inherits from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import React, { Component } from 'react';
import { TableColgroup } from '../../../../shared/components/Table';
import { jsx as _jsx } from "react/jsx-runtime";
var mobileCols = [{
  key: 'date',
  colWidth: '*'
}, {
  key: 'actions',
  colWidth: 40
}];
var tabletCols = [{
  key: 'date',
  colWidth: '*'
}, {
  key: 'actions',
  colWidth: 40
}];
var desktopCols = [{
  key: 'date',
  colWidth: 320
}, {
  key: 'venue',
  colWidth: 220
}, {
  key: 'ticketingPartner',
  colWidth: 80
}, {
  key: 'actions',
  colWidth: 60
}];
var widescreenCols = [{
  key: 'date',
  colWidth: 320
}, {
  key: 'venue',
  colWidth: 220
}, {
  key: 'ticketingPartner',
  colWidth: 140
}, {
  key: 'actions',
  colWidth: 60
}];
export var ConcertsListingColgroup = /*#__PURE__*/function (_Component) {
  _inherits(ConcertsListingColgroup, _Component);

  var _super = _createSuper(ConcertsListingColgroup);

  function ConcertsListingColgroup() {
    _classCallCheck(this, ConcertsListingColgroup);

    return _super.apply(this, arguments);
  }

  _createClass(ConcertsListingColgroup, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isMediumScreen = _this$props.isMediumScreen,
          isMobile = _this$props.isMobile,
          isSmallScreen = _this$props.isSmallScreen;

      if (isMobile) {
        return /*#__PURE__*/_jsx(TableColgroup, {
          cols: mobileCols
        });
      }

      if (isSmallScreen) {
        return /*#__PURE__*/_jsx(TableColgroup, {
          cols: tabletCols
        });
      }

      if (isMediumScreen) {
        return /*#__PURE__*/_jsx(TableColgroup, {
          cols: desktopCols
        });
      }

      return /*#__PURE__*/_jsx(TableColgroup, {
        cols: widescreenCols
      });
    }
  }]);

  return ConcertsListingColgroup;
}(Component);
/* eslint-disable-next-line import/no-default-export */

export default ConcertsListingColgroup;