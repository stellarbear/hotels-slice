import React from "react";
import {Query, QueryContext} from "./QueryContext";

type Props<T> = {
    query: Query<T>;

    children: React.ReactNode;
};

export const QueryAsync = <T,>(props: Props<T>) => {
    const {children, query} = props;

    return (
        <QueryContext.Provider value={query}>
            {children}
        </QueryContext.Provider>
    );
};
