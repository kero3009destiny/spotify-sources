import _asyncToGenerator from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/asyncToGenerator";
import _toConsumableArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _regeneratorRuntime from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/regenerator";
import React, { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { useT } from '@mrkt/features/i18n';
import { black, spacer16, ButtonTertiary, IconPlusAlt, spacer12, kleinBlue, violet } from '@spotify-internal/encore-web';
import { Combobox, NoResultsEntityOptionDisplay } from '@mrkt/features/combobox';
import { webgateFetchJson } from '@mrkt/features/webgate-fetch';
import styled from 'styled-components';
import { Container } from '@mrkt/features/badge/BadgeWithText/Container';
import { useTeamStore } from '../lib/store/useTeamStore';
import { useHistory, useLocation } from 'react-router';
import { IconBadge } from './IconBadge/IconBadge';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var EntityOption = styled.div.withConfig({
  displayName: "LabelSearchFormCombobox__EntityOption",
  componentId: "sc-1eq9eds-0"
})(["display:flex;z-index:99999;img{height:50px;margin-right:", ";width:50px;}"], spacer16);
var TextContainer = styled.div.withConfig({
  displayName: "LabelSearchFormCombobox__TextContainer",
  componentId: "sc-1eq9eds-1"
})(["display:inline;flex-direction:column;min-width:0;color:", ";"], black);
var CreateTeamActionContainer = styled(ButtonTertiary).withConfig({
  displayName: "LabelSearchFormCombobox__CreateTeamActionContainer",
  componentId: "sc-1eq9eds-2"
})(["color:", ";align-items:center;display:flex;justify-content:center;width:100%;&:hover{opacity:0.7;}svg{margin-right:", ";}"], kleinBlue, spacer12);

var serverResponseToTeamSearchResult = function serverResponseToTeamSearchResult(raw) {
  if (raw.responses.length === 0) {
    return [{
      id: 'empty-state',
      name: 'empty state',
      value: '',
      uri: ''
    }, {
      id: 'create-team',
      name: 'show create team button',
      uri: '',
      value: ''
    }];
  }

  return [].concat(_toConsumableArray(raw.responses.map(function (_ref) {
    var name = _ref.name,
        uri = _ref.uri;
    return {
      id: uri,
      name: name,
      uri: uri,
      value: name
    };
  })), [{
    id: 'create-team',
    name: 'show create team button',
    uri: '',
    value: ''
  }]);
};

export var LabelSearchFormCombobox = function LabelSearchFormCombobox(_ref2) {
  var accessSelectAction = _ref2.accessSelectAction,
      addTeamsSelectAction = _ref2.addTeamsSelectAction,
      onCreateTeamAction = _ref2.onCreateTeamAction;

  var _useTeamStore = useTeamStore(),
      hideBanner = _useTeamStore.hideBanner;

  var _useState = useState(''),
      inputValue = _useState[0],
      setInputValue = _useState[1];

  var _useState2 = useState([]),
      searchResults = _useState2[0],
      setSearchResults = _useState2[1];

  var t = useT();
  var history = useHistory();
  var location = useLocation();
  var ERROR_BANNER_ID = 'select-label-error-banner';
  var SUGGEST_DEBOUNCE_TIME = 300;
  var searchLabel = useCallback(debounce( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(term) {
      var inputValueCleaned, endpoint;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Removes -, :, [], (), & from the query, as we know they don't currently play nicely with the backend search
              inputValueCleaned = term.replace(/[-:[\]&()]/g, ' ');

              if (inputValueCleaned) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return");

            case 3:
              endpoint = "https://generic.wg.spotify.com/creator-search-service/v0/organizations?filter=label&q=".concat(encodeURIComponent(inputValueCleaned));
              webgateFetchJson(endpoint).then(function (res) {
                setSearchResults(_toConsumableArray(serverResponseToTeamSearchResult(res)));
              }).catch(function () {
                setSearchResults([]);
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }(), SUGGEST_DEBOUNCE_TIME), []);

  var handleChange = function handleChange(value) {
    setInputValue(value);
    searchLabel(value);
  };

  var handleSelect = function handleSelect(dataObj) {
    if (!dataObj || dataObj.name === 'empty state' || dataObj.name === 'show create team button') {
      return;
    }

    hideBanner(ERROR_BANNER_ID);
    accessSelectAction && accessSelectAction(dataObj);
    addTeamsSelectAction && addTeamsSelectAction(dataObj, history, location.search);
    setInputValue('');
  };

  var renderEntity = function renderEntity(entity) {
    var name = entity.name;

    if (name === 'empty state') {
      return /*#__PURE__*/_jsx(NoResultsEntityOptionDisplay, {
        inputValue: inputValue
      });
    }

    if (name === 'show create team button') {
      return /*#__PURE__*/_jsxs(CreateTeamActionContainer, {
        "data-testid": "create-new-team-button",
        "data-slo-id": "create-new-team-button",
        onClick: function onClick() {
          onCreateTeamAction(inputValue);
        },
        children: [/*#__PURE__*/_jsx(IconPlusAlt, {}), ' ', t('LABEL_SEARCH_COMBOBOX_CREATE_TEAM_BUTTON', 'Create new team', 'Create a new label team')]
      });
    }

    return /*#__PURE__*/_jsx(_Fragment, {
      children: /*#__PURE__*/_jsx(EntityOption, {
        "data-slo-id": "entity-option",
        "data-testid": "entity-option",
        children: /*#__PURE__*/_jsxs(Container, {
          children: [/*#__PURE__*/_jsx(IconBadge, {
            bgColor: violet,
            variant: "label"
          }), /*#__PURE__*/_jsx(TextContainer, {
            children: name
          })]
        })
      })
    });
  };

  return /*#__PURE__*/_jsx("div", {
    "data-testid": "label-search-form-combobox",
    children: /*#__PURE__*/_jsx(Combobox, {
      value: inputValue,
      label: t('LABEL_COMBOBOX_SEARCH_LABEL', 'Search labels', 'enter a label name to search'),
      options: searchResults,
      onChange: handleChange,
      onSelect: handleSelect,
      renderEntity: renderEntity
    })
  });
};