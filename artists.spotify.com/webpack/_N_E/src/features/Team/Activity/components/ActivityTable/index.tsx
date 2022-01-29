import React, { useEffect, useRef } from 'react';
import { LoadingIndicator, Table, TableCell, TableHeaderCell, TableRow, Type } from '@spotify-internal/encore-web';
import { ActivityCell } from './ActivityCell';
import { TeamMemberCell } from './TeamMemberCell';
import { apiItemToActivityFeedItem } from '../../lib/models/ActivityFeedItem';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { isToday } from '../../../lib/util/formatDateLocal';
import { LoadMore } from '../LoadMore';
import { useDateTimeFormatter, useT } from '@mrkt/features/i18n';
import { useActivityLoadMoreButtonLogger } from '../../lib/hooks/useActivityUbi'; // focusing on the first activity loaded after LoadMore button is clicked to solve:
// a11y/focus-order issue https://bbc.github.io/gel/components/load-more

import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useExpandedFocus = function useExpandedFocus(ref, page, index) {
  useEffect(function () {
    if (!page || !index) {
      return;
    }

    ref.current && index === page * 50 && ref.current.focus();
  }, [index, page, ref]);
};

var ActivityTableRow = function ActivityTableRow(_ref) {
  var activity = _ref.activity,
      page = _ref.page,
      index = _ref.index;

  var _useTeamStore = useTeamStore(),
      currentTeamDetails = _useTeamStore.currentTeamDetails,
      layoutType = _useTeamStore.layoutType;

  var t = useT();
  var formatter = useDateTimeFormatter({
    dateStyle: 'medium',
    timeStyle: 'short'
  });
  var todayFormatter = useDateTimeFormatter({
    timeStyle: 'short'
  });
  var formattedDate = isToday(activity.timestamp) ? t('ACTIVITY_TABLE_TIMESTAMP', 'Today, {time}', 'This activity happened today', {
    time: todayFormatter.format(new Date(activity.timestamp))
  }) : formatter.format(new Date(activity.timestamp));
  var tableRowRef = useRef(null);
  useExpandedFocus(tableRowRef, page, index);

  if (!currentTeamDetails) {
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  return /*#__PURE__*/_jsxs(TableRow, {
    "data-testid": "activity-table-row",
    tabIndex: 0,
    ref: tableRowRef,
    children: [/*#__PURE__*/_jsx(TableCell, {
      children: /*#__PURE__*/_jsx(ActivityCell, {
        currentTeamDetails: currentTeamDetails,
        activity: activity
      })
    }), layoutType === 'full' && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(TableCell, {
        children: /*#__PURE__*/_jsx(TeamMemberCell, {
          currentTeamDetails: currentTeamDetails,
          activity: activity
        })
      }), /*#__PURE__*/_jsx(TableCell, {
        children: formattedDate
      })]
    })]
  }, index);
};

export var ActivityTable = function ActivityTable(_ref2) {
  var activityFeed = _ref2.activityFeed;

  var _useTeamStore2 = useTeamStore(),
      layoutType = _useTeamStore2.layoutType;

  var t = useT();
  var logLoadMoreButton = useActivityLoadMoreButtonLogger();
  var data = activityFeed.data,
      error = activityFeed.error,
      fetchNextPage = activityFeed.fetchNextPage,
      isFetchingNextPage = activityFeed.isFetchingNextPage,
      status = activityFeed.status;

  if (status === 'loading' || !data) {
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  var currentPage = data.pages.length - 1;
  var endOfFeed = data && data.pages[currentPage].page_token.length === 0;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(Table, {
      "data-testid": "activity-table",
      children: [/*#__PURE__*/_jsx("thead", {
        children: /*#__PURE__*/_jsxs(TableRow, {
          children: [/*#__PURE__*/_jsx(TableHeaderCell, {
            children: t('ACTIVITY_TABLE_HEADER', 'Activity', 'Table header for Activities')
          }), layoutType === 'full' && /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(TableHeaderCell, {
              children: t('TEAM_MEMBER_TABLE_HEADER', 'Team Member', 'Table header for team members')
            }), /*#__PURE__*/_jsx(TableHeaderCell, {
              children: t('DATE_TABLE_HEADER', 'Date', 'Table header for Date')
            })]
          })]
        })
      }), /*#__PURE__*/_jsx("tbody", {
        children: data && data.pages.map(function (group, pageIndex) {
          return group.activity.map(apiItemToActivityFeedItem).map(function (activity, rowIndex) {
            return /*#__PURE__*/_jsx(ActivityTableRow, {
              activity: activity,
              index: pageIndex > 0 ? pageIndex * 50 + rowIndex : rowIndex,
              page: currentPage
            }, rowIndex);
          });
        })
      })]
    }), isFetchingNextPage && /*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx(LoadingIndicator, {})
    }), error && /*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx(Type, {
        children: t('ACTIVITY_ERROR_MESSAGE', 'Something went wrong loading data.', 'Something went wrong loading the data')
      })
    }), !endOfFeed && data && /*#__PURE__*/_jsx(LoadMore, {
      onClick: function onClick() {
        fetchNextPage();
        logLoadMoreButton();
      }
    })]
  });
};