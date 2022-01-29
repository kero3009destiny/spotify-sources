import React, { Fragment } from 'react';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
export var useGetMessages = function useGetMessages() {
  var t = useT();
  var messages = {
    timelineMetricStream: function timelineMetricStream(value) {
      return /*#__PURE__*/_jsx(Fragment, {
        children: t('CHART_AGGREGATE_HDR_590935', "{value, plural,\n            one {{value} stream}\n            other {{value} streams}\n          }", 'Example Usage: 100 streams', {
          value: value
        })
      });
    },
    timelineMetricStreamMobile: function timelineMetricStreamMobile(value) {
      return /*#__PURE__*/_jsx(Fragment, {
        children: t('CHART_AGGREGATE_HDR_d72ae3', "{value, plural,\n            one {{value} Stream}\n            other {{value} Streams}\n          }", 'Example Usage: 100 Streams', {
          value: value
        })
      });
    },
    timelineMetricListener: function timelineMetricListener(value) {
      return /*#__PURE__*/_jsx(Fragment, {
        children: t('CHART_AGGREGATE_HDR_c05ed6', "{value, plural,\n            one {{value} listener}\n            other {{value} listeners}\n          }", 'Example Usage: 100 listeners', {
          value: value
        })
      });
    },
    timelineMetricListenerMobile: function timelineMetricListenerMobile(value) {
      return /*#__PURE__*/_jsx(Fragment, {
        children: t('CHART_AGGREGATE_HDR_3ff4ce', "{value, plural,\n            one {{value} Listener}\n            other {{value} Listeners}\n          }", 'Example Usage: 100 Listeners', {
          value: value
        })
      });
    },
    timelineMetricFollower: function timelineMetricFollower(value) {
      return /*#__PURE__*/_jsx(Fragment, {
        children: t('CHART_AGGREGATE_HDR_a03c25', "{value, plural,\n            one {{value} follower}\n            other {{value} followers}\n          }", 'Example Usage: 100 followers', {
          value: value
        })
      });
    },
    timelineMetricFollowerMobile: function timelineMetricFollowerMobile(value) {
      return /*#__PURE__*/_jsx(Fragment, {
        children: t('CHART_AGGREGATE_HDR_00a989', "{value, plural,\n            one {{value} Follower}\n            other {{value} Followers}\n          }", 'Example Usage: 100 Followers', {
          value: value
        })
      });
    },
    timelineMetricDelta28day: function timelineMetricDelta28day(value) {
      return /*#__PURE__*/_jsx(Fragment, {
        children: t('CHART_AGGREGATE_HDR_2d6b5e', '{value} change since last month', 'Example Usage: 2% change since last month', {
          value: value
        })
      });
    },
    timelineMetricDeltaall: function timelineMetricDeltaall() {
      return 'all';
    },
    timelineMetricDeltasince2015: function timelineMetricDeltasince2015() {
      return ' ';
    },
    timelineMetricDeltaLast5years: function timelineMetricDeltaLast5years() {
      return ' ';
    },
    timelineMetricDelta7day: function timelineMetricDelta7day(value) {
      return /*#__PURE__*/_jsx(Fragment, {
        children: t('CHART_AGGREGATE_HDR_627318', '{value} change since last week', 'Example Usage: 2% change since last week', {
          value: value
        })
      });
    },
    timelineMetricListener28: function timelineMetricListener28(value) {
      return /*#__PURE__*/_jsx(Fragment, {
        children: t('CHART_AGGREGATE_HDR_4e341f', "{value, plural,\n            one {1 monthly listener}\n            other {{value} monthly listeners}\n          }", 'Example Usage: 15 monthly listeners', {
          value: value
        })
      });
    },
    timelineMetricLast7day: function timelineMetricLast7day(value) {
      return /*#__PURE__*/_jsx(Fragment, {
        children: t('CHART_AGGREGATE_HDR_0c49ca', '{value} last 7 days', 'The {value} represents an increase in followers. Example Usage: 13,320 last 7 days.', {
          value: value
        })
      });
    },
    timelineMetricLast28day: function timelineMetricLast28day(value) {
      return /*#__PURE__*/_jsx(Fragment, {
        children: t('CHART_AGGREGATE_HDR_048953', '{value} last 28 days', 'The {value} represents an increase in followers. Example Usage: 564,225 last 28 days', {
          value: value
        })
      });
    },
    timelineMetricLastsince2015: function timelineMetricLastsince2015() {
      return ' ';
    },
    timelineMetricLastslast5years: function timelineMetricLastslast5years() {
      return ' ';
    },
    timelineMetricFan: function timelineMetricFan(value) {
      return /*#__PURE__*/_jsx(Fragment, {
        children: t('CHART_AGGREGATE_HDR_a5e4a8', "{value, plural,\n            one {1 fan}\n            other {{value} fans}\n          }", 'Example Usage: 24 fans.', {
          value: value
        })
      });
    },
    helpTooltipListeners: function helpTooltipListeners() {
      return t('CHART_AGGREGATE_HDR_46ebbf', 'We can’t show total unique listeners for the last 2 years.', '');
    },
    helpTooltipStreams: function helpTooltipStreams() {
      return t('CHART_AGGREGATE_HDR_197b41', 'We can’t show total streams at the moment.', '');
    },
    helpTooltipFollowers: function helpTooltipFollowers() {
      return t('CHART_AGGREGATE_HDR_b04302', 'We can’t show total followers at the moment.', '');
    }
  };
  return function getMessage(key) {
    return messages[key];
  };
};