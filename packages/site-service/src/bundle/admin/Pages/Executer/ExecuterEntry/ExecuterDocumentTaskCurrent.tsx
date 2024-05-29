import {ExtensionsApollo} from "@app/extensions-apollo";
import {Query} from "@app/ui-web-kit";
import * as React from "react";
import {EXECUTER_GET_TASK_CURRENT_BY_ID_QUERY} from "../../../@query";
import {
    ExecuterGetTaskCurrentByIdQuery,
    ExecuterGetTaskCurrentByIdQueryVariables
} from "../../../interfaces";
import {ExecuterDocumentTaskCurrentForm} from "./ExecuterDocumentTaskCurrentForm";
import {queryExecuterEntry} from "./ExecuterEntry";

const doc = EXECUTER_GET_TASK_CURRENT_BY_ID_QUERY;
type Query = ExecuterGetTaskCurrentByIdQuery;
type Variables = ExecuterGetTaskCurrentByIdQueryVariables;

export const queryExecuterGetTaskCurrentEntry = ExtensionsApollo.Query
    .from<Query, Variables>(doc)
    .context();

export const ExecuterDocumentTaskCurrent = React.memo(() => {
    const [executer] = queryExecuterEntry.use();
    const id = executer.adminGetExecuterById.id;

    const query = queryExecuterGetTaskCurrentEntry
        .query()
        .withConfiguration({variables: {input: {id}}})
        .compile();

    return (
        <Query.Await query={query}>
            <ExecuterDocumentTaskCurrentForm />
        </Query.Await>
    );
});
