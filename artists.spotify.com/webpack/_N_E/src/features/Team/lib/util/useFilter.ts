// ignore-string-externalization
import { useCallback, useMemo, useState } from 'react';
export var useFilter = function useFilter(items, match) {
  var initialFilterValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var _useState = useState(initialFilterValue),
      filter = _useState[0],
      setFilter = _useState[1];

  var safeMatch = useCallback(match, []);
  var filteredItems = useMemo(function () {
    if (!filter.trim()) {
      return items;
    }

    return items.filter(function (i) {
      return safeMatch(i, filter);
    });
  }, [filter, safeMatch, items]);
  return {
    setFilter: setFilter,
    filter: filter,
    filteredItems: filteredItems
  };
};