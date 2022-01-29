import _classCallCheck from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _inherits from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import React, { Component } from 'react';
import styled from 'styled-components';
import { gray10 } from '@spotify-internal/encore-web-v3';
import { TableRow, TableCell } from '../../../../shared/components/Table';
import styles from './ConcertsListingRow.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var EmptyCell = styled.div.withConfig({
  displayName: "ConcertsListingEmptyRow__EmptyCell",
  componentId: "a0vvih-0"
})(["height:18px;background-color:", ";"], gray10);
export var ConcertsListingEmptyRow = /*#__PURE__*/function (_Component) {
  _inherits(ConcertsListingEmptyRow, _Component);

  var _super = _createSuper(ConcertsListingEmptyRow);

  function ConcertsListingEmptyRow() {
    _classCallCheck(this, ConcertsListingEmptyRow);

    return _super.apply(this, arguments);
  }

  _createClass(ConcertsListingEmptyRow, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isMobile = _this$props.isMobile,
          isSmallScreen = _this$props.isSmallScreen;
      var small = isMobile || isSmallScreen;
      return /*#__PURE__*/_jsxs(TableRow, {
        className: styles.concert_table_empty_row,
        children: [small && /*#__PURE__*/_jsxs(TableCell, {
          children: [' ', /*#__PURE__*/_jsx(EmptyCell, {})]
        }), small && /*#__PURE__*/_jsxs(TableCell, {
          children: [' ', /*#__PURE__*/_jsx(EmptyCell, {})]
        }), !small && /*#__PURE__*/_jsxs(TableCell, {
          children: [' ', /*#__PURE__*/_jsx(EmptyCell, {})]
        }), !small && /*#__PURE__*/_jsxs(TableCell, {
          children: [' ', /*#__PURE__*/_jsx(EmptyCell, {})]
        }), !small && /*#__PURE__*/_jsxs(TableCell, {
          children: [' ', /*#__PURE__*/_jsx(EmptyCell, {})]
        }), !small && /*#__PURE__*/_jsxs(TableCell, {
          children: [' ', /*#__PURE__*/_jsx(EmptyCell, {})]
        }), !small && /*#__PURE__*/_jsxs(TableCell, {
          children: [' ', /*#__PURE__*/_jsx(EmptyCell, {})]
        }), !small && /*#__PURE__*/_jsxs(TableCell, {
          children: [' ', /*#__PURE__*/_jsx(EmptyCell, {})]
        })]
      });
    }
  }]);

  return ConcertsListingEmptyRow;
}(Component);
/* eslint-disable-next-line import/no-default-export */

export default ConcertsListingEmptyRow;