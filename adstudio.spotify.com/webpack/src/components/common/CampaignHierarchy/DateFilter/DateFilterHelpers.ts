import moment, { Moment } from 'moment';

import {
  com as DateRangeProto,
  DateRange,
} from '@spotify-internal/adstudio-bff-clients/models/com/spotify/adstudiobff/proto/DateRange';

import { DateRangeMoment } from './DateFilterComponent';

import { DateDropdownOptionKeys } from './constants';

import { DateFilterParams } from 'types/common/state/api';

type IDateRange = DateRangeProto.spotify.adstudiobff.proto.IDateRange;

/*
  Returns undefined if start is in the future, which resets to Lifetime
  Clamps end date to today otherwise
*/
export const sanitizeDates = (
  params: DateFilterParams,
): DateRangeMoment | undefined => {
  const dateBegin = moment(params.dateBegin);
  let dateEnd = moment(params.dateEnd);

  // If the start is somehow in the future, treat as Lifetime
  if (dateBegin.isAfter(moment.now())) return undefined;
  // If the end is somehow in the future but the start isn't, assume timezone issue and reset end to today
  if (dateEnd.isAfter(moment.now()))
    dateEnd = moment()
      .hours(0)
      .minutes(0)
      .seconds(0);

  return {
    dateRangeStart: dateBegin,
    dateRangeEnd: dateEnd,
  };
};

export const getDateRange = (
  params: DateFilterParams,
  currentDate: Moment = moment().startOf('day'),
): DateRangeMoment | undefined => {
  const lastXDaysEndDate = currentDate.clone().subtract(1, 'day');
  switch (params.dateRangePreset) {
    case DateDropdownOptionKeys.LAST_SEVEN_DAYS: {
      return {
        dateRangeStart: lastXDaysEndDate.clone().subtract(6, 'days'),
        dateRangeEnd: lastXDaysEndDate,
      };
    }
    case DateDropdownOptionKeys.LAST_FOURTEEN_DAYS: {
      return {
        dateRangeStart: lastXDaysEndDate.clone().subtract(13, 'days'),
        dateRangeEnd: lastXDaysEndDate,
      };
    }
    case DateDropdownOptionKeys.LAST_THIRTY_DAYS: {
      return {
        dateRangeStart: lastXDaysEndDate.clone().subtract(29, 'days'),
        dateRangeEnd: lastXDaysEndDate,
      };
    }
    case DateDropdownOptionKeys.LAST_NINETY_DAYS: {
      return {
        dateRangeStart: lastXDaysEndDate.clone().subtract(89, 'days'),
        dateRangeEnd: lastXDaysEndDate,
      };
    }
    case DateDropdownOptionKeys.PAST_MONTH: {
      return {
        dateRangeStart: currentDate
          .clone()
          .subtract(1, 'months')
          .startOf('month'),
        dateRangeEnd: currentDate
          .clone()
          .subtract(1, 'months')
          .endOf('month'),
      };
    }
    case DateDropdownOptionKeys.MONTH_TO_DATE: {
      return {
        dateRangeStart: currentDate.clone().startOf('month'),
        dateRangeEnd: currentDate,
      };
    }
    case DateDropdownOptionKeys.CUSTOM: {
      return sanitizeDates(params);
    }
    default: {
      return undefined;
    }
  }
};

const hasDateRange = (params: DateFilterParams): boolean =>
  params.dateBegin !== undefined && params.dateEnd !== undefined;

const isLifetime = (params: DateFilterParams): boolean =>
  params.dateRangePreset === undefined ||
  params.dateRangePreset === DateDropdownOptionKeys.LIFETIME;

// Returns true if params specify a valid date range to filter by (not lifetime)
export const hasDateParams = (params: DateFilterParams): boolean =>
  !isLifetime(params) &&
  !(
    params.dateRangePreset === DateDropdownOptionKeys.CUSTOM &&
    !hasDateRange(params)
  );

export const dateFormatter = (dateRange: DateRangeMoment): string => {
  const currentYear = moment().year();

  return Object.values(dateRange).some(
    (date: Moment) => date.year() !== currentYear,
  )
    ? 'MMM DD YYYY'
    : 'MMM DD';
};

interface RequestWithDateFilter {
  setReportDateFilter: (dateRange: IDateRange) => void;
}

export const setDateParamsOnRequest = (
  params: DateFilterParams = {},
  request: RequestWithDateFilter,
): void => {
  if (hasDateParams(params)) {
    const dateRange = getDateRange(params)!;

    request.setReportDateFilter(
      new DateRange()
        .setDateBegin(dateRange.dateRangeStart.utc(true).toISOString())
        .setDateEnd(dateRange.dateRangeEnd.utc(true).toISOString()),
    );
  }
};
