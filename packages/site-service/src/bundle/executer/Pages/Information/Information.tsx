import {ExtensionsApollo} from "@app/extensions-apollo";
import {Query} from "@app/ui-web-kit";
import * as React from "react";
import {INFORMATION_ALL_QUERY} from "../../@query";
import {
    InformationAllQuery
} from "../../interfaces";
import {InformationList} from "./InformationList";

const doc = INFORMATION_ALL_QUERY;
type Query = InformationAllQuery;
export type InformationChunk = Query["allGetInfoBlocks"][number];

export const queryInforamtionAll = ExtensionsApollo.Query
    .from<Query>(doc)
    .context();

export const Information = React.memo(() => {
    const query = queryInforamtionAll
        .query()
        .compile();

    return (
        <Query.Await query={query}>
            <InformationList />
        </Query.Await>
    );
});
