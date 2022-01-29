// ignore-string-externalization
import React, { useCallback, useEffect, useState } from 'react';
import throttle from 'lodash/throttle';
import { Link } from 'react-router-dom';
import { useRouter } from 'next/router';
import { EntityHeader, EntityTitle } from '@mrkt/features/StickyHeader';
import { useT } from '@mrkt/features/i18n';
import { Type, spacer24, NavBarList } from '@spotify-internal/encore-web-v3';
import { createUbiEventLogger } from '@mrkt/features/ubi';
import * as S from './styles';
import { CountryDropdown } from './CountryDropdown';
import { useViewport, Viewport } from '../../../shared/lib/useViewport';
import { EngagementPopover } from './EngagementPopover';
import { ubiAudienceSpec } from '../ubiAudienceSpec';
import { useCurrentOrgOrNull } from '../../artists/src/useCurrentOrgOrNull';
import { useHasEngagementMetricsV2 } from '../hooks/useHasEngagementMetricsV2';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function StickyHeader(props) {
  var title = props.title,
      artistId = props.artistId,
      _props$disableScroll = props.disableScroll,
      disableScroll = _props$disableScroll === void 0 ? false : _props$disableScroll;
  var MAIN_NAV_HEIGHT_OFFSET = 80;
  var MAIN_NAV_HEIGHT_OFFSET_MOBILE = 64;
  var viewport = useViewport();
  var router = useRouter();
  var hasEngagementMetricsV2 = useHasEngagementMetricsV2();
  var pathname = router.pathname;
  var extraSmall = viewport === Viewport.XS;

  var _useState = useState(false),
      stickyHeader = _useState[0],
      setStickyHeader = _useState[1];

  var t = useT();
  var org = useCurrentOrgOrNull();
  var orgUri = org && org.uri;
  var UBIEventLogger = createUbiEventLogger(artistId, orgUri);
  var handleScroll = useCallback(throttle(function () {
    if (window.scrollY > 100) {
      setStickyHeader(true);
    } else {
      setStickyHeader(false);
    }
  }, 100), []);
  useEffect(function () {
    if (!disableScroll) {
      window.scrollTo(0, 0);
      handleScroll();
      window.addEventListener('scroll', handleScroll, false);
    }

    return function () {
      if (!disableScroll) {
        window.removeEventListener('scroll', handleScroll, false);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  var getFilteredLocationSearch = function getFilteredLocationSearch() {
    var query = router.query;

    if (query.country) {
      // filter out other params like time-filter
      return "?country=".concat(query.country);
    }

    return '';
  };

  var tabs = /*#__PURE__*/_jsxs(NavBarList, {
    "data-testid": "tabbed-navbar",
    children: [/*#__PURE__*/_jsx(S.CustomNavBarListItem, {
      "data-testid": "tab-stats",
      label: t('AUDIENCE_STICKY_HDR_tab_stats', 'Stats', 'stats tab for audience page'),
      active: pathname === '/artist/[artistId]/audience' || pathname === '/artist/[artistId]/audience/stats',
      to: "/artist/".concat(artistId, "/audience/stats").concat(getFilteredLocationSearch()),
      component: Link,
      onClick: function onClick() {
        var overviewTabFactory = ubiAudienceSpec().audienceStatsVersionFactory().overviewTabFactory();
        var overviewTabHitReveal = overviewTabFactory.hitUiReveal();
        UBIEventLogger.logInteraction(overviewTabHitReveal);
      }
    }, "stats"), /*#__PURE__*/_jsx(S.CustomNavBarListItem, {
      "data-testid": "tab-engagement",
      label: t('AUDIENCE_STICKY_HDR_tab_engagement', 'Engagement', 'engagement tab for audience page'),
      active: pathname === '/artist/[artistId]/audience/engagement',
      to: "/artist/".concat(artistId, "/audience/engagement").concat(getFilteredLocationSearch()),
      component: Link,
      onClick: function onClick() {
        var engagementTabFactory = ubiAudienceSpec().audienceStatsVersionFactory().engagementTabFactory();
        var engagementTabHitReveal = engagementTabFactory.hitUiReveal();
        UBIEventLogger.logInteraction(engagementTabHitReveal);
      }
    }, "engagement"), /*#__PURE__*/_jsx("li", {
      children: /*#__PURE__*/_jsx(S.CustomTag, {
        children: t('AUDIENCE_STICKY_HDR_602d1f', 'Beta', '')
      })
    }), !stickyHeader && !extraSmall && /*#__PURE__*/_jsx("li", {
      children: /*#__PURE__*/_jsx(S.PopoverWrapper, {
        children: /*#__PURE__*/_jsx(EngagementPopover, {})
      })
    })]
  });

  return /*#__PURE__*/_jsx(S.Wrapper, {
    "data-testid": "sticky-header",
    children: /*#__PURE__*/_jsx(EntityHeader, {
      actions: !extraSmall ? /*#__PURE__*/_jsx(S.DropdownWrapper, {
        stickyHeader: stickyHeader,
        children: /*#__PURE__*/_jsx(CountryDropdown, {
          country: props.country,
          setCountry: props.setCountry
        })
      }) : undefined,
      renderTitle: function renderTitle(isSticky) {
        var formattedTitle = isSticky ? /*#__PURE__*/_jsx(S.StickyTitle, {
          children: title
        }) : /*#__PURE__*/_jsx(Type, {
          as: "span",
          variant: Type.heading1,
          children: title
        });
        return /*#__PURE__*/_jsx(EntityTitle, {
          title: formattedTitle,
          stickyHeader: isSticky
        });
      },
      stickyOffsetTop: extraSmall ? "".concat(MAIN_NAV_HEIGHT_OFFSET_MOBILE, "px") : "".concat(MAIN_NAV_HEIGHT_OFFSET, "px"),
      stickyOffsetLeft: extraSmall ? spacer24 : undefined,
      stickyHeader: stickyHeader,
      tabs: hasEngagementMetricsV2 ? tabs : undefined
    })
  });
}