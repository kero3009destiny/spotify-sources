import React from 'react';
import { Type } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
export function Forbidden() {
  var t = useT();
  return /*#__PURE__*/_jsx(Type, {
    as: "h1",
    variant: "body1",
    children: t('ROSTER_FORBIDDEN', 'No permission to see this page', 'Not allowed to see the page')
  });
}