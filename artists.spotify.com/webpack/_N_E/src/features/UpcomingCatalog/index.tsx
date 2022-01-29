import * as React from 'react';
import styled from 'styled-components';
import { cssColorValue, Type, ButtonTertiary, Table, TableRow, TableHeaderCell, spacer32, spacer40, spacer12 } from '@spotify-internal/encore-web';
import { DocumentTitle } from '@mrkt/features/document-title';
import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { useEnhanceFeatures } from '../enhanceFeatures';
import { useUpcomingCatalog, useUpcomingDocumentTitle, useIsXSmallScreen } from './data';
import { UpcomingRowWithState, UpcomingRowMobileWithState } from './UpcomingTable';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var StyleEmptyStateContainer = styled.div.attrs({
  'data-testid': 'upcoming-section'
}).withConfig({
  displayName: "UpcomingCatalog__StyleEmptyStateContainer",
  componentId: "sc-7ko0q6-0"
})(["margin-top:", ";max-width:", ";text-align:", ";"], spacer40, function (props) {
  return props.isXSmallScreen ? null : '650px';
}, function (props) {
  return props.isXSmallScreen ? 'center' : 'start';
});
var StyleUpcomingContainer = styled.div.attrs({
  'data-testid': 'upcoming-section'
}).withConfig({
  displayName: "UpcomingCatalog__StyleUpcomingContainer",
  componentId: "sc-7ko0q6-1"
})(["margin-bottom:", ";"], spacer32);
var MobileUpcomingHeader = styled.div.withConfig({
  displayName: "UpcomingCatalog__MobileUpcomingHeader",
  componentId: "sc-7ko0q6-2"
})(["border-bottom:1px solid ", ";color:", ";font-size:10px;font-weight:400;letter-spacing:0.025em;padding:", ";text-transform:uppercase;"], cssColorValue('decorativeSubdued'), cssColorValue('textSubdued'), spacer12);
export function UpcomingCatalog() {
  return /*#__PURE__*/_jsx(React.Suspense, {
    fallback: /*#__PURE__*/_jsx(LoadingIndicator, {}),
    children: /*#__PURE__*/_jsx(RawUpcomingCatalog, {})
  });
}

