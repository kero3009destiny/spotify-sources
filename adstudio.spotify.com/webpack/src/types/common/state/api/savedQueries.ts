import { com as SavedQueryModel } from '@spotify-internal/dunder-client/models/com/spotify/ads/dunder/v1/SavedQuery';
import { com as SavedQueryResponseModel } from '@spotify-internal/dunder-client/models/com/spotify/ads/dunder/v1/GetSavedQueriesResponse';
import { com as CampaignParamsModel } from '@spotify-internal/dunder-client/models/com/spotify/ads/dunder/v1/CampaignParams';
import { com as FlightParamsModel } from '@spotify-internal/dunder-client/models/com/spotify/ads/dunder/v1/FlightParams';
import { com as CreativeParamsModel } from '@spotify-internal/dunder-client/models/com/spotify/ads/dunder/v1/CreativeParams';
import { com as DateRangeParamsModel } from '@spotify-internal/dunder-client/models/com/spotify/ads/dunder/v1/DateRangeParams';
import { com as ReportDateRangeModel } from '@spotify-internal/dunder-client/models/com/spotify/ads/dunder/v1/ReportDateRange';
import { com as CreateSavedQueryResponseModel } from '@spotify-internal/dunder-client/models/com/spotify/ads/dunder/v1/CreateSavedQueryResponse';

export type SavedQuery = SavedQueryModel.spotify.ads.dunder.v1.ISavedQuery;
export type SavedQueriesResponse = SavedQueryResponseModel.spotify.ads.dunder.v1.IGetSavedQueriesResponse;
export type EntityDimensionType = SavedQueryModel.spotify.ads.dunder.v1.SavedQuery.EntityDimension;
export type StatusType = SavedQueryModel.spotify.ads.dunder.v1.SavedQuery.EntityDimension;
export type CampaignParams = CampaignParamsModel.spotify.ads.dunder.v1.ICampaignParams;
export type FlightParams = FlightParamsModel.spotify.ads.dunder.v1.IFlightParams;
export type CreativeParams = CreativeParamsModel.spotify.ads.dunder.v1.ICreativeParams;
export type DateRangeParams = DateRangeParamsModel.spotify.ads.dunder.v1.IDateRangeParams;
export type DateRangePresetType = DateRangeParamsModel.spotify.ads.dunder.v1.DateRangeParams.DateRangePreset;
export type ReportDateRangeParams = ReportDateRangeModel.spotify.ads.dunder.v1.IReportDateRange;
export type CreateSavedQueryResponse = CreateSavedQueryResponseModel.spotify.ads.dunder.v1.ICreateSavedQueryResponse;

export const EntityDimension: Record<
  EntityDimensionType,
  EntityDimensionType
> = {
  ENTITY_DIMENSION_UNSPECIFIED: 'ENTITY_DIMENSION_UNSPECIFIED',
  CAMPAIGNS: 'CAMPAIGNS',
  FLIGHTS: 'FLIGHTS',
  CREATIVES: 'CREATIVES',
};

export const DateRangePresets: Record<
  DateRangePresetType,
  DateRangePresetType
> = {
  DATE_RANGE_PRESET_UNSPECIFIED: 'DATE_RANGE_PRESET_UNSPECIFIED',
  CUSTOM: 'CUSTOM',
  MONTH_TO_DATE: 'MONTH_TO_DATE',
  PAST_MONTH: 'PAST_MONTH',
  LIFETIME: 'LIFETIME',
  LAST_7_DAYS: 'LAST_7_DAYS',
  LAST_14_DAYS: 'LAST_14_DAYS',
  LAST_30_DAYS: 'LAST_30_DAYS',
  LAST_90_DAYS: 'LAST_90_DAYS',
};

// Map from voltron URL values in DateFilter/constants.ts to values used by dunder API
export const DateRangePresetsUrlToApi: Record<string, DateRangePresetType> = {
  LAST_SEVEN_DAYS: 'LAST_7_DAYS',
  LAST_FOURTEEN_DAYS: 'LAST_14_DAYS',
  LAST_THIRTY_DAYS: 'LAST_30_DAYS',
  LAST_NINETY_DAYS: 'LAST_90_DAYS',
};

// Map from dunder API values to voltron URL values
export const DateRangePresetsApiToUrl: Partial<Record<
  DateRangePresetType,
  string
>> = {
  LAST_7_DAYS: 'LAST_SEVEN_DAYS',
  LAST_14_DAYS: 'LAST_FOURTEEN_DAYS',
  LAST_30_DAYS: 'LAST_THIRTY_DAYS',
  LAST_90_DAYS: 'LAST_NINETY_DAYS',
};
