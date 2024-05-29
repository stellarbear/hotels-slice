import * as React from "react";
import {ErrorBoundary} from "../ErrorBoundary";

type Props<T extends React.ComponentType<any>> = React.ComponentProps<T> & {
  factory: () => Promise<{ default: T }>;
};

export const RouteLazy = <T extends React.ComponentType<any>>(props: Props<T>) => {
  const {factory, ...rest} = props;

  return (
    <ErrorBoundary.Catch>
      <React.Suspense>
        {React.createElement(React.lazy(factory), rest)}
      </React.Suspense>
    </ErrorBoundary.Catch>
  );
};
