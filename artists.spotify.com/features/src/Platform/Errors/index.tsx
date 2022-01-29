// ignore-string-externalization
import React, { useEffect } from 'react';
import { Experience } from '@mrkt/features/experience-definitions/helpers';
import * as sentry from '../Logger/sentry';
import * as semanticMetrics from '../Logger/semanticMetrics';

type Init = {
  view: string;
  experience: Experience;
};

type Props = {
  fallback: React.ReactNode;
  children: React.ReactNode;
};

type State =
  | {
      error: Error;
      hasError: true;
    }
  | {
      error: undefined;
      hasError: false;
    };

function logError(error: Error, { view, experience }: Init) {
  sentry.logErrorV2(error, {
    mrkt_experience: experience.id,
    mrkt_view: view,
    mrkt_owner: experience.owner,
  });

  semanticMetrics.logCount('error', {
    experience: experience.id,
    view,
    owner: experience.owner,
  });
}

export function createErrorLoggerHook(init: Init) {
  return function useErrorLogger(error?: Error) {
    useEffect(() => {
      if (!error) return;
      logError(error, init);
    }, [error]);
  };
}

export function createErrorBoundary(init: Init) {
  const Context = React.createContext([
    new Error('missing ErrorBoundary ancestor'),
    () => {},
  ] as const);

  function useErrorState() {
    return React.useContext(Context);
  }

  class ErrorBoundary extends React.Component<Props, State> {
    static getDerivedStateFromError(error: Error) {
      return {
        error,
        hasError: true,
      };
    }

    state: State = {
      error: undefined,
      hasError: false,
    };

    clearError = () => {
      this.setState({
        error: undefined,
        hasError: false,
      });
    };

    componentDidCatch(error: Error) {
      logError(error, init);
    }

    render() {
      if (this.state.hasError) {
        return (
          <Context.Provider value={[this.state.error, this.clearError]}>
            {this.props.fallback}
          </Context.Provider>
        );
      }

      return this.props.children;
    }
  }

  return [ErrorBoundary, useErrorState] as const;
}
