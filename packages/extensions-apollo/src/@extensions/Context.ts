import {OperationVariables, QueryResult} from "@apollo/client";
import React from "react";
import {Query} from "./Query";

export const Context = <Q, V extends OperationVariables>(fn: Query<Q, V>) => {
    const store = {
    };

    return ({
        query: (defaults?: Q) => {
            
        },
        use: (exception = false) => {
            
        },
    });
};
