import {isFunction} from "@app/extensions-guard";
import React from "react";
import {Alert} from "../Alert";
import {Loader} from "../Loader";
import {Query, useQuery} from "./QueryContext";
import {ErrorBoundary} from "../../Core";

type Props<T> = {
  query?: Query<T>;

  loader?: React.ReactNode;
  children: React.ReactNode | ((data: T) => React.ReactNode);
};

export const QueryAwait = <T,>(props: Props<T>) => (
  <ErrorBoundary.Catch>
    <QueryAwaitImplementation {...props} />
  </ErrorBoundary.Catch>
);

const QueryAwaitImplementation = <T,>(props: Props<T>) => {
  const {children, query, loader = <Loader.Spinner />} = props;
  const context = query ?? useQuery();

  if (context.error) {
    return <Alert color="error">{context.error.message}</Alert>;
  }

  if (!context.data) {
    return <>{loader}</>;
  }

  return (
    <>
      {isFunction(children)
        ? children(context.data)
        : children}
    </>
  );
};

