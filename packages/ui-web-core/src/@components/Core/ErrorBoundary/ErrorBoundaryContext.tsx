import React from "react";

export type ErrorBoundaryContext = {
  error: Error;
  reset: () => void;
};

export const ErrorBoundaryContext = React.createContext({} as ErrorBoundaryContext);
export const useErrorBoundary = () => React.useContext(ErrorBoundaryContext);
