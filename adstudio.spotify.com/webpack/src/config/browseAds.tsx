import React, { ReactElement } from 'react';
import { Trans } from 'react-i18next';
import i18n from 'i18next';
import styled from 'styled-components';

import { Type } from '@spotify-internal/encore-web';

import { ColumnSelection } from 'ducks/columns/types';

const StyledSpan = styled(Type.span)`
  font-style: italic;
`;

// Sourced from com/spotify/adstudiobff/column.proto - numbers in comments are their index value
export const SORT_FIELDS = {
  'start date': 'START_DATE', // 0
  'end date': 'END_DATE', // 1
  'ad name': 'FLIGHT_NAME', // 2
  status: 'STATUS', // 3
  'ads served': 'ADS_SERVED', // 4
  reach: 'ADS_SERVED_REACH', // 5
  ctr: 'CTR', // 6
  clicks: 'CLICKS', // 7
  frequency: 'ADS_SERVED_AVERAGE_FREQUENCY', // 8
  budgetConsumed: 'SPEND', // 9
  listens: 'LISTENS', // 10
  listenRate: 'LISTENS_RATE', // 11
  reachOfListens: 'LISTENS_REACH', // 12
  frequencyOfListens: 'LISTENS_AVERAGE_FREQUENCY', // 13
  costModel: 'COST_MODEL', // 14
  budget: 'BUDGET', // 15
  listeners: 'LISTENERS', // 22
  newListeners: 'NEW_LISTENERS', // 16
  intentRate: 'INTENT_RATE', // 17
  listenerConversionRate: 'LISTENER_CONVERSION_RATE', // 18
  newListenerConversionRate: 'NEW_LISTENER_CONVERSION_RATE', // 19
  avgStreamsPerListener: 'AVERAGE_STREAMS_PER_LISTENER', // 20
  avgStreamsPerNewListener: 'AVERAGE_STREAMS_PER_NEW_LISTENER', // 21
  completionRate: 'COMPLETION_RATE', // 25
  starts: 'STARTS', // 26
  firstQuartile: 'FIRST_QUARTILES', // 27
  secondQuartile: 'MIDPOINTS', // 28
  thirdQuartile: 'THIRD_QUARTILES', // 29
  fourthQuartile: 'COMPLETES', // 30
};

export const FILTERS = {
  'All ads': i18n.t('I18N_ALL_ADS', 'All ads'),
  Active: i18n.t('I18N_ACTIVE', 'Active'),
  Complete: i18n.t('I18N_COMPLETE', 'Complete'),
  Processing: i18n.t('I18N_PROCESSING', 'Processing'),
  'Pending approval': i18n.t('I18N_PENDING_APPROVAL', 'Pending approval'),
  Rejected: i18n.t('I18N_REJECTED', 'Rejected'),
  Ready: i18n.t('I18N_READY', 'Ready'),
  Stopped: i18n.t('I18N_STOPPED', 'Stopped'),
};

export const ORDERS = {
  ASC: 'asc',
  DESC: 'desc',
};

export const DEFAULT_PARAMS = {
  activePage: 1,
  offset: 0,
  orderBy: 'start date',
  order: ORDERS.DESC,
  searchWord: '',
  status: '',
};

export const RESET_PARAMS = {
  activePage: DEFAULT_PARAMS.activePage,
  orderBy: DEFAULT_PARAMS.orderBy,
  order: DEFAULT_PARAMS.order,
};

export const AD_FETCH_STATUSES = {
  REQUESTED: 'REQUESTED',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  NOT_FOUND: 'NOT_FOUND',
  ERROR: 'ERROR',
};

