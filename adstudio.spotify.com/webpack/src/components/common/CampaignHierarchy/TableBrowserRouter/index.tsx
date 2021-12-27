import React, { ComponentType, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { routerActions } from 'react-router-redux';
import qs from 'query-string';

import TableBrowser, {
  PathnameAndSearch,
  TableBrowserProps,
} from '@spotify-internal/adstudio-shared/lib/components/TSTableBrowser';

import {
  dateBegin as dateBeginKey,
  dateEnd as dateEndKey,
  dateRangePresetKey,
} from 'components/common/CampaignHierarchy/DateFilter';
import {
  DateDropdownOptionKeys,
  QueryParamDateFormat,
} from 'components/common/CampaignHierarchy/DateFilter/constants';
import { sanitizeDates } from 'components/common/CampaignHierarchy/DateFilter/DateFilterHelpers';

interface TableBrowserRouterProps
  extends Omit<TableBrowserProps, 'onLoadParams' | 'onChangeParams'> {
  changeRouteParams: (params: PathnameAndSearch, action: any) => void;
  tablePathname: string;
}

export class TableBrowserRouter extends PureComponent<TableBrowserRouterProps> {
  onLoadParams = (params: PathnameAndSearch): void => {
    const sanitizedParams = this.sanitizeParams(params);
    this.props.changeRouteParams({ ...sanitizedParams }, routerActions.replace);
  };

  onChangeParams = (params: PathnameAndSearch) => {
    this.props.changeRouteParams(params, routerActions.push);
  };

  fallbackToLifetime = (urlSearchParams: URLSearchParams) => {
    urlSearchParams.delete(dateBeginKey);
    urlSearchParams.delete(dateEndKey);
    urlSearchParams.set(dateRangePresetKey, DateDropdownOptionKeys.LIFETIME);
  };

  sanitizeParams = (params: PathnameAndSearch) => {
    const { pathname, search } = params;
    const urlSearchParams = new URLSearchParams(search);

    if (urlSearchParams.has(dateRangePresetKey)) {
      const dateRangePreset = urlSearchParams.get(dateRangePresetKey) as string;

      if (dateRangePreset === DateDropdownOptionKeys.CUSTOM) {
        const dateBegin = urlSearchParams.get(dateBeginKey);
        const dateEnd = urlSearchParams.get(dateEndKey);

        if (dateBegin && dateEnd) {
          const sanitizedDates = sanitizeDates({
            dateBegin,
            dateEnd,
          });

          if (!sanitizedDates) {
            this.fallbackToLifetime(urlSearchParams);
          } else {
            urlSearchParams.set(
              dateBeginKey,
              sanitizedDates.dateRangeStart.format(QueryParamDateFormat),
            );
            urlSearchParams.set(
              dateEndKey,
              sanitizedDates.dateRangeEnd.format(QueryParamDateFormat),
            );
          }
        } else if (dateBegin || dateEnd) {
          // presume one is missing, cannot infer from missing data, fallback to lifetime.
          this.fallbackToLifetime(urlSearchParams);
        }
      } else {
        urlSearchParams.delete(dateBeginKey);
        urlSearchParams.delete(dateEndKey);

        if (!(dateRangePreset in DateDropdownOptionKeys)) {
          urlSearchParams.set(
            dateRangePresetKey,
            DateDropdownOptionKeys.LIFETIME,
          );
        }
      }
    }
    return {
      pathname,
      search: urlSearchParams.toString(),
    };
  };

  render() {
    return (
      <TableBrowser
        {...this.props}
        onLoadParams={this.onLoadParams}
        onChangeParams={this.onChangeParams}
      />
    );
  }
}

// TODO: need to upgrade redux to 6.x in order to annotate with Dispatch
export const mapDispatchToProps = (dispatch: TSFixMe) => {
  return {
    location: window.location,
    changeRouteParams: (
      { pathname, search }: PathnameAndSearch,
      routingAction: typeof routerActions.push | typeof routerActions.replace,
    ) => {
      dispatch(
        routingAction({
          pathname,
          query: qs.parse(search),
        }),
      );
    },
  };
};

export type ConnectedTableBrowserRouterProps = Omit<
  TableBrowserRouterProps,
  'location' | 'changeRouteParams'
>;

export type ConnectedTableBrowserRouterType = ComponentType<
  ConnectedTableBrowserRouterProps
>;

export const ConnectedTableBrowserRouter = withRouter(
  connect(null, mapDispatchToProps)(TableBrowserRouter),
) as ConnectedTableBrowserRouterType;
