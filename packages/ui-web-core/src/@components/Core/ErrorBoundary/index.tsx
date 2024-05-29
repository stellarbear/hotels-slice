import {ErrorBoundary as ErrorBoundaryCatch} from "./ErrorBoundary";
import {useErrorBoundary} from "./ErrorBoundaryContext";

export const ErrorBoundary = {
  Catch: ErrorBoundaryCatch,

  use: useErrorBoundary,
};
