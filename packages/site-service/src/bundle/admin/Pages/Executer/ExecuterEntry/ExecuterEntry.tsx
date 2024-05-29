import {ExtensionsApollo} from "@app/extensions-apollo";
import {Routing} from "@app/ui-web-core";
import {Query} from "@app/ui-web-kit";
import * as React from "react";
import {useParams} from "react-router";
import {EXECUTER_GET_BY_ID_QUERY} from "../../../@query";
import {
    ExecuterGetByIdQuery,
    ExecuterGetByIdQueryVariables
} from "../../../interfaces";
import {ERoutesExecuterEntry, ExecuterEntryTabs} from "./ExecuterEntryTabs";

type Params = "executerId";

const doc = EXECUTER_GET_BY_ID_QUERY;
type Query = ExecuterGetByIdQuery;
type Variables = ExecuterGetByIdQueryVariables;

export const queryExecuterEntry = ExtensionsApollo.Query
    .from<Query, Variables>(doc)
    .context();

export const ExecuterEntry = React.memo(() => {
    const {executerId: id} = useParams<Params>();

    const query = queryExecuterEntry
        .query()
        .withConfiguration({variables: {input: {id}}})
        .compile();

    return (
        <Routing.Routes>
            <Routing.Route path={"/:type/*"} element={
                <Query.Await query={query}>
                    <ExecuterEntryTabs />
                </Query.Await>
            } />

            <Routing.Route path={"*"} element={<Routing.Navigate to={ERoutesExecuterEntry.document} replace />} />
        </Routing.Routes>
    );
});