export const TOOLTIP_TEXT: Record<string, string | ReactElement> = {
  // Standard Tooltips
  ADS_SERVED: i18n.t(
    'I18N_TOOLTIP_TEXT_ADS_SERVED',
    'The total number of times your ad was delivered to Spotify users.',
  ),
  REACH: i18n.t(
    'I18N_TOOLTIP_TEXT_REACH',
    'The total number of unique users who have been served your ad.',
  ),
  PAID_LISTENS: i18n.t(
    'I18N_TOOLTIP_TEXT_PAID_LISTENS',
    'The total number of times your ad was played in full. Of the total ads served, only ad listens are paid by you.',
  ),
  REACH_OF_ADS_SERVED: i18n.t(
    'I18N_TOOLTIP_TEXT_REACH_OF_ADS_SERVED',
    'The number of unique users who received your ad. Because Spotify users are logged-in across devices, we can report on the total population of unique users that your ad reached.',
  ),
  AVG_FREQUENCY_ADS_SERVED: i18n.t(
    'I18N_TOOLTIP_TEXT_AVG_FREQUENCY_ADS_SERVED',
    'The average number of times each unique user was served your ad. This is equal to ads served / reach of ads served.',
  ),
  REACH_PAID_LISTENS: i18n.t(
    'I18N_TOOLTIP_TEXT_REACH_PAID_LISTENS',
    'The total number of unique users who listened to your ad in full.',
  ),
  AVG_FREQUENCY_PAID_LISTENS: i18n.t(
    'I18N_TOOLTIP_TEXT_AVG_FREQUENCY_PAID_LISTENS',
    'The average frequency of ad listens is the average number of times each unique user listened to your ad in full.',
  ),
  COMPLETION_RATE: i18n.t(
    'I18N_TOOLTIP_TEXT_COMPLETION_RATE',
    'The percentage of ad listens out of the total number of ads served.',
  ),
  CLICKS: i18n.t(
    'I18N_TOOLTIP_TEXT_CLICKS',
    'The total number of times users have clicked on your ad.',
  ),
  CTR: i18n.t(
    'I18N_TOOLTIP_TEXT_CTR:',
    'The click-through rate or “CTR” is equal to clicks / ads served.',
  ),
  CLICKS_CTR_PODCAST: i18n.t(
    'I18N_TOOLTIP_TEXT_CLICKS_CTR_PODCAST',
    "Clicks and CTR don't apply to campaigns that include podcast ad placements.",
  ),
  // Active Audio Tooltips
  LISTENS: (
    <Trans i18nKey="I18N_TOOLTIP_TEXT_LISTENS">
      The total number of times your ad was played in full. You’re only billed
      for completed ads. (Formerly <StyledSpan>ad listens</StyledSpan>)
    </Trans>
  ),

  LISTEN_RATE: (
    <Trans i18nKey="I18N_TOOLTIP_TEXT_LISTEN_RATE">
      The number of ad completes divided by the total number of impressions.
      (Formerly <StyledSpan>ad listen rate</StyledSpan>)
    </Trans>
  ),
  REACH_OF_LISTENS: (
    <Trans i18nKey="I18N_TOOLTIP_TEXT_REACH_OF_LISTENS">
      The number of unique users who heard your ad in full. (Formerly
      <StyledSpan>reach of ad listens</StyledSpan>)
    </Trans>
  ),
  AVG_FREQ_OF_LISTENS: (
    <Trans i18nKey="I18N_TOOLTIP_TEXT_AVG_FREQ_OF_LISTENS">
      The average number of times each unique user heard your ad in full.
      (Formerly <StyledSpan>frequency of ad listens</StyledSpan>)
    </Trans>
  ),
  // Audience Promotion
  LISTENERS: i18n.t(
    'I18N_TOOLTIP_TEXT_LISTENERS',
    'The number of Spotify users who streamed your music after hearing your ad.',
  ),
  NEW_LISTENERS: i18n.t(
    'I18N_TOOLTIP_TEXT_NEW_LISTENERS',
    'Listeners who didn’t stream your music in the 28 days before they heard your ad.',
  ),
  INTENT_RATE: i18n.t(
    'I18N_TOOLTIP_TEXT_INTENT_RATE',
    'The percentage of total listeners who took actions showing intent to stream your music again in the future. Actions include saving your music (by tapping the heart icon or “save”) or adding it to a playlist.',
  ),
  LISTENER_CONVERSION_RATE: i18n.t(
    'I18N_TOOLTIP_TEXT_LISTENER_CONVERSION_RATE',
    'The percentage of Spotify users who streamed your music after hearing your ad.',
  ),
  NEW_LISTENER_CONVERSION_RATE: i18n.t(
    'I18N_TOOLTIP_TEXT_NEW_LISTENER_CONVERSION_RATE',
    'The percentage of new listeners who streamed your music after hearing your ad.',
  ),
  AVG_LISTENER_STREAMS: i18n.t(
    'I18N_TOOLTIP_TEXT_AVG_LISTENER_STREAMS',
    'The average number of times each listener streamed your music after hearing your ad.',
  ),
  AVG_NEW_LISTENER_STREAMS: i18n.t(
    'I18N_TOOLTIP_TEXT_AVG_NEW_LISTENER_STREAMS',
    'The average number of times each new listener streamed your music after hearing your ad.',
  ),
};

