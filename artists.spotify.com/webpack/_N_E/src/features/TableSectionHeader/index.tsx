import _slicedToArray from "/var/jenkins_home/workspace/tingle.6c662e67-baf8-4d1a-9d12-994578922c84/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Dropdown, DropdownLink, DropdownList, DropdownTrigger, IconDownloadAlt, ButtonIcon, Tooltip, Type } from '@spotify-internal/encore-web-v3';
import { TooltipTrigger } from '@mrkt/features/TooltipTrigger';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { useT } from '@mrkt/features/i18n';
import styles from './index.module.scss';
import { Viewport, useViewport } from '../../shared/lib/useViewport';
import { keyboardNavigation, useDropdownLinkFocus, useDropdownLinkIndex } from '../Dropdown/';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var qaId = 'header-text';
var defaultTimeFilter = '28day';
var StyledDropdownTrigger = styled(DropdownTrigger).withConfig({
  displayName: "TableSectionHeader__StyledDropdownTrigger",
  componentId: "n6q0t4-0"
})(["min-width:150px;"]);
export function TableSectionHeader(props) {
  var csvTooltip = props.csvTooltip,
      customTitle = props.customTitle,
      exportUrl = props.exportUrl,
      filterOptions = props.filterOptions,
      handleFilterChange = props.handleFilterChange,
      iconAlignment = props.iconAlignment,
      selectedFilter = props.selectedFilter,
      title = props.title,
      titleAlignLeft = props.titleAlignLeft,
      trackingId = props.trackingId;

  var _useState = useState(false),
      showDropdown = _useState[0],
      setShowDropdown = _useState[1];

  var t = useT();
  var viewport = useViewport();
  var extraSmall = viewport === Viewport.XS;
  var small = viewport === Viewport.SM;

  var _useDropdownLinkIndex = useDropdownLinkIndex(filterOptions, defaultTimeFilter),
      _useDropdownLinkIndex2 = _slicedToArray(_useDropdownLinkIndex, 2),
      selectedDropdownIndex = _useDropdownLinkIndex2[0],
      setSelectedDropdownIndex = _useDropdownLinkIndex2[1];

  var handleKeyDown = keyboardNavigation(filterOptions, selectedDropdownIndex, setSelectedDropdownIndex, setShowDropdown, onFilterChange);
  var selectedTimeFilter = filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.find(function (filter) {
    return filter.value === selectedFilter;
  });
  useDropdownLinkFocus(showDropdown, 'date-range-dropdown');

  function onFilterChange(value) {
    handleFilterChange(value);

    if (trackingId) {
      sendEvent({
        eventCategory: trackingId,
        eventAction: 'selectDropdown',
        eventLabel: value
      });
    }
  }

  return /*#__PURE__*/_jsxs("div", {
    className: cn(styles.header, titleAlignLeft && styles['header--left']),
    children: [/*#__PURE__*/_jsx("div", {
      className: styles['header-title-container'],
      children: customTitle ? title : /*#__PURE__*/_jsx(Type, {
        as: "h2",
        variant: "heading2",
        className: cn(styles['header-title'], titleAlignLeft && styles['header-title--left']),
        "data-testid": qaId,
        children: title
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: styles['header-controls'],
      children: [!extraSmall && /*#__PURE__*/_jsx("div", {
        className: cn(styles['header-controls-icons'], (!iconAlignment || iconAlignment === 'left') && styles['header-controls-icons--left'], iconAlignment === 'right' && styles['header-controls-icons--right']),
        children: csvTooltip && !small && /*#__PURE__*/_jsx("div", {
          className: styles['header-icon-download'],
          children: /*#__PURE__*/_jsx(TooltipTrigger, {
            placement: iconAlignment === 'right' ? 'topLeft' : 'top',
            tooltipId: "csv-tooltip",
            tooltip: /*#__PURE__*/_jsx(Tooltip, {
              children: csvTooltip
            }),
            children: /*#__PURE__*/_jsx(ButtonIcon, {
              component: "a",
              "data-testid": "csv-download",
              "aria-labelledby": "csv-tooltip",
              target: "_self",
              href: exportUrl,
              className: styles['header-icon-download-link'],
              children: /*#__PURE__*/_jsx(IconDownloadAlt, {
                "aria-hidden": "true"
              })
            })
          })
        })
      }), selectedTimeFilter && /*#__PURE__*/_jsx(StyledDropdownTrigger, {
        "aria-label": t('TABLE_SECTION_HDR_fb9be0', 'Filter the songs table by time period.', ''),
        "data-testid": "date-range-dropdown",
        overlay: showDropdown && /*#__PURE__*/_jsx(DropdownList, {
          onKeyDown: function onKeyDown(e) {
            return handleKeyDown(e);
          },
          onBlur: function onBlur() {
            return setShowDropdown(false);
          },
          id: "date-range-dropdown",
          "aria-activedescendant": selectedFilter,
          children: filterOptions.map(function (filter, index) {
            return /*#__PURE__*/_jsx(DropdownLink, {
              as: "li",
              role: "option",
              id: filter.value,
              "data-testid": "music-time-filter-".concat(filter.value),
              onFocus: function onFocus() {
                setSelectedDropdownIndex(index);
              },
              onClick: function onClick() {
                setSelectedDropdownIndex(index);
                onFilterChange(filter.value);
              },
              selected: index === selectedDropdownIndex,
              "aria-selected": index === selectedDropdownIndex,
              children: filter.label
            }, filter.value);
          })
        }),
        onShow: function onShow() {
          setShowDropdown(true);
        },
        onHide: function onHide() {
          return setShowDropdown(false);
        },
        children: /*#__PURE__*/_jsx(Dropdown, {
          id: "dropdown-toggle",
          "aria-labelledby": "dropdown-label dropdown-toggle",
          "aria-expanded": showDropdown || undefined,
          children: selectedTimeFilter === null || selectedTimeFilter === void 0 ? void 0 : selectedTimeFilter.label
        })
      })]
    })]
  });
}