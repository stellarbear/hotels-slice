import React from "react";
import {ErrorBoundaryContext} from "./ErrorBoundaryContext";
import {ErrorBoundaryView} from "./ErrorBoundaryView";

type Props = {
  children: React.ReactNode;
  reset?: string;

  onError?: (error: Error, info: React.ErrorInfo) => void;
  fallback?: React.FC;
};

export class ErrorBoundary extends React.Component<Props, {error?: Error}> {
  public readonly state: {error?: Error} = {};
  
  public static fallback?: React.FC;
  public static report?: (error: Error, info: React.ErrorInfo) => void = () => void 0;

  public static getDerivedStateFromError(error: Error) {
    return {error};
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    ErrorBoundary.report?.(error, info);
  }

  componentDidUpdate(prevous: Props) {
    if (prevous.reset !== this.props.reset) {
      this.reset();
    }
  }

  public reset() {
    this.setState({error: undefined});
  }

  public render() {
    if (this.state.error) {
      const Fallback = this.props.fallback ?? ErrorBoundary.fallback ?? ErrorBoundaryView;
      const context = {
        error: this.state.error,
        reset: this.reset.bind(this),
      };

      return (
        <ErrorBoundaryContext.Provider value={context}>
          <Fallback />
        </ErrorBoundaryContext.Provider>
      );

    }

    return this.props.children;
  }
}