// Column references are slightly different between 1:1:1 and 1:x:y but
// trying to keep the copy consolidated in one mapping
export const HIERARCHY_TOOLTIP_TEXT: Partial<Record<
  keyof ColumnSelection,
  string | ReactElement
>> = {
  // Standard Tooltips
  IMPRESSIONS: i18n.t(
    'I18N_TOOLTIP_TEXT_IMPRESSIONS_1XY',
    'The total number of ads served within the ad set.',
  ),
  REACH: i18n.t(
    'I18N_REACH_TOOLTIP',
    'The number of unique people who heard your ads within the ad sets.',
  ),
  FREQUENCY: i18n.t(
    'I18N_TOOLTIP_TEXT_FREQUENCY_1XY',
    'The average number of times each unique user listened to your ads within the ad sets in full.',
  ),
  LISTENS: TOOLTIP_TEXT.PAID_LISTENS,
  ADS_SERVED_REACH: TOOLTIP_TEXT.REACH_OF_ADS_SERVED,
  ADS_SERVED_AVERAGE_FREQUENCY: TOOLTIP_TEXT.AVG_FREQUENCY_ADS_SERVED,
  COMPLETION_RATE: i18n.t(
    'I18N_TOOLTIP_TEXT_COMPLETION_RATE_1XY',
    'The percentage of audio ads played to completion. Common reasons for incomplete audio ads include users muting or exiting the app during the ad.',
  ),
  CLICK: i18n.t(
    'I18N_TOOLTIP_TEXT_CLICKS_1XY',
    'The total number of times users have clicked on an ad within the ad sets.',
  ),
  CTR: i18n.t(
    'I18N_TOOLTIP_TEXT_CTR_1XY',
    'The click-through rate or “CTR” is equal to clicks / impressions.',
  ),
  FIRST_QUARTILE: i18n.t(
    'I18N_THE_PERCENTAGE_OF_ADS_SERVED_25',
    'The percentage of ads served that played to 25%',
  ),
  SECOND_QUARTILE: i18n.t(
    'I18N_THE_PERCENTAGE_OF_ADS_SERVED_50',
    'The percentage of ads served that played to 50%',
  ),
  THIRD_QUARTILE: i18n.t(
    'I18N_THE_PERCENTAGE_OF_ADS_SERVED_75',
    'The percentage of ads served that played to 75%',
  ),
  FOURTH_QUARTILE: i18n.t(
    'I18N_THE_PERCENTAGE_OF_ADS_SERVED_100',
    'The percentage of ads served that played to 100%',
  ),
  COST_MODEL: i18n.t(
    'I18N_TOOLTIP_TEXT_COST_MODEL',
    'This is the model we use to charge you for your ads. Ads are charged as cost per impression (CPM) or, in select markets, as cost per completed listen (CPCL) or cost per completed view (CPCV).',
  ),
  PACING: i18n.t(
    'I18N_PACING_TOOLTIP',
    '% of budget spent / % of time elapsed',
  ),
  // Active Audio Tooltips
  AD_LISTENS: TOOLTIP_TEXT.LISTENS,
  AD_LISTEN_RATE: TOOLTIP_TEXT.LISTEN_RATE,
  LISTENS_REACH: TOOLTIP_TEXT.REACH_OF_LISTENS,
  FREQUENCY_OF_LISTENS: TOOLTIP_TEXT.AVG_FREQ_OF_LISTENS,
  // Audience Promotion
  LISTENERS: TOOLTIP_TEXT.LISTENERS,
  NEW_LISTENERS: TOOLTIP_TEXT.NEW_LISTENERS,
  INTENT_RATE: TOOLTIP_TEXT.INTENT_RATE,
  LISTENER_CONVERSION_RATE: TOOLTIP_TEXT.LISTENER_CONVERSION_RATE,
  NEW_LISTENER_CONVERSION_RATE: TOOLTIP_TEXT.NEW_LISTENER_CONVERSION_RATE,
  AVERAGE_STREAMS_PER_LISTENER: TOOLTIP_TEXT.AVG_LISTENER_STREAMS,
  AVERAGE_STREAMS_PER_NEW_LISTENER: TOOLTIP_TEXT.AVG_NEW_LISTENER_STREAMS,
};

