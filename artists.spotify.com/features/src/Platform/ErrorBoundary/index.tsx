// ignore-string-externalization
import React, { useContext } from 'react';
import { Logger } from '../Logger';

type Props = {
  fallback: React.ReactNode;
  children: React.ReactNode;
  name?: string;
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

const Context = React.createContext([new Error('error'), () => {}] as const);

export function useError() {
  return useContext(Context);
}

export class ErrorBoundary extends React.Component<Props, State> {
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
    Logger.logError(this.props.name ?? 'error-boundary', error);
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
