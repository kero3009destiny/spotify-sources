import { com as SortDirectionRoot } from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/SortDirection';
import { BffCreativeState } from './creatives';
import { BffFlightState } from './flights';
import { BffCampaignState } from './campaigns';

export type BffSortDirection = SortDirectionRoot.spotify.adstudiobff.proto.SortDirection;
export const SortDirection: Record<BffSortDirection, BffSortDirection> = {
  ASC: 'ASC',
  DESC: 'DESC',
};

export interface DateFilterParams {
  dateBegin?: string;
  dateEnd?: string;
  dateRangePreset?: string;
}

export interface ApiQueryParams {
  limit?: string;
  offset?: string;
}

export interface Paging {
  limit: number;
  offset: number;
  total?: number;
}

export type Order = 'ASC' | 'DESC';

export type EntityState = BffCampaignState | BffFlightState | BffCreativeState;
