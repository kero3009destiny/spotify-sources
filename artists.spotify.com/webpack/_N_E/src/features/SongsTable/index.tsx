import _classCallCheck from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

// ignore-string-externalization
import React, { Component } from 'react'; // @ts-ignore

import styled from 'styled-components';
import { SortTable } from '@mrkt/features/stats-components';
import { SortOrder, useSortTableData } from '@mrkt/features/stats-components/utils';
import qs from 'query-string';
import { useCurrentArtistPermissions } from '../../features/artists';
import { Viewport } from '../../shared/lib/useViewport';
import { useSongsTableNormalizer, useGenerateHeaders } from './utils';
import { useSongRowSelectLogger } from '../Music/hooks/useMusicUbi';
import { jsx as _jsx } from "react/jsx-runtime";
var StyledSortTable = styled(SortTable).withConfig({
  displayName: "SongsTable__StyledSortTable",
  componentId: "sc-1peplrh-0"
})(["tbody > tr{cursor:pointer;}"]);

var SongsTable = /*#__PURE__*/function (_Component) {
  _inherits(SongsTable, _Component);

  var _super = _createSuper(SongsTable);

  function SongsTable() {
    var _this;

    _classCallCheck(this, SongsTable);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      sortKey: 'streams',
      sortOrder: SortOrder.DESC,
      isSorting: false
    });

    _defineProperty(_assertThisInitialized(_this), "onSort", function (sortKey) {
      var _this$state = _this.state,
          oldSortKey = _this$state.sortKey,
          oldSortOrder = _this$state.sortOrder;
      var sortOrder = oldSortOrder === SortOrder.DESC && sortKey === oldSortKey ? SortOrder.ASC : SortOrder.DESC;

      _this.setState({
        sortKey: sortKey,
        sortOrder: sortOrder,
        isSorting: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onRowClick", function (d, i) {
      _this.props.logSongRowClick(d.uri, i);

      _this.navigateToSongPage(d.uri);
    });

    _defineProperty(_assertThisInitialized(_this), "navigateToSongPage", function (uri) {
      var _this$props = _this.props,
          history = _this$props.history,
          artistId = _this$props.artistId;
      history.push({
        pathname: "/artist/".concat(artistId, "/song/").concat(uri.split(':')[2]),
        query: qs.parse(_this.props.location.search)
      });
    });

    return _this;
  }

  _createClass(SongsTable, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          data = _this$props2.data,
          timeFilter = _this$props2.timeFilter,
          viewport = _this$props2.viewport,
          showCanvasColumn = _this$props2.showCanvasColumn,
          artistPermissions = _this$props2.artistPermissions,
          generateHeader = _this$props2.generateHeader,
          normalizer = _this$props2.normalizer,
          sortTableData = _this$props2.sortTableData;
      var _this$state2 = this.state,
          sortKey = _this$state2.sortKey,
          sortOrder = _this$state2.sortOrder;

      var _generateHeader = generateHeader(viewport, showCanvasColumn),
          headers = _generateHeader.headers,
          colgroup = _generateHeader.colgroup;

      var filteredData = normalizer(data, timeFilter, viewport, artistPermissions);
      var sortedData = sortTableData(filteredData, sortKey, sortOrder).map(function (d, i) {
        return _objectSpread(_objectSpread({}, d), {}, {
          rank: i + 1
        });
      });
      return /*#__PURE__*/_jsx(StyledSortTable, {
        headers: headers,
        colgroup: colgroup,
        data: sortedData,
        primaryKey: "title",
        onSort: this.onSort,
        sortKey: sortKey,
        sortOrder: sortOrder // @ts-ignore
        ,
        onRowClick: this.onRowClick,
        "data-slo-id": "songs-table",
        hover: true
      });
    }
  }]);

  return SongsTable;
}(Component);
/* eslint-disable-next-line import/no-default-export */


_defineProperty(SongsTable, "defaultProps", {
  data: [],
  viewport: Viewport.LG,
  history: {
    push: function push() {}
  },
  location: {},
  timeFilter: '28day',
  logSongRowClick: function logSongRowClick() {}
});

export default function SongsTableHooks(props) {
  var artistPermissions = useCurrentArtistPermissions();
  var generateHeaders = useGenerateHeaders();
  var normalizer = useSongsTableNormalizer();
  var sortTableData = useSortTableData();
  var songSelectLogger = useSongRowSelectLogger();
  return /*#__PURE__*/_jsx(SongsTable, _objectSpread(_objectSpread({}, props), {}, {
    artistPermissions: artistPermissions,
    generateHeader: generateHeaders,
    normalizer: normalizer,
    sortTableData: sortTableData,
    logSongRowClick: songSelectLogger
  }));
}