import React, { useMemo } from 'react';
import { PaginationControls } from '@spotify-internal/encore-web';
import { jsxs as _jsxs } from "react/jsx-runtime";
export function PaymentHistoryPagination(props) {
  var _props$page = props.page,
      pageSize = _props$page.pageSize,
      offset = _props$page.offset,
      count = _props$page.count,
      onPageChange = props.onPageChange;
  var pageEndRange = useMemo(function () {
    var endRange = offset + (pageSize - 1);
    if (endRange > count) return count;
    return endRange;
  }, [offset, pageSize, count]);
  var pageNumber = Math.ceil(offset / pageSize);
  var lastPageNumber = Math.ceil(count / pageSize);

  var onIncrement = function onIncrement() {
    return onPageChange(pageNumber + 1);
  };

  var onDecrement = function onDecrement() {
    return onPageChange(pageNumber - 1);
  };

  return /*#__PURE__*/_jsxs(PaginationControls, {
    onIncrement: pageNumber < lastPageNumber ? onIncrement : undefined,
    onDecrement: pageNumber > 1 ? onDecrement : undefined,
    children: [offset, "-", pageEndRange, " of ", count]
  });
}