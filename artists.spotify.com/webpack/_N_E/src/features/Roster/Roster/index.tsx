import React from 'react';
import { Type, spacer32 } from '@spotify-internal/encore-web';
import { ErrorBoundary } from '@mrkt/features/Platform';
import { DocumentTitle } from '@mrkt/features/document-title';
import { PageContainer } from '../../page';
import { ArtistsTable } from './ArtistsTable';
import { ErrorBoundaryFallback, LoadingFallback } from './fallbacks';
import { useIsMobile } from './data/useIsMobile';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function Roster() {
  var isMobile = useIsMobile();
  var t = useT();
  return /*#__PURE__*/_jsx(DocumentTitle, {
    title: "Roster - Spotify for Artists",
    children: /*#__PURE__*/_jsxs(PageContainer, {
      "data-testid": "roster",
      "data-slo-id": "roster",
      children: [/*#__PURE__*/_jsx(Type, {
        as: "h1",
        variant: "heading1",
        style: {
          paddingTop: spacer32
        },
        children: t('ROSTER_ALL_YOUR_ARTISTS', 'All your artists', 'The roster of artists you have access to')
      }), /*#__PURE__*/_jsx(ErrorBoundary, {
        name: "roster-view",
        fallback: /*#__PURE__*/_jsx(ErrorBoundaryFallback, {}),
        children: /*#__PURE__*/_jsx(React.Suspense, {
          fallback: LoadingFallback,
          children: /*#__PURE__*/_jsx(ArtistsTable, {
            isMobile: isMobile
          })
        })
      })]
    })
  });
}