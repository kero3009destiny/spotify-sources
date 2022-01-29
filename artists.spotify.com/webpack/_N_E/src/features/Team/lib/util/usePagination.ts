// ignore-string-externalization
import { useMemo, useState } from 'react';
export var usePagination = function usePagination(items) {
  var itemsPerPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

  var _useState = useState(0),
      currentPage = _useState[0],
      setCurrentPage = _useState[1];

  var itemsOrBlank = items || [];
  var pageCount = Math.ceil(itemsOrBlank.length / itemsPerPage - 1);
  var rangeStart = currentPage * itemsPerPage + 1;
  var rangeEnd = (currentPage + 1) * itemsPerPage > itemsOrBlank.length ? itemsOrBlank.length : (currentPage + 1) * itemsPerPage;
  var range = "".concat(rangeStart, "-").concat(rangeEnd);
  var hasNext = currentPage !== pageCount;
  var hasPrevious = currentPage !== 0;

  var next = function next() {
    if (!hasNext) {
      return;
    }

    setCurrentPage(currentPage + 1);
  };

  var previous = function previous() {
    if (!hasPrevious) {
      return;
    }

    setCurrentPage(currentPage - 1);
  };

  var pageItems = useMemo(function () {
    if (!items) {
      return [];
    }

    if (items.length < itemsPerPage) {
      return items;
    }

    return items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  }, [currentPage, items, itemsPerPage]);
  return {
    pageItems: pageItems,
    pageCount: pageCount,
    currentPage: currentPage,
    next: next,
    previous: previous,
    hasNext: hasNext,
    hasPrevious: hasPrevious,
    range: range
  };
};