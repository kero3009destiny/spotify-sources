import React, { PureComponent } from 'react';
import moment from 'moment';

import { FiltersComponentProps } from '@spotify-internal/adstudio-shared/lib/components/TSTableBrowser';

import { AnalyticsContextConsumer } from 'components/common/AnalyticsContext';

import DateFilterComponent, { DateRangeMoment } from './DateFilterComponent';

import { DateFilterParams } from 'types/common/state/api';
import { CampaignsQueryParams } from 'types/common/state/api/campaigns';
import { CreativesQueryParams } from 'types/common/state/api/creatives';
import { FlightsQueryParams } from 'types/common/state/api/flights';

export interface DateFilterProps extends FiltersComponentProps {}

export const dateBegin: keyof DateFilterParams = 'dateBegin';
export const dateEnd: keyof DateFilterParams = 'dateEnd';
export const dateRangePresetKey: keyof DateFilterParams = 'dateRangePreset';
const sortDirection:
  | keyof FlightsQueryParams
  | keyof CampaignsQueryParams
  | keyof CreativesQueryParams = 'sortDirection';
const sortCriteria:
  | keyof FlightsQueryParams
  | keyof CampaignsQueryParams
  | keyof CreativesQueryParams = 'sortCriteria';

class DateFilter extends PureComponent<DateFilterProps> {
  static defaultProps = {
    tableParams: {},
  };

  render() {
    const tableParams = this.props.tableParams as DateFilterParams;

    const dateRangeParams =
      tableParams[dateBegin] && tableParams[dateEnd]
        ? ({
            dateRangeStart: moment(tableParams[dateBegin]),
            dateRangeEnd: moment(tableParams[dateEnd]),
          } as DateRangeMoment)
        : undefined;
    const dateRangePresetParams = tableParams[dateRangePresetKey];

    return (
      <AnalyticsContextConsumer>
        {({ category, logUserAction }) => (
          <DateFilterComponent
            dateRangePreset={dateRangePresetParams}
            dateRange={dateRangeParams}
            handleChange={(dateRange, dateRangePreset) => {
              logUserAction({
                category,
                label: 'date_filter_selected',
                params: {
                  dateRangeValue: dateRange
                    ? JSON.stringify(dateRange)
                    : dateRangePreset,
                },
              });
              this.props.handleFilterChange({
                [dateBegin]: dateRange?.dateRangeStart,
                [dateEnd]: dateRange?.dateRangeEnd,
                // set any sort criteria to undefined since it's not supported in agg flush
                [sortDirection]: undefined,
                [sortCriteria]: undefined,
                [dateRangePresetKey]: dateRangePreset,
              });
            }}
          />
        )}
      </AnalyticsContextConsumer>
    );
  }
}

export default DateFilter;