// TODO - replace HIERARCHY_TOOLTIP_TEXT with this once SPAN is released
export const HIERARCHY_TOOLTIP_TEXT_SPAN: Partial<Record<
  keyof ColumnSelection,
  string | ReactElement
>> = {
  // Standard Tooltips
  IMPRESSIONS: i18n.t(
    'I18N_TOOLTIP_TEXT_IMPRESSIONS_ON_SPOTIFY',
    'The total number of ads served within the ad set. Only for ads delivered on Spotify.',
  ),
  REACH: i18n.t(
    'I18N_TOOLTIP_TEXT_REACH_ON_SPOTIFY',
    'The number of unique people who heard your ads. Only for ads delivered on Spotify.',
  ),
  FREQUENCY: i18n.t(
    'I18N_TOOLTIP_TEXT_FREQUENCY_ON_SPOTIFY',
    'The average number of times each person heard your ads. Only for ads delivered on Spotify.',
  ),
  LISTENS: i18n.t(
    'I18N_TOOLTIP_TEXT_PAID_LISTENS_ON_SPOTIFY',
    'The total number of times your ad was played in full. Of the total ads served, only ad listens are paid by you. Only for ads delivered on Spotify.',
  ),
  ADS_SERVED_REACH: i18n.t(
    'I18N_TOOLTIP_TEXT_REACH_OF_ADS_SERVED_ON_SPOTIFY',
    'The number of unique users who received your ad. Because Spotify users are logged-in across devices, we can report on the total population of unique users that your ad reached. Only for ads delivered on Spotify.',
  ),
  ADS_SERVED_AVERAGE_FREQUENCY: i18n.t(
    'I18N_TOOLTIP_TEXT_AVG_FREQUENCY_ADS_SERVED_ON_SPOTIFY',
    'The average number of times each unique user was served your ad. This is equal to ads served / reach of ads served. Only for ads delivered on Spotify.',
  ),
  COMPLETION_RATE: i18n.t(
    'I18N_TOOLTIP_TEXT_COMPLETION_RATE_ON_SPOTIFY',
    'The percentage of audio ads played to completion. Common reasons for incomplete audio ads include users muting or exiting the app during the ad. Only for ads placed in music.',
  ),
  CLICK: i18n.t(
    'I18N_TOOLTIP_TEXT_CLICKS_ON_SPOTIFY',
    'The total number of times users have clicked on an ad within the ad sets. Only for ads delivered on Spotify.',
  ),
  CTR: i18n.t(
    'I18N_TOOLTIP_TEXT_CTR_ON_SPOTIFY_ON_SPOTIFY',
    'The click-through rate or “CTR” is equal to clicks / impressions. Only for ads delivered on Spotify.',
  ),
  FIRST_QUARTILE: i18n.t(
    'I18N_TOOLTIP_TEXT_PERCENTAGE_OF_ADS_SERVED_25_ON_SPOTIFY',
    'The percentage of ads served that played to 25%. Only for ads placed in music.',
  ),
  SECOND_QUARTILE: i18n.t(
    'I18N_TOOLTIP_TEXT_PERCENTAGE_OF_ADS_SERVED_50_ON_SPOTIFY',
    'The percentage of ads served that played to 50%. Only for ads placed in music.',
  ),
  THIRD_QUARTILE: i18n.t(
    'I18N_TOOLTIP_TEXT_PERCENTAGE_OF_ADS_SERVED_75_ON_SPOTIFY',
    'The percentage of ads served that played to 75%. Only for ads placed in music.',
  ),
  FOURTH_QUARTILE: i18n.t(
    'I18N_TOOLTIP_TEXT_PERCENTAGE_OF_ADS_SERVED_100_ON_SPOTIFY',
    'The percentage of ads served that played to 100%. Only for ads placed in music.',
  ),
  COST_MODEL: i18n.t(
    'I18N_TOOLTIP_TEXT_COST_MODEL',
    'This is the model we use to charge you for your ads. Ads are charged as cost per impression (CPM) or, in select markets, as cost per completed listen (CPCL) or cost per completed view (CPCV).',
  ),
  PACING: i18n.t(
    'I18N_PACING_TOOLTIP',
    '% of budget spent / % of time elapsed',
  ),
  // Active Audio Tooltips
  AD_LISTENS: (
    <Trans i18nKey="I18N_TOOLTIP_TEXT_LISTENS_ON_SPOTIFY">
      The total number of times your ad was played in full. You’re only billed
      for completed ads. (Formerly <StyledSpan>ad listens</StyledSpan>). Only
      for ads delivered on Spotify.
    </Trans>
  ),

  AD_LISTEN_RATE: (
    <Trans i18nKey="I18N_TOOLTIP_TEXT_LISTEN_RATE_ON_SPOTIFY">
      The number of ad completes divided by the total number of impressions.
      (Formerly <StyledSpan>ad listen rate</StyledSpan>). Only for ads delivered
      on Spotify.
    </Trans>
  ),
  LISTENS_REACH: (
    <Trans i18nKey="I18N_TOOLTIP_TEXT_REACH_OF_LISTENS_ON_SPOTIFY">
      The number of unique users who heard your ad in full. (Formerly
      <StyledSpan>reach of ad listens</StyledSpan>). Only for ads delivered on
      Spotify.
    </Trans>
  ),
  FREQUENCY_OF_LISTENS: (
    <Trans i18nKey="I18N_TOOLTIP_TEXT_AVG_FREQ_OF_LISTENS_ON_SPOTIFY">
      The average number of times each unique user heard your ad in full.
      (Formerly <StyledSpan>frequency of ad listens</StyledSpan>). Only for ads
      delivered on Spotify.
    </Trans>
  ),
  // Audience Promotion
  LISTENERS: i18n.t(
    'I18N_TOOLTIP_TEXT_LISTENERS_ON_SPOTIFY',
    'The number of Spotify users who streamed your music after hearing your ad. Only for ads delivered on Spotify.',
  ),
  NEW_LISTENERS: i18n.t(
    'I18N_TOOLTIP_TEXT_NEW_LISTENERS_ON_SPOTIFY',
    'Listeners who didn’t stream your music in the 28 days before they heard your ad. Only for ads delivered on Spotify.',
  ),
  INTENT_RATE: i18n.t(
    'I18N_TOOLTIP_TEXT_INTENT_RATE_ON_SPOTIFY',
    'The percentage of total listeners who took actions showing intent to stream your music again in the future. Actions include saving your music (by tapping the heart icon or “save”) or adding it to a playlist. Only for ads delivered on Spotify.',
  ),
  LISTENER_CONVERSION_RATE: i18n.t(
    'I18N_TOOLTIP_TEXT_LISTENER_CONVERSION_RATE_ON_SPOTIFY',
    'The percentage of Spotify users who streamed your music after hearing your ad. Only for ads delivered on Spotify.',
  ),
  NEW_LISTENER_CONVERSION_RATE: i18n.t(
    'I18N_TOOLTIP_TEXT_NEW_LISTENER_CONVERSION_RATE_ON_SPOTIFY',
    'The percentage of new listeners who streamed your music after hearing your ad. Only for ads delivered on Spotify.',
  ),
  AVERAGE_STREAMS_PER_LISTENER: i18n.t(
    'I18N_TOOLTIP_TEXT_AVG_LISTENER_STREAMS_ON_SPOTIFY',
    'The average number of times each listener streamed your music after hearing your ad. Only for ads delivered on Spotify.',
  ),
  AVERAGE_STREAMS_PER_NEW_LISTENER: i18n.t(
    'I18N_TOOLTIP_TEXT_AVG_NEW_LISTENER_STREAMS_ON_SPOTIFY',
    'The average number of times each new listener streamed your music after hearing your ad. Only for ads delivered on Spotify.',
  ),
};
