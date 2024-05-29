import * as React from "react";
import {useErrorBoundary} from "./ErrorBoundaryContext";

export const ErrorBoundaryView = React.memo(() => {
  const boundary = useErrorBoundary();

  return (
    <div>
      <h5>{boundary.error.message}</h5>
      <h5>{boundary.error.stack}</h5>
    </div>
  );
});
