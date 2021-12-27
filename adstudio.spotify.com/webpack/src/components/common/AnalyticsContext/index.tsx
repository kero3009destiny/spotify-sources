import React, { useCallback, useContext } from 'react';
import { connect, useDispatch } from 'react-redux';

import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';

import { DEFAULT_ANALYTIC_VALUES } from './constants';

import { GlobalAnalyticValues } from './types';

interface DispatchProps {
  logUserAction: (evt: GoogleAnalyticsEvent) => void;
}

export type AnalyticsContextConsumerRenderProps = GlobalAnalyticValues &
  DispatchProps;

type AnalyticsContextConsumerProps = DispatchProps & {
  children: (
    injectedProps: AnalyticsContextConsumerRenderProps,
  ) => React.ReactNode;
};

export const AnalyticsContext: React.Context<GlobalAnalyticValues> = React.createContext(
  DEFAULT_ANALYTIC_VALUES,
);

export function useAnalytics(): AnalyticsContextConsumerRenderProps {
  const ctx = useContext(AnalyticsContext);
  const dispatch = useDispatch();
  const logUserAction = useCallback(
    (evt: GoogleAnalyticsEvent) => dispatch(logUserActionAC(evt)),
    [dispatch],
  );
  return { ...ctx, logUserAction };
}

export const AnalyticsContextProvider = AnalyticsContext.Provider;

export const AnalyticsContextConsumer = connect(null, {
  logUserAction: logUserActionAC,
} as DispatchProps)(
  ({ children, logUserAction }: AnalyticsContextConsumerProps) => (
    <AnalyticsContext.Consumer>
      {(value: GlobalAnalyticValues) =>
        children({ category: value.category, logUserAction })
      }
    </AnalyticsContext.Consumer>
  ),
);
