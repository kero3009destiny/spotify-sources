import React, { Component, ReactNode, createContext, useContext } from 'react';

export const ErrorContext = createContext<Error | undefined>(undefined);
export const useError = () => useContext(ErrorContext);

type Props = { children: ReactNode };
type State = { error: Error | undefined };

export class ErrorBoundaryProvider extends Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  state: Readonly<State> = {
    error: undefined,
  };

  // use this for side-effects, like logging the error with semantic-metrics or sentry
  // componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  //
  // }

  render() {
    return <ErrorContext.Provider value={this.state.error}>{this.props.children}</ErrorContext.Provider>;
  }
}
