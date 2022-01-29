import React from 'react';
import { EmptyState, EmptyStateTitle, EmptyStateButton, IconExclamationAlt, redLight } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { Page } from '../features/page';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function AppError() {
  var t = useT();
  return /*#__PURE__*/_jsx(Page, {
    children: /*#__PURE__*/_jsxs(EmptyState, {
      variant: "fullscreen",
      icon: IconExclamationAlt,
      iconBackgroundColor: redLight,
      children: [/*#__PURE__*/_jsx(EmptyStateTitle, {
        children: t('APP_ERROR_TITLE', 'Something went wrong.', 'Title of the application error page.')
      }), /*#__PURE__*/_jsx(EmptyStateButton, {
        onClick: function onClick() {
          return window.location.reload();
        },
        children: t('APP_ERROR_RELOAD', 'Reload', 'Button that reloads the application when clicked.')
      })]
    })
  });
}