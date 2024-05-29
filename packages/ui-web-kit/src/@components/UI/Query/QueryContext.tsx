import React from "react";

export type Query<T> = {
  data?: T;
  loading: boolean;
  error?: Error | null;
};

export const QueryContext = React.createContext({} as Query<any>);

export const useQuery = () => React.useContext(QueryContext);
