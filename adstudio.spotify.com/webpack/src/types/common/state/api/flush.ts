import { Timestamp } from './timestamp';

export interface Money {
  amount: number;
  currency: string;
}

export interface Stats {
  adsServed?: number;
  reach?: number;
  frequency?: number;
  paidListens?: number;
  reachPaidListens?: number;
  frequencyPaidListens?: number;
  clicks?: number;
  ctr?: number;
  completionRate?: number;
  budgetConsumed?: Money;
  listeners?: number;
  newListeners?: number;
  intentRate?: number;
  listenerConversionRate?: number;
  newListenerConversionRate?: number;
  averageStreamsPerListener?: number;
  averageStreamsPerNewListener?: number;
  streams?: number;
  newListenerStreams?: number;
  quartiles?: Quartiles;
  externalImpressions?: number;
}

export const emptyStats: Stats = {
  adsServed: 0,
  reach: 0,
  frequency: 0,
  paidListens: 0,
  reachPaidListens: 0,
  frequencyPaidListens: 0,
  clicks: 0,
  ctr: 0,
  completionRate: 0,
  budgetConsumed: {
    amount: 0,
    currency: 'USD',
  },
  listeners: 0,
  newListeners: 0,
  intentRate: 0,
  listenerConversionRate: 0,
  newListenerConversionRate: 0,
  averageStreamsPerListener: 0,
  averageStreamsPerNewListener: 0,
  streams: 0,
  newListenerStreams: 0,
  quartiles: {
    firstQuartile: 0,
    midpoint: 0,
    thirdQuartile: 0,
    complete: 0,
  },
  externalImpressions: 0,
};

export interface AudienceStat {
  name: string;
  adsServed?: SimpleAudienceStat;
  paidListens?: SimpleAudienceStat;
  reach?: SimpleAudienceStat;
  listeners?: ScmAudienceStat;
  newListeners?: ScmAudienceStat;
  streams?: ScmAudienceStat;
  avgStreams?: ScmAudienceStat;
  avgNewListenerStreams?: ScmAudienceStat;
  conversionRate?: ScmAudienceStat;
  newListenersConversionRate?: ScmAudienceStat;
  intentRate?: ScmAudienceStat;
  clicks?: SimpleAudienceStat;
  ctr?: SimpleAudienceStat;
}

export interface SimpleAudienceStat {
  base: number;
  percentage: number;
}

export interface ScmAudienceStat {
  base: number;
  percentage: number;
  isStarred: boolean;
}

export interface DailyCPCL {
  adsServed: number;
  paidListens: number;
  spend: number;
  clicks: number;
  externalImpressions: number;
  timestamp: Timestamp;
  scm?: DailySCM;
}

export interface DailyCPM {
  adsServed: number;
  reach: number;
  spend: number;
  clicks: number;
  externalImpressions: number;
  timestamp: Timestamp;
  scm?: DailySCM;
}

export interface DailySCM {
  listeners: number;
  newListeners: number;
}

export interface FlightStatMetadata {
  adjustedStartDate: Timestamp;
  adjustedEndDate: Timestamp;
  adjustedPostCampaignDate?: Timestamp;
}

export interface Quartiles {
  firstQuartile: number;
  midpoint: number;
  thirdQuartile: number;
  complete: number;
}

export interface LifetimeCPCL {
  adsServed: number;
  reach: number;
  frequency: number;
  paidListens: number;
  reachPaidListens: number;
  frequencyPaidListens: number;
  clicks: number;
  ctr: number;
  completionRate: number;
  budgetConsumed: number;
  listeners: number;
  newListeners: number;
  intentRate: number;
  listenerConversionRate: number;
  newListenerConversionRate: number;
  averageStreamsPerListener: number;
  averageStreamsPerNewListener: number;
  quartiles: Quartiles;
  starts: number;
  externalImpressions: number;
  budgetSpentOnSpotify: number;
  budgetSpentOffSpotify: number;
}

export interface LifetimeCPM {
  adsServed: number;
  reach: number;
  completionRate: number;
  frequency: number;
  clicks: number;
  ctr: number;
  budgetConsumed: number;
  listeners: number;
  newListeners: number;
  intentRate: number;
  listenerConversionRate: number;
  newListenerConversionRate: number;
  averageStreamsPerListener: number;
  averageStreamsPerNewListener: number;
  quartiles: Quartiles;
  starts: number;
  externalImpressions: number;
  budgetSpentOnSpotify: number;
  budgetSpentOffSpotify: number;
}
