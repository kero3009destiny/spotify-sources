// ignore-string-externalization
import { useState } from 'react';
export function useDropdownLinkIndex(filterOptions, defaultTimeFilter) {
  var defaultDropdownIndex = filterOptions.map(function (option) {
    return option.value;
  }).indexOf(defaultTimeFilter);

  var _useState = useState(defaultDropdownIndex),
      selectedDropdownIndex = _useState[0],
      setSelectedDropdownIndex = _useState[1];

  return [selectedDropdownIndex, setSelectedDropdownIndex];
}