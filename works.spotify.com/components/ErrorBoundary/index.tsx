import * as React from 'react';

type ErrorBoundaryProps = {
  fallback: React.ReactNode | ((error: Error) => React.ReactNode);
  children: React.ReactNode;
  onError: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetKey?: string;
};

type ErrorBoundaryState = { error: Error | null };

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.resetKey !== this.props.resetKey) {
      // eslint-disable-next-line
      this.setState({ error: null });
    }
  }

  render() {
    const { fallback, children } = this.props;
    const { error } = this.state;

    if (error) {
      if (typeof fallback === 'function') {
        return fallback(error);
      }

      return fallback;
    }

    return children;
  }
}
