// ignore-string-externalization
import React from 'react';
import { TableCell } from '@spotify-internal/encore-web';
import { useDateTimeFormatter } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
export function DateCell(props) {
  var formatter = useDateTimeFormatter({
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  var formattedDate = '-';

  if (props.displayDate) {
    var parts = props.displayDate.split('-');
    var date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    formattedDate = formatter.format(date);
  }

  return /*#__PURE__*/_jsx(TableCell, {
    align: "right",
    children: formattedDate
  });
}