function RawUpcomingCatalog() {
  var t = useT();
  var response = useUpcomingCatalog();
  var isXSmallScreen = useIsXSmallScreen();
  var documentTitle = useUpcomingDocumentTitle();

  var _useEnhanceFeatures = useEnhanceFeatures(),
      hasCanvasAccess = _useEnhanceFeatures.hasCanvasAccess,
      hasStorylineAccess = _useEnhanceFeatures.hasStorylineAccess;

  var hasEnhancedAccess = hasCanvasAccess || hasStorylineAccess;
  var dialogRootRef = React.useRef(null);
  var enhancedColHeader = '';

  if (hasCanvasAccess && hasStorylineAccess) {
    enhancedColHeader = t('CANVAS_AND_STORYLINES', 'Canvas & Storylines', 'Names of product features');
  } else if (hasCanvasAccess) {
    enhancedColHeader = t('CANVAS', 'Canvas', 'Name of a product feature');
  } else if (hasStorylineAccess) {
    enhancedColHeader = t('STORYLINES', 'Storylines', 'Name of a product feature');
  }

  if (response.status === 500) {
    return /*#__PURE__*/_jsx(DocumentTitle, {
      title: documentTitle,
      children: /*#__PURE__*/_jsx(StyleEmptyStateContainer, {
        isXSmallScreen: isXSmallScreen,
        children: /*#__PURE__*/_jsx("div", {
          "data-testid": "upcoming-releases--error-msg",
          children: t('URP-05b246', 'Something went wrong...', '')
        })
      })
    });
  }

  if (response.status === 403) {
    return /*#__PURE__*/_jsx(DocumentTitle, {
      title: documentTitle,
      children: /*#__PURE__*/_jsxs(StyleEmptyStateContainer, {
        isXSmallScreen: isXSmallScreen,
        children: [/*#__PURE__*/_jsx(Type.p, {
          "data-testid": "upcoming-releases--no-access-msg",
          children: t('URP-0c1022', 'To see upcoming releases, ask your team to give you editor access.', '')
        }), /*#__PURE__*/_jsx(ButtonTertiary, {
          component: "a",
          condensed: true,
          semanticColor: "textBrightAccent",
          buttonSize: "sm",
          target: "_blank",
          rel: "noopener noreferrer",
          href: "https://artists.spotify.com/help/article/access-levels",
          children: t('URP-33a365', 'Learn More', '')
        })]
      })
    });
  }

  if (response.status === 204) {
    return /*#__PURE__*/_jsx(DocumentTitle, {
      title: documentTitle,
      children: /*#__PURE__*/_jsx(StyleUpcomingContainer, {
        children: /*#__PURE__*/_jsxs(StyleEmptyStateContainer, {
          isXSmallScreen: isXSmallScreen,
          children: [/*#__PURE__*/_jsx(Type.p, {
            "data-testid": "upcoming-releases--empty-msg",
            children: t('URP-26ca77', 'When you have unreleased music you’ll find it here. Note: expect a gap between the date you upload music to a distributor or label, and when it appears here. This can be several days depending on the distributor.', '')
          }), /*#__PURE__*/_jsx(Type.p, {
            children: t('URP-a8b667', "This is also where you'll pitch a song to Spotify's editors for playlist consideration.", '')
          }), /*#__PURE__*/_jsx(ButtonTertiary, {
            "aria-label": t('URP-1a59c8', 'Learn More about pitching to editors', ''),
            component: "a",
            condensed: true,
            semanticColor: "textBrightAccent",
            buttonSize: "sm",
            target: "_blank",
            rel: "noopener noreferrer",
            href: "/help/article/pitching-music-to-playlist-editors",
            children: t('URP-33a365', 'Learn More', '')
          })]
        })
      })
    });
  }

  return /*#__PURE__*/_jsxs(DocumentTitle, {
    title: documentTitle,
    children: [/*#__PURE__*/_jsx(StyleUpcomingContainer, {
      children: isXSmallScreen ? /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(MobileUpcomingHeader, {
          "data-testid": "upcoming-releases-header--mobile",
          children: t('URP-faa300', 'Releases', 'Releases is another name for an album')
        }), response.payload.upcoming_releases.map(function (release) {
          return /*#__PURE__*/_jsx(UpcomingRowMobileWithState, {
            release: release,
            submission: response.payload.submission
          }, release.release.id);
        })]
      }) : /*#__PURE__*/_jsxs(Table, {
        children: [/*#__PURE__*/_jsxs("colgroup", {
          children: [/*#__PURE__*/_jsx("col", {
            width: "38%"
          }), /*#__PURE__*/_jsx("col", {}), hasEnhancedAccess && /*#__PURE__*/_jsx("col", {}), /*#__PURE__*/_jsx("col", {
            width: "15%"
          }), /*#__PURE__*/_jsx("col", {})]
        }), /*#__PURE__*/_jsx("thead", {
          children: /*#__PURE__*/_jsxs(TableRow, {
            children: [/*#__PURE__*/_jsx(TableHeaderCell, {
              "data-testid": "upcoming-releases-header--desktop",
              children: t('URP-faa300', 'Releases', 'Releases is another name for an album')
            }), /*#__PURE__*/_jsx(TableHeaderCell, {
              children: t('URP-4c1abd', 'Playlist pitch', 'The current state of your playlist pitch to Spotify editorial')
            }), hasEnhancedAccess && /*#__PURE__*/_jsx(TableHeaderCell, {
              "data-testid": "upcoming-table--enhanced-th",
              children: enhancedColHeader
            }), /*#__PURE__*/_jsx(TableHeaderCell, {
              align: "right",
              title: t('URP-08b00e', 'The date your release will go live on Spotify.', ''),
              children: t('URP-15b931', 'Release Date', '')
            }), /*#__PURE__*/_jsx(TableHeaderCell, {})]
          })
        }), /*#__PURE__*/_jsx("tbody", {
          children: response.payload.upcoming_releases.map(function (release) {
            return /*#__PURE__*/_jsx(UpcomingRowWithState, {
              release: release,
              submission: response.payload.submission,
              dialogRootRef: dialogRootRef
            }, release.release.id);
          })
        })]
      })
    }), /*#__PURE__*/_jsxs(Type.p, {
      variant: Type.body2,
      semanticColor: "textSubdued",
      children: [/*#__PURE__*/_jsx(Type, {
        weight: Type.bold,
        children: t('URP-ef62ce', 'Looking for your newest release? ', '')
      }), t('URP-01d9f7', 'It can take several days for new music to get from your upload to Upcoming, depending on which distributor or label you use.', '')]
    }), /*#__PURE__*/_jsx("div", {
      ref: dialogRootRef
    })]
  });
